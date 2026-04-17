import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';

const fallbackTestimonials = [
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
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await api.getReviews();
        // Only show approved reviews or fallbacks if empty
        const approved = data.filter(r => r.isApproved).map(r => ({
          id: r._id,
          quote: r.comment.toUpperCase(),
          author: r.name,
          role: "CITIZEN",
          node: "NODE L-V",
          rating: r.rating
        }));
        setReviews(approved.length > 0 ? approved : fallbackTestimonials);
      } catch (err) {
        console.error(err);
        setReviews(fallbackTestimonials);
      }
    };
    fetchReviews();
  }, []);

  useEffect(() => {
    if (reviews.length === 0) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, reviews]);

  const nextSlide = () => {
    if (reviews.length === 0) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
      setIsTransitioning(false);
    }, 500);
  };

  const prevSlide = () => {
    if (reviews.length === 0) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
      setIsTransitioning(false);
    }, 5000);
  };

  const TestimonialCard = ({ item, layout = 'single' }) => {
    if (!item) return null;
    return (
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
  };

  return (
    <section className={`py-40 px-6 md:px-20 transition-colors duration-700 overflow-hidden ${isDark ? 'bg-[#0d0f0f]' : 'bg-[#fafaf5]'}`}>
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex items-center gap-4">
           <div className="w-12 h-[2px] bg-primary"></div>
           <span className="font-headline text-xs font-black tracking-[0.5em] uppercase text-primary">System 03 // Personnel Logs</span>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-20 opacity-20 font-headline font-black uppercase text-xs tracking-widest">Initialising Personnel Data...</div>
      ) : (
        <>
          {/* MOBILE VIEW */}
          <div className="md:hidden max-w-7xl mx-auto relative">
            <TestimonialCard item={reviews[currentIndex]} />
            <div className="flex justify-start gap-px mt-10 bg-zinc-800 border-2 border-zinc-800 max-w-fit">
               <button onClick={prevSlide} className={`w-16 h-16 flex items-center justify-center transition-all ${isDark ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-950'} active:scale-95`}>
                  <span className="material-symbols-outlined">chevron_left</span>
               </button>
               <button onClick={nextSlide} className={`w-16 h-16 flex items-center justify-center transition-all ${isDark ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-950'} active:scale-95`}>
                  <span className="material-symbols-outlined">chevron_right</span>
               </button>
            </div>
          </div>

          {/* DESKTOP VIEW */}
          <div className="hidden md:block w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
            <div className="animate-marquee hover:pause flex gap-10 px-10">
              {[...reviews, ...reviews, ...reviews].map((item, idx) => (
                <TestimonialCard key={`${item.id}-${idx}`} item={item} layout="marquee" />
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
