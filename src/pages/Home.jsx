import React, { useState, useRef, useEffect } from 'react';

const SITE_URL = 'https://vault-legacy.netlify.app';

// ============ SHARE FUNCTIONS ============
const shareToTwitter = () => {
  const text = encodeURIComponent(`🏀 The NBA 2K Legacy Vault campaign is real! Let's bring back online multiplayer for 2K15-2K20. Join the movement! #LegacyVault #NBA2K`);
  const url = encodeURIComponent(SITE_URL);
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
};

const shareToDiscord = () => {
  const text = `🏀 **NBA 2K Legacy Vault** - Play 2K15, 2K16, 2K17 & 2K20 Online Forever!\n\nJoin the campaign: ${SITE_URL}\n\n#LegacyVault #NBA2K`;
  navigator.clipboard.writeText(text);
  alert('Link copied! Paste it on Discord to share!');
};

const shareToTikTok = () => {
  const text = `🏀 NBA 2K Legacy Vault - Let's bring back online multiplayer for 2K15-2K20! ${SITE_URL} #LegacyVault #NBA2K`;
  navigator.clipboard.writeText(text);
  alert('Link copied! Paste it on TikTok to share!');
};

// ============ NAVBAR ============
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-red-900/30">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-red-600">2K</span>
          <span className="text-xl font-bold text-white">Legacy Vault</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <button className="text-gray-300 hover:text-white transition-colors font-medium">Home</button>
          <button className="text-gray-300 hover:text-white transition-colors font-medium">The Games</button>
          <button className="text-gray-300 hover:text-white transition-colors font-medium">The Vault</button>
          <button className="text-gray-300 hover:text-white transition-colors font-medium">Community</button>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-600">
          <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>
          <span className="text-red-500 text-sm font-medium">LIVE</span>
        </div>
      </div>
    </nav>
  );
}

