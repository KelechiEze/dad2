
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Heart, 
  Calendar, 
  Clock, 
  ChevronRight, 
  Star, 
  Quote, 
  Phone, 
  Image as ImageIcon,
  Award,
  Users,
  Lightbulb,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { CountdownTime, Achievement, Tribute, Milestone } from './types';

// --- Sparkle Utility ---
const triggerCelestialDust = () => {
  const duration = 3000;
  const animationEnd = Date.now() + duration;
  const colors = ['#D4AF37', '#FDFCFB', '#B8860B', '#E5E7EB'];

  const createDust = () => {
    const dust = document.createElement('div');
    const size = Math.random() * 4 + 1 + 'px';
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    dust.style.width = size;
    dust.style.height = size;
    dust.style.backgroundColor = color;
    dust.style.position = 'fixed';
    dust.style.bottom = '-10px';
    dust.style.left = Math.random() * 100 + 'vw';
    dust.style.zIndex = '10000';
    dust.style.borderRadius = '50%';
    dust.style.boxShadow = `0 0 12px ${color}`;
    dust.style.pointerEvents = 'none';
    
    document.body.appendChild(dust);

    const destY = -120 - Math.random() * 100 + 'vh';
    const destX = (Math.random() - 0.5) * 300 + 'px';
    
    const animation = dust.animate([
      { transform: 'translate(0, 0) scale(1)', opacity: 0.8 },
      { transform: `translate(${destX}, ${destY}) scale(0)`, opacity: 0 }
    ], {
      duration: 2000 + Math.random() * 2000,
      easing: 'cubic-bezier(0.1, 0, 0.3, 1)'
    });

    animation.onfinish = () => dust.remove();
  };

  const interval = setInterval(() => {
    if (Date.now() > animationEnd) {
      clearInterval(interval);
      return;
    }
    for (let i = 0; i < 10; i++) createDust();
  }, 50);
};

