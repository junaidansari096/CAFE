import React from 'react';

export default function Profile() {
  return (
    <div className="relative fade-in bg-[#121414] text-[#fafaf5] min-h-screen px-6 md:px-20 py-12">

      {/* Header */}
      <section className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-headline text-[10px] font-bold tracking-[0.2em] uppercase text-olive-500 mb-2 block">USER AUTHENTICATED</span>
            <h2 className="font-headline text-5xl md:text-7xl font-bold tracking-tight">Welcome back</h2>
          </div>
          <div className="flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-xl">
            <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(184,207,136,0.5)] animate-pulse"></div>
            <span className="font-headline text-xs font-bold tracking-[0.2em] uppercase text-primary">Status: Connected</span>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Profile Card */}
        <div className="md:col-span-8 bg-[#1a1c19] rounded-2xl p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl transition-all duration-500 group-hover:bg-primary/10"></div>
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-headline text-3xl font-bold mb-1">Julian Vane</h3>
                <p className="text-[#6b6b65] font-medium">alchemist.vane@futurebrew.io</p>
              </div>
              <div className="bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
                <span className="font-headline text-[10px] font-extrabold tracking-[0.15em] uppercase text-primary">Elite Alchemist</span>
              </div>
            </div>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <p className="font-headline text-[10px] font-bold tracking-[0.1em] uppercase text-[#5a5a54] mb-1">Transmissions</p>
                <p className="font-headline text-2xl font-bold">142</p>
              </div>
              <div>
                <p className="font-headline text-[10px] font-bold tracking-[0.1em] uppercase text-[#5a5a54] mb-1">Credit Balance</p>
                <p className="font-headline text-2xl font-bold">4,200</p>
              </div>
              <div>
                <p className="font-headline text-[10px] font-bold tracking-[0.1em] uppercase text-[#5a5a54] mb-1">Caffeine Level</p>
                <p className="font-headline text-2xl font-bold">Optimal</p>
              </div>
              <div>
                <p className="font-headline text-[10px] font-bold tracking-[0.1em] uppercase text-[#5a5a54] mb-1">Member Since</p>
                <p className="font-headline text-2xl font-bold">2042</p>
              </div>
            </div>
          </div>
        </div>

        {/* Active Extraction */}
        <div className="md:col-span-4 bg-[#1a1c19] rounded-2xl p-8 flex flex-col justify-between border-l-2 border-primary/30">
          <div className="flex flex-col gap-1">
            <span className="material-symbols-outlined text-primary text-3xl mb-4">coffee_maker</span>
            <h4 className="font-headline text-xl font-bold">Active Extraction</h4>
            <p className="text-[#6b6b65] text-sm">Molecular Roast #042 is being prepared at Station Delta.</p>
          </div>
          <div className="mt-8">
            <div className="w-full bg-[#2a2c28] h-1 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full shadow-[0_0_12px_rgba(184,207,136,0.4)]" style={{width: '75%'}}></div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">75% Complete</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#5a5a54]">2:14 Remaining</span>
            </div>
          </div>
        </div>

        {/* Past Transmissions */}
        <div className="md:col-span-12 mt-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-headline text-3xl font-bold uppercase tracking-tight">Past Transmissions</h3>
            <button className="text-primary font-headline text-xs font-bold tracking-widest uppercase hover:underline decoration-2 underline-offset-8 transition-all">View All Archives</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-[#1a1c19] rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-500 group cursor-pointer">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <span className="material-symbols-outlined text-olive-500">science</span>
                </div>
                <span className="text-[10px] font-bold text-[#5a5a54]">12.04.45</span>
              </div>
              <h4 className="font-headline text-xl font-bold mb-1">Quantum Latte</h4>
              <p className="text-[#6b6b65] text-xs mb-4 uppercase tracking-tighter">Ionized milk • Ethiopia Yirgacheffe • 4D Micro-Foam</p>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-xs text-primary">check_circle</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary/80">Delivered to Terminal 4</span>
              </div>
            </div>

            <div className="bg-[#1a1c19] rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-500 group cursor-pointer">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-olive-500">ac_unit</span>
                </div>
                <span className="text-[10px] font-bold text-[#5a5a54]">11.04.45</span>
              </div>
              <h4 className="font-headline text-xl font-bold mb-1">Cryo-Brew</h4>
              <p className="text-[#6b6b65] text-xs mb-4 uppercase tracking-tighter">Sub-zero extraction • Nitrogen infusion • Midnight Blend</p>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-xs text-primary">check_circle</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary/80">Delivered to Terminal 1</span>
              </div>
            </div>

            <div className="bg-[#1a1c19] rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-500 group cursor-pointer">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-olive-500">bolt</span>
                </div>
                <span className="text-[10px] font-bold text-[#5a5a54]">09.04.45</span>
              </div>
              <h4 className="font-headline text-xl font-bold mb-1">Plasma Cortado</h4>
              <p className="text-[#6b6b65] text-xs mb-4 uppercase tracking-tighter">Thermal pulse roast • Double shot • Oat plasma</p>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-xs text-primary">check_circle</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary/80">Delivered to Terminal 4</span>
              </div>
            </div>
          </div>
        </div>

        {/* System Controls */}
        <div className="md:col-span-12 mt-12 mb-16">
          <h3 className="font-headline text-3xl font-bold uppercase tracking-tight mb-8">System Controls</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="bg-[#1a1c19] hover:bg-[#222420] p-6 rounded-2xl flex items-center gap-4 transition-all duration-300">
              <span className="material-symbols-outlined text-primary">fingerprint</span>
              <div className="text-left">
                <p className="text-xs font-bold uppercase tracking-widest">Biometrics</p>
                <p className="text-[10px] text-[#6b6b65]">Secure access enabled</p>
              </div>
            </button>
            <button className="bg-[#1a1c19] hover:bg-[#222420] p-6 rounded-2xl flex items-center gap-4 transition-all duration-300">
              <span className="material-symbols-outlined text-primary">notifications_active</span>
              <div className="text-left">
                <p className="text-xs font-bold uppercase tracking-widest">Comm-Links</p>
                <p className="text-[10px] text-[#6b6b65]">Status updates active</p>
              </div>
            </button>
            <button className="bg-[#1a1c19] hover:bg-[#222420] p-6 rounded-2xl flex items-center gap-4 transition-all duration-300">
              <span className="material-symbols-outlined text-primary">credit_card</span>
              <div className="text-left">
                <p className="text-xs font-bold uppercase tracking-widest">Payment Flow</p>
                <p className="text-[10px] text-[#6b6b65]">Standard terminal payment</p>
              </div>
            </button>
            <button className="bg-[#1a1c19] hover:bg-[#222420] p-6 rounded-2xl flex items-center gap-4 transition-all duration-300">
              <span className="material-symbols-outlined text-primary">settings_power</span>
              <div className="text-left">
                <p className="text-xs font-bold uppercase tracking-widest">Termination</p>
                <p className="text-[10px] text-[#6b6b65]">Deactivate profile</p>
              </div>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
