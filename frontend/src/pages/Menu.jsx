import React, { useState, useEffect } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { api } from '../utils/api';
import { ASSETS } from '../constants/assets';

export default function Menu() {
  const { isDark } = useOutletContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('ALL');

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await api.getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to sync catalog:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const categories = ['ALL', ...new Set(products.map(p => p.category))];
  const filteredProducts = activeCategory === 'ALL' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className={`relative fade-in min-h-screen px-4 md:px-20 py-16 md:py-24 transition-colors duration-700 ${isDark ? 'bg-[#0d0f0f] text-[#fafaf5]' : 'bg-[#fafaf5] text-zinc-900'}`}>

      <section className="mb-24">
        <div className="flex items-center gap-4 mb-8">
           <div className="w-12 h-[2px] bg-primary"></div>
           <span className="font-headline text-xs font-black tracking-[0.5em] uppercase text-primary">Protocol Catalog // Ver 5.0</span>
        </div>
        <h2 className="text-4xl sm:text-6xl md:text-[8rem] font-black font-headline tracking-tighter mb-8 leading-[0.85] uppercase italic">
          THE <span className="text-primary not-italic">COLLECTION</span>
        </h2>
        <p className={`max-w-2xl text-xl font-medium leading-relaxed transition-colors duration-700 ${isDark ? 'text-[#a0a09a]' : 'text-zinc-600'}`}>
          A curated sequence of molecular extractions. Each entry is a peer-reviewed catalyst for sensory elevation.
        </p>
      </section>

      {/* Solid Sticky Nav - Refined for Mobile Tapability */}
      <nav className={`sticky top-14 md:top-20 z-40 mb-8 md:mb-20 py-2 md:py-6 border-y-2 flex justify-start md:justify-center overflow-x-auto scrollbar-hide transition-all duration-700 ${isDark ? 'bg-[#0d0f0f] border-zinc-800' : 'bg-[#fafaf5] border-zinc-200 shadow-sm'}`}>
        <div className="flex items-center gap-2 md:gap-12 px-4 md:px-6">
          {categories.map((cat) => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              className={`font-headline font-black text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase transition-all duration-300 whitespace-nowrap px-4 py-2 md:px-0 md:py-0 border-2 md:border-0 ${
                activeCategory === cat 
                ? 'text-primary border-primary bg-primary/10 md:bg-transparent' 
                : `${isDark ? 'text-zinc-500 border-zinc-800' : 'text-zinc-500 border-zinc-200'} hover:border-primary hover:text-primary`
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </nav>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-40 border-2 border-dashed border-zinc-800 opacity-20">
           <span className="material-symbols-outlined text-6xl animate-spin mb-4 text-primary">{ASSETS.BRAND_ICON}</span>
           <p className="font-headline font-black uppercase tracking-widest text-xs">Syncing Catalog...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-40 border-2 border-dashed border-zinc-800 opacity-30">
           <p className="font-headline font-black uppercase tracking-widest text-xs">No specimens found in this sector.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-800 border-2 border-zinc-800">
          {filteredProducts.map((item) => (
            <div key={item._id} className={`p-6 md:p-16 group transition-all duration-700 relative overflow-hidden active:scale-[0.98] ${isDark ? 'bg-[#0d0f0f] hover:bg-zinc-900 border-zinc-800' : 'bg-white hover:bg-zinc-100 border-zinc-100'}`}>
              
              {item.featured && (
                <div className={`absolute top-10 right-10 z-20 px-4 py-2 bg-primary text-white font-headline font-black text-[10px] tracking-widest uppercase shadow-lg transform translate-x-1/2 -translate-y-1/2 rotate-45`}>
                  Featured
                </div>
              )}

              <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
                 <div className={`w-full md:w-1/2 aspect-[16/9] md:aspect-square overflow-hidden border-2 transition-all duration-700 relative ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
                    <img className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-active:grayscale-0 group-active:brightness-100 transition-all duration-700" src={item.image} alt={item.name} />
                    <div className="absolute top-0 left-0 bg-primary text-on-primary font-headline text-[9px] font-black px-4 py-2 uppercase tracking-widest">
                      Protocol: {item.category}
                    </div>
                    {item.discountPrice && (
                      <div className="absolute bottom-4 right-4 bg-red-600 text-white font-headline font-black text-[10px] p-2 px-3 tracking-widest shadow-2xl">
                        PROMO
                      </div>
                    )}
                 </div>
                 <div className="w-full md:w-1/2">
                    <div className="flex justify-between items-baseline mb-4 flex-wrap gap-4">
                      <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black font-headline uppercase tracking-tighter leading-none">{item.name}</h3>
                      <div className="flex flex-col items-end">
                        {item.discountPrice ? (
                          <>
                            <span className="text-zinc-400 line-through text-xs font-bold font-headline mb-1">${item.price}</span>
                            <span className="text-red-500 text-3xl font-black font-headline italic">${item.discountPrice}</span>
                          </>
                        ) : (
                          <span className="text-2xl font-black text-primary font-headline italic">${item.price}</span>
                        )}
                      </div>
                    </div>
                    <p className={`text-sm lg:text-base font-medium mb-8 leading-snug transition-colors duration-700 ${isDark ? 'text-zinc-500' : 'text-zinc-600'}`}>
                      {item.description?.slice(0, 100)}{item.description?.length > 100 ? '...' : ''}
                    </p>
                    <Link 
                      to={`/product/${item._id}`} 
                      className={`relative z-10 w-full py-4 border-2 font-headline text-xs font-black tracking-[0.3em] uppercase transition-all duration-500 flex items-center justify-center ${isDark ? 'border-zinc-800 text-white hover:bg-white hover:text-black' : 'border-black text-black hover:bg-black hover:text-white'}`}
                    >
                      Analyze Specimen
                    </Link>
                 </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Efficiency Report */}
      <div className="mt-20 md:mt-40 border-t-4 border-primary pt-12">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
               <h4 className="font-headline font-black text-xs tracking-[0.4em] uppercase text-primary mb-6">Efficiency Report</h4>
               <p className="font-medium text-zinc-500">Every brew is tracked in real-time. We maintain a 99.8% precision rate across 4 global nodes.</p>
            </div>
            <div className={`p-8 border-2 ${isDark ? 'bg-zinc-950 border-zinc-900 shadow-[10px_10px_0px_0px_rgba(18,20,20,1)]' : 'bg-white border-zinc-200 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.05)]'}`}>
               <span className="text-[10px] font-black font-headline uppercase text-zinc-500 block mb-2">Node Latency</span>
               <div className="text-5xl font-black font-headline text-primary">0.04ms</div>
            </div>
            <div className={`p-8 border-2 ${isDark ? 'bg-zinc-950 border-zinc-900 shadow-[10px_10px_0px_0px_rgba(18,20,20,1)]' : 'bg-white border-zinc-200 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.05)]'}`}>
               <span className="text-[10px] font-black font-headline uppercase text-zinc-500 block mb-2">Extraction Yield</span>
               <div className="text-5xl font-black font-headline text-primary">22.4%</div>
            </div>
         </div>
      </div>

    </div>
  );
}
