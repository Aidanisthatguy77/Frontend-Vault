"""
NBA 2K Legacy Vault - Independent AI Chat Backend
Routes to Claude (media) or Gemini (text) based on content type
"""
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Literal
import httpx
import json

app = FastAPI(title="Legacy Vault AI", version="1.0.0")

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============ CONFIG ============
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY", "")

# ============ MODELS ============
class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str

class ChatRequest(BaseModel):
    messages: list[ChatMessage]
    session_id: Optional[str] = "default"

# ============ IN-MEMORY SESSIONS ============
chat_sessions: dict[str, list[dict]] = {}

# ============ SYSTEM PROMPTS ============
VAULT_AI_SYSTEM = """You are Vault AI, a passionate 2K historian and guide for the NBA 2K Legacy Vault campaign.

The NBA 2K Legacy Vault is a revolutionary concept to bring back online multiplayer for NBA 2K15, 2K16, 2K17, and 2K20. 

Key points:
- The campaign aims to preserve classic 2K eras and bring them back online
- 2K15 (2014): Where the modern 2K era began
- 2K16 (2015): The one OGs still call the GOAT  
- 2K17 (2016): Pure basketball soul
- 2K20 (2019): The final masterpiece
- The goal is persistent online servers with no resets
- This would allow players to access classic games within modern NBA 2K

Answer questions enthusiastically about the campaign, the concept, licensing solutions, technical implementation, and why it matters to the community. Be helpful, knowledgeable, and passionate about bringing back these classic games.
"""

# ============ AI PROVIDERS ============
async def chat_with_claude(messages: list[dict]) -> str:
    """Claude for media URLs and complex analysis"""
    if not ANTHROPIC_API_KEY:
        return "Claude API key not configured. Please set ANTHROPIC_API_KEY environment variable."
    
    headers = {
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json"
    }
    
    payload = {
        "model": "claude-3-5-sonnet-20241022",
        "max_tokens": 1024,
        "system": VAULT_AI_SYSTEM,
        "messages": messages
    }
    
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://api.anthropic.com/v1/messages",
            headers=headers,
            json=payload,
            timeout=30.0
        )
        
        if response.status_code != 200:
            return f"Claude error: {response.text}"
        
        data = response.json()
        return data["content"][0]["text"]

async def chat_with_gemini(messages: list[dict]) -> str:
    """Gemini for text questions"""
    if not GOOGLE_API_KEY:
        return "Google API key not configured. Please set GOOGLE_API_KEY environment variable."
    
    # Convert messages to Gemini format
    contents = []
    for msg in messages:
        if msg["role"] == "user":
            contents.append({"role": "user", "parts": [{"text": msg["content"]}]})
        else:
            contents.append({"role": "model", "parts": [{"text": msg["content"]}]})
    
    payload = {
        "contents": contents,
        "systemInstruction": {"parts": [{"text": VAULT_AI_SYSTEM}]}
    }
    
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GOOGLE_API_KEY}",
            json=payload,
            timeout=30.0
        )
        
        if response.status_code != 200:
            return f"Gemini error: {response.text}"
        
        data = response.json()
        return data["candidates"][0]["content"]["parts"][0]["text"]

def detect_content_type(content: str) -> str:
    """Route to appropriate AI based on content"""
    url_patterns = [
        "http://", "https://", "www.", ".com", ".org", ".net",
        "youtube.com", "youtu.be", "twitter.com", "x.com",
        "reddit.com", "discord", "twitch"
    ]
    
    content_lower = content.lower()
    for pattern in url_patterns:
        if pattern in content_lower:
            return "claude"  # Media/URL content -> Claude
    
    return "gemini"  # Text questions -> Gemini

# ============ ROUTES ============
@app.get("/")
async def root():
    return {"status": "ok", "service": "Legacy Vault AI", "version": "1.0.0"}

@app.post("/api/chat")
async def chat(request: ChatRequest):
    """Main chat endpoint - routes to Claude or Gemini"""
    try:
        # Get or create session
        session_id = request.session_id or "default"
        if session_id not in chat_sessions:
            chat_sessions[session_id] = []
        
        # Add messages to history
        for msg in request.messages:
            chat_sessions[session_id].append({"role": msg.role, "content": msg.content})
        
        # Keep only last 10 messages
        history = chat_sessions[session_id][-10:]
        
        # Detect content type and route
        last_user_message = history[-1]["content"] if history else ""
        ai_provider = detect_content_type(last_user_message)
        
        # Generate response
        if ai_provider == "claude":
            response = await chat_with_claude(history)
        else:
            response = await chat_with_gemini(history)
        
        # Add AI response to history
        chat_sessions[session_id].append({"role": "assistant", "content": response})
        
        return {
            "response": response,
            "provider": ai_provider,
            "session_id": session_id
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/chat/{session_id}")
async def clear_session(session_id: str):
    """Clear a chat session"""
    if session_id in chat_sessions:
        del chat_sessions[session_id]
    return {"status": "cleared", "session_id": session_id}

@app.get("/api/health")
async def health():
    """Health check"""
    return {
        "status": "healthy",
        "claude_configured": bool(ANTHROPIC_API_KEY),
        "gemini_configured": bool(GOOGLE_API_KEY)
    }

# ============ RUN ============
if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", "8000"))
    uvicorn.run(app, host="0.0.0.0", port=port)
