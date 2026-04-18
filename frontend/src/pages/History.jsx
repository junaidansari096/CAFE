import React, { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { ShoppingBag, Calendar, Clock, ChevronRight, Package, Box, Zap, CheckCircle, AlertCircle, Trash2, ArrowRight, Shield, Info, SlidersHorizontal, Search, XCircle } from 'lucide-react';

export default function History() {
  const { isDark } = useOutletContext();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'reservations'
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const [myOrders, myBookings] = await Promise.all([
        api.getMyOrders(),
        api.getMyBookings()
      ]);
      setOrders(myOrders || []);
      setBookings(myBookings || []);
    } catch (err) {
      console.error('History Link Severed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (id) => {
    if (!window.confirm('TERMINATE EXTRACTION PROTOCOL?')) return;
    try {
      await api.cancelOrder(id);
      fetchHistory();
    } catch (err) {
      alert('Termination Failure: ' + err.message);
    }
  };

  if (loading) return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-700 ${isDark ? 'bg-[#0d0f0f]' : 'bg-[#fafaf5]'}`}>
      <div className="text-primary font-headline font-black animate-pulse tracking-[0.5em] text-xs uppercase italic">Synchronizing Neural Archive...</div>
    </div>
  );

  return (
    <div className={`min-h-screen py-24 px-6 md:px-20 transition-colors duration-700 fade-in ${isDark ? 'bg-[#0d0f0f] text-[#fafaf5]' : 'bg-[#fafaf5] text-zinc-900'}`}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-10">
           <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-[2px] bg-primary"></div>
                 <span className="font-headline text-[10px] font-black tracking-[0.4em] uppercase text-primary italic">Operational Cache 04</span>
              </div>
              <h1 className="text-5xl md:text-9xl font-headline font-black uppercase tracking-tighter italic leading-none">
                TACTICAL <span className="text-primary not-italic">LEDGER</span>
              </h1>
           </div>
           
           <div className="flex bg-white dark:bg-zinc-950 border-2 md:border-4 border-zinc-950 p-1 shadow-xl">
              {['orders', 'reservations'].map(tab => (
                 <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 md:px-12 py-3 md:py-4 font-headline font-black text-[9px] md:text-[11px] uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-zinc-950 text-white dark:bg-[#fafaf5] dark:text-zinc-950' : 'text-zinc-400 opacity-50'}`}
                 >
                   {tab} Archive
                 </button>
              ))}
           </div>
        </div>

        {/* Global Filter Bar */}
        <div className="mb-12 flex flex-col md:flex-row gap-6">
           <div className="flex-1 relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors" size={18} />
              <input 
                type="text" 
                placeholder={`Search ${activeTab} by ID or subject...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-zinc-900 border-2 md:border-4 border-zinc-950 dark:border-zinc-800 p-6 pl-16 font-headline font-black uppercase text-[10px] md:text-sm tracking-widest outline-none focus:border-primary transition-all shadow-lg"
              />
           </div>
           <button className="px-10 py-6 bg-zinc-950 text-table text-primary font-headline font-black uppercase tracking-widest text-[10px] hover:bg-primary hover:text-white transition-all italic flex items-center gap-4 shrink-0 shadow-lg">
              <SlidersHorizontal size={16} /> Filters
           </button>
        </div>

        {activeTab === 'orders' ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <div key={order._id} className="bg-white dark:bg-zinc-950 border-4 border-zinc-950 dark:border-zinc-800 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.05)] hover:shadow-primary/5 transition-all group overflow-hidden">
                     <div className="p-8 border-b-2 dark:border-zinc-800 flex justify-between items-center">
                        <div>
                           <span className="block text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-1">Extraction #</span>
                           <span className="font-headline font-black text-lg text-primary uppercase italic">{order._id.slice(-8)}</span>
                        </div>
                        <div className={`px-4 py-1.5 border-2 text-[8px] font-black uppercase tracking-[0.2em] ${
                          order.status === 'Ready' || order.status === 'Delivered' ? 'bg-green-500 text-white border-green-500' : 
                          order.status === 'Cancelled' ? 'bg-red-500 text-white border-red-500' : 'bg-transparent text-primary border-primary'
                        }`}>
                           {order.status}
                        </div>
                     </div>
                     
                     <div className="p-8 space-y-4">
                        <div className="space-y-2">
                           {order.orderItems.map((item, idx) => (
                             <div key={idx} className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tighter">
                                <span className="text-zinc-500 flex-1 truncate pr-4">{item.name}</span>
                                <span className="text-primary font-black shrink-0">x{item.qty}</span>
                             </div>
                           ))}
                        </div>
                        <div className="pt-6 border-t dark:border-zinc-800 flex justify-between items-end">
                           <div>
                              <span className="block text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-1">Date Stamp</span>
                              <span className="text-[10px] font-black uppercase">{new Date(order.createdAt).toLocaleDateString()}</span>
                           </div>
                           <div className="text-right">
                              <span className="block text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-1">Total Yield</span>
                              <span className="text-2xl font-headline font-black text-zinc-950 dark:text-white italic">${order.totalPrice.toFixed(2)}</span>
                           </div>
                        </div>
                     </div>
                     
                     <div className="p-4 bg-zinc-50 dark:bg-zinc-900/50 flex gap-2">
                        <button className="flex-1 h-12 border-2 border-zinc-200 dark:border-zinc-700 font-headline font-black text-[9px] uppercase tracking-widest hover:bg-zinc-950 hover:text-white dark:hover:bg-[#fafaf5] dark:hover:text-zinc-950 transition-all italic flex items-center justify-center gap-2">
                           <Box size={14} /> Full Extract
                        </button>
                        {order.status === 'Pending' && (
                           <button onClick={() => handleCancelOrder(order._id)} className="w-12 h-12 bg-red-50 text-red-500 border-2 border-red-200 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all group">
                             <XCircle size={18} className="group-active:scale-90 transition-transform" />
                           </button>
                        )}
                     </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-40 text-center border-4 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl opacity-30">
                   <Box size={60} className="mx-auto mb-6" />
                   <h3 className="font-headline text-2xl font-black uppercase tracking-[0.2em]">Archive is Empty</h3>
                </div>
              )}
           </div>
        ) : (
           <div className="space-y-10">
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <div key={booking._id} className="bg-white dark:bg-zinc-950 border-4 border-zinc-950 dark:border-zinc-800 p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.05)] flex flex-col md:flex-row justify-between items-center gap-10">
                     <div className="flex flex-col md:flex-row items-center gap-10 text-center md:text-left">
                        <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center text-primary shrink-0 relative">
                           <Calendar size={40} />
                           <div className="absolute -top-3 -right-3 w-8 h-8 bg-zinc-950 text-white flex items-center justify-center rounded-lg font-black text-[10px]">
                             {booking.guests}
                           </div>
                        </div>
                        <div className="space-y-2">
                           <div className="flex items-center gap-4 justify-center md:justify-start">
                              <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Shift Reservation</span>
                              <div className={`px-3 py-1 text-[8px] font-black uppercase tracking-widest border-2 ${
                                booking.status === 'confirmed' ? 'bg-primary text-white border-primary' :
                                booking.status === 'completed' ? 'bg-green-500 text-white border-green-500' : 'bg-transparent border-zinc-200 text-zinc-400'
                              }`}>{booking.status}</div>
                           </div>
                           <h3 className="text-3xl md:text-6xl font-headline font-black uppercase tracking-tighter italic leading-none">{booking.date}</h3>
                           <div className="flex items-center gap-4 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-zinc-400 italic">
                              <span className="text-primary">{booking.time}</span>
                              <span>//</span>
                              <span>Node: {booking.stationType}</span>
                              <span>//</span>
                              <span>{booking.actualOccasion}</span>
                           </div>
                        </div>
                     </div>
                     
                     <div className="flex flex-col gap-4 w-full md:w-auto">
                        <button className="px-10 py-6 bg-zinc-950 text-table text-primary font-headline font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all italic shadow-xl flex items-center justify-center gap-4">
                           Manage Shift <ChevronRight size={16} />
                        </button>
                        <div className="text-[8px] font-black text-center text-zinc-400 uppercase tracking-widest">
                           Logged: {new Date(booking.createdAt || Date.now()).toLocaleString()}
                        </div>
                     </div>
                  </div>
                ))
              ) : (
                <div className="py-40 text-center border-4 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl opacity-30">
                   <Calendar size={60} className="mx-auto mb-6" />
                   <h3 className="font-headline text-2xl font-black uppercase tracking-[0.2em]">Record Cache Vacant</h3>
                </div>
              )}
           </div>
        )}

      </div>
    </div>
  );
}
