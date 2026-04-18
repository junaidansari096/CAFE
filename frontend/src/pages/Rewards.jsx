import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { api } from '../utils/api';
import { Trophy, Target, History, Award, Zap, Activity, Info, TrendingUp, ShieldCheck } from 'lucide-react';

export default function Rewards() {
  const { isDark } = useOutletContext();
  const [rewardsData, setRewardsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const data = await api.getRewardsData();
        setRewardsData(data);
      } catch (err) {
        console.error('Rewards System Disconnected:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRewards();
  }, []);

  if (loading) return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-700 ${isDark ? 'bg-[#000000]' : 'bg-[#fafaf5]'}`}>
      <div className="flex flex-col items-center gap-6">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <div className="text-primary font-headline font-black tracking-[0.6em] text-[10px] uppercase italic animate-pulse">Syncing Reward Telemetry...</div>
      </div>
    </div>
  );

  if (!rewardsData) return (
    <div className={`min-h-screen flex items-center justify-center text-center p-20 ${isDark ? 'bg-[#000000] text-primary' : 'bg-[#fafaf5] text-red-500'}`}>
      <div className="space-y-6">
        <ShieldCheck size={60} className="mx-auto opacity-20" />
        <h2 className="font-headline font-black text-2xl uppercase tracking-widest">ACCESS DENIED // NODE UNAUTHENTICATED</h2>
        <p className="text-xs uppercase tracking-widest opacity-50">Please establish a secure session to view archival standing.</p>
      </div>
    </div>
  );

  const { rewardsPoints, totalEarned, totalOrders, totalReservations, memberSince, history } = rewardsData;
  const xpPercent = Math.min((rewardsPoints / 1000) * 100, 100);
  const strokeDashoffset = 691 - (691 * xpPercent) / 100;

  // Derived Citizenship Status
  const getStatus = (pts) => {
    if (pts >= 1000) return { title: "Archon", level: 50 };
    if (pts >= 500) return { title: "Overseer", level: 25 };
    if (pts >= 250) return { title: "Technician", level: 10 };
    if (pts >= 100) return { title: "Citizen", level: 5 };
    return { title: "Explorer", level: 1 };
  };

  const status = getStatus(rewardsPoints);

  return (
    <div className={`min-h-screen pt-32 pb-24 px-6 md:px-20 transition-colors duration-700 relative overflow-hidden ${isDark ? 'bg-[#000000] text-[#fafaf5]' : 'bg-[#fafaf5] text-zinc-900'}`}>
      
      {/* Neural Background Modulations */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, ${isDark ? '#b8cf88' : '#000000'} 1px, transparent 0)`, backgroundSize: '30px 30px' }}></div>
      <div className="absolute -top-[10%] -left-[10%] w-[600px] h-[600px] bg-primary/20 blur-[180px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        <header className="mb-24 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-1 bg-primary"></div>
              <span className="font-headline text-[10px] font-black tracking-[0.5em] uppercase text-primary italic">Citizen Standing // Ref: {status.title}</span>
            </div>
            <h1 className="text-6xl md:text-[10rem] font-headline font-black uppercase tracking-tighter italic leading-[0.8]">
              XP <span className="text-primary not-italic">SOCIAL</span>
            </h1>
            <div className="flex flex-wrap gap-4 mt-8">
              <div className="px-6 py-3 bg-zinc-950 border-2 border-zinc-800 flex items-center gap-3">
                 <Activity size={14} className="text-primary" />
                 <span className="font-headline text-[9px] font-black uppercase tracking-widest text-zinc-400 italic">Established: {new Date(memberSince).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:block text-right">
            <div className="text-[10px] font-black text-primary uppercase tracking-[0.5em] mb-2">Molecular Standing</div>
            <div className="text-8xl font-headline font-black text-white italic opacity-10">LVL {status.level}</div>
          </div>
        </header>

        {/* Dynamic XP Gauge Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-32 items-stretch">
          
          {/* Main Visual Component - Gauge */}
          <div className={`lg:col-span-5 p-8 md:p-16 border-4 flex flex-col items-center justify-center relative transition-all group overflow-hidden ${isDark ? 'bg-zinc-950 border-zinc-900 shadow-[20px_20px_0px_0px_rgba(30,30,30,1)]' : 'bg-white border-zinc-950 shadow-[20px_20px_0px_0px_rgba(184,207,136,1)]'}`}>
             <div className="relative w-full aspect-square flex items-center justify-center p-4">
                <svg className="w-full h-full transform -rotate-90 filter drop-shadow-[0_0_20px_rgba(184,207,136,0.3)]" viewBox="0 0 256 256">
                  <circle className={`${isDark ? 'text-zinc-900' : 'text-zinc-100'}`} cx="128" cy="128" fill="transparent" r="110" stroke="currentColor" strokeWidth="16"></circle>
                  <circle className="text-primary transition-all duration-[1.5s] ease-out stroke-primary" cx="128" cy="128" fill="transparent" r="110" stroke="currentColor" strokeDasharray="691" strokeDashoffset={strokeDashoffset} strokeWidth="16" strokeLinecap="butt"></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-5xl md:text-8xl font-black font-headline tracking-tighter italic text-primary group-hover:scale-110 transition-transform">{rewardsPoints}</span>
                  <span className={`text-[10px] md:text-xs tracking-[0.5em] font-black uppercase opacity-40`}>Total XP</span>
                </div>
             </div>
             
             <div className="w-full mt-10 grid grid-cols-2 gap-4">
                <div className="p-4 border-2 border-zinc-900 bg-black/20 text-center">
                   <div className="text-primary text-[10px] font-black uppercase tracking-widest mb-1 italic">Yield</div>
                   <div className="text-xl font-headline font-black">+{totalEarned}</div>
                </div>
                <div className="p-4 border-2 border-zinc-900 bg-black/20 text-center">
                   <div className="text-primary text-[10px] font-black uppercase tracking-widest mb-1 italic">Status</div>
                   <div className="text-xl font-headline font-black">{status.title}</div>
                </div>
             </div>
          </div>

          {/* Statistics Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="p-10 border-4 border-zinc-950 dark:border-zinc-800 bg-zinc-950/20 backdrop-blur-md relative overflow-hidden group">
                <Zap className="absolute -right-6 -bottom-6 w-32 h-32 text-primary opacity-5 group-hover:rotate-12 transition-transform" />
                <h3 className="font-headline text-3xl font-black uppercase tracking-tighter italic mb-8">EXTRACTION <br/> <span className="text-primary">METRICS</span></h3>
                <div className="text-7xl font-headline font-black italic">{totalOrders}</div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mt-2 italic">Successful Concluded Protocols</p>
             </div>

             <div className="p-10 border-4 border-zinc-950 dark:border-zinc-800 bg-zinc-950/20 backdrop-blur-md relative overflow-hidden group">
                <Target className="absolute -right-6 -bottom-6 w-32 h-32 text-primary opacity-5 group-hover:-rotate-12 transition-transform" />
                <h3 className="font-headline text-3xl font-black uppercase tracking-tighter italic mb-8">NODE <br/> <span className="text-primary">OCCUPANCY</span></h3>
                <div className="text-7xl font-headline font-black italic">{totalReservations}</div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mt-2 italic">Shift Reservations Stabilized</p>
             </div>

             <div className="md:col-span-2 p-10 border-4 border-zinc-950 dark:border-zinc-800 bg-primary/5 backdrop-blur-md flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-6">
                   <div className="w-16 h-16 bg-primary text-on-primary flex items-center justify-center">
                      <TrendingUp size={30} strokeWidth={3} />
                   </div>
                   <div>
                      <h4 className="font-headline font-black text-xl uppercase tracking-tighter italic">Next Tier Progression</h4>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 italic">Projected standing: Technocrat (+250 XP Reqd)</p>
                   </div>
                </div>
                <div className="text-right">
                   <div className="text-[10px] font-black text-primary uppercase tracking-widest mb-1 italic">Objective Complete</div>
                   <div className="text-2xl font-headline font-black uppercase">{Math.round(xpPercent)}%</div>
                </div>
             </div>
          </div>
        </section>

        {/* Archival Transaction Logs */}
        <section>
           <div className="flex items-center gap-6 mb-12">
              <h3 className="font-headline text-3xl font-black uppercase tracking-tighter italic shrink-0">XP <span className="text-primary">ARCHIVE</span></h3>
              <div className="flex-1 h-[2px] bg-zinc-800 opacity-30"></div>
           </div>
           
           <div className="grid grid-cols-1 gap-4">
            {history.length > 0 ? (
              history.map((log, idx) => (
                <div key={idx} className={`group flex flex-col md:flex-row items-center justify-between p-10 border-4 transition-all duration-500 overflow-hidden relative ${isDark ? 'bg-zinc-950 border-zinc-900 hover:border-primary/50' : 'bg-white border-zinc-200 hover:border-primary/50'}`}>
                  
                  {/* Category Accent */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                    log.type === 'signup' ? 'bg-yellow-500' :
                    log.type === 'order' ? 'bg-primary' :
                    log.type === 'reservation' ? 'bg-blue-500' : 'bg-zinc-700'
                  }`}></div>

                  <div className="flex items-center gap-10 flex-1 w-full md:w-auto mb-6 md:mb-0">
                    <div className="w-14 h-14 bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center shrink-0 group-hover:border-primary transition-colors">
                      {log.type === 'signup' && <ShieldCheck size={24} className="text-yellow-500" />}
                      {log.type === 'order' && <Zap size={24} className="text-primary" />}
                      {log.type === 'reservation' && <Activity size={24} className="text-blue-500" />}
                    </div>
                    <div>
                      <h4 className="font-headline font-black text-xl uppercase tracking-tighter italic mb-1 group-hover:text-primary transition-colors">
                        {log.type.toUpperCase()} // ENTRY
                      </h4>
                      <p className="text-xs font-medium text-zinc-500 max-w-xl uppercase tracking-tighter">{log.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between w-full md:w-auto md:gap-14">
                    <div className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500 italic text-right">
                       LOGGED: {new Date(log.createdAt).toLocaleString()}
                    </div>
                    <div className="text-4xl font-headline font-black text-primary italic">
                      {log.points > 0 ? `+${log.points}` : log.points} XP
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center border-4 border-dashed border-zinc-800 rounded-3xl opacity-20 bg-zinc-950/20">
                <History size={60} className="mx-auto mb-6 text-primary" />
                <h3 className="font-headline text-2xl font-black uppercase tracking-widest text-zinc-500">History Log Vacant</h3>
              </div>
            )}
           </div>
        </section>

      </div>
    </div>
  );
}
