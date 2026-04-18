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

      {/* Identity Banner: Compact Mobile Refactor */}
      <section className="mb-12 md:mb-24">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 md:gap-8">
           <div className="text-left">
              <div className="flex items-center gap-3 mb-4 md:mb-8">
                 <div className="w-8 h-[2px] bg-primary"></div>
                 <span className="font-headline text-[10px] font-black tracking-[0.4em] uppercase text-primary">IDENTITY AUTHENTICATED</span>
              </div>
              <h2 className="font-headline text-3xl md:text-8xl font-black tracking-tighter uppercase italic leading-none">
                {user.name.split(' ')[0]} <span className="text-primary not-italic">{user.name.split(' ').slice(1).join(' ') || ''}</span>
              </h2>
           </div>
           <div className={`p-4 md:p-8 border-2 md:border-4 flex items-center gap-4 md:gap-6 transition-all ${isDark ? 'bg-zinc-950 border-zinc-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)]' : 'bg-white border-zinc-200 shadow-xl'}`}>
              <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary ${loading ? 'animate-ping' : ''}`}></div>
              <div className="space-y-0.5 md:space-y-1">
                <span className="font-headline text-[8px] md:text-[10px] font-black tracking-widest uppercase block">Node Status</span>
                <span className="text-primary font-headline text-[10px] md:text-xs font-black italic">OPTIMIZED</span>
              </div>
           </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-zinc-800 border-4 border-zinc-800 shadow-[40px_40px_0px_0px_rgba(30,30,30,0.05)]">
        
        {/* Biometric Analysis Card: 4-Column Micro Grid for Mobile */}
        <div className={`lg:col-span-8 p-6 md:p-12 lg:p-20 relative flex flex-col justify-between transition-all ${isDark ? 'bg-[#0d0f0f]' : 'bg-white'}`}>
           <div className="flex justify-between items-start mb-10 md:mb-24 flex-wrap gap-4 md:gap-8">
              <div className="space-y-2">
                 <p className="font-headline text-[8px] md:text-[10px] font-black tracking-[0.4em] text-primary uppercase">Assigned Node / Email</p>
                 <p className="text-xl md:text-4xl font-black uppercase tracking-tighter italic truncate max-w-[250px] md:max-w-none">{user.email}</p>
              </div>
              <div className="bg-primary text-on-primary px-4 md:px-8 py-2 md:py-3 font-headline font-black text-[10px] md:text-[12px] tracking-widest uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)]">
                 Rank: {user.isAdmin ? 'GOV' : (user.rewardsPoints > 500 ? 'ELITE' : 'CORE')}
              </div>
           </div>
           
           <div className="grid grid-cols-4 gap-4 md:gap-12 border-t border-zinc-100/10 pt-8">
              {[
                { label: "Logs", value: bookings.length },
                { label: "Product", value: user.rewardsPoints },
                { label: "Orders", value: orders.length },
                { label: "Stable", value: "99%" }
              ].map((stat) => (
                <div key={stat.label} className="text-center md:text-left">
                  <p className="text-[7px] md:text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-1 md:mb-3">{stat.label}</p>
                  <p className="font-headline text-xl md:text-5xl font-black tracking-tighter italic">{stat.value}</p>
                </div>
              ))}
           </div>
        </div>

        {/* Real-time Order Tracking: Compact Tactical Feed */}
        <div className={`lg:col-span-4 p-6 md:p-12 flex flex-col transition-all overflow-hidden ${isDark ? 'bg-zinc-950' : 'bg-zinc-50'}`}>
           <div className="flex items-center gap-3 mb-6 md:mb-10">
              <Box size={18} className="text-primary" />
              <h4 className="font-headline text-xl md:text-3xl font-black uppercase tracking-tighter italic">ACTIVE LOGS</h4>
           </div>
           
           <div className="flex-1 space-y-4 md:space-y-8 overflow-y-auto pr-2 max-h-[400px] md:max-h-[600px] custom-scrollbar">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <div key={order._id} className={`p-4 md:p-8 border-l-2 md:border-l-4 transition-all hover:bg-white/5 group ${
                    order.status === 'Ready' ? 'border-green-500' : 
                    order.status === 'Cancelled' ? 'border-red-500' : 'border-primary'
                  }`}>
                    <div className="flex justify-between items-start mb-4 md:mb-6">
                       <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">#{order._id.slice(-6)}</p>
                       <div className="flex items-center gap-1.5 px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-[6px] md:text-[8px] font-black tracking-widest text-primary uppercase">
                          {order.status}
                       </div>
                    </div>
                    
                    <div className="space-y-1 mb-4">
                       {order.orderItems.map((item, idx) => (
                         <div key={idx} className="flex justify-between text-[9px] md:text-[11px] font-bold uppercase tracking-tighter">
                            <span className="text-zinc-500">{item.name}</span>
                            <span className="text-primary font-black">x{item.qty}</span>
                         </div>
                       ))}
                    </div>

                    <div className="pt-3 border-t border-zinc-100/5 flex justify-between items-center">
                       <span className="text-sm md:text-xl font-headline font-black text-primary italic">${order.totalPrice.toFixed(2)}</span>
                       {order.status === 'Pending' && (
                           <button 
                             onClick={() => handleCancelOrder(order._id)}
                             className="px-3 py-1 bg-red-500/10 text-red-500 border border-red-500/20 text-[7px] md:text-[9px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-xl"
                           >
                             ABORT
                           </button>
                       )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center opacity-30 text-center py-10 md:py-20">
                   <AlertCircle size={30} className="mb-4" />
                   <p className="font-headline font-black uppercase tracking-widest text-[8px] md:text-xs">LOGS CLEAR</p>
                </div>
              )}
           </div>

           <button 
            onClick={() => navigate('/menu')}
            className="mt-8 w-full py-4 bg-zinc-950 text-primary border-2 border-primary font-headline font-black uppercase tracking-[0.3em] text-[10px] hover:bg-primary hover:text-white shadow-xl"
           >
             NEW EXTRACTION
           </button>
        </div>

        {/* System Command Hub: 4-Column Fuse for Mobile */}
        <div className={`lg:col-span-12 p-6 md:p-12 lg:p-20 transition-all ${isDark ? 'bg-[#0d0f0f]' : 'bg-white'}`}>
           <div className="flex items-center gap-4 mb-8 md:mb-16">
              <h3 className="font-headline text-xl md:text-3xl font-black uppercase tracking-tighter italic whitespace-nowrap">SYSTEM CMDS</h3>
              <div className="flex-1 h-[1px] md:h-[2px] bg-zinc-100/10"></div>
           </div>
           
           <div className="grid grid-cols-4 md:grid-cols-4 gap-2 md:gap-10">
              {[
                { icon: <Shield size={18}/>, label: 'Sec', action: null },
                { icon: <Bell size={18}/>, label: 'Comm', action: null },
                { icon: <Activity size={18}/>, label: 'Stab', action: null },
                { icon: <LogOut size={18}/>, label: 'Exit', action: handleLogout }
              ].map((tool) => (
                <button 
                  key={tool.label} 
                  onClick={tool.action}
                  className={`border md:border-4 p-3 md:p-10 text-center transition-all group overflow-hidden relative flex flex-col items-center justify-center gap-1 ${
                    isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-200 shadow-sm'
                  } active:scale-95`}
                >
                  <div className="text-primary transition-transform group-hover:scale-110">{tool.icon}</div>
                  <div className="font-headline text-[7px] md:text-sm font-black uppercase tracking-widest">{tool.label}</div>
                </button>
              ))}
           </div>
        </div>
      </div>

    </div>
  );
}
