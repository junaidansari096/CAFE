import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { Users, Star, Calendar, Check, X, Shield, BarChart3, Package, Plus, Zap, Percent, Info, Activity, ShoppingBag, Image as ImageIcon, Settings, Trash2, Edit2 } from 'lucide-react';
import { ASSETS } from '../constants/assets';

export default function Admin() {
  const [stats, setStats] = useState({ users: 0, reviews: 0, bookings: 0, products: 0, orders: 0 });
  const [reviews, setReviews] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('orders'); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Product Form State
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productFormData, setProductFormData] = useState({
    title: '', price: '', discountPrice: '', category: '', description: '', image: '', availability: true, featured: false
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.isAdmin) {
      setError('ACCESS DENIED: Administrative Privileges Required');
      setLoading(false);
      return;
    }
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const [allReviews, allBookings, allProducts, allOrders] = await Promise.all([
        api.adminGetAllReviews(),
        api.adminGetAllBookings(),
        api.getProducts(),
        api.adminGetAllOrders()
      ]);

      setReviews(allReviews || []);
      setBookings(allBookings || []);
      setProducts(allProducts || []);
      setOrders(allOrders || []);
      
      setStats({
        users: 124, 
        reviews: (allReviews || []).length,
        bookings: (allBookings || []).filter(b => b.status === 'pending').length,
        products: (allProducts || []).length,
        orders: (allOrders || []).filter(o => o.status === 'Pending').length
      });
      setLoading(false);
    } catch (err) {
      setError(err.message || 'The Control Center terminal is offline.');
      setLoading(false);
    }
  };

  const handleUpdateBooking = async (id, status) => {
    try {
      await api.adminUpdateBookingStatus(id, status);
      setBookings(bookings.map(b => b._id === id ? { ...b, status } : b));
      fetchAdminData();
    } catch (err) { alert('Failed to update booking'); }
  };

  const handleUpdateOrder = async (id, status) => {
    try {
      await api.adminUpdateOrderStatus(id, status);
      setOrders(orders.map(o => o._id === id ? { ...o, status } : o));
      fetchAdminData();
    } catch (err) { alert('Failed to update order'); }
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setProductFormData({
      title: product.title,
      price: product.price,
      discountPrice: product.discountPrice || '',
      category: product.category,
      description: product.description,
      image: product.image,
      availability: product.availability,
      featured: product.featured || false
    });
    setShowProductForm(true);
    // Debug: alert('EDIT NODE OPENED');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingProduct) {
        await api.adminUpdateProduct(editingProduct._id, productFormData);
        alert('SPECIMEN MODIFIED SUCCESSFULLY');
      } else {
        await api.adminCreateProduct(productFormData);
        alert('NEW SPECIMEN COMMITTED TO DATABASE');
      }
      setShowProductForm(false);
      setEditingProduct(null);
      setProductFormData({ title: '', price: '', discountPrice: '', category: '', description: '', image: '', availability: true, featured: false });
      await fetchAdminData();
    } catch (err) {
      alert('Operational Failure: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('PURGE SPECIMEN?')) return;
    try {
      await api.adminDeleteProduct(id);
      setProducts(prev => prev.filter(p => p._id !== id));
      // Update stats locally
      setStats(prev => ({ ...prev, products: prev.products - 1 }));
      alert('PURGE SUCCESSFUL');
    } catch (err) { 
      console.error('Delete product failed:', err);
      alert('FAILURE: ' + err.message); 
    }
  };

  const handleSeedData = async () => {
    const seedProducts = [
      { title: "Neon Espresso", price: "$6.50", category: "COFFEE", description: "Sonic-aged beans extracted at 14 bars. Carbon-filtered result.", image: ASSETS.SEED_IMAGES.ESPRESSO, featured: true },
      { title: "Cryo-Brew", price: "$8.00", category: "COFFEE", description: "48-hour cold maceration. Sub-zero thermal state.", image: ASSETS.SEED_IMAGES.CRYO_BREW, featured: true },
      { title: "Quantum Latte", price: "$7.25", category: "COFFEE", description: "Dual-state: thermal core and chilled mantle.", image: ASSETS.SEED_IMAGES.LATTE },
      { title: "Olive Extract", price: "$9.50", category: "TEA", description: "Single-origin Yirgacheffe. Saline-optimized catalyst.", image: ASSETS.SEED_IMAGES.TEA },
      { title: "Nebula Tart", price: "$12.00", category: "PASTRIES", description: "Molecular crust with neon-infused core.", image: ASSETS.SEED_IMAGES.PASTRY }
    ];

    try {
      setLoading(true);
      for (const p of seedProducts) {
        await api.adminCreateProduct(p);
      }
      await fetchAdminData();
      alert('DATABASE SYNC COMPLETED');
    } catch (err) {
      alert('Sync Bridge Interrupted');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !stats.products) return (
    <div className="min-h-screen bg-[#0d0f0f] flex items-center justify-center p-10">
      <div className="text-primary font-headline font-black animate-pulse tracking-[0.5em] text-sm uppercase italic">CONNECTING TO CONTROL CENTER...</div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-black p-10">
      <div className="border-4 border-red-600 p-12 text-center bg-red-950/20">
        <Shield className="w-20 h-20 text-red-600 mx-auto mb-8" />
        <h1 className="text-white font-headline text-4xl font-black mb-4 uppercase italic tracking-tighter">{error}</h1>
        <p className="text-red-500 font-headline text-[10px] tracking-widest font-black uppercase">Directivity Violation Detected</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fafaf5] text-zinc-900 transition-colors duration-700 py-20 px-4 sm:px-10 lg:px-20 fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-[2px] bg-primary"></div>
              <span className="font-headline text-[10px] font-black tracking-[0.5em] uppercase text-primary">System 14 // Administrative Node</span>
            </div>
            <div className="flex items-center gap-6">
               <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined text-white text-3xl">{ASSETS.BRAND_ICON}</span>
               </div>
               <h1 className="text-6xl md:text-8xl font-headline font-black text-zinc-950 flex items-center gap-4 uppercase tracking-tighter leading-none italic">
                 CONTROL <span className="text-primary not-italic">CENTER</span>
               </h1>
            </div>
          </div>
          
          <div className="flex border-4 border-zinc-950 p-1 bg-white">
             {['orders', 'products', 'bookings', 'reviews'].map(tab => (
               <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-4 font-headline font-black text-[10px] uppercase tracking-[0.2em] transition-all ${activeTab === tab ? 'bg-zinc-950 text-[#fafaf5]' : 'bg-transparent text-zinc-400 hover:text-zinc-900'}`}
               >
                 {tab}
               </button>
             ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <StatCard icon={<Package />} label="Protocol Specimens" value={stats.products} color="primary" />
          <StatCard icon={<Activity />} label="Active Queue" value={stats.orders} color="primary" />
          <StatCard icon={<Calendar />} label="Sync Shifts" value={stats.bookings} />
          <StatCard icon={<Star />} label="Log Reports" value={stats.reviews} />
        </div>

        {activeTab === 'orders' ? (
           <OrdersTable orders={orders} onUpdate={handleUpdateOrder} />
        ) : activeTab === 'products' ? (
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-center bg-zinc-950 p-8 border-4 border-zinc-950 shadow-[10px_10px_0px_0px_rgba(30,30,30,0.1)] gap-6">
               <h2 className="text-white font-headline font-black text-2xl uppercase italic tracking-tighter">SPECIMEN CATALOG // {products.length} ENTRIES</h2>
               <div className="flex gap-4">
                 <button onClick={handleSeedData} className="px-6 py-3 border-2 border-primary text-primary font-headline font-black text-[10px] tracking-widest hover:bg-primary hover:text-on-primary transition-all uppercase">Source Defaults</button>
                 <button 
                    onClick={() => { setEditingProduct(null); setProductFormData({ title: '', price: '', discountPrice: '', category: '', description: '', image: '', availability: true, featured: false }); setShowProductForm(!showProductForm); }} 
                    className="px-6 py-3 bg-primary text-on-primary font-headline font-black text-[10px] tracking-widest hover:scale-105 transition-all active:scale-95 shadow-lg flex items-center gap-2 uppercase"
                 >
                   {showProductForm ? <><X size={14}/> Close Terminal</> : <><Plus size={14}/> Induct Specimen</>}
                 </button>
               </div>
            </div>

            {showProductForm && (
              <div className="bg-white border-4 border-zinc-950 p-10 shadow-[20px_20px_0px_0px_rgba(184,207,136,1)] fade-in">
                <form onSubmit={handleProductSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <InputGroup icon={<Info size={14}/>} label="Specimen Identity" value={productFormData.title} onChange={v => setProductFormData({...productFormData, title: v})} />
                    <div className="grid grid-cols-2 gap-6">
                      <InputGroup icon={<Zap size={14}/>} label="Base Yield ($)" value={productFormData.price} placeholder="$0.00" onChange={v => setProductFormData({...productFormData, price: v})} />
                      <InputGroup icon={<Percent size={14}/>} label="Promo Yield ($)" value={productFormData.discountPrice} placeholder="$0.00" onChange={v => setProductFormData({...productFormData, discountPrice: v})} />
                    </div>
                    <InputGroup label="Sector / Category" value={productFormData.category} placeholder="COFFEE, TEA, PASTRIES" onChange={v => setProductFormData({...productFormData, category: v})} />
                    <div className="flex gap-8 items-center pt-4">
                       <ToggleGroup label="Availability" active={productFormData.availability} onToggle={v => setProductFormData({...productFormData, availability: v})} />
                       <ToggleGroup label="Featured" active={productFormData.featured} onToggle={v => setProductFormData({...productFormData, featured: v})} />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <InputGroup icon={<ImageIcon size={14}/>} label="Visual URI (Image URL)" value={productFormData.image} onChange={v => setProductFormData({...productFormData, image: v})} />
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Biological Description</label>
                       <textarea 
                        value={productFormData.description} 
                        onChange={e => setProductFormData({...productFormData, description: e.target.value})}
                        className="w-full h-40 bg-zinc-50 border-2 border-zinc-200 p-6 font-medium outline-none focus:border-primary transition-all text-sm"
                        placeholder="Detail the molecular composition..."
                       />
                    </div>
                    <button type="submit" className="w-full h-20 bg-zinc-950 text-table text-primary font-headline font-black uppercase tracking-[0.4em] text-sm hover:bg-primary hover:text-on-primary transition-all italic shadow-2xl">
                      {editingProduct ? 'COMMIT MODIFICATIONS' : 'FINALIZE INDUCTION'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="bg-white border-4 border-zinc-950 overflow-hidden shadow-[20px_20px_0px_0px_rgba(0,0,0,0.05)]">
              <div className="overflow-x-auto">
                <table className="w-full text-left font-headline font-bold text-xs uppercase italic">
                  <thead className="bg-zinc-50 text-zinc-500 text-[10px] tracking-widest border-b-2 border-zinc-100">
                    <tr>
                      <th className="px-8 py-6">Specimen</th>
                      <th className="px-8 py-6">Identity</th>
                      <th className="px-8 py-6">Economics</th>
                      <th className="px-8 py-6">State</th>
                      <th className="px-8 py-6">Commands</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {products.map((product) => (
                      <tr key={product._id} className="hover:bg-zinc-50/50 transition-colors">
                        <td className="px-8 py-8">
                          <div className={`w-20 h-20 border-2 grayscale hover:grayscale-0 transition-all relative ${product.featured ? 'border-primary ring-4 ring-primary/10' : 'border-zinc-200'}`}>
                            <img src={product.image} className="w-full h-full object-cover" alt={product.title} />
                            {product.featured && <div className="absolute -top-3 -right-3 bg-primary text-white text-[8px] px-2 py-1 font-black shadow-lg">FEATURED</div>}
                          </div>
                        </td>
                        <td className="px-8 py-8">
                           <div className="text-zinc-950 text-base">{product.title}</div>
                           <div className="text-primary text-[9px] tracking-widest mt-1 opacity-70">{product.category}</div>
                        </td>
                        <td className="px-8 py-8">
                           {product.discountPrice ? (
                             <div className="flex flex-col">
                               <span className="text-zinc-300 line-through text-[10px]">{product.price}</span>
                               <span className="text-red-500 text-xl font-black">{product.discountPrice}</span>
                             </div>
                           ) : (
                             <span className="text-zinc-950 text-xl font-black">{product.price}</span>
                           )}
                        </td>
                        <td className="px-8 py-8">
                           <div className={`inline-block px-4 py-2 border-2 text-[9px] tracking-[0.2em] font-black ${product.availability ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
                             {product.availability ? 'ONLINE' : 'DEACTIVATED'}
                           </div>
                        </td>
                        <td className="px-8 py-8">
                          <div className="flex gap-4">
                            <button type="button" onClick={() => handleOpenEdit(product)} className="w-14 h-14 border-2 border-zinc-200 flex items-center justify-center hover:bg-zinc-950 hover:text-white transition-all shadow-md group">
                              <Settings size={20} className="group-hover:rotate-90 transition-transform duration-500" />
                            </button>
                            <button type="button" onClick={() => handleDeleteProduct(product._id)} className="w-14 h-14 border-2 border-zinc-200 flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-600 transition-all shadow-md group">
                              <Trash2 size={20} className="group-hover:scale-110 group-active:scale-90 transition-transform" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : activeTab === 'bookings' ? (
           <BookingsTable bookings={bookings} onUpdate={handleUpdateBooking} onReschedule={(id, d, t) => api.adminUpdateBooking(id, { date: d, time: t }).then(fetchAdminData)} />
        ) : (
           <ReviewsTable reviews={reviews} onApprove={id => api.adminApproveReview(id).then(fetchAdminData)} onDelete={id => api.adminDeleteReview(id).then(fetchAdminData)} />
        )}
      </div>
    </div>
  );
}

// Sub-components for cleaner structure
function InputGroup({ label, value, onChange, placeholder, icon }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 flex items-center gap-2">
        {icon} {label}
      </label>
      <input 
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-zinc-50 border-2 border-zinc-200 p-6 font-headline font-black uppercase text-xs outline-none focus:border-primary transition-all"
      />
    </div>
  );
}

function ToggleGroup({ label, active, onToggle }) {
  return (
    <button 
      type="button"
      onClick={() => onToggle(!active)}
      className="flex items-center gap-4 group"
    >
      <div className={`w-12 h-6 border-2 transition-all p-1 ${active ? 'bg-primary border-primary' : 'bg-zinc-200 border-zinc-200'}`}>
        <div className={`w-3 h-3 bg-white transition-all ${active ? 'translate-x-6' : 'translate-x-0'}`}></div>
      </div>
      <span className="text-[10px] font-black uppercase tracking-widest opacity-50 group-hover:opacity-100 transition-opacity">{label}</span>
    </button>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <div className={`bg-white p-10 border-4 border-zinc-950 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.05)] flex items-center gap-8 ${color === 'primary' ? 'border-primary shadow-primary/10' : ''}`}>
      <div className={`w-16 h-16 flex items-center justify-center border-2 ${color === 'primary' ? 'bg-primary text-on-primary border-primary' : 'bg-transparent text-primary border-zinc-100'}`}>
        {React.cloneElement(icon, { size: 28, strokeWidth: 3 })}
      </div>
      <div>
        <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.5em] mb-2">{label}</p>
        <h3 className="text-5xl font-headline font-black tracking-tighter leading-none italic">{value}</h3>
      </div>
    </div>
  );
}

function OrdersTable({ orders, onUpdate }) {
  return (
    <div className="bg-white border-4 border-zinc-950 shadow-[20px_20px_0px_0px_rgba(255,107,107,0.1)] overflow-hidden">
      <div className="bg-zinc-950 p-8">
        <h2 className="text-white font-headline font-black text-2xl uppercase italic tracking-tighter">
          ACTIVE QUEUE <span className="text-primary text-sm not-italic ml-4 tracking-widest opacity-50">// Transactional Flow</span>
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left font-headline font-bold text-xs uppercase italic">
          <thead className="bg-zinc-50 text-zinc-500 text-[10px] tracking-widest border-b-2 border-zinc-100">
            <tr>
              <th className="px-8 py-6">ID</th>
              <th className="px-8 py-6">Subject</th>
              <th className="px-8 py-6">Total Yield</th>
              <th className="px-8 py-6">State</th>
              <th className="px-8 py-6">Command</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {orders.map(o => (
              <tr key={o._id} className="hover:bg-zinc-50/50 transition-colors">
                <td className="px-8 py-8 text-zinc-400">#{o._id.slice(-6)}</td>
                <td className="px-8 py-8 text-zinc-950">{o.user?.name || 'CITIZEN'}</td>
                <td className="px-8 py-8 text-primary">${o.totalPrice.toFixed(2)}</td>
                <td className="px-8 py-8">
                    <span className={`px-4 py-2 border-2 text-[9px] font-black tracking-widest ${
                      o.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                      o.status === 'Preparing' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      o.status === 'Ready' ? 'bg-green-50 text-green-700 border-green-200' :
                      o.status === 'Delivered' ? 'bg-zinc-100 text-zinc-600 border-zinc-200' :
                      'bg-red-50 text-red-700 border-red-200'
                    }`}>{o.status}</span>
                </td>
                <td className="px-8 py-8">
                  <select 
                    className="bg-transparent border-2 border-zinc-100 px-4 py-2 outline-none font-black text-[10px] focus:border-primary transition-all cursor-pointer"
                    value={o.status}
                    onChange={(e) => onUpdate(o._id, e.target.value)}
                  >
                    <option value="Pending">PENDING</option>
                    <option value="Preparing">PREPARING</option>
                    <option value="Ready">READY</option>
                    <option value="Delivered">DELIVERED</option>
                    <option value="Cancelled">CANCELLED</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BookingsTable({ bookings, onUpdate, onReschedule }) {
  return (
    <div className="bg-white border-4 border-zinc-950 shadow-[20px_20px_0px_0px_rgba(184,207,136,0.2)] overflow-hidden">
        <div className="bg-zinc-950 p-8"><h2 className="text-white font-headline font-black text-2xl uppercase italic tracking-tighter">Shift Registry</h2></div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-headline font-black uppercase text-xs italic">
            <thead className="bg-zinc-50 text-zinc-500 tracking-widest text-[10px] border-b-2 border-zinc-100">
              <tr>
                <th className="px-8 py-6">Personnel</th>
                <th className="px-8 py-6">Node</th>
                <th className="px-8 py-6">State</th>
                <th className="px-8 py-6">Authorization</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {bookings.map(b => (
                <tr key={b._id}>
                  <td className="px-8 py-8">{b.user?.name || 'N/A'}</td>
                  <td className="px-8 py-8 text-primary">{b.date} // {b.time}</td>
                  <td className="px-8 py-8">
                    <span className={`px-4 py-2 border-2 ${b.status === 'confirmed' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-zinc-50 border-zinc-200'}`}>{b.status}</span>
                  </td>
                  <td className="px-8 py-8">
                    <div className="flex gap-4">
                      {b.status === 'pending' && (
                        <>
                          <button onClick={() => onUpdate(b._id, 'confirmed')} className="px-6 py-2 bg-primary text-on-primary text-[10px] font-black">LOCK</button>
                          <button onClick={() => {
                            const d = prompt('NEW DATE:', b.date);
                            const t = prompt('NEW TIME:', b.time);
                            if (d && t) onReschedule(b._id, d, t);
                          }} className="px-6 py-2 border-2 border-zinc-200 text-[10px] font-black">SHIFT</button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
}

function ReviewsTable({ reviews, onApprove, onDelete }) {
  return (
    <div className="bg-white border-4 border-zinc-950 overflow-hidden">
        <div className="bg-zinc-950 p-8"><h2 className="text-white font-headline font-black text-2xl uppercase italic tracking-tighter">Extraction Logs</h2></div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-headline font-black uppercase text-[10px] italic">
            <thead className="bg-zinc-50 text-zinc-500 tracking-widest border-b-2 border-zinc-100">
              <tr>
                <th className="px-8 py-6">Entity</th>
                <th className="px-8 py-6">Rank</th>
                <th className="px-8 py-6">Log Data</th>
                <th className="px-8 py-6">Commands</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {reviews.map(r => (
                <tr key={r._id}>
                  <td className="px-8 py-8">{r.name}</td>
                  <td className="px-8 py-8 text-primary">{r.rating} / 5</td>
                  <td className="px-8 py-8 normal-case italic opacity-60 max-w-xs truncate">"{r.comment}"</td>
                  <td className="px-8 py-8">
                    <div className="flex gap-4">
                      {!r.isApproved && <button onClick={() => onApprove(r._id)} className="w-10 h-10 bg-primary text-on-primary flex items-center justify-center"><Check size={16}/></button>}
                      <button onClick={() => onDelete(r._id)} className="w-10 h-10 bg-red-600 text-white flex items-center justify-center"><X size={16}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
}
