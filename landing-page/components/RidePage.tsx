
import React, { useEffect } from 'react';
import { 
  Car, 
  Navigation, 
  Search,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Zap,
  GraduationCap
} from 'lucide-react';

interface RidePageProps {
  onBack: () => void;
  onTaxiClick?: () => void;
  onRentalClick?: () => void;
  onSchoolClick?: () => void;
}

const RidePage: React.FC<RidePageProps> = ({ onBack, onTaxiClick, onRentalClick, onSchoolClick }) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const categories = [
    { id: 'rides', label: 'Ride anywhere', icon: <Car size={18} />, active: true, action: () => {} },
    { id: 'order', label: 'Order Anytime', icon: <Navigation size={18} />, active: false, action: onTaxiClick },
    { id: 'deliver', label: 'Anything Delivered', icon: <Search size={18} />, active: false, action: onRentalClick },
    { id: 'pay', label: 'Just Pay', icon: <GraduationCap size={18} />, active: false, action: onSchoolClick },
  ];

  return (
    <div className="bg-white min-h-screen pt-24 animate-reveal">
      <section className="relative mx-6 md:mx-12 lg:mx-20 mt-8 mb-24 rounded-[64px] overflow-hidden min-h-[600px] flex items-center bg-[#1A1A1A]">
        <div className="absolute inset-0 z-0 opacity-40">
           <img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover" alt="Ride" />
           <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
        </div>

        <div className="container mx-auto px-12 md:px-20 relative z-10 grid lg:grid-cols-2 gap-12 items-center text-white">
          <div className="space-y-10">
            <h1 className="text-white text-6xl md:text-[8vw] font-black tracking-tighter leading-[0.85]">
              Ride <br />
              <span className="text-[#00D665]">anywhere.</span>
            </h1>
            <p className="text-white/60 text-xl md:text-2xl font-medium max-w-xl">
              Professional ride-hailing with a fair-fare approach. Connect with verified drivers instantly for any trip.
            </p>
            <button className="bg-[#00D665] text-black px-12 py-6 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-2xl flex items-center gap-3">
              Request a Ride <ArrowRight size={20} />
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

      {/* Rides Services */}
      <section className="py-24 max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/3 space-y-6">
            <h2 className="text-6xl font-black tracking-tighter">Your Trip. Your Price.</h2>
            <p className="text-xl text-zinc-500 font-medium">Negotiate with professional drivers and arrive in style.</p>
          </div>
          <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-6 w-full">
            {['Comfort', 'Executive', 'Max'].map((name, i) => (
              <div key={i} className="group bg-zinc-50 p-10 rounded-[48px] hover:bg-white hover:shadow-2xl transition-all border border-transparent hover:border-zinc-100 flex flex-col items-center">
                <div className="aspect-square w-full rounded-3xl overflow-hidden mb-8 bg-white shadow-inner">
                   <img src={`https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=400&index=${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={name} />
                </div>
                <h4 className="text-2xl font-black tracking-tight text-zinc-900">{name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RidePage;
