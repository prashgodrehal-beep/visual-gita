import React, { useState, useEffect, useRef } from 'react';
import {
  Compass, ChevronRight, BookOpen, Search, LayoutGrid, Layers, Maximize2,
  Minimize2, ScrollText, Bookmark, ShieldCheck, Zap, Waves, Quote,
  RotateCcw, Clock, Sparkles, ChevronDown, Triangle, RotateCw, X,
  MessageSquare, Send, Loader2, TrendingUp, Home, RefreshCw, Eye, EyeOff,
  GitBranch, CircleUser, ZapOff, Users, Heart
} from 'lucide-react';

// --- THEME CONSTANTS ---
const THEME = {
  deep: '#020617',
  indigo: '#1e1b4b',
  border: '#312e81',
  saffron: '#f59e0b',
  textMain: '#ffffff',
  textDim: '#94a3b8'
};

// --- DATA CONFIGURATION ---
const GITA_DATA = [
  {
    chapter: 2,
    title: "Sankhya Yoga",
    subtitle: "Yoga of Knowledge",
    models: [
      { id: 'atma-body', status: 'ready', name: 'Atma vs. Body', type: 'Dual Framework', description: 'Atma as eternal, Body as perishable.' },
      { id: 'sat-asat', status: 'ready', name: 'Reality Framework', type: 'Pyramid', description: 'Distinction between Sat (Real) and Asat (Unreal).' },
      { id: 'karma-yoga-cycle', status: 'ready', name: 'Karma Yoga Cycle', type: 'Circular Flow', description: 'Skill in action and detachment.' },
      {
        id: 'stitha-prajna',
        status: 'ready',
        name: 'Stitha Prajna',
        type: 'Ladder of Detachment',
        description: '18 qualities of established wisdom.',
        qualities: [
          { name: "Inner Contentment", highlight: "Satisfied in the self alone (2.55).", verse: "2.55" },
          { name: "Equanimity", highlight: "Detached from pain and pleasure (2.56).", verse: "2.56" },
          { name: "Freedom from Fear", highlight: "Beyond the grip of anxiety.", verse: "2.56" },
          { name: "Anger Mastery", highlight: "Free from impulse of wrath.", verse: "2.56" },
          { name: "Non-Attachment", highlight: "Beyond the reach of craving.", verse: "2.57" },
          { name: "Sense Withdrawal", highlight: "Like a tortoise pulling limbs in (2.58).", verse: "2.58" },
          { name: "Mental Focus", highlight: "Mind fixed on the truth.", verse: "2.61" },
          { name: "Deep Peace", highlight: "Desires vanish like rivers merging into ocean (2.70).", verse: "2.70" },
          { name: "Desire Diffusion", highlight: "Moves unattached among objects (2.64).", verse: "2.64" },
          { name: "Ego-less Action", highlight: "Free from 'I' and 'Mine'.", verse: "2.71" },
          { name: "Clear Intellect", highlight: "Established in wisdom.", verse: "2.65" },
          { name: "Compassion", highlight: "Kind to all beings.", verse: "12.13" },
          { name: "Forgiveness", highlight: "Patient and forgiving.", verse: "12.13" },
          { name: "Self-Control", highlight: "Mastery over instruments.", verse: "12.14" },
          { name: "True Happiness", highlight: "Independent inner joy.", verse: "2.66" },
          { name: "Truthfulness", highlight: "Aligned in thought and word.", verse: "17.14" },
          { name: "Non-Violence", highlight: "Harmless in all ways.", verse: "13.8" },
          { name: "Firm Resolve", highlight: "Established in discipline.", verse: "18.33" }
        ]
      },
      { id: 'wisdom-lenses', status: 'pending', name: 'Two Lenses of Wisdom', type: 'Venn Diagram', description: 'Analytical vs. Practical wisdom.' },
      { id: 'rebirth-cycle', status: 'pending', name: 'The Rebirth Cycle', type: 'Loop', description: 'The journey of the soul.' },
      { id: 'righteous-decision', status: 'pending', name: 'Decision Framework', type: 'Tree', description: 'Choosing duty over delusion.' },
      { id: 'mind-hierarchy', status: 'pending', name: 'Mind Control Loop', type: 'Hierarchy', description: 'Senses → Mind → Intellect.' }
    ]
  },
  {
    chapter: 3,
    title: "Karma Yoga",
    subtitle: "Yoga of Action",
    models: [
      { id: 'two-paths', status: 'pending', name: 'Paths to Realization', type: 'Branch', description: 'Knowledge vs. Action.' },
      { id: 'yajna-framework', status: 'pending', name: 'Cosmic Cooperation', type: 'Circular Cycle', description: 'The cycle of Yajna.' },
      { id: 'threefold-duty', status: 'pending', name: 'Structure of Duty', type: 'Framework', description: 'Prescribed duty to selfless offering.' },
      { id: 'ego-less-action', status: 'pending', name: 'Gunatita Karma', type: 'System', description: 'Gunas act, not the individual ego.' },
      { id: 'desire-anger-vortex', status: 'pending', name: 'Desire-Anger Vortex', type: 'Spiral', description: 'Downward spiral of desire.' },
      { id: 'chariot-analogy', status: 'pending', name: 'Inner Chariot', type: 'Diagram', description: 'Model of inner instruments.' },
      { id: 'inaction-conflict', status: 'pending', name: 'Action vs. Inertia', type: 'Causal Loop', description: 'Superiority of dynamic action.' },
      { id: 'leaders-ripple', status: 'pending', name: 'Leadership Ripple', type: 'Social Model', description: 'Leaders setting standards.' },
      { id: 'action-worship', status: 'pending', name: 'Action as Worship', type: 'Metaphor', description: 'Daily work as divine offering.' }
    ]
  }
];

