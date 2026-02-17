
import React, { useEffect, useState } from 'react';
import { 
  Crown, 
  Zap, 
  Car, 
  Utensils, 
  ShoppingBag, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Globe, 
  Plus, 
  ChevronDown,
  Sparkles,
  Bike,
  Heart
} from 'lucide-react';

interface DriveGoPlusProps {
  onBack: () => void;
}

const DriveGoPlus: React.FC<DriveGoPlusProps> = ({ onBack }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const coreBenefits = [
    {
      title: "Infinite Express",
      subtitle: "$0 Delivery on all Food & Grocery",
      desc: "Save an average of $3.50 on every order. No minimums on DriveGo Instant.",
      image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800",
      color: "bg-[#00D665]",
      textColor: "text-black"
    },
    {
      title: "Elite Rebates",
      subtitle: "10% Credit Back on 10 Rides",
      desc: "Every trip earns you capital. Credits applied instantly to your DriveGo Wallet.",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800",
      color: "bg-zinc-950",
      textColor: "text-white"
    },
    {
      title: "Social Dining",
      subtitle: "Buy 1 Get 1 at Elite Spots",
      desc: "Unlock premium brunches and fine dining deals only available to Plus members.",
      image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800",
      color: "bg-[#EBFFF5]",
      textColor: "text-zinc-900"
    }
  ];

  return (
    <div className="bg-white min-h-screen pt-32 animate-reveal">
      {/* Hero: The Elite Upgrade */}
      <section className="max-w-[1500px] mx-auto px-6 mb-24">
        <div className="relative rounded-[72px] overflow-hidden min-h-[700px] flex items-center bg-[#003B21]">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1512428559083-a400a3b8445e?auto=format&fit=crop&q=80&w=2400" 
              className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-[2s]" 
              alt="Elite Lifestyle" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#003B21] via-[#003B21]/60 to-transparent"></div>
          </div>

          <div className="container mx-auto px-12 md:px-24 relative z-10">
            <div className="max-w-3xl space-y-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#00D665] rounded-2xl flex items-center justify-center text-black shadow-lg shadow-emerald-500/20">
                  <Crown size={24} fill="currentColor" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white/60">The Membership Program</span>
              </div>
              
              <h1 className="text-white text-6xl md:text-[9vw] font-black tracking-tighter leading-[0.8]">
                Upgrade your <br /> <span className="text-[#00D665]">standard.</span>
              </h1>
              
              <p className="text-white/60 text-2xl font-medium max-w-xl">
                Unlock exclusive savings across mobility, dining, and shopping. Designed for those who move through the city with purpose.
              </p>
              
              <div className="flex flex-wrap gap-6 items-center">
                <button className="bg-[#00D665] text-black px-16 py-8 rounded-[32px] font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-emerald-500/10">
                  Join for $19/mo
                </button>
                <div className="flex flex-col">
                  <span className="text-white font-black text-lg">Save $100+ monthly</span>
                  <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Average member return</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating Mobile UI Preview */}
          <div className="hidden xl:block absolute right-24 bottom-[-40px] w-[340px] h-[680px] bg-white rounded-[56px] shadow-[0_64px_128px_-24px_rgba(0,0,0,0.5)] border-[12px] border-zinc-900 p-8 overflow-hidden">
             <div className="space-y-6">
                <div className="flex justify-between items-center">
                   <div className="w-12 h-1 bg-zinc-100 rounded-full"></div>
                   <div className="w-12 h-1 bg-zinc-100 rounded-full"></div>
                </div>
                <div className="bg-[#EBFFF5] p-8 rounded-[40px] space-y-4">
                   <div className="w-10 h-10 bg-[#00D665] rounded-xl flex items-center justify-center text-black">
                      <Crown size={20} fill="currentColor" />
                   </div>
                   <h4 className="font-black text-2xl tracking-tighter">Elite Member</h4>
                   <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Savings this month: $124.50</p>
                </div>
                <div className="space-y-3">
                   {[1, 2, 3].map(i => (
                     <div key={i} className="flex items-center gap-3 p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-zinc-300"><Zap size={14} /></div>
                        <div className="h-2 w-24 bg-zinc-200 rounded-full"></div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Benefits Breakdown */}
      <section className="max-w-[1500px] mx-auto px-6 mb-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coreBenefits.map((benefit, i) => (
            <div key={i} className={`group relative p-12 rounded-[56px] min-h-[600px] flex flex-col justify-end overflow-hidden ${benefit.color} ${benefit.textColor}`}>
              <div className="absolute inset-0 z-0 pointer-events-none">
                 <img src={benefit.image} className="w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-[2s]" alt={benefit.title} />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>
              <div className="relative z-10 space-y-6">
                <h3 className="text-4xl font-black tracking-tighter leading-none">{benefit.title}</h3>
                <div className="space-y-2">
                  <p className="font-black text-sm uppercase tracking-widest opacity-60">{benefit.subtitle}</p>
                  <p className="text-lg font-medium opacity-80 leading-relaxed">{benefit.desc}</p>
                </div>
                <button className={`w-14 h-14 rounded-full flex items-center justify-center border ${benefit.textColor === 'text-white' ? 'border-white/20 hover:bg-white hover:text-black' : 'border-black/10 hover:bg-black hover:text-white'} transition-all`}>
                  <ArrowRight size={24} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The "Plus" Perks Grid */}
      <section className="py-32 bg-zinc-50 rounded-[80px] mx-6 md:mx-12 mb-40">
         <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="text-6xl font-black tracking-tighter text-center mb-24">Even more to <span className="text-[#00D665]">Elite.</span></h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: <Bike className="text-[#00D665]" />, title: "30% off Bike", desc: "Infinite city cycles." },
                { icon: <Globe className="text-[#00D665]" />, title: "Better Rates", desc: "Elite Remittance fees." },
                { icon: <Zap className="text-[#00D665]" />, title: "Home Pro", desc: "10% off Cleaning." },
                { icon: <ShieldCheck className="text-[#00D665]" />, title: "Red Line", desc: "30s support response." },
              ].map((perk, i) => (
                <div key={i} className="bg-white p-10 rounded-[40px] text-center space-y-4 hover:shadow-2xl hover:-translate-y-2 transition-all group">
                   <div className="w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#EBFFF5] transition-colors">{perk.icon}</div>
                   <h4 className="text-2xl font-black tracking-tight">{perk.title}</h4>
                   <p className="text-zinc-400 font-bold text-sm">{perk.desc}</p>
                </div>
              ))}
            </div>
         </div>
      </section>

      {/* How to Join */}
      <section className="max-w-[1400px] mx-auto px-6 mb-40">
        <div className="text-center mb-24 space-y-4">
           <h2 className="text-7xl font-black tracking-tighter italic">Three steps to Elite.</h2>
           <p className="text-xl text-zinc-400 font-medium">Instant activation, zero commitments.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { step: "01", title: "Tap Plus", desc: "Select the 'Plus' icon in your DriveGo dashboard." },
            { step: "02", title: "Confirm", desc: "One-tap verification with your linked payment method." },
            { step: "03", title: "Go Elite", desc: "Immediate access to all savings and priority perks." },
          ].map((s, i) => (
            <div key={i} className="relative p-12 bg-white rounded-[48px] border border-zinc-100 shadow-sm overflow-hidden group">
               <span className="absolute top-0 right-0 text-[10rem] font-black text-zinc-50 -translate-y-1/4 translate-x-1/4 group-hover:text-[#EBFFF5] transition-colors duration-700">{s.step}</span>
               <div className="relative z-10 space-y-6">
                  <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center font-black">{s.step}</div>
                  <h3 className="text-4xl font-black tracking-tighter">{s.title}</h3>
                  <p className="text-xl text-zinc-500 font-medium leading-relaxed">{s.desc}</p>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-32 bg-[#EBFFF5] rounded-[80px] mx-6 md:mx-12 mb-32">
        <div className="max-w-[1000px] mx-auto px-6">
          <h2 className="text-6xl font-black tracking-tighter text-center mb-20">Elite Questions.</h2>
          <div className="space-y-4">
            {[
              { q: "What is DriveGo Plus?", a: "DriveGo Plus is our premium membership that consolidates savings across our entire ecosystem—offering free delivery, ride rebates, and dining perks for one flat monthly fee." },
              { q: "Can I cancel anytime?", a: "Yes. We offer total flexibility. Cancel with one tap in the app and keep your benefits until the end of your billing cycle." },
              { q: "Do the ride rebates expire?", a: "Plus credits stay in your DriveGo Wallet for 12 months, ready for use on any service." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-[32px] overflow-hidden transition-all shadow-sm">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-10 flex items-center justify-between text-left"
                >
                  <h4 className="text-3xl font-black tracking-tight">{item.q}</h4>
                  <ChevronDown className={`transition-transform duration-500 ${openFaq === idx ? 'rotate-180 text-[#00D665]' : 'text-zinc-300'}`} size={32} />
                </button>
                {openFaq === idx && (
                  <div className="px-10 pb-10 animate-reveal">
                    <p className="text-xl text-zinc-500 font-medium leading-relaxed border-t border-zinc-50 pt-8">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-40 text-center">
         <h2 className="text-8xl md:text-[12rem] font-black tracking-tighter mb-16 leading-[0.85] text-black">
            Join the <br /> <span className="text-[#00D665]">Standard.</span>
         </h2>
         <div className="flex flex-wrap justify-center gap-6">
            <button className="bg-black text-white px-20 py-8 rounded-full font-black text-2xl hover:bg-[#00D665] hover:text-black transition-all shadow-2xl">Start Elite Membership</button>
            <button onClick={onBack} className="bg-zinc-100 text-black px-12 py-8 rounded-full font-black text-xl hover:bg-zinc-200 transition-all">Not Today</button>
         </div>
      </section>
    </div>
  );
};

export default DriveGoPlus;
