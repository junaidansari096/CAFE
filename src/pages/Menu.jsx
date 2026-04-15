import React from 'react';
import { useOutletContext } from 'react-router-dom';

export default function Menu() {
  const { isDark } = useOutletContext();

  return (
    <div className={`relative fade-in min-h-screen px-6 md:px-20 py-24 transition-colors duration-700 ${isDark ? 'bg-[#0d0f0f] text-[#fafaf5]' : 'bg-[#fafaf5] text-zinc-900'}`}>

      <section className="mb-24">
        <div className="flex items-center gap-4 mb-8">
           <div className="w-12 h-[2px] bg-primary"></div>
           <span className="font-headline text-xs font-black tracking-[0.5em] uppercase text-primary">Protocol Catalog // Ver 4.0</span>
        </div>
        <h2 className="text-6xl md:text-[8rem] font-black font-headline tracking-tighter mb-8 leading-[0.85] uppercase italic">
          THE <span className="text-primary not-italic">COLLECTION</span>
        </h2>
        <p className={`max-w-2xl text-xl font-medium leading-relaxed transition-colors duration-700 ${isDark ? 'text-[#a0a09a]' : 'text-zinc-600'}`}>
          A curated sequence of molecular extractions. Each entry is a peer-reviewed catalyst for sensory elevation.
        </p>
      </section>

      {/* Solid Sticky Nav - No Blurs */}
      <nav className={`sticky top-20 z-40 mb-20 py-6 border-y-2 flex justify-start md:justify-center overflow-x-auto transition-all duration-700 ${isDark ? 'bg-[#0d0f0f] border-zinc-800' : 'bg-[#fafaf5] border-zinc-200 shadow-sm'}`}>
        <div className="flex items-center gap-12 px-6">
          {['Coffee', 'Tea', 'Pastries', 'Specials', 'Apparatus'].map((cat, i) => (
            <a key={cat} className={`font-headline font-black text-xs tracking-[0.3em] uppercase transition-colors duration-700 whitespace-nowrap ${i === 0 ? 'text-primary' : 'text-zinc-500 hover:text-primary'}`} href="#">
              {cat}
            </a>
          ))}
        </div>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-800 border-2 border-zinc-800">
        {[
          { 
            title: "Neon Espresso", price: "$6.50", 
            tag: "Protocol: Sonic Wash", 
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD59DepxNslf3bc--zJ-QCVFZepElWRydgzzqGTE3H_P2gYp0JnZJaFpcr0Ujk3V0t10Aeww1OB0sFxmQ6mDKVQkNQvRTTmSaIAtVY7ltV_sq5HUJqSopDYg5J0UOm5lACtMiKtQ2abTh0LklrZmpNIl4V8EGjIDXJGwV_dUoU6vFLmDhXR1u4MoaMjxSJYrnX5gOa4YwotwGZCqStCPVeKdTbvp3Ul9rj8UoGE8dL3Meozfg30r9giDx0uHt5olZDLlOCUohLlg4I",
            desc: "Sonic-aged beans extracted at 14 bars of pressure. Carbon-filtered result."
          },
          { 
            title: "Cryo-Brew", price: "$8.00", 
            tag: "Protocol: N2 Suspension", 
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZkU24TVKKcWj1oCYWXvUslykTydsiZs4TKjCCuInR8YJ05MwUoW5vuVbYKVkLagudNOM2ioRaq-wB-exRTfyaleNvYHqTDvVeiVVsWTTmM04KEG4EL5RYD5B5w61AeKZuqlqB9zYxO_B9sH3gprBB6_B6cRyz9jbW1yL6guxCERnYQ9UWiWR7KZlcuHWEf66a6TYtd0p2G1muwQLzt60TMWfK8b6YUNaS8wOrIt1Kwm_td_vBUZO0CtDymC8EkbxF_QqRhbIQ7Eg",
            desc: "48-hour cold maceration. Sub-zero thermal state."
          },
          { 
            title: "Quantum Latte", price: "$7.25", 
            tag: "Protocol: Thermal Shear", 
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBR_QUCPJm0rBH6QkOKauZ-ZeJUpvDG-jm_5LBS3iBakmqtV5vUz-Jlgs_ZnF_XlbWmJzMZRCddTiqkQ8vhrmpBJoJViwbNp-DWgKkd0Zc4ZMcrQE7YblYJXR_d1JyP937D8QjFepsXEEaRA1k4YrtSqX-V4d_mFtaa0n_Au_efXnDXjCvhL-Mvj0loEgONfOfb6gSyUtKyhIoFHeSfQ_LRRPRHC0wiMeIVBkr4FmkJZajkqv61JoXrl_uq63yS9dv_qkIv_DoBQoQ",
            desc: "Dual-state beverage featuring a high-thermal core and chilled mantle."
          },
          { 
            title: "Olive Extract", price: "$9.50", 
            tag: "Protocol: Reservoir Flow", 
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqzz_6dcKwm6uwimy-oL8yGe4JmhNqpv3Kl0Ybieg9oAO3takAs8zRMDbYAhN8Gk3W2ez0jpYqAz0A4eYHUHQJXI2lJ08lh6nJINeAa1LISiGkho0igpADz4-kNaWJd8tq7pr9inAtAQJyczMMXb5UUTD-wOSl513e2U6hnZ_WwC3ePDSo6dCme9Ti_hBbJ0JByfFTBYwMBq7Uq5UJFGVO42-dvhhbvFtNuIgxBth7je74kYB0jjRS_yOLGaiT8ALZfzOsLFKecUs",
            desc: "Single-origin Ethiopian Yirgacheffe. Saline-optimized water catalyst."
          }
        ].map((item, idx) => (
          <div key={idx} className={`p-10 md:p-16 group transition-all duration-700 ${isDark ? 'bg-[#0d0f0f] hover:bg-zinc-900' : 'bg-white hover:bg-zinc-50'}`}>
            <div className="flex flex-col md:flex-row gap-10 items-center">
               <div className={`w-full md:w-1/2 aspect-square overflow-hidden border-2 transition-all duration-700 ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
                  <img className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" src={item.img} alt={item.title} />
               </div>
               <div className="w-full md:w-1/2">
                  <span className="text-primary font-headline text-[10px] font-black tracking-widest uppercase mb-4 block">{item.tag}</span>
                  <div className="flex justify-between items-baseline mb-4">
                    <h3 className="text-4xl font-black font-headline uppercase tracking-tighter">{item.title}</h3>
                    <span className="text-xl font-bold text-primary font-headline">{item.price}</span>
                  </div>
                  <p className={`text-lg font-medium mb-8 leading-snug transition-colors duration-700 ${isDark ? 'text-zinc-500' : 'text-zinc-600'}`}>
                    {item.desc}
                  </p>
                  <button className={`w-full py-4 border-2 font-headline text-xs font-black tracking-[0.3em] uppercase transition-all duration-500 ${isDark ? 'border-zinc-800 text-white hover:bg-white hover:text-black' : 'border-black text-black hover:bg-black hover:text-white'}`}>
                    Initiate Extraction
                  </button>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Efficiency Report - Redesigned to be Solid */}
      <div className="mt-40 border-t-4 border-primary pt-12">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
               <h4 className="font-headline font-black text-xs tracking-[0.4em] uppercase text-primary mb-6">Efficiency Report</h4>
               <p className="font-medium text-zinc-500">Every brew is tracked in real-time. We maintain a 99.8% precision rate across 4 global nodes.</p>
            </div>
            <div className={`p-8 border-2 ${isDark ? 'bg-zinc-950 border-zinc-900 shadow-[10px_10px_0px_0px_rgba(18,20,20,1)]' : 'bg-white border-zinc-200 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.05)]'}`}>
               <span className="text-[10px] font-black font-headline uppercase text-zinc-500 block mb-2">Node Latency</span>
               <div className="text-5xl font-black font-headline text-primary">0.04ms</div>
            </div>
            <div className={`p-8 border-2 ${isDark ? 'bg-zinc-950 border-zinc-900 shadow-[10px_10px_0px_0px_rgba(18,20,20,1)]' : 'bg-white border-zinc-200 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.05)]'}`}>
               <span className="text-[10px] font-black font-headline uppercase text-zinc-500 block mb-2">Extraction Yield</span>
               <div className="text-5xl font-black font-headline text-primary">22.4%</div>
            </div>
         </div>
      </div>

    </div>
  );
}