const VERSES_DB = {
  'atma-body': [
    { ref: '2.19', sanskrit: 'नैनं वेत्ति हन्तारं', text: 'The Self is not slain when the body is slain.' },
    { ref: '2.20', sanskrit: 'न जायते म्रियते वा कदाचिन्', text: 'Atma is unborn, eternal, ever-existing, and undying.' },
    { ref: '2.22', sanskrit: 'वासांसी जीर्णानि यथा विहाय', text: 'As a person discards old clothes, the soul accepts new bodies.' }
  ],
  'sat-asat': [
    { ref: '2.16', sanskrit: 'नासतो विद्यते भावो', text: 'The unreal has no existence; the real never ceases to be.' }
  ],
  'karma-yoga-cycle': [
    { ref: '2.47', sanskrit: 'कर्मण्येवाधिकारस्ते', text: 'You have a right to perform duty, but not to its fruits.' },
    { ref: '2.48', sanskrit: 'योगस्थ: कुरु कर्माणि', text: 'Perform your duty equipoised, abandoning all attachment.' },
    { ref: '2.50', sanskrit: 'योग: कर्मसु कौशलम्', text: 'Yoga is skill in action. Strive for equanimity.' }
  ],
  'stitha-prajna': [
    { ref: '2.56', sanskrit: 'दुःखेष्वनुद्विग्नमना:', text: 'Detached from pain and pleasure. Free from attachment, fear, and anger.' },
    { ref: '2.70', sanskrit: 'आपूर्यमाणमचलप्रतिष्ठं', text: 'Desires vanish like rivers merging into the ocean.' }
  ]
};

// ==========================================
// INDEPENDENT MODEL MODULES (MODULAR BLOCK)
// ==========================================

