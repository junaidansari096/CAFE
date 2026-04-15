import React from 'react';

export default function Rewards() {
  return (
    <div className="relative fade-in bg-[#121414] text-[#fafaf5] min-h-screen px-6 md:px-20 py-12">

      {/* Progress Ring */}
      <section className="flex flex-col items-center justify-center space-y-6">
        <div className="relative flex items-center justify-center w-64 h-64">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 256 256">
            <circle className="text-[#2a2c28]" cx="128" cy="128" fill="transparent" r="110" stroke="currentColor" strokeWidth="8"></circle>
            <circle className="text-primary" cx="128" cy="128" fill="transparent" r="110" stroke="currentColor" strokeDasharray="691" strokeDashoffset="172" strokeWidth="8" strokeLinecap="round"></circle>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-5xl font-bold font-headline tracking-tighter">2,450</span>
            <span className="text-[10px] tracking-[0.2em] font-bold text-[#6b6b65] uppercase">Total XP</span>
          </div>
        </div>

        <div className="inline-flex items-center px-6 py-2 rounded-full bg-primary/10 border border-primary/30">
          <span className="material-symbols-outlined text-primary text-sm mr-2" style={{fontVariationSettings: "'FILL' 1"}}>workspace_premium</span>
          <span className="text-xs font-extrabold tracking-widest text-primary font-headline uppercase">Elite Alchemist</span>
        </div>
      </section>

      {/* Reward Tiers */}
      <section className="space-y-4 mt-12">
        <div className="flex justify-between items-end">
          <h3 className="text-sm font-bold tracking-widest text-[#6b6b65] uppercase">Reward Tiers</h3>
          <span className="text-[10px] text-primary cursor-pointer hover:underline">View All</span>
        </div>
        <div className="flex overflow-x-auto gap-4 pb-4 -mx-6 px-6" style={{scrollbarWidth: 'none'}}>

          <div className="min-w-[180px] p-5 bg-[#1a1c19] rounded-2xl flex flex-col items-start space-y-4 group hover:scale-[1.02] transition-transform duration-500">
            <div className="w-10 h-10 rounded-xl bg-[#2a2c28] flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">coffee</span>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold">Molecular Enthusiast</p>
              <p className="text-[10px] text-[#6b6b65]">3,000 XP REQUIRED</p>
            </div>
            <div className="w-full bg-[#2a2c28] h-1 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{width: '81%'}}></div>
            </div>
          </div>

          <div className="min-w-[180px] p-5 bg-[#1a1c19] rounded-2xl flex flex-col items-start space-y-4 group hover:scale-[1.02] transition-transform duration-500">
            <div className="w-10 h-10 rounded-xl bg-[#2a2c28] flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">science</span>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold">Synthesis Master</p>
              <p className="text-[10px] text-[#6b6b65]">5,000 XP REQUIRED</p>
            </div>
            <div className="w-full bg-[#2a2c28] h-1 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{width: '49%'}}></div>
            </div>
          </div>

          <div className="min-w-[180px] p-5 bg-[#1a1c19] rounded-2xl flex flex-col items-start space-y-4 group hover:scale-[1.02] transition-transform duration-500">
            <div className="w-10 h-10 rounded-xl bg-[#2a2c28] flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">star</span>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold">Caffeine Deity</p>
              <p className="text-[10px] text-[#6b6b65]">10,000 XP REQUIRED</p>
            </div>
            <div className="w-full bg-[#2a2c28] h-1 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{width: '24%'}}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Transmissions */}
      <section className="space-y-6 mt-12">
        <h3 className="text-sm font-bold tracking-widest text-[#6b6b65] uppercase">Recent Transmissions</h3>
        <div className="space-y-2">

          <div className="flex items-center justify-between p-4 bg-[#1a1c19] rounded-xl hover:bg-[#222420] transition-colors">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <div className="space-y-0.5">
                <p className="text-xs font-medium">Quantum Latte Purchase</p>
                <p className="text-[10px] text-[#6b6b65]">08:42 AM · NEW YORK HUB</p>
              </div>
            </div>
            <span className="text-xs font-bold font-headline text-primary">+50 XP</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-[#1a1c19] rounded-xl hover:bg-[#222420] transition-colors">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 rounded-full bg-[#3a3c38]"></div>
              <div className="space-y-0.5">
                <p className="text-xs font-medium">Daily Synthesis Bonus</p>
                <p className="text-[10px] text-[#6b6b65]">YESTERDAY · SYSTEM</p>
              </div>
            </div>
            <span className="text-xs font-bold font-headline text-primary">+15 XP</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-[#1a1c19] rounded-xl hover:bg-[#222420] transition-colors">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 rounded-full bg-[#3a3c38]"></div>
              <div className="space-y-0.5">
                <p className="text-xs font-medium">Sustainable Cup Credit</p>
                <p className="text-[10px] text-[#6b6b65]">OCT 24 · BERLIN HUB</p>
              </div>
            </div>
            <span className="text-xs font-bold font-headline text-primary">+10 XP</span>
          </div>
        </div>
      </section>

    </div>
  );
}
