import React, { useState } from 'react';
import { useOutletContext, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { api } from '../utils/api';
import { Trash2, ShoppingBag, ArrowRight, Zap, MapPin, Plus, Minus, User, MessageSquare } from 'lucide-react';

export default function Cart() {
  const { isDark } = useOutletContext();
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQty, updatePersonnelName, clearCart, totalPrice } = useCart();
  const [loading, setLoading] = useState(false);
  const [tableNumber, setTableNumber] = useState('');
  const [labInstructions, setLabInstructions] = useState('');

  const handleCheckout = async () => {
    if (!tableNumber) {
      alert('IDENTIFY TABLE NODE FIRST');
      return;
    }
    
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert('IDENTITY VERIFICATION REQUIRED: PLEASE LOGIN');
      navigate('/login');
      return;
    }

    // Validation: Ensure all assigned personnel names are filled if user wants individual names
    // However, we'll just send what we have.

    setLoading(true);
    try {
      const orderData = {
        orderItems: cartItems.map(item => ({
          name: item.title,
          qty: item.qty,
          image: item.image,
          price: parseFloat(item.price.replace('$', '')),
          product: item._id,
          assignedPersonnel: item.assignedPersonnel
        })),
        shippingAddress: {
          tableNumber,
          notes: "Molecular calibration confirmed."
        },
        labInstructions,
        paymentMethod: 'Counter',
        totalPrice
      };

      await api.createOrder(orderData);
      clearCart();
      alert('ORDER BROADCAST SUCCESSFUL // QUEUE UPDATED');
      navigate('/profile');
    } catch (err) {
      alert('NETWORK INTERRUPTED: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className={`min-h-screen pt-40 flex flex-col items-center justify-center px-6 transition-colors duration-700 ${isDark ? 'bg-[#0d0f0f] text-[#fafaf5]' : 'bg-[#fafaf5] text-zinc-900'}`}>
        <ShoppingBag size={80} className="text-zinc-800 mb-12 opacity-30" />
        <h1 className="text-5xl font-headline font-black uppercase tracking-tighter italic mb-4">QUEUE EMPTY</h1>
        <p className="font-headline font-black text-xs tracking-widest text-primary mb-12 uppercase opacity-50">No specimens detected in the containment zone.</p>
        <Link to="/menu" className="px-12 py-5 bg-primary text-on-primary font-headline font-black uppercase text-xs tracking-[0.4em] shadow-2xl hover:scale-105 transition-all">
          RETURNING TO CATALOG
        </Link>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-32 pb-40 px-6 md:px-20 transition-colors duration-700 ${isDark ? 'bg-[#0d0f0f] text-[#fafaf5]' : 'bg-[#fafaf5] text-zinc-900'}`}>
      <h1 className="text-6xl md:text-8xl font-headline font-black uppercase tracking-tighter leading-[0.85] mb-20 italic">
        ORDER <span className="text-primary not-italic">PIPELINE</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-8">
          {cartItems.map((item, idx) => (
            <div key={`${item._id}-${idx}`} className={`p-8 border-4 transition-all duration-700 flex flex-col md:flex-row items-start gap-10 group ${isDark ? 'bg-zinc-950 border-zinc-900 hover:border-zinc-800' : 'bg-white border-zinc-950 hover:shadow-[10px_10px_0px_0px_rgba(184,207,136,1)]'}`}>
              <div className="w-40 h-40 border-2 border-zinc-800 overflow-hidden shrink-0 mt-2">
                <img src={item.image} className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 transition-all duration-700" alt={item.title} />
              </div>

              <div className="flex-1 w-full space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-primary font-headline text-[10px] font-black tracking-widest uppercase block mb-1">Protocol: {item.category}</span>
                    <h3 className="text-3xl font-headline font-black uppercase tracking-tight italic">{item.title}</h3>
                  </div>
                  <button onClick={() => removeFromCart(item._id, item.customizations)} className="text-zinc-600 hover:text-red-500 transition-colors">
                    <Trash2 size={24} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(item.customizations).map(([key, val]) => (
                    <div key={key} className="bg-zinc-900/50 p-3 border border-zinc-800">
                      <p className="text-[8px] font-black uppercase tracking-widest text-zinc-500 mb-1">{key}</p>
                      <p className="text-[10px] font-bold uppercase text-primary font-headline">{val}</p>
                    </div>
                  ))}
                </div>

                {/* Individual Naming Feature */}
                <div className="pt-4 space-y-4">
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 flex items-center gap-2">
                    <User size={12} className="text-primary" /> ASSIGN PERSONNEL LABELS (ONE PER SPECIMEN)
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {item.assignedPersonnel?.map((name, nameIdx) => (
                      <input 
                        key={nameIdx}
                        type="text"
                        value={name}
                        placeholder={`Subject Name ${nameIdx + 1}`}
                        onChange={(e) => updatePersonnelName(item._id, item.customizations, nameIdx, e.target.value)}
                        className={`p-4 border-2 font-headline font-black uppercase text-[10px] outline-none transition-all ${
                          isDark ? 'bg-black border-zinc-800 text-white focus:border-primary' : 'bg-zinc-50 border-zinc-200 text-zinc-950 focus:border-zinc-950'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-zinc-100/10">
                  <div className={`flex items-center border-2 transition-all duration-700 ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
                    <button onClick={() => updateQty(item._id, Math.max(1, item.qty - 1), item.customizations)} className="px-4 py-2 hover:bg-zinc-800/10"><Minus size={16}/></button>
                    <span className="w-10 text-center font-headline font-black">{item.qty}</span>
                    <button onClick={() => updateQty(item._id, item.qty + 1, item.customizations)} className="px-4 py-2 hover:bg-zinc-800/10"><Plus size={16}/></button>
                  </div>
                  <div className="text-3xl font-headline font-black text-primary italic">{item.price}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Summary & Notes */}
        <div className="space-y-8">
           <div className={`p-10 border-4 transition-all duration-700 flex flex-col ${isDark ? 'bg-zinc-950 border-zinc-900 shadow-[20px_20px_0px_0px_rgba(30,30,30,1)]' : 'bg-white border-zinc-950 shadow-[20px_20px_0px_0px_rgba(184,207,136,1)]'}`}>
              <h2 className="font-headline font-black text-2xl uppercase tracking-widest mb-10 border-b-4 border-primary pb-4 italic">MISSION SUMMARY</h2>
              
              <div className="space-y-6 mb-10">
                 <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-zinc-500">
                    <span>Batch Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-zinc-500">
                    <span>Extraction Fee</span>
                    <span>$0.00</span>
                 </div>
                 <div className="h-[2px] bg-zinc-800"></div>
                 <div className="flex justify-between text-4xl font-headline font-black text-primary italic">
                    <span>PAYABLE</span>
                    <span>${totalPrice.toFixed(2)}</span>
                 </div>
              </div>

              {/* Lab Instructions */}
              <div className="space-y-4 mb-10">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 flex items-center gap-2">
                  <MessageSquare size={12} className="text-primary"/> LAB INSTRUCTIONS
                </label>
                <textarea 
                  value={labInstructions}
                  onChange={(e) => setLabInstructions(e.target.value)}
                  placeholder="Special handling requirements, allergies, or extraction notes..."
                  className={`w-full p-6 border-2 font-headline font-black uppercase text-[10px] h-32 resize-none outline-none transition-all ${
                    isDark ? 'bg-black border-zinc-800 text-white focus:border-primary' : 'bg-zinc-50 border-zinc-200 text-zinc-950 focus:border-zinc-950'
                  }`}
                />
              </div>

              <div className="space-y-4 mb-10">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 flex items-center gap-2">
                  <MapPin size={12} className="text-primary"/> ASSIGN TABLE NODE
                </label>
                <input 
                  type="text" 
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  placeholder="e.g. ALPHA-14"
                  className={`w-full p-6 border-2 font-headline font-black uppercase text-xs outline-none transition-all ${
                    isDark ? 'bg-black border-zinc-800 text-white focus:border-primary' : 'bg-zinc-50 border-zinc-200 text-zinc-950 focus:border-zinc-950'
                  }`}
                />
              </div>

              <button 
                disabled={loading}
                onClick={handleCheckout}
                className="w-full h-24 bg-primary text-on-primary font-headline font-black uppercase tracking-[0.5em] text-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex flex-col items-center justify-center gap-2 italic shadow-2xl overflow-hidden group"
              >
                {loading ? 'MODULATING...' : (
                  <>
                    <span className="group-hover:translate-y-[-5px] transition-transform">COMMIT TO PROTOCOL</span>
                    <ArrowRight size={20} className="group-hover:translate-x-5 transition-transform" />
                  </>
                )}
              </button>
           </div>

           <div className="border-l-4 border-primary pl-6 py-6 opacity-60 bg-white/5">
              <p className="text-[9px] font-black uppercase tracking-widest leading-loose">
                SYSTEM NOTICE: Personnel labels will be laser-etched onto specimen containers. 
                Verify all biological identification before confirming broadcast.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
