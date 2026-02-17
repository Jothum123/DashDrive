
import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Zap, 
  Plus, 
  Smartphone, 
  Store, 
  Stethoscope, 
  ChevronRight
} from 'lucide-react';

const DeliveryPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'instant' | 'electronics' | 'supermarkets' | 'pharmacy'>('instant');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [activeTab]);

  const subTabs = [
    { id: 'instant', label: '15-Min Delivery', icon: <Zap size={18} /> },
    { id: 'supermarkets', label: 'Grocery', icon: <Store size={18} /> },
    { id: 'pharmacy', label: 'Health', icon: <Stethoscope size={18} /> },
    { id: 'electronics', label: 'Tech', icon: <Smartphone size={18} /> },
  ];

  const HubSwitcher = () => (
    <div className="flex flex-wrap justify-center gap-3 p-2 bg-zinc-50 rounded-[48px] w-fit mx-auto border border-zinc-100 mb-20 overflow-hidden">
      {subTabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id as any)}
          className={`flex items-center gap-2.5 px-7 py-3.5 rounded-[32px] font-black text-[13px] transition-all whitespace-nowrap ${
            activeTab === tab.id ? 'bg-[#00D665] text-black shadow-lg' : 'text-zinc-400 hover:text-black'
          }`}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );

  const InstantHub = () => (
    <div className="animate-reveal">
      <section className="mx-6 md:mx-12 lg:mx-20 mt-8 mb-24 rounded-[64px] overflow-hidden min-h-[600px] flex items-center bg-[#F1F3F2] relative group">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover" alt="Fresh" />
        </div>
        <div className="container mx-auto px-12 md:px-24 relative z-20">
          <div className="max-w-2xl space-y-8">
            <div className="flex items-center gap-3">
              <Zap size={40} className="text-[#00D665]" fill="#00D665" />
              <h2 className="text-4xl font-black tracking-tighter">DriveGo <span className="text-[#00D665]">Instant</span></h2>
            </div>
            <h1 className="text-zinc-900 text-6xl md:text-[9vw] font-black tracking-tighter leading-[0.8] mb-12">
              Fresh food, <br /> <span className="text-[#00D665]">fast.</span>
            </h1>
            <div className="flex items-center gap-6">
              <div className="bg-white rounded-full px-8 py-5 shadow-xl flex items-center gap-4">
                <span className="text-5xl font-black text-[#00D665]">15</span>
                <span className="text-sm font-black uppercase text-zinc-400">min delivery</span>
              </div>
              <button className="bg-[#00D665] text-black px-12 py-8 rounded-[32px] font-black text-xl hover:scale-105 transition-all">Order Now</button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 text-center mb-32">
        <h2 className="text-7xl font-black tracking-tighter mb-12">Get it now.</h2>
        <HubSwitcher />
        <p className="text-2xl text-zinc-500 font-medium max-w-3xl mx-auto">Skip the lines. Get fresh produce and household staples delivered in 15 minutes or less, at local supermarket prices.</p>
      </div>
    </div>
  );

  const PharmacyHub = () => (
    <div className="animate-reveal">
      <section className="mx-6 md:mx-12 lg:mx-20 mt-8 mb-12 rounded-[64px] overflow-hidden min-h-[500px] flex items-center bg-[#5B21B6] relative group">
        <div className="container mx-auto px-12 md:px-24 relative z-20 flex flex-col lg:flex-row items-center justify-between gap-12 py-20">
          <div className="space-y-8 max-w-xl">
            <h1 className="text-white text-6xl md:text-[7vw] font-black tracking-tighter leading-[0.85]">
              Health, <br /> <span className="text-[#00D665]">delivered.</span>
            </h1>
            <button className="bg-[#00D665] text-black px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all">Order Pharmacy</button>
          </div>
          <img src="https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=1200" className="w-full max-w-[500px] rounded-[48px]" alt="Pharmacy" />
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 text-center mt-20 mb-32">
        <h2 className="text-7xl font-black tracking-tighter mb-12">Wellness simplified.</h2>
        <HubSwitcher />
        <p className="text-2xl text-zinc-500 font-medium max-w-3xl mx-auto">Get your medicine cabinet and wellness essentials without leaving your home. Verified pharmacies at your fingertips.</p>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen pt-24 animate-reveal">
      {activeTab === 'pharmacy' ? <PharmacyHub /> : <InstantHub />}

      <section className="py-32 rounded-[80px] mx-6 md:mx-12 lg:mx-20 mb-32 text-white bg-[#312E81]">
        <div className="max-w-[1200px] mx-auto px-12 text-center">
          <h2 className="text-7xl font-black tracking-tighter mb-24">Delivery FAQs</h2>
          <div className="space-y-6 text-left max-w-4xl mx-auto">
            {[
              { q: "Is delivery truly 15 minutes?", a: "95% of Instant orders arrive within 15 minutes. Heavy rain or peak traffic might add a few minutes." },
              { q: "Can I return items?", a: "Yes, simple in-app returns are available for most grocery items if they don't meet your standards." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white/5 rounded-[40px] p-12 cursor-pointer hover:bg-white/10 transition-all" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                <h4 className="text-3xl font-black tracking-tight">{item.q}</h4>
                {openFaq === idx && <p className="mt-8 text-xl text-white/60 font-medium">{item.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-40 bg-zinc-950 text-white text-center rounded-[80px] mx-6 md:mx-12 lg:mx-20 mb-32">
         <h2 className="text-8xl md:text-[10rem] font-black tracking-tighter mb-16 leading-[0.85]">
            More choice <br /> <span className="text-[#00D665]">with DriveGo.</span>
         </h2>
         <button onClick={onBack} className="bg-white text-black px-16 py-8 rounded-full font-black text-xl hover:bg-[#00D665]">Back Home</button>
      </section>
    </div>
  );
};

export default DeliveryPage;
