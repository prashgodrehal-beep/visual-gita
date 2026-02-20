import React, { useState, useEffect, useRef } from 'react';
import {
  Compass, ChevronRight, BookOpen, Search, LayoutGrid, Layers, Maximize2,
  Minimize2, ScrollText, Bookmark, ShieldCheck, Zap, Waves, Quote,
  RotateCcw, Clock, Sparkles, ChevronDown, Triangle, RotateCw, X,
  MessageSquare, Send, Loader2, TrendingUp, Home, RefreshCw, Eye, EyeOff,
  GitBranch, CircleUser, ZapOff, Users, Heart, ArrowRight, Scale,
  Anchor, Flame, Ship, CloudRain, Binary, Ghost, UserCheck, FlameKindling,
  Building2, EyeIcon, Wind, Target, Activity, Split, ListChecks, CheckCircle2
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
      { id: 'stitha-prajna', status: 'ready', name: 'Stitha Prajna', type: 'Ladder of Detachment', description: '18 qualities of established wisdom.' },
      { id: 'wisdom-lenses', status: 'ready', name: 'Two Lenses of Wisdom', type: 'Venn Diagram', description: 'Analytical (Sankhya) vs. Practical (Yoga) wisdom.' },
      { id: 'rebirth-cycle', status: 'ready', name: 'The Rebirth Cycle', type: 'Loop', description: 'The journey of the soul through transitions.' },
      { id: 'righteous-decision', status: 'ready', name: 'Decision Framework', type: 'Logic Tree', description: 'Choosing duty over delusion.' },
      { id: 'mind-hierarchy', status: 'ready', name: 'Mind Control Loop', type: 'Hierarchy', description: 'Senses → Mind → Intellect → Soul.' }
    ]
  },
  {
    chapter: 3,
    title: "Karma Yoga",
    subtitle: "Yoga of Action",
    models: [
      { id: 'two-paths', status: 'ready', name: 'Paths to Realization', type: 'Branch', description: 'Path of Knowledge vs. Path of Action.' },
      { id: 'yajna-framework', status: 'ready', name: 'Cosmic Cooperation', type: 'Circular Cycle', description: 'The sacrifice that sustains creation.' },
      { id: 'threefold-duty', status: 'ready', name: 'Structure of Duty', type: 'Framework', description: 'Prescribed duty to selfless offering.' },
      { id: 'ego-less-action', status: 'ready', name: 'Gunatita Karma', type: 'Flow', description: 'Gunas act, not the ego.' },
      { id: 'desire-anger-vortex', status: 'ready', name: 'Desire-Anger Vortex', type: 'Spiral', description: 'The downward spiral of desire.' },
      { id: 'chariot-analogy', status: 'ready', name: 'Inner Chariot', type: 'Diagram', description: 'Model of inner instruments.' },
      { id: 'leaders-ripple', status: 'ready', name: 'Leadership Ripple', type: 'Social Model', description: 'Leaders setting standards.' },
      { id: 'action-worship', status: 'ready', name: 'Action as Worship', type: 'Metaphor', description: 'Daily work as divine offering.' }
    ]
  },
  {
    chapter: 4,
    title: "Jnana Karma Sanyasa Yoga",
    subtitle: "Knowledge and Action",
    models: [
      { id: 'divine-descent', status: 'ready', name: 'Avatara Principle', type: 'Timeline', description: 'The reason and timing of Divine descent.' },
      { id: 'four-varnas', status: 'ready', name: 'Guna Distribution', type: 'Structure', description: 'Social distribution based on Guna/Karma.' },
      { id: 'sacrifice-types', status: 'ready', name: 'Twelve Yajnas', type: 'Catalog', description: 'Various forms of spiritual sacrifice.' },
      { id: 'knowledge-boat', status: 'ready', name: 'Knowledge Boat', type: 'Metaphor', description: 'Crossing the ocean of delusion.' },
      { id: 'knowledge-fire', status: 'ready', name: 'Knowledge Fire', type: 'Visual', description: 'Burning seeds of past actions.' }
    ]
  },
  {
    chapter: 5,
    title: "Karma Sanyasa Yoga",
    subtitle: "Yoga of Renunciation",
    models: [
      { id: 'renunciation-vs-action', status: 'ready', name: 'Renunciation vs Action', type: 'Comparison', description: 'Sanyasa vs. Karma Yoga side-by-side.' },
      { id: 'freedom-detachment', status: 'ready', name: 'Path to Peace', type: 'Flowchart', description: 'Detachment → Purity → Peace.' },
      { id: 'nine-gates', status: 'ready', name: 'City of Nine Gates', type: 'Anatomy', description: 'The soul residing in the bodily city.' },
      { id: 'sage-vision', status: 'ready', name: 'Vision of Equality', type: 'Grid', description: 'Seeing divinity in all beings (Jnani Vision).' }
    ]
  },
  {
    chapter: 6,
    title: "Dhyana Yoga",
    subtitle: "Yoga of Meditation",
    models: [
      { id: 'yoga-ladder', status: 'ready', name: 'The Yoga Ladder', type: 'Ascent', description: 'Progress from active work to silent meditation.' },
      { id: 'mind-friend-enemy', status: 'ready', name: 'Friend vs Enemy Mind', type: 'Dual State', description: 'Controlled mind as friend, uncontrolled as foe.' },
      { id: 'moderation-yoga', status: 'ready', name: 'Path of Moderation', type: 'Balance', description: 'The "Middle Way" in food, sleep, and work.' },
      { id: 'windless-lamp', status: 'ready', name: 'Windless Lamp', type: 'Metaphor', description: 'The steady mind in meditation.' },
      { id: 'self-vision', status: 'ready', name: 'Equanimous Vision', type: 'Focus', description: 'Seeing the Self in all and all in the Self.' }
    ]
  }
];

