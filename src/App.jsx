import React, { useState } from 'react';
import {
  User,
  Layers,
  Maximize2,
  Minimize2,
  Compass,
  ChevronRight,
  BookOpen,
  Search,
  LayoutGrid,
  Target,
  Info,
  ScrollText,
  Bookmark,
  ShieldCheck,
  Zap,
  Waves,
  Quote,
  RotateCcw,
  Users,
  Heart,
  Box,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronDown,
  Triangle,
  RotateCw
} from 'lucide-react';

// --- THEME CONSTANTS (ROYAL INDIGO & GOLD) ---
const THEME = {
  deep: '#020617', // Midnight Navy
  indigo: '#1e1b4b', // Deep Indigo Surface
  border: '#312e81', // Indigo border
  saffron: '#f59e0b', // Vibrant Gold/Saffron
  saffronBright: '#fbbf24',
  textMain: '#f8fafc', // Antique White
  textDim: '#94a3b8', // Blueish Gray
  accent: '#6366f1' // Indigo accent
};

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
        description: 'Comparison between the eternal Self (Sat) and the perishable container (Maya).',
        verses: [
          { ref: '2.19', sanskrit: 'नैनं वेत्ति हन्तारं', text: 'The Self is not slain when the body is slain.' },
          { ref: '2.20', sanskrit: 'न जायते म्रियते वा कदाचिन्', text: 'Atma is unborn, eternal, ever-existing, undying and primeval.' },
          { ref: '2.22', sanskrit: 'वासांसी जीर्णानि यथा विहाय', text: 'Just as a person discards old clothes and puts on new ones, the soul accepts new material bodies.' }
        ]
      },
      {
        id: 'sat-asat',
        status: 'ready',
        name: 'Reality Framework',
        type: 'Pyramid',
        description: 'The distinction between Sat (Real), Mithya (Apparent), and Asat (Unreal).',
        verses: [
          { ref: '2.16', sanskrit: 'नासतो विद्यते भावो नाभावो विद्यते सतः', text: 'The unreal (asat) has no existence; the real (sat) never ceases to be.' }
        ],
        layers: [
          { id: 'sat', name: 'SAT (The Eternal)', desc: 'Unchanging reality. The underlying substrate of all existence.', color: THEME.saffron },
          { id: 'mithya', name: 'MITHYA (The Flux)', desc: 'The appearing world. Dependent on Sat, it is constantly changing.', color: '#6366f1' },
          { id: 'asat', name: 'ASAT (The Void)', desc: 'That which has no existence. Total illusion.', color: '#334155' }
        ]
      },
      {
        id: 'karma-yoga-cycle',
        status: 'ready',
        name: 'Karma Yoga Cycle',
        type: 'Flow',
        description: 'Circular flow of action: Right Action → No Attachment → Equanimity.',
        verses: [
          { ref: '2.47', sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन', text: 'You have a right to perform your prescribed duty, but you are not entitled to the fruits of action.' },
          { ref: '2.50', sanskrit: 'योग: कर्मसु कौशलम्', text: 'Yoga is the art of all work. Equanimity in action rids one of karma.' }
        ]
      },
      {
        id: 'stitha-prajna',
        status: 'ready',
        name: 'Stitha Prajna',
        type: 'Mandala',
        description: 'The 18 qualities of a person established in steady wisdom.',
        verses: [
          { ref: '2.56', sanskrit: 'दुःखेष्वनुद्विग्नमना:', text: 'One who is not disturbed in mind amidst miseries or elated by happiness.' },
          { ref: '2.70', sanskrit: 'आपूर्यमाणमचलप्रतिष्ठं', text: 'Desires vanish like rivers merging into the ocean, which remains still.' }
        ],
        qualities: [
          { name: "Inner Contentment", highlight: "Satisfied in the self alone.", verse: "2.55" },
          { name: "Equanimity", highlight: "Detached from pain and pleasure.", verse: "2.56" },
          { name: "Freedom from Fear", highlight: "Beyond the grip of anxiety.", verse: "2.56" },
          { name: "Anger Mastery", highlight: "Free from impulse of wrath.", verse: "2.56" },
          { name: "Non-Attachment", highlight: "Beyond the reach of craving.", verse: "2.57" },
          { name: "Sense Withdrawal", highlight: "Like a tortoise pulling limbs in.", verse: "2.58" },
          { name: "Mental Focus", highlight: "Mind fixed on the truth.", verse: "2.61" },
          { name: "Deep Peace", highlight: "Desires vanish like rivers.", verse: "2.70" },
          { name: "Desire Diffusion", highlight: "Moves unattached among objects.", verse: "2.64" },
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

  const activeModelData = GITA_DATA.flatMap(ch => ch.models).find(m => m.id === activeModelId);

  const resetView = () => {
    setActiveModelId(null);
    setZoom(1);
    setAgeProgress(0);
    setSelectedQualityIndex(0);
    setSelectedLayerIndex(0);
  };

  const ModelRenderer = () => {
    if (!activeModelId) {
      return (
        <div className="flex flex-col items-center justify-center text-center p-24 opacity-40 select-none min-h-screen">
          <div className="w-48 h-48 mb-12 border-[3px] border-dashed border-saffron/30 rounded-full flex items-center justify-center animate-pulse shadow-[0_0_50px_rgba(245,158,11,0.1)]">
            <Compass size={80} className="text-saffron" strokeWidth={1} />
          </div>
          <h2 className="text-5xl font-black tracking-[0.4em] text-white uppercase mb-6">Gita Visual Guide</h2>
          <p className="text-white max-w-lg italic text-lg leading-relaxed">
            Select a framework from the library to explore the visual architecture of the Bhagavad Gita.
          </p>
        </div>
      );
    }

    // --- ATMA VS BODY ---
    if (activeModelId === 'atma-body') {
      return (
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-24 items-start justify-center max-w-[1400px] p-12 lg:p-24 animate-in fade-in zoom-in duration-700">
          <div className="relative flex flex-col items-center justify-center p-16 bg-indigo-950/40 rounded-[4rem] border border-indigo-500/30 shadow-[0_0_80px_rgba(0,0,0,0.4)] backdrop-blur-xl w-full max-w-[640px]">
            <div className="absolute top-12 left-12 flex items-center gap-5">
              <div className="p-3 bg-saffron/10 rounded-2xl text-saffron border border-saffron/20 shadow-inner"><Layers size={28} /></div>
              <h3 className="text-white font-black text-3xl tracking-tighter uppercase leading-none">Identity Model</h3>
            </div>

            <div className="flex w-full mt-32 gap-16 items-center">
              <div className="relative w-48 h-[400px] flex-shrink-0">
                <div
                  className="absolute inset-0 bg-indigo-800/30 transition-all duration-1000 border-2 border-indigo-400/20"
                  style={{
                    clipPath: 'polygon(50% 0%, 80% 10%, 95% 35%, 85% 70%, 75% 100%, 25% 100%, 15% 70%, 5% 35%, 20% 10%)',
                    opacity: 1 - (ageProgress * 0.7),
                    filter: `grayscale(${ageProgress})`
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full animate-pulse transition-all duration-700"
                    style={{
                      width: '90px', height: '90px',
                      backgroundColor: THEME.saffron,
                      boxShadow: `0 0 ${50 + (intellectLevel / 2)}px ${THEME.saffron}`,
                    }}
                  >
                    <div className="w-full h-full flex items-center justify-center text-[13px] font-black text-slate-950 uppercase tracking-tighter">Atma</div>
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-10">
                <div className="p-8 rounded-[2rem] border border-red-500/20 bg-red-500/5 shadow-2xl">
                  <span className="text-xs uppercase font-black text-red-400 tracking-widest block mb-2">Maya (Body)</span>
                  <p className="text-lg text-white font-bold mb-2">Temporary Container</p>
                  <p className="text-sm text-white italic font-serif leading-relaxed">"{activeModelData.verses[2].sanskrit}"</p>
                </div>
                <div className="p-8 rounded-[2rem] border border-saffron/30 bg-saffron/5 shadow-inner">
                  <span className="text-xs uppercase font-black text-saffron tracking-widest block mb-2">Sat (Soul)</span>
                  <p className="text-lg text-white font-bold mb-2">Indestructible Core</p>
                  <p className="text-sm text-saffron/70 italic font-serif leading-relaxed">"{activeModelData.verses[1].sanskrit}"</p>
                </div>
              </div>
            </div>

            <div className="w-full mt-20 px-4">
              <div className="flex justify-between items-center mb-6">
                <label className="text-xs text-white uppercase font-black tracking-widest">Life Cycle Simulation</label>
                <div className="text-xs text-saffron font-bold bg-saffron/20 border border-saffron/30 px-3 py-1.5 rounded-lg">Verse 2.13</div>
              </div>
              <div className="relative h-10 flex items-center group">
                <div className="absolute left-0 w-full h-2 bg-indigo-950 rounded-full border border-indigo-800 shadow-inner"></div>
                <input type="range" className="relative w-full h-full bg-transparent rounded-full appearance-none cursor-pointer accent-saffron" value={ageProgress * 100} onChange={(e) => setAgeProgress(e.target.value / 100)} />
              </div>
              <div className="flex justify-between mt-5 text-[11px] text-white font-black uppercase tracking-[0.25em] opacity-80">
                <span>Childhood</span><span>Youth</span><span>Old Age</span><span>Transition</span>
              </div>
            </div>
          </div>
          <VerseSidebar verses={activeModelData.verses} />
        </div>
      );
    }

    // --- REALITY FRAMEWORK ---
    if (activeModelId === 'sat-asat') {
      const selectedLayer = activeModelData.layers[selectedLayerIndex];
      return (
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-24 items-start justify-center max-w-[1400px] p-12 lg:p-24 animate-in fade-in zoom-in duration-700">
          <div className="relative flex flex-col items-center justify-center p-16 bg-indigo-950/40 rounded-[4rem] border border-indigo-500/30 shadow-2xl backdrop-blur-xl w-full max-w-[640px]">
            <div className="absolute top-12 left-12 flex items-center gap-5">
              <div className="p-3 bg-saffron/10 rounded-2xl text-saffron border border-saffron/20"><Triangle size={28} /></div>
              <h3 className="text-white font-black text-3xl tracking-tighter uppercase leading-none">Reality Levels</h3>
            </div>

            <div className="relative w-full h-[400px] mt-28 flex flex-col items-center justify-center gap-4">
              {activeModelData.layers.map((layer, i) => {
                const isActive = selectedLayerIndex === i;
                const width = [140, 240, 360][i];
                return (
                  <button key={layer.id} onClick={() => setSelectedLayerIndex(i)} className="group transition-all duration-500 relative" style={{ width: `${width}px` }}>
                    <div className={`w-full h-24 border-2 transition-all flex flex-col items-center justify-center rounded-2xl ${isActive ? 'bg-indigo-600/30 border-saffron shadow-[0_0_40px_rgba(245,158,11,0.25)]' : 'bg-indigo-950/60 border-indigo-500/30 hover:border-indigo-400'}`}>
                      <span className={`text-xs font-black tracking-[0.2em] mb-1 ${isActive ? 'text-saffron' : 'text-white'}`}>{layer.name}</span>
                      {isActive && <div className="w-12 h-[2px] bg-saffron/50 rounded-full animate-pulse" />}
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="mt-16 p-10 bg-indigo-900/40 border border-indigo-400/20 rounded-[2.5rem] w-full shadow-2xl">
              <h2 className="text-3xl font-black text-saffron uppercase tracking-tighter mb-3">{selectedLayer.name}</h2>
              <p className="text-lg text-white italic leading-relaxed border-l-4 border-saffron/40 pl-6 mb-4">{selectedLayer.desc}</p>
              <p className="text-xs text-white font-serif italic opacity-70">"{activeModelData.verses[0].sanskrit}"</p>
            </div>
          </div>
          <VerseSidebar verses={activeModelData.verses} />
        </div>
      )
    }

    // --- KARMA YOGA ---
    if (activeModelId === 'karma-yoga-cycle') {
      const steps = ["Right Action", "No Attachment", "Equanimity", "Purity", "Liberation"];
      return (
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-24 items-start justify-center max-w-[1400px] p-12 lg:p-24 animate-in fade-in zoom-in duration-700">
          <div className="relative flex flex-col items-center justify-center p-16 bg-indigo-950/40 rounded-[4rem] border border-indigo-500/30 shadow-2xl backdrop-blur-xl w-full max-w-[680px]">
            <div className="absolute top-12 left-12 flex items-center gap-5">
              <div className="p-3 bg-saffron/10 rounded-2xl text-saffron border border-saffron/20"><RotateCcw size={28} /></div>
              <h3 className="text-white font-black text-3xl tracking-tighter uppercase leading-none">Karma Cycle</h3>
            </div>

            <div className="relative w-96 h-96 mt-28 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full rotate-[-90deg]">
                <circle cx="192" cy="192" r="160" fill="none" stroke={THEME.border} strokeWidth="2" strokeDasharray="12 12" />
                <circle cx="192" cy="192" r="160" fill="none" stroke={THEME.saffron} strokeWidth="5" strokeDasharray="1005" strokeDashoffset={1005 - (intellectLevel * 10.05)} className="transition-all duration-1000 opacity-80" />
              </svg>
              <div className="z-10 text-center p-10 bg-indigo-900/80 rounded-full border border-indigo-400/30 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                <span className="text-xs font-black text-saffron uppercase tracking-[0.3em] block mb-2">Soul State</span>
                <div className="text-4xl font-black text-white uppercase tracking-tighter">{intellectLevel > 60 ? 'Flow' : 'Bound'}</div>
              </div>
              {steps.map((step, i) => {
                const angle = (i * 360) / steps.length;
                return (
                  <div key={step} className="absolute flex flex-col items-center transition-all duration-500" style={{ transform: `rotate(${angle}deg) translateY(-160px)` }}>
                    <div className="w-8 h-8 rounded-full bg-saffron border-4 border-indigo-950 shadow-lg flex items-center justify-center" style={{ transform: `rotate(-${angle}deg)` }}>
                      <div className="w-2 h-2 bg-indigo-950 rounded-full animate-ping" />
                    </div>
                    <div className="absolute top-12 whitespace-nowrap" style={{ transform: `rotate(-${angle}deg)` }}>
                      <div className="bg-indigo-900 border border-saffron/40 px-4 py-2 rounded-xl shadow-2xl">
                        <span className="text-xs font-black uppercase text-white tracking-[0.1em]">{step}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-28 p-10 bg-indigo-900/40 border-l-4 border-saffron rounded-2xl w-full">
              <Quote size={32} className="text-saffron mb-4 opacity-50" />
              <p className="text-xl text-white font-serif italic leading-relaxed mb-4">"{activeModelData.verses[0].text}"</p>
              <div className="text-xs text-saffron font-black uppercase tracking-[0.2em]">Chapter 2, Verse 2.47</div>
            </div>
          </div>
          <VerseSidebar verses={activeModelData.verses} />
        </div>
      )
    }

    // --- STITHA PRAJNA ---
    if (activeModelId === 'stitha-prajna') {
      const q = activeModelData.qualities[selectedQualityIndex];
      return (
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-24 items-start justify-center max-w-[1500px] p-12 animate-in fade-in zoom-in duration-700">
          <div className="relative flex flex-col items-center justify-center p-16 bg-indigo-950/40 rounded-[4rem] border border-indigo-500/30 shadow-2xl backdrop-blur-xl w-full max-w-[750px]">
            <div className="absolute top-12 left-12 flex items-center gap-5">
              <div className="p-3 bg-saffron/10 rounded-2xl text-saffron border border-saffron/20"><Waves size={28} /></div>
              <h3 className="text-white font-black text-3xl tracking-tighter uppercase leading-none">Steady Wisdom</h3>
            </div>

            <div className="relative w-[580px] h-[580px] mt-20 flex items-center justify-center">
              <div className="absolute w-40 h-40 rounded-full border-2 border-saffron/30 bg-indigo-900/60 flex items-center justify-center shadow-[0_0_60px_rgba(245,158,11,0.15)]">
                <span className="text-sm font-black text-saffron uppercase tracking-[0.3em] text-center leading-tight">Established<br />Wisdom</span>
              </div>
              {activeModelData.qualities.map((item, i) => {
                const angle = (i * 360) / 18;
                const active = selectedQualityIndex === i;
                return (
                  <button key={i} onClick={() => setSelectedQualityIndex(i)} className="absolute top-1/2 left-1/2 origin-left transition-all duration-300" style={{ transform: `rotate(${angle}deg) translateX(115px)` }}>
                    <div className={`px-4 py-2 rounded-full border transition-all text-[10px] font-black uppercase tracking-tighter ${active ? 'bg-saffron text-white border-white scale-125 z-50 shadow-[0_0_30px_rgba(255,255,255,0.4)]' : 'bg-indigo-900/60 text-white border-indigo-500/30 hover:border-saffron/50'}`} style={{ transform: `rotate(-${angle}deg)` }}>
                      {item.name}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-12 p-10 bg-indigo-900/80 border border-saffron/40 rounded-[3rem] w-full shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity"><ShieldCheck size={100} className="text-saffron" /></div>
              <div className="text-xs text-saffron uppercase font-black tracking-[0.4em] mb-4">Quality Detail</div>
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">{q.name}</h2>
              <p className="text-xl text-white italic leading-relaxed border-l-4 border-saffron pl-8 mb-6">"{q.highlight}"</p>
              <div className="flex items-center gap-4">
                <div className="px-5 py-2 bg-saffron text-white rounded-xl text-xs font-black">VERSE {q.verse}</div>
                <div className="text-xs text-white font-black uppercase tracking-widest opacity-60">Steady Mind in All duality</div>
              </div>
            </div>
          </div>
          <VerseSidebar verses={activeModelData.verses} />
        </div>
      )
    }

    return null;
  };

  const VerseSidebar = ({ verses }) => (
    <div className="w-[420px] space-y-8 animate-in slide-in-from-right duration-1000 hidden lg:block sticky top-32">
      <div className="flex items-center gap-3 mb-4 px-4">
        <ScrollText size={32} className="text-saffron" />
        <h4 className="text-xl font-black uppercase tracking-[0.2em] text-white">Verses</h4>
      </div>
      <div className="space-y-6 max-h-[750px] overflow-y-auto pr-6 custom-scrollbar">
        {verses && verses.map((v, i) => (
          <div key={i} className="p-10 bg-indigo-950/60 border border-indigo-500/20 rounded-[2.5rem] hover:border-saffron/40 transition-all group relative">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-black text-saffron bg-saffron/10 border border-saffron/30 px-3 py-1.5 rounded-xl tracking-widest uppercase leading-none">Verse {v.ref}</span>
              <Bookmark size={20} className="text-indigo-500 group-hover:text-saffron transition-colors" />
            </div>
            <p className="text-sm text-saffronBright/80 font-serif italic mb-4 leading-relaxed tracking-wide">"{v.sanskrit}"</p>
            <p className="text-lg text-white leading-relaxed font-sans font-medium opacity-95">"{v.text}"</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen w-screen bg-deep text-textMain overflow-hidden font-sans select-none">

      {/* --- SIDEBAR: NAVIGATION --- */}
      <aside className={`relative flex flex-col bg-indigo-950/80 border-r border-indigo-900/50 transition-all duration-500 z-50 ${isSidebarOpen ? 'w-96' : 'w-24'}`}>
        <div className="p-10 border-b border-indigo-900/50 flex items-center justify-between">
          <div className={`flex items-center gap-5 ${!isSidebarOpen && 'hidden'}`}>
            <div className="p-3 bg-saffron rounded-2xl shadow-xl shadow-saffron/30"><Compass size={32} className="text-white" /></div>
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Library</h2>
          </div>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-4 hover:bg-indigo-900 rounded-2xl text-white transition-all">
            <LayoutGrid size={32} />
          </button>
        </div>

        {isSidebarOpen && (
          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            <div className="relative mb-12">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/50" size={20} />
              <input
                type="text" placeholder="Explore Knowledge..."
                className="w-full bg-deep border border-indigo-900 rounded-2xl py-5 pl-16 pr-8 text-sm text-white focus:border-saffron outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {GITA_DATA.map((ch) => (
              <div key={ch.chapter} className="mb-12">
                <div className="flex items-center gap-4 px-2 mb-6">
                  <span className="text-xs font-black text-indigo-950 bg-saffron px-3 py-1.5 rounded-lg">CH {ch.chapter}</span>
                  <span className="text-sm font-black uppercase tracking-widest text-indigo-400">{ch.title}</span>
                </div>
                <div className="space-y-3">
                  {ch.models.map(m => (
                    <button key={m.id} onClick={() => setActiveModelId(m.id)}
                      className={`w-full text-left p-6 rounded-[2rem] flex items-center justify-between group transition-all border ${activeModelId === m.id ? 'bg-saffron border-saffron text-white shadow-2xl' : 'bg-indigo-950/40 border-indigo-900 hover:border-saffron/40 text-white/70'}`}
                    >
                      <div className="flex flex-col">
                        <span className={`text-base font-black uppercase leading-none mb-2 ${activeModelId === m.id ? 'text-white' : 'text-white'}`}>{m.name}</span>
                        <div className="flex items-center gap-3">
                          <span className={`text-[11px] font-black uppercase tracking-widest opacity-60`}>{m.type}</span>
                          {m.status === 'ready' ? <CheckCircle2 size={14} className="text-green-500" /> : <div className="w-2 h-2 rounded-full bg-indigo-800" />}
                        </div>
                      </div>
                      <ChevronRight size={20} className={activeModelId === m.id ? 'opacity-100' : 'opacity-20'} />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* --- MAIN INTERFACE --- */}
      <main className="relative flex-1 flex flex-col bg-deep overflow-auto scroll-smooth custom-scrollbar">

        {/* COMMAND BAR (BOTTOM LEFT) */}
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 lg:left-[calc(384px+40px)] lg:translate-x-0 z-[60] flex items-center gap-3 p-2 bg-indigo-950/90 border border-indigo-500/30 rounded-3xl backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-1 bg-deep p-1 rounded-2xl border border-indigo-900">
            <button onClick={() => setZoom(prev => Math.max(0.4, prev - 0.1))} className="p-3 hover:bg-indigo-900 rounded-xl text-white transition-colors"><Minimize2 size={24} /></button>
            <div className="px-6 flex items-center text-sm font-black text-white tracking-tighter">{Math.round(zoom * 100)}%</div>
            <button onClick={() => setZoom(prev => Math.min(2.5, prev + 0.1))} className="p-3 hover:bg-indigo-900 rounded-xl text-white transition-colors"><Maximize2 size={24} /></button>
          </div>
          {activeModelId && (
            <button onClick={resetView} className="px-8 py-4 bg-saffron text-white font-black text-sm uppercase rounded-2xl hover:bg-saffronBright transition-all shadow-xl active:scale-95 flex items-center gap-2">
              <RotateCw size={18} /> Clear Canvas
            </button>
          )}
        </div>

        {/* The Hub Status (Top Center) */}
        {!isSidebarOpen && (
          <div className="fixed top-10 left-1/2 -translate-x-1/2 z-40 px-8 py-4 bg-indigo-950 border border-indigo-500/30 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-4">
            <BookOpen size={24} className="text-saffron" />
            <span className="text-sm font-black uppercase tracking-[0.4em] text-white">Gita Knowledge Hub</span>
          </div>
        )}

        <div className="flex-1 min-h-screen flex items-center justify-center p-12 lg:p-24 relative overflow-visible">
          <div className="transition-all duration-1000 ease-in-out py-32"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'top center',
              backgroundImage: `radial-gradient(${THEME.saffron}15 1.5px, transparent 0)`,
              backgroundSize: '80px 80px'
            }}
          >
            <ModelRenderer />
            {zoom > 1 && (
              <div className="fixed bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 animate-bounce pointer-events-none">
                <span className="text-xs font-black uppercase tracking-widest text-white">Scroll Down</span>
                <ChevronDown size={20} className="text-saffron" />
              </div>
            )}
          </div>
        </div>

        {/* Global Intellect Control (FLOATING RIGHT-BOTTOM) */}
        {activeModelId && (
          <div className="fixed bottom-10 right-10 z-50 w-72 p-8 bg-indigo-950/90 border border-indigo-500/30 rounded-[2.5rem] backdrop-blur-xl shadow-2xl animate-in slide-in-from-bottom duration-500">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3 text-white font-black uppercase text-xs tracking-[0.2em]">
                <div className="w-3 h-3 rounded-full bg-saffron animate-pulse shadow-[0_0_15px_#f59e0b]" />
                Buddhi
              </div>
              <span className="text-lg font-mono font-black text-white">{intellectLevel}%</span>
            </div>
            <input type="range" className="w-full h-2 bg-deep rounded-full appearance-none cursor-pointer accent-saffron" value={intellectLevel} onChange={(e) => setIntellectLevel(e.target.value)} />
            <p className="mt-4 text-[10px] text-white uppercase tracking-widest font-bold leading-tight">Refines spiritual perception and reveals the SAT.</p>
          </div>
        )}
      </main>

      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@1,400;1,700&family=Inter:wght@400;900&display=swap');
        .font-serif { font-family: 'Crimson Pro', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #312e81; border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #f59e0b; }
        input[type=range]::-webkit-slider-thumb { 
          -webkit-appearance: none; 
          height: 24px; width: 24px; 
          border-radius: 50%; 
          background: #f59e0b; 
          cursor: pointer; 
          border: 4px solid #020617; 
          box-shadow: 0 0 20px rgba(245,158,11,0.6); 
        }
      `}} />
    </div>
  );
};

export default App;