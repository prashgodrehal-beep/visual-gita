import React, { useState, useEffect, useRef } from 'react';
import {
  Compass,
  ChevronRight,
  BookOpen,
  Search,
  LayoutGrid,
  Layers,
  Maximize2,
  Minimize2,
  ScrollText,
  Bookmark,
  ShieldCheck,
  Zap,
  Waves,
  Quote,
  RotateCcw,
  Clock,
  Sparkles,
  ChevronDown,
  Triangle,
  RotateCw,
  X,
  MessageSquare,
  Send,
  Loader2,
  TrendingUp,
  Home,
  RefreshCw
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

// --- DATA ---
const GITA_DATA = [
  {
    chapter: 2,
    title: "Sankhya Yoga",
    subtitle: "Yoga of Knowledge",
    models: [
      {
        id: 'atma-body',
        status: 'ready',
        name: 'Atma vs. Body',
        type: 'Dual Framework',
        description: 'Key Verses: 11–30. Atma as eternal, Body as perishable.',
        verses: [
          { ref: '2.19', sanskrit: 'नैनं वेत्ति हन्तारं', text: 'The Self is not slain when the body is slain.' },
          { ref: '2.20', sanskrit: 'न जायते म्रियते वा कदाचिन्', text: 'Atma is unborn, eternal, ever-existing, undying and primeval. Highlights: Unborn, changeless.' },
          { ref: '2.22', sanskrit: 'वासांसी जीर्णानि यथा विहाय', text: 'Just as a person discards old clothes and puts on new ones, the soul accepts new material bodies.' }
        ]
      },
      {
        id: 'sat-asat',
        status: 'ready',
        name: 'Reality Framework',
        type: 'Pyramid',
        description: 'Verse 2.16. Distinction between Sat (Real) and Asat (Unreal).',
        verses: [
          { ref: '2.16', sanskrit: 'नासतो विद्यते भावो नाभावो विद्यते सतः', text: 'The unreal (asat) has no existence; the real (sat) never ceases to be.' }
        ],
        layers: [
          { id: 'sat', name: 'SAT (The Eternal)', desc: 'Unchanging reality. The underlying substrate.', color: THEME.saffron },
          { id: 'mithya', name: 'MITHYA (The Flux)', desc: 'Dependent reality. Apparent existence.', color: '#6366f1' },
          { id: 'asat', name: 'ASAT (The Void)', desc: 'Non-existent. Total illusion.', color: '#334155' }
        ]
      },
      {
        id: 'karma-yoga-cycle',
        status: 'ready',
        name: 'Karma Yoga Cycle',
        type: 'Circular Flow',
        description: 'Key Verses: 47–50. Skill in action and detachment from fruits.',
        verses: [
          { ref: '2.47', sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन', text: 'You have a right to perform your prescribed duty, but you are not entitled to the fruits of action.' },
          { ref: '2.48', sanskrit: 'योगस्थ: कुरु कर्माणि', text: 'Perform your duty equipoised, abandoning all attachment to success or failure.' },
          { ref: '2.50', sanskrit: 'योग: कर्मसु कौशलम्', text: 'Yoga is skill in action. Strive for equanimity.' }
        ]
      },
      {
        id: 'stitha-prajna',
        status: 'ready',
        name: 'Stitha Prajna',
        type: 'Ladder of Detachment',
        description: 'Key Verses: 54–72. 18 qualities of established wisdom.',
        verses: [
          { ref: '2.56', sanskrit: 'दुःखेष्वनुद्विग्नमना:', text: 'Detached from pain and pleasure. Free from attachment, fear, and anger.' },
          { ref: '2.64-65', sanskrit: 'रागद्वेषवियुक्तैस्तु', text: 'Moves among sense objects, yet remains unattached.' },
          { ref: '2.70', sanskrit: 'आपूर्यमाणमचलप्रतिष्ठं', text: 'Desires vanish like rivers merging into the ocean, which remains still.' }
        ],
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
      }
    ]
  }
];

const App = () => {
  const [zoom, setZoom] = useState(1);
  const [activeModelId, setActiveModelId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedQualityIndex, setSelectedQualityIndex] = useState(0);
  const [selectedLayerIndex, setSelectedLayerIndex] = useState(0);
  const [intellectLevel, setIntellectLevel] = useState(80);
  const [ageProgress, setAgeProgress] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // AI & Chat States
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeModelData = GITA_DATA.flatMap(ch => ch.models).find(m => m.id === activeModelId);

  const callGemini = async (prompt, sys) => {
    let retries = 0;
    while (retries < 3) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            systemInstruction: { parts: [{ text: sys }] }
          })
        });
        const result = await response.json();
        return result.candidates?.[0]?.content?.parts?.[0]?.text;
      } catch (e) {
        retries++;
        await new Promise(r => setTimeout(r, 1000 * Math.pow(2, retries)));
      }
    }
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    const msg = chatInput;
    setChatInput("");
    setChatMessages(prev => [...prev, { role: 'user', text: msg }]);
    setIsChatLoading(true);
    const resp = await callGemini(msg, `Answer as a Vidwan (scholar) regarding ${activeModelData?.name || 'the Bhagavad Gita'}.`);
    setChatMessages(prev => [...prev, { role: 'ai', text: resp || "My connection to the ether is weak. Try again." }]);
    setIsChatLoading(false);
  };

  const resetView = () => {
    setActiveModelId(null);
    setZoom(1);
    setAgeProgress(0);
    setSelectedQualityIndex(0);
    setSelectedLayerIndex(0);
    setChatMessages([]);
    setChatOpen(false);
    if (windowWidth < 1024) setIsSidebarOpen(false);
  };

  const handleModelSelect = (id) => {
    setActiveModelId(id);
    if (windowWidth < 1024) setIsSidebarOpen(false);
  };

  const ModelRenderer = () => {
    if (!activeModelId) {
      return (
        <div className="flex flex-col items-center p-10 w-full max-w-6xl mx-auto select-none animate-in fade-in duration-500">
          <div className="text-center mb-16">
            <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-8 border-[4px] border-dashed border-saffron/40 rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(245,158,11,0.2)]">
              <Compass size={windowWidth < 640 ? 50 : 80} className="text-saffron" />
            </div>
            <h2 className="text-4xl sm:text-6xl font-black tracking-[0.2em] text-white uppercase mb-6 leading-tight drop-shadow-2xl">
              Gita Visual Guide
            </h2>
            <p className="text-white/80 max-w-3xl mx-auto italic text-xl sm:text-2xl leading-relaxed font-serif px-4">
              "A digital pilgrimage through the analytical and meditative frameworks of the Gita."
            </p>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GITA_DATA.flatMap(ch => ch.models).map((model) => (
              <button
                key={model.id}
                onClick={() => handleModelSelect(model.id)}
                className="group relative flex flex-col p-8 bg-indigo-950/40 border border-indigo-900 rounded-[2rem] text-left transition-all hover:bg-indigo-900/60 hover:border-saffron/50 hover:scale-[1.03] shadow-xl"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-indigo-900 rounded-2xl text-saffron border border-indigo-800 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                    {model.id === 'atma-body' ? <Layers size={24} /> :
                      model.id === 'sat-asat' ? <Triangle size={24} /> :
                        model.id === 'karma-yoga-cycle' ? <RotateCcw size={24} /> :
                          <Waves size={24} />}
                  </div>
                  {model.status === 'ready' ? (
                    <span className="px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-lg text-[10px] font-black text-green-500 uppercase tracking-widest">Ready</span>
                  ) : (
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black text-white/30 uppercase tracking-widest">Planned</span>
                  )}
                </div>
                <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2 group-hover:text-saffron transition-colors">{model.name}</h3>
                <p className="text-sm text-white/60 font-medium leading-relaxed mb-4">{model.description}</p>
                <div className="mt-auto flex items-center text-[10px] font-black text-saffron uppercase tracking-widest gap-2">
                  Explore Framework <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (activeModelId === 'atma-body') {
      return (
        <div className="flex flex-col lg:flex-row gap-10 items-start justify-center w-full max-w-[1400px] p-6 animate-in fade-in duration-500 pt-32">
          <div className="relative flex flex-col items-center justify-center p-12 bg-indigo-950 rounded-[3rem] border border-indigo-500/30 shadow-2xl w-full lg:max-w-[700px]">
            <div className="absolute top-10 left-10 flex items-center gap-4 text-white">
              <Layers className="text-saffron" size={32} />
              <h3 className="font-black text-2xl uppercase tracking-tighter">Atma vs Body</h3>
            </div>
            <div className="flex flex-col sm:flex-row w-full mt-24 gap-12 items-center">
              <div className="relative w-40 h-[380px] flex-shrink-0">
                <div className="absolute inset-0 bg-indigo-800/20 border-2 border-indigo-400/20 transition-all duration-1000" style={{ clipPath: 'polygon(50% 0%, 80% 10%, 95% 35%, 85% 70%, 75% 100%, 25% 100%, 15% 70%, 5% 35%, 20% 10%)', opacity: 1 - (ageProgress * 0.7), filter: `grayscale(${ageProgress})` }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full bg-saffron shadow-[0_0_40px_#f59e0b] w-20 h-20 flex items-center justify-center text-[10px] font-black text-indigo-950 uppercase">Atma</div>
                </div>
              </div>
              <div className="flex-1 w-full space-y-6">
                <div className="p-8 rounded-[2rem] border border-red-500/20 bg-red-500/5">
                  <span className="text-[10px] uppercase font-black text-red-400 tracking-widest block mb-1">Maya (Body)</span>
                  <p className="text-lg text-white font-bold">Temporary Container</p>
                </div>
                <div className="p-8 rounded-[2rem] border border-saffron/30 bg-saffron/5 shadow-inner">
                  <span className="text-[10px] uppercase font-black text-saffron tracking-widest block mb-1">Sat (Soul)</span>
                  <p className="text-lg text-white font-bold">Indestructible Core</p>
                </div>
              </div>
            </div>
            <div className="w-full mt-12 px-2">
              <div className="flex justify-between text-white text-[10px] font-bold uppercase tracking-widest mb-4"><span>Simulation</span><span>Verse 2.22</span></div>
              <input type="range" className="w-full h-2 bg-indigo-900 rounded-full appearance-none cursor-pointer accent-saffron" value={ageProgress * 100} onChange={(e) => setAgeProgress(e.target.value / 100)} />
            </div>
          </div>
          <VerseSidebar verses={activeModelData?.verses} />
        </div>
      );
    }

    if (activeModelId === 'karma-yoga-cycle') {
      const steps = [
        { label: "Right Action", pos: "top" },
        { label: "Detachment", pos: "right" },
        { label: "Equanimity", pos: "bottom" },
        { label: "Inner Purity", pos: "left" }
      ];
      return (
        <div className="flex flex-col lg:flex-row gap-10 items-start justify-center w-full max-w-[1400px] p-6 animate-in fade-in duration-500 pt-32">
          <div className="relative flex flex-col items-center justify-center p-12 bg-indigo-950 rounded-[3rem] border border-indigo-500/30 shadow-2xl w-full lg:max-w-[700px]">
            <div className="absolute top-10 left-10 flex items-center gap-4 text-white">
              <RotateCcw className="text-saffron" size={32} />
              <h3 className="font-black text-2xl uppercase tracking-tighter">Karma Cycle</h3>
            </div>
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 mt-28 mb-12 flex items-center justify-center">
              {/* Circular Path */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-indigo-700/50 animate-spin-slow" />
              <div className="absolute inset-4 rounded-full border border-saffron/20" />

              {/* Center Core */}
              <div className="z-10 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-indigo-900 border-2 border-saffron/40 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(245,158,11,0.15)]">
                <RefreshCw className={`text-saffron mb-2 ${intellectLevel > 50 ? 'animate-spin' : ''}`} style={{ animationDuration: `${6 - (intellectLevel / 20)}s` }} size={24} />
                <span className="text-[10px] font-black text-white uppercase tracking-widest text-center">Skill in<br />Action</span>
              </div>

              {/* Orbiting Nodes */}
              {steps.map((step, i) => {
                const angle = i * 90;
                return (
                  <div key={i} className="absolute w-full h-full flex items-center justify-center" style={{ transform: `rotate(${angle}deg)` }}>
                    <div className="flex flex-col items-center" style={{ transform: `translateY(-180px) rotate(-${angle}deg)` }}>
                      <div className={`w-10 h-10 rounded-full bg-indigo-950 border-2 border-saffron flex items-center justify-center shadow-lg`}>
                        <Zap size={16} className="text-saffron" />
                      </div>
                      <div className="mt-4 px-4 py-1.5 bg-indigo-900 border border-saffron/30 rounded-full shadow-2xl">
                        <span className="text-[10px] font-black text-white uppercase tracking-widest whitespace-nowrap">{step.label}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="p-8 bg-indigo-900/40 rounded-3xl border-l-4 border-saffron w-full">
              <Quote className="text-saffron/40 mb-3" size={24} />
              <p className="text-xl text-white italic font-serif leading-relaxed mb-4">"{activeModelData.verses[0].text}"</p>
              <div className="flex justify-between items-center text-[10px] font-black text-saffron uppercase tracking-[0.2em]">
                <span>Verse {activeModelData.verses[0].ref}</span>
                <span className="px-3 py-1 bg-saffron text-indigo-950 rounded flex items-center gap-2">Skill in Action <Sparkles size={10} /></span>
              </div>
            </div>
          </div>
          <VerseSidebar verses={activeModelData?.verses} />
        </div>
      );
    }

    if (activeModelId === 'stitha-prajna') {
      const q = activeModelData?.qualities?.[selectedQualityIndex] || { name: "Wisdom", highlight: "Detached Awareness", verse: "2.54" };
      return (
        <div className="flex flex-col lg:flex-row gap-10 items-start justify-center w-full max-w-[1500px] p-6 animate-in fade-in duration-500 pt-32">
          <div className="relative flex flex-col items-center justify-center p-12 bg-indigo-950 rounded-[3rem] border border-indigo-500/30 shadow-2xl w-full lg:max-w-[750px]">
            <div className="absolute top-10 left-10 flex items-center gap-4 text-white">
              <Waves className="text-saffron" size={32} />
              <h3 className="font-black text-2xl uppercase tracking-tighter">Mastery Ladder</h3>
            </div>
            <div className="relative w-full h-[550px] sm:w-[650px] flex items-center justify-center mt-20">
              <div className="absolute w-40 h-40 rounded-full border-2 border-saffron/30 bg-indigo-900/60 flex items-center justify-center text-saffron font-black text-xs uppercase tracking-widest text-center shadow-2xl">Steady<br />Mind</div>
              {activeModelData?.qualities?.map((item, i) => {
                const angle = (i * 360) / 18;
                const active = selectedQualityIndex === i;
                const dist = windowWidth < 640 ? 145 : 130;
                return (
                  <button key={i} onClick={() => setSelectedQualityIndex(i)} className="absolute top-1/2 left-1/2 origin-left transition-all duration-300" style={{ transform: `rotate(${angle}deg) translateX(${dist}px)` }}>
                    <div className={`px-4 py-1.5 rounded-full border text-[9px] font-black uppercase transition-all ${active ? 'bg-saffron text-indigo-950 border-white scale-125 z-50 shadow-[0_0_30px_#f59e0b]' : 'bg-indigo-900/60 text-white border-indigo-500/30 hover:border-saffron/50'}`} style={{ transform: `rotate(-${angle}deg)` }}>
                      {item.name}
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="mt-12 p-8 bg-indigo-900/80 border border-saffron/30 rounded-[2.5rem] w-full text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5"><TrendingUp size={80} className="text-saffron" /></div>
              <h2 className="text-3xl font-black uppercase mb-3 text-saffron tracking-tighter">{q.name}</h2>
              <p className="text-xl italic font-serif leading-relaxed opacity-90 border-l-4 border-saffron pl-6">"{q.highlight}"</p>
              <div className="mt-5 flex gap-3"><span className="px-4 py-1.5 bg-saffron text-indigo-950 text-xs font-black rounded-lg">Verse {q.verse}</span></div>
            </div>
          </div>
          <VerseSidebar verses={activeModelData?.verses} />
        </div>
      );
    }

    if (activeModelId === 'sat-asat') {
      const selectedLayer = activeModelData?.layers?.[selectedLayerIndex] || { name: "SAT", desc: "Eternal substrate" };
      return (
        <div className="flex flex-col lg:flex-row gap-10 items-start justify-center w-full max-w-[1400px] p-6 animate-in fade-in duration-500 pt-32">
          <div className="relative flex flex-col items-center justify-center p-12 bg-indigo-950 rounded-[4rem] border border-indigo-500/30 shadow-2xl w-full lg:max-w-[700px]">
            <div className="absolute top-12 left-12 flex items-center gap-5 text-white">
              <Triangle className="text-saffron" size={32} />
              <h3 className="font-black text-2xl uppercase tracking-tighter">Reality Pyramid</h3>
            </div>
            <div className="relative w-full h-[400px] mt-28 flex flex-col items-center justify-center gap-4">
              {activeModelData?.layers?.map((layer, i) => {
                const isActive = selectedLayerIndex === i;
                const width = [140, 240, 360][i];
                return (
                  <button key={layer.id} onClick={() => setSelectedLayerIndex(i)} className="group transition-all duration-500" style={{ width: `${width}px` }}>
                    <div className={`w-full h-24 border-2 transition-all flex flex-col items-center justify-center rounded-[1.5rem] ${isActive ? 'bg-indigo-600/30 border-saffron shadow-2xl' : 'bg-indigo-950/60 border-indigo-500/30 hover:border-indigo-400'}`}>
                      <span className={`text-xs font-black tracking-[0.2em] mb-1 ${isActive ? 'text-saffron' : 'text-white'}`}>{layer.name}</span>
                      {isActive && <div className="w-12 h-[2px] bg-saffron rounded-full animate-pulse" />}
                    </div>
                  </button>
                )
              })}
            </div>
            <div className="mt-12 p-8 bg-indigo-900 border border-indigo-400/20 rounded-[2rem] w-full text-white">
              <h2 className="text-3xl font-black uppercase mb-2 text-saffron">{selectedLayer.name}</h2>
              <p className="text-lg italic font-serif leading-relaxed border-l-4 border-saffron pl-6">{selectedLayer.desc}</p>
            </div>
          </div>
          <VerseSidebar verses={activeModelData?.verses} />
        </div>
      )
    }

    return (
      <div className="flex flex-col items-center justify-center p-12 sm:p-24 text-center">
        <div className="w-24 h-24 bg-indigo-900/60 rounded-3xl border border-indigo-500/30 flex items-center justify-center text-white/30 mb-8 animate-pulse"><Clock size={48} /></div>
        <h2 className="text-5xl font-black text-white uppercase mb-4">{activeModelData?.name || "Model"}</h2>
        <p className="text-white/60 text-xl italic font-serif max-w-2xl mx-auto mb-10">Developing visual architecture for this model. Scripture mapping is ongoing.</p>
        <button onClick={resetView} className="px-10 py-4 bg-indigo-900 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-indigo-800 transition-all">Go Back Home</button>
      </div>
    );
  };

  const VerseSidebar = ({ verses }) => (
    <div className="w-full lg:w-[450px] space-y-8 lg:sticky lg:top-32 animate-in slide-in-from-right duration-700">
      <div className="flex items-center gap-4 mb-4 px-4 text-white">
        <ScrollText className="text-saffron" size={36} />
        <h4 className="text-2xl font-black uppercase tracking-widest">Scripture</h4>
      </div>
      <div className="space-y-8 max-h-none lg:max-h-[850px] overflow-y-visible lg:overflow-y-auto pr-0 lg:pr-6 custom-scrollbar">
        {verses?.map((v, i) => (
          <div key={i} className="p-10 bg-indigo-950 border border-indigo-500/30 rounded-[3rem] text-white shadow-xl hover:border-saffron/30 transition-all">
            <span className="text-xs font-black text-saffron bg-saffron/10 border border-saffron/30 px-4 py-1.5 rounded-xl mb-6 inline-block uppercase tracking-widest leading-none">Verse {v.ref}</span>
            <p className="text-sm text-saffronBright font-serif italic mb-6 leading-relaxed opacity-80">"{v.sanskrit}"</p>
            <p className="text-xl leading-relaxed font-sans font-medium opacity-90 italic">"{v.text}"</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen w-screen bg-deep text-textMain overflow-hidden font-sans select-none relative">

      {isSidebarOpen && windowWidth < 1024 && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[90]" onClick={() => setIsSidebarOpen(false)} />
      )}

      <aside className={`fixed lg:relative flex flex-col bg-indigo-950 lg:bg-indigo-950/80 border-r border-indigo-900 transition-all duration-500 z-[100] h-full ${isSidebarOpen ? 'w-[90vw] sm:w-96 translate-x-0' : 'w-0 lg:w-24 -translate-x-full lg:translate-x-0'}`}>
        <div className="p-8 sm:p-10 border-b border-indigo-900 flex items-center justify-between">
          <button
            onClick={resetView}
            className={`flex items-center gap-5 transition-all hover:opacity-80 ${(!isSidebarOpen && windowWidth > 1024) && 'hidden'}`}
          >
            <div className="p-3 bg-saffron rounded-2xl shadow-xl shadow-saffron/30"><Compass size={32} className="text-white" /></div>
            <h2 className="text-2xl font-black uppercase text-white">Library</h2>
          </button>
          {windowWidth < 1024 && isSidebarOpen && <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-white/50"><X size={28} /></button>}
          {!isSidebarOpen && windowWidth > 1024 && <button onClick={() => setIsSidebarOpen(true)} className="p-4 text-white w-full flex justify-center hover:text-saffron transition-all"><LayoutGrid size={32} /></button>}
        </div>

        {isSidebarOpen && (
          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            <button onClick={resetView} className={`w-full text-left p-6 rounded-[2rem] flex items-center gap-4 mb-8 border border-indigo-900 hover:border-saffron/40 transition-all bg-indigo-900/20 text-white/60 hover:text-saffron`}>
              <Home size={20} />
              <span className="text-base font-black uppercase tracking-tight">Dashboard</span>
            </button>

            {GITA_DATA.map((ch) => (
              <div key={ch.chapter} className="mb-12 text-white">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs bg-saffron text-indigo-950 font-black px-3 py-1 rounded-lg uppercase">CH {ch.chapter}</span>
                  <span className="text-sm font-black uppercase tracking-widest opacity-60">{ch.title}</span>
                </div>
                <div className="space-y-4">
                  {ch.models.map(m => (
                    <button key={m.id} onClick={() => handleModelSelect(m.id)}
                      className={`w-full text-left p-6 rounded-[2rem] flex items-center justify-between border transition-all ${activeModelId === m.id ? 'bg-saffron border-saffron text-indigo-950 shadow-2xl scale-[1.02]' : 'bg-indigo-950 border-indigo-900 text-white/80 hover:border-saffron/40'}`}
                    >
                      <span className="text-base font-black uppercase tracking-tight">{m.name}</span>
                      <ChevronRight size={20} className={activeModelId === m.id ? 'opacity-100' : 'opacity-20'} />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </aside>

      <main className="relative flex-1 flex flex-col bg-[#020617] overflow-auto scroll-smooth custom-scrollbar">

        {windowWidth < 1024 && !isSidebarOpen && (
          <button onClick={() => setIsSidebarOpen(true)} className="fixed top-8 left-8 z-[80] p-4 bg-indigo-950 border border-indigo-500 rounded-2xl text-saffron shadow-2xl"><LayoutGrid size={28} /></button>
        )}

        {/* HUD: TOP TITLE BAR (FIXED COLOR & OVERLAP) */}
        <button
          onClick={resetView}
          className={`fixed top-8 left-1/2 -translate-x-1/2 z-40 px-8 py-3 bg-indigo-950 border border-indigo-500/40 rounded-full shadow-[0_0_40px_rgba(0,0,0,0.6)] backdrop-blur-md flex items-center gap-3 transition-all hover:scale-105 active:scale-95 ${activeModelId && windowWidth < 640 ? 'opacity-0' : 'opacity-100'}`}
        >
          <BookOpen size={windowWidth < 640 ? 20 : 24} className="text-saffron drop-shadow-[0_0_8px_#f59e0b]" />
          <span className="text-sm sm:text-base font-black uppercase tracking-[0.2em] text-white whitespace-nowrap">Gita Knowledge Hub</span>
        </button>

        {/* HUD: BOTTOM CONTROLS */}
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 lg:left-[calc(384px+48px)] lg:translate-x-0 z-[60] flex items-center gap-4 p-3 bg-indigo-950 border border-indigo-500/40 rounded-[3rem] shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-3 bg-black/80 p-2 rounded-2xl border border-indigo-800">
            <button onClick={() => setZoom(prev => Math.max(0.4, prev - 0.1))} className="p-2 text-white hover:text-saffron transition-colors"><Minimize2 size={24} /></button>
            <div className="px-6 text-base font-black text-white tracking-widest">{Math.round(zoom * 100)}%</div>
            <button onClick={() => setZoom(prev => Math.min(2.5, prev + 0.1))} className="p-2 text-white hover:text-saffron transition-colors"><Maximize2 size={24} /></button>
          </div>
          {activeModelId && (
            <button onClick={resetView} className="px-10 py-5 bg-saffron text-white font-black text-sm uppercase rounded-[1.5rem] shadow-xl active:scale-95 flex items-center gap-3 hover:bg-saffronBright transition-all">
              <RotateCw size={20} /> Clear Map
            </button>
          )}
        </div>

        {/* MAIN CANVAS */}
        <div className="flex-1 w-full min-h-screen flex items-center justify-center p-10 lg:p-20 relative overflow-visible">
          <div className="transition-all duration-700 ease-out w-full flex justify-center py-20"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: activeModelId ? 'top center' : 'center center',
              backgroundImage: `radial-gradient(${THEME.saffron}10 1.5px, transparent 0)`,
              backgroundSize: '80px 80px'
            }}>
            <ModelRenderer />
          </div>
        </div>

        {/* BUDDHI & CHAT */}
        {activeModelId && (
          <div className="fixed bottom-32 lg:bottom-10 right-8 z-[110] flex flex-col items-end gap-6">
            <button onClick={() => setChatOpen(!chatOpen)} className="w-16 h-16 bg-saffron rounded-full flex items-center justify-center text-white shadow-[0_0_50px_rgba(245,158,11,0.5)] hover:scale-110 active:scale-95 transition-all"><MessageSquare size={32} /></button>
            <div className="w-80 p-8 bg-indigo-950 border border-indigo-500 rounded-[3rem] shadow-2xl backdrop-blur-lg text-white">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3 font-black uppercase text-xs tracking-widest"><div className="w-3 h-3 rounded-full bg-saffron animate-pulse" /> Buddhi</div>
                <span className="text-2xl font-mono font-black">{intellectLevel}%</span>
              </div>
              <input type="range" className="w-full h-2 bg-deep rounded-full appearance-none cursor-pointer accent-saffron" value={intellectLevel} onChange={(e) => setIntellectLevel(e.target.value)} />
              <p className="mt-4 text-[10px] text-white/60 uppercase font-black tracking-widest text-center">Stabilizes SAT Perception</p>
            </div>
          </div>
        )}

        {/* CHAT MODAL */}
        {chatOpen && (
          <div className="fixed bottom-52 lg:bottom-32 right-8 z-[120] w-[90vw] sm:w-[420px] h-[600px] bg-indigo-950 border border-saffron/40 rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] backdrop-blur-3xl flex flex-col overflow-hidden animate-in zoom-in-95">
            <div className="p-6 bg-saffron text-white flex justify-between items-center"><div className="flex items-center gap-3 text-lg"><Sparkles size={24} /><span className="font-black uppercase tracking-widest">Ask the Sage</span></div><button onClick={() => setChatOpen(false)}><X size={28} /></button></div>
            <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar text-white">
              {chatMessages.length === 0 && <p className="text-center text-white/30 italic mt-32 text-xl font-serif font-semibold leading-relaxed">"Seek and ye shall find the eternal wisdom of {activeModelData?.name || 'the Gita'}."</p>}
              {chatMessages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[85%] p-6 rounded-[2rem] text-lg ${m.role === 'user' ? 'bg-indigo-600 border border-indigo-400' : 'bg-indigo-900 font-serif italic border border-indigo-500/40'}`}>{m.text}</div></div>
              ))}
              {isChatLoading && <div className="bg-indigo-900/60 p-4 rounded-2xl animate-pulse text-white/50 italic text-base">Contemplating scripture...</div>}
            </div>
            <div className="p-8 border-t border-indigo-900 bg-deep/40">
              <div className="relative flex items-center"><input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Type your inquiry..." className="w-full bg-deep border border-indigo-500 rounded-2xl py-5 px-6 text-white focus:border-saffron outline-none text-lg" /><button onClick={handleSendMessage} disabled={isChatLoading} className="absolute right-3 p-3 text-saffron hover:text-white transition-colors"><Send size={28} /></button></div>
            </div>
          </div>
        )}
      </main>

      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@1,400;1,700&family=Inter:wght@400;900&display=swap');
        .font-serif { font-family: 'Crimson Pro', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #312e81; border-radius: 20px; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; height: 28px; width: 28px; border-radius: 50%; background: #f59e0b; cursor: pointer; border: 5px solid #020617; box-shadow: 0 0 25px rgba(245,158,11,0.6); }
        .animate-spin-slow { animation: spin 12s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}} />
    </div>
  );
};

export default App;