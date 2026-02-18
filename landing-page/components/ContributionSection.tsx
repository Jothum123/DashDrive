
import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const ContributionSection: React.FC = () => {
  const contributions = [
    {
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
      title: "Empowering Local Micro-Entrepreneurs",
      desc: "DriveGo supported over 500,000 local drivers in 2024, generating $1.2B in household income through our peer-to-peer ecosystem.",
      label: "Economic impact"
    },
    {
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
      title: "AI Centre of Excellence",
      desc: "Our strategic innovation hub accelerates intelligent accessibility and contributes to smart nation building across the globe.",
      label: "Innovation"
    },
    {
      image: "https://images.unsplash.com/photo-1512428559083-a400a3b8445e?auto=format&fit=crop&q=80&w=800",
      title: "Data Trust and Security First",
      desc: "Recognized for continuous commitment to data protection, ensuring user security remains the cornerstone of every transaction.",
      label: "Security"
    }
  ];

  return (
    <section className="py-24 md:py-48 bg-white overflow-hidden relative rounded-t-[48px] md:rounded-t-[100px] -mt-12 md:-mt-24 z-20">
      <div className="max-w-[1700px] mx-auto px-6 md:px-12">
        <div className="mb-32 space-y-10 group">
          <div className="flex items-center gap-5">
            <span className="w-12 h-[2px] bg-[#00D665] origin-left group-hover:scale-x-150 transition-transform duration-700"></span>
            <span className="text-[12px] font-bold uppercase tracking-[0.4em] text-black/20">Social Good</span>
          </div>
          <h2 className="text-7xl md:text-9xl lg:text-[11rem] font-light tracking-tight leading-[0.8] text-black">
            Making an <br />
            <span className="text-[#00D665] font-black tracking-tighter italic">Impact.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10 md:gap-14">
          {contributions.map((item, idx) => (
            <div key={idx} className="group flex flex-col h-full bg-[#FBFBFB] border border-black/[0.03] rounded-[56px] p-12 hover:bg-[#050505] transition-all duration-[0.8s] ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer relative overflow-hidden">
              {/* Handcrafted Rim */}
              <div className="absolute inset-0 border border-black/[0.02] rounded-[inherit] pointer-events-none z-20 group-hover:border-[#00D665]/20 transition-colors duration-700" />

              <div className="aspect-[16/10] overflow-hidden rounded-[32px] mb-12 relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-[1.2s] ease-out opacity-80 group-hover:opacity-100"
                />
                <div className="absolute top-4 left-4">
                  <div className="px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-white/80">Impact v4.0</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-6">
                <span className="text-[12px] font-bold text-[#00D665] uppercase tracking-widest block">{item.label}</span>
                <h3 className="text-3xl md:text-4xl font-black mb-6 text-[#050505] group-hover:text-white transition-colors duration-500 leading-[1.1] tracking-tight">{item.title}</h3>
                <p className="text-black/40 group-hover:text-white/40 text-lg md:text-xl font-medium mb-12 leading-relaxed transition-colors duration-700">{item.desc}</p>
              </div>

              <div className="flex justify-between items-center pt-8 border-t border-black/[0.04] group-hover:border-white/10 transition-colors duration-700">
                <span className="text-[10px] font-bold uppercase tracking-widest text-black/20 group-hover:text-white/20">Read Case Study</span>
                <div className="w-16 h-16 rounded-full border border-black/[0.08] group-hover:border-[#00D665] flex items-center justify-center text-[#050505] group-hover:text-[#00D665] transition-all duration-700 group-hover:bg-[#00D665]/5">
                  <ArrowUpRight size={24} className="group-hover:rotate-45 transition-transform duration-700" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContributionSection;
