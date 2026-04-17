import React, { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { Package, Shield, Activity, LogOut, Bell, CreditCard, Box, Zap, ShoppingBag, Clock, CheckCircle, Truck, AlertCircle, XCircle, Info } from 'lucide-react';

export default function Profile() {
  const { isDark } = useOutletContext();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [profile, myBookings, myOrders] = await Promise.all([
        api.getProfile(),
        api.getMyBookings(),
        api.getMyOrders()
      ]);
      setUser(profile);
      setBookings(myBookings || []);
      setOrders(myOrders || []);
    } catch (err) {
      console.error('Failed to fetch biometric data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    api.logout();
    navigate('/login');
  };

  const handleCancelOrder = async (id) => {
    const targetOrder = orders.find(o => o._id === id);
    if (!targetOrder) return;
    
    if (targetOrder.status !== 'Pending') {
        alert('TERMINATION LOCKED: This extraction has already advanced to the next protocol stage.');
        return;
    }

    if (window.confirm('TERMINATE EXTRACTION PROTOCOL? THIS ACTION IS IRREVERSIBLE.')) {
        try {
            setLoading(true);
            await api.cancelOrder(id);
            alert('EXTRACTION TERMINATED // LOGS UPDATED');
            await fetchData(); // Full binary refresh
        } catch (err) {
            alert('TERMINATION FAILED: ' + (err.message || 'System error encountered during abort.'));
        } finally {
            setLoading(false);
        }
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return <Clock size={16} className="text-amber-500" />;
      case 'preparing': return <Zap size={16} className="text-blue-500 animate-pulse" />;
      case 'ready': return <CheckCircle size={16} className="text-green-500" />;
      case 'delivered': return <ShoppingBag size={16} className="text-zinc-500" />;
      case 'cancelled': return <AlertCircle size={16} className="text-red-500" />;
      default: return <Box size={16} />;
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0f0f]">
      <div className="text-primary font-headline font-black tracking-[0.5em] uppercase animate-pulse">Establishing Neural Link...</div>
    </div>
  );

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center bg-black p-10">
      <div className="border-4 border-primary p-12 text-center bg-white">
        <Shield size={60} className="mx-auto mb-6 text-zinc-950" />
        <h1 className="text-4xl font-headline font-black mb-4 uppercase italic tracking-tighter">ACCESS DENIED</h1>
        <p className="text-zinc-500 font-headline text-[10px] tracking-widest font-black uppercase mb-8">Authorization token missing or expired</p>
        <button onClick={() => navigate('/login')} className="px-8 py-4 bg-zinc-950 text-table text-primary font-headline font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all">Authenticate Now</button>
      </div>
    </div>
  );

  return (
    <div className={`relative fade-in min-h-screen px-6 md:px-20 py-24 transition-colors duration-700 ${isDark ? 'bg-[#0d0f0f] text-[#fafaf5]' : 'bg-[#fafaf5] text-zinc-900'}`}>

      {/* Identity Banner */}
      <section className="mb-24">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-8">
           <div className="text-left">
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-12 h-[2px] bg-primary"></div>
                 <span className="font-headline text-xs font-black tracking-[0.5em] uppercase text-primary">IDENTITY AUTHENTICATED</span>
              </div>
              <h2 className="font-headline text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.85]">
                {user.name.split(' ')[0]} <span className="text-primary not-italic">{user.name.split(' ').slice(1).join(' ') || ''}</span>
              </h2>
           </div>
           <div className={`p-8 border-4 flex items-center gap-6 transition-all ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200 shadow-2xl'}`}>
              <div className={`w-4 h-4 rounded-full bg-primary ${loading ? 'animate-ping' : ''}`}></div>
              <div className="space-y-1">
                <span className="font-headline text-[10px] font-black tracking-widest uppercase block">Node Status</span>
                <span className="text-primary font-headline text-xs font-black italic">OPTIMIZED // SECURE</span>
              </div>
           </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-zinc-800 border-4 border-zinc-800 shadow-[40px_40px_0px_0px_rgba(30,30,30,0.05)]">
        
        {/* Biometric Analysis Card */}
        <div className={`lg:col-span-8 p-12 lg:p-20 relative flex flex-col justify-between transition-all ${isDark ? 'bg-[#0d0f0f]' : 'bg-white'}`}>
           <div className="flex justify-between items-start mb-24 flex-wrap gap-8">
              <div className="space-y-4">
                 <p className="font-headline text-[10px] font-black tracking-[0.4em] text-primary uppercase">Assigned Node / Email</p>
                 <p className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic">{user.email}</p>
              </div>
              <div className="bg-primary text-on-primary px-8 py-3 font-headline font-black text-[12px] tracking-widest uppercase shadow-[10px_10px_0px_0px_rgba(0,0,0,0.2)] hover:translate-y-[-4px] transition-transform">
                 Rank: {user.isAdmin ? 'GOVERNOR' : (user.rewardsPoints > 500 ? 'ELITE OPS' : 'CORE RESEARCHER')}
              </div>
           </div>
           
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 border-t-2 border-zinc-100/10 pt-12">
              {[
                { label: "Bookings", value: bookings.length },
                { label: "Productivity", value: user.rewardsPoints + " XP" },
                { label: "Orders", value: orders.length },
                { label: "Stability", value: "99.8%" }
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-3">{stat.label}</p>
                  <p className="font-headline text-5xl font-black tracking-tighter italic">{stat.value}</p>
                </div>
              ))}
           </div>
        </div>

        {/* Real-time Order Tracking Tab */}
        <div className={`lg:col-span-4 p-12 flex flex-col transition-all overflow-hidden ${isDark ? 'bg-zinc-950' : 'bg-zinc-50'}`}>
           <div className="flex items-center gap-4 mb-10">
              <Box size={24} className="text-primary" />
              <h4 className="font-headline text-3xl font-black uppercase tracking-tighter italic">ACTIVE LOGS</h4>
           </div>
           
           <div className="flex-1 space-y-8 overflow-y-auto pr-4 max-h-[600px] custom-scrollbar">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <div key={order._id} className={`p-8 border-l-4 transition-all hover:bg-white/5 group ${
                    order.status === 'Ready' ? 'border-green-500' : 
                    order.status === 'Cancelled' ? 'border-red-500' : 'border-primary'
                  }`}>
                    <div className="flex justify-between items-start mb-6">
                       <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 group-hover:text-primary transition-colors">Extraction #{order._id.slice(-6)}</p>
                       <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 text-[8px] font-black tracking-widest text-primary uppercase">
                          {getStatusIcon(order.status)}
                          {order.status}
                       </div>
                    </div>

                    <div className="flex flex-col gap-4 mb-6">
                       {order.orderItems.map((item, idx) => (
                         <div key={idx} className="space-y-2">
                            <div className="flex justify-between text-[11px] font-bold uppercase tracking-tighter">
                                <span className="text-zinc-400">{item.name}</span>
                                <span className="text-primary font-black">x{item.qty}</span>
                            </div>
                            {item.assignedPersonnel?.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {item.assignedPersonnel.map((name, nIdx) => (
                                        <span key={nIdx} className="bg-primary/10 text-primary text-[8px] font-black px-2 py-0.5 border border-primary/20 uppercase tracking-widest">{name || 'Unnamed Specimen'}</span>
                                    ))}
                                </div>
                            )}
                         </div>
                       ))}
                    </div>

                    {order.labInstructions && (
                        <div className="bg-zinc-900/40 p-4 border border-zinc-800 mb-6 flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-[8px] font-black text-zinc-500 uppercase tracking-widest">
                                <Info size={10} className="text-primary"/> Technician Directive
                            </div>
                            <p className="text-[10px] font-bold italic text-zinc-300 uppercase leading-relaxed text-left">{order.labInstructions}</p>
                        </div>
                    )}

                    <div className="pt-6 border-t border-zinc-100/5 flex justify-between items-center">
                       <div className="flex flex-col">
                          <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">{new Date(order.createdAt).toLocaleDateString()}</span>
                          <span className="text-xl font-headline font-black text-primary italic">${order.totalPrice.toFixed(2)}</span>
                       </div>
                       
                       {/* Termination Protocol */}
                       {order.status === 'Pending' && (
                           <button 
                             onClick={() => handleCancelOrder(order._id)}
                             className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/20 text-[9px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-xl active:scale-95"
                           >
                               <XCircle size={14} /> TERMINATE
                           </button>
                       )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center opacity-30 text-center py-20">
                   <AlertCircle size={40} className="mb-6" />
                   <p className="font-headline font-black uppercase tracking-widest text-xs">No active extractions found in the log.</p>
                </div>
              )}
           </div>

           <button 
            onClick={() => navigate('/menu')}
            className="mt-12 w-full py-5 bg-zinc-950 text-primary border-2 border-primary font-headline font-black uppercase tracking-[0.4em] text-[10px] hover:bg-primary hover:text-white transition-all shadow-xl"
           >
             Initialize New Order
           </button>
        </div>

        {/* System Command Hub */}
        <div className={`lg:col-span-12 p-12 lg:p-20 transition-all ${isDark ? 'bg-[#0d0f0f]' : 'bg-white'}`}>
           <div className="flex items-center gap-6 mb-16">
              <h3 className="font-headline text-3xl font-black uppercase tracking-tighter italic">SYSTEM COMMANDS</h3>
              <div className="flex-1 h-[2px] bg-zinc-100/10"></div>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                { icon: <Shield size={24}/>, label: 'Biometrics', sub: 'Status: Secure', action: null },
                { icon: <Bell size={24}/>, label: 'Comm-Links', sub: 'Channel: Active', action: null },
                { icon: <Activity size={24}/>, label: 'Stability', sub: 'Rate: 99.8%', action: null },
                { icon: <LogOut size={24}/>, label: 'Terminate', sub: 'End Neural Link', action: handleLogout }
              ].map((tool) => (
                <button 
                  key={tool.label} 
                  onClick={tool.action}
                  className={`border-4 p-10 text-left transition-all group overflow-hidden relative ${
                    isDark ? 'bg-zinc-950 border-zinc-900 hover:border-primary shadow-[10px_10px_0px_0px_rgba(30,30,30,1)]' : 
                    'bg-zinc-50 border-zinc-100 hover:border-zinc-950 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.05)]'
                  }`}
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full translate-x-10 translate-y-[-10px] group-hover:scale-150 transition-transform"></div>
                  <div className="text-primary mb-6 transform group-hover:scale-110 transition-transform">{tool.icon}</div>
                  <div className="font-headline text-sm font-black uppercase tracking-widest mb-2 relative z-10">{tool.label}</div>
                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter opacity-60 relative z-10">{tool.sub}</div>
                </button>
              ))}
           </div>
        </div>
      </div>

    </div>
  );
}
