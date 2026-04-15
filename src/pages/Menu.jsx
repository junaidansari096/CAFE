import React from 'react';

export default function Menu() {
  return (
    <div className="relative fade-in bg-[#121414] text-[#fafaf5] min-h-screen px-6 md:px-20 py-12">

      <section className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary font-headline">Molecular Extraction Active</span>
        </div>
        <h2 className="text-5xl md:text-7xl font-bold font-headline tracking-tighter mb-6 leading-none">
          The Alchemist's <br/><span className="text-primary">Daily Protocol</span>
        </h2>
        <p className="text-[#a0a09a] max-w-xl mx-auto text-lg leading-relaxed">
          Precision-engineered flavors where traditional craft meets high-tech molecular synthesis. Choose your catalyst.
        </p>
      </section>

      <nav className="sticky top-16 z-40 mb-12 py-4 bg-[#121414]/80 backdrop-blur-sm -mx-6 px-6 overflow-x-auto flex justify-center">
        <div className="flex items-center gap-8 min-w-max">
          <a className="text-primary font-headline font-bold text-sm tracking-widest uppercase border-b-2 border-primary pb-1" href="#">Coffee</a>
          <a className="text-[#6b6b65] font-headline font-bold text-sm tracking-widest uppercase hover:text-[#fafaf5] transition-colors" href="#">Tea</a>
          <a className="text-[#6b6b65] font-headline font-bold text-sm tracking-widest uppercase hover:text-[#fafaf5] transition-colors" href="#">Pastries</a>
          <a className="text-[#6b6b65] font-headline font-bold text-sm tracking-widest uppercase hover:text-[#fafaf5] transition-colors" href="#">Specials</a>
        </div>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

        {/* Card 1 */}
        <div className="bg-[#1a1c19] p-8 rounded-2xl group hover:bg-[#222420] transition-all duration-300 transform hover:scale-[1.02]">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold font-headline tracking-tight group-hover:text-primary transition-colors">Neon Espresso</h3>
            <span className="text-xl font-bold text-primary font-headline">$6.50</span>
          </div>
          <div className="w-full h-48 rounded-xl overflow-hidden mb-6 relative">
            <img className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD59DepxNslf3bc--zJ-QCVFZepElWRydgzzqGTE3H_P2gYp0JnZJaFpcr0Ujk3V0t10Aeww1OB0sFxmQ6mDKVQkNQvRTTmSaIAtVY7ltV_sq5HUJqSopDYg5J0UOm5lACtMiKtQ2abTh0LklrZmpNIl4V8EGjIDXJGwV_dUoU6vFLmDhXR1u4MoaMjxSJYrnX5gOa4YwotwGZCqStCPVeKdTbvp3Ul9rj8UoGE8dL3Meozfg30r9giDx0uHt5olZDLlOCUohLlg4I" alt="Neon Espresso" />
            <div className="absolute top-4 left-4">
              <span className="bg-primary/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-primary uppercase tracking-wider">High Voltage</span>
            </div>
          </div>
          <p className="text-[#8a8a84] text-sm leading-relaxed">
            Sonic-aged beans extracted at 14 bars of pressure. Infused with a hint of synthesized citrus peel for a high-clarity finish.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <span className="text-[9px] font-bold text-primary/60 tracking-widest uppercase">Protocol: Sonic Wash</span>
            <div className="flex-1 h-[1px] bg-[#2a2c28]"></div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-[#1a1c19] p-8 rounded-2xl group hover:bg-[#222420] transition-all duration-300 transform hover:scale-[1.02]">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold font-headline tracking-tight group-hover:text-primary transition-colors">Cryo-Brew</h3>
            <span className="text-xl font-bold text-primary font-headline">$8.00</span>
          </div>
          <div className="w-full h-48 rounded-xl overflow-hidden mb-6 relative">
            <img className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZkU24TVKKcWj1oCYWXvUslykTydsiZs4TKjCCuInR8YJ05MwUoW5vuVbYKVkLagudNOM2ioRaq-wB-exRTfyaleNvYHqTDvVeiVVsWTTmM04KEG4EL5RYD5B5w61AeKZuqlqB9zYxO_B9sH3gprBB6_B6cRyz9jbW1yL6guxCERnYQ9UWiWR7KZlcuHWEf66a6TYtd0p2G1muwQLzt60TMWfK8b6YUNaS8wOrIt1Kwm_td_vBUZO0CtDymC8EkbxF_QqRhbIQ7Eg" alt="Cryo-Brew" />
            <div className="absolute top-4 left-4">
              <span className="bg-primary/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-primary uppercase tracking-wider">Sub-Zero</span>
            </div>
          </div>
          <p className="text-[#8a8a84] text-sm leading-relaxed">
            48-hour sub-zero maceration. Nitrogen-infused body with molecularly suspended vanilla bean crystals for a buttery mouthfeel.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <span className="text-[9px] font-bold text-primary/60 tracking-widest uppercase">Protocol: N2 Suspension</span>
            <div className="flex-1 h-[1px] bg-[#2a2c28]"></div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-[#1a1c19] p-8 rounded-2xl group hover:bg-[#222420] transition-all duration-300 transform hover:scale-[1.02]">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold font-headline tracking-tight group-hover:text-primary transition-colors">Quantum Latte</h3>
            <span className="text-xl font-bold text-primary font-headline">$7.25</span>
          </div>
          <div className="w-full h-48 rounded-xl overflow-hidden mb-6 relative">
            <img className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBR_QUCPJm0rBH6QkOKauZ-ZeJUpvDG-jm_5LBS3iBakmqtV5vUz-Jlgs_ZnF_XlbWmJzMZRCddTiqkQ8vhrmpBJoJViwbNp-DWgKkd0Zc4ZMcrQE7YblYJXR_d1JyP937D8QjFepsXEEaRA1k4YrtSqX-V4d_mFtaa0n_Au_efXnDXjCvhL-Mvj0loEgONfOfb6gSyUtKyhIoFHeSfQ_LRRPRHC0wiMeIVBkr4FmkJZajkqv61JoXrl_uq63yS9dv_qkIv_DoBQoQ" alt="Quantum Latte" />
            <div className="absolute top-4 left-4">
              <span className="bg-primary/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-primary uppercase tracking-wider">Hybrid</span>
            </div>
          </div>
          <p className="text-[#8a8a84] text-sm leading-relaxed">
            A dual-state beverage featuring a hot espresso core surrounded by a cold, aerated oat-milk foam mantle.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <span className="text-[9px] font-bold text-primary/60 tracking-widest uppercase">Protocol: Thermal Shear</span>
            <div className="flex-1 h-[1px] bg-[#2a2c28]"></div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-[#1a1c19] p-8 rounded-2xl group hover:bg-[#222420] transition-all duration-300 transform hover:scale-[1.02]">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold font-headline tracking-tight group-hover:text-primary transition-colors">Olive Extract V60</h3>
            <span className="text-xl font-bold text-primary font-headline">$9.50</span>
          </div>
          <div className="w-full h-48 rounded-xl overflow-hidden mb-6 relative">
            <img className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqzz_6dcKwm6uwimy-oL8yGe4JmhNqpv3Kl0Ybieg9oAO3takAs8zRMDbYAhN8Gk3W2ez0jpYqAz0A4eYHUHQJXI2lJ08lh6nJINeAa1LISiGkho0igpADz4-kNaWJd8tq7pr9inAtAQJyczMMXb5UUTD-wOSl513e2U6hnZ_WwC3ePDSo6dCme9Ti_hBbJ0JByfFTBYwMBq7Uq5UJFGVO42-dvhhbvFtNuIgxBth7je74kYB0jjRS_yOLGaiT8ALZfzOsLFKecUs" alt="Olive Extract V60" />
            <div className="absolute top-4 left-4">
              <span className="bg-primary/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-primary uppercase tracking-wider">Reserve</span>
            </div>
          </div>
          <p className="text-[#8a8a84] text-sm leading-relaxed">
            Single-origin Ethiopian Yirgacheffe washed with saline-optimized water. Served with an atomized mist of cold-pressed olive essence.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <span className="text-[9px] font-bold text-primary/60 tracking-widest uppercase">Protocol: Ion Optimized</span>
            <div className="flex-1 h-[1px] bg-[#2a2c28]"></div>
          </div>
        </div>
      </div>

      {/* Live Lab Status */}
      <div className="mt-20 flex flex-col items-center justify-center text-center">
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 max-w-md w-full">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary text-sm" style={{fontVariationSettings: "'FILL' 1"}}>science</span>
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Live Lab Status</span>
          </div>
          <div className="flex justify-between items-center px-4">
            <div className="text-left">
              <p className="text-[10px] text-[#6b6b65] uppercase font-bold tracking-widest">Temperature</p>
              <p className="text-lg font-headline font-bold">94.2°C</p>
            </div>
            <div className="w-[1px] h-8 bg-[#2a2c28]"></div>
            <div className="text-left">
              <p className="text-[10px] text-[#6b6b65] uppercase font-bold tracking-widest">Pressure</p>
              <p className="text-lg font-headline font-bold">9.1 BAR</p>
            </div>
            <div className="w-[1px] h-8 bg-[#2a2c28]"></div>
            <div className="text-left">
              <p className="text-[10px] text-[#6b6b65] uppercase font-bold tracking-widest">TDS</p>
              <p className="text-lg font-headline font-bold">1.45%</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
