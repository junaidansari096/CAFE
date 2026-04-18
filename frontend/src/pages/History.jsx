import React, { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { ShoppingBag, Calendar, Clock, ChevronRight, Package, Box, Zap, CheckCircle, AlertCircle, Trash2, ArrowRight, Shield, Info, SlidersHorizontal, Search, XCircle, Grid3X3, Database } from 'lucide-react';

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
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-700 ${isDark ? 'bg-[#000000]' : 'bg-[#fafaf5]'}`}>
      <div className="flex flex-col items-center gap-6">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <div className="text-primary font-headline font-black tracking-[0.6em] text-[10px] uppercase italic animate-pulse">Syncing Neural Archive...</div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen pt-32 pb-24 px-6 md:px-20 transition-colors duration-700 relative overflow-hidden ${isDark ? 'bg-[#000000] text-[#fafaf5]' : 'bg-[#fafaf5] text-zinc-900'}`}>
      
      {/* Neural Grid Backdrop */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, ${isDark ? '#b8cf88' : '#000000'} 1px, transparent 0)`, backgroundSize: '40px 40px' }}></div>
      <div className={`absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none`}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Tactical Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-10">
           <div className="space-y-6">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-1 bg-primary"></div>
                 <span className="font-headline text-[10px] font-black tracking-[0.5em] uppercase text-primary">Operational Archive // Ver 3.2</span>
              </div>
              <h1 className="text-6xl md:text-[10rem] font-headline font-black uppercase tracking-tighter italic leading-[0.8]">
                TACTICAL <br/>
                <span className="text-primary not-italic">ARCHIVE</span>
              </h1>
              <p className="font-medium text-zinc-500 max-w-xl text-lg md:text-xl">
                Cryptographically secured logs of every molecular extraction and shift reservation assigned to this node.
              </p>
           </div>
           
           <div className="flex bg-white dark:bg-zinc-900 border-4 border-zinc-950 p-1.5 shadow-[20px_20px_60px_-15px_rgba(0,0,0,0.5)]">
              {['orders', 'reservations'].map(tab => (
                 <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 md:px-14 py-4 md:py-5 font-headline font-black text-[10px] md:text-xs uppercase tracking-[0.3em] transition-all relative overflow-hidden group ${
                    activeTab === tab 
                      ? 'bg-zinc-950 text-table text-primary' 
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                 >
                   <div className="relative z-10">{tab}</div>
                   {activeTab === tab && <div className="absolute inset-0 bg-primary/10 animate-pulse"></div>}
                 </button>
              ))}
           </div>
        </div>

        {/* Tactical Filter Module */}
        <div className="mb-20 grid grid-cols-1 md:grid-cols-12 gap-6">
           <div className="md:col-span-9 relative group">
              <div className="absolute left-8 top-1/2 -translate-y-1/2 text-primary transition-transform group-focus-within:scale-110">
                <Search size={20} strokeWidth={3} />
              </div>
              <input 
                type="text" 
                placeholder={`INPUT SEARCH PARAMETERS FOR ${activeTab.toUpperCase()}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-zinc-900/50 backdrop-blur-md border-4 border-zinc-950 dark:border-zinc-800 p-8 pl-20 font-headline font-black uppercase text-[10px] md:text-sm tracking-[0.2em] outline-none focus:border-primary focus:bg-primary/5 transition-all shadow-2xl placeholder:opacity-30"
              />
           </div>
           <button className="md:col-span-3 h-full bg-primary text-on-primary font-headline font-black uppercase tracking-[0.4em] text-[10px] md:text-xs hover:translate-y-[-4px] active:translate-y-[2px] transition-all shadow-[0_20px_40px_-15px_rgba(184,207,136,0.5)] italic flex items-center justify-center gap-4">
              <SlidersHorizontal size={18} strokeWidth={3} /> Filter Cache
           </button>
        </div>

        {activeTab === 'orders' ? (
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <div key={order._id} className="bg-white dark:bg-zinc-900 border-4 border-zinc-950 dark:border-zinc-800 shadow-[20px_20px_60px_-15px_rgba(0,0,0,0.3)] hover:border-primary/50 transition-all group relative overflow-hidden">
                     {/* Status Badge Internal */}
                     <div className={`absolute top-0 right-0 px-6 py-3 font-headline font-black text-[9px] uppercase tracking-widest italic border-b-2 border-l-2 rotate-0 z-20 ${
                       order.status === 'Ready' || order.status === 'Delivered' ? 'bg-primary text-on-primary border-primary' : 
                       order.status === 'Cancelled' ? 'bg-red-500 text-white border-red-500' : 'bg-zinc-950 text-primary border-zinc-800'
                     }`}>
                        {order.status}
                     </div>

                     <div className="p-10 md:p-14">
                        <div className="flex justify-between items-start mb-12">
                           <div className="space-y-1">
                              <span className="block text-[8px] font-black text-primary uppercase tracking-[0.5em] mb-2 opacity-50">Extractions.LOG // Logged</span>
                              <h3 className="text-2xl md:text-4xl font-headline font-black uppercase tracking-tighter italic">#{order._id.slice(-8)}</h3>
                              <p className="text-[10px] font-black opacity-40 uppercase tracking-widest">{new Date(order.createdAt).toUTCString()}</p>
                           </div>
                        </div>

                        <div className="space-y-6 mb-12 border-y-2 border-zinc-800 py-10">
                           {order.orderItems.map((item, idx) => (
                             <div key={idx} className="flex justify-between items-center group/item">
                                <div className="flex items-center gap-4">
                                   <div className="w-1.5 h-1.5 bg-primary rounded-full group-hover/item:scale-150 transition-transform"></div>
                                   <span className="text-xs md:text-sm font-black uppercase tracking-widest text-zinc-400 group-hover/item:text-white transition-colors">{item.name}</span>
                                </div>
                                <span className="font-headline font-black text-primary text-sm shrink-0 italic">x{item.qty}</span>
                             </div>
                           ))}
                        </div>

                        <div className="flex justify-between items-center">
                           <div className="space-y-1">
                              <span className="block text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-1">Neural Yield</span>
                              <div className="text-4xl md:text-6xl font-headline font-black text-primary italic leading-none">${order.totalPrice.toFixed(2)}</div>
                           </div>
                           
                           {order.status === 'Pending' && (
                              <button 
                                onClick={() => handleCancelOrder(order._id)} 
                                className="w-16 h-16 rounded-full border-4 border-red-500/20 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white hover:border-red-500 transition-all group shadow-2xl active:scale-90"
                                title="Abort Extraction"
                              >
                                <XCircle size={28} strokeWidth={3} />
                              </button>
                           )}
                        </div>
                     </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-40 text-center border-4 border-dashed border-zinc-800 rounded-3xl opacity-20 bg-zinc-950/20 backdrop-blur-sm">
                   <Database size={80} className="mx-auto mb-8 text-primary opacity-20" />
                   <h3 className="font-headline text-3xl font-black uppercase tracking-[0.3em] mb-4">No Historical Data</h3>
                   <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Initiate an extraction to populate the archive.</p>
                </div>
              )}
           </div>
        ) : (
           <div className="space-y-10">
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <div key={booking._id} className="bg-white dark:bg-zinc-900 border-4 border-zinc-950 dark:border-zinc-800 p-10 md:p-16 shadow-[20px_20px_60px_-15px_rgba(0,0,0,0.3)] hover:border-primary/50 transition-all group flex flex-col md:flex-row justify-between items-center gap-12 relative overflow-hidden">
                     
                     <div className={`absolute top-0 right-0 px-8 py-3 font-headline font-black text-[10px] uppercase tracking-widest italic border-b-2 border-l-2 z-20 ${
                       booking.status === 'confirmed' ? 'bg-primary text-on-primary border-primary' :
                       booking.status === 'completed' ? 'bg-zinc-950 text-primary border-zinc-800' : 'bg-red-500 text-white border-red-500'
                     }`}>
                        {booking.status}
                     </div>

                     <div className="flex flex-col md:flex-row items-center gap-12 text-center md:text-left flex-1">
                        <div className="w-32 h-32 bg-primary/10 border-4 border-primary/20 rounded-full flex items-center justify-center text-primary shrink-0 relative group-hover:bg-primary/20 transition-all duration-700">
                           <Calendar size={50} strokeWidth={2.5} />
                           <div className="absolute -top-4 -right-4 w-12 h-12 bg-zinc-950 text-primary flex items-center justify-center border-4 border-primary font-black text-sm italic shadow-2xl">
                             {booking.guests}
                           </div>
                        </div>
                        <div className="space-y-4">
                           <div className="flex items-center gap-4 justify-center md:justify-start">
                              <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em] opacity-50">Shift.RESERVE // Registered</span>
                           </div>
                           <h3 className="text-4xl md:text-8xl font-headline font-black uppercase tracking-tighter italic leading-none">{booking.date}</h3>
                           <div className="flex flex-wrap items-center gap-6 text-[10px] md:text-sm font-black uppercase tracking-[0.2em] text-zinc-500 italic">
                              <span className="flex items-center gap-2 text-primary"><Clock size={16}/> {booking.time}</span>
                              <span className="opacity-20">//</span>
                              <span className="flex items-center gap-2"><Grid3X3 size={16}/> {booking.stationType}</span>
                              <span className="opacity-20">//</span>
                              <span className="flex items-center gap-2 uppercase">{booking.actualOccasion}</span>
                           </div>
                        </div>
                     </div>
                     
                     <div className="w-full md:w-auto h-full flex flex-col justify-center">
                        <div className="text-[9px] font-black text-center text-primary/40 uppercase tracking-[0.4em] mb-4">LOG DATA REF: #{booking._id.slice(-6)}</div>
                        <div className="p-6 border-2 border-zinc-800 bg-zinc-950/50 backdrop-blur-sm">
                           <p className="text-[10px] font-medium text-zinc-500 leading-relaxed uppercase tracking-widest italic font-headline">Verified shift protocols active for this node.</p>
                        </div>
                     </div>
                  </div>
                ))
              ) : (
                <div className="py-40 text-center border-4 border-dashed border-zinc-800 rounded-3xl opacity-20 bg-zinc-950/20 backdrop-blur-sm">
                   <Calendar size={80} className="mx-auto mb-8 text-primary opacity-20" />
                   <h3 className="font-headline text-3xl font-black uppercase tracking-[0.3em] mb-4">Record Cache Vacant</h3>
                   <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Secure a station to initiate shift tracking.</p>
                </div>
              )}
           </div>
        )}

      </div>
    </div>
  );
}
