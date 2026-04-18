import React, { useState, useEffect } from 'react';
import { useParams, useOutletContext, useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { useCart } from '../context/CartContext';
import { ChevronLeft, Plus, Minus, Zap, Thermometer, Droplets, Star } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const { isDark } = useOutletContext();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [customizations, setCustomizations] = useState({
    extraction: 'Standard',
    temperature: 'Optimized',
    base: 'Distilled'
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await api.getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error("Specimen Extraction Failure:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, qty, customizations);
    alert('Specimen added to queue.');
    navigate('/menu');
  };

  if (loading) return <div className="min-h-screen pt-40 text-center font-headline font-black uppercase tracking-widest text-primary animate-pulse">Syncing Specimen Data...</div>;
  if (!product) return <div className="min-h-screen pt-40 text-center font-headline font-black uppercase tracking-widest text-red-500">Specimen Not Found 404</div>;

  return (
    <div className={`min-h-screen pt-20 pb-16 md:pt-32 md:pb-20 px-4 md:px-20 transition-colors duration-700 ${isDark ? 'bg-[#0d0f0f] text-[#fafaf5]' : 'bg-[#fafaf5] text-zinc-900'}`}>
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 mb-8 font-headline font-black text-[10px] uppercase tracking-widest text-primary hover:opacity-70 transition-opacity">
        <ChevronLeft size={16} /> Return to Catalog
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className={`aspect-square border-4 overflow-hidden relative group transition-all duration-700 ${isDark ? 'border-zinc-800' : 'border-zinc-950'}`}>
          <img src={product.image} className="w-full h-full object-cover grayscale-0 md:grayscale md:brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-active:grayscale-0 group-active:brightness-100 transition-all duration-700" alt={product.name} />
          <div className="absolute top-0 left-0 bg-primary text-on-primary px-4 py-2 font-headline font-black text-[10px] tracking-widest uppercase">
            Protocol: {product.category}
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-headline font-black uppercase tracking-tighter leading-[0.85] mb-6 md:mb-8 italic">
            {(product.name || 'Specimen').split(' ')[0]} <span className="text-primary not-italic">{(product.name || 'Unknown').split(' ').slice(1).join(' ')}</span>
          </h1>
          
          <div className="flex items-center gap-8 mb-12 flex-wrap">
             <div className="flex flex-col">
               {product.discountPrice ? (
                 <>
                   <span className={`text-xl font-bold font-headline line-through opacity-30 ${isDark ? 'text-white' : 'text-zinc-950'}`}>
                     ${product.price}
                   </span>
                    <span className="text-4xl sm:text-6xl font-headline font-black text-red-500 italic">
                      ${product.discountPrice}
                    </span>
                  </>
                ) : (
                  <span className="text-4xl sm:text-6xl font-headline font-black text-primary italic">
                    ${product.price}
                  </span>
                )}
             </div>
             <div className={`h-20 w-[2px] transition-colors duration-700 ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'}`}></div>
             <div>
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-2">Purity Rating // 5.0</div>
                <div className="flex gap-1 text-primary">
                  {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="currentColor" />)}
                </div>
             </div>
          </div>

          <p className={`text-xl font-medium leading-relaxed mb-12 transition-colors duration-700 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            {product.description || "The specimen currently undergoes molecular analysis. A comprehensive report will be available upon stabilization within the local atmospheric conditions."}
          </p>

          <div className="space-y-8 md:space-y-12 mb-12 md:mb-16">
            <div className="flex items-center gap-6">
               <h3 className={`font-headline font-black text-xs tracking-[0.5em] uppercase whitespace-nowrap ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>Configuration Protocol</h3>
               <div className={`flex-1 h-[2px] transition-colors duration-700 ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'}`}></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <OptionGroup 
                label="Extraction Profile" 
                icon={<Droplets size={16}/>}
                options={['Standard', 'Double-Shot', 'Micro-Dose']}
                value={customizations.extraction}
                onChange={(v) => setCustomizations({...customizations, extraction: v})}
                isDark={isDark}
              />
              <OptionGroup 
                label="Thermal State" 
                icon={<Thermometer size={16}/>}
                options={['Absolute zero', 'Optimized', 'Thermal Core']}
                value={customizations.temperature}
                onChange={(v) => setCustomizations({...customizations, temperature: v})}
                isDark={isDark}
              />
              <OptionGroup 
                label="Molecular Base" 
                icon={<Zap size={16}/>}
                options={['Distilled', 'Oat-Isotope', 'Soy-Reagent']}
                value={customizations.base}
                onChange={(v) => setCustomizations({...customizations, base: v})}
                isDark={isDark}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-8 mb-12">
            <div className={`flex items-center border-[4px] md:border-[6px] h-20 md:h-24 px-6 md:px-8 w-full sm:w-auto transition-all duration-700 ${isDark ? 'border-zinc-800 bg-zinc-900/30' : 'border-zinc-950 bg-white'}`}>
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="hover:text-primary transition-all p-2 active:scale-90"><Minus size={20} strokeWidth={3}/></button>
              <span className="w-16 md:w-20 text-center font-headline font-black text-2xl md:text-3xl">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="hover:text-primary transition-all p-2 active:scale-90"><Plus size={20} strokeWidth={3}/></button>
            </div>
            
            <button 
              onClick={handleAddToCart}
              className="w-full sm:flex-1 h-20 md:h-24 bg-primary text-on-primary font-headline font-black uppercase tracking-[0.6em] text-xs md:text-sm hover:translate-y-[-4px] hover:shadow-[0_20px_40px_-15px_rgba(184,207,136,0.6)] active:translate-y-[2px] transition-all shadow-2xl flex items-center justify-center gap-3 italic overflow-hidden relative group"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-[-45deg]"></div>
              <Zap size={20} fill="currentColor" /> Commit to Transaction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function OptionGroup({ label, icon, options, value, onChange, isDark }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-primary">{icon}</span>
        <label className="text-[10px] font-black uppercase tracking-widest opacity-50">{label}</label>
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map(opt => (
          <button 
            key={opt}
            onClick={() => onChange(opt)}
            className={`px-4 py-2 border-2 font-headline font-black text-[9px] uppercase tracking-widest transition-all ${
              value === opt 
                ? 'bg-primary border-primary text-on-primary' 
                : isDark ? 'border-zinc-800 hover:border-zinc-600' : 'border-zinc-200 hover:border-zinc-950'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
