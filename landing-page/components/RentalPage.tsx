
import React, { useEffect } from 'react';
import { 
  Car, 
  Navigation, 
  Search,
  ArrowRight,
  Zap,
  GraduationCap,
  ShieldCheck,
  Globe,
  Clock,
  Package
} from 'lucide-react';

interface RentalPageProps {
  onBack: () => void;
  onRideClick?: () => void;
  onTaxiClick?: () => void;
  onSchoolClick?: () => void;
}

const RentalPage: React.FC<RentalPageProps> = ({ onBack, onRideClick, onTaxiClick, onSchoolClick }) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const categories = [
    { id: 'rides', label: 'Ride anywhere', icon: <Car size={18} />, active: false, action: onRideClick },
    { id: 'order', label: 'Order Anytime', icon: <Navigation size={18} />, active: false, action: onTaxiClick },
    { id: 'deliver', label: 'Anything Delivered', icon: <Search size={18} />, active: true, action: () => {} },
    { id: 'pay', label: 'Just Pay', icon: <GraduationCap size={18} />, active: false, action: onSchoolClick },
  ];

  return (
    <div className="bg-white min-h-screen pt-24 animate-reveal">
      <section className="relative mx-6 md:mx-12 lg:mx-20 mt-8 mb-24 rounded-[64px] overflow-hidden min-h-[600px] flex items-center bg-zinc-900">
        <div className="absolute inset-0 z-0 opacity-20">
           <img src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover" alt="Delivery" />
        </div>

        <div className="container mx-auto px-12 md:px-20 relative z-10 grid lg:grid-cols-2 gap-12 items-center text-white">
          <div className="space-y-10">
            <h1 className="text-white text-6xl md:text-[8vw] font-black tracking-tighter leading-[0.85]">
              Anything <br />
              <span className="text-[#00D665]">Delivered.</span>
            </h1>
            <p className="text-white/60 text-xl md:text-2xl font-medium max-w-xl">
              From small parcels to heavy freight. Same-day professional delivery across your city.
            </p>
            <button className="bg-[#00D665] text-black px-12 py-6 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-2xl flex items-center gap-3">
              Send Item <ArrowRight size={20} />
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

      <section className="py-24 max-w-[1400px] mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
           {[
             { title: "Same-Day Courier", icon: <Package size={32} /> },
             { title: "Heavy Freight", icon: <Car size={32} /> },
             { title: "Global Shipping", icon: <Globe size={32} /> }
           ].map((f, i) => (
             <div key={i} className="bg-zinc-50 p-14 rounded-[56px] space-y-8 hover:bg-white hover:shadow-2xl transition-all border border-transparent hover:border-zinc-100 group text-center">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-sm mx-auto group-hover:scale-110 group-hover:bg-[#00D665]/10 transition-all text-[#00D665]">{f.icon}</div>
                <h3 className="text-3xl font-black tracking-tight leading-none">{f.title}</h3>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
};

export default RentalPage;
