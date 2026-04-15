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
    quote: "ZERO LATENCY IN SERVICE. THE DIGITAL BRUTALIST INTERFACE IS NOT JUST AN AESTHETIC CHOICE—IT IS A FUNCTIONAL ADVANTAGE FOR HIGH-LOAD ENVIRONMENTS.",
    author: "SARAH CHEN",
    role: "SYSTEMS ARCHITECT",
    node: "STATION 12",
    rating: 5
  },
  {
    id: 3,
    quote: "FINALLY, A SPACE THAT TREATS COFFEE WITH THE SAME TECHNICAL RIGOR AS A KERNEL INITIALIZATION. THE ATMOSPHERIC CONTROLS ARE UNMATCHED.",
    author: "MARCUS REED",
    role: "BIO-HACKER",
    node: "NODE ALPHA",
    rating: 4
  }
];

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

  return (
    <section className={`py-40 px-6 md:px-20 transition-colors duration-700 ${isDark ? 'bg-[#0d0f0f]' : 'bg-[#fafaf5]'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
           <div className="w-12 h-[2px] bg-primary"></div>
           <span className="font-headline text-xs font-black tracking-[0.5em] uppercase text-primary">System 03 // Personnel Logs</span>
        </div>

        <div className="relative">
          {/* Main Card */}
          <div className={`relative border-4 transition-all duration-700 p-12 md:p-24 overflow-hidden ${
            isDark 
              ? 'bg-[#121414] border-zinc-900 shadow-[20px_20px_0px_0px_rgba(30,30,30,0.5)]' 
              : 'bg-white border-zinc-950 shadow-[20px_20px_0px_0px_rgba(184,207,136,0.2)]'
          }`}>
             
             {/* Rating Badge - Google Sync Ready */}
             <div className="absolute top-0 right-0 flex items-center gap-1 bg-primary px-6 py-4 shadow-xl z-20">
                <div className="flex gap-1">
                   {[...Array(5)].map((_, i) => (
                      <span 
                         key={i} 
                         className={`material-symbols-outlined text-sm font-bold ${
                            i < testimonials[currentIndex].rating ? 'text-zinc-950' : 'text-zinc-950/20'
                         }`}
                      >
                         star
                      </span>
                   ))}
                </div>
                <span className="font-headline text-[10px] font-black tracking-widest text-zinc-950 ml-2 border-l border-zinc-950/20 pl-4">5.0</span>
             </div>

             {/* Decorative Elements */}
             <div className="absolute top-10 right-10 p-4 opacity-5">
                <span className="font-headline text-9xl font-black italic">"</span>
             </div>

             <div className={`transition-all duration-500 transform ${isTransitioning ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'}`}>
                <h3 className={`font-headline text-3xl md:text-5xl font-black uppercase tracking-tight italic leading-tight mb-16 ${isDark ? 'text-white' : 'text-zinc-950'}`}>
                  {testimonials[currentIndex].quote}
                </h3>
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                   <div>
                      <div className="flex items-center gap-4 mb-4">
                         <div className="w-12 h-12 bg-primary rounded-none flex items-center justify-center">
                            <span className="material-symbols-outlined text-zinc-950 text-2xl font-bold">person</span>
                         </div>
                         <div>
                            <div className={`font-headline font-black text-xl uppercase tracking-tighter ${isDark ? 'text-white' : 'text-zinc-950'}`}>
                               {testimonials[currentIndex].author}
                            </div>
                            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                               {testimonials[currentIndex].role}
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="flex flex-col items-end">
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-2">Location Code</span>
                      <div className={`font-headline font-black text-2xl uppercase ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                         {testimonials[currentIndex].node}
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-start gap-px mt-10 bg-zinc-800 border-2 border-zinc-800 max-w-fit">
             <button 
                onClick={prevSlide}
                className={`w-20 h-20 flex items-center justify-center transition-all ${
                   isDark ? 'bg-zinc-950 text-white hover:bg-zinc-900' : 'bg-white text-zinc-950 hover:bg-zinc-50'
                } active:scale-95`}
             >
                <span className="material-symbols-outlined">chevron_left</span>
             </button>
             <button 
                onClick={nextSlide}
                className={`w-20 h-20 flex items-center justify-center transition-all ${
                   isDark ? 'bg-zinc-950 text-white hover:bg-zinc-900' : 'bg-white text-zinc-950 hover:bg-zinc-50'
                } active:scale-95`}
             >
                <span className="material-symbols-outlined">chevron_right</span>
             </button>
          </div>
          
          {/* Progress Indicators */}
          <div className="absolute -bottom-12 right-0 flex gap-4">
             {testimonials.map((_, i) => (
                <div 
                   key={i}
                   className={`h-2 transition-all duration-500 ${
                      i === currentIndex ? 'w-16 bg-primary' : 'w-4 bg-zinc-800'
                   }`}
                />
             ))}
          </div>
        </div>
      </div>
    </section>
  );
}
