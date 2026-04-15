import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

export default function Booking() {
  const { isDark } = useOutletContext();
  
  // State for interactivity
  const [selectedTable, setSelectedTable] = useState('duo');
  const [guestCount, setGuestCount] = useState(2);
  const [bookingDate, setBookingDate] = useState('2024-10-24');
  const [bookingTime, setBookingTime] = useState('10:30 AM');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const tableOptions = [
    { id: 'solo', title: 'Solo Alcove', cap: '1-2 Personnel', icon: 'person', desc: 'Secure isolation pods for focused extraction.' },
    { id: 'duo', title: 'Duo Station', cap: '2-4 Personnel', icon: 'groups', desc: 'Standard collaborative environment.' },
    { id: 'collective', title: 'The Collective', cap: '4-8 Personnel', icon: 'group_add', desc: 'Multi-node synchronized laboratory.' }
  ];

  const handleBooking = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsConfirmed(true);
    }, 2000);
  };

  const adjustGuests = (amount) => {
    const newCount = guestCount + amount;
    if (newCount > 0 && newCount <= 8) {
      setGuestCount(newCount);
    }
  };

  if (isConfirmed) {
    return (
      <div className={`flex flex-col items-center justify-center min-h-screen px-6 text-center transition-colors duration-700 ${isDark ? 'bg-[#0d0f0f] text-[#fafaf5]' : 'bg-[#fafaf5] text-zinc-900'}`}>
        <div className="border-4 border-primary p-12 relative">
           <div className="absolute -top-6 -left-6 bg-primary text-on-primary p-2">
              <span className="material-symbols-outlined text-4xl">verified</span>
           </div>
           <h2 className="font-headline text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-none">PROTOCOL <br/><span className="text-primary italic">LOCKED</span></h2>
           <div className={`p-8 border-2 mb-12 flex flex-col md:flex-row gap-12 text-left ${isDark ? 'bg-zinc-900/50 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
              <div>
                 <span className="text-[10px] font-black font-headline uppercase text-primary block mb-2">Station</span>
                 <div className="text-2xl font-black uppercase">{selectedTable}</div>
              </div>
              <div>
                 <span className="text-[10px] font-black font-headline uppercase text-primary block mb-2">Arrival</span>
                 <div className="text-2xl font-black uppercase">{bookingDate} // {bookingTime}</div>
              </div>
              <div>
                 <span className="text-[10px] font-black font-headline uppercase text-primary block mb-2">Personnel</span>
                 <div className="text-2xl font-black uppercase">{guestCount} Units</div>
              </div>
           </div>
           <button 
              onClick={() => setIsConfirmed(false)}
              className="w-full py-4 bg-primary text-on-primary font-headline text-xs font-black tracking-[0.4em] uppercase transition-all active:scale-95"
            >
              Modify Protocol
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative fade-in px-6 md:px-20 py-24 min-h-screen transition-colors duration-700 ${isDark ? 'bg-[#0d0f0f] text-[#fafaf5]' : 'bg-[#fafaf5] text-zinc-900'}`}>

      <section className="mb-24">
        <div className="flex items-center gap-4 mb-8">
           <div className="w-12 h-[2px] bg-primary"></div>
           <span className="font-headline text-xs font-black tracking-[0.5em] uppercase text-primary">System 14 // Reservation Module</span>
        </div>
        <h2 className={`font-headline text-7xl md:text-[10rem] font-black tracking-[-0.05em] leading-[0.85] uppercase transition-colors duration-700 mb-8 ${isDark ? 'text-white' : 'text-zinc-950'}`}>
           BOOK <span className="text-primary italic">STATION</span>
        </h2>
        <p className={`max-w-xl text-xl font-medium leading-relaxed transition-colors duration-700 ${isDark ? 'text-zinc-500' : 'text-zinc-600'}`}>
          Secure your coordinates within the Beta-Brew extraction node. All stations are equipped with dedicated atmospheric controls.
        </p>
      </section>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        {/* Step 1: Environment Selection */}
        <section className="space-y-12">
          <div className="flex items-baseline gap-4 border-b-2 border-zinc-800 pb-4">
             <span className="font-headline font-black text-4xl text-primary leading-none">01</span>
             <h3 className="font-headline text-2xl font-black uppercase tracking-tight">Access Node</h3>
          </div>
          
          <div className="grid grid-cols-1 gap-px bg-zinc-800 border-2 border-zinc-800">
            {tableOptions.map((item) => (
              <div 
                key={item.id}
                onClick={() => setSelectedTable(item.id)}
                className={`group p-10 cursor-pointer transition-all duration-500 relative overflow-hidden border-l-8 ${
                  selectedTable === item.id 
                    ? (isDark ? 'bg-zinc-900 border-primary shadow-[10px_10px_0px_0px_rgba(0,0,0,0.5)]' : 'bg-primary border-zinc-950 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.1)]') 
                    : `border-transparent ${isDark ? 'bg-[#0d0f0f] hover:bg-zinc-900' : 'bg-white hover:bg-zinc-50'}`
                }`}
              >
                <div className="flex items-center gap-10 relative z-10">
                  <div className={`w-20 h-20 flex items-center justify-center transition-all duration-500 ${
                    selectedTable === item.id 
                      ? (isDark ? 'text-primary' : 'text-zinc-950') 
                      : 'text-zinc-500'
                  }`}>
                    <span className="material-symbols-outlined text-5xl">{item.icon}</span>
                  </div>
                  <div className="text-left flex-1">
                    <div className="flex justify-between items-center mb-2">
                       <h4 className={`font-headline font-black text-2xl uppercase tracking-tighter transition-colors ${selectedTable === item.id && !isDark ? 'text-zinc-950' : ''}`}>{item.title}</h4>
                       <span className={`text-[10px] font-black px-3 py-1 border transition-all ${selectedTable === item.id ? (isDark ? 'bg-primary text-on-primary border-primary' : 'bg-zinc-950 text-white border-zinc-950') : 'border-zinc-500'}`}>{item.cap}</span>
                    </div>
                    <p className={`text-sm font-medium transition-colors ${selectedTable === item.id ? (isDark ? 'text-zinc-400' : 'text-zinc-800') : 'text-zinc-500'}`}>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Step 2: Protocol Config */}
        <section className="space-y-12">
          <div className="flex items-baseline gap-4 border-b-2 border-zinc-800 pb-4">
             <span className="font-headline font-black text-4xl text-primary leading-none">02</span>
             <h3 className="font-headline text-2xl font-black uppercase tracking-tight">Sync Protocol</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="block font-headline text-[10px] font-black tracking-widest text-primary uppercase">Arrival Delta</label>
              <input 
                type="date" 
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className={`w-full border-2 p-6 font-headline font-black uppercase text-xs focus:outline-none focus:border-primary transition-all ${isDark ? 'bg-zinc-950 border-zinc-900 text-white' : 'bg-zinc-50 border-zinc-100 text-black'}`} 
              />
            </div>

            <div className="space-y-4">
              <label className="block font-headline text-[10px] font-black tracking-widest text-primary uppercase">Time Stamp</label>
              <select 
                value={bookingTime}
                onChange={(e) => setBookingTime(e.target.value)}
                className={`w-full border-2 p-6 font-headline font-black uppercase text-xs focus:outline-none focus:border-primary appearance-none transition-all ${isDark ? 'bg-zinc-950 border-zinc-900 text-white' : 'bg-zinc-50 border-zinc-100 text-black'}`}
              >
                {['09:00 AM', '10:30 AM', '11:45 AM', '01:00 PM', '02:30 PM', '04:00 PM', '17:30 PROTOCOL'].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block font-headline text-[10px] font-black tracking-widest text-primary uppercase">Personnel Load</label>
            <div className={`flex items-center justify-between p-8 border-2 transition-all ${isDark ? 'bg-zinc-950 border-zinc-900' : 'bg-zinc-50 border-zinc-100'}`}>
              <button 
                onClick={() => adjustGuests(-1)}
                className={`w-16 h-16 border-2 flex items-center justify-center transition-all ${isDark ? 'border-zinc-800 text-white hover:border-primary' : 'border-zinc-200 text-black hover:border-primary'} active:scale-90`}
              >
                <span className="material-symbols-outlined">remove</span>
              </button>
              <div className="text-center">
                <span className="font-headline text-6xl font-black">{guestCount}</span>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 mt-2">Units</p>
              </div>
              <button 
                onClick={() => adjustGuests(1)}
                className={`w-16 h-16 border-2 flex items-center justify-center transition-all ${isDark ? 'border-zinc-800 text-white hover:border-primary' : 'border-zinc-200 text-black hover:border-primary'} active:scale-90`}
              >
                <span className="material-symbols-outlined">add</span>
              </button>
            </div>
          </div>

          <div className={`p-10 border-2 transition-all ${isDark ? 'bg-[#121414] border-zinc-900' : 'bg-white border-zinc-100 shadow-xl'}`}>
             <div className="flex gap-6">
                <span className="material-symbols-outlined text-primary text-3xl">terminal</span>
                <p className="text-sm font-medium leading-relaxed italic opacity-70">
                  "Manual synchronization required upon node entry. Biometric confirmation via Terminal-Beta will trigger extraction queue. No latency permitted."
                </p>
             </div>
          </div>

          <button 
            onClick={handleBooking}
            disabled={isSubmitting}
            className={`w-full py-8 bg-primary text-on-primary font-headline font-black uppercase tracking-[0.5em] text-sm shadow-[0_20px_50px_rgba(184,207,136,0.2)] flex items-center justify-center gap-6 transition-all ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:translate-y-[-4px] active:translate-y-[2px]'}`}
          >
            {isSubmitting ? 'INITIALIZING...' : 'LOCK PROTOCOL'}
          </button>
        </section>
      </div>

    </div>
  );
}
