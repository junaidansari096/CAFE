import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import TopAppBar from './TopAppBar';
import TaskBar from './TaskBar';

export default function Layout() {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  useEffect(() => {
    document.body.className = isDark ? 'bg-[#121414]' : 'bg-[#fafaf5]';
  }, [isDark]);

  return (
    <div className={`min-h-screen flex flex-col relative pb-24 md:pb-0 transition-colors duration-700 ease-in-out ${isDark ? 'bg-[#121414] dark' : 'bg-[#fafaf5]'}`}>
      <TopAppBar isDark={isDark} toggleTheme={toggleTheme} />
      
      <main className="flex-1 w-full relative">
        <Outlet context={{ isDark }} />
      </main>

      {/* Premium Footer */}
      <footer className={`w-full px-6 md:px-20 py-16 border-t transition-all duration-700 ${isDark ? 'bg-[#0d0f0f] border-white/5' : 'bg-white border-black/5'}`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-700 ${isDark ? 'bg-primary/20 text-primary' : 'bg-primary text-on-primary'}`}>
                <span className="material-symbols-outlined text-[24px]">cyclone</span>
              </div>
              <h2 className={`font-headline font-bold text-2xl tracking-tighter uppercase transition-colors duration-700 ${isDark ? 'text-white' : 'text-zinc-900'}`}>Future Brew</h2>
            </div>
            <p className={`max-w-sm text-sm leading-relaxed transition-colors duration-700 ${isDark ? 'text-[#6b6b65]' : 'text-zinc-500'}`}>
              The global leader in molecular extraction and hyper-caffeinated experience labs. Since 2042.
            </p>
          </div>
          
          <div>
            <h4 className="font-headline text-[10px] font-black tracking-widest text-primary uppercase mb-6">Protocols</h4>
            <ul className="space-y-4">
              <li><Link to="/menu" className={`text-xs font-bold uppercase hover:text-primary transition-colors ${isDark ? 'text-[#a0a09a]' : 'text-zinc-500'}`}>The Menu</Link></li>
              <li><Link to="/reserve" className={`text-xs font-bold uppercase hover:text-primary transition-colors ${isDark ? 'text-[#a0a09a]' : 'text-zinc-500'}`}>Lab Reservations</Link></li>
              <li><Link to="/rewards" className={`text-xs font-bold uppercase hover:text-primary transition-colors ${isDark ? 'text-[#a0a09a]' : 'text-zinc-500'}`}>Loyalty Nexus</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline text-[10px] font-black tracking-widest text-primary uppercase mb-6">Security</h4>
            <ul className="space-y-4">
              <li><Link to="/terms" className={`text-xs font-bold uppercase hover:text-primary transition-colors ${isDark ? 'text-[#a0a09a]' : 'text-zinc-500'}`}>Terms of Operation</Link></li>
              <li><Link to="/privacy" className={`text-xs font-bold uppercase hover:text-primary transition-colors ${isDark ? 'text-[#a0a09a]' : 'text-zinc-500'}`}>Privacy Directive</Link></li>
              <li><Link to="/login" className={`text-xs font-bold uppercase hover:text-primary transition-colors ${isDark ? 'text-[#a0a09a]' : 'text-zinc-500'}`}>Access Terminal</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5">
          <p className={`text-[10px] font-bold tracking-widest uppercase transition-colors duration-700 ${isDark ? 'text-[#444]' : 'text-zinc-300'}`}>
            © 2045 Future Brew • All Rights Reserved
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            {['X', 'INSTAGRAM', 'LINKEDIN'].map(social => (
              <span key={social} className={`text-[10px] font-black tracking-widest cursor-pointer hover:text-primary transition-colors ${isDark ? 'text-[#6b6b65]' : 'text-zinc-400'}`}>
                {social}
              </span>
            ))}
          </div>
        </div>
      </footer>

      <TaskBar isDark={isDark} />
    </div>
  );
}