const VERSES_DB = {
  'atma-body': [{ ref: '2.19', text: 'The Self is not slain.' }, { ref: '2.22', text: 'Just as a person discards old clothes...' }],
  'sat-asat': [{ ref: '2.16', text: 'The unreal has no existence; the real never ceases to be.' }],
  'karma-yoga-cycle': [{ ref: '2.47', text: 'You have a right to perform duty, but not to its fruits.' }],
  'stitha-prajna': [{ ref: '2.56', text: 'One whose mind is undisturbed by misery.' }],
  'wisdom-lenses': [{ ref: '2.39', text: 'Analytical wisdom told; now hear of Yoga.' }],
  'rebirth-cycle': [{ ref: '2.13', text: 'Soul passes through childhood, youth, old age...' }],
  'righteous-decision': [{ ref: '2.41', text: 'Resolute intellect is single-pointed.' }],
  'mind-hierarchy': [{ ref: '3.42', text: 'Senses are above matter, mind above senses, intellect above mind.' }],
  'two-paths': [{ ref: '3.3', text: 'Paths of Knowledge and Action.' }],
  'yajna-framework': [{ ref: '3.14', text: 'Cycle of rain, food, and beings.' }],
  'threefold-duty': [{ ref: '3.19', text: 'Work as a detached offering.' }],
  'ego-less-action': [{ ref: '3.27', text: 'Gunas do work; ego thinks "I am the doer."' }],
  'desire-anger-vortex': [{ ref: '3.37', text: 'Desire and anger are the all-devouring enemies.' }],
  'chariot-analogy': [{ ref: '3.43', text: 'Control the lower self by the higher Self.' }],
  'leaders-ripple': [{ ref: '3.21', text: 'Whatever a great man does, others follow.' }],
  'action-worship': [{ ref: '3.30', text: 'Surrender actions to Me.' }],
  'divine-descent': [{ ref: '4.7', text: 'Whenever Dharma declines, I manifest.' }],
  'four-varnas': [{ ref: '4.13', text: 'Orders created based on Guna and Karma.' }],
  'sacrifice-types': [{ ref: '4.33', text: 'Knowledge-sacrifice is superior.' }],
  'knowledge-boat': [{ ref: '4.36', text: 'Knowledge carries you across sin.' }],
  'knowledge-fire': [{ ref: '4.37', text: 'Fire of knowledge burns Karma.' }],
  'renunciation-vs-action': [{ ref: '5.2', text: 'Both renunciation and action lead to liberation, but Karma Yoga is superior.' }],
  'freedom-detachment': [{ ref: '5.7', text: 'One who is in union, whose self is purified, is not tainted by action.' }],
  'nine-gates': [{ ref: '5.13', text: 'Soul sits in the city of nine gates.' }],
  'sage-vision': [{ ref: '5.18', text: 'The wise see divinity in a priest, cow, elephant, dog, dog-eater.' }],
  'yoga-ladder': [{ ref: '6.3', text: 'Action is the means for beginners; silence for the advanced.' }],
  'mind-friend-enemy': [{ ref: '6.5', text: 'For one who has conquered the mind, it is a friend; for others, an enemy.' }],
  'moderation-yoga': [{ ref: '6.16', text: 'Yoga is not for one who eats too much or too little, or sleeps too much.' }],
  'windless-lamp': [{ ref: '6.19', text: 'A lamp in a windless place does not flicker.' }],
  'self-vision': [{ ref: '6.29', text: 'Sees the Self in all beings.' }]
};

// ==========================================
// SHARED COMPONENTS
// ==========================================

const VerseSidebar = ({ verses = [] }) => (
  <div className="w-full lg:w-[420px] space-y-6 lg:sticky lg:top-32 animate-in slide-in-from-right duration-700 mt-8 lg:mt-0 text-left">
    <div className="flex items-center gap-3 mb-2 px-4 text-white">
      <ScrollText className="text-saffron shadow-[0_0_10px_#f59e0b]" size={32} />
      <h4 className="text-lg sm:text-2xl font-black uppercase tracking-widest text-white">Scripture</h4>
    </div>
    <div className="space-y-4 max-h-none lg:max-h-[700px] overflow-y-visible lg:overflow-y-auto pr-0 lg:pr-4 custom-scrollbar text-white">
      {verses?.map((v, i) => (
        <div key={i} className="p-6 sm:p-10 bg-indigo-950/60 border border-indigo-500/30 rounded-[2rem] text-white text-left relative shadow-xl">
          <span className="text-[9px] font-black text-white bg-saffron/80 px-3 py-1 rounded-lg mb-4 inline-block uppercase tracking-widest">Verse {v?.ref}</span>
          <p className="text-base sm:text-lg leading-relaxed font-sans font-medium opacity-90">"{String(v?.text || '')}"</p>
        </div>
      ))}
    </div>
  </div>
);

