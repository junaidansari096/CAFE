import React from 'react';
import { useOutletContext } from 'react-router-dom';

export default function Privacy() {
  const { isDark } = useOutletContext();

  const policies = [
    {
      label: "DATA COLLECTION",
      title: "Biometric Signatures",
      text: "We record your pulse rate and pupil dilation upon first sip to optimize nitrogen infusion levels in future orders. All data is encrypted using quantum-resistant algorithms."
    },
    {
      label: "STORAGE",
      title: "The Archive",
      text: "Client taste profiles are stored off-world in the Mars Data Nexus. This ensures that even in the event of planetary upheaval, your preference for light-roasted Geisha beans remains secure."
    },
    {
      label: "SHARING",
      title: "Zero Leakage Policy",
      text: "We do not sell your data to mega-corporations. We only share extraction stats with the Global Brewers Council for the betterment of human civilization."
    }
  ];

  return (
    <div className={`relative fade-in min-h-screen px-6 md:px-20 py-24 transition-colors duration-700 ${isDark ? 'bg-[#121414] text-[#fafaf5]' : 'bg-[#fafaf5] text-zinc-900'}`}>
      <div className="max-w-4xl mx-auto">
        <span className="font-headline text-[10px] font-bold tracking-[0.2em] uppercase text-primary mb-2 block">SECURE PROTOCOL</span>
        <h2 className="font-headline text-5xl md:text-7xl font-bold tracking-tight uppercase mb-12">Privacy <span className="text-primary italic">Directive</span></h2>
        
        <div className="space-y-12">
          {policies.map((p, i) => (
            <div key={i} className={`p-8 rounded-3xl border group transition-all duration-700 ${isDark ? 'bg-[#1a1c19] border-white/5' : 'bg-[#f4f4f0] border-black/5'}`}>
              <span className="text-[10px] font-black tracking-widest text-primary border-b border-primary/30 pb-1 mb-6 inline-block uppercase">
                {p.label}
              </span>
              <h3 className="font-headline text-2xl font-bold mb-3 uppercase tracking-tight">{p.title}</h3>
              <p className={`text-lg transition-colors duration-700 ${isDark ? 'text-[#6b6b65]' : 'text-zinc-500'}`}>{p.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center justify-center p-12 text-center border-t border-primary/20">
          <span className="material-symbols-outlined text-primary text-5xl mb-6">verified_user</span>
          <p className="font-headline text-xs font-bold tracking-[0.4em] uppercase opacity-30">Your digital twin is safe with us.</p>
        </div>
      </div>
    </div>
  );
}
