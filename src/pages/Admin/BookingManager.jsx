import React from 'react';

const reservations = [
  { id: 1, email: "vance@blackmesa.com", node: "Solo Alcove", personnel: 1, dateTime: "2026-04-16T09:00:00Z", status: "Confirmed" },
  { id: 2, email: "chen@nexus.io", node: "Collective", personnel: 4, dateTime: "2026-04-16T14:30:00Z", status: "Syncing" },
];

export default function BookingManager({ isDark }) {
  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-12">
         <h3 className="font-headline text-2xl font-black uppercase tracking-tighter italic">Reservation <span className="text-primary not-italic">Matrix</span></h3>
      </div>

      <div className={`border-2 overflow-hidden ${isDark ? 'bg-zinc-950 border-zinc-900 shadow-[15px_15px_0px_0px_rgba(0,0,0,1)]' : 'bg-white border-zinc-200 shadow-xl'}`}>
         <table className="w-full text-left border-collapse">
            <thead className={`border-b-2 ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
               <tr>
                  {['Identifier', 'Node', 'Personnel', 'Sync Time', 'Status', 'Actions'].map((h) => (
                     <th key={h} className="p-6 font-headline text-[10px] font-black uppercase tracking-widest text-zinc-500">{h}</th>
                  ))}
               </tr>
            </thead>
            <tbody>
               {reservations.map((res) => (
                  <tr key={res.id} className={`border-b border-zinc-900/50 transition-colors ${isDark ? 'hover:bg-zinc-900/40' : 'hover:bg-zinc-50/50'}`}>
                     <td className="p-6 font-medium text-xs truncate max-w-[150px]">{res.email}</td>
                     <td className="p-6">
                        <span className="font-headline font-black text-[10px] uppercase tracking-wider">{res.node}</span>
                     </td>
                     <td className="p-6 font-black font-headline text-primary italic">0{res.personnel}</td>
                     <td className="p-6 font-medium text-[10px] uppercase text-zinc-500">{new Date(res.dateTime).toLocaleString()}</td>
                     <td className="p-6">
                        <span className={`px-4 py-1 text-[8px] font-black uppercase tracking-widest border ${res.status === 'Confirmed' ? 'border-primary text-primary' : 'border-yellow-500 text-yellow-500 animate-pulse'}`}>
                           {res.status}
                        </span>
                     </td>
                     <td className="p-6">
                        <div className="flex gap-2">
                           <button className="w-8 h-8 flex items-center justify-center border-2 border-zinc-800 hover:border-primary text-zinc-500 hover:text-primary transition-all">
                              <span className="material-symbols-outlined text-sm">check</span>
                           </button>
                           <button className="w-8 h-8 flex items-center justify-center border-2 border-zinc-800 hover:border-red-500 text-zinc-500 hover:text-red-500 transition-all">
                              <span className="material-symbols-outlined text-sm">close</span>
                           </button>
                        </div>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
    </div>
  );
}
