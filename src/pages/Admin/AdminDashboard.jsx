import React from 'react';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Extractions', value: '4,291', trend: '+12%', icon: 'coffee' },
    { label: 'Active Reservations', value: '18', trend: 'P-High', icon: 'book_online' },
    { label: 'System Uptime', value: '99.9%', trend: 'Stable', icon: 'speed' },
    { label: 'Log Velocity', value: '0.4s', trend: 'Sub-Zero', icon: 'bolt' },
  ];

  return (
    <div className="fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {stats.map((stat, i) => (
          <div key={i} className="bg-zinc-950 border-2 border-zinc-900 p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.5)] group hover:border-primary transition-all duration-500">
             <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary transition-colors duration-500">
                   <span className="material-symbols-outlined text-primary group-hover:text-zinc-950 font-bold">{stat.icon}</span>
                </div>
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">{stat.trend}</span>
             </div>
             <div className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-2">{stat.label}</div>
             <div className="text-4xl font-black font-headline uppercase italic">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         {/* Live Reservation Feed */}
         <div className="lg:col-span-2 bg-zinc-950 border-2 border-zinc-900 p-10">
            <h3 className="font-headline font-black text-xl uppercase tracking-tighter mb-8 italic">Incoming <span className="text-primary not-italic">Syncs</span></h3>
            
            <div className="space-y-4">
               {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between p-6 border-b border-zinc-900 hover:bg-zinc-900/50 transition-colors">
                     <div className="flex items-center gap-6">
                        <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 flex items-center justify-center font-black text-xs text-primary italic">0{i}</div>
                        <div>
                           <div className="font-black font-headline uppercase text-sm">Node Selection: {i === 1 ? 'Collective' : 'Solo Alcove'}</div>
                           <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">TS: 2026-04-16T00:54:32Z</div>
                        </div>
                     </div>
                     <button className="px-4 py-2 border border-primary/40 text-primary font-headline text-[9px] font-black uppercase tracking-widest hover:bg-primary hover:text-zinc-950 transition-all">
                        Validate
                     </button>
                  </div>
               ))}
            </div>
         </div>

         {/* System Diagnostics */}
         <div className="bg-primary/5 border-2 border-primary/20 p-10">
            <h3 className="font-headline font-black text-lg uppercase tracking-tight mb-8 italic">Diagnostics</h3>
            <div className="space-y-8">
               <div>
                  <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                     <span>Node Alpha Load</span>
                     <span>82%</span>
                  </div>
                  <div className="h-1 bg-zinc-900">
                     <div className="h-full bg-primary w-[82%]" />
                  </div>
               </div>
               <div>
                  <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                     <span>Extraction Capacity</span>
                     <span>94%</span>
                  </div>
                  <div className="h-1 bg-zinc-900">
                     <div className="h-full bg-primary w-[94%]" />
                  </div>
               </div>
               <div>
                  <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                     <span>Sync Latency</span>
                     <span>04%</span>
                  </div>
                  <div className="h-1 bg-zinc-900">
                     <div className="h-full bg-primary w-[4%]" />
                  </div>
               </div>
            </div>

            <div className="mt-12 p-6 bg-zinc-950 border border-zinc-900">
               <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-sm text-primary">warning</span>
                  <span className="text-[9px] font-black uppercase tracking-widest">System Alert</span>
               </div>
               <p className="text-[10px] font-medium text-zinc-500 leading-relaxed uppercase">
                  Station 12 reported minor thermal drift in secondary radiator. Automated recalibration triggered.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
