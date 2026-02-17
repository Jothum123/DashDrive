
import React, { useEffect } from 'react';
import { 
  Car, 
  Navigation, 
  Search,
  ArrowRight,
  Zap,
  GraduationCap,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface TaxiPageProps {
  onBack: () => void;
  onRideClick?: () => void;
  onRentalClick?: () => void;
  onSchoolClick?: () => void;
}

const TaxiPage: React.FC<TaxiPageProps> = ({ onBack, onRideClick, onRentalClick, onSchoolClick }) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const categories = [
    { id: 'rides', label: 'Ride anywhere', icon: <Car size={18} />, active: false, action: onRideClick },
    { id: 'order', label: 'Order Anytime', icon: <Navigation size={18} />, active: true, action: () => {} },
    { id: 'deliver', label: 'Anything Delivered', icon: <Search size={18} />, active: false, action: onRentalClick },
    { id: 'pay', label: 'Just Pay', icon: <GraduationCap size={18} />, active: false, action: onSchoolClick },
  ];

  return (
    <div className="bg-white min-h-screen pt-24 animate-reveal">
      <section className="relative mx-6 md:mx-12 lg:mx-20 mt-8 mb-24 rounded-[64px] overflow-hidden min-h-[600px] flex items-center bg-[#5B6BF3]">
        <div className="absolute inset-0 z-0 opacity-20">
           <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover grayscale" alt="City" />
        </div>

        <div className="container mx-auto px-12 md:px-20 relative z-10 grid lg:grid-cols-2 gap-12 items-center text-white">
          <div className="space-y-10">
            <h1 className="text-white text-6xl md:text-[8vw] font-black tracking-tighter leading-[0.85]">
              Order <br />
              <span className="text-[#00D665]">Anytime.</span>
            </h1>
            <p className="text-white/80 text-xl md:text-2xl font-medium max-w-xl">
              Hala on-demand taxi service. Reliable, quick, and available 24/7 for your urgent commutes.
            </p>
            <button className="bg-[#00D665] text-black px-12 py-6 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl flex items-center gap-3">
              Order Now <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Switcher */}
      <section className="mb-24">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <button 
                key={cat.id} 
                onClick={cat.action}
                className={`flex items-center gap-3 px-8 py-4 rounded-full font-black text-sm transition-all border ${
                  cat.active 
                    ? 'bg-[#00D665] text-black border-transparent shadow-xl' 
                    : 'bg-zinc-50 text-zinc-400 border-transparent hover:bg-zinc-100'
                }`}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 max-w-[1400px] mx-auto px-6 text-center">
         <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-12">Hala Excellence.</h2>
         <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Zap size={32} />, title: "3-Min Pickup", desc: "Available at all major hubs instantly." },
              { icon: <CheckCircle2 size={32} />, title: "Upfront Rates", desc: "Know the price before you book." },
              { icon: <ShieldCheck size={32} />, title: "Safe & Insured", desc: "Verified professional captains." }
            ].map((f, i) => (
              <div key={i} className="p-12 bg-zinc-50 rounded-[48px] hover:bg-white hover:shadow-2xl transition-all border border-transparent hover:border-zinc-100">
                 <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#5B6BF3] shadow-sm">{f.icon}</div>
                 <h3 className="text-2xl font-black mb-3">{f.title}</h3>
                 <p className="text-zinc-500 font-bold">{f.desc}</p>
              </div>
            ))}
         </div>
      </section>
    </div>
  );
};

export default TaxiPage;