// --- Navbar Component ---
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${scrolled ? 'bg-white/80 backdrop-blur-2xl py-4 shadow-sm border-b border-gold-200/10' : 'bg-transparent py-8'}`}>
      <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => scrollTo('hero')}>
          <div className="w-12 h-12 bg-white shadow-xl rounded-full flex items-center justify-center border border-[#D4AF37]/20">
            <Heart className="text-[#D4AF37] w-6 h-6 fill-[#D4AF37]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold font-serif text-[#1A1A1A] leading-none">Happy <span className="gold-text">Birthday</span></span>
            <span className="text-[10px] uppercase tracking-[0.4em] text-gray-400 mt-1">Many more YEARS</span>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center gap-12">
          {['about', 'timeline', 'gallery', 'wisdom', 'tributes'].map((id) => (
            <button key={id} onClick={() => scrollTo(id)} className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#5D5956] hover:text-[#D4AF37] transition-all relative group">
              {id === 'about' ? 'Legacy' : id}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#D4AF37] group-hover:w-full transition-all duration-300"></span>
            </button>
          ))}
        </div>

        <button 
          onClick={() => { triggerCelestialDust(); scrollTo('tributes'); }}
          className="hidden lg:flex bg-[#1A1A1A] text-white px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#D4AF37] transition-all transform active:scale-95 shadow-xl"
        >
          Sign Guestbook
        </button>

        <button className="lg:hidden text-[#1A1A1A]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white p-12 flex flex-col items-center justify-center gap-10 animate-in fade-in zoom-in duration-500">
          <button className="absolute top-8 right-8" onClick={() => setIsOpen(false)}><X className="w-10 h-10" /></button>
          {['hero', 'about', 'timeline', 'gallery', 'wisdom', 'tributes'].map((id) => (
            <button key={id} onClick={() => scrollTo(id)} className="text-4xl font-serif text-[#1A1A1A] hover:text-[#D4AF37]">
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

// --- Hero Component ---
const Hero: React.FC = () => {
  const [unveiled, setUnveiled] = useState(false);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-[#FDFCFB]">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[15%] left-[5%] w-[40rem] h-[40rem] bg-[#D4AF37]/5 blur-[150px] rounded-full animate-float"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[35rem] h-[35rem] bg-[#B8860B]/5 blur-[150px] rounded-full animate-float" style={{ animationDelay: '-4s' }}></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 grid lg:grid-cols-2 gap-24 items-center z-10">
        <div className="text-center lg:text-left space-y-12">
          <div className="inline-flex items-center gap-4 px-6 py-2.5 rounded-full bg-white shadow-sm border border-gray-100 text-[#B8860B] text-[10px] font-bold tracking-[0.4em] uppercase">
            <Sparkles className="w-4 h-4 fill-[#D4AF37]" />
            A Golden Reflection • 1963 - 2026
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-7xl font-black leading-[0.85] font-serif text-[#1A1A1A] tracking-tighter">
            Pure <br />
            <span className="gold-text italic font-normal block pl-4 md:pl-20">Integrity.</span>
          </h1>
          <p className="text-xl text-[#5D5956] max-w-xl leading-relaxed font-light mx-auto lg:mx-0">
            Celebrating the 63rd year of a man whose presence is a masterclass in faith, perseverance, and quiet authority.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
            <button 
              onClick={() => { setUnveiled(true); triggerCelestialDust(); }}
              className="bg-[#D4AF37] hover:bg-[#1A1A1A] text-white px-12 py-6 rounded-full font-bold text-xs tracking-[0.3em] uppercase transition-all shadow-2xl shadow-[#D4AF37]/30 flex items-center justify-center gap-4"
            >
              The Unveiling <Sparkles className="w-5 h-5" />
            </button>
            <button 
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-12 py-6 rounded-full font-bold text-xs tracking-[0.3em] uppercase border border-[#D4AF37] bg-white text-[#1A1A1A] transition-all shadow-sm flex items-center justify-center hover:bg-[#D4AF37]/5"
            >
              Discover Story
            </button>
          </div>
        </div>

        <div className="relative perspective-2000">
          <div className="relative z-10 w-full aspect-[4/5] rounded-[5rem] overflow-hidden shadow-[0_80px_120px_-30px_rgba(212,175,55,0.25)] border-[16px] border-white">
             <img src="https://kelechieze.wordpress.com/wp-content/uploads/2026/01/dad1.jpeg" className="w-full h-full object-cover" alt="Father" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/20 via-transparent to-transparent"></div>
          </div>
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-white p-4 rounded-[3rem] shadow-2xl z-20 hidden md:block">
            <img src="https://kelechieze.wordpress.com/wp-content/uploads/2026/01/daday1.jpeg" className="w-full h-full object-cover rounded-[2.5rem]" />
            <div className="absolute top-8 right-8 w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center text-white"><Heart className="w-6 h-6 fill-white" /></div>
          </div>
        </div>
      </div>

      {unveiled && (
        <div className="fixed inset-0 z-[1000] bg-white/95 backdrop-blur-3xl flex items-center justify-center animate-in fade-in duration-700">
           <div className="text-center space-y-10 max-w-3xl px-8 animate-in zoom-in slide-in-from-bottom-20 duration-1000">
              <div className="w-28 h-28 bg-[#D4AF37] rounded-full mx-auto flex items-center justify-center shadow-3xl shadow-[#D4AF37]/50">
                <Heart className="w-14 h-14 text-white fill-white" />
              </div>
              <h2 className="text-7xl md:text-9xl font-serif font-bold text-[#1A1A1A]">Happy Birthday,<br /><span className="gold-text italic">Father.</span></h2>
              <p className="text-2xl text-[#5D5956] font-light italic leading-relaxed">"A father is neither an anchor to hold us back, nor a sail to take us there, but a guiding light whose love shows us the way."</p>
              <button onClick={() => setUnveiled(false)} className="bg-[#1A1A1A] text-white px-16 py-6 rounded-full font-bold uppercase tracking-[0.4em] hover:bg-[#D4AF37] transition-all">Begin Celebration</button>
           </div>
        </div>
      )}
    </section>
  );
};

// --- Countdown Component ---
const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const calculateTimeLeft = useCallback(() => {
    const birthday = new Date(`${new Date().getFullYear()}-01-31T00:00:00`);
    const now = new Date();
    if (now > birthday) birthday.setFullYear(birthday.getFullYear() + 1);
    const diff = +birthday - +now;
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return (
    <div className="max-w-[1400px] mx-auto px-8 pt-48 pb-24 relative z-30">
      <div className="bg-white/80 backdrop-blur-3xl rounded-[5rem] p-12 md:p-20 shadow-[0_50px_150px_-30px_rgba(0,0,0,0.1)] border border-white flex flex-col md:flex-row items-center justify-between gap-16">
        <div className="text-center md:text-left">
          <span className="text-[#D4AF37] font-bold tracking-[0.5em] uppercase text-[10px]">The Milestone Clock</span>
          <h3 className="text-5xl font-serif font-bold text-[#1A1A1A] mt-2">The Golden Hour</h3>
        </div>
        <div className="grid grid-cols-4 gap-8 md:gap-20">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-5xl md:text-8xl font-black text-[#1A1A1A] tracking-tighter">
                {String(item.value).padStart(2, '0')}
              </div>
              <div className="text-[#B8860B] text-[10px] font-bold uppercase tracking-[0.3em] mt-4">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Legacy Section ---
const LegacySection: React.FC = () => {
  return (
    <section id="about" className="py-48 px-8 bg-white relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-32 items-center">
          <div className="space-y-16">
            <div className="space-y-8">
              <div className="flex items-center gap-6 text-[#D4AF37] font-bold uppercase tracking-[0.5em] text-xs">
                <div className="w-16 h-px bg-[#D4AF37]"></div>
                The Pillar of Eze
              </div>
              <h2 className="text-6xl md:text-8xl font-serif font-bold text-[#1A1A1A] leading-[1.1]">
                Sixty-Three Years of <br /><span className="gold-text italic">Pure Resilience.</span>
              </h2>
              <p className="text-2xl text-[#5D5956] font-light leading-relaxed max-w-xl">
                His life is an editorial on grace. From the early mornings of hard work to the quiet evenings of wisdom, he remains our greatest teacher.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-10">
              {[
                { icon: ShieldCheck, title: "Moral Authority", desc: "Setting the standard for what it means to be a person of word and honor." },
                { icon: Compass, title: "Guided Vision", desc: "Always seeing three steps ahead, ensuring the family's path is secure." }
              ].map((item, i) => (
                <div key={i} className="p-10 rounded-[3.5rem] bg-[#FDFCFB] border border-gray-100 shadow-sm">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-md text-[#1A1A1A]">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-[#1A1A1A] mb-4 font-serif">{item.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed font-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 rounded-[5rem] overflow-hidden shadow-3xl border-[20px] border-white ring-1 ring-gray-100">
               <img src="https://kelechieze.wordpress.com/wp-content/uploads/2026/01/dad5.jpeg" className="w-full object-cover aspect-[3/4]" alt="Legacy Portrait" />
            </div>
            <div className="absolute -top-12 -right-12 w-56 h-56 bg-[#D4AF37] rounded-full z-20 flex flex-col items-center justify-center text-white shadow-2xl p-6 text-center transform rotate-12">
               <span className="text-[10px] uppercase tracking-widest font-bold">Celebrating</span>
               <span className="text-6xl font-black font-serif my-2">63</span>
               <span className="text-[10px] uppercase tracking-widest font-bold">Magnificent Years</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Timeline Component ---
const TimelineSection: React.FC = () => {
  const milestones: Milestone[] = [
    { year: '1961', title: 'The Genesis', desc: 'A cold morning in January, the arrival of a soul destined for greatness.' },
    { year: '1997', title: 'The First Seed', desc: 'The family roots took hold with the birth of Emmanuel.' },
    { year: '2000', title: 'Expansion of Love', desc: 'Kelechi was born, doubling the joy and the mission.' },
    { year: '2001', title: 'The Perfect Trio', desc: 'Onyinye joined the family, completing the core Eze legacy.' },
    { year: 'Present', title: 'Eternal Radiance', desc: 'Standing today as a beacon of wisdom, loved by all generations.' }
  ];

  return (
    <section id="timeline" className="py-48 px-8 bg-[#FDFCFB]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-32">
          <span className="text-[#D4AF37] font-bold tracking-[0.5em] uppercase text-xs">Chronicles of a Hero</span>
          <h2 className="text-6xl md:text-8xl font-serif font-bold text-[#1A1A1A] mt-4">Journey of Grace</h2>
        </div>
        
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#D4AF37]/40 via-[#D4AF37]/10 to-transparent hidden md:block"></div>
          
          <div className="space-y-32">
            {milestones.map((m, i) => (
              <div key={i} className={`flex flex-col md:flex-row gap-16 items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'} px-4`}>
                   <div className="text-5xl md:text-7xl font-serif italic text-[#D4AF37]/20 mb-4">{m.year}</div>
                   <h4 className="text-3xl font-bold text-[#1A1A1A] mb-4 font-serif">{m.title}</h4>
                   <p className="text-lg text-[#5D5956] font-light leading-relaxed max-w-md mx-auto md:mx-0">{m.desc}</p>
                </div>
                <div className="relative z-10 w-16 h-16 bg-white rounded-full border-4 border-[#D4AF37] shadow-xl flex items-center justify-center shrink-0">
                  <div className="w-4 h-4 bg-[#D4AF37] rounded-full animate-pulse"></div>
                </div>
                <div className="w-full md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Visual Poem (Image Carousel) ---