const AtmaBodyModel = ({ intellectLevel, ageProgress, setAgeProgress }) => (
  <div className="relative flex flex-col items-center justify-center p-8 sm:p-12 bg-indigo-950 rounded-[2.5rem] sm:rounded-[3rem] border border-indigo-500/30 shadow-2xl w-full lg:max-w-[700px]">
    <div className="absolute top-10 left-10 flex items-center gap-4 text-white">
      <Layers className="text-saffron shadow-[0_0_15px_#f59e0b]" size={32} />
      <h3 className="font-black text-2xl uppercase tracking-tighter text-white">Atma vs Body</h3>
    </div>
    <div className="flex flex-col sm:flex-row w-full mt-24 gap-12 items-center">
      <div className="relative w-40 h-[380px] flex-shrink-0">
        <div className="absolute inset-0 bg-indigo-800/20 border-2 border-indigo-400/20 transition-all duration-1000" style={{ clipPath: 'polygon(50% 0%, 80% 10%, 95% 35%, 85% 70%, 75% 100%, 25% 100%, 15% 70%, 5% 35%, 20% 10%)', opacity: 1 - (ageProgress * 0.7), filter: `grayscale(${ageProgress})` }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-full bg-saffron shadow-[0_0_40px_#f59e0b] w-20 h-20 flex items-center justify-center text-[11px] font-black text-white uppercase">Atma</div>
        </div>
      </div>
      <div className="flex-1 w-full space-y-6">
        <div className="p-8 rounded-[2rem] border border-red-500/20 bg-red-500/5 text-left text-white">
          <span className="text-[10px] uppercase font-black text-red-400 tracking-widest block mb-1">Maya (Body)</span>
          <p className="text-lg font-bold">Temporary Container</p>
        </div>
        <div className="p-8 rounded-[2rem] border border-saffron/30 bg-saffron/5 shadow-inner text-left text-white">
          <span className="text-[10px] uppercase font-black text-saffron tracking-widest block mb-1">Sat (Soul)</span>
          <p className="text-lg font-bold">Indestructible Core</p>
        </div>
      </div>
    </div>
    <div className="w-full mt-12 px-2 text-left">
      <div className="flex justify-between text-white text-[10px] font-bold uppercase tracking-widest mb-4"><span>Simulation</span><span>Verse 2.22</span></div>
      <input type="range" className="w-full h-1.5 bg-indigo-900 rounded-full appearance-none cursor-pointer accent-saffron" value={ageProgress * 100} onChange={(e) => setAgeProgress(e.target.value / 100)} />
    </div>
  </div>
);

const KarmaCycleModel = ({ intellectLevel, windowWidth, verses = [] }) => {
  const steps = [
    { label: "Action", icon: <RefreshCw size={14} /> },
    { label: "Detachment", icon: <Zap size={14} /> },
    { label: "Equanimity", icon: <Layers size={14} /> },
    { label: "Purity", icon: <Sparkles size={14} /> }
  ];
  const mandalaScale = windowWidth < 640 ? 0.75 : 1;
  const mainVerse = verses?.[0] || { text: "Skill in action.", ref: "2.47" };

  return (
    <div className="relative flex flex-col items-center justify-center p-8 sm:p-12 bg-indigo-950 rounded-[2.5rem] sm:rounded-[3rem] border border-indigo-500/30 shadow-2xl w-full lg:max-w-[700px]">
      <div className="absolute top-10 left-10 flex items-center gap-4 text-white">
        <RotateCcw className="text-saffron shadow-[0_0_15px_#f59e0b]" size={32} />
        <h3 className="font-black text-2xl uppercase tracking-tighter text-white">Karma Cycle</h3>
      </div>
      <div className="relative w-64 h-64 sm:w-96 sm:h-96 mt-20 mb-8 flex items-center justify-center text-white" style={{ transform: `scale(${mandalaScale})` }}>
        <div className="absolute inset-0 rounded-full border border-dashed border-indigo-700/50 animate-spin-slow" />
        <div className="z-10 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-indigo-900 border-2 border-saffron/40 flex flex-col items-center justify-center shadow-xl">
          <RefreshCw className={`text-saffron mb-1 sm:mb-2 ${intellectLevel > 50 ? 'animate-spin' : ''}`} style={{ animationDuration: `${6 - (intellectLevel / 20)}s` }} size={windowWidth < 640 ? 18 : 24} />
          <span className="text-[8px] sm:text-[10px] font-black text-white uppercase tracking-widest text-center leading-tight">Skill in<br />Action</span>
        </div>
        {steps.map((step, i) => {
          const angle = i * 90;
          const dist = windowWidth < 640 ? 120 : 180;
          return (
            <div key={i} className="absolute w-full h-full flex items-center justify-center" style={{ transform: `rotate(${angle}deg)` }}>
              <div className="flex flex-col items-center" style={{ transform: `translateY(-${dist}px) rotate(-${angle}deg)` }}>
                <div className="w-8 h-8 rounded-full bg-indigo-950 border border-saffron flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.4)] text-white">{step.icon}</div>
                <div className="mt-3 px-3 py-1 bg-saffron border border-white/20 rounded-full shadow-lg"><span className="text-[8px] sm:text-[10px] font-black text-white uppercase tracking-widest whitespace-nowrap">{step.label}</span></div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-6 sm:p-8 bg-indigo-900/40 rounded-[2rem] border-l-4 border-saffron w-full text-left text-white">
        <Quote className="text-saffron/40 mb-2" size={24} />
        <p className="text-base sm:text-xl italic font-serif leading-relaxed mb-4 text-white">"{mainVerse.text}"</p>
        <span className="text-[10px] font-black text-saffron uppercase tracking-[0.2em]">Verse {mainVerse.ref}</span>
      </div>
    </div>
  );
};

const StithaPrajnaModel = ({ selectedQualityIndex, setSelectedQualityIndex, windowWidth, qualities = [] }) => {
  const q = qualities?.[selectedQualityIndex] || { name: "Wisdom", highlight: "Detached Awareness", verse: "2.54" };
  const mandalaScale = windowWidth < 640 ? 0.65 : windowWidth < 1024 ? 0.85 : 1;

  return (
    <div className="relative flex flex-col items-center justify-center p-8 sm:p-12 bg-indigo-950 rounded-[2.5rem] sm:rounded-[3rem] border border-indigo-500/30 shadow-2xl w-full lg:max-w-[750px]">
      <div className="absolute top-10 left-10 flex items-center gap-4 text-white">
        <Waves className="text-saffron shadow-[0_0_15px_#f59e0b]" size={32} />
        <h3 className="font-black text-2xl uppercase tracking-tighter text-white">Mastery Ladder</h3>
      </div>
      <div className="relative w-full h-[400px] sm:h-[600px] flex items-center justify-center mt-16 sm:mt-20 text-white" style={{ transform: `scale(${mandalaScale})` }}>
        <div className="absolute w-24 h-24 sm:w-40 sm:h-40 rounded-full border border-saffron/20 bg-indigo-900/60 flex items-center justify-center text-saffron font-black text-[9px] sm:text-xs uppercase tracking-widest text-center shadow-xl">Steady<br />Mind</div>
        {qualities.map((item, i) => {
          const angle = (i * 360) / qualities.length;
          const active = selectedQualityIndex === i;
          return (
            <button key={i} onClick={() => setSelectedQualityIndex(i)} className="absolute top-1/2 left-1/2 origin-left transition-all duration-300" style={{ transform: `rotate(${angle}deg) translateX(130px)` }}>
              <div className={`px-2 sm:px-4 py-1 sm:py-1.5 rounded-full border text-[7px] sm:text-[9px] font-black uppercase transition-all ${active ? 'bg-saffron text-indigo-950 border-white scale-125 z-50 shadow-lg' : 'bg-indigo-900/60 text-white border-indigo-500/30 hover:border-saffron/50'}`} style={{ transform: `rotate(-${angle}deg)` }}>{item.name}</div>
            </button>
          );
        })}
      </div>
      <div className="mt-8 p-6 sm:p-8 bg-indigo-900/80 border border-saffron/30 rounded-[2rem] w-full text-white shadow-2xl relative text-left">
        <h2 className="text-xl sm:text-3xl font-black uppercase mb-2 text-saffron tracking-tighter">{q.name}</h2>
        <p className="text-base sm:text-xl italic font-serif leading-relaxed opacity-90 border-l-2 border-saffron pl-4 text-white">"{q.highlight}"</p>
      </div>
    </div>
  );
};

const SatAsatModel = ({ selectedLayerIndex, setSelectedLayerIndex, windowWidth, layers = [], intellectLevel }) => {
  const selectedLayer = layers?.[selectedLayerIndex] || { name: "SAT", desc: "Eternal substrate" };
  return (
    <div className="relative flex flex-col items-center justify-center p-8 sm:p-12 bg-indigo-950 rounded-[2.5rem] border border-indigo-500/30 shadow-2xl w-full lg:max-w-[700px]">
      <div className="absolute top-12 left-12 flex items-center gap-5 text-white">
        <Triangle className="text-saffron shadow-[0_0_15px_#f59e0b]" size={32} />
        <h3 className="font-black text-2xl uppercase tracking-tighter text-white">Reality Pyramid</h3>
      </div>
      <div className="relative w-full h-[400px] mt-24 flex flex-col items-center justify-center gap-3 sm:gap-4 text-white">
        {layers.map((layer, i) => {
          const isActive = selectedLayerIndex === i;
          const width = windowWidth < 640 ? [100, 180, 260][i] : [140, 240, 360][i];
          const opacity = layer.id === 'sat' ? (intellectLevel / 100) + 0.2 : 1.2 - (intellectLevel / 100);
          return (
            <button key={layer.id} onClick={() => setSelectedLayerIndex(i)} className="group transition-all duration-500" style={{ width: `${width}px`, opacity }}>
              <div className={`w-full h-16 sm:h-24 border transition-all flex flex-col items-center justify-center rounded-xl sm:rounded-[1.5rem] ${isActive ? 'bg-indigo-600/30 border-saffron shadow-lg' : 'bg-indigo-950/60 border-indigo-500/30 hover:border-indigo-400'}`}>
                <span className={`text-[10px] sm:text-xs font-black tracking-[0.2em] mb-1 ${isActive ? 'text-saffron' : 'text-white'}`}>{layer.name}</span>
              </div>
            </button>
          );
        })}
      </div>
      <div className="mt-8 p-6 sm:p-8 bg-indigo-900 border border-indigo-400/20 rounded-[1.5rem] w-full text-white text-left">
        <h2 className="text-xl sm:text-3xl font-black uppercase mb-2 text-saffron">{selectedLayer.name}</h2>
        <p className="text-sm sm:text-lg italic font-serif leading-relaxed border-l-2 border-saffron pl-4 text-white">{selectedLayer.desc}</p>
      </div>
    </div>
  );
};

// ==========================================
// MAIN APP COMPONENT (ORCHESTRATOR)
// ==========================================

const App = () => {
  const [zoom, setZoom] = useState(1);
  const [activeModelId, setActiveModelId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [intellectLevel, setIntellectLevel] = useState(80);
  const [ageProgress, setAgeProgress] = useState(0);
  const [selectedQualityIndex, setSelectedQualityIndex] = useState(0);
  const [selectedLayerIndex, setSelectedLayerIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [showBuddhiOverlay, setShowBuddhiOverlay] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth < 1024) setIsSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const apiKey = ""; // Provided by env

  const resetView = () => {
    setActiveModelId(null); setZoom(1); setAgeProgress(0);
    setSelectedQualityIndex(0); setSelectedLayerIndex(0);
    setChatMessages([]); setChatOpen(false);
    if (windowWidth < 1024) setIsSidebarOpen(false);
  };

  const handleModelSelect = (id) => {
    setActiveModelId(id);
    if (windowWidth < 1024) setIsSidebarOpen(false);
  };

  const callGemini = async (prompt, sys) => {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], systemInstruction: { parts: [{ text: sys }] } })
      });
      const result = await response.json();
      return result.candidates?.[0]?.content?.parts?.[0]?.text;
    } catch (e) { return "My connection to the ether is weak."; }
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    const msg = chatInput; setChatInput("");
    setChatMessages(prev => [...prev, { role: 'user', text: msg }]);
    setIsChatLoading(true);
    const resp = await callGemini(msg, `Answer as a Vidwan regarding the active model: ${activeModelId}.`);
    setChatMessages(prev => [...prev, { role: 'ai', text: resp }]);
    setIsChatLoading(false);
  };

  const activeModelData = GITA_DATA.flatMap(ch => ch.models).find(m => m.id === activeModelId);

  return (
    <div className="flex h-screen w-screen bg-[#020617] text-white overflow-hidden font-sans select-none relative">
      {/* SIDEBAR */}
      <aside className={`fixed lg:relative flex flex-col bg-indigo-950 lg:bg-indigo-950/80 border-r border-indigo-900 transition-all duration-500 z-[120] h-full ${isSidebarOpen ? 'w-[85vw] sm:w-96 translate-x-0' : 'w-0 lg:w-20 -translate-x-full lg:translate-x-0'}`}>
        <div className="p-8 border-b border-indigo-900 flex items-center justify-between">
          <button onClick={resetView} className="flex items-center gap-4 text-white hover:text-saffron transition-all">
            <Compass size={24} className="text-saffron shadow-[0_0_8px_#f59e0b]" />
            {isSidebarOpen && <h2 className="text-xl font-black uppercase text-white">Library</h2>}
          </button>
          {windowWidth < 1024 && isSidebarOpen && <button onClick={() => setIsSidebarOpen(false)} className="text-white/50"><X size={24} /></button>}
        </div>
        {isSidebarOpen && (
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            <button onClick={resetView} className="w-full text-left p-4 rounded-2xl flex items-center gap-3 mb-6 border border-indigo-900 hover:border-saffron/40 transition-all bg-indigo-900/20 text-white/60">
              <Home size={18} /> <span className="text-sm font-black uppercase">Dashboard</span>
            </button>
            {GITA_DATA.map((ch) => (
              <div key={ch.chapter} className="mb-8">
                <div className="flex items-center gap-2 mb-4 text-white">
                  <span className="text-[10px] bg-saffron text-white font-black px-2 py-0.5 rounded uppercase">CH {ch.chapter}</span>
                  <span className="text-[10px] font-black uppercase opacity-60">{ch.title}</span>
                </div>
                <div className="space-y-2">
                  {ch.models.map(m => (
                    <button key={m.id} onClick={() => handleModelSelect(m.id)} className={`w-full text-left p-4 rounded-2xl flex items-center justify-between border transition-all ${activeModelId === m.id ? 'bg-saffron border-white text-white shadow-lg' : 'bg-indigo-950/40 border-indigo-900 text-white/70 hover:border-saffron/30'}`}>
                      <span className="text-sm font-black uppercase">{m.name}</span>
                      <ChevronRight size={16} className={activeModelId === m.id ? 'opacity-100' : 'opacity-20'} />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </aside>

      <main className="relative flex-1 flex flex-col bg-[#020617] overflow-auto scroll-smooth custom-scrollbar">
        {/* HEADER HUB BUTTON */}
        <button onClick={resetView} className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-2.5 bg-indigo-950 border border-indigo-500/40 rounded-full shadow-2xl backdrop-blur-md flex items-center gap-3 hover:scale-105 active:scale-95 ${activeModelId && windowWidth < 640 ? 'opacity-30' : 'opacity-100'}`}>
          <BookOpen size={18} className="text-saffron drop-shadow-[0_0_12px_#f59e0b]" />
          <span className="text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-white">Gita Knowledge Hub</span>
        </button>

        {/* HUD: BOTTOM COMMAND BAR */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 lg:left-[calc(80px+32px)] lg:translate-x-0 z-[130] flex items-center gap-3 p-2 bg-indigo-950 border border-indigo-500/40 rounded-[2rem] shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-1 bg-black/60 p-1 rounded-[1.5rem] border border-indigo-800 text-white">
            <button onClick={() => setZoom(prev => Math.max(0.4, prev - 0.1))} className="p-2 text-white hover:text-saffron transition-colors"><Minimize2 size={20} /></button>
            <div className="px-3 sm:px-5 text-xs sm:text-sm font-black text-white hidden sm:block">{Math.round(zoom * 100)}%</div>
            <button onClick={() => setZoom(prev => Math.min(2.5, prev + 0.1))} className="p-2 text-white hover:text-saffron transition-colors"><Maximize2 size={20} /></button>
          </div>
          {activeModelId && <button onClick={resetView} className="px-5 sm:px-8 py-3 bg-saffron text-white font-black text-[10px] sm:text-xs uppercase rounded-[1.25rem] active:scale-95 flex items-center gap-2 hover:bg-saffronBright"><RotateCw size={14} /> <span>Reset Map</span></button>}
        </div>

        {/* MAIN CANVAS SCALER */}
        <div className={`flex-1 w-full flex ${!activeModelId ? 'items-start pt-12' : 'items-start pt-12 sm:pt-20'} justify-center p-4 min-h-screen relative`}>
          <div className="transition-all duration-700 ease-out w-full flex justify-center pb-32" style={{ transform: `scale(${zoom})`, transformOrigin: 'top center', backgroundImage: `radial-gradient(${THEME.saffron}10 1.5px, transparent 0)`, backgroundSize: '100px 100px' }}>

            {!activeModelId ? (
              <div className="flex flex-col items-center p-6 sm:p-10 w-full max-w-6xl animate-in fade-in pt-32 text-white">
                <div className="text-center mb-16">
                  <div className="w-32 h-32 mx-auto mb-8 border-[3px] border-dashed border-saffron/40 rounded-full flex items-center justify-center shadow-2xl animate-pulse"><Compass size={60} className="text-saffron" /></div>
                  <h2 className="text-4xl sm:text-6xl font-black uppercase text-white mb-6">Gita Visual Guide</h2>
                  <p className="text-white/80 max-w-2xl mx-auto italic text-xl font-serif">"A digital pilgrimage through Chapter 2 and 3 frameworks."</p>
                </div>
                {GITA_DATA.map(ch => (
                  <div key={ch.chapter} className="w-full mb-16 text-left">
                    <div className="flex items-center gap-4 mb-10 border-b border-indigo-500/30 pb-6">
                      <span className="text-2xl font-black text-indigo-950 bg-saffron px-4 py-1 rounded-xl">CH {ch.chapter}</span>
                      <span className="text-3xl font-black uppercase text-white tracking-widest">{ch.title}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {ch.models.map(m => (
                        <button key={m.id} onClick={() => handleModelSelect(m.id)} className="group p-8 bg-indigo-950/60 border border-indigo-900 rounded-[2.5rem] text-left transition-all hover:border-saffron/50 hover:scale-[1.03] shadow-2xl">
                          <h3 className="text-xl font-black text-white uppercase group-hover:text-saffron transition-colors">{m.name}</h3>
                          <p className="text-sm text-white/60 mt-2">{m.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row gap-12 items-start justify-center pt-24 sm:pt-32 w-full max-w-[1400px]">
                {activeModelId === 'atma-body' && <AtmaBodyModel intellectLevel={intellectLevel} ageProgress={ageProgress} setAgeProgress={setAgeProgress} />}
                {activeModelId === 'karma-yoga-cycle' && <KarmaCycleModel intellectLevel={intellectLevel} windowWidth={windowWidth} verses={VERSES_DB['karma-yoga-cycle']} />}
                {activeModelId === 'stitha-prajna' && <StithaPrajnaModel selectedQualityIndex={selectedQualityIndex} setSelectedQualityIndex={setSelectedQualityIndex} windowWidth={windowWidth} qualities={activeModelData?.qualities || []} />}
                {activeModelId === 'sat-asat' && <SatAsatModel selectedLayerIndex={selectedLayerIndex} setSelectedLayerIndex={setSelectedLayerIndex} windowWidth={windowWidth} layers={activeModelData?.layers || [
                  { id: 'sat', name: 'SAT (The Eternal)', desc: 'Unchanging reality.', color: THEME.saffron },
                  { id: 'mithya', name: 'MITHYA (The Flux)', desc: 'Dependent reality.', color: '#6366f1' },
                  { id: 'asat', name: 'ASAT (The Void)', desc: 'Non-existent.', color: '#334155' }
                ]} intellectLevel={intellectLevel} />}

                {activeModelData?.status === 'pending' && (
                  <div className="p-20 bg-indigo-950/60 rounded-[3rem] border border-indigo-500/30 text-center w-full max-w-[700px] text-white">
                    <Clock size={60} className="mx-auto mb-6 text-white/20" />
                    <h2 className="text-4xl font-black uppercase text-white mb-4">{activeModelData.name}</h2>
                    <p className="italic text-white/60">Visualization in process...</p>
                  </div>
                )}

                {activeModelData?.status === 'ready' && (
                  <div className="w-full lg:w-[420px] space-y-8 lg:sticky lg:top-32 text-white">
                    <div className="flex items-center gap-4 mb-4 px-4"><ScrollText className="text-saffron" size={32} /><h4 className="text-2xl font-black uppercase">Scripture</h4></div>
                    <div className="space-y-6 max-h-[800px] overflow-y-auto pr-4 custom-scrollbar text-white">
                      {(VERSES_DB[activeModelId] || []).map((v, i) => (
                        <div key={i} className="p-10 bg-indigo-950/60 border border-indigo-500/20 rounded-[2.5rem] shadow-xl text-white">
                          <span className="text-xs font-black text-white bg-saffron/40 px-3 py-1 rounded mb-4 inline-block uppercase">Verse {v.ref}</span>
                          <p className="text-sm text-saffronBright italic mb-4">"{v.sanskrit}"</p>
                          <p className="text-lg opacity-90 leading-relaxed font-sans text-white">"{v.text}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* BUDDHI & CHAT CONTROLS */}
        {activeModelId && (
          <div className="fixed bottom-24 lg:bottom-10 right-6 sm:right-8 z-[140] flex flex-col items-end gap-6">
            <div className="flex gap-3">
              <button onClick={() => setShowBuddhiOverlay(!showBuddhiOverlay)} className="w-12 h-12 bg-indigo-900 border border-indigo-500 rounded-full flex items-center justify-center text-saffron lg:hidden shadow-lg">{showBuddhiOverlay ? <EyeOff size={20} /> : <Eye size={20} />}</button>
              <button onClick={() => setChatOpen(!chatOpen)} className="w-12 h-12 sm:w-16 sm:h-16 bg-saffron rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-all"><MessageSquare size={windowWidth < 640 ? 20 : 32} /></button>
            </div>
            <div className={`w-[260px] sm:w-80 p-8 bg-indigo-950 border border-indigo-500 rounded-[3rem] shadow-2xl backdrop-blur-lg text-white transition-all ${!showBuddhiOverlay && windowWidth < 1024 ? 'translate-y-20 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
              <div className="flex items-center justify-between mb-5 text-white">
                <div className="flex items-center gap-3 font-black text-white"><div className="w-2 h-2 rounded-full bg-saffron animate-pulse" /> Buddhi</div>
                <span className="text-2xl font-mono font-black text-white">{intellectLevel}%</span>
              </div>
              <input type="range" className="w-full h-1.5 bg-deep rounded-full appearance-none cursor-pointer accent-saffron" value={intellectLevel} onChange={(e) => setIntellectLevel(e.target.value)} />
            </div>
          </div>
        )}

        {/* CHAT MODAL */}
        {chatOpen && (
          <div className="fixed bottom-52 lg:bottom-32 right-6 sm:right-8 z-[150] w-[90vw] sm:w-[420px] h-[550px] bg-indigo-950 border border-saffron/40 rounded-[3rem] shadow-2xl backdrop-blur-3xl flex flex-col overflow-hidden animate-in zoom-in-95">
            <div className="p-5 bg-saffron text-white flex justify-between items-center"><div className="flex items-center gap-3 text-lg uppercase font-black">Ask the Sage</div><button onClick={() => setChatOpen(false)}><X size={24} /></button></div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar text-white text-left">
              {chatMessages.length === 0 && <p className="text-center text-white/30 italic mt-32 text-xl font-serif font-semibold leading-relaxed">Seek and ye shall find the eternal wisdom of {activeModelData?.name || 'the Gita'}.</p>}
              {chatMessages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[85%] p-4 rounded-[1.5rem] text-base ${m.role === 'user' ? 'bg-indigo-600' : 'bg-indigo-900 border border-indigo-500/40 font-serif italic'}`}>{m.text}</div></div>
              ))}
              {isChatLoading && <div className="animate-pulse text-white/50 italic text-sm">Vidwan contemplating...</div>}
            </div>
            <div className="p-6 border-t border-indigo-900 bg-deep/40 flex items-center">
              <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Type your inquiry..." className="flex-1 bg-deep border border-indigo-500 rounded-2xl py-4 px-6 text-white focus:border-saffron outline-none" />
              <button onClick={handleSendMessage} disabled={isChatLoading} className="ml-3 p-3 text-saffron hover:text-white"><Send size={24} /></button>
            </div>
          </div>
        )}
      </main>

      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@1,400;1,700&family=Inter:wght@400;900&display=swap');
        .font-serif { font-family: 'Crimson Pro', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        .custom-scrollbar::-webkit-scrollbar { width: 5px; height: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #312e81; border-radius: 20px; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; height: 24px; width: 24px; border-radius: 50%; background: #f59e0b; cursor: pointer; border: 4px solid #020617; }
        .animate-spin-slow { animation: spin 15s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}} />
    </div>
  );
};

export default App;