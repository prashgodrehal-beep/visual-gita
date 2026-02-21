import React, { useState, useEffect } from 'react';
import {
  Compass, BookOpen, Layers, Maximize2,
  Minimize2, ScrollText, Zap, Waves,
  RotateCcw, Clock, Sparkles, ChevronDown, Triangle, RotateCw, X,
  MessageSquare, Send, TrendingUp, RefreshCw,
  GitBranch, CircleUser, ZapOff, Users, Heart, ArrowRight, Scale,
  Ship, CloudRain, Binary, UserCheck, FlameKindling,
  Building2, EyeIcon, Wind, Target, Activity, Split, CheckCircle2, Flame, ListChecks
} from 'lucide-react';

// --- THEME CONSTANTS ---
const THEME = {
  deep: '#020617',
  indigo: '#1e1b4b',
  saffron: '#f59e0b',
  textMain: '#ffffff',
  chatBg: '#ffffff',
  chatText: '#1e1b4b'
};

// --- DATA CONFIGURATION ---
const GITA_DATA = [
  {
    chapter: 2,
    title: "Sankhya Yoga",
    models: [
      { id: 'atma-body', name: 'Atma vs. Body', description: 'The eternal soul vs. the perishable physical frame (2.19-2.22).' },
      { id: 'sat-asat', name: 'Reality Framework', description: 'Discriminating the real from the non-existent projection (2.16).' },
      { id: 'karma-yoga-cycle', name: 'Karma Yoga Cycle', description: 'The flow of duty, detachment, and inner purity (2.47-2.50).' },
      { id: 'stitha-prajna', name: 'Stitha Prajna', description: '18 qualities of the person of established wisdom (2.56-2.72).' },
      { id: 'wisdom-lenses', name: 'Two Lenses of Wisdom', description: 'Analytical Sankhya vs. Practical Yoga perspectives (2.39).' },
      { id: 'rebirth-cycle', name: 'The Rebirth Cycle', description: 'The continuous journey of the soul across childhood to old age (2.13).' },
      { id: 'righteous-decision', name: 'Decision Framework', description: 'Single-pointed resolve of the intellect over delusion (2.41).' },
      { id: 'mind-hierarchy', name: 'Mind Control Loop', description: 'The hierarchy of command from Senses to the Soul (3.42).' }
    ]
  },
  {
    chapter: 3,
    title: "Karma Yoga",
    models: [
      { id: 'two-paths', name: 'Paths to Realization', description: 'Path of Knowledge and Path of Action (3.3).' },
      { id: 'yajna-framework', name: 'Cosmic Cooperation', description: 'Universal cycle of rain, food, and yajna (3.14).' },
      { id: 'threefold-duty', name: 'Structure of Duty', description: 'Prescribed duty performed as a selfless offering (3.19).' },
      { id: 'ego-less-action', name: 'Gunatita Karma', description: 'Nature acts through Gunas while the soul observes (3.27).' },
      { id: 'desire-anger-vortex', name: 'Desire-Anger Vortex', description: 'The devouring enemies that ruin the intellect (3.37).' },
      { id: 'chariot-analogy', name: 'Inner Chariot', description: 'Controlling the senses using the driver of intellect (3.43).' },
      { id: 'leaders-ripple', name: 'Leadership Ripple', description: 'Standards set by exemplary men followed by all (3.21).' },
      { id: 'action-worship', name: 'Action as Worship', description: 'Daily work surrendered to the Divine (3.30).' }
    ]
  },
  {
    chapter: 4,
    title: "Jnana Karma Sanyasa Yoga",
    models: [
      { id: 'divine-descent', name: 'Avatara Principle', description: 'The reason and timing of Divine manifestation (4.7).' },
      { id: 'four-varnas', name: 'Guna Distribution', description: 'Social distribution by inherent quality and action (4.13).' },
      { id: 'sacrifice-types', name: 'Twelve Yajnas', description: 'Various methods of spiritual refinement (4.25-4.33).' },
      { id: 'knowledge-boat', name: 'Knowledge Boat', description: 'Wisdom crossing the sea of sin (4.36).' },
      { id: 'knowledge-fire', name: 'Knowledge Fire', description: 'Incinerating Karma with the fire of truth (4.37).' }
    ]
  },
  {
    chapter: 5,
    title: "Karma Sanyasa Yoga",
    models: [
      { id: 'renunciation-vs-action', name: 'Renunciation vs Action', description: 'Why Karma Yoga is superior to withdrawal (5.2).' },
      { id: 'freedom-detachment', name: 'Freedom Flow', description: 'Action → Detachment → Purity → Peace (5.7-5.12).' },
      { id: 'nine-gates', name: 'City of Nine Gates', description: 'The soul residing as ruler in the body (5.13).' },
      { id: 'sage-vision', name: 'Vision of Equality', description: 'Seeing Brahman equally in all life forms (5.18).' }
    ]
  },
  {
    chapter: 6,
    title: "Dhyana Yoga",
    models: [
      { id: 'yoga-ladder', name: 'The Yoga Ladder', description: 'Action for beginners, silence for advanced yoga (6.3).' },
      { id: 'mind-friend-enemy', name: 'Mind: Friend or Foe', description: 'Conquering the mind for liberation (6.5-6.6).' },
      { id: 'moderation-yoga', name: 'Path of Moderation', description: 'Balanced living in food, sleep, and work (6.16).' },
      { id: 'windless-lamp', name: 'Windless Lamp', description: 'Steady focus like a lamp in a windless place (6.19).' }
    ]
  }
];

