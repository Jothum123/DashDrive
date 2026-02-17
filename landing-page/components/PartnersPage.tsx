
import React, { useEffect } from 'react';
import { 
  Car, 
  Utensils, 
  Package, 
  Store, 
  Wallet, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Star, 
  TrendingUp, 
  Users,
  CheckCircle2
} from 'lucide-react';

interface PartnersPageProps {
  onBack: () => void;
}

const PartnersPage: React.FC<PartnersPageProps> = ({ onBack }) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const partnerTypes = [
    {
      id: 'driver',
      title: "DriveGo Driver",
      subtitle: "The Mobility Partner",
      desc: "Revolutionizing ride-hailing with fair-fare negotiation. Set your own prices and build your local business.",
      icon: <Car size={32} />,
      color: "bg-[#00D665]",
      benefits: ["Keep 90% of your earnings", "Instant daily payouts", "Set your own schedule"]
    },
    {
      id: 'food-delivery',
      title: "Food Delivery",
      subtitle: "The Culinary Courier",
      desc: "Connect local kitchens with hungry neighbors. Earn consistently with our high-demand dining network.",
      icon: <Utensils size={32} />,
      color: "bg-[#5B6BF3]",
      benefits: ["High peak-hour bonuses", "Fuel & insurance perks", "Flexible city zones"]
    },
    {
      id: 'express-delivery',
      title: "Express Delivery",
      subtitle: "The Logistics Expert",
      desc: "For the professional courier. Deliver packages and essential goods across the city with optimized routes.",
      icon: <Package size={32} />,
      color: "bg-zinc-900",
      benefits: ["Bulk order assignments", "Dedicated support rail", "Enterprise route AI"]
    },
    {
      id: 'merchant',
      title: "Food & Shop Merchant",
      subtitle: "The Growth Partner",
      desc: "Scale your store or restaurant. Reach millions of DriveGo users and manage your orders with ease.",
      icon: <Store size={32} />,
      color: "bg-[#F8F9FA]",
      textColor: "text-black",
      benefits: ["0% commission for 30 days", "Smart inventory insights", "In-app marketing tools"]
    },
    {
      id: 'pay-merchant',
      title: "Pay Merchant",
      subtitle: "The Financial Partner",
      desc: "Integrate with our fintech ecosystem. Accept DriveGo Pay and offer your customers a modern way to spend.",
      icon: <Wallet size={32} />,
      color: "bg-[#003B21]",
      benefits: ["Direct bank settlement", "Lowest MDR in the region", "Fraud-free protection"]
    }
  ];

  return (
    <div className="bg-white min-h-screen pt-32 animate-reveal">
      {/* Hero Section */}
      <section className="max-w-[1400px] mx-auto px-6 mb-24">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="w-10 h-[2px] bg-[#00D665]"></span>
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-black/30">Partnership Program</span>
            </div>
            <h1 className="text-black text-6xl md:text-[9vw] font-black tracking-tighter leading-[0.8] italic">
              Empower your <br /> <span className="text-[#00D665]">ambition.</span>
            </h1>
          </div>
          <div className="max-w-md pb-4">
            <p className="text-2xl text-zinc-400 font-medium leading-tight">
              Join a global network of over <span className="text-black font-bold">2.5 million</span> partners setting the standard for mobility and commerce.
            </p>
          </div>
        </div>
      </section>

      {/* Main Partners Grid */}
      <section className="max-w-[1500px] mx-auto px-6 mb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partnerTypes.map((partner) => (
            <div 
              key={partner.id}
              className={`group relative p-10 rounded-[56px] min-h-[500px] flex flex-col justify-between transition-all duration-700 hover:shadow-2xl hover:shadow-black/5 hover:-translate-y-2 border border-black/5 ${partner.color} ${partner.textColor || 'text-white'}`}
            >
              <div className="space-y-8">
                <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center shadow-lg ${partner.id === 'merchant' ? 'bg-zinc-100 text-zinc-900' : 'bg-white/10 text-white'}`}>
                  {partner.icon}
                </div>
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-2">{partner.subtitle}</h3>
                  <h2 className="text-4xl font-black tracking-tighter mb-4">{partner.title}</h2>
                  <p className={`text-lg font-medium opacity-70 leading-relaxed max-w-[280px]`}>{partner.desc}</p>
                </div>
              </div>

              <div className="space-y-4 pt-8">
                {partner.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={16} className={partner.id === 'merchant' ? 'text-[#00D665]' : 'text-white/40'} />
                    <span className="text-sm font-bold opacity-80">{benefit}</span>
                  </div>
                ))}
                <button className={`mt-6 w-full py-5 rounded-[24px] font-black text-sm flex items-center justify-center gap-2 transition-all ${partner.id === 'merchant' ? 'bg-black text-white hover:bg-[#00D665] hover:text-black' : 'bg-white text-black hover:scale-105'}`}>
                  Join Program <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Metrics */}
      <section className="bg-zinc-950 py-32 md:py-48 rounded-[80px] mx-4 md:mx-10 mb-32 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00D665]/5 blur-[150px] rounded-full"></div>
        <div className="container mx-auto px-6 max-w-[1400px] relative z-10">
          <div className="text-center mb-24">
             <h2 className="text-white text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-none">Built for <span className="text-[#00D665]">Better Business.</span></h2>
             <p className="text-white/40 text-xl md:text-2xl font-medium max-w-2xl mx-auto">Our ecosystem is engineered to put more value back into your hands.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-12">
            {[
              { icon: <TrendingUp className="text-[#00D665]" />, label: "Growth", value: "3.5x", desc: "Average merchant growth YoY" },
              { icon: <ShieldCheck className="text-[#00D665]" />, label: "Security", value: "100%", desc: "Encrypted transaction protocol" },
              { icon: <Users className="text-[#00D665]" />, label: "Support", value: "24/7", desc: "Priority partner assistance" },
              { icon: <Zap className="text-[#00D665]" />, label: "Payouts", value: "Real-time", desc: "Access your capital instantly" },
            ].map((stat, i) => (
              <div key={i} className="text-center space-y-4 group">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/5 group-hover:bg-[#00D665]/10 transition-colors">
                  {stat.icon}
                </div>
                <div className="text-white text-4xl font-black tracking-tighter">{stat.value}</div>
                <div className="text-[#00D665] text-[10px] font-black uppercase tracking-widest">{stat.label}</div>
                <p className="text-white/30 text-sm font-medium leading-tight px-4">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-40 text-center">
         <h2 className="text-8xl md:text-[12rem] font-black tracking-tighter mb-16 leading-[0.85] text-black">
            Be the <br /> <span className="text-[#00D665]">Standard.</span>
         </h2>
         <div className="flex flex-wrap justify-center gap-6">
            <button className="bg-black text-white px-16 py-8 rounded-full font-black text-xl hover:bg-[#00D665] hover:text-black transition-all shadow-2xl">Create Partner Account</button>
            <button onClick={onBack} className="bg-zinc-100 text-black px-12 py-8 rounded-full font-black text-xl hover:bg-zinc-200 transition-all">Back Home</button>
         </div>
      </section>
    </div>
  );
};

export default PartnersPage;
