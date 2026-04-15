import React from 'react';
import { useOutletContext } from 'react-router-dom';

export default function Terms() {
  const { isDark } = useOutletContext();

  const sections = [
    {
      title: "01. Molecular Integrity",
      content: "Future Brew operates on the principle of absolute molecular precision. Any substance consumed within our premises is subject to the Laws of Crystallography. Customers agree not to tamper with the sub-atomic structure of their beverages using third-party filtration devices."
    },
    {
      title: "02. Neural Responsibility",
      content: "While our hyper-caffeinated blends are designed for peak cognitive performance, users are responsible for managing their own neural bandwidth. Future Brew is not liable for involuntary astral projection or sudden realizations of universal truths occurring post-espresso."
    },
    {
      title: "03. Data Extraction",
      content: "By entering our labs, you agree to biometric optimization. Your preference for medium-roast beans will be stored in the Global Coffee Nexus for the purpose of pre-calculating your future cravings."
    },
    {
      title: "04. Termination Protocol",
      content: "We reserve the right to revoke lab access to anyone who uses instant coffee within a 5.0km radius of our brewing vats. Such violations constitute a critical breach of aesthetic law."
    }
  ];

  return (
    <div className={`relative fade-in min-h-screen px-6 md:px-20 py-12 transition-colors duration-700 ${isDark ? 'bg-[#121414] text-[#fafaf5]' : 'bg-[#fafaf5] text-zinc-900'}`}>
      
      {/* Header */}
      <section className="mb-20">
        <span className="font-headline text-[10px] font-bold tracking-[0.2em] uppercase text-primary mb-2 block">LEGAL FRAMEWORK V2.4</span>
        <h2 className="font-headline text-5xl md:text-8xl font-bold tracking-tight uppercase leading-none">Terms of <br/><span className="text-primary italic">Operation</span></h2>
        <div className="w-full h-px bg-primary/20 mt-12"></div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <aside className="lg:col-span-4 translate-y-4">
          <div className={`p-6 rounded-2xl border sticky top-24 transition-all duration-700 ${isDark ? 'bg-[#1a1c19] border-white/5' : 'bg-[#f4f4f0] border-black/5'}`}>
            <h4 className="font-headline text-xs font-black tracking-widest uppercase mb-4 text-primary">Quick Navigation</h4>
            <ul className="space-y-4">
              {sections.map((s, i) => (
                <li key={i} className={`text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:text-primary transition-colors ${isDark ? 'text-zinc-600' : 'text-zinc-400'}`}>
                  {s.title}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="lg:col-span-8 space-y-16">
          {sections.map((section, idx) => (
            <div key={idx} className="group">
              <h3 className="font-headline text-2xl font-bold mb-4 uppercase flex items-center gap-3">
                <span className="text-primary text-[10px] font-black border border-primary px-2 py-0.5 rounded">ITEM</span>
                {section.title}
              </h3>
              <p className={`text-lg leading-relaxed font-light transition-colors duration-700 ${isDark ? 'text-[#6b6b65]' : 'text-zinc-500'}`}>
                {section.content}
              </p>
            </div>
          ))}

          <div className={`mt-20 p-10 rounded-3xl border-2 border-dashed transition-all duration-700 ${isDark ? 'border-primary/20 bg-primary/5' : 'border-primary/30 bg-primary/[0.02]'}`}>
            <h4 className="font-headline text-xl font-bold mb-4 uppercase">Final Declaration</h4>
            <p className="text-sm opacity-70 mb-8 font-medium italic">
              "In the pursuit of the perfect brew, we sacrifice all commonalities for the sake of the extraordinary."
            </p>
            <p className="text-[10px] font-black tracking-[0.3em] uppercase opacity-40">
              End of Transmission • Last Updated: April 2045
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
