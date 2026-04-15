import React from 'react';
import { NavLink } from 'react-router-dom';

export default function TaskBar({ isDark }) {
  const links = [
    { to: '/', icon: 'home', label: 'Home' },
    { to: '/menu', icon: 'restaurant_menu', label: 'Menu' },
    { to: '/reserve', icon: 'table_restaurant', label: 'Reserve' },
    { to: '/rewards', icon: 'workspace_premium', label: 'Rewards' },
    { to: '/profile', icon: 'person', label: 'Profile' },
  ];

  return (
    <nav className={`fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pt-3 pb-8 backdrop-blur-xl md:hidden border-t ${isDark ? 'bg-[#121414]/90 border-white/5' : 'bg-stone-50/80 border-black/5'}`}>
      {links.map(link => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({isActive}) =>
            `flex flex-col items-center justify-center px-4 py-2 rounded-xl transition-all duration-300 relative ${
              isActive
                ? (isDark
                    ? 'bg-primary/20 text-primary translate-y-[-4px] shadow-sm'
                    : 'bg-olive-100 text-olive-900 translate-y-[-4px] shadow-sm')
                : (isDark
                    ? 'text-[#6b6b65] hover:bg-white/5 hover:translate-y-[-2px]'
                    : 'text-zinc-500 hover:bg-zinc-200/50 hover:translate-y-[-2px]')
            }`
          }
        >
          <span className="material-symbols-outlined text-[24px]">{link.icon}</span>
          <span className="font-['Manrope'] font-semibold text-[10px] uppercase tracking-widest mt-1">{link.label}</span>
          {link.to === '/rewards' && (
            <span className="absolute top-1 right-3 w-2 h-2 bg-olive-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(129,153,84,0.5)]"></span>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
