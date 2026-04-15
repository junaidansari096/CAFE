import React from 'react';

export default function Booking() {
  return (
    <div className="relative fade-in px-6 md:px-20 py-12">

      <section className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="font-headline text-[10px] tracking-widest uppercase font-bold text-zinc-500">Live Availability</span>
        </div>
        <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-4 uppercase">CONFIGURE YOUR SPACE</h2>
        <p className="text-zinc-500 text-sm tracking-wide leading-relaxed max-w-xs mx-auto">
          Precise seating orchestration for the modern alchemist. Select your preferred environment.
        </p>
      </section>

      {/* Table Options */}
      <section className="grid grid-cols-1 gap-4 mb-12">

        <div className="glass-panel group p-6 rounded-xl flex items-center justify-between cursor-pointer hover:bg-primary/5 transition-all duration-500 hover:scale-[1.02] active:scale-95">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500">
              <span className="material-symbols-outlined text-2xl">person</span>
            </div>
            <div className="text-left">
              <h3 className="font-headline font-bold text-lg tracking-tight uppercase text-zinc-900">Solo Alcove</h3>
              <p className="font-headline text-[10px] tracking-widest uppercase text-zinc-500">Capacity: 1-2 Guests</p>
            </div>
          </div>
          <div className="w-6 h-6 rounded-full border-2 border-zinc-300 group-hover:border-primary group-hover:bg-primary/10 flex items-center justify-center transition-all">
            <span className="material-symbols-outlined text-sm text-primary opacity-0 group-hover:opacity-100">check</span>
          </div>
        </div>

        <div className="glass-panel group p-6 rounded-xl flex items-center justify-between bg-primary/5 border-2 border-primary/20 cursor-pointer transition-all duration-500 hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(88,97,0,0.1)]">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">groups</span>
            </div>
            <div className="text-left">
              <h3 className="font-headline font-bold text-lg tracking-tight uppercase text-zinc-900">Duo Station</h3>
              <p className="font-headline text-[10px] tracking-widest uppercase text-olive-700 font-bold">Capacity: 2-4 Guests</p>
            </div>
          </div>
          <div className="w-6 h-6 rounded-full border-2 border-primary bg-primary flex items-center justify-center transition-all">
            <span className="material-symbols-outlined text-sm text-white">check</span>
          </div>
        </div>

        <div className="glass-panel group p-6 rounded-xl flex items-center justify-between cursor-pointer hover:bg-primary/5 transition-all duration-500 hover:scale-[1.02] active:scale-95">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500">
              <span className="material-symbols-outlined text-2xl">group_add</span>
            </div>
            <div className="text-left">
              <h3 className="font-headline font-bold text-lg tracking-tight uppercase text-zinc-900">The Collective</h3>
              <p className="font-headline text-[10px] tracking-widest uppercase text-zinc-500">Capacity: 4-8 Guests</p>
            </div>
          </div>
          <div className="w-6 h-6 rounded-full border-2 border-zinc-300 group-hover:border-primary group-hover:bg-primary/10 flex items-center justify-center transition-all">
            <span className="material-symbols-outlined text-sm text-primary opacity-0 group-hover:opacity-100">check</span>
          </div>
        </div>
      </section>

      {/* Date/Time/Guests */}
      <section className="space-y-8 mb-16">
        <div className="relative group">
          <label className="block font-headline text-[10px] tracking-[0.2em] font-bold text-olive-700 uppercase mb-3 text-center">Arrival Date</label>
          <div className="relative">
            <input className="w-full bg-surface-container-high border-none rounded-xl py-4 px-6 font-headline text-center font-medium text-zinc-900 focus:ring-2 focus:ring-primary cursor-pointer" readOnly type="text" defaultValue="OCTOBER 24, 2024" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-primary transition-all duration-500 group-hover:w-full"></div>
          </div>
        </div>

        <div className="relative group">
          <label className="block font-headline text-[10px] tracking-[0.2em] font-bold text-olive-700 uppercase mb-3 text-center">Select Time</label>
          <div className="relative">
            <select className="w-full bg-surface-container-high border-none rounded-xl py-4 px-6 font-headline text-center font-medium text-zinc-900 focus:ring-2 focus:ring-primary cursor-pointer appearance-none" defaultValue="10:30 AM">
              <option>09:00 AM</option>
              <option>10:30 AM</option>
              <option>01:00 PM</option>
              <option>04:30 PM</option>
            </select>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-primary transition-all duration-500 group-hover:w-full"></div>
          </div>
        </div>

        <div className="relative group">
          <label className="block font-headline text-[10px] tracking-[0.2em] font-bold text-olive-700 uppercase mb-3 text-center">Number of Guests</label>
          <div className="flex items-center justify-center gap-8">
            <button className="w-12 h-12 rounded-full flex items-center justify-center bg-surface-container-highest text-zinc-500 hover:bg-primary hover:text-white transition-all">
              <span className="material-symbols-outlined">remove</span>
            </button>
            <span className="font-headline text-3xl font-bold w-12 text-center text-zinc-900">02</span>
            <button className="w-12 h-12 rounded-full flex items-center justify-center bg-surface-container-highest text-zinc-500 hover:bg-primary hover:text-white transition-all">
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="flex justify-center">
        <button className="w-full max-w-xs py-5 bg-gradient-to-r from-primary to-olive-500 text-on-primary font-headline font-bold uppercase tracking-widest rounded-xl transition-transform hover:scale-105 active:scale-95 shadow-xl">
          Confirm Booking
        </button>
      </div>

    </div>
  );
}
