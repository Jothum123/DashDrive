
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
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-[1700px] mx-auto px-6 md:px-12">
        <div className="mb-20 md:mb-28 space-y-8">
          <div className="flex items-center gap-4">
            <span className="w-10 h-[2px] bg-[#00D665]"></span>
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-black/30">Social Good</span>
          </div>
          <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.8] text-black">
            Making an <br />
            <span className="text-[#00D665]">Impact.</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {contributions.map((item, idx) => (
            <div key={idx} className="group flex flex-col h-full bg-[#F8F9FA] rounded-[48px] p-10 hover:bg-[#1A1A1A] transition-all duration-700 cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden rounded-[32px] mb-8">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90" 
                />
              </div>
              <div className="flex-1">
                <span className="text-[12px] font-bold text-[#00D665] mb-4 block">{item.label}</span>
                <h3 className="text-3xl font-black mb-4 text-[#1A1A1A] group-hover:text-white transition-colors leading-tight">{item.title}</h3>
                <p className="text-gray-500 group-hover:text-white/50 font-medium mb-8 leading-relaxed">{item.desc}</p>
              </div>
              <div className="flex justify-end">
                <div className="w-14 h-14 rounded-full border-2 border-gray-200 group-hover:border-[#00D665] flex items-center justify-center text-[#1A1A1A] group-hover:text-[#00D665] transition-all">
                  <ArrowUpRight size={24} />
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
