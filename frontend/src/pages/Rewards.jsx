import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { api } from '../utils/api';

export default function Rewards() {
  const { isDark } = useOutletContext();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const profile = await api.getProfile();
        setUser(profile);
      } catch (err) {
        console.error('Failed to fetch profile', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return <div className="p-20 text-center">SYNCING XP DATA...</div>;
  if (!user) return <div className="p-20 text-center">ACCESS DENIED. PLEASE LOGIN.</div>;

  const xpPercent = Math.min((user.rewardsPoints / 1000) * 100, 100);
  const strokeDashoffset = 691 - (691 * xpPercent) / 100;

  return (
    <div className={`relative fade-in min-h-screen px-6 md:px-20 py-24 transition-colors duration-700 ${isDark ? 'bg-[#0d0f0f] text-[#fafaf5]' : 'bg-[#fafaf5] text-zinc-900'}`}>

      <section className="mb-24">
        <div className="flex items-center gap-4 mb-8">
           <div className="w-12 h-[2px] bg-primary"></div>
           <span className="font-headline text-xs font-black tracking-[0.5em] uppercase text-primary">XP System // {user.rewardsPoints > 500 ? 'Level 42' : 'Level 1'}</span>
        </div>
        <h2 className="text-6xl md:text-[8rem] font-black font-headline tracking-tighter mb-8 leading-[0.85] uppercase italic">
          CITIZEN <span className="text-primary not-italic">REWARDS</span>
        </h2>
      </section>

      {/* Solid Progress Ring Section */}
      {/* Hybrid Layout: Mobile Row vs Desktop Bulky Grid */}
      <section className="flex flex-row md:grid md:grid-cols-2 gap-6 md:gap-20 items-stretch mb-40">
        
        {/* XP Terminal Container: High-Impact Framing */}
        <div className={`w-[42%] md:w-auto p-4 md:p-12 border-2 md:border-4 flex flex-col items-center justify-center relative transition-all ${isDark ? 'bg-zinc-950 border-zinc-900 shadow-[12px_12px_0px_0px_rgba(30,30,30,1)] md:shadow-[20px_20px_0px_0px_rgba(30,30,30,1)]' : 'bg-white border-zinc-950 shadow-[12px_12px_0px_0px_rgba(184,207,136,1)] md:shadow-[20px_20px_0px_0px_rgba(184,207,136,1)]'}`}>
           <div className="relative flex items-center justify-center w-32 h-32 md:w-72 md:h-72">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 256 256">
              <circle className={`${isDark ? 'text-zinc-900' : 'text-zinc-100'} transition-colors duration-700`} cx="128" cy="128" fill="transparent" r="110" stroke="currentColor" strokeWidth="12"></circle>
              <circle className="text-primary transition-all duration-700" cx="128" cy="128" fill="transparent" r="110" stroke="currentColor" strokeDasharray="691" strokeDashoffset={strokeDashoffset} strokeWidth="12" strokeLinecap="square"></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl md:text-6xl font-black font-headline tracking-tighter">{user.rewardsPoints}</span>
              <span className={`text-[10px] md:text-xs tracking-[0.3em] font-black uppercase transition-colors duration-700 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>Total XP</span>
            </div>
          </div>
          
          <div className="mt-4 md:mt-12 bg-primary text-on-primary px-3 md:px-8 py-2 md:py-3 font-headline font-black uppercase text-[10px] md:text-xs tracking-widest text-center w-full">
            {user.isAdmin ? 'ADMIN' : (user.rewardsPoints > 100 ? 'Elite' : 'Explorer')}
          </div>
        </div>

        {/* Objectives Container: Restored Branding & Vertical Center */}
        <div className="w-[58%] md:w-full flex flex-col justify-center gap-3 md:gap-8">
           <h3 className="font-headline text-[10px] md:text-3xl font-black uppercase tracking-tight mb-1 md:mb-8 text-primary">NEXT LEVEL OBJECTIVES</h3>
           {[
             { title: "Synthesis Master", xp: "500", progress: user.rewardsPoints >= 500 ? "100%" : `${(user.rewardsPoints/500)*100}%`, status: user.rewardsPoints >= 500 ? "COMPLETED" : "IN PROGRESS" },
             { title: "Caffeine Deity", xp: "10,000", progress: "0%", status: "LOCKED" }
           ].map((obj, i) => (
             <div key={i} className={`p-4 md:p-8 border-2 ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-200 shadow-sm'}`}>
                <div className="flex justify-between items-baseline mb-2 md:mb-4">
                   <h4 className="font-headline font-black text-xs md:text-xl uppercase tracking-tighter truncate max-w-[70%]">{obj.title}</h4>
                   <span className="text-[8px] md:text-[10px] font-black text-primary italic">{obj.status}</span>
                </div>
                <div className={`w-full h-3 md:h-4 transition-colors duration-700 ${isDark ? 'bg-zinc-950' : 'bg-zinc-200'}`}>
                  <div className="bg-primary h-full transition-all duration-1000" style={{width: obj.progress}}></div>
                </div>
                <div className="mt-2 text-right text-[8px] md:text-[10px] font-black font-headline tracking-widest opacity-50">{obj.xp} XP TARGET</div>
             </div>
           ))}
        </div>
      </section>

      {/* Archive Logs - Solid Design */}
      <section className="pb-24">
         <div className="flex items-baseline gap-4 mb-12">
            <h3 className="font-headline text-2xl font-black uppercase tracking-tight">TRANSMISSION LOGS</h3>
            <div className="flex-1 h-[2px] bg-zinc-800"></div>
         </div>
         
         <div className="grid grid-cols-1 gap-4">
          {[
            { title: "Network Access Bonus", time: "JUST NOW · GLOBAL", xp: `+${user.rewardsPoints} XP`, active: true },
            { title: "Daily Synthesis Bonus", time: "00:01 AM · GLOBAL", xp: "+0 XP", active: false },
          ].map((log, idx) => (
            <div key={idx} className={`flex items-center justify-between p-10 border-2 transition-all duration-700 ${isDark ? 'bg-zinc-950 border-zinc-900 hover:bg-zinc-900 hover:border-primary/50' : 'bg-white border-zinc-200 hover:bg-zinc-50'}`}>
              <div className="flex items-center gap-10">
                <div className={`w-3 h-3 transition-all duration-700 ${log.active ? 'bg-primary ring-4 ring-primary/20' : 'bg-zinc-800'}`}></div>
                <div>
                  <h4 className="font-headline font-black text-lg uppercase tracking-tight mb-1">{log.title}</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40">{log.time}</p>
                </div>
              </div>
              <div className="text-2xl font-black font-headline text-primary italic">{log.xp}</div>
            </div>
          ))}
         </div>
      </section>

    </div>
  );
}
