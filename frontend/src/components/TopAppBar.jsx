import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ASSETS } from '../constants/assets';

export default function TopAppBar({ isDark, toggleTheme }) {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const itemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Menu', path: '/menu' },
    { label: 'Reservations', path: '/reserve' },
    { label: 'Rewards', path: '/rewards' }
  ];

  if (user) {
    navItems.push({ label: 'History', path: '/history' });
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className={`sticky top-0 z-50 w-full px-4 py-2 md:px-20 md:py-4 flex items-center justify-between transition-all duration-700 ease-in-out border-b-2 ${isDark ? 'bg-[#0d0f0f] border-white/5 text-[#fafaf5]' : 'bg-white border-black/5 text-zinc-900 shadow-sm'}`}>
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2 group">
          <div className={`w-8 h-8 rounded-md flex items-center justify-center transition-all duration-700 ${isDark ? 'bg-primary/10 text-primary border border-primary/30 group-hover:bg-primary group-hover:text-on-primary' : 'bg-primary text-on-primary group-hover:bg-zinc-900 font-bold'}`}>
            <span className="material-symbols-outlined text-[20px]">{ASSETS.BRAND_ICON}</span>
          </div>
          <h1 className="font-headline font-black text-xl tracking-tighter uppercase italic">{ASSETS.BRAND_NAME}</h1>
        </Link>
      </div>

      <nav className="hidden lg:flex items-center gap-2">
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
        {user && (
          <NavLink
            to="/profile"
            className={({ isActive }) => 
              `px-4 py-2 font-headline text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 rounded-md ${
                isActive 
                  ? 'bg-primary text-on-primary' 
                  : `hover:bg-primary/10 ${isDark ? 'text-[#a0a09a]' : 'text-zinc-500'}`
              }`
            }
          >
            Profile
          </NavLink>
        )}
      </nav>

      <div className="flex items-center gap-3">
        {user ? (
          <button 
            onClick={handleLogout}
            className={`hidden md:flex px-6 py-2 border-2 font-headline text-[10px] font-black tracking-widest uppercase transition-all duration-500 rounded-md ${isDark ? 'border-red-500/40 text-red-500 hover:bg-red-500 hover:text-white' : 'border-red-500/10 text-red-600 hover:bg-red-500 hover:text-white'}`}
          >
            Terminate Session
          </button>
        ) : (
          <Link 
            to="/login" 
            className={`hidden md:flex px-6 py-2 border-2 font-headline text-[10px] font-black tracking-widest uppercase transition-all duration-500 rounded-md ${isDark ? 'border-primary/40 text-primary hover:bg-primary hover:text-on-primary' : 'border-black/10 text-zinc-900 hover:bg-black hover:text-white'}`}
          >
            Access Terminal
          </Link>
        )}

        {(user?.isAdmin || user?.role === 'admin') && (
          <Link 
            to="/admin" 
            className={`hidden md:flex px-4 py-1.5 border-2 border-primary text-primary font-headline text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-zinc-950 transition-all ${isDark ? '' : 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none'}`}
          >
            Terminal
          </Link>
        )}

        {/* Theme Toggle Button */}
         <button 
           onClick={toggleTheme}
           className={`w-10 h-10 rounded-md flex items-center justify-center transition-all duration-500 hover:scale-105 active:scale-95 border ${isDark ? 'bg-white/5 border-white/10 text-primary' : 'bg-black/5 border-black/10 text-primary'}`}
           title="Toggle Theme"
         >
           <div className="relative w-5 h-5">
             <span className={`material-symbols-outlined text-[20px] absolute inset-0 flex items-center justify-center transition-all duration-700 transform ${isDark ? 'rotate-0 opacity-100 scale-100' : 'rotate-90 opacity-0 scale-50'}`}>
               light_mode
             </span>
             <span className={`material-symbols-outlined text-[20px] absolute inset-0 flex items-center justify-center transition-all duration-700 transform ${!isDark ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-50'}`}>
               dark_mode
             </span>
           </div>
         </button>

        <Link to="/cart" className={`w-10 h-10 rounded-md flex items-center justify-center relative transition-all duration-500 border ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
          <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
          {itemCount > 0 && (
            <span className={`absolute -top-1 -right-1 w-4 h-4 bg-primary text-on-primary text-[8px] rounded-full flex items-center justify-center font-bold border-2 ${isDark ? 'border-[#0d0f0f]' : 'border-white'}`}>
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
