import { NavLink, Outlet, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { label: 'System Overview', path: '/admin', icon: 'dashboard' },
  { label: 'Catalog Sync', path: '/admin/menu', icon: 'coffee' },
  { label: 'Node Bookings', path: '/admin/bookings', icon: 'book_online' },
  { label: 'Personnel Logs', path: '/admin/reviews', icon: 'rate_review' },
];

export default function AdminLayout({ isDark }) {
  const { logout, user, isAdmin } = useAuth();

  if (!isAdmin) return <Navigate to="/login" />;

  return (
    <div className={`min-h-screen flex transition-colors duration-700 ${isDark ? 'bg-[#0d0f0f] text-[#fafaf5]' : 'bg-[#fafaf5] text-zinc-900'}`}>
      
      {/* Admin Sidebar - Technical Aesthetic */}
      <aside className={`w-72 border-r-2 transition-all duration-700 fixed h-full z-50 ${isDark ? 'bg-[#0d0f0f] border-zinc-900' : 'bg-white border-zinc-200 shadow-xl'}`}>
        <div className="p-8 border-b-2 border-zinc-800">
          <Link to="/" className="flex items-center gap-3">
             <div className="w-8 h-8 bg-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-zinc-950 font-bold">terminal</span>
             </div>
             <h1 className="font-headline font-black text-lg tracking-tighter uppercase italic">Control Center</h1>
          </Link>
          <div className="mt-4 text-[8px] font-black uppercase tracking-[0.4em] text-primary opacity-60">Auth: Admin-Level-01</div>
        </div>

        <nav className="p-6 flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) => 
                `flex items-center gap-4 px-6 py-4 font-headline text-xs font-black uppercase tracking-widest transition-all duration-500 border-2 ${
                  isActive 
                    ? 'bg-primary text-zinc-950 border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' 
                    : `border-transparent hover:border-primary/20 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`
                }`
              }
            >
              <span className="material-symbols-outlined text-lg">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-8 border-t-2 border-zinc-800">
           <button 
            onClick={logout}
            className="flex items-center gap-3 text-red-500 font-headline text-[10px] font-black uppercase tracking-widest hover:translate-x-2 transition-transform"
           >
              <span className="material-symbols-outlined">logout</span>
              Terminate Session
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-72 p-12 lg:p-20 overflow-y-auto">
        <header className="flex justify-between items-end mb-16 pb-8 border-b-2 border-zinc-800">
           <div>
              <h2 className="text-5xl font-black font-headline uppercase italic tracking-tighter">System <span className="text-primary not-italic">Operator</span></h2>
              <p className="font-medium text-zinc-500 mt-2 uppercase tracking-wide text-xs">Environment: Production // Latancy: 0.02ms</p>
           </div>
           
           <div className={`px-6 py-2 border-2 ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
              <span className="font-headline text-[10px] font-black uppercase tracking-widest text-primary animate-pulse">● System Live</span>
           </div>
        </header>

        <Outlet context={{ isDark }} />
      </main>
    </div>
  );
}
