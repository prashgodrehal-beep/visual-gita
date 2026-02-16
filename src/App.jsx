import React, { useState, useEffect, useRef } from 'react';
import {
  Compass, ChevronRight, BookOpen, Search, LayoutGrid, Layers, Maximize2,
  Minimize2, ScrollText, Bookmark, ShieldCheck, Zap, Waves, Quote,
  RotateCcw, Clock, Sparkles, ChevronDown, Triangle, RotateCw, X,
  MessageSquare, Send, Loader2, TrendingUp, Home, RefreshCw, Eye, EyeOff,
  GitBranch, CircleUser, ZapOff, Users, Heart, ArrowRight, Scale,
  Anchor, Flame, Ship, CloudRain, Binary, Ghost, UserCheck, FlameKindling
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

// --- DATA CONFIGURATION: ROADMAP ---
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
      { id: 'righteous-decision', status: 'ready', name: 'Decision Framework', type: 'Logic Tree', description: 'Choosing duty (Dharma) over delusion (Moha).' },
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
      { id: 'ego-less-action', status: 'ready', name: 'Gunatita Karma', type: 'Flow', description: 'Gunas act, not the individual ego.' },
      { id: 'desire-anger-vortex', status: 'ready', name: 'Desire-Anger Vortex', type: 'Spiral', description: 'The downward spiral triggered by unfulfilled desire.' },
      { id: 'chariot-analogy', status: 'ready', name: 'Inner Chariot', type: 'Diagram', description: 'Hierarchy of the senses, mind, and intellect.' },
      { id: 'leaders-ripple', status: 'ready', name: 'Leadership Ripple', type: 'Social Model', description: 'The standard set by leaders followed by the world.' },
      { id: 'action-worship', status: 'ready', name: 'Action as Worship', type: 'Metaphor', description: 'Transforming daily work into a divine offering.' }
    ]
  },
  {
    chapter: 4,
    title: "Jnana Karma Sanyasa Yoga",
    subtitle: "Knowledge and Action",
    models: [
      { id: 'divine-descent', status: 'ready', name: 'Avatara Principle', type: 'Framework', description: 'The reason and timing of Divine descent.' },
      { id: 'four-varnas', status: 'ready', name: 'Guna Distribution', type: 'Structure', description: 'Social distribution based on Guna and Karma.' },
      { id: 'sacrifice-types', status: 'ready', name: 'Twelve Yajnas', type: 'Catalog', description: 'The various forms of spiritual sacrifice.' },
      { id: 'knowledge-boat', status: 'ready', name: 'Knowledge Boat', type: 'Metaphor', description: 'Crossing the ocean of sin and delusion.' },
      { id: 'knowledge-fire', status: 'ready', name: 'Knowledge Fire', type: 'Visual', description: 'Burning the seeds of past actions (Karma).' }
    ]
  }
];