// ============ HERO ============
function Hero() {
  const scrollToGames = () => document.getElementById('games')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToVault = () => document.getElementById('vision')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 bg-black">
      {/* Red glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-red-600 mb-4 tracking-tight">THE VAULT AWAITS</h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-2">2K15 • 2K16 • 2K17 • 2K20 — All in one place.</p>
        <p className="text-lg md:text-xl text-white font-semibold mb-8">Persistent online. No resets. Ever.</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={scrollToGames} className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-105">Explore the Games</button>
          <button onClick={scrollToVault} className="px-8 py-4 bg-black hover:bg-red-900/30 text-white font-semibold rounded-lg border border-red-600 transition-all duration-200">See the Vision</button>
        </div>

        <div className="flex justify-center gap-8 mt-16">
          {['2K15', '2K16', '2K17', '2K20'].map((game) => (
            <span key={game} className="text-gray-400 font-bold text-lg">{game}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ GAMES SECTION ============
function GamesSection() {
  const games = [
    { name: 'NBA 2K15', year: '2014', tagline: 'Where the modern 2K era truly began', img: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=600&q=80' },
    { name: 'NBA 2K16', year: '2015', tagline: 'The one OGs still call the GOAT', img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80' },
    { name: 'NBA 2K17', year: '2016', tagline: 'Pure basketball soul', img: 'https://images.unsplash.com/photo-1533923156502-be31530547c4?auto=format&fit=crop&w=600&q=80' },
    { name: 'NBA 2K20', year: '2019', tagline: 'The final masterpiece', img: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=600&q=80' },
  ];

  return (
    <section id="games" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-red-600 text-center mb-4">The Games</h2>
        <p className="text-gray-400 text-center mb-12">Four legendary eras of NBA 2K basketball. Each one a masterpiece. All preserved forever.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((g, i) => (
            <div key={i} className="relative group overflow-hidden rounded-xl bg-black border border-red-900/30">
              <img src={g.img} alt={g.name} className="w-full aspect-video object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-xl font-bold text-red-500">{g.name}</h3>
                <p className="text-red-400 text-sm">{g.year}</p>
                <p className="text-white text-sm mt-2">{g.tagline}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ VISION SECTION ============
function VisionSection() {
  return (
    <section id="vision" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-red-600 text-center mb-4">One Vault. Four Eras. Infinite Play.</h2>
        <p className="text-red-400 text-center mb-12">The revolutionary concept that changes everything.</p>

        <div className="bg-black rounded-2xl p-8 mb-12 border border-red-900/30">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-red-500 mb-2">Legacy Vault</h3>
            <p className="text-red-400">Select an era to enter</p>
          </div>
          <div className="grid grid-cols-4 gap-4 mb-8">
            {['2K15', '2K16', '2K17', '2K20'].map((g) => (
              <button key={g} className="aspect-square rounded-xl bg-black border border-red-900/50 hover:border-red-500 hover:bg-red-900/20 transition-all flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-red-500">{g.slice(-2)}</span>
              </button>
            ))}
          </div>
          <p className="text-center text-red-400 text-sm">Click any era to see the experience</p>
        </div>

        <div className="text-center">
          <a href="https://docs.google.com/document/d/1DEb_W0fxCGWaGN97KcVkVqD1JmZEOUrl5DpCCaayHe0" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-white font-medium inline-flex items-center gap-2 border border-red-600 px-6 py-3 rounded-lg">
            Read the Full Concept Document
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
}

// ============ VOTING SECTION ============
function VotingSection() {
  const [voted, setVoted] = useState(null);
  const votes = { '2K15': 3, '2K16': 1, '2K17': 0, '2K20': 1 };
  const total = Object.values(votes).reduce((a, b) => a + b, 0);

  return (
    <section className="py-20 bg-black">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-red-600 text-center mb-8">Which Era Do You Want Back Most?</h2>
        <div className="space-y-4">
          {Object.entries(votes).map(([game, count]) => {
            const pct = Math.round((count / total) * 100);
            return (
              <button key={game} onClick={() => setVoted(game)} className={`w-full p-4 rounded-xl border transition-all text-left ${voted === game ? 'bg-red-600/20 border-red-500' : 'bg-black border-red-900/30 hover:border-red-600'}`}>
                <div className="flex justify-between mb-2"><span className="text-red-500 font-semibold">{game}</span><span className="text-red-400">{count} votes</span></div>
                <div className="h-2 bg-black rounded-full border border-red-900/30"><div className={`h-full rounded-full transition-all ${voted === game ? 'bg-red-600' : 'bg-red-900'}`} style={{ width: `${pct}%` }}></div></div>
              </button>
            );
          })}
        </div>
        <p className="text-gray-400 text-center mt-6">{total} votes cast</p>
      </div>
    </section>
  );
}

// ============ COMMUNITY SECTION ============
function CommunitySection() {
  const [email, setEmail] = useState('');
  const [sub, setSub] = useState(false);

  return (
    <section className="py-20 bg-black">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-red-600 text-center mb-8">Join the Movement</h2>
        <div className="bg-black rounded-2xl p-8 border border-red-900/30 text-center">
          <h3 className="text-4xl font-bold text-red-600 mb-2">0+</h3>
          <p className="text-gray-400 mb-8">fans want the Legacy Vault</p>
          <form onSubmit={(e) => { e.preventDefault(); if(email) { setSub(true); setEmail(''); } }} className="flex flex-col sm:flex-row gap-4">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="flex-1 px-4 py-3 bg-black border border-red-900/50 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-red-500" />
            <button type="submit" className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg">{sub ? '✓ Subscribed!' : 'Notify Me'}</button>
          </form>
        </div>
      </div>
    </section>
  );
}

// ============ SHARE SECTION ============
function ShareSection() {
  return (
    <section className="py-16 bg-black border-t border-red-900/30">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Share the Vision</h2>
        <p className="text-gray-400 mb-8">Help us get this in front of 2K. Every share counts.</p>
        
        <div className="flex flex-wrap justify-center gap-4">
          {/* X/Twitter */}
          <button onClick={shareToTwitter} className="flex items-center gap-2 px-6 py-3 bg-black hover:bg-gray-900 border border-red-900/50 rounded-lg transition-colors">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span className="text-white font-medium">Share on X</span>
          </button>

          {/* Discord */}
          <button onClick={shareToDiscord} className="flex items-center gap-2 px-6 py-3 bg-black hover:bg-gray-900 border border-red-900/50 rounded-lg transition-colors">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            <span className="text-white font-medium">Share on Discord</span>
          </button>

          {/* TikTok */}
          <button onClick={shareToTikTok} className="flex items-center gap-2 px-6 py-3 bg-black hover:bg-gray-900 border border-red-900/50 rounded-lg transition-colors">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
            </svg>
            <span className="text-white font-medium">Share on TikTok</span>
          </button>
        </div>

        <p className="text-gray-600 text-sm mt-8">Fan-Made Concept • Not Affiliated with 2K Sports or Take-Two Interactive</p>
      </div>
    </section>
  );
}

