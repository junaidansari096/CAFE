import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';

export default function Login() {
  const { isDark } = useOutletContext();

  return (
    <div className={`min-h-screen flex items-center justify-center px-6 py-12 transition-colors duration-700 ${isDark ? 'bg-[#0d0f0f]' : 'bg-[#fafaf5]'}`}>
      <div className={`w-full max-w-md p-12 border-4 transition-all duration-700 ${isDark ? 'bg-zinc-950 border-zinc-900 shadow-[20px_20px_0px_0px_rgba(30,30,30,1)]' : 'bg-white border-zinc-950 shadow-[20px_20px_0px_0px_rgba(184,207,136,1)]'}`}>
        
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-primary text-on-primary flex items-center justify-center mx-auto mb-8 shadow-sm">
            <span className="material-symbols-outlined text-4xl">key</span>
          </div>
          <h2 className={`font-headline text-4xl font-black uppercase tracking-tighter transition-colors duration-700 ${isDark ? 'text-white' : 'text-zinc-950'}`}>PROTOCOL ACCESS</h2>
          <p className={`mt-4 text-xs font-black uppercase tracking-widest transition-colors duration-700 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>Identify yourself to the network.</p>
        </div>

        <form className="space-y-8">
          <div className="space-y-4">
            <label className="block font-headline text-[10px] font-black tracking-[0.4em] text-primary uppercase">Terminal ID</label>
            <input 
              type="email" 
              placeholder="USER@HUB.IO"
              className={`w-full p-6 border-2 font-headline font-black uppercase text-xs focus:ring-4 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all duration-500 ${
                isDark ? 'bg-black border-zinc-800 text-white placeholder-zinc-800' : 'bg-zinc-50 border-zinc-100 text-black placeholder-zinc-300'
              }`}
            />
          </div>

          <div className="space-y-4">
            <label className="block font-headline text-[10px] font-black tracking-[0.4em] text-primary uppercase">Security Key</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className={`w-full p-6 border-2 font-headline font-black uppercase text-xs focus:ring-4 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all duration-500 ${
                isDark ? 'bg-black border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-100 text-black'
              }`}
            />
          </div>

          <button className="group relative w-full h-20 transition-transform active:translate-y-1">
             <div className="absolute inset-0 bg-primary shadow-2xl"></div>
             <div className="relative h-full flex items-center justify-center text-on-primary font-headline font-black uppercase tracking-[0.5em] text-sm italic">
               AUTHORIZE ACCESS {'->'}
             </div>
          </button>
        </form>

        <div className="mt-12 text-center pt-8 border-t-2 border-zinc-800">
          <p className={`text-[10px] font-black uppercase tracking-widest transition-colors duration-700 ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
            NEW CITIZEN? <Link to="/signup" className="text-primary hover:underline italic">INITIALIZE ACCT</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
