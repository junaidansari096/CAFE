import React, { useState } from 'react';
import { Link, useOutletContext, useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const { isDark } = useOutletContext();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passphrases do not match');
      return;
    }

    setLoading(true);
    try {
      const data = await api.signup(name, email, password);
      setUser(data); // Sync globally
      navigate('/profile'); // Redirect to profile
    } catch (err) {
      setError(err.message || 'Initialization Failed: Script Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-6 py-12 transition-colors duration-700 ${isDark ? 'bg-[#0d0f0f]' : 'bg-[#fafaf5]'}`}>
      <div className={`w-full max-w-2xl p-12 border-4 transition-all duration-700 ${isDark ? 'bg-zinc-950 border-zinc-900 shadow-[20px_20px_0px_0px_rgba(30,30,30,1)]' : 'bg-white border-zinc-950 shadow-[20px_20px_0px_0px_rgba(184,207,136,1)]'}`}>
        
        <div className="mb-12">
          <h2 className={`font-headline text-5xl font-black uppercase tracking-tighter transition-colors duration-700 ${isDark ? 'text-white' : 'text-zinc-950'}`}>INITIALIZE <br/><span className="text-primary italic">ACCOUNT</span></h2>
          <p className={`mt-4 text-xs font-black uppercase tracking-widest transition-colors duration-700 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>Join the global network of molecular alchemists.</p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-100 border-2 border-red-500 text-red-600 font-headline text-[10px] font-black uppercase tracking-widest animate-pulse">
            ERROR: {error}
          </div>
        )}

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="block font-headline text-[10px] font-black tracking-[0.4em] text-primary uppercase">Full Identity</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="JULIAN VANE"
                className={`w-full p-6 border-2 font-headline font-black uppercase text-xs focus:ring-4 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all ${
                  isDark ? 'bg-black border-zinc-800 text-white placeholder-zinc-800' : 'bg-zinc-50 border-zinc-100 text-black placeholder-zinc-300'
                }`}
              />
            </div>
            <div className="space-y-4">
              <label className="block font-headline text-[10px] font-black tracking-[0.4em] text-primary uppercase">Comm ID (Email)</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ID@DOMAIN.IO"
                className={`w-full p-6 border-2 font-headline font-black uppercase text-xs focus:ring-4 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all ${
                  isDark ? 'bg-black border-zinc-800 text-white placeholder-zinc-800' : 'bg-zinc-50 border-zinc-100 text-black placeholder-zinc-300'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="block font-headline text-[10px] font-black tracking-[0.4em] text-primary uppercase">Passphrase</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full p-6 border-2 font-headline font-black uppercase text-xs focus:ring-4 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all ${
                  isDark ? 'bg-black border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-100 text-black'
                }`}
              />
            </div>
            <div className="space-y-4">
              <label className="block font-headline text-[10px] font-black tracking-[0.4em] text-primary uppercase">Confirm Script</label>
              <input 
                type="password" 
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full p-6 border-2 font-headline font-black uppercase text-xs focus:ring-4 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all ${
                  isDark ? 'bg-black border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-100 text-black'
                }`}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 py-4">
            <input type="checkbox" required className="w-6 h-6 border-2 border-primary bg-transparent checked:bg-primary transition-all cursor-pointer" />
            <span className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>I accept the <Link to="/terms" className="text-primary hover:underline">Neural Directives</Link></span>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="group relative w-full h-20 transition-transform active:translate-y-1 disabled:opacity-50"
          >
             <div className="absolute inset-0 bg-primary shadow-2xl"></div>
             <div className="relative h-full flex items-center justify-center text-on-primary font-headline font-black uppercase tracking-[0.5em] text-sm italic">
               {loading ? 'INITIALIZING...' : 'COMPLETE INITIALIZATION ->'}
             </div>
          </button>
        </form>

        <div className="mt-12 text-center pt-8 border-t-2 border-zinc-800">
          <p className={`text-[10px] font-black uppercase tracking-widest transition-colors duration-700 ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
            ALREADY KEYED? <Link to="/login" className="text-primary hover:underline italic">ACCESS TERMINAL</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