const VERSES_DB = {
  'atma-body': [{ ref: '2.19', text: 'The Self is not slain when the body is slain.' }, { ref: '2.22', text: 'Just as a person discards old clothes...' }],
  'sat-asat': [{ ref: '2.16', text: 'The unreal has no existence; the real never ceases to be.' }],
  'karma-yoga-cycle': [{ ref: '2.47', text: 'You have a right to perform duty, but not to its fruits.' }],
  'stitha-prajna': [{ ref: '2.56', text: 'One whose mind is undisturbed by misery...' }],
  'wisdom-lenses': [{ ref: '2.39', text: 'Thus far Sankhya has been told; now hear of Yoga.' }],
  'rebirth-cycle': [{ ref: '2.13', text: 'The soul passes from childhood to old age...' }],
  'righteous-decision': [{ ref: '2.41', text: 'Resolute intellect is single-pointed.' }],
  'mind-hierarchy': [{ ref: '3.42', text: 'Senses are above matter; Mind above senses...' }],
  'two-paths': [{ ref: '3.3', text: 'Two paths: Jnana for thinkers, Karma for doers.' }],
  'yajna-framework': [{ ref: '3.14', text: 'Beings come from food; food from rain...' }],
  'threefold-duty': [{ ref: '3.19', text: 'Perform duty as an offering without attachment.' }],
  'ego-less-action': [{ ref: '3.27', text: 'Gunas do the work; the deluded ego thinks "I am the doer."' }],
  'desire-anger-vortex': [{ ref: '3.37', text: 'Desire and anger are the all-devouring enemies.' }],
  'chariot-analogy': [{ ref: '3.43', text: 'Know the Self to be superior to the intellect.' }],
  'leaders-ripple': [{ ref: '3.21', text: 'Whatever a great man does, common people follow.' }],
  'action-worship': [{ ref: '3.30', text: 'Surrender all actions to Me with mind on the Self.' }],
  'divine-descent': [{ ref: '4.7', text: 'Whenever Dharma declines, I manifest Myself.' }],
  'four-varnas': [{ ref: '4.13', text: 'The four orders were created by Me based on Guna and Karma.' }],
  'sacrifice-types': [{ ref: '4.25', text: 'Some offer sacrifice to deities, others offer the self.' }],
  'knowledge-boat': [{ ref: '4.36', text: 'Even if you are the greatest sinner, knowledge will carry you across.' }],
  'knowledge-fire': [{ ref: '4.37', text: 'As fire burns wood to ash, the fire of knowledge burns Karma.' }]
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
        <div key={i} className="p-6 sm:p-10 bg-indigo-950/60 border border-indigo-500/30 rounded-[2rem] text-white text-left relative overflow-hidden shadow-xl">
          <span className="text-[9px] font-black text-white bg-saffron/80 px-3 py-1 rounded-lg mb-4 inline-block uppercase tracking-widest">Verse {v?.ref}</span>
          <p className="text-base sm:text-lg leading-relaxed font-sans font-medium opacity-90">"{String(v?.text || '')}"</p>
        </div>
      ))}
    </div>
  </div>
);

// ==========================================
// CHAPTER 3 MODELS (KARMA YOGA)
// ==========================================

const EgoLessActionModel = ({ intellectLevel }) => (
  <div className="relative flex flex-col items-center justify-center p-8 sm:p-12 bg-indigo-950 rounded-[2.5rem] border border-indigo-500/30 shadow-2xl w-full lg:max-w-[700px]">
    <div className="absolute top-10 left-10 flex items-center gap-4">
      <Users className="text-saffron shadow-[0_0_15px_#f59e0b]" size={32} />
      <h3 className="font-black text-2xl uppercase tracking-tighter text-white">Gunatita Flow</h3>
    </div>
    <div className="w-full mt-24 flex flex-col items-center gap-8 text-white">
      <div className="w-full grid grid-cols-3 gap-2">
        {["Sattva", "Rajas", "Tamas"].map((guna) => (
          <div key={guna} className="p-4 bg-indigo-900/60 border border-indigo-500 rounded-xl text-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-white">{guna}</span>
            <RefreshCw size={14} className="mx-auto mt-2 animate-spin-slow text-saffron opacity-40" />
          </div>
        ))}
      </div>
      <div className="relative p-10 bg-saffron rounded-full border-4 border-white shadow-2xl">
        <CircleUser size={64} className="text-indigo-950" />
        <div className={`absolute inset-0 rounded-full border-4 border-white transition-all ${intellectLevel > 60 ? 'scale-150 opacity-0' : 'scale-100 opacity-100 animate-pulse'}`} />
      </div>
      <div className="text-center p-6 bg-indigo-900 border border-indigo-700 rounded-2xl w-full">
        <p className="text-sm font-bold text-white uppercase tracking-widest">{intellectLevel > 60 ? "Witness Consciousness" : "Ego-Doership (Ahankara)"}</p>
        <p className="text-xs text-textDim mt-2 italic">"{intellectLevel > 60 ? 'Gunas act upon Gunas.' : 'I am the doer of these actions.'}"</p>
      </div>
    </div>
  </div>
);

