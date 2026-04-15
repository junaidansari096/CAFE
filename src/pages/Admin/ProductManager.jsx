import React, { useState } from 'react';

// Sample data for initial UI build
const initialProducts = [
  { id: 1, title: "Neon Espresso", price: 6.50, protocol: "Sonic Wash", desc: "Sonic-aged beans extracted at 14 bars." },
  { id: 2, title: "Cryo-Brew", price: 8.00, protocol: "N2 Suspension", desc: "48-hour cold maceration. Sub-zero thermal state." },
];

export default function ProductManager({ isDark }) {
  const [products, setProducts] = useState(initialProducts);
  const [editingId, setEditingId] = useState(null);

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-12">
         <h3 className="font-headline font-black text-2xl uppercase tracking-tighter italic">Catalog <span className="text-primary not-italic">Sync</span></h3>
         <button className="px-8 py-3 bg-primary text-zinc-950 font-headline text-xs font-black uppercase tracking-widest hover:bg-white transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none">
            Register New Specimen
         </button>
      </div>

      <div className="grid grid-cols-1 gap-px bg-zinc-800 border-2 border-zinc-800">
         {products.map((item) => (
           <div key={item.id} className={`p-8 flex flex-col md:flex-row justify-between items-center gap-10 transition-colors ${isDark ? 'bg-zinc-950 hover:bg-zinc-900' : 'bg-white hover:bg-zinc-50'}`}>
              <div className="flex items-center gap-10 w-full">
                 <div className="w-24 h-24 bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-4xl text-zinc-700">image</span>
                 </div>
                 <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                       <h4 className="text-xl font-black font-headline uppercase">{item.title}</h4>
                       <span className="px-3 py-0.5 bg-primary/10 text-primary text-[9px] font-black uppercase tracking-widest border border-primary/20">{item.protocol}</span>
                    </div>
                    <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wide line-clamp-1">{item.desc}</p>
                 </div>
                 <div className="text-2xl font-black font-headline text-primary">${item.price.toFixed(2)}</div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                 <button className={`w-12 h-12 flex items-center justify-center border-2 transition-all ${isDark ? 'border-zinc-800 hover:border-primary text-zinc-500 hover:text-primary' : 'border-zinc-200 hover:border-black text-zinc-400 hover:text-black'}`}>
                    <span className="material-symbols-outlined">edit</span>
                 </button>
                 <button className="w-12 h-12 flex items-center justify-center border-2 border-zinc-800 hover:border-red-500 text-zinc-500 hover:text-red-500 transition-all">
                    <span className="material-symbols-outlined">delete_forever</span>
                 </button>
              </div>
           </div>
         ))}
      </div>

      {/* Editor Modal Simulation */}
      <div className="mt-20 p-12 bg-zinc-950 border-2 border-primary/20 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
         <h4 className="font-headline font-black text-lg uppercase tracking-widest mb-10 italic">Modify <span className="text-primary not-italic">Parameters</span></h4>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
               <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 block mb-3">Specimen Name</label>
                  <input type="text" className="w-full bg-zinc-900 border-2 border-zinc-800 p-4 font-headline font-black text-sm uppercase tracking-widest focus:border-primary outline-none transition-all" defaultValue="Neon Espresso" />
               </div>
               <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 block mb-3">Extraction Protocol</label>
                  <input type="text" className="w-full bg-zinc-900 border-2 border-zinc-800 p-4 font-headline font-black text-sm uppercase tracking-widest focus:border-primary outline-none transition-all" defaultValue="Sonic Wash" />
               </div>
               <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 block mb-3">Base Value ($)</label>
                  <input type="number" className="w-full bg-zinc-900 border-2 border-zinc-800 p-4 font-headline font-black text-sm uppercase tracking-widest focus:border-primary outline-none transition-all" defaultValue="6.50" />
               </div>
            </div>

            <div className="space-y-6">
               <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 block mb-3">Protocol Description</label>
                  <textarea className="w-full bg-zinc-900 border-2 border-zinc-800 p-4 font-headline font-black text-sm uppercase tracking-widest focus:border-primary outline-none transition-all h-[132px] resize-none" defaultValue="Sonic-aged beans extracted at 14 bars of pressure. Carbon-filtered result." />
               </div>
               <div className="flex gap-4">
                  <button className="flex-1 py-4 bg-primary text-zinc-950 font-headline text-xs font-black uppercase tracking-[0.3em] hover:bg-white transition-all">
                     Update Matrix
                  </button>
                  <button className="px-8 py-4 border-2 border-zinc-800 text-zinc-500 font-headline text-xs font-black uppercase tracking-[0.3em] hover:text-white hover:border-zinc-700 transition-all">
                     Reset
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
