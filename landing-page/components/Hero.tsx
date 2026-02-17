
import React from 'react';
import { ArrowRight, ChevronDown, Play } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center pt-32 pb-20 overflow-hidden bg-zinc-950">
      {/* High-End Background Image with Multi-Layer Parallax feel */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2400&auto=format&fit=crop" 
          alt="Premium Executive Travel" 
          className="w-full h-full object-cover scale-100 animate-slow-pan opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/20"></div>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="animate-reveal">
            {/* Minimalist Upper Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-10 translate-y-4 opacity-0 animate-[reveal_0.8s_ease_forwards_0.2s]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D665]"></span>
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/70">The New Global Standard</span>
            </div>

            <h1 className="text-white text-[9vw] lg:text-[7vw] font-black leading-[0.9] tracking-tighter mb-12 select-none">
              Mobility,<br />
              <span className="text-[#00D665]">evolved.</span>
            </h1>
            
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
              <div className="max-w-xl">
                <p className="text-white/50 text-xl md:text-2xl font-medium leading-relaxed mb-10">
                  DriveGo is a premium mobility ecosystem engineered for transparency, efficiency, and safety. Setting the pace for modern urban travel.
                </p>
                <div className="flex flex-wrap gap-5">
                  <button className="group bg-[#00D665] text-black px-10 py-5 rounded-full text-base font-black hover:scale-105 transition-all duration-500 shadow-[0_20px_40px_rgba(0,214,101,0.15)] flex items-center gap-3">
                    Get Started
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="group px-10 py-5 rounded-full text-base font-black border border-white/10 hover:border-white/30 text-white transition-all backdrop-blur-md flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <Play size={12} fill="white" />
                    </div>
                    How it works
                  </button>
                </div>
              </div>

              <div className="hidden lg:flex flex-col items-end">
                <div className="p-10 bg-white/5 backdrop-blur-3xl rounded-[40px] border border-white/10 shadow-2xl space-y-4">
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                      <img key={i} src={`https://i.pravatar.cc/100?img=${i+30}`} className="w-12 h-12 rounded-full border-2 border-zinc-900 shadow-lg" alt="User" />
                    ))}
                    <div className="w-12 h-12 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center font-black text-[9px] text-white/40">
                      +15M
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/30">Verified Active Trips</p>
                    <div className="text-white font-black text-2xl tracking-tighter">1,209,481</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/10">
        <ChevronDown size={24} />
      </div>

      <style>{`
        @keyframes slow-pan {
          0% { transform: scale(1.05) translateX(0); }
          100% { transform: scale(1) translateX(-2%); }
        }
        .animate-slow-pan {
          animation: slow-pan 30s ease-in-out infinite alternate;
        }
      `}</style>
    </section>
  );
};

export default Hero;
