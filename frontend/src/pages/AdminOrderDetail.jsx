import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { ChevronLeft, Package, User, CreditCard, Activity, Clock, Inbox, Shield, Box, Zap, Truck, CheckCircle, AlertCircle, ShoppingBag, Info } from 'lucide-react';

export default function AdminOrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const data = await api.getOrderById(id);
      setOrder(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (status) => {
    try {
      await api.adminUpdateOrderStatus(id, status);
      fetchOrder();
    } catch (err) {
      alert('Operational Failure: ' + err.message);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0d0f0f] flex items-center justify-center p-10">
      <div className="text-primary font-headline font-black animate-pulse tracking-[0.5em] text-sm uppercase italic">ANALYZING EXTRACTION DATA...</div>
    </div>
  );

  if (error || !order) return (
    <div className="min-h-screen flex items-center justify-center bg-black p-10">
      <div className="border-4 border-red-600 p-12 text-center bg-red-950/20 max-w-2xl">
        <Shield className="w-20 h-20 text-red-600 mx-auto mb-8" />
        <h1 className="text-white font-headline text-2xl font-black mb-4 uppercase italic tracking-tighter">DATA LINK SEVERED</h1>
        <p className="text-red-500 font-headline text-[10px] tracking-widest font-black uppercase mb-8">{error || 'Order record not found in the tactical archives.'}</p>
        <button onClick={() => navigate('/admin')} className="px-8 py-4 bg-red-600 text-white font-headline font-black uppercase tracking-widest text-[10px]">Return to Ops</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fafaf5] text-zinc-900 py-20 px-4 sm:px-10 lg:px-20 fade-in">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
          <button 
            onClick={() => navigate('/admin')}
            className="flex items-center gap-2 group text-zinc-400 hover:text-primary transition-colors"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-2 transition-transform" />
            <span className="font-headline font-black text-[10px] uppercase tracking-widest">Back to Dashboard</span>
          </button>
          
          <div className="flex flex-col md:items-end">
            <span className="font-headline text-[10px] font-black tracking-[0.4em] uppercase text-primary mb-2">Extraction Order #{order._id.slice(-8).toUpperCase()}</span>
            <div className="flex items-center gap-4">
               <h1 className="text-4xl md:text-6xl font-headline font-black text-zinc-950 uppercase tracking-tighter leading-none italic">
                 DATA <span className="text-primary not-italic">REPORT</span>
               </h1>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Visual Data / Items Card */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Specimen Registry */}
            <div className="bg-white border-4 border-zinc-950 shadow-[15px_15px_0px_0px_rgba(0,0,0,0.05)] overflow-hidden">
               <div className="bg-zinc-950 p-6 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Box size={18} className="text-primary" />
                    <h3 className="text-white font-headline font-black text-xl uppercase tracking-tighter italic">SPECIMEN REGISTRY</h3>
                  </div>
                  <span className="text-primary font-headline font-black text-[10px] tracking-widest uppercase opacity-50">{order.orderItems.length} ENTRIES</span>
               </div>
               
               <div className="divide-y-2 divide-zinc-50">
                  {order.orderItems.map((item, idx) => (
                    <div key={idx} className="p-6 md:p-8 flex items-center justify-between hover:bg-zinc-50/50 transition-colors group">
                       <div className="flex items-center gap-6">
                          <div className="w-16 h-16 md:w-20 md:h-20 bg-zinc-100 border-2 border-zinc-200 overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                             <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="space-y-1">
                             <h4 className="text-lg md:text-xl font-black uppercase tracking-tighter leading-tight">{item.name}</h4>
                             <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Sector: {item.category || 'EXTRACT'}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <div className="font-headline font-black text-xl md:text-2xl italic text-primary">x{item.qty}</div>
                          <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">${(item.price * item.qty).toFixed(2)}</div>
                       </div>
                    </div>
                  ))}
               </div>
               
               <div className="bg-zinc-50 p-6 md:p-10 border-t-4 border-zinc-950 flex flex-col items-end gap-2">
                  <div className="flex justify-between w-full md:w-64 text-zinc-400 font-headline font-black text-[10px] uppercase tracking-widest">
                     <span>SUB-CAPACITY</span>
                     <span>${(order.totalPrice * 0.9).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between w-full md:w-64 text-zinc-400 font-headline font-black text-[10px] uppercase tracking-widest">
                     <span>TAX/LOGISTICS</span>
                     <span>${(order.totalPrice * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between w-full md:w-64 text-zinc-950 font-headline font-black text-2xl md:text-4xl uppercase italic tracking-tighter pt-4 border-t border-zinc-200">
                     <span className="text-primary not-italic text-sm pt-2">TOTAL YIELD</span>
                     <span>${order.totalPrice.toFixed(2)}</span>
                  </div>
               </div>
            </div>

            {/* Tactical Directives / Instructions */}
            <div className="bg-white border-4 border-zinc-950 p-8 md:p-12 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 -mr-16 -mt-16 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
               <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 bg-zinc-950 flex items-center justify-center text-primary group-hover:rotate-12 transition-transform">
                     <Info size={20} />
                  </div>
                  <h3 className="font-headline text-2xl font-black uppercase tracking-tighter italic">LAB DIRECTIVES</h3>
               </div>
               <div className="relative">
                 <p className="text-sm md:text-base font-bold text-zinc-600 leading-relaxed italic border-l-4 border-primary pl-6 py-2">
                   {order.labInstructions || "NO SPECIAL DIRECTIVES COMMITTED BY SUBJECT. PROCEED WITH STANDARD EXTRACTION PROTOCOLS."}
                 </p>
                 <div className="mt-8 flex gap-3 flex-wrap">
                    <span className="px-3 py-1 bg-zinc-100 border border-zinc-200 text-[8px] font-black uppercase tracking-widest text-zinc-400">P-MET: {order.paymentMethod || 'SECURE'}</span>
                    <span className="px-3 py-1 bg-zinc-100 border border-zinc-200 text-[8px] font-black uppercase tracking-widest text-zinc-400">STAMP: {new Date(order.createdAt).toLocaleString()}</span>
                 </div>
               </div>
            </div>
          </div>

          {/* Sidebar Area: Subject Identity & Status Modulation */}
          <div className="lg:col-span-4 space-y-10">
            
            {/* Subject Identity */}
            <div className="bg-zinc-950 p-8 md:p-10 border-4 border-zinc-950 shadow-[15px_15px_0px_0px_rgba(184,207,136,1)]">
               <div className="flex items-center gap-4 mb-8">
                 <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white">
                    <User size={24} />
                 </div>
                 <h3 className="text-white font-headline text-2xl font-black uppercase tracking-tighter italic">SUBJECT DATA</h3>
               </div>
               
               <div className="space-y-6">
                  <div className="space-y-1">
                     <span className="text-[9px] font-black text-primary uppercase tracking-[0.3em]">Identity Hub</span>
                     <p className="text-white font-headline text-xl font-black tracking-tighter">{order.shippingAddress?.guestName || order.user?.name || 'CITIZEN'}</p>
                  </div>
                  <div className="space-y-1">
                     <span className="text-[9px] font-black text-primary uppercase tracking-[0.3em]">Neural Net / Email</span>
                     <p className="text-zinc-400 text-xs font-bold break-all">{order.user?.email || 'OFFLINE'}</p>
                  </div>
                  <div className="space-y-1">
                     <span className="text-[9px] font-black text-primary uppercase tracking-[0.3em]">Drop Coordinates</span>
                     <p className="text-zinc-100 text-[10px] font-bold uppercase leading-relaxed">
                        {order.shippingAddress?.address ? (
                          <>
                            {order.shippingAddress.address}<br/>
                            {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br/>
                            {order.shippingAddress.country}
                          </>
                        ) : 'COLLECTION AT SOURCE'}
                     </p>
                  </div>
               </div>
            </div>

            {/* Protocol Status Modulation */}
            <div className="bg-white border-4 border-zinc-950 p-8 md:p-10">
               <div className="flex items-center gap-4 mb-8">
                 <div className="w-12 h-12 border-4 border-zinc-950 flex items-center justify-center text-zinc-950">
                    <Activity size={24} />
                 </div>
                 <h3 className="font-headline text-2xl font-black uppercase tracking-tighter italic">PROTOCOL STATE</h3>
               </div>

               <div className="space-y-6">
                  <div className={`p-6 text-center border-4 transition-all ${
                    order.status === 'Pending' ? 'bg-amber-50 border-amber-500 text-amber-700' :
                    order.status === 'Preparing' ? 'bg-blue-50 border-blue-500 text-blue-700' :
                    order.status === 'Ready' ? 'bg-green-50 border-green-500 text-green-700' :
                    order.status === 'Delivered' ? 'bg-zinc-50 border-zinc-950 text-zinc-500' :
                    'bg-red-50 border-red-500 text-red-700'
                  }`}>
                     <span className="block text-[8px] font-black uppercase tracking-[0.5em] mb-2 opacity-50 underline decoration-2">CURRENT PHASE</span>
                     <span className="text-3xl font-headline font-black uppercase italic tracking-tighter">{order.status}</span>
                  </div>

                  <div className="space-y-3 pt-6">
                     <span className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.3em] block mb-4">MODULATE PHASE</span>
                     <div className="grid grid-cols-1 gap-2">
                        {[
                          { status: 'Pending', icon: <Clock size={14}/>, color: 'hover:bg-amber-500' },
                          { status: 'Preparing', icon: <Zap size={14}/>, color: 'hover:bg-blue-500' },
                          { status: 'Ready', icon: <CheckCircle size={14}/>, color: 'hover:bg-green-500' },
                          { status: 'Delivered', icon: <Truck size={14}/>, color: 'hover:bg-zinc-950' },
                          { status: 'Cancelled', icon: <AlertCircle size={14}/>, color: 'hover:bg-red-500' }
                        ].map((btn) => (
                           <button 
                             key={btn.status}
                             onClick={() => handleUpdateStatus(btn.status)}
                             className={`flex items-center justify-between w-full p-4 border-2 border-zinc-100 font-headline font-black text-[10px] uppercase tracking-widest transition-all ${btn.color} hover:text-white hover:border-transparent active:scale-95`}
                           >
                             <div className="flex items-center gap-3">
                               {btn.icon}
                               {btn.status}
                             </div>
                             {order.status === btn.status && <div className="w-2 h-2 bg-current rounded-full"></div>}
                           </button>
                        ))}
                     </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