const ImageCarousel: React.FC = () => {
  const row1 = [
    "https://kelechieze.wordpress.com/wp-content/uploads/2026/01/dad2.jpeg",
    "https://kelechieze.wordpress.com/wp-content/uploads/2026/01/dad1.jpeg",
    "https://kelechieze.wordpress.com/wp-content/uploads/2026/01/daday4.jpeg",
    "https://kelechieze.wordpress.com/wp-content/uploads/2026/01/dad5.jpeg",
    "https://kelechieze.wordpress.com/wp-content/uploads/2026/01/daday5.jpeg",
    "https://kelechieze.wordpress.com/wp-content/uploads/2026/01/dad8.jpeg",
  ];
  
  const row2 = [
    "https://kelechieze.wordpress.com/wp-content/uploads/2026/01/dady6.jpeg",
    "https://kelechieze.wordpress.com/wp-content/uploads/2026/01/daday2.jpeg",
    "https://kelechieze.wordpress.com/wp-content/uploads/2026/01/daday4.jpeg",
    "https://kelechieze.wordpress.com/wp-content/uploads/2026/01/dad3.jpeg",
    "https://kelechieze.wordpress.com/wp-content/uploads/2026/01/dad2.jpeg",
    "https://kelechieze.wordpress.com/wp-content/uploads/2026/01/daday3.jpeg",
  ];

  return (
    <section id="gallery" className="py-48 bg-white overflow-hidden">
      <div className="text-center mb-32 px-8">
        <h2 className="text-6xl md:text-9xl font-serif font-bold text-[#1A1A1A] mb-8">A Visual Poem</h2>
        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto rounded-full"></div>
        <p className="mt-8 text-gray-400 uppercase tracking-[0.4em] text-[10px] font-bold">Infinite Moments • Endless Memories</p>
      </div>
      
      <div className="space-y-4">
        {/* Row 1 - Left to Right Animation */}
        <div className="flex overflow-hidden relative">
          <div className="flex gap-4 animate-marquee-ltr min-w-full">
            {[...row1, ...row1].map((img, i) => (
              <div key={i} className="h-[400px] md:h-[700px] aspect-[3/4] flex-shrink-0 shadow-2xl">
                <img src={img} className="w-full h-full object-cover" alt="Memory" />
              </div>
            ))}
          </div>
        </div>
        
        {/* Row 2 - Right to Left Animation */}
        <div className="flex overflow-hidden relative">
          <div className="flex gap-4 animate-marquee-rtl min-w-full">
            {[...row2, ...row2].map((img, i) => (
              <div key={i} className="h-[400px] md:h-[700px] aspect-[3/4] flex-shrink-0 shadow-2xl">
                <img src={img} className="w-full h-full object-cover" alt="Memory" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Wisdom Corner ---
const WisdomCorner: React.FC = () => {
  const words = [
    { text: "Let your yes be yes and your no be no. Integrity is non-negotiable.", category: "Character", ref: "Matthew 5:37" },
    { text: "Love is patient, it suffers long. It never fails.", category: "Virtue", ref: "1 Cor 13:4" },
    { text: "Do not be anxious. Present your heart to God in all things.", category: "Faith", ref: "Phil 4:6" },
    { text: "Unless the Lord builds, the labor is in vain. Trust the Architect.", category: "Vision", ref: "Psalm 127:1" }
  ];

  return (
    <section id="wisdom" className="py-48 px-8 bg-[#FDFCFB]">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-32 items-end mb-32">
          <div>
            <h2 className="text-6xl md:text-8xl font-serif font-bold text-[#1A1A1A]">Principles to <br /><span className="gold-text italic">Hold Dear.</span></h2>
          </div>
          <p className="text-2xl text-[#5D5956] font-light max-w-md border-l-4 border-[#D4AF37] pl-8 py-4 italic">
            "Wisdom is the reward for a lifetime of listening."
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {words.map((w, i) => (
            <div key={i} className="bg-white p-16 rounded-[4.5rem] shadow-sm border border-gray-50 h-full flex flex-col justify-between">
              <div>
                <Quote className="w-16 h-16 text-[#D4AF37]/20 mb-10 transition-colors duration-500" />
                <p className="text-3xl font-serif italic text-[#1A1A1A] leading-relaxed">"{w.text}"</p>
              </div>
              <div className="mt-16 pt-8 border-t border-gray-50">
                <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#D4AF37] mb-2">{w.category}</div>
                <div className="text-xs text-gray-300 font-medium">{w.ref}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Tributes Component ---
const Tributes: React.FC = () => {
  const tributes: Tribute[] = [
    { name: 'Dorothy Eze', relation: 'Beloved Wife', message: 'To my dearest partner: your strength is our anchor. Watching you lead this family with such grace has been the greatest honor of my life.' },
    { name: 'Emmanuel Eze', relation: 'First Son', message: 'Dad, thank you for showing me that a man\'s value is found in his service to others. You are my ultimate benchmark.' },
    { name: 'Onyinye Eze', relation: 'Daughter', message: 'You made me feel like royalty every single day. Thank you for the laughter, the protection, and the endless support.' },
    { name: 'Kelechi Eze', relation: 'Second Son', message: 'Every success I achieve is built on the foundations you laid. Thank you for being my mentor and my friend.' },
  ];

  return (
    <section id="tributes" className="py-48 px-8 bg-white relative">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-32">
           <span className="text-[#D4AF37] font-bold uppercase tracking-[0.5em] text-xs">The Guest Book</span>
           <h2 className="text-6xl md:text-9xl font-serif font-bold text-[#1A1A1A] mt-6">Voices of Devotion</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {tributes.map((t, idx) => (
            <div key={idx} className="bg-[#FDFCFB] p-16 md:p-24 rounded-[5rem] border border-gray-50 flex flex-col justify-between shadow-sm">
               <Quote className="w-12 h-12 text-[#D4AF37]/5 mb-10" />
               <p className="text-3xl md:text-4xl text-[#1A1A1A] font-light italic leading-relaxed font-serif">"{t.message}"</p>
               <div className="mt-16 flex items-center gap-8">
                  <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-2xl">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-2xl text-[#1A1A1A]">{t.name}</div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-bold mt-1">{t.relation}</div>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Footer Component ---
const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FDFCFB] py-32 px-8 border-t border-gray-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[50%] h-full bg-[#D4AF37]/5 blur-[150px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-20 text-center md:text-left z-10 relative">
        <div className="space-y-8 max-w-md">
          <div className="flex items-center justify-center md:justify-start gap-4">
             <div className="w-14 h-14 bg-white shadow-2xl rounded-full flex items-center justify-center border border-[#D4AF37]/20">
               <Heart className="text-[#D4AF37] w-7 h-7 fill-[#D4AF37]" />
             </div>
             <span className="text-4xl font-bold font-serif text-[#1A1A1A]">Happy <span className="gold-text">Birthday</span></span>
          </div>
          <p className="text-xl text-[#5D5956] font-light leading-relaxed">
            Honoring sixty-three golden years of unyielding faith, profound wisdom, and a legacy that will radiate for generations.
          </p>
          <div className="flex justify-center md:justify-start gap-8">
            {[Heart, Star, Sparkles].map((Icon, i) => (
              <div key={i} className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 shadow-sm">
                <Icon className="w-5 h-5" />
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-24">
          <div className="space-y-8">
            <h4 className="font-serif font-bold text-2xl text-[#1A1A1A]">Navigation</h4>
            <div className="flex flex-col gap-5 text-gray-400 font-medium text-sm tracking-widest uppercase">
              {['about', 'timeline', 'gallery', 'wisdom'].map(item => (
                <button key={item} onClick={() => scrollTo(item === 'about' ? 'about' : item)} className="text-left uppercase tracking-widest transition-all">
                  {item === 'about' ? 'Legacy' : item}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-8">
             <h4 className="font-serif font-bold text-2xl text-[#1A1A1A]">Contact Family</h4>
             <div className="space-y-6 text-gray-500">
               <div className="flex items-center justify-center md:justify-start gap-4 transition-all">
                  <Phone className="w-6 h-6" /> <span className="text-lg">+1 (202) 555-0143</span>
               </div>
               <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-white shadow-md text-[#D4AF37] font-bold text-xs uppercase tracking-widest border border-gray-100">
                  <Calendar className="w-5 h-5" /> January 31st Milestone
               </div>
             </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto mt-32 pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold uppercase tracking-[0.5em] text-gray-400">
        <div>© 2024 CRAFTED WITH LOVE FOR DAD'S HAPPY BIRTHDAY</div>
        <div className="flex gap-12">
           <span className="cursor-default">Privacy</span>
           <span className="cursor-default">Terms</span>
           <span className="cursor-default">Archive</span>
        </div>
      </div>
    </footer>
  );
};

// --- Main App Component ---
function App() {
  return (
    <div className="min-h-screen selection:bg-[#D4AF37] selection:text-white relative">
      <Navbar />
      <main>
        <Hero />
        <Countdown />
        <LegacySection />
        <TimelineSection />
        <ImageCarousel />
        <WisdomCorner />
        
        {/* Full-Screen Cinematic Bridge */}
        <section className="relative h-[90vh] flex items-center justify-center bg-[#1A1A1A] overflow-hidden group">
          <div className="absolute inset-0 z-0">
             <img src="https://kelechieze.wordpress.com/wp-content/uploads/2026/01/dad8.jpeg" className="w-full h-full object-cover opacity-20 grayscale transition-transform duration-[20000ms] group-hover:scale-110" />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60"></div>
          </div>
          <div className="max-w-5xl mx-auto px-8 relative z-10 text-center space-y-12">
             <div className="text-[#D4AF37] font-black tracking-[1em] uppercase text-xs md:text-sm animate-pulse">Eternal Reflection</div>
             <h2 className="text-6xl md:text-[10rem] font-serif font-bold text-white leading-tight tracking-tighter">
               The <span className="gold-text italic">Best</span> <br />of Us.
             </h2>
             <p className="text-2xl md:text-4xl text-gray-300 font-serif font-light leading-relaxed italic max-w-3xl mx-auto">
               "A father's heart is a garden of love, growing more beautiful with every passing year of wisdom."
             </p>
             <button 
               onClick={() => { triggerCelestialDust(); document.getElementById('tributes')?.scrollIntoView({ behavior: 'smooth' }); }}
               className="inline-flex items-center gap-6 text-white font-bold uppercase tracking-[0.5em] text-[10px] hover:text-[#D4AF37] transition-all mt-10"
             >
               View the Guestbook <ArrowRight className="w-8 h-8" />
             </button>
          </div>
        </section>

        <Tributes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
