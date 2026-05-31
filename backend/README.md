# Vault AI Backend

## Deploy to Deno Deploy (Free!)

1. Go to https://deno.com/deploy
2. Sign up with GitHub
3. Create new project → Connect GitHub repo
4. Select this `backend` folder
5. Add Environment Variables:
   - `ANTHROPIC_API_KEY` - Your Claude API key
   - `GOOGLE_API_KEY` - Your Gemini API key
6. Deploy!

## API Endpoint

```
POST /api/chat
```

### Request:
```json
{
  "messages": [
    { "role": "user", "content": "What is the Legacy Vault?" }
  ],
  "session_id": "unique-session-id"
}
```

### Response:
```json
{
  "response": "The Legacy Vault is...",
  "session_id": "unique-session-id"
}
```

## How AI Routing Works

- **URLs/Media links** → Claude (analyzes and discusses)
- **Text questions** → Gemini (answers knowledge questions)
- **No API keys** → Built-in demo responses

## Local Testing

```bash
deno run --allow-net --allow-env server.ts
```

## Free Tier Limits

- 100K requests/day
- 100GB bandwidth/month
- Always-on (no sleep!)