const VortexModel = () => (
  <div className="relative flex flex-col items-center justify-center p-8 sm:p-12 bg-indigo-950 rounded-[2.5rem] border border-indigo-500/30 shadow-2xl w-full lg:max-w-[700px]">
    <div className="absolute top-10 left-10 flex items-center gap-4">
      <ZapOff className="text-red-500 shadow-[0_0_15px_#ef4444]" size={32} />
      <h3 className="font-black text-2xl uppercase tracking-tighter text-white">Desire Vortex</h3>
    </div>
    <div className="relative w-full h-[450px] mt-24 flex items-center justify-center">
      <div className="absolute w-full h-full flex items-center justify-center animate-spin-slow" style={{ animationDuration: '3s' }}>
        <div className="w-64 h-64 border-8 border-red-500/20 border-t-red-500 rounded-full" />
      </div>
      <div className="flex flex-col gap-4 z-10 w-full px-10">
        {["Desire (Kama)", "Anger (Krodha)", "Delusion (Moha)", "Lost Memory", "Intellect Ruins"].map((stage, i) => (
          <div key={i} className={`p-4 bg-indigo-950 border border-red-500/40 rounded-xl text-center shadow-lg transition-all`} style={{ transform: `scale(${1 - (i * 0.05)})`, opacity: 1 - (i * 0.1) }}>
            <span className="text-xs font-black uppercase text-white tracking-widest">{stage}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ChariotModel = () => (
  <div className="relative flex flex-col items-center justify-center p-8 sm:p-12 bg-indigo-950 rounded-[2.5rem] border border-indigo-500/30 shadow-2xl w-full lg:max-w-[750px]">
    <div className="absolute top-10 left-10 flex items-center gap-4">
      <CircleUser className="text-saffron shadow-[0_0_15px_#f59e0b]" size={32} />
      <h3 className="font-black text-2xl uppercase tracking-tighter text-white">Inner Chariot</h3>
    </div>
    <div className="w-full mt-24 flex flex-col gap-4 text-white">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-6 bg-indigo-900/60 border border-indigo-700 rounded-2xl text-center">
          <Users className="mx-auto mb-2 text-white" size={24} />
          <span className="text-[10px] font-black uppercase text-white">Horses</span>
          <p className="text-xs text-saffron font-bold">Five Senses</p>
        </div>
        <div className="p-6 bg-indigo-900/60 border border-indigo-700 rounded-2xl text-center">
          <RefreshCw className="mx-auto mb-2 text-white" size={24} />
          <span className="text-[10px] font-black uppercase text-white">Reins</span>
          <p className="text-xs text-saffron font-bold">The Mind</p>
        </div>
      </div>
      <div className="p-8 bg-saffron rounded-3xl text-center shadow-xl">
        <ShieldCheck className="mx-auto mb-2 text-indigo-950" size={32} />
        <span className="text-xs font-black uppercase text-indigo-950">Driver (Charioteer)</span>
        <p className="text-lg font-black text-indigo-950">Pure Intellect (Buddhi)</p>
      </div>
      <div className="p-6 bg-indigo-900 border border-white/20 rounded-3xl text-center">
        <Heart className="mx-auto mb-2 text-white animate-pulse" size={24} />
        <span className="text-xs font-black uppercase text-white">Passenger</span>
        <p className="text-lg font-black text-white">The Individual Soul</p>
      </div>
    </div>
  </div>
);

const LeaderRippleModel = () => (
  <div className="relative flex flex-col items-center justify-center p-8 sm:p-12 bg-indigo-950 rounded-[2.5rem] border border-indigo-500/30 shadow-2xl w-full lg:max-w-[700px]">
    <div className="absolute top-10 left-10 flex items-center gap-4">
      <TrendingUp className="text-saffron" size={32} />
      <h3 className="font-black text-2xl uppercase tracking-tighter text-white">Leader's Ripple</h3>
    </div>
    <div className="w-full mt-24 flex flex-col items-center">
      <div className="p-10 bg-saffron rounded-full text-indigo-950 shadow-[0_0_50px_rgba(245,158,11,0.5)] z-10 mb-[-20px]">
        <UserCheck size={48} />
        <span className="block mt-2 text-xs font-black uppercase">Great Man</span>
      </div>
      <div className="w-full flex flex-col items-center gap-4">
        {[1, 2, 3].map((r) => (
          <div key={r} className="w-full max-w-[80%] p-4 bg-indigo-900/40 border border-indigo-700 rounded-2xl text-center opacity-60">
            <span className="text-[10px] font-black uppercase text-white tracking-widest">Common People Follow Ripple {r}</span>
          </div>
        ))}
      </div>
    </div>
    <p className="mt-10 text-sm italic font-serif text-white text-center">"Whatever standard a great man sets, the world follows." (3.21)</p>
  </div>
);

const ActionWorshipModel = () => (
  <div className="relative flex flex-col items-center justify-center p-8 sm:p-12 bg-indigo-950 rounded-[2.5rem] border border-indigo-500/30 shadow-2xl w-full lg:max-w-[700px]">
    <div className="absolute top-10 left-10 flex items-center gap-4">
      <Heart className="text-red-500" size={32} />
      <h3 className="font-black text-2xl uppercase tracking-tighter text-white">Action as Worship</h3>
    </div>
    <div className="w-full mt-24 relative flex items-center justify-center h-64">
      <div className="absolute inset-0 bg-indigo-900/40 rounded-[3rem] border-2 border-dashed border-saffron/20" />
      <div className="z-10 flex gap-8 items-center">
        <div className="flex flex-col items-center gap-2">
          <RefreshCw className="text-white" size={40} />
          <span className="text-[10px] font-black uppercase text-white">Daily Work</span>
        </div>
        <ArrowRight className="text-saffron" size={32} />
        <div className="flex flex-col items-center gap-2">
          <Sparkles className="text-saffron animate-pulse" size={48} />
          <span className="text-[10px] font-black uppercase text-saffron">Divine Offering</span>
        </div>
      </div>
    </div>
    <p className="mt-10 text-[10px] font-black text-indigo-400 uppercase text-center px-10 leading-tight">Surrendering all actions with the mind centered on the Self. (3.30)</p>
  </div>
);

// ==========================================
// CHAPTER 4 MODELS (JNANA KARMA SANYASA)
// ==========================================

const DivineDescentModel = () => (
  <div className="relative flex flex-col items-center justify-center p-8 sm:p-12 bg-indigo-950 rounded-[2.5rem] border border-indigo-500/30 shadow-2xl w-full lg:max-w-[700px]">
    <div className="absolute top-10 left-10 flex items-center gap-4">
      <CloudRain className="text-saffron shadow-[0_0_15px_#f59e0b]" size={32} />
      <h3 className="font-black text-2xl uppercase tracking-tighter text-white">Divine Descent</h3>
    </div>
    <div className="w-full mt-24 flex flex-col gap-6 text-white">
      <div className="flex justify-between items-center px-10">
        <div className="flex flex-col items-center opacity-50"><TrendingUp size={32} /> <span className="text-[10px] font-black uppercase">Adharma Rises</span></div>
        <div className="flex flex-col items-center"><ChevronDown className="animate-bounce text-saffron" size={40} /> <span className="text-[10px] font-black uppercase text-saffron">AVATARA</span></div>
        <div className="flex flex-col items-center opacity-50"><TrendingUp className="rotate-180" size={32} /> <span className="text-[10px] font-black uppercase">Dharma Recedes</span></div>
      </div>
      <div className="p-8 bg-indigo-900 border border-indigo-700 rounded-[2rem] text-center shadow-xl">
        <p className="text-base font-bold text-white uppercase tracking-widest mb-2">Purpose of manifestation</p>
        <p className="text-xs text-textDim italic">"To protect the virtuous, destroy the wicked, and re-establish Dharma." (4.8)</p>
      </div>
    </div>
  </div>
);

const VarnaModel = () => (
  <div className="relative flex flex-col items-center justify-center p-8 sm:p-12 bg-indigo-950 rounded-[2.5rem] border border-indigo-500/30 shadow-2xl w-full lg:max-w-[700px]">
    <div className="absolute top-10 left-10 flex items-center gap-4">
      <Binary className="text-saffron" size={32} />
      <h3 className="font-black text-2xl uppercase tracking-tighter text-white">Guna-Karma Varna</h3>
    </div>
    <div className="w-full mt-24 flex flex-col gap-3">
      {["Brahmana (Intellectual/Spiritual)", "Kshatriya (Administrative/Martial)", "Vaishya (Mercantile/Productive)", "Shudra (Labor/Service)"].map((v, i) => (
        <div key={i} className="p-5 bg-indigo-900/60 border border-indigo-700 rounded-xl flex justify-between items-center group hover:border-saffron transition-all">
          <span className="text-sm font-black text-white uppercase tracking-tight">{v}</span>
          <span className="text-[10px] font-black text-saffron opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">Guna Based</span>
        </div>
      ))}
    </div>
    <p className="mt-8 text-[10px] text-textDim font-bold uppercase">"Social distribution is based on inherent quality and action." (4.13)</p>
  </div>
);

const YajnaTypesModel = () => (
  <div className="relative flex flex-col items-center justify-center p-8 sm:p-12 bg-indigo-950 rounded-[2.5rem] border border-indigo-500/30 shadow-2xl w-full lg:max-w-[750px]">
    <div className="absolute top-10 left-10 flex items-center gap-4 text-white">
      <FlameKindling className="text-saffron" size={32} />
      <h3 className="font-black text-2xl uppercase tracking-tighter">Sacrifice Catalog</h3>
    </div>
    <div className="w-full mt-24 grid grid-cols-2 gap-4">
      {["Breath (Prana)", "Senses (Indriya)", "Knowledge (Jnana)", "Possessions (Dravya)", "Austerity (Tapo)", "Yoga (Control)"].map((y, i) => (
        <div key={i} className="p-4 bg-indigo-900 border border-indigo-700 rounded-2xl text-center shadow-lg">
          <span className="text-[10px] font-black uppercase text-white tracking-widest">{y} Yajna</span>
        </div>
      ))}
    </div>
    <div className="p-6 bg-saffron rounded-3xl mt-8 w-full text-indigo-950 text-center shadow-2xl">
      <span className="text-xs font-black uppercase">Conclusion</span>
      <p className="text-sm font-bold">"Knowledge-sacrifice is superior to material sacrifice." (4.33)</p>
    </div>
  </div>
);

const KnowledgeBoatModel = () => (
  <div className="relative flex flex-col items-center justify-center p-8 sm:p-12 bg-indigo-950 rounded-[2.5rem] border border-indigo-500/30 shadow-2xl w-full lg:max-w-[700px]">
    <div className="absolute top-10 left-10 flex items-center gap-4 text-white">
      <Ship className="text-saffron shadow-[0_0_15px_#f59e0b]" size={32} />
      <h3 className="font-black text-2xl uppercase tracking-tighter">The Boat of Jnana</h3>
    </div>
    <div className="relative w-full h-[400px] mt-24 flex flex-col items-center justify-center">
      <div className="w-full h-24 bg-indigo-800/20 border-t-2 border-indigo-500 animate-pulse flex items-end justify-center pb-4"><span className="text-[10px] font-black uppercase text-indigo-400">Ocean of Delusion (Maya)</span></div>
      <div className="p-10 bg-saffron rounded-[2rem] border-4 border-white shadow-[0_20px_50px_rgba(245,158,11,0.4)] translate-y-[-40px]">
        <Ship size={64} className="text-white" />
        <span className="block mt-2 text-xs font-black uppercase text-white">Knowledge</span>
      </div>
      <p className="text-base sm:text-xl italic font-serif text-white text-center px-10 leading-relaxed">"Knowledge will carry even the greatest of sinners across the ocean of vice." (4.36)</p>
    </div>
  </div>
);

const KnowledgeFireModel = () => (
  <div className="relative flex flex-col items-center justify-center p-8 sm:p-12 bg-indigo-950 rounded-[2.5rem] border border-indigo-500/30 shadow-2xl w-full lg:max-w-[700px]">
    <div className="absolute top-10 left-10 flex items-center gap-4 text-white">
      <Flame className="text-saffron shadow-[0_0_15px_#f59e0b]" size={32} />
      <h3 className="font-black text-2xl uppercase tracking-tighter">The Fire of Jnana</h3>
    </div>
    <div className="w-full mt-24 flex flex-col items-center gap-6">
      <div className="flex gap-4">
        {[1, 2, 3].map(i => <div key={i} className="w-12 h-12 bg-indigo-900 border border-indigo-700 rounded-lg flex items-center justify-center text-[10px] font-black uppercase text-white/40">Karma {i}</div>)}
      </div>
      <div className="p-12 bg-saffron rounded-full border-4 border-white shadow-[0_0_60px_#f59e0b] animate-pulse">
        <Flame size={64} className="text-white" />
      </div>
      <div className="grid grid-cols-3 gap-2 opacity-40 grayscale">
        {[1, 2, 3].map(i => <div key={i} className="w-12 h-12 bg-indigo-950 border border-dashed border-indigo-800 rounded-lg flex items-center justify-center text-[10px] font-black uppercase text-white/20">ASHES</div>)}
      </div>
    </div>
    <p className="mt-10 text-sm text-white italic font-serif text-center px-10 leading-relaxed">"As fire burns fuel to ashes, the fire of knowledge burns Karma to ashes." (4.37)</p>
  </div>
);

// ==========================================
// MAIN APP COMPONENT
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

  const apiKey = ""; // Provided by environment

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
    } catch (e) { return "My connection to the ether is weak."; }
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    const msg = chatInput; setChatInput("");
    setChatMessages(prev => [...prev, { role: 'user', text: msg }]);
    setIsChatLoading(true);
    const resp = await callGemini(msg, `Answer as a Vidwan regarding: ${activeModelId}.`);
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
          {activeModelId && <button onClick={resetView} className="px-5 sm:px-8 py-3 bg-saffron text-indigo-950 font-black text-[10px] sm:text-xs uppercase rounded-[1.25rem] active:scale-95 shadow-lg"><RotateCw className="inline mr-2" size={14} /> Reset</button>}
        </div>

        {/* CANVAS */}
        <div className={`flex-1 w-full flex items-start justify-center p-4 relative overflow-visible min-h-screen pt-32`}>
          <div className="transition-all duration-700 ease-out w-full flex justify-center pb-32" style={{ transform: `scale(${zoom})`, transformOrigin: 'top center', backgroundImage: `radial-gradient(${THEME.saffron}10 1.5px, transparent 0)`, backgroundSize: '100px 100px' }}>

            {!activeModelId ? (
              <div className="flex flex-col items-center p-6 w-full max-w-6xl animate-in fade-in pt-32">
                <div className="text-center mb-16 text-white">
                  <div className="w-32 h-32 mx-auto mb-8 border-[3px] border-dashed border-saffron/40 rounded-full flex items-center justify-center animate-pulse shadow-2xl"><Compass size={60} className="text-saffron" /></div>
                  <h2 className="text-4xl sm:text-6xl font-black uppercase text-white mb-6">Gita Visual Guide</h2>
                  <p className="text-white/80 max-w-2xl mx-auto italic text-xl font-serif">"Interactive pilgrimage through Chapters 2, 3, and 4."</p>
                </div>
                {GITA_DATA.map(ch => (
                  <div key={ch.chapter} className="w-full mb-16 text-left">
                    <div className="flex items-center gap-4 mb-10 border-b border-indigo-500/30 pb-6">
                      <span className="text-2xl font-black text-indigo-950 bg-saffron px-4 py-1 rounded-xl shadow-lg">CH {ch.chapter}</span>
                      <span className="text-3xl font-black uppercase text-white tracking-widest">{ch.title}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {ch.models.map(m => (
                        <button key={m.id} onClick={() => handleModelSelect(m.id)} className="group p-8 bg-indigo-950/60 border border-indigo-900 rounded-[2.5rem] text-left transition-all hover:bg-indigo-900/80 hover:border-saffron/50 hover:scale-[1.03] shadow-2xl">
                          <div className="mb-4 p-2 bg-saffron w-fit rounded-lg text-white shadow-md">
                            {m.id.includes('body') ? <Layers size={20} /> : m.id.includes('karma') ? <RotateCcw size={20} /> : m.id.includes('sat') ? <Triangle size={20} /> : <Sparkles size={20} />}
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
                {/* MODULAR MODEL SWITCH */}
                {activeModelId === 'atma-body' && <AtmaBodyModel ageProgress={ageProgress} setAgeProgress={setAgeProgress} />}
                {activeModelId === 'karma-yoga-cycle' && <KarmaCycleModel intellectLevel={intellectLevel} windowWidth={windowWidth} verses={VERSES_DB['karma-yoga-cycle']} />}
                {activeModelId === 'stitha-prajna' && <StithaPrajnaModel selectedQualityIndex={selectedQualityIndex} setSelectedQualityIndex={setSelectedQualityIndex} windowWidth={windowWidth} qualities={GITA_DATA[0].models.find(m => m.id === 'stitha-prajna').qualities} />}
                {activeModelId === 'sat-asat' && <SatAsatModel selectedLayerIndex={selectedLayerIndex} setSelectedLayerIndex={setSelectedLayerIndex} layers={[
                  { id: 'sat', name: 'SAT (The Eternal)', desc: 'Unchanging reality.' },
                  { id: 'mithya', name: 'MITHYA (The Flux)', desc: 'Dependent reality.' },
                  { id: 'asat', name: 'ASAT (The Void)', desc: 'Non-existent illusion.' }
                ]} intellectLevel={intellectLevel} />}
                {activeModelId === 'wisdom-lenses' && <WisdomLensesModel />}
                {activeModelId === 'rebirth-cycle' && <RebirthCycleModel ageProgress={ageProgress} setAgeProgress={setAgeProgress} />}
                {activeModelId === 'righteous-decision' && <DecisionFrameworkModel />}
                {activeModelId === 'mind-hierarchy' && <MindHierarchyModel />}
                {activeModelId === 'two-paths' && <TwoPathsModel />}
                {activeModelId === 'yajna-framework' && <YajnaFrameworkModel />}
                {activeModelId === 'threefold-duty' && <ThreefoldDutyModel />}
                {activeModelId === 'ego-less-action' && <EgoLessActionModel intellectLevel={intellectLevel} />}
                {activeModelId === 'desire-anger-vortex' && <VortexModel />}
                {activeModelId === 'chariot-analogy' && <ChariotModel />}
                {activeModelId === 'leaders-ripple' && <LeaderRippleModel />}
                {activeModelId === 'action-worship' && <ActionWorshipModel />}
                {activeModelId === 'divine-descent' && <DivineDescentModel />}
                {activeModelId === 'four-varnas' && <VarnaModel />}
                {activeModelId === 'sacrifice-types' && <YajnaTypesModel />}
                {activeModelId === 'knowledge-boat' && <KnowledgeBoatModel />}
                {activeModelId === 'knowledge-fire' && <KnowledgeFireModel />}

                {activeModelData?.status === 'pending' ? (
                  <div className="p-20 bg-indigo-950/60 rounded-[3rem] border border-indigo-500/30 text-center w-full max-w-[700px] text-white">
                    <Clock size={60} className="mx-auto mb-6 text-white/20" />
                    <h2 className="text-4xl font-black uppercase text-white mb-4">{activeModelData.name}</h2>
                    <p className="italic text-white/60">Visualization forthcoming...</p>
                  </div>
                ) : (
                  <VerseSidebar verses={VERSES_DB[activeModelId] || []} />
                )}
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
          <div className="fixed bottom-52 lg:bottom-32 right-6 sm:right-8 z-[150] w-[90vw] sm:w-[420px] h-[550px] bg-indigo-950 border border-saffron rounded-[2.5rem] sm:rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.9)] backdrop-blur-none flex flex-col overflow-hidden animate-in zoom-in-95">
            <div className="p-5 sm:p-6 bg-saffron text-indigo-950 flex justify-between items-center shadow-lg">
              <div className="flex items-center gap-3 text-lg font-black uppercase tracking-widest">Ask the Sage</div>
              <button onClick={() => setChatOpen(false)} className="hover:scale-110 transition-transform"><X size={24} className="text-indigo-950" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 custom-scrollbar bg-indigo-950 text-white text-left">
              {chatMessages.length === 0 && <p className="text-center text-white/30 italic mt-32 text-xl font-serif font-semibold leading-relaxed">Seek and ye shall find the eternal wisdom of {activeModelData?.name}.</p>}
              {chatMessages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 sm:p-6 rounded-[1.5rem] text-base font-medium shadow-md ${m.role === 'user' ? 'bg-indigo-600 text-white border border-indigo-500' : 'bg-indigo-900 border border-indigo-700 font-serif italic text-white'}`}>
                    {String(m.text)}
                  </div>
                </div>
              ))}
              {isChatLoading && <div className="bg-indigo-900/60 p-4 rounded-2xl animate-pulse text-white/70 italic text-sm">Contemplating the eternal...</div>}
            </div>
            <div className="p-6 border-t border-indigo-900 bg-[#020617] flex items-center shadow-2xl">
              <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Type your inquiry..." className="flex-1 bg-indigo-900 border border-indigo-700 rounded-2xl py-4 px-6 text-white font-bold placeholder-white/30 focus:border-saffron outline-none shadow-inner" />
              <button onClick={handleSendMessage} disabled={isChatLoading} className="ml-3 p-4 bg-saffron text-indigo-950 rounded-2xl hover:bg-white transition-colors shadow-lg"><Send size={24} /></button>
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