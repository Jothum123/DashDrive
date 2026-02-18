import React from 'react';
import { ArrowRight, ChevronDown, Play } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center pt-32 pb-20 overflow-hidden bg-[#050505]">
      {/* Premium Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2400&auto=format&fit=crop"
          alt="Premium Executive Travel"
          className="w-full h-full object-cover scale-105 animate-slow-pan opacity-40 brightness-75 grayscale-[0.2]"
        />
        {/* Editorial Gradients & Noise */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[800px] h-[800px] bg-[#00D665]/10 rounded-full blur-[160px] pointer-events-none"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="animate-reveal">
            {/* Engineering Badge */}
            <div className="inline-flex items-center gap-4 px-5 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-2xl mb-12 translate-y-4 opacity-0 animate-[reveal_1s_cubic-bezier(0.23,1,0.32,1)_forwards_0.2s]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00D665] animate-pulse"></span>
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/90">System Active</span>
              </div>
              <div className="h-3 w-[1px] bg-white/10"></div>
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">v4.0.2-London</span>
            </div>

            <div className="relative mb-16">
              <h1 className="text-white text-[10vw] lg:text-[8.5vw] font-black leading-[0.82] tracking-[-0.05em] select-none">
                MOBILITY,<br />
                <span className="text-[#00D665] text-[8vw] lg:text-[6.5vw] opacity-90 italic">evolved.</span>
              </h1>
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-16">
              <div className="max-w-2xl">
                <p className="text-white/40 text-xl md:text-2xl font-medium leading-relaxed mb-12 max-w-xl">
                  Engineered for the modern city. A unified ecosystem for travel, logistics, and digital payments, built on absolute transparency.
                </p>
                <div className="flex flex-wrap gap-6 text-[15px]">
                  <button className="group relative bg-[#00D665] text-black px-12 py-5 rounded-full font-bold overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-105 hover:shadow-[0_20px_40px_rgba(0,214,101,0.25)] active:scale-95 flex items-center gap-3">
                    <span className="relative z-10">OPEN DASHBOARD</span>
                    <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1.5 transition-transform duration-500 ease-out" />
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </button>
                  <button className="group px-10 py-5 rounded-full font-bold border border-white/10 hover:border-[#00D665]/50 text-white transition-all duration-500 backdrop-blur-md flex items-center gap-3 active:scale-95">
                    <div className="w-9 h-9 rounded-full bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-[#00D665] group-hover:text-black transition-all duration-500">
                      <Play size={12} fill="currentColor" />
                    </div>
                    EXPLORE TECHNOLOGY
                  </button>
                </div>
              </div>

              {/* Live State Dashboard Element */}
              <div className="hidden lg:flex flex-col items-end group">
                <div className="p-10 bg-white/[0.02] backdrop-blur-3xl rounded-[48px] border border-white/[0.06] shadow-2xl space-y-8 min-w-[340px] hover:border-[#00D665]/20 transition-colors duration-500">
                  <div className="flex justify-between items-center">
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4].map(i => (
                        <img
                          key={i}
                          src={`https://i.pravatar.cc/100?img=${i + 30}`}
                          className="w-12 h-12 rounded-full border-2 border-[#111] grayscale group-hover:grayscale-0 transition-all duration-700"
                          alt="User"
                        />
                      ))}
                    </div>
                    <div className="px-3 py-1 bg-[#00D665]/10 border border-[#00D665]/20 rounded-full">
                      <span className="text-[#00D665] text-[10px] font-bold tracking-widest">LIVE FEED</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">Global Transactions / 24h</p>
                      <div className="text-white font-black text-4xl tracking-tighter tabular-nums">1,209,481</div>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-[#00D665] w-[75%] animate-[progress_3s_ease-out_forwards]"></div>
                    </div>
                    <p className="text-[10px] font-medium text-white/30 italic">Target: 2.5M by EOD</p>
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
          0% { transform: scale(1.1) translateX(1%); }
          100% { transform: scale(1.05) translateX(-1%); }
        }
        @keyframes progress {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-slow-pan {
          animation: slow-pan 40s ease-in-out infinite alternate;
        }
      `}</style>
    </section>
  );
};

export default Hero;
