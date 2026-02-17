
import React from 'react';
import { BadgeDollarSign, Users, Scale, ArrowRight, Handshake } from 'lucide-react';

const Features: React.FC = () => {
  const steps = [
    {
      icon: <BadgeDollarSign className="w-8 h-8 text-black" strokeWidth={1.5} />,
      title: "Set your price",
      label: "Step 01",
      desc: "You request a service and set your own price. No hidden algorithms or automated surges—just a fair offer from you to the community."
    },
    {
      icon: <Handshake className="w-8 h-8 text-black" strokeWidth={1.5} />,
      title: "Get offers",
      label: "Step 02",
      desc: "Service providers see your request and can either accept, reject, or send a counteroffer. You keep total control over the negotiation."
    },
    {
      icon: <Users className="w-8 h-8 text-black" strokeWidth={1.5} />,
      title: "Choose & Pay",
      label: "Step 03",
      desc: "Select your preferred driver and pay them directly. By cutting out the middleman's price manipulation, we keep costs lower for everyone."
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-black text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00D665]/10 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00D665]/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-6 md:px-12 max-w-[1700px] relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-12">
          <div className="flex-1 space-y-8">
            <div className="flex items-center gap-4">
              <span className="w-10 h-[2px] bg-[#00D665]"></span>
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white/30">The Method</span>
            </div>
            <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.8] text-white">
              Freedom from <br />
              <span className="text-[#00D665]">Algorithms.</span>
            </h2>
          </div>
          <p className="text-white/40 text-xl font-medium max-w-md leading-relaxed lg:mb-4">
            We believe in fair offers and clear agreements. Our model works for all services, ensuring transparency and lower costs for every journey.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="group relative bg-white/5 border border-white/10 p-12 rounded-[60px] hover:bg-white/10 transition-all duration-700 hover:-translate-y-4">
              <div className="flex justify-between items-start mb-12">
                <div className="w-20 h-20 bg-[#00D665] rounded-[32px] flex items-center justify-center shadow-[0_20px_40px_rgba(0,214,101,0.2)] group-hover:scale-110 transition-transform duration-500">
                  {step.icon}
                </div>
                <span className="text-white/10 font-black text-4xl group-hover:text-[#00D665]/20 transition-colors">{step.label}</span>
              </div>
              <h3 className="text-3xl font-black tracking-tight mb-4">{step.title}</h3>
              <p className="text-white/40 text-lg leading-relaxed font-medium group-hover:text-white/60 transition-colors">{step.desc}</p>
              <div className="absolute bottom-10 left-12 right-12 h-[2px] bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          ))}
        </div>

        <div className="mt-24 flex flex-col md:flex-row items-center justify-center gap-12">
          <button className="bg-[#00D665] text-black px-16 py-6 rounded-full font-black text-xl hover:scale-105 transition-all duration-500 shadow-[0_20px_60px_rgba(0,214,101,0.3)] flex items-center gap-4">
            Try fair pricing
            <ArrowRight size={20} />
          </button>
          <div className="flex items-center gap-4 text-white/40 font-bold text-sm">
            <Scale className="text-[#00D665]" size={16} />
            No surge pricing ever
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
