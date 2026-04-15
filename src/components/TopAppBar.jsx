import React from 'react';
import { NavLink } from 'react-router-dom';

export default function TopAppBar({ isDark }) {
  return (
    <header className={`w-full sticky top-0 z-50 backdrop-blur-md flex justify-between items-center px-6 py-4 ${isDark ? 'bg-[#121414]/80' : 'bg-stone-50/80'}`}>
      <div className="flex items-center gap-4">
        <button className={`active:scale-95 duration-150 ${isDark ? 'text-primary' : 'text-olive-700'}`}>
          <span className="material-symbols-outlined hover:opacity-70 transition-opacity">menu</span>
        </button>
        <span className={`text-2xl font-black tracking-[-0.05em] font-headline uppercase ${isDark ? 'text-[#fafaf5]' : 'text-zinc-900'}`}>
          FUTURE BREW
        </span>
      </div>
      <nav className="hidden md:flex gap-8 items-center">
        {[
          { to: '/', label: 'Home' },
          { to: '/menu', label: 'Menu' },
          { to: '/reserve', label: 'Reservations' },
          { to: '/rewards', label: 'Rewards' },
          { to: '/profile', label: 'Profile' },
        ].map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({isActive}) =>
              `font-headline tracking-tighter uppercase font-bold text-sm transition-colors duration-300 ${
                isActive
                  ? (isDark ? 'text-primary' : 'text-olive-800')
                  : (isDark ? 'text-[#6b6b65] hover:text-[#fafaf5]' : 'text-zinc-500 hover:text-olive-600')
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        <button className={`active:scale-95 duration-150 relative ${isDark ? 'text-primary' : 'text-olive-700'}`}>
          <span className="material-symbols-outlined hover:opacity-70 transition-opacity">shopping_cart</span>
          <span className="absolute -top-1 -right-1 bg-olive-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">2</span>
        </button>
      </div>
    </header>
  );
}