// ============ FOOTER ============
function Footer() {
  return (
    <footer className="py-8 bg-black border-t border-red-900/30">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2"><span className="text-xl font-bold text-red-600">2K</span><span className="text-lg font-bold text-red-600">Legacy Vault</span></div>
        <div className="flex gap-6 text-red-500 text-sm">
          <button className="hover:text-white">Home</button><button className="hover:text-white">Games</button><button className="hover:text-white">Vault</button><button className="hover:text-white">Community</button>
        </div>
      </div>
    </footer>
  );
}

// ============ CHATBOT ============
function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ role: 'assistant', content: "I'm Vault AI — your guide to the NBA 2K Legacy Vault. Ask me anything about the campaign!" }]);
  const [input, setInput] = useState('');

  const qs = ['What is the Legacy Vault?', 'What can you help me with?', 'How does licensing work?', 'Tell me about the pilot test'];

  const send = () => {
    if (!input.trim()) return;
    setMsgs([...msgs, { role: 'user', content: input }]);
    setInput('');
    setTimeout(() => setMsgs(m => [...m, { role: 'assistant', content: 'The Legacy Vault is a revolutionary concept that would allow players to access classic NBA 2K games online directly within modern titles.' }]), 1000);
  };

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-red-600 shadow-lg flex items-center justify-center transition-all hover:scale-110 ${isOpen ? 'rotate-45' : ''}`}>
        {isOpen ? <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg> : <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>}
      </button>
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-48px)] bg-black rounded-2xl border border-red-600 shadow-2xl overflow-hidden">
          <div className="bg-red-600 px-6 py-4"><h3 className="text-white font-bold text-lg">Vault AI</h3><p className="text-white/70 text-sm">Your Legacy Vault Guide</p></div>
          <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
            {msgs.map((m, i) => <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[80%] px-4 py-2 rounded-2xl ${m.role === 'user' ? 'bg-red-600 text-white' : 'bg-black text-red-400 border border-red-900/50'}`}>{m.content}</div></div>)}
            <div className="flex flex-wrap gap-2 mt-4">{qs.map((q, i) => <button key={i} onClick={() => setInput(q)} className="text-xs px-3 py-1 bg-black hover:bg-red-900/30 text-red-500 rounded-full border border-red-900/50">{q}</button>)}</div>
          </div>
          <div className="p-4 border-t border-red-900/50 flex gap-2">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && send()} placeholder="Ask anything..." className="flex-1 px-4 py-2 bg-black border border-red-900/50 rounded-lg text-red-400 placeholder-red-900 focus:outline-none focus:border-red-500 text-sm" />
            <button onClick={send} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg></button>
          </div>
        </div>
      )}
    </>
  );
}

// ============ HOME ============
function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <GamesSection />
      <VisionSection />
      <VotingSection />
      <CommunitySection />
      <ShareSection />
      <Footer />
      <Chatbot />
    </div>
  );
}

export default Home;