// ==========================================
// MODULAR MODELS DEFINITIONS
// ==========================================

const AtmaBodyModel = ({ ageProgress, setAgeProgress }) => (
  <div className="relative flex flex-col items-center justify-center p-8 sm:p-12 bg-indigo-950 rounded-[2.5rem] border border-indigo-500/30 shadow-2xl w-full lg:max-w-[700px]">
    <div className="absolute top-10 left-10 flex items-center gap-4 text-white">
      <Layers className="text-saffron shadow-[0_0_15px_#f59e0b]" size={32} />
      <h3 className="font-black text-2xl uppercase tracking-tighter">Atma vs Body</h3>
    </div>
    <div className="flex flex-col sm:flex-row w-full mt-24 gap-12 items-center">
      <div className="relative w-40 h-[380px] flex-shrink-0">
        <div className="absolute inset-0 bg-indigo-800/20 border-2 border-indigo-400/20 transition-all duration-1000" style={{ clipPath: 'polygon(50% 0%, 80% 10%, 95% 35%, 85% 70%, 75% 100%, 25% 100%, 15% 70%, 5% 35%, 20% 10%)', opacity: 1 - (ageProgress * 0.7), filter: `grayscale(${ageProgress})` }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-full bg-saffron shadow-[0_0_40px_#f59e0b] w-20 h-20 flex items-center justify-center text-[11px] font-black text-white uppercase drop-shadow-md">Atma</div>
        </div>
      </div>
      <div className="flex-1 w-full space-y-6">
        <div className="p-8 rounded-[2rem] border border-red-500/20 bg-red-500/5 text-left text-white shadow-xl">
          <span className="text-[10px] uppercase font-black text-red-400 tracking-widest block mb-1">Maya (Body)</span>
          <p className="text-lg font-bold">Temporary Container</p>
        </div>
        <div className="p-8 rounded-[2rem] border border-saffron/30 bg-saffron/10 shadow-inner text-left text-white font-black">
          <span className="text-[10px] uppercase font-black text-saffron tracking-widest block mb-1">Sat (Soul)</span>
          <p className="text-lg font-bold">Indestructible Core</p>
        </div>
      </div>
    </div>
    <div className="w-full mt-12 px-2"><input type="range" className="w-full h-1.5 bg-indigo-900 rounded-full appearance-none cursor-pointer accent-saffron" value={ageProgress * 100} onChange={(e) => setAgeProgress(e.target.value / 100)} /></div>
  </div>
);

const KarmaCycleModel = ({ intellectLevel, windowWidth, verses = [] }) => {
  const steps = [{ label: "Action" }, { label: "Detachment" }, { label: "Equanimity" }, { label: "Purity" }];
  const mainVerse = verses?.[0] || { text: "Skill in action.", ref: "2.47" };
  return (
    <div className="relative flex flex-col items-center justify-center p-8 sm:p-12 bg-indigo-950 rounded-[2.5rem] border border-indigo-500/30 shadow-2xl w-full lg:max-w-[700px]">
      <div className="absolute top-10 left-10 flex items-center gap-4 text-white">
        <RotateCcw className="text-saffron shadow-[0_0_15px_#f59e0b]" size={32} />
        <h3 className="font-black text-2xl uppercase tracking-tighter">Karma Cycle</h3>
      </div>
      <div className="relative w-64 h-64 sm:w-96 sm:h-96 mt-20 mb-8 flex items-center justify-center text-white" style={{ transform: `scale(${windowWidth < 640 ? 0.75 : 1})` }}>
        <div className="absolute inset-0 rounded-full border border-dashed border-indigo-700/50 animate-spin-slow" />
        <div className="z-10 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-indigo-900 border-2 border-saffron/40 flex flex-col items-center justify-center shadow-xl">
          <RefreshCw className={`text-saffron mb-1 sm:mb-2 ${intellectLevel > 50 ? 'animate-spin' : ''}`} style={{ animationDuration: `${6 - (intellectLevel / 20)}s` }} size={24} />
          <span className="text-[8px] sm:text-[10px] font-black text-white uppercase tracking-widest text-center leading-tight">Skill in Action</span>
        </div>
        {steps.map((step, i) => (
          <div key={i} className="absolute w-full h-full flex items-center justify-center" style={{ transform: `rotate(${i * 90}deg)` }}>
            <div className="flex flex-col items-center" style={{ transform: `translateY(-180px) rotate(-${i * 90}deg)` }}>
              <div className="w-8 h-8 rounded-full bg-indigo-950 border border-saffron flex items-center justify-center shadow-lg text-white"><Zap size={14} /></div>
              <div className="mt-3 px-3 py-1 bg-indigo-900 border border-saffron rounded-full shadow-lg"><span className="text-[8px] sm:text-[10px] font-black text-white uppercase tracking-tighter">{step.label}</span></div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-6 bg-indigo-900/40 rounded-[2rem] border-l-4 border-saffron w-full text-left text-white shadow-xl">
        <p className="text-base sm:text-lg italic font-serif leading-relaxed text-white">"{String(mainVerse.text)}"</p>
      </div>
    </div>
  );
};

const StithaPrajnaModel = ({ selectedQualityIndex, setSelectedQualityIndex, windowWidth, qualities = [] }) => {
  const q = qualities?.[selectedQualityIndex] || { name: "Wisdom", highlight: "Detached Awareness", verse: "2.54" };
  const mandalaScale = windowWidth < 640 ? 0.65 : 1;
  const list = Array.isArray(qualities) ? qualities : [];
  return (
    <div className="relative flex flex-col items-center justify-center p-8 sm:p-12 bg-indigo-950 rounded-[2.5rem] border border-indigo-500/30 shadow-2xl w-full lg:max-w-[750px]">
      <div className="absolute top-10 left-10 flex items-center gap-4 text-white">
        <Waves className="text-saffron shadow-[0_0_15px_#f59e0b]" size={32} />
        <h3 className="font-black text-2xl uppercase tracking-tighter">Mastery Ladder</h3>
      </div>
      <div className="relative w-full h-[400px] sm:h-[600px] flex items-center justify-center mt-16 sm:mt-20 text-white" style={{ transform: `scale(${mandalaScale})` }}>
        <div className="absolute w-24 h-24 sm:w-40 sm:h-40 rounded-full border border-saffron/30 bg-indigo-900/60 flex items-center justify-center text-saffron font-black text-xs uppercase text-center shadow-xl">Steady Mind</div>
        {list.map((item, i) => {
          const angle = (i * 360) / (list.length || 1);
          const active = selectedQualityIndex === i;
          return (
            <button key={i} onClick={() => setSelectedQualityIndex(i)} className="absolute top-1/2 left-1/2 origin-left transition-all duration-300" style={{ transform: `rotate(${angle}deg) translateX(130px)` }}>
              <div className={`px-2 sm:px-4 py-1 sm:py-1.5 rounded-full border text-[7px] sm:text-[9px] font-black uppercase transition-all ${active ? 'bg-saffron text-white border-white scale-125 z-50 shadow-lg' : 'bg-indigo-900/60 text-white border-indigo-500/30 hover:border-saffron/50'}`} style={{ transform: `rotate(-${angle}deg)` }}>{item.name}</div>
            </button>
          );
        })}
      </div>
      <div className="mt-8 p-6 sm:p-8 bg-indigo-900/80 border border-saffron/30 rounded-[2rem] w-full text-white shadow-2xl relative text-left font-black">
        <h2 className="text-xl sm:text-2xl font-black uppercase text-saffron tracking-tighter">{q.name}</h2>
        <p className="text-base italic font-serif leading-relaxed opacity-90 border-l-2 border-saffron pl-4 text-white">"{q.highlight}"</p>
      </div>
    </div>
  );
};

const SatAsatModel = ({ selectedLayerIndex, setSelectedLayerIndex, windowWidth, layers = [], intellectLevel }) => {
  const list = Array.isArray(layers) ? layers : [];
  const selectedLayer = list[selectedLayerIndex] || { name: "SAT", desc: "Eternal substrate" };
  return (
    <div className="relative flex flex-col items-center justify-center p-8 sm:p-12 bg-indigo-950 rounded-[2.5rem] border border-indigo-500/30 shadow-2xl w-full lg:max-w-[700px]">
      <div className="absolute top-12 left-12 flex items-center gap-5 text-white font-black">
        <Triangle className="text-saffron shadow-[0_0_15px_#f59e0b]" size={32} />
        <h3 className="font-black text-2xl uppercase tracking-tighter">Reality Pyramid</h3>
      </div>
      <div className="relative w-full h-[400px] mt-24 flex flex-col items-center justify-center gap-3 text-white">
        {list.map((layer, i) => {
          const isActive = selectedLayerIndex === i;
          const width = [140, 240, 360][i] || 200;
          return (
            <button key={layer.id} onClick={() => setSelectedLayerIndex(i)} className="group transition-all duration-500" style={{ width: `${width}px`, opacity: layer.id === 'sat' ? (intellectLevel / 100) + 0.2 : 1.2 - (intellectLevel / 100) }}>
              <div className={`w-full h-16 sm:h-24 border transition-all flex flex-col items-center justify-center rounded-xl sm:rounded-[1.5rem] ${isActive ? 'bg-indigo-600/30 border-saffron shadow-lg' : 'bg-indigo-950/60 border-indigo-500/30'}`}>
                <span className={`text-[10px] sm:text-xs font-black tracking-widest text-white uppercase`}>{layer.name}</span>
              </div>
            </button>
          );
        })}
      </div>
      <div className="mt-8 p-6 sm:p-8 bg-indigo-900 border border-indigo-400/20 rounded-[1.5rem] w-full text-white text-left font-black">
        <h2 className="text-xl sm:text-3xl font-black uppercase mb-2 text-saffron">{selectedLayer.name}</h2>
        <p className="text-sm sm:text-lg italic font-serif leading-relaxed border-l-2 border-saffron pl-4 text-white">{selectedLayer.desc}</p>
      </div>
    </div>
  );
};

const ComparisonTable = () => (
  <div className="relative flex flex-col items-center justify-center p-8 sm:p-12 bg-indigo-950 rounded-[2.5rem] border border-indigo-500/30 shadow-2xl w-full lg:max-w-[800px]">
    <div className="absolute top-10 left-10 flex items-center gap-4 text-white">
      <Split className="text-saffron shadow-[0_0_15px_#f59e0b]" size={32} />
      <h3 className="font-black text-2xl uppercase tracking-tighter">Renunciation vs Action</h3>
    </div>
    <div className="w-full mt-24 overflow-hidden rounded-3xl border border-indigo-500/40">
      <div className="grid grid-cols-2 bg-indigo-900/80 border-b border-indigo-500/40">
        <div className="p-6 text-center font-black uppercase text-saffron tracking-widest border-r border-indigo-500/40">Karma Sanyasa</div>
        <div className="p-6 text-center font-black uppercase text-white tracking-widest">Karma Yoga</div>
      </div>
      {[
        ["Renounces all action", "Renounces attachment"],
        ["For contemplative mind", "For active mind"],
        ["Difficult without purity", "Easier for most"],
        ["Wisdom-based liberation", "Wisdom-based liberation"]
      ].map(([left, right], i) => (
        <div key={i} className="grid grid-cols-2 border-b border-indigo-500/20 bg-indigo-950/40 text-white font-black">
          <div className="p-6 text-center text-sm border-r border-indigo-500/20">{left}</div>
          <div className="p-6 text-center text-sm">{right}</div>
        </div>
      ))}
    </div>
    <p className="mt-8 text-sm font-bold text-saffron uppercase">Verse 5.2: Karma Yoga is Superior</p>
  </div>
);

const FreedomDetachmentFlow = () => (
  <div className="relative flex flex-col items-center justify-center p-8 sm:p-12 bg-indigo-950 rounded-[2.5rem] border border-indigo-500/30 shadow-2xl w-full lg:max-w-[700px]">
    <div className="absolute top-10 left-10 flex items-center gap-4 text-white">
      <TrendingUp className="text-saffron shadow-[0_0_15px_#f59e0b]" size={32} />
      <h3 className="font-black text-2xl uppercase tracking-tighter">Freedom Flow</h3>
    </div>
    <div className="w-full mt-24 flex flex-col items-center gap-4 text-white">
      {["Performs Action", "Inner Detachment", "Mental Purity", "Deep Peace"].map((step, i) => (
        <React.Fragment key={i}>
          <div className={`w-full p-6 text-center rounded-2xl border-2 transition-all ${i === 3 ? 'bg-saffron text-white font-black border-white shadow-xl' : 'bg-indigo-900 border-indigo-700'}`}>
            <span className="uppercase font-black text-sm tracking-widest drop-shadow-md">{step}</span>
          </div>
          {i < 3 && <ChevronDown size={24} className="text-saffron animate-bounce" />}
        </React.Fragment>
      ))}
    </div>
    <p className="mt-10 text-[10px] text-indigo-400 font-black uppercase text-center">Path from Verses 5.7–5.12</p>
  </div>
);

const JnaniVisionModel = () => (
  <div className="relative flex flex-col items-center justify-center p-8 sm:p-12 bg-indigo-950 rounded-[2.5rem] border border-indigo-500/30 shadow-2xl w-full lg:max-w-[750px]">
    <div className="absolute top-10 left-10 flex items-center gap-4 text-white">
      <EyeIcon className="text-saffron shadow-[0_0_15px_#f59e0b]" size={32} />
      <h3 className="font-black text-2xl uppercase tracking-tighter">Jnani's Vision</h3>
    </div>
    <div className="w-full mt-24 grid grid-cols-2 md:grid-cols-3 gap-4 text-white">
      {["Learned Brahmana", "Cow", "Elephant", "Dog", "Dog-eater"].map((being, i) => (
        <div key={i} className="p-6 bg-indigo-900 border border-indigo-700 rounded-3xl flex flex-col items-center group hover:border-saffron transition-all">
          <span className="text-[10px] font-black uppercase text-white mb-3 text-center leading-tight drop-shadow-sm">{being}</span>
          <div className="w-10 h-10 rounded-full bg-saffron border-4 border-white flex items-center justify-center shadow-lg">
            <Sparkles size={20} className="text-white drop-shadow-md" />
          </div>
        </div>
      ))}
      <div className="p-6 bg-indigo-950 border border-indigo-500 rounded-3xl flex items-center justify-center text-center">
        <span className="text-xs font-black uppercase text-saffron drop-shadow-sm">Same Brahman in All</span>
      </div>
    </div>
    <p className="mt-10 text-sm italic font-serif text-white text-center">"The wise look equally upon all beings." (5.18)</p>
  </div>
);

const MindFriendEnemyModel = () => (
  <div className="relative flex flex-col items-center justify-center p-8 sm:p-12 bg-indigo-950 rounded-[2.5rem] border border-indigo-500/30 shadow-2xl w-full lg:max-w-[700px]">
    <div className="absolute top-10 left-10 flex items-center gap-4 text-white">
      <Target className="text-saffron shadow-[0_0_15px_#f59e0b]" size={32} />
      <h3 className="font-black text-2xl uppercase tracking-tighter">Mind Framework</h3>
    </div>
    <div className="w-full mt-24 flex gap-6 text-white font-black">
      <div className="flex-1 p-8 bg-indigo-900/60 border border-green-500/30 rounded-3xl text-center shadow-lg">
        <UserCheck className="mx-auto mb-4 text-white" size={40} />
        <span className="text-xs font-black uppercase tracking-widest">Friend</span>
        <p className="text-[10px] mt-4 leading-relaxed opacity-100">"For one who has conquered the mind."</p>
      </div>
      <div className="flex-1 p-8 bg-indigo-900/60 border border-red-500/30 rounded-3xl text-center shadow-lg">
        <ZapOff className="mx-auto mb-4 text-white" size={40} />
        <span className="text-xs font-black uppercase tracking-widest">Enemy</span>
        <p className="text-[10px] mt-4 leading-relaxed opacity-100">"For one who is uncontrolled."</p>
      </div>
    </div>
    <p className="mt-10 text-[10px] text-white/50 uppercase font-black text-center">Verse 6.5–6.6</p>
  </div>
);

const ModerationModel = () => (
  <div className="relative flex flex-col items-center justify-center p-8 sm:p-12 bg-indigo-950 rounded-[2.5rem] border border-indigo-500/30 shadow-2xl w-full lg:max-w-[700px]">
    <div className="absolute top-10 left-10 flex items-center gap-4 text-white font-black">
      <Scale className="text-saffron shadow-[0_0_15px_#f59e0b]" size={32} />
      <h3 className="font-black text-2xl uppercase tracking-tighter">Path of Moderation</h3>
    </div>
    <div className="w-full mt-24 flex flex-col gap-3 text-white">
      {[
        { icon: <Heart size={16} />, label: "Eating (Aahara)", desc: "Neither too much nor fasting." },
        { icon: <Clock size={16} />, label: "Sleep (Nidra)", desc: "Neither excessive nor deprived." },
        { icon: <Activity size={16} />, label: "Work (Vihara)", desc: "Balanced effort and recreation." }
      ].map((item, i) => (
        <div key={i} className="p-6 bg-indigo-900/80 border border-indigo-700 rounded-2xl flex items-center gap-6 shadow-md">
          <div className="p-3 bg-saffron rounded-full text-white shadow-inner">{item.icon}</div>
          <div className="text-left">
            <span className="text-xs font-black uppercase text-white tracking-widest">{item.label}</span>
            <p className="text-xs text-white opacity-80 font-medium">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
    <p className="mt-8 text-sm italic font-serif text-white text-center">"Yoga is moderation in all activities." (6.16)</p>
  </div>
);

const YogaLadderModel = () => (
  <div className="relative flex flex-col items-center justify-center p-8 sm:p-12 bg-indigo-950 rounded-[2.5rem] border border-indigo-500/30 shadow-2xl w-full lg:max-w-[700px]">
    <div className="absolute top-10 left-10 flex items-center gap-4 text-white font-black">
      <TrendingUp className="text-saffron shadow-[0_0_15px_#f59e0b]" size={32} />
      <h3 className="font-black text-2xl uppercase tracking-tighter">The Ascent</h3>
    </div>
    <div className="w-full mt-24 flex flex-col gap-4 text-white">
      {["Silence (Advanced/Arudha)", "Meditation (Transition)", "Action (Beginner/Arurukshu)"].map((s, i) => (
        <div key={i} className={`p-5 border text-center rounded-xl shadow-lg font-black transition-all ${i === 0 ? 'bg-saffron text-white border-white' : 'bg-indigo-900 text-white border-indigo-700 opacity-90'}`}>
          <span className="text-xs font-black uppercase tracking-widest drop-shadow-md">{s}</span>
        </div>
      ))}
    </div>
    <p className="mt-10 text-[10px] text-white opacity-60 uppercase font-black">Verse 6.3 - Transition from work to stillness</p>
  </div>
);

const WindlessLampModel = () => (
  <div className="relative flex flex-col items-center justify-center p-8 sm:p-12 bg-indigo-950 rounded-[2.5rem] border border-indigo-500/30 shadow-2xl w-full lg:max-w-[700px]">
    <div className="absolute top-10 left-10 flex items-center gap-4 text-white">
      <Wind className="text-saffron shadow-[0_0_15px_#f59e0b]" size={32} />
      <h3 className="font-black text-2xl uppercase tracking-tighter">Windless Lamp</h3>
    </div>
    <div className="w-full mt-24 flex flex-col items-center text-white">
      <div className="p-12 bg-indigo-900 border-4 border-white rounded-[3rem] relative shadow-2xl">
        <div className="w-12 h-16 bg-saffron rounded-t-full shadow-[0_0_40px_#f59e0b] mx-auto animate-pulse" />
        <div className="w-16 h-12 bg-indigo-950 border-2 border-white mt-4 mx-auto rounded-xl" />
      </div>
      <p className="mt-8 text-base font-black uppercase tracking-widest text-saffron drop-shadow-lg">Dhyana: Total Stillness</p>
      <p className="text-xs text-white opacity-70 mt-2 font-serif">"Like a lamp in a windless place, the mind does not flicker." (6.19)</p>
    </div>
  </div>
);

// Reuse JnaniVision for SelfVision but with chapter 6 labels
const SelfVisionModel = () => <JnaniVisionModel />;

// ==========================================
// MAIN APP COMPONENT (ORCHESTRATOR)
// ==========================================

const App = () => {
  const [zoom, setZoom] = useState(1);
  const [activeModelId, setActiveModelId] = useState(null);
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
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const apiKey = "";

  const resetView = () => {
    setActiveModelId(null); setZoom(1); setAgeProgress(0);
    setSelectedQualityIndex(0); setSelectedLayerIndex(0);
    setChatMessages([]); setChatOpen(false);
  };

  const handleModelSelect = (id) => setActiveModelId(id);

  const callGemini = async (prompt, sys) => {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], systemInstruction: { parts: [{ text: sys }] } })
      });
      const result = await response.json();
      return result.candidates?.[0]?.content?.parts?.[0]?.text;
    } catch (e) { return "Connection broken."; }
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    const msg = chatInput; setChatInput("");
    setChatMessages(prev => [...prev, { role: 'user', text: msg }]);
    setIsChatLoading(true);
    const resp = await callGemini(msg, `Answer as a Scholar regarding: ${activeModelId}.`);
    setChatMessages(prev => [...prev, { role: 'ai', text: String(resp || " contemplate deeply...") }]);
    setIsChatLoading(false);
  };

  const activeModelData = GITA_DATA.flatMap(ch => ch.models).find(m => m.id === activeModelId);

  return (
    <div className="flex h-screen w-screen bg-[#020617] text-white overflow-hidden font-sans select-none relative">
      <main className="relative flex-1 flex flex-col bg-[#020617] overflow-auto scroll-smooth custom-scrollbar">
        {/* HUD HEADER */}
        <button onClick={resetView} className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-2.5 bg-indigo-950 border border-indigo-500/40 rounded-full shadow-2xl backdrop-blur-md flex items-center gap-3 hover:scale-105 active:scale-95 ${activeModelId ? 'opacity-30' : 'opacity-100'}`}>
          <BookOpen size={18} color={THEME.saffron} className="drop-shadow-[0_0_12px_rgba(245,158,11,0.8)]" />
          <span className="text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-white">Gita Knowledge Hub</span>
        </button>

        {/* BOTTOM COMMANDS */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 lg:left-[calc(32px+48px)] lg:translate-x-0 z-[130] flex items-center gap-3 p-2 bg-indigo-950 border border-indigo-500/40 rounded-[2rem] shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-1 bg-black/60 p-1 rounded-[1.5rem] border border-indigo-800 text-white">
            <button onClick={() => setZoom(prev => Math.max(0.4, prev - 0.1))} className="p-2 text-white hover:text-saffron transition-colors"><Minimize2 size={18} /></button>
            <div className="px-3 text-xs sm:text-sm font-black text-white hidden sm:block">{Math.round(zoom * 100)}%</div>
            <button onClick={() => setZoom(prev => Math.min(2.5, prev + 0.1))} className="p-2 text-white hover:text-saffron transition-colors"><Maximize2 size={18} /></button>
          </div>
          {activeModelId && <button onClick={resetView} className="px-5 sm:px-8 py-3 bg-saffron text-white font-black text-[10px] sm:text-xs uppercase rounded-[1.25rem] active:scale-95 shadow-lg"><RotateCw className="inline mr-2" size={14} /> Reset</button>}
        </div>

        {/* CANVAS */}
        <div className={`flex-1 w-full flex items-start justify-center p-4 relative overflow-visible min-h-screen pt-32`}>
          <div className="transition-all duration-700 ease-out w-full flex justify-center pb-32" style={{ transform: `scale(${zoom})`, transformOrigin: 'top center', backgroundImage: `radial-gradient(${THEME.saffron}10 1.5px, transparent 0)`, backgroundSize: '100px 100px' }}>

            {!activeModelId ? (
              <div className="flex flex-col items-center p-6 w-full max-w-6xl animate-in fade-in pt-32 text-white">
                <div className="text-center mb-16">
                  <div className="w-32 h-32 mx-auto mb-8 border-[3px] border-dashed border-saffron/40 rounded-full flex items-center justify-center animate-pulse shadow-2xl"><Compass size={60} className="text-saffron" /></div>
                  <h2 className="text-4xl sm:text-6xl font-black uppercase text-white mb-6 tracking-widest drop-shadow-lg">Gita Visual Guide</h2>
                  <p className="text-white/80 max-w-2xl mx-auto italic text-xl font-serif">"Mapping Chapters 2 through 6."</p>
                </div>
                {GITA_DATA.map(ch => (
                  <div key={ch.chapter} className="w-full mb-16 text-left">
                    <div className="flex items-center gap-4 mb-10 border-b border-indigo-500/30 pb-6">
                      <span className="text-2xl font-black text-indigo-950 bg-saffron px-4 py-1 rounded-xl shadow-lg">CH {ch.chapter}</span>
                      <span className="text-3xl font-black uppercase text-white tracking-widest">{ch.title}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {ch.models.map(m => (
                        <button key={m.id} onClick={() => handleModelSelect(m.id)} className="group p-8 bg-indigo-950/60 border border-indigo-900 rounded-[2.5rem] text-left transition-all hover:bg-indigo-900/80 hover:border-saffron/50 hover:scale-[1.03] shadow-2xl text-white">
                          <div className="mb-4 p-2 bg-saffron w-fit rounded-lg text-white shadow-md">
                            {m.id.includes('body') ? <Layers size={20} /> : m.id.includes('karma') ? <RotateCcw size={20} /> : m.id.includes('vision') ? <EyeIcon size={20} /> : <Sparkles size={20} />}
                          </div>
                          <h3 className="text-xl font-black text-white uppercase group-hover:text-saffron transition-colors tracking-tight">{m.name}</h3>
                          <p className="text-sm text-white/60 mt-2 font-medium line-clamp-2">{m.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row gap-12 items-start justify-center pt-24 sm:pt-32 w-full max-w-[1400px]">
                {activeModelId === 'atma-body' && <AtmaBodyModel ageProgress={ageProgress} setAgeProgress={setAgeProgress} />}
                {activeModelId === 'karma-yoga-cycle' && <KarmaCycleModel intellectLevel={intellectLevel} windowWidth={windowWidth} verses={VERSES_DB['karma-yoga-cycle']} />}
                {activeModelId === 'stitha-prajna' && <StithaPrajnaModel selectedQualityIndex={selectedQualityIndex} setSelectedQualityIndex={setSelectedQualityIndex} windowWidth={windowWidth} qualities={GITA_DATA[0].models.find(m => m.id === 'stitha-prajna').qualities} />}
                {activeModelId === 'sat-asat' && <SatAsatModel selectedLayerIndex={selectedLayerIndex} setSelectedLayerIndex={setSelectedLayerIndex} layers={GITA_DATA[0].models.find(m => m.id === 'sat-asat').layers} intellectLevel={intellectLevel} />}
                {activeModelId === 'renunciation-vs-action' && <ComparisonTable />}
                {activeModelId === 'freedom-detachment' && <FreedomDetachmentFlow />}
                {activeModelId === 'sage-vision' && <JnaniVisionModel />}
                {activeModelId === 'yoga-ladder' && <YogaLadderModel />}
                {activeModelId === 'mind-friend-enemy' && <MindFriendEnemyModel />}
                {activeModelId === 'moderation-yoga' && <ModerationModel />}
                {activeModelId === 'windless-lamp' && <WindlessLampModel />}
                {activeModelId === 'self-vision' && <SelfVisionModel />}

                <VerseSidebar verses={VERSES_DB[activeModelId] || []} />
              </div>
            )}
          </div>
        </div>

        {/* BUDDHI & CHAT */}
        {activeModelId && (
          <div className="fixed bottom-24 lg:bottom-10 right-6 sm:right-8 z-[140] flex flex-col items-end gap-6">
            <div className="flex gap-3">
              <button onClick={() => setShowBuddhiOverlay(!showBuddhiOverlay)} className="w-12 h-12 bg-indigo-900 border border-indigo-500 rounded-full flex items-center justify-center text-saffron lg:hidden shadow-lg">{showBuddhiOverlay ? <EyeOff size={20} /> : <Eye size={20} />}</button>
              <button onClick={() => setChatOpen(!chatOpen)} className="w-12 h-12 sm:w-16 sm:h-16 bg-saffron rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-all"><MessageSquare size={windowWidth < 640 ? 20 : 32} /></button>
            </div>
            <div className={`w-[260px] sm:w-80 p-8 bg-indigo-950 border border-indigo-500 rounded-[3rem] shadow-2xl backdrop-blur-lg text-white transition-all ${!showBuddhiOverlay && windowWidth < 1024 ? 'translate-y-20 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3 font-black uppercase text-xs tracking-widest text-white"><div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-saffron animate-pulse" /> Buddhi</div>
                <span className="text-2xl font-mono font-black text-white">{intellectLevel}%</span>
              </div>
              <input type="range" className="w-full h-1.5 bg-deep rounded-full appearance-none cursor-pointer accent-saffron" value={intellectLevel} onChange={(e) => setIntellectLevel(e.target.value)} />
            </div>
          </div>
        )}

        {/* CHAT MODAL */}
        {chatOpen && (
          <div className="fixed bottom-52 lg:bottom-32 right-6 sm:right-8 z-[150] w-[90vw] sm:w-[420px] h-[550px] bg-indigo-950 border border-saffron rounded-[2.5rem] sm:rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden animate-in zoom-in-95">
            <div className="p-5 sm:p-6 bg-saffron text-indigo-950 flex justify-between items-center shadow-lg font-black">
              <span>Ask the Sage</span>
              <button onClick={() => setChatOpen(false)}><X size={24} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-indigo-950 text-white text-left">
              {chatMessages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[85%] p-4 rounded-[1.5rem] text-base font-black ${m.role === 'user' ? 'bg-indigo-600' : 'bg-indigo-900 border border-indigo-700 italic'}`}>{String(m.text)}</div></div>
              ))}
              {isChatLoading && <div className="text-white/50 italic text-sm">Contemplating...</div>}
            </div>
            <div className="p-6 border-t border-indigo-900 bg-[#020617] flex items-center">
              <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} className="flex-1 bg-indigo-900 border border-indigo-700 rounded-2xl py-4 px-6 text-white font-black focus:border-saffron outline-none" />
              <button onClick={handleSendMessage} className="ml-3 p-4 bg-saffron text-indigo-950 rounded-2xl"><Send size={24} /></button>
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