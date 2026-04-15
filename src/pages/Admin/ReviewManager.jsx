import React from 'react';

const samples = [
  { id: 1, author: "DR. ELIAS VANCE", rating: 5, quote: "THE PRECISION GAINS IN EXTRACTION CONSISTENCY ARE QUANTIFIABLE.", status: 'Approved' },
  { id: 2, author: "AGENT KELVIN", rating: 4, quote: "INITIAL SYNC WAS SUCCESSFUL, BUT ATMOSPHERIC VIBRATIONS WERE NOTED.", status: 'Pending' },
];

export default function ReviewManager({ isDark }) {
  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-12">
         <h3 className="font-headline font-black text-2xl uppercase tracking-tighter italic">Log <span className="text-primary not-italic">Moderation</span></h3>
      </div>

      <div className="space-y-6">
         {samples.map((log) => (
            <div key={log.id} className={`p-10 border-2 transition-all duration-500 ${isDark ? 'bg-zinc-950 border-zinc-900 shadow-[10px_10px_0px_0px_rgba(30,30,30,0.5)]' : 'bg-white border-zinc-200 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.05)]'}`}>
               <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-primary/20 flex items-center justify-center font-black rounded-full text-primary">
                        {log.author[0]}
                     </div>
                     <div>
                        <h4 className="font-headline font-black uppercase text-sm">{log.author}</h4>
                        <div className="flex gap-1 mt-1">
                           {[...Array(5)].map((_, i) => (
                              <span key={i} className={`material-symbols-outlined text-[10px] ${i < log.rating ? 'text-yellow-400' : 'text-zinc-800'}`}>star</span>
                           ))}
                        </div>
                     </div>
                  </div>
                  <span className={`px-4 py-1 text-[8px] font-black uppercase tracking-widest border ${log.status === 'Approved' ? 'border-primary text-primary' : 'border-yellow-500 text-yellow-500 animate-pulse'}`}>
                     {log.status}
                  </span>
               </div>

               <p className={`font-medium italic leading-relaxed mb-10 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  "{log.quote}"
               </p>

               <div className="flex gap-4 border-t border-zinc-900 pt-8">
                  {log.status === 'Pending' && (
                     <button className="px-6 py-2 bg-primary text-zinc-950 font-headline text-[9px] font-black uppercase tracking-widest hover:bg-white transition-all">
                        Approve Log
                     </button>
                  )}
                  <button className="px-6 py-2 border-2 border-zinc-800 text-zinc-500 font-headline text-[9px] font-black uppercase tracking-widest hover:text-red-500 hover:border-red-500 transition-all">
                     Delete Entry
                  </button>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
}
