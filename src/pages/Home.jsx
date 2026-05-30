import React, { useState } from 'react';

// ============ NAVBAR ============
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-red-900/30">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-red-600">2K</span>
          <span className="text-xl font-bold text-red-600">Legacy Vault</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <button className="text-red-500 hover:text-white transition-colors font-medium">Home</button>
          <button className="text-red-500 hover:text-white transition-colors font-medium">The Games</button>
          <button className="text-red-500 hover:text-white transition-colors font-medium">The Vault</button>
          <button className="text-red-500 hover:text-white transition-colors font-medium">Community</button>
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
        <p className="text-xl md:text-2xl text-red-400 mb-2">2K15 • 2K16 • 2K17 • 2K20 — All in one place.</p>
        <p className="text-lg md:text-xl text-white font-semibold mb-8">Persistent online. No resets. Ever.</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={scrollToGames} className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-105">Explore the Games</button>
          <button onClick={scrollToVault} className="px-8 py-4 bg-black hover:bg-red-900/30 text-red-500 font-semibold rounded-lg border border-red-600 transition-all duration-200">See the Vision</button>
        </div>

        <div className="flex justify-center gap-8 mt-16">
          {['2K15', '2K16', '2K17', '2K20'].map((game) => (
            <span key={game} className="text-red-500 font-bold text-lg">{game}</span>
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
        <p className="text-red-400 text-center mb-12">Four legendary eras of NBA 2K basketball. Each one a masterpiece. All preserved forever.</p>
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
        <p className="text-red-400 text-center mt-6">{total} votes cast</p>
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
          <p className="text-red-400 mb-8">fans want the Legacy Vault</p>
          <form onSubmit={(e) => { e.preventDefault(); if(email) { setSub(true); setEmail(''); } }} className="flex flex-col sm:flex-row gap-4">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="flex-1 px-4 py-3 bg-black border border-red-900/50 rounded-lg text-red-400 placeholder-red-900 focus:outline-none focus:border-red-500" />
            <button type="submit" className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg">{sub ? '✓ Subscribed!' : 'Notify Me'}</button>
          </form>
        </div>
        <p className="text-red-600/50 text-center mt-8 text-sm">Fan-Made Concept • Not Affiliated with 2K Sports or Take-Two Interactive</p>
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
    <div className="min-h-screen bg-black text-red-500">
      <Navbar />
      <Hero />
      <GamesSection />
      <VisionSection />
      <VotingSection />
      <CommunitySection />
      <Footer />
      <Chatbot />
    </div>
  );
}

export default Home;
