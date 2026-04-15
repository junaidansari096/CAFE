import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function TopAppBar({ isDark, toggleTheme }) {
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Menu', path: '/menu' },
    { label: 'Reservations', path: '/reserve' },
    { label: 'Rewards', path: '/rewards' },
    { label: 'Profile', path: '/profile' }
  ];

  return (
    <header className={`sticky top-0 z-50 w-full px-6 py-4 md:px-20 flex items-center justify-between transition-all duration-700 ease-in-out border-b-2 ${isDark ? 'bg-[#0d0f0f] border-white/5 text-[#fafaf5]' : 'bg-white border-black/5 text-zinc-900 shadow-sm'}`}>
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2 group">
          <div className={`w-8 h-8 rounded-md flex items-center justify-center transition-all duration-700 ${isDark ? 'bg-primary/10 text-primary border border-primary/30 group-hover:bg-primary group-hover:text-on-primary' : 'bg-primary text-on-primary group-hover:bg-zinc-900 font-bold'}`}>
            <span className="material-symbols-outlined text-[20px]">cyclone</span>
          </div>
          <h1 className="font-headline font-black text-xl tracking-tighter uppercase italic">Future Brew</h1>
        </Link>
      </div>

      <nav className="hidden lg:flex items-center gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `px-4 py-2 font-headline text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 rounded-md ${
                isActive 
                  ? 'bg-primary text-on-primary' 
                  : `hover:bg-primary/10 ${isDark ? 'text-[#a0a09a]' : 'text-zinc-500'}`
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <Link 
          to="/login" 
          className={`hidden md:flex px-6 py-2 border-2 font-headline text-[10px] font-black tracking-widest uppercase transition-all duration-500 rounded-md ${isDark ? 'border-primary/40 text-primary hover:bg-primary hover:text-on-primary' : 'border-black/10 text-zinc-900 hover:bg-black hover:text-white'}`}
        >
          Access Terminal
        </Link>

        {/* Theme Toggle Button - Solid style */}
        <button 
          onClick={toggleTheme}
          className={`w-10 h-10 rounded-md flex items-center justify-center transition-all duration-500 hover:scale-105 active:scale-95 border ${isDark ? 'bg-white/5 border-white/10 text-primary' : 'bg-black/5 border-black/10 text-olive-700'}`}
          title="Toggle Theme"
        >
          <div className="relative w-5 h-5 overflow-hidden">
            <span className={`material-symbols-outlined text-[20px] absolute inset-0 transition-all duration-700 transform ${isDark ? 'translate-y-0 opacity-100 rotate-0' : '-translate-y-full opacity-0 -rotate-90'}`}>
              light_mode
            </span>
            <span className={`material-symbols-outlined text-[20px] absolute inset-0 transition-all duration-700 transform ${!isDark ? 'translate-y-0 opacity-100 rotate-0' : 'translate-y-full opacity-0 rotate-90'}`}>
              dark_mode
            </span>
          </div>
        </button>

        <button className={`w-10 h-10 rounded-md flex items-center justify-center relative transition-all duration-500 border ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
          <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-on-primary text-[8px] rounded-full flex items-center justify-center font-bold border-2 border-[#0d0f0f]">2</span>
        </button>
      </div>
    </header>
  );
}
