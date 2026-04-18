import React, { useState, useEffect } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import TestimonialSlider from '../components/Testimonials';
import { ASSETS } from '../constants/assets';
import { api } from '../utils/api';

export default function Home() {
  const { isDark } = useOutletContext();
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const products = await api.getProducts();
        // Just take first 3 for the "LAB FILES" showcase
        setFeatured(products.slice(0, 3));
      } catch (err) {
        console.error("Home: Sync Failure", err);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className={`relative fade-in transition-colors duration-700 ${isDark ? 'bg-[#0d0f0f] text-[#fafaf5]' : 'bg-[#fafaf5] text-zinc-900'}`}>
      
      {/* Hero Section - Solid & Striking */}
      <section className={`min-h-[60vh] md:min-h-[90vh] flex flex-col justify-center px-6 md:px-20 relative overflow-hidden transition-colors duration-700 ${isDark ? 'bg-[#0d0f0f]' : 'bg-[#fafaf5]'}`}>
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `url(${ASSETS.HERO_BG})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}></div>
        <div className="absolute right-0 top-0 w-full md:w-1/2 h-full z-0">
          <img alt="Molecular Coffee Extraction" className={`w-full h-full object-cover transition-all duration-1000 ${isDark ? 'grayscale brightness-50' : 'grayscale brightness-90'}`} src={ASSETS.HOME.HERO_BG}/>
          <div className={`absolute inset-0 bg-gradient-to-r transition-colors duration-700 ${isDark ? 'from-[#0d0f0f] via-[#0d0f0f]/80' : 'from-[#fafaf5] via-[#fafaf5]/80'} to-transparent`}></div>
        </div>
        
        <div className="relative z-10 max-w-5xl">
          <div className="mb-6 inline-block py-1 border-b-2 border-primary">
            <span className="font-headline text-xs font-black tracking-[0.4em] uppercase text-primary">Protocol 042 // Activated</span>
          </div>
          <h1 className={`font-headline text-5xl sm:text-7xl md:text-[10rem] font-black tracking-[-0.05em] leading-[0.85] uppercase transition-colors duration-700 mb-8 ${isDark ? 'text-white' : 'text-zinc-950'}`}>
            BEYOND <br/><span className="text-primary italic">THE BREW</span>
          </h1>
          <p className={`text-xl md:text-2xl max-w-xl font-medium leading-relaxed transition-colors duration-700 ${isDark ? 'text-[#a0a09a]' : 'text-zinc-700'}`}>
            {ASSETS.BRAND_SLOGAN}
          </p>
          <div className="mt-12 flex flex-wrap gap-6">
            <Link to="/menu" className="group relative">
               <div className="absolute inset-0 bg-primary translate-x-1 translate-y-1 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
               <div className="relative bg-zinc-950 text-primary border-2 border-primary px-10 py-5 font-headline uppercase font-black tracking-widest text-sm">
                 Access Menu
               </div>
            </Link>
            <Link to="/reserve" className={`px-10 py-5 font-headline uppercase font-black tracking-widest text-sm border-2 transition-all duration-700 ${isDark ? 'border-zinc-800 text-white hover:bg-white hover:text-black' : 'border-zinc-200 text-black hover:bg-black hover:text-white'}`}>
              Book Station
            </Link>
          </div>
        </div>
      </section>

      {/* Methodology Section - Solid Blocks */}
      <section className={`py-16 md:py-32 px-6 md:px-20 transition-colors duration-700 ${isDark ? 'bg-[#121414]' : 'bg-white'}`}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-20 items-center">
          <div className="md:col-span-6">
            <h2 className={`font-headline text-4xl md:text-8xl font-black mb-8 leading-tight transition-colors duration-700 ${isDark ? 'text-white' : 'text-zinc-950'}`}>PRECISION <br/>METRICS</h2>
            <div className={`p-10 border-2 mb-8 transition-colors duration-700 ${isDark ? 'border-primary/20 bg-zinc-900/50' : 'border-zinc-100 bg-zinc-50'}`}>
               <p className={`text-lg leading-relaxed transition-colors duration-700 ${isDark ? 'text-[#a0a09a]' : 'text-zinc-600'}`}>
                Our proprietary extraction framework utilizes cold-fusion cavitation and sub-nanometer ceramic filtration to achieve unparalleled flavor density.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-px bg-zinc-800 border border-zinc-800">
               {[
                 { label: "Dose Delta", val: "±0.01g", id: "01" },
                 { label: "Thermal Range", val: "±0.1°C", id: "02" },
                 { label: "Pressure Flow", val: "9.2bar", id: "03" },
                 { label: "Extraction", val: "22.4%", id: "04" }
               ].map(stat => (
                 <div key={stat.id} className={`p-8 transition-colors duration-700 ${isDark ? 'bg-[#121414]' : 'bg-white'}`}>
                    <span className="text-[10px] font-black text-primary opacity-50 block mb-2">{stat.id} //</span>
                    <div className="text-3xl font-headline font-black mb-1">{stat.val}</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{stat.label}</div>
                 </div>
               ))}
            </div>
          </div>
          <div className="md:col-span-6">
            <div className={`aspect-[16/9] md:aspect-square overflow-hidden border-2 transition-all duration-700 ${isDark ? 'border-white/10' : 'border-black/10 shadow-2xl md:skew-y-1'}`}>
              <img alt="Laboratory Gear" className={`w-full h-full object-cover grayscale transition-all duration-1000 ${isDark ? 'contrast-125 brightness-75' : 'contrast-110'}`} src={ASSETS.HOME.LAB_GEAR}/>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section - Hard Edges */}
      <section className={`py-16 md:py-32 px-6 md:px-20 transition-colors duration-700 ${isDark ? 'bg-[#0d0f0f]' : 'bg-[#fafaf5]'}`}>
         <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 gap-8">
            <h2 className="font-headline text-5xl md:text-9xl font-black italic uppercase tracking-tighter">LAB <span className="text-primary not-italic">FILES</span></h2>
            <Link to="/menu" className="font-headline text-xs font-black tracking-[0.5em] uppercase hover:text-primary transition-colors border-b-4 border-primary pb-2">Full Archive {'->'} </Link>
         </div>
         
         <div className="flex md:grid md:grid-cols-3 gap-6 md:gap-12 overflow-x-auto md:overflow-hidden pb-8 md:pb-0 scrollbar-hide snap-x snap-mandatory">
            {featured.length > 0 ? featured.map((item, idx) => (
              <Link to={`/product/${item._id}`} key={item._id} className="min-w-[220px] md:min-w-full snap-start group cursor-pointer block active:scale-[0.98] transition-all">
                <div className={`aspect-square md:aspect-[4/5] overflow-hidden border-2 transition-all duration-700 relative mb-6 ${isDark ? 'border-zinc-800' : 'border-zinc-200 shadow-xl group-hover:shadow-primary/20'}`}>
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale-0 md:grayscale md:brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" />
                  <div className="absolute top-0 left-0 bg-primary text-on-primary font-headline text-[9px] font-black px-4 py-2 uppercase tracking-widest">
                    Protocol: {item.category}
                  </div>
                </div>
                <h3 className="font-headline text-xl md:text-2xl font-black uppercase tracking-tight group-hover:text-primary transition-colors">{item.name}</h3>
                <div className="w-8 h-1 bg-primary mt-3 group-hover:w-full transition-all duration-500"></div>
              </Link>
            )) : (
              <div className="col-span-3 text-center py-20 opacity-20 font-headline font-black uppercase tracking-widest">No Specimens Calibrated</div>
            )}
         </div>
      </section>

      {/* Testimonial Section - Dynamic Social Proof */}
      <TestimonialSlider isDark={isDark} />

      {/* CTA Lab - Solid Block Layout */}
      <section className={`py-20 md:py-40 px-6 md:px-20 transition-colors duration-700 ${isDark ? 'bg-[#121414]' : 'bg-white'}`}>
        <div className={`border-4 p-8 md:p-24 relative overflow-hidden transition-colors duration-700 ${isDark ? 'border-primary/20 bg-zinc-950/50' : 'border-zinc-950 bg-zinc-50 shadow-[20px_20px_0px_0px_rgba(184,207,136,1)]'}`}>
           <div className="absolute top-10 right-10 opacity-10 rotate-12 scale-150">
              <span className="material-symbols-outlined text-[300px] text-primary">{ASSETS.BRAND_ICON}</span>
           </div>
           <div className="relative z-10 max-w-2xl">
              <h2 className="font-headline text-4xl md:text-8xl font-black uppercase leading-none mb-8">INITIATE <br/>SUBCRIPTION</h2>
              <p className={`text-xl font-medium mb-12 transition-colors duration-700 ${isDark ? 'text-zinc-500' : 'text-zinc-600'}`}>
                Join 14,000+ alchemists receiving bi-weekly molecular updates and exclusive access to the Beta-Brew Lab.
              </p>
              <form className="flex flex-col md:flex-row gap-4">
                 <input 
                  type="email" 
                  placeholder="ID@NETWORK.IO" 
                  className={`bg-transparent border-b-4 p-4 font-headline font-black uppercase tracking-widest flex-1 focus:outline-none focus:border-primary transition-colors ${isDark ? 'border-zinc-800 text-white' : 'border-zinc-200 text-black'}`}
                 />
                 <button className="bg-primary text-on-primary font-headline font-black uppercase tracking-[0.3em] px-10 py-5 transition-transform active:scale-95 shadow-2xl">
                   Synchronize
                 </button>
              </form>
           </div>
        </div>
      </section>

    </div>
  );
}