// --- SCRIPTURE DATABASE ---
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
  ],
  'wisdom-lenses': [
    { ref: '2.39', sanskrit: 'एषा तेऽभिहिता सांख्ये', text: 'Analytical wisdom has been told; now hear of practical wisdom.' }
  ],
  'rebirth-cycle': [
    { ref: '2.13', sanskrit: 'देहिनोऽस्मिन्यथा देहे', text: 'As the soul passes from childhood to old age, it passes into another body.' }
  ],
  'righteous-decision': [
    { ref: '2.41', sanskrit: 'व्यवसायात्मिका बुद्धि:', text: 'The resolute intellect is single-pointed.' }
  ],
  'mind-hierarchy': [
    { ref: '3.42', sanskrit: 'इन्द्रियाणि पराण्याहु:', text: 'Senses are above matter, Mind above senses, Intellect above mind.' }
  ],
  'two-paths': [
    { ref: '3.3', sanskrit: 'लोकेऽस्मिन्द्विविधा निष्ठा', text: 'Knowledge vs. Action paths.' }
  ],
  'yajna-framework': [
    { ref: '3.14', sanskrit: 'अन्नाद्भवन्ति भूतानि', text: 'The cosmic cycle of rain, food, and beings.' }
  ],
  'threefold-duty': [
    { ref: '3.19', sanskrit: 'तस्मादसक्त: सततं', text: 'Perform duty as an offering without attachment.' }
  ],
  'ego-less-action': [
    { ref: '3.27', sanskrit: 'प्रकृते: क्रियमाणानि', text: 'Gunas do the work; the deluded ego thinks "I am the doer."' }
  ],
  'desire-anger-vortex': [
    { ref: '3.37', sanskrit: 'काम एष क्रोध एष', text: 'Desire and anger are the all-devouring enemies.' }
  ],
  'chariot-analogy': [
    { ref: '3.43', sanskrit: 'एवं बुद्धे: परं बुद्ध्वा', text: 'Know the Self to be superior to the intellect.' }
  ],
  'leaders-ripple': [
    { ref: '3.21', sanskrit: 'यद्यदाचरति श्रेष्ठ:', text: 'Whatever a great man does, common people follow.' }
  ],
  'action-worship': [
    { ref: '3.30', sanskrit: 'मयि सर्वाणि कर्माणि', text: 'Surrender all actions to Me with mind on the Self.' }
  ],
  'divine-descent': [
    { ref: '4.7', sanskrit: 'यदा यदा हि धर्मस्य', text: 'Whenever Dharma declines, I manifest Myself.' }
  ],
  'four-varnas': [
    { ref: '4.13', sanskrit: 'चातुर्वर्ण्यं मया सृष्टं', text: 'The four orders were created by Me based on Guna and Karma.' }
  ],
  'sacrifice-types': [
    { ref: '4.25', sanskrit: 'दैवमेवापरे यज्ञं', text: 'Some offer sacrifice to deities, others offer the self.' }
  ],
  'knowledge-boat': [
    { ref: '4.36', sanskrit: 'अपि चेदसि पापेभ्य:', text: 'Even if you are the greatest sinner, knowledge will carry you across.' }
  ],
  'knowledge-fire': [
    { ref: '4.37', sanskrit: 'यथैधांसि समिद्धोऽग्नि:', text: 'As fire burns wood to ash, the fire of knowledge burns Karma.' }
  ],
  'renunciation-vs-action': [
    { ref: '5.2', sanskrit: 'संन्यास: कर्मयोगश्च', text: 'Both lead to liberation, but Karma Yoga is superior.' }
  ],
  'freedom-detachment': [
    { ref: '5.12', sanskrit: 'युक्त: कर्मफलं त्यक्त्वा', text: 'United with the Self, abandoning fruit, one attains peace.' }
  ],
  'nine-gates': [
    { ref: '5.13', sanskrit: 'सर्वकर्माणि मनसा', text: 'The soul resides happy as the ruler within the body.' }
  ],
  'sage-vision': [
    { ref: '5.18', sanskrit: 'विद्याविनयसंपन्ने', text: 'The wise look with equal eye on a Brahmana, a cow, a dog.' }
  ],
  'yoga-ladder': [
    { ref: '6.3', sanskrit: 'आरुरुक्षोर्मुनेर्योगं', text: 'Action is the means for beginners, silence for the advanced.' }
  ],
  'mind-friend-enemy': [
    { ref: '6.5', sanskrit: 'उद्धरेदात्मनात्मानं', text: 'A controlled mind is your greatest friend, an uncontrolled one your enemy.' }
  ],
  'moderation-yoga': [
    { ref: '6.16', sanskrit: 'नात्यश्नतस्तु योगोऽस्ति', text: 'Yoga is for those moderate in eating, sleep, and work.' }
  ],
  'windless-lamp': [
    { ref: '6.19', sanskrit: 'यथा दीपो निवातस्थो', text: 'Steady focus like a lamp in a windless place.' }
  ]
};

// ==========================================
// HIGH-FIDELITY COMPONENT DEFINITIONS
// ==========================================

