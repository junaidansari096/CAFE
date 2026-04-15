import React from 'react';
import { useOutletContext } from 'react-router-dom';

export default function Profile() {
  const { isDark } = useOutletContext();

  return (
    <div className={`relative fade-in min-h-screen px-6 md:px-20 py-24 transition-colors duration-700 ${isDark ? 'bg-[#0d0f0f] text-[#fafaf5]' : 'bg-[#fafaf5] text-zinc-900'}`}>

      {/* Profile ID Header */}
      <section className="mb-24">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-8">
           <div className="text-left">
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-12 h-[2px] bg-primary"></div>
                 <span className="font-headline text-xs font-black tracking-[0.5em] uppercase text-primary">ID ENTITY // AUTHENTICATED</span>
              </div>
              <h2 className="font-headline text-6xl md:text-[8rem] font-black tracking-tighter uppercase italic leading-[0.85]">
                JULIAN <span className="text-primary not-italic">VANE</span>
              </h2>
           </div>
           <div className={`p-6 border-2 flex items-center gap-4 transition-all ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200 shadow-xl'}`}>
              <div className="w-4 h-4 bg-primary animate-ping"></div>
              <span className="font-headline text-xs font-black tracking-widest uppercase">System status: Optimizing</span>
           </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-zinc-800 border-2 border-zinc-800">
        
        {/* Biometric Card - Solid */}
        <div className={`md:col-span-8 p-12 relative flex flex-col justify-between transition-all ${isDark ? 'bg-[#0d0f0f]' : 'bg-white'}`}>
           <div className="flex justify-between items-start mb-20">
              <div className="space-y-2">
                 <p className="font-headline text-[10px] font-black tracking-[0.4em] text-primary uppercase">Assigned Node</p>
                 <p className="text-2xl font-black uppercase">Alpha-Delta-9</p>
              </div>
              <div className="bg-primary text-on-primary px-6 py-2 font-headline font-black text-[10px] tracking-widest uppercase">
                 Rank: Elite
              </div>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              {[
                { label: "Transmissions", value: "142" },
                { label: "XP Balance", value: "4,200" },
                { label: "Pulse Rate", value: "72 BPM" },
                { label: "Member Since", value: "2042" }
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-2">{stat.label}</p>
                  <p className="font-headline text-4xl font-black">{stat.value}</p>
                </div>
              ))}
           </div>
        </div>

        {/* Real-time Telemetry - Solid */}
        <div className={`md:col-span-4 p-12 flex flex-col justify-between transition-all ${isDark ? 'bg-zinc-950' : 'bg-zinc-50'}`}>
           <div className="space-y-4">
              <span className="material-symbols-outlined text-primary text-5xl">biotech</span>
              <h4 className="font-headline text-2xl font-black uppercase">Live Extraction</h4>
              <p className="text-sm font-medium text-zinc-500 leading-relaxed italic">"Molecular Roast #042 is synchronized. Ionization phase 4 is active."</p>
           </div>
           <div className="mt-12">
              <div className={`w-full h-8 border-2 transition-all ${isDark ? 'bg-black border-zinc-800' : 'bg-white border-zinc-200'}`}>
                 <div className="bg-primary h-full transition-all duration-1000" style={{width: '75%'}}></div>
              </div>
              <div className="flex justify-between items-baseline mt-4">
                 <span className="font-headline text-xl font-black text-primary italic">75% SYNC</span>
                 <span className="text-[10px] font-black uppercase tracking-widest opacity-50">2:14 REMAINING</span>
              </div>
           </div>
        </div>

        {/* System Controls - Grid of Solid Buttons */}
        <div className={`md:col-span-12 p-12 transition-all ${isDark ? 'bg-[#0d0f0f]' : 'bg-white'}`}>
           <h3 className="font-headline text-2xl font-black uppercase mb-12 flex items-center gap-4">
             <div className="w-8 h-8 bg-primary rounded-full"></div>
             CONTROL PANEL
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { icon: 'fingerprint', label: 'Biometrics', sub: 'Status: Secure' },
                { icon: 'notifications', label: 'Comm-Links', sub: 'Status: Active' },
                { icon: 'payments', label: 'Ledger', sub: 'Status: Optimized' },
                { icon: 'logout', label: 'Terminate', sub: 'Status: Available' }
              ].map((tool) => (
                <button key={tool.label} className={`border-2 p-8 text-left transition-all group ${isDark ? 'bg-zinc-950 border-zinc-900 hover:border-primary' : 'bg-zinc-50 border-zinc-100 shadow-sm hover:shadow-xl hover:border-zinc-950'}`}>
                  <span className="material-symbols-outlined text-primary text-3xl mb-4 transition-transform group-hover:scale-110">{tool.icon}</span>
                  <div className="font-headline text-xs font-black uppercase tracking-widest mb-1">{tool.label}</div>
                  <div className="text-[10px] font-bold text-zinc-500">{tool.sub}</div>
                </button>
              ))}
           </div>
        </div>
      </div>

    </div>
  );
}
