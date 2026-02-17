
import React from 'react';
import { ArrowRight } from 'lucide-react';

const NewsroomSection: React.FC = () => {
  const news = [
    {
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
      date: "Feb 12, 2025",
      title: "DriveGo Reports Fourth Quarter and Full Year 2024 Results with Record Growth",
    },
    {
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600",
      date: "Feb 10, 2025",
      title: "Strategic Financial Roadmap: Accelerating Payments Integration Globally",
    },
    {
      image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=600",
      date: "Feb 09, 2025",
      title: "DriveGo and Partners Announce Strategic Tech Alignment for Smart Cities",
    },
    {
      image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&q=80&w=600",
      date: "Feb 05, 2025",
      title: "Tap to Pay: Empowering Local Merchants to Accept Cashless Payments Instantly",
    }
  ];

  return (
    <section className="py-32 bg-[#1A1A1A] text-white">
      <div className="max-w-[1700px] mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-24">
          <div className="flex-1 space-y-8">
            <div className="flex items-center gap-4">
              <span className="w-10 h-[2px] bg-[#00D665]"></span>
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white/30">The Desk</span>
            </div>
            <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.8] text-white">
              Latest from <br />
              <span className="text-[#00D665]">the Intel.</span>
            </h2>
          </div>
          <button className="hidden md:flex items-center gap-3 text-lg font-bold text-white hover:text-[#00D665] transition-colors border-b-2 border-[#00D665] pb-1 lg:mb-4">
            Browse newsroom <ArrowRight size={20} />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {news.map((item, idx) => (
            <div key={idx} className="group bg-white/5 rounded-[40px] p-8 hover:bg-white/10 transition-all duration-500 cursor-pointer flex flex-col">
              <div className="aspect-video overflow-hidden rounded-[24px] mb-8 grayscale group-hover:grayscale-0 transition-all duration-700">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
              </div>
              <span className="text-[12px] font-bold text-[#00D665] mb-4 block">{item.date}</span>
              <h3 className="text-xl font-bold leading-tight mb-8 flex-1 group-hover:text-white transition-colors">
                {item.title}
              </h3>
              <div className="text-white/40 group-hover:text-[#00D665] font-bold text-sm flex items-center gap-2">
                Read article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 md:hidden">
          <button className="w-full py-6 rounded-3xl bg-[#00D665] text-[#1A1A1A] font-bold text-xl">
            See more news
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsroomSection;
