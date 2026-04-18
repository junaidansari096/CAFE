import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function TaskBar({ isDark }) {
  const { user } = useAuth();
  const isAdmin = user?.isAdmin || user?.role === 'admin';

  const links = [
    { to: '/', icon: 'home', label: 'Home' },
    { to: '/menu', icon: 'restaurant_menu', label: 'Menu' },
    { to: '/reserve', icon: 'table_restaurant', label: 'Reserve' },
    { to: '/rewards', icon: 'workspace_premium', label: 'Rewards' },
    { to: '/profile', icon: 'person', label: 'Profile' },
  ];


  return (
    <nav className={`fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 md:hidden border-t-2 transition-all duration-700 ${isDark ? 'bg-[#0d0f0f] border-white/10' : 'bg-white border-black/10 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]'}`}>
      {links.map(link => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({isActive}) =>
            `flex flex-col items-center justify-center px-2 py-1.5 rounded-lg transition-all duration-500 relative ${
              isActive
                ? (isDark
                    ? 'bg-primary text-on-primary shadow-[0_0_20px_rgba(184,207,136,0.2)]'
                    : 'bg-primary text-on-primary shadow-sm')
                : (isDark
                    ? 'text-zinc-500 hover:bg-white/5'
                    : 'text-zinc-400 hover:bg-black/5')
            }`
          }
        >
          <span className="material-symbols-outlined text-[20px]">{link.icon}</span>
          <span className="font-headline font-black text-[7px] uppercase tracking-[0.1em] mt-1">{link.label}</span>
          {link.to === '/rewards' && !isDark && (
            <span className="absolute top-1 right-2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
          )}
          {link.to === '/rewards' && isDark && (
            <span className="absolute top-1 right-2 w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
