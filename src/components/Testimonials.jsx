import React, { useState, useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    quote: "THE PRECISION GAINS IN EXTRACTION CONSISTENCY SINCE SYNCHRONIZING WITH FUTURE BREW ARE QUANTIFIABLE. A SUPERIOR SYSTEM FOR THE MODERN BREW SCIENTIST.",
    author: "DR. ELIAS VANCE",
    role: "CYBERNETIC BARISTA",
    node: "STATION 04",
    rating: 5
  },
  {
    id: 2,
    quote: "INITIAL SYNC WAS SUCCESSFUL, BUT ATMOSPHERIC VIBRATIONS IN THE DUO STATION WERE SLIGHTLY HIGHER THAN PARAMETERS ALLOW. EXTRACTION QUALITY REMAINS HIGH.",
    author: "AGENT KELVIN",
    role: "FIELD RESEARCHER",
    node: "STATION 12",
    rating: 4
  },
  {
    id: 3,
    quote: "RESERVING THE COLLECTIVE WAS EFFICIENT, BUT THE THERMAL DRIFT IN THE SECONDARY RADIATOR WAS NOTED. SYSTEM REBOOT RESOLVED THE LATENCY.",
    author: "MARCUS REED",
    role: "BIO-HACKER",
    node: "NODE ALPHA",
    rating: 2
  },
  {
    id: 4,
    quote: "TOTAL ARCHITECTURAL PRECISION. THE BREW LAB IS THE ONLY SPACE WHERE I CAN MAINTAIN FLOW STATE WHILE CONSUMING 9.2 BAR EXTRACTIONS.",
    author: "SARAH CHEN",
    role: "SYSTEMS ARCHITECT",
    node: "HUB 01",
    rating: 5
  },
  {
    id: 5,
    quote: "THE NITRO OAK PROTOCOL IS THE MOST ADVANCED FLAVOR PROFILE I HAVE EVER DEPLOYED. REQUESTING UNLIMITED ACCESS TO THE BETA-BREW QUEUE.",
    author: "LT. MILLER",
    role: "DATA ANALYST",
    node: "STATION 09",
    rating: 5
  }
];

const RatingStars = ({ rating, isDark }) => (
  <div className="flex items-center gap-1">
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <span 
          key={i} 
          className={`material-symbols-outlined text-xs font-bold ${
            i < rating ? 'text-yellow-400' : 'text-zinc-600'
          }`}
          style={{ fontVariationSettings: i < rating ? "'FILL' 1" : "'FILL' 0" }}
        >
          star
        </span>
      ))}
    </div>
    <span className={`font-headline text-[10px] font-black tracking-widest ml-2 border-l pl-4 ${isDark ? 'text-zinc-400 border-zinc-800' : 'text-zinc-600 border-zinc-200'}`}>
      {rating}.0
    </span>
  </div>
);

export default function TestimonialSlider({ isDark }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setIsTransitioning(false);
    }, 500);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setIsTransitioning(false);
    }, 500);
  };

  const TestimonialCard = ({ item, layout = 'single' }) => (
    <div className={`relative border-2 transition-all duration-700 overflow-hidden ${
      isDark 
        ? 'bg-[#121414] border-zinc-900 shadow-[10px_10px_0px_0px_rgba(30,30,30,0.5)]' 
        : 'bg-white border-zinc-950 shadow-[10px_10px_0px_0px_rgba(184,207,136,0.1)]'
    } ${layout === 'single' ? 'p-12 md:p-24 pt-32' : 'p-10 pt-20 w-[450px] flex-shrink-0'}`}>
      
      <div className="absolute top-8 right-8 z-20">
        <RatingStars rating={item.rating} isDark={isDark} />
      </div>

      <div className="absolute top-10 right-10 p-4 opacity-5">
        <span className="font-headline text-8xl font-black italic">"</span>
      </div>

      <div className={layout === 'single' ? `transition-all duration-500 transform ${isTransitioning ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'}` : ''}>
        <h3 className={`font-headline font-black uppercase tracking-tight italic leading-tight mb-12 ${
          layout === 'single' ? 'text-3xl md:text-5xl' : 'text-xl'
        } ${isDark ? 'text-white' : 'text-zinc-950'}`}>
          {item.quote}
        </h3>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-zinc-950 text-xl font-bold">person</span>
            </div>
            <div>
              <div className={`font-headline font-black text-lg uppercase tracking-tighter ${isDark ? 'text-white' : 'text-zinc-950'}`}>
                {item.author}
              </div>
              <div className="text-[9px] font-black uppercase tracking-[0.3em] text-primary">
                {item.role}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-[8px] font-black uppercase tracking-[0.4em] opacity-40 mb-1">Node</span>
            <div className={`font-headline font-black text-xl uppercase ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              {item.node}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className={`py-40 px-6 md:px-20 transition-colors duration-700 overflow-hidden ${isDark ? 'bg-[#0d0f0f]' : 'bg-[#fafaf5]'}`}>
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex items-center gap-4">
           <div className="w-12 h-[2px] bg-primary"></div>
           <span className="font-headline text-xs font-black tracking-[0.5em] uppercase text-primary">System 03 // Personnel Logs</span>
        </div>
      </div>

      {/* MOBILE VIEW: Single Card Slider */}
      <div className="md:hidden max-w-7xl mx-auto relative">
        <TestimonialCard item={testimonials[currentIndex]} />
        
        <div className="flex justify-start gap-px mt-10 bg-zinc-800 border-2 border-zinc-800 max-w-fit">
           <button onClick={prevSlide} className={`w-16 h-16 flex items-center justify-center transition-all ${isDark ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-950'} active:scale-95`}>
              <span className="material-symbols-outlined">chevron_left</span>
           </button>
           <button onClick={nextSlide} className={`w-16 h-16 flex items-center justify-center transition-all ${isDark ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-950'} active:scale-95`}>
              <span className="material-symbols-outlined">chevron_right</span>
           </button>
        </div>
      </div>

      {/* DESKTOP VIEW: Continuous Smooth Slider */}
      <div className="hidden md:block w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <div className="animate-marquee hover:pause flex gap-10 px-10">
          {[...testimonials, ...testimonials].map((item, idx) => (
            <TestimonialCard key={`${item.id}-${idx}`} item={item} layout="marquee" />
          ))}
        </div>
      </div>
    </section>
  );
}
