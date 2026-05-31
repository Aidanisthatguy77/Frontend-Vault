// Vault AI Backend - Deno Deploy
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' };
const sessions = new Map();
serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: cors });
  try {
    const { messages, session_id } = await req.json();
    if (!sessions.has(session_id)) sessions.set(session_id, { messages: [], lastActive: Date.now() });
    const session = sessions.get(session_id);
    session.lastActive = Date.now();
    session.messages = messages.slice(-10);
    const content = messages[messages.length - 1]?.content || '';
    const isUrl = /https?:\/\/[^\s]+/i.test(content) || /jpg|jpeg|png|gif|video|mp4|youtu/i.test(content);
    let response = isUrl ? await callClaude(content) : await callGemini(content);
    for (const [k, v] of sessions.entries()) { if (Date.now() - v.lastActive > 3600000) sessions.delete(k); }
    return new Response(JSON.stringify({ response }), { headers: { ...cors, 'Content-Type': 'application/json' } });
  } catch { return new Response(JSON.stringify({ error: 'Failed' }), { headers: { ...cors, 'Content-Type': 'application/json' }, status: 500 }); }
});
async function callClaude(c) { const key = Deno.env.get('ANTHROPIC_API_KEY'); if (!key) return demo(c); try { const r = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' }, body: JSON.stringify({ model: 'claude-3-haiku-20240307', max_tokens: 500, messages: [{ role: 'user', content: 'Vault AI here. Shared: ' + c }] }) }); const d = await r.json(); return d.content?.[0]?.text || demo(c); } catch { return demo(c); } }
async function callGemini(c, _h) { const key = Deno.env.get('GOOGLE_API_KEY'); if (!key) return demo(c); try { const r = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + key, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: 'Vault AI for Legacy Vault. Respond: ' + c }] }], generationConfig: { maxOutputTokens: 500 } }) }); const d = await r.json(); return d.candidates?.[0]?.content?.parts?.[0]?.text || demo(c); } catch { return demo(c); } }
function demo(c) { const l = c.toLowerCase(); if (l.includes('licensing') || l.includes('music')) return 'Modular asset layers handle licensing. Expired music replaced, jerseys as packs, likenesses via overlays. Zero gameplay changes!'; if (l.includes('pilot') || l.includes('throwback')) return '48-hour NBA 2K16 Throwback Weekend. Budget under $750K. Target: 15-20% DAU uplift. If it hits - full Vault greenlit!'; if (l.includes('scal') || l.includes('kubernetes')) return 'Kubernetes = automatic scaling. Build once, run anywhere. Each title in isolated container. Elastic scaling during events.'; if (l.includes('vault') || l.includes('legacy')) return 'Legacy Vault = game-within-a-game. Launch 2K15-2K20 inside modern 2K. No more sunsets - all preserved forever!'; return 'I am Vault AI. Ask about the Legacy Vault campaign!'; }