function SidebarComponent({ verses = [] }) {
  return (
    <div className="w-full lg:w-[420px] space-y-6 lg:sticky lg:top-32 mt-8 lg:mt-0 text-left">
      <div className="flex items-center gap-3 mb-2 px-4 text-white">
        <ScrollText className="text-saffron shadow-[0_0_10px_#f59e0b]" size={32} />
        <h4 className="text-xl font-black uppercase tracking-widest">Scripture</h4>
      </div>
      <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
        {(verses || []).map((v, i) => (
          <div key={i} className="p-6 bg-indigo-950/80 border border-indigo-500/40 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
            <span className="text-[10px] font-black text-white bg-saffron/80 px-3 py-1 rounded-lg mb-4 inline-block uppercase tracking-widest">Verse {String(v?.ref || '')}</span>
            {v.sanskrit && <p className="text-xl font-serif text-saffron mb-2 leading-relaxed opacity-100">{String(v.sanskrit)}</p>}
            <p className="text-base leading-relaxed font-sans font-medium opacity-90 italic">"{String(v?.text || '')}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AtmaBodyModel({ intellectLevel, ageProgress }) {
  return (
    <div className="relative flex flex-col items-center justify-center p-8 sm:p-12 bg-indigo-950 rounded-[2.5rem] border border-indigo-500/30 shadow-2xl w-full lg:max-w-[700px]">
      <div className="absolute top-10 left-10 flex items-center gap-4 text-white font-black"><Layers className="text-saffron" size={32} /><h3 className="uppercase text-xl">Atma vs Body</h3></div>
      <div className="flex flex-col sm:flex-row w-full mt-24 gap-12 items-center">
        <div className="relative w-40 h-[380px] flex-shrink-0">
          <div className="absolute inset-0 bg-indigo-800/20 border-2 border-indigo-400/20" style={{ clipPath: 'polygon(50% 0%, 80% 10%, 95% 35%, 85% 70%, 75% 100%, 25% 100%, 15% 70%, 5% 35%, 20% 10%)', opacity: 0.3, filter: `grayscale(${1 - intellectLevel / 100})` }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full bg-saffron shadow-2xl w-24 h-24 flex items-center justify-center text-xs font-black text-white uppercase border-4 border-white animate-pulse">Atma</div>
          </div>
        </div>
        <div className="flex-1 w-full space-y-6 text-white font-black uppercase text-xs tracking-widest text-center">
          <div className="p-8 bg-red-500/10 border border-red-500/30 rounded-3xl shadow-xl">The Perishable Body</div>
          <div className="p-8 bg-saffron/10 border border-saffron rounded-3xl shadow-inner">The Eternal Soul</div>
        </div>
      </div>
    </div>
  );
}

function SatAsatModel({ selectedLayerIndex, setSelectedLayerIndex, intellectLevel }) {
  const layers = [{ id: 'sat', name: 'SAT (The Eternal)', desc: 'Unchanging reality.' }, { id: 'mithya', name: 'MITHYA (The Flux)', desc: 'Dependent reality.' }, { id: 'asat', name: 'ASAT (The Void)', desc: 'Non-existent illusion.' }];
  return (
    <div className="relative flex flex-col items-center justify-center p-8 sm:p-12 bg-indigo-950 rounded-[2.5rem] border border-indigo-500/30 shadow-2xl w-full lg:max-w-[700px]">
      <div className="absolute top-10 left-10 flex items-center gap-4 text-white font-black"><Triangle className="text-saffron shadow-[0_0_15px_#f59e0b]" size={32} /><h3 className="uppercase text-xl">Reality Framework</h3></div>
      <div className="relative w-full h-[350px] mt-24 flex flex-col items-center justify-center gap-4">
        {layers.map((layer, i) => (
          <button key={layer.id} onClick={() => setSelectedLayerIndex(i)} className="group transition-all" style={{ width: `${[140, 240, 360][i]}px`, opacity: layer.id === 'sat' ? 0.2 + (intellectLevel / 100) : 1.2 - (intellectLevel / 100) }}>
            <div className={`w-full h-16 sm:h-20 border transition-all flex items-center justify-center rounded-xl ${selectedLayerIndex === i ? 'bg-indigo-600 border-saffron shadow-2xl' : 'bg-indigo-950 border-indigo-500'}`}>
              <span className="text-xs font-black text-white uppercase tracking-widest">{String(layer.name)}</span>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-8 p-6 bg-indigo-900 border border-indigo-400/20 rounded-2xl w-full text-white text-left font-black shadow-2xl">
        <h2 className="text-xl font-black uppercase text-saffron mb-2">{String(layers[selectedLayerIndex].name)}</h2>
        <p className="text-sm font-medium opacity-80">{String(layers[selectedLayerIndex].desc)}</p>
      </div>
    </div>
  );
}

function KarmaCycleModel({ intellectLevel, windowWidth }) {
  const steps = ["Action", "Detachment", "Equanimity", "Purity"];
  const spinSpeed = intellectLevel > 50 ? (110 - intellectLevel) / 10 : 0;
  const mandalaScale = (windowWidth || 1200) < 640 ? 0.7 : 1;
  return (
    <div className="relative flex flex-col items-center justify-center p-8 sm:p-12 bg-indigo-950 rounded-[2.5rem] border border-indigo-500/30 shadow-2xl w-full lg:max-w-[700px]">
      <div className="absolute top-10 left-10 flex items-center gap-4 text-white font-black"><RotateCcw className="text-saffron shadow-[0_0_15px_#f59e0b]" size={32} /><h3 className="uppercase text-xl">Karma Flow</h3></div>
      <div className="relative w-72 h-72 sm:w-[500px] sm:h-[500px] mt-24 mb-12 flex items-center justify-center text-white" style={{ transform: `scale(${mandalaScale})` }}>
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-saffron animate-spin-slow opacity-30" style={{ animationDuration: `${spinSpeed * 3}s` }} />
        <div className="z-10 w-32 h-32 rounded-full bg-indigo-900 border-2 border-saffron flex flex-col items-center justify-center shadow-2xl">
          <RefreshCw className={`text-saffron mb-2 ${spinSpeed ? 'animate-spin' : ''}`} style={{ animationDuration: `${spinSpeed}s` }} size={32} />
          <span className="text-[10px] font-black uppercase tracking-widest text-center leading-tight">Skill in<br />Action</span>
        </div>
        {steps.map((step, i) => (
          <div key={i} className="absolute w-full h-full flex items-center justify-center" style={{ transform: `rotate(${i * 90}deg)` }}>
            <div className="flex flex-col items-center" style={{ transform: `translateY(-200px) rotate(-${i * 90}deg)` }}>
              <div className="w-10 h-10 rounded-full bg-indigo-950 border-2 border-saffron flex items-center justify-center shadow-lg text-white font-black animate-pulse"><Zap size={18} /></div>
              <div className="mt-4 px-5 py-2 bg-indigo-900 border border-saffron rounded-full shadow-2xl text-white font-black uppercase text-xs tracking-tighter">{String(step)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StithaPrajnaModel({ selectedQualityIndex, setSelectedQualityIndex, windowWidth, qualities = [] }) {
  const list = qualities || [];
  const q = list[selectedQualityIndex] || { name: "Wisdom", highlight: "Established intellect." };
  const mandalaScale = (windowWidth || 1200) < 640 ? 0.65 : 1;
  return (
    <div className="relative flex flex-col items-center justify-center p-8 sm:p-12 bg-indigo-950 rounded-[2.5rem] border border-indigo-500/30 shadow-2xl w-full lg:max-w-[750px]">
      <div className="absolute top-10 left-10 flex items-center gap-4 text-white font-black"><Waves className="text-saffron shadow-[0_0_15px_#f59e0b]" size={32} /><h3 className="uppercase text-xl">Mastery Ladder</h3></div>
      <div className="relative w-full h-[450px] mt-20 flex items-center justify-center text-white" style={{ transform: `scale(${mandalaScale})` }}>
        <div className="absolute w-24 h-24 rounded-full border border-saffron/30 bg-indigo-900/60 flex items-center justify-center text-saffron font-black text-xs uppercase text-center shadow-xl">Steady Mind</div>
        {list.map((item, i) => {
          const angle = (i * 360) / list.length;
          return (
            <button key={i} onClick={() => setSelectedQualityIndex(i)} className="absolute top-1/2 left-1/2 origin-left transition-all" style={{ transform: `rotate(${angle}deg) translateX(130px)` }}>
              <div className={`px-2 sm:px-4 py-1.5 rounded-full border text-[7px] sm:text-[9px] font-black uppercase ${selectedQualityIndex === i ? 'bg-saffron text-white border-white scale-125 z-50 shadow-lg' : 'bg-indigo-900/60 text-white'}`} style={{ transform: `rotate(-${angle}deg)` }}>{String(item.name)}</div>
            </button>
          );
        })}
      </div>
      <div className="mt-8 p-6 sm:p-8 bg-indigo-900 border border-saffron/30 rounded-3xl w-full text-white text-left font-black shadow-2xl">
        <h2 className="text-xl font-black uppercase text-saffron mb-2">{String(q.name)}</h2>
        <p className="text-sm font-medium leading-relaxed opacity-90 italic">"{String(q.highlight)}"</p>
      </div>
    </div>
  );
}

function RebirthCycleModel() {
  const [active, setActive] = useState(0);
  const stages = ["Childhood", "Youth", "Adulthood", "Old Age", "Death", "New Body"];
  useEffect(() => {
    const t = setInterval(() => setActive(s => (s + 1) % stages.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center p-8 sm:p-12 bg-indigo-950 rounded-[2.5rem] border border-indigo-500/30 shadow-2xl w-full lg:max-w-[700px]">
      <div className="absolute top-10 left-10 flex items-center gap-4 text-white font-black"><RefreshCw className="text-saffron shadow-[0_0_15px_#f59e0b]" size={32} /><h3 className="uppercase text-xl">The Rebirth Loop</h3></div>
      <div className="w-full mt-24 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {stages.map((stage, i) => (
          <div key={i} className={`p-4 sm:p-6 rounded-2xl border-2 transition-all duration-700 text-center font-black uppercase text-xs sm:text-sm tracking-widest ${active === i ? 'bg-saffron text-white border-white scale-105 shadow-[0_0_30px_rgba(245,158,11,0.5)]' : 'bg-indigo-900/40 border-indigo-700 text-white/40'}`}>
            {String(stage)}
          </div>
        ))}
      </div>
      <div className="mt-12 text-center p-10 border-4 border-dashed border-indigo-500 rounded-full relative overflow-hidden group">
        <Layers size={40} className="text-saffron mx-auto mb-2 drop-shadow-md group-hover:scale-110 transition-transform" />
        <span className="text-white font-black uppercase tracking-[0.3em] text-xs">Eternal Soul</span>
        <div className="absolute inset-0 bg-saffron/5 animate-pulse" />
      </div>
    </div>
  );
}

function MindHierarchyModel() {
  const layers = ["Soul (Atman)", "Intellect (Buddhi)", "Mind (Manas)", "Senses (Indriyas)", "Objects (Matter)"];
  return (
    <div className="relative flex flex-col items-center justify-center p-8 sm:p-12 bg-indigo-950 rounded-[2.5rem] border border-indigo-500/30 shadow-2xl w-full lg:max-w-[700px]">
      <div className="absolute top-10 left-10 flex items-center gap-4 text-white font-black"><CircleUser className="text-saffron shadow-[0_0_15px_#f59e0b]" size={32} /><h3 className="uppercase text-xl">Inner Command</h3></div>
      <div className="w-full mt-24 flex flex-col gap-3">
        {layers.map((l, i) => (
          <div key={i} className={`p-4 border rounded-xl text-center font-black uppercase text-xs tracking-widest ${i === 0 ? 'bg-saffron text-white border-white shadow-xl' : 'bg-indigo-900/40 border-indigo-700 text-white'}`}>
            {String(l)}
          </div>
        ))}
      </div>
      <ArrowRight className="rotate-90 text-saffron mt-6 animate-bounce" size={32} />
      <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">Awareness Hierarchy (3.42)</span>
    </div>
  );
}

function ModerationModel() {
  return (
    <div className="relative flex flex-col items-center justify-center p-8 sm:p-12 bg-indigo-950 rounded-[2.5rem] border border-indigo-500/30 shadow-2xl w-full lg:max-w-[700px]">
      <div className="absolute top-10 left-10 flex items-center gap-4 text-white font-black"><Scale className="text-saffron shadow-[0_0_15px_#f59e0b]" size={32} /><h3 className="uppercase text-xl">Moderation Path</h3></div>
      <div className="mt-24 w-full space-y-4 text-white font-black uppercase text-xs">
        {[
          { label: "Aahara (Eating)", desc: "Neither gluttony nor extreme fasting.", icon: <Heart size={20} /> },
          { label: "Nidra (Sleep)", desc: "Balanced rest, neither excessive nor deprived.", icon: <Clock size={20} /> },
          { label: "Vihara (Activity)", desc: "Regulated work, movement, and recreation.", icon: <Activity size={20} /> }
        ].map((item, i) => (
          <div key={i} className="p-6 bg-indigo-900 border border-indigo-700 rounded-3xl flex items-center gap-6 shadow-md hover:border-saffron transition-all group">
            <div className="p-3 bg-saffron rounded-full text-white shadow-xl group-hover:scale-110 transition-transform">{item.icon}</div>
            <div className="text-left flex-1">
              <span className="text-saffron tracking-widest text-[10px]">{String(item.label)}</span>
              <p className="opacity-100 text-white text-sm sm:text-base mt-1 normal-case font-medium leading-relaxed">{String(item.desc)}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-8 text-center text-[10px] text-white/40 font-black uppercase tracking-widest">Gita Verse 6.16–6.17</p>
    </div>
  );
}

function DecisionFrameworkModel() {
  return (
    <div className="relative flex flex-col items-center justify-center p-8 sm:p-12 bg-indigo-950 rounded-[2.5rem] border border-indigo-500/30 shadow-2xl w-full lg:max-w-[700px]">
      <div className="absolute top-10 left-10 flex items-center gap-4 text-white font-black"><GitBranch className="text-saffron shadow-[0_0_15px_#f59e0b]" size={32} /><h3 className="uppercase text-xl">Decision Tree</h3></div>
      <div className="w-full mt-24 flex flex-col gap-4 text-left text-white font-black uppercase text-xs sm:text-sm">
        <div className="p-6 bg-indigo-900 border-l-4 border-saffron rounded-xl shadow-lg">1. Recognize Dharma</div>
        <div className="p-6 bg-indigo-900 border-l-4 border-indigo-500 rounded-xl shadow-lg">2. Filter Moha (Delusion)</div>
        <div className="p-6 bg-saffron text-white rounded-xl shadow-xl font-black border-4 border-white text-center">3. Resolute Action (2.41)</div>
      </div>
    </div>
  );
}

function WisdomLensesModel() {
  return (
    <div className="relative flex flex-col items-center justify-center p-8 bg-indigo-950 rounded-3xl border border-indigo-500/30 p-12 shadow-2xl w-full lg:max-w-[700px]">
      <div className="absolute top-10 left-10 flex items-center gap-4 text-white font-black"><Compass className="text-saffron shadow-[0_0_15px_#f59e0b]" size={32} /><h3 className="uppercase text-xl">Two Path Lenses</h3></div>
      <div className="w-full h-64 mt-24 flex items-center justify-center text-white font-black relative">
        <div className="absolute w-40 h-40 bg-indigo-800/40 rounded-full border-2 border-indigo-400 translate-x-[-30px] flex items-center justify-center shadow-lg text-center p-4">Sankhya (Knowledge)</div>
        <div className="absolute w-40 h-40 bg-saffron/20 rounded-full border-2 border-saffron translate-x-[30px] flex items-center justify-center shadow-lg text-center p-4">Yoga (Action)</div>
      </div>
      <p className="mt-8 text-[10px] text-white/40 font-black uppercase text-center tracking-widest">Analytical vs. Practical Perspective (2.39)</p>
    </div>
  );
}

function NineGatesModel() {
  return (
    <div className="relative flex flex-col items-center justify-center p-8 bg-indigo-950 rounded-3xl border border-indigo-500/30 shadow-2xl w-full lg:max-w-[700px]">
      <div className="absolute top-10 left-10 flex items-center gap-4 text-white font-black"><Building2 className="text-saffron shadow-[0_0_15px_#f59e0b]" size={32} /><h3 className="uppercase text-xl">City of Nine Gates</h3></div>
      <div className="mt-24 p-20 bg-indigo-900/60 rounded-full border-4 border-dashed border-indigo-500 flex items-center justify-center text-white font-black uppercase text-center shadow-xl">
        The soul resides happy within the bodily city (5.13)
      </div>
    </div>
  );
}

function JnaniVisionModel() {
  return (
    <div className="relative flex flex-col items-center justify-center p-8 sm:p-12 bg-indigo-950 rounded-[2.5rem] border border-indigo-500/30 shadow-2xl w-full lg:max-w-[700px]">
      <div className="absolute top-10 left-10 flex items-center gap-4 text-white font-black"><EyeIcon className="text-saffron shadow-[0_0_15px_#f59e0b]" size={32} /><h3 className="uppercase text-xl">Vision of Equality</h3></div>
      <div className="mt-24 grid grid-cols-2 gap-4 w-full text-white font-black uppercase text-xs">
        {["Brahmana", "Cow", "Elephant", "Dog", "Outcast"].map(b => <div key={b} className="p-4 bg-indigo-900 border border-indigo-700 rounded-xl text-center shadow-md">{String(b)}</div>)}
        <div className="p-4 bg-saffron text-white rounded-xl text-center shadow-xl font-black">One Brahman in All (5.18)</div>
      </div>
    </div>
  );
}

function FreedomFlowModel() {
  return (
    <div className="relative flex flex-col items-center justify-center p-8 sm:p-12 bg-indigo-950 rounded-[2.5rem] border border-indigo-500/30 shadow-2xl w-full lg:max-w-[700px]">
      <div className="absolute top-10 left-10 flex items-center gap-4 text-white font-black"><TrendingUp className="text-saffron shadow-[0_0_15px_#f59e0b]" size={32} /><h3 className="uppercase text-xl">Freedom Flow</h3></div>
      <div className="mt-24 w-full flex flex-col gap-4 text-white font-black uppercase text-center text-xs">
        {["Perform Action", "Detach from Fruits", "Purify Mind", "Attain Union"].map((s, i) => (
          <div key={i} className={`p-4 border rounded-xl shadow-lg ${i === 3 ? 'bg-saffron text-white border-white' : 'bg-indigo-900 border-indigo-700'}`}>{String(s)}</div>
        ))}
      </div>
      <p className="mt-8 text-[10px] text-white/40 font-black uppercase tracking-widest">Gita 5.7–5.12</p>
    </div>
  );
}

function YogaLadderModel() {
  return (
    <div className="relative flex flex-col items-center justify-center p-8 sm:p-12 bg-indigo-950 rounded-[2.5rem] border border-indigo-500/30 shadow-2xl w-full lg:max-w-[700px]">
      <div className="absolute top-10 left-10 flex items-center gap-4 text-white font-black"><TrendingUp className="text-saffron shadow-[0_0_15px_#f59e0b]" size={32} /><h3 className="uppercase text-xl">Yoga Ladder</h3></div>
      <div className="mt-24 w-full flex flex-col gap-4 text-white font-black uppercase tracking-widest text-center">
        <div className="p-8 bg-saffron rounded-3xl shadow-2xl border-4 border-white text-sm">Silence (The Arudha)</div>
        <div className="p-8 bg-indigo-900 border border-indigo-700 rounded-3xl opacity-60">Action (The Arurukshu)</div>
      </div>
      <p className="mt-8 text-[10px] text-white/40 font-black uppercase tracking-widest text-center">Ascending from Work to Meditation (6.3)</p>
    </div>
  );
}

function MindFriendFoeModel({ intellectLevel }) {
  return (
    <div className="relative flex flex-col items-center justify-center p-8 sm:p-12 bg-indigo-950 rounded-[2.5rem] border border-indigo-500/30 shadow-2xl w-full lg:max-w-[700px]">
      <div className="absolute top-10 left-10 flex items-center gap-4 text-white font-black"><Target className="text-saffron shadow-[0_0_15px_#f59e0b]" size={32} /><h3 className="uppercase text-xl">The Mind</h3></div>
      <div className="w-full mt-24 flex gap-6 text-white font-black">
        <div className="flex-1 p-8 bg-indigo-900/60 border border-green-500/30 rounded-3xl text-center shadow-lg transition-all" style={{ opacity: 0.1 + (intellectLevel / 100) }}>
          <UserCheck className="mx-auto mb-4 text-white" size={40} />
          <span className="text-xs font-black uppercase tracking-widest">Friend</span>
          <p className="text-[10px] mt-4 opacity-70">Controlled Mind (6.5)</p>
        </div>
        <div className="flex-1 p-8 bg-indigo-900/60 border border-red-500/30 rounded-3xl text-center shadow-lg transition-all" style={{ opacity: 1.1 - (intellectLevel / 100) }}>
          <ZapOff className="mx-auto mb-4 text-white" size={40} />
          <span className="text-xs font-black uppercase tracking-widest">Enemy</span>
          <p className="text-[10px] mt-4 opacity-70">Uncontrolled Mind (6.6)</p>
        </div>
      </div>
    </div>
  );
}

function WindlessLampModel() {
  return (
    <div className="relative flex flex-col items-center justify-center p-8 sm:p-12 bg-indigo-950 rounded-[2.5rem] border border-indigo-500/30 shadow-2xl w-full lg:max-w-[700px]">
      <div className="absolute top-10 left-10 flex items-center gap-4 text-white font-black"><Wind className="text-saffron shadow-[0_0_15px_#f59e0b]" size={32} /><h3 className="uppercase text-xl">Mind Lamp</h3></div>
      <div className="mt-24 text-center">
        <div className="w-16 h-20 bg-saffron rounded-t-full shadow-[0_0_50px_#f59e0b] mx-auto animate-pulse" />
        <p className="mt-8 text-white font-black uppercase tracking-widest">Total Stillness (6.19)</p>
      </div>
    </div>
  );
}

function GenericHighContrastModel({ icon: Icon, title, content = [], footer }) {
  return (
    <div className="relative flex flex-col items-center justify-center p-8 sm:p-12 bg-indigo-950 rounded-[2.5rem] border border-indigo-500/30 shadow-2xl w-full lg:max-w-[700px]">
      <div className="absolute top-10 left-10 flex items-center gap-4 text-white font-black">
        <Icon className="text-saffron shadow-[0_0_15px_#f59e0b]" size={32} />
        <h3 className="uppercase text-xl font-black">{String(title)}</h3>
      </div>
      <div className="w-full mt-24 flex flex-col gap-4 text-white font-black uppercase text-center text-xs tracking-widest">
        {content.map((s, i) => (
          <div key={i} className={`p-6 border-2 rounded-2xl shadow-xl ${i === content.length - 1 ? 'bg-saffron text-white border-white' : 'bg-indigo-900 border-indigo-700 opacity-90'}`}>
            {String(s)}
          </div>
        ))}
      </div>
      {footer && <p className="mt-8 text-[10px] text-white/40 font-black uppercase tracking-widest">{String(footer)}</p>}
    </div>
  );
}

function PlaceholderModel({ id }) {
  return (
    <div className="p-20 bg-indigo-950 border border-dashed border-indigo-500 text-white font-black uppercase text-center rounded-[3rem] shadow-2xl w-full lg:max-w-[700px]">
      <Clock size={48} className="mx-auto mb-4 text-saffron animate-pulse" />
      <span className="block text-2xl tracking-tighter">{String(id || 'Model')}</span>
      <span className="text-[10px] opacity-40 mt-4 block">Schema-based Visualization Manifesting...</span>
    </div>
  );
}

// ==========================================
// MAIN APP ORCHESTRATOR
// ==========================================

const App = () => {
  const [zoom, setZoom] = useState(1);
  const [activeModelId, setActiveModelId] = useState(null);
  const [intellectLevel, setIntellectLevel] = useState(100);
  const [ageProgress, setAgeProgress] = useState(0);
  const [selectedQualityIndex, setSelectedQualityIndex] = useState(0);
  const [selectedLayerIndex, setSelectedLayerIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const resetView = () => { setActiveModelId(null); setChatOpen(false); };
  const handleModelSelect = (id) => { setActiveModelId(id); setZoom(1); };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    setChatMessages(prev => [...prev, { role: 'user', text: String(chatInput) }]);
    setChatInput("");
    setIsChatLoading(true);
    setTimeout(() => {
      setChatMessages(prev => [...prev, { role: 'ai', text: "Behold the eternal architecture. Clarity of Buddhi leads to the Eternal Truth." }]);
      setIsChatLoading(false);
    }, 1200);
  };

  // --- MODEL COMPONENT REGISTRY (Single Point of Truth) ---
  const REGISTRY = {
    'atma-body': <AtmaBodyModel intellectLevel={intellectLevel} ageProgress={ageProgress} />,
    'karma-yoga-cycle': <KarmaCycleModel intellectLevel={intellectLevel} windowWidth={windowWidth} />,
    'sat-asat': <SatAsatModel selectedLayerIndex={selectedLayerIndex} setSelectedLayerIndex={setSelectedLayerIndex} intellectLevel={intellectLevel} />,
    'stitha-prajna': <StithaPrajnaModel selectedQualityIndex={selectedQualityIndex} setSelectedQualityIndex={setSelectedQualityIndex} qualities={GITA_DATA[0].models.find(m => m.id === 'stitha-prajna')?.qualities || []} windowWidth={windowWidth} />,
    'rebirth-cycle': <RebirthCycleModel />,
    'moderation-yoga': <ModerationModel />,
    'nine-gates': <NineGatesModel />,
    'sage-vision': <JnaniVisionModel />,
    'freedom-detachment': <FreedomFlowModel />,
    'yoga-ladder': <YogaLadderModel />,
    'mind-friend-enemy': <MindFriendFoeModel intellectLevel={intellectLevel} />,
    'windless-lamp': <WindlessLampModel />,
    'righteous-decision': <DecisionFrameworkModel />,
    'wisdom-lenses': <WisdomLensesModel />,
    'two-paths': <GenericHighContrastModel icon={Split} title="Two Paths" content={["Jnana Yoga (Knowledge)", "Karma Yoga (Action)", "One Ultimate Destination"]} footer="Verse 3.3" />,
    'yajna-framework': <GenericHighContrastModel icon={RotateCw} title="Cooperation" content={["Brahman acts", "Yajna sustains", "Rain falls", "Food grows", "Beings thrive"]} footer="Verse 3.14" />,
    'threefold-duty': <GenericHighContrastModel icon={ListChecks} title="Structure of Duty" content={["Prescribed Action", "Detached Performance", "Sacrificial Offering"]} footer="Verse 3.19" />,
    'ego-less-action': <GenericHighContrastModel icon={Users} title="Gunatita Flow" content={["Nature's Gunas act", "The Soul observes", "Abandon deluded doership"]} footer="Verse 3.27" />,
    'desire-anger-vortex': <GenericHighContrastModel icon={ZapOff} title="The Vortex" content={["Contact with Objects", "Cravings (Desire)", "Frustration (Anger)", "Loss of Intellect"]} footer="Verse 3.37" />,
    'chariot-analogy': <GenericHighContrastModel icon={CircleUser} title="Inner Chariot" content={["Senses (Horses)", "Mind (Reins)", "Intellect (Driver)", "Soul (Passenger)"]} footer="Verse 3.43" />,
    'leaders-ripple': <GenericHighContrastModel icon={TrendingUp} title="Leadership" content={["Leader sets standard", "Common men follow", "Order Restored"]} footer="Verse 3.21" />,
    'action-worship': <GenericHighContrastModel icon={Heart} title="Karma Worship" content={["Work with Devotion", "Renounce Ego", "Attain Liberation"]} footer="Verse 3.30" />,
    'divine-descent': <GenericHighContrastModel icon={CloudRain} title="Avatara" content={["Dharma Declines", "Evil Prevails", "Divine Manifestation"]} footer="Verse 4.7" />,
    'four-varnas': <GenericHighContrastModel icon={Binary} title="Guna Varna" content={["Intelligence-Service", "Valour-Governance", "Commerce-Wealth", "Skill-Labor"]} footer="Verse 4.13" />,
    'sacrifice-types': <GenericHighContrastModel icon={FlameKindling} title="The Yajnas" content={["Knowledge Sacrifice", "Material Sacrifice", "Sense Restraint", "Yoga Practice"]} footer="Verse 4.25" />,
    'knowledge-boat': <GenericHighContrastModel icon={Ship} title="Jnana Boat" content={["The Sea of Sin", "The Boat of Wisdom", "Crossing to the Shore"]} footer="Verse 4.36" />,
    'knowledge-fire': <GenericHighContrastModel icon={Flame} title="Jnana Fire" content={["Fire of Truth", "Karma consumed", "Ashes of Ignorance"]} footer="Verse 4.37" />,
    'mind-hierarchy': <MindHierarchyModel />,
    'renunciation-vs-action': <GenericHighContrastModel icon={Split} title="Comparison" content={["Karma Yoga (Action)", "Karma Sanyasa (Renunciation)", "Karma Yoga is Superior"]} footer="Verse 5.2" />,
  };

  return (
    <div className="flex h-screen w-screen bg-[#020617] text-white overflow-hidden font-sans select-none relative">
      <main className="relative flex-1 flex flex-col bg-[#020617] overflow-auto scroll-smooth custom-scrollbar">
        {/* HEADER */}
        <button onClick={resetView} className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-2.5 bg-indigo-950 border border-indigo-500/40 rounded-full shadow-2xl backdrop-blur-md flex items-center gap-3 hover:scale-105 active:scale-95 transition-all ${activeModelId ? 'opacity-30 hover:opacity-100' : 'opacity-100'}`}>
          <BookOpen size={18} color={THEME.saffron} className="drop-shadow-[0_0_12px_rgba(245,158,11,0.8)]" />
          <span className="text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-white">Gita visual Guide v1.0</span>
        </button>

        {/* HUD BOTTOM CONTROLS */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 lg:left-12 lg:translate-x-0 z-[130] flex items-center gap-3 p-2 bg-indigo-950 border border-indigo-500/40 rounded-[2rem] shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-1 bg-black/60 p-1 rounded-[1.5rem] border border-indigo-800 text-white">
            <button onClick={() => setZoom(z => Math.max(0.4, z - 0.1))} className="p-2 hover:text-saffron transition-all"><Minimize2 size={18} /></button>
            <div className="px-3 text-xs sm:text-sm font-black text-white hidden sm:block">{Math.round(zoom * 100)}%</div>
            <button onClick={() => setZoom(z => Math.min(2.5, z + 0.1))} className="p-2 hover:text-saffron transition-all"><Maximize2 size={18} /></button>
          </div>
          {activeModelId && <button onClick={resetView} className="px-5 sm:px-8 py-3 bg-saffron text-indigo-950 font-black text-[10px] sm:text-xs uppercase rounded-[1.25rem] active:scale-95 shadow-xl hover:bg-white transition-all">Library</button>}
        </div>

        {/* CANVAS */}
        <div className={`flex-1 w-full flex items-start justify-center p-4 relative overflow-visible min-h-screen pt-32 transition-all`}>
          <div className="transition-all duration-700 ease-out w-full flex justify-center pb-32" style={{ transform: `scale(${zoom})`, transformOrigin: 'top center', backgroundImage: `radial-gradient(${THEME.saffron}10 1.5px, transparent 0)`, backgroundSize: '100px 100px' }}>
            {!activeModelId ? (
              <div className="flex flex-col items-center p-6 w-full max-w-6xl animate-in fade-in pt-32">
                <div className="text-center mb-16 text-white font-black">
                  <div className="w-32 h-32 mx-auto mb-8 border-[3px] border-dashed border-saffron/40 rounded-full flex items-center justify-center animate-pulse shadow-2xl"><Compass size={60} className="text-saffron" /></div>
                  <h2 className="text-4xl sm:text-6xl font-black uppercase mb-6 tracking-widest drop-shadow-lg">Gita Visual Guide</h2>
                </div>
                {GITA_DATA.map(ch => (
                  <div key={ch.chapter} className="w-full mb-16 text-left">
                    <div className="flex items-center gap-4 mb-10 border-b border-indigo-500/30 pb-6 text-white font-black">
                      <span className="text-2xl bg-saffron text-indigo-950 px-4 py-1 rounded-xl shadow-lg uppercase font-black">CH {String(ch.chapter)}</span>
                      <span className="text-3xl uppercase tracking-widest">{String(ch.title)}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {ch.models.map(m => (
                        <button key={m.id} onClick={() => handleModelSelect(m.id)} className="group p-8 bg-indigo-950/60 border border-indigo-900 rounded-[2.5rem] text-left transition-all hover:bg-indigo-900/80 hover:border-saffron/50 hover:scale-[1.03] shadow-2xl text-white font-black">
                          <h3 className="text-xl font-black uppercase group-hover:text-saffron transition-colors tracking-tight">{String(m.name)}</h3>
                          <p className="text-sm text-white/60 mt-2 font-medium line-clamp-2 normal-case tracking-normal">{String(m.description)}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row gap-12 items-start justify-center pt-24 sm:pt-32 w-full max-w-[1400px]">
                {REGISTRY[activeModelId] || <PlaceholderModel id={activeModelId} />}
                <SidebarComponent verses={VERSES_DB[activeModelId] || []} />
              </div>
            )}
          </div>
        </div>

        {/* CHAT TRIGGER */}
        {activeModelId && (
          <div className="fixed bottom-24 lg:bottom-10 right-6 sm:right-8 z-[200]">
            <button onClick={() => setChatOpen(!chatOpen)} className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center text-indigo-950 shadow-[0_0_40px_white] hover:scale-110 active:scale-95 transition-all"><MessageSquare size={24} /></button>
          </div>
        )}

        {/* CHAT MODAL (v1.0 HIGH-VISIBILITY THEME) */}
        {chatOpen && (
          <div className="fixed bottom-52 lg:bottom-32 right-6 sm:right-8 z-[210] w-[90vw] sm:w-[420px] h-[550px] bg-white border-2 border-saffron rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden animate-in zoom-in-95 text-indigo-950">
            <div className="p-5 sm:p-6 bg-saffron text-white flex justify-between items-center shadow-lg font-black uppercase tracking-widest text-sm">
              <span>Ask the Sage</span>
              <button onClick={() => setChatOpen(false)} className="hover:rotate-90 transition-all"><X size={24} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 custom-scrollbar bg-white text-indigo-950 text-left">
              {chatMessages.length === 0 && <p className="text-center text-indigo-950/30 italic mt-32 text-sm font-serif">"Seek and the truth shall manifest."</p>}
              {chatMessages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-[1.5rem] text-sm font-black shadow-md ${m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-saffron/10 border border-saffron/40 italic text-indigo-950'}`}>
                    {String(m?.text || '')}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 border-t border-indigo-100 bg-indigo-50 flex items-center">
              <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} className="flex-1 bg-white border-2 border-indigo-200 rounded-2xl py-4 px-6 text-indigo-950 font-black focus:border-saffron outline-none text-sm placeholder-indigo-950/20" placeholder="Type inquiry..." />
              <button onClick={handleSendMessage} disabled={isChatLoading} className="ml-3 p-4 bg-saffron text-white rounded-2xl hover:bg-indigo-950 transition-colors shadow-lg"><Send size={24} /></button>
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
        .animate-spin-slow { animation: spin 15s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}} />
    </div>
  );
};

export default App;