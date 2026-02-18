import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface ServiceCardProps {
  subtitle: string;
  bgColor: string;
  textColor: string;
  image?: string;
  isIllustration?: boolean;
  onExplore?: () => void;
  progress: MotionValue<number>;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  subtitle,
  bgColor,
  textColor,
  image,
  isIllustration = false,
  onExplore,
  progress,
  index
}) => {
  // Global progress is 0 to 1 over 600vh
  // Animation phase is 0.15 to 0.85
  const animStart = 0.15;
  const animEnd = 0.85;
  const step = (animEnd - animStart) / 4;
  const start = animStart + index * step;
  const end = animStart + (index + 1) * step;

  const scale = useTransform(progress, [start - 0.05, start + 0.1, end + 0.05], [0.85, 1, 0.85]);
  const opacity = useTransform(progress, [start - 0.05, start + 0.1, end + 0.05], [0.3, 1, 0.3]);
  const yParallax = useTransform(progress, [start, end], [-30, 30]);

  const springScale = useSpring(scale, { stiffness: 120, damping: 25, restDelta: 0.001 });

  return (
    <motion.div
      style={{
        scale: springScale,
        opacity,
        y: yParallax
      }}
      onClick={onExplore}
      className={`
        ${bgColor} ${textColor} shrink-0
        rounded-[48px] md:rounded-[60px]
        p-10 md:p-16 flex flex-col justify-end
        min-h-[500px] md:min-h-[620px]
        w-[80vw] md:w-[700px] lg:w-[900px]
        cursor-pointer relative group overflow-hidden
        border border-white/5 select-none
        hover:shadow-[0_64px_128px_-32px_rgba(0,0,0,0.3)]
      `}
    >
      <div className="absolute inset-0 border-[0.5px] border-white/10 rounded-[inherit] z-20 pointer-events-none group-hover:border-[#00D665]/20 transition-colors duration-700" />

      {image && !isIllustration && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <motion.img
            style={{
              scale: useTransform(progress, [start, end], [1.3, 1])
            }}
            src={image}
            className="w-full h-full object-cover transition-all duration-[1.5s] ease-out opacity-20 group-hover:opacity-40 grayscale group-hover:grayscale-0"
            alt={subtitle}
            draggable="false"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700"></div>
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
        </div>
      )}

      {image && isIllustration && (
        <motion.div
          style={{
            y: useTransform(progress, [start, end], [-60, 60])
          }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 md:w-1/2 aspect-square z-10 pointer-events-none"
        >
          <img src={image} className="w-full h-full object-contain drop-shadow-2xl" alt={subtitle} draggable="false" />
        </motion.div>
      )}

      <div className="absolute top-10 left-10 md:top-14 md:left-16 z-20">
        <div className="flex items-center gap-3 opacity-30 group-hover:opacity-60 transition-opacity duration-500">
          <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] whitespace-nowrap">Service Module v7.0</span>
        </div>
      </div>

      <div className="absolute top-10 right-10 md:top-14 md:right-16 z-20">
        <div className={`
          w-14 h-14 md:w-18 md:h-18 rounded-full
          border border-white/10 backdrop-blur-2xl
          flex items-center justify-center
          group-hover:bg-[#00D665] group-hover:border-[#00D665] group-hover:text-black
          transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
          shadow-2xl translate-y-0 group-hover:-translate-y-1
        `}>
          <ArrowUpRight size={24} className="group-hover:rotate-45 transition-transform duration-700" />
        </div>
      </div>

      <div className="relative z-20 max-w-4xl pointer-events-none">
        <h3 className={`text-5xl sm:text-7xl lg:text-8xl leading-[0.82] tracking-[-0.05em] mb-12 select-none whitespace-pre-line lowercase italic transition-all duration-700 font-light group-hover:tracking-[-0.07em]`}>
          {subtitle.split('\n')[0]} <br />
          <span className="font-black not-italic text-[#00D665] uppercase tracking-tighter opacity-90">{subtitle.split('\n')[1]}</span>
        </h3>

        <div className="flex items-center gap-10">
          <button className={`
            px-12 py-5 rounded-full font-bold text-[13px]
            transition-all duration-700 cubic-bezier(0.23, 1, 0.32, 1)
            shadow-[0_20px_40px_rgba(0,0,0,0.1)] active:scale-95 pointer-events-auto
            ${bgColor === 'bg-[#00D665]' ? 'bg-black text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-[#00D665]'}
          `}>
            EXPLORE
          </button>
          <div className={`h-[1px] flex-1 max-w-[200px] transition-all duration-1000 ease-out origin-left scale-x-50 group-hover:scale-x-100 ${textColor === 'text-white' ? 'bg-white/10' : 'bg-black/10'}`}></div>
        </div>
      </div>
    </motion.div>
  );
};

interface CategorySliderProps {
  onExploreRide?: () => void;
  onExploreOrder?: () => void;
  onExploreDeliver?: () => void;
  onExplorePay?: () => void;
}

const CategorySlider: React.FC<CategorySliderProps> = ({ onExploreRide, onExploreOrder, onExploreDeliver, onExplorePay }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Precise segmenting: 
  // 0% - 15%: Start hold (header focus)
  // 15% - 85%: Translate carousel
  // 85% - 100%: End hold (final card focus)
  const x = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], ["0%", "0%", "-78%", "-78%"]);

  const services = [
    {
      subtitle: "Ride\nanywhere",
      bgColor: "bg-[#0A0A0A]",
      textColor: "text-white",
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1600",
      isIllustration: false,
      onExplore: onExploreRide
    },
    {
      subtitle: "Order\nAnytime",
      bgColor: "bg-[#5B6BF3]",
      textColor: "text-white",
      image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1600",
      isIllustration: false,
      onExplore: onExploreOrder
    },
    {
      subtitle: "Anything\nDelivered",
      bgColor: "bg-zinc-950",
      textColor: "text-white",
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1600",
      isIllustration: false,
      onExplore: onExploreDeliver
    },
    {
      subtitle: "Just\nPay",
      bgColor: "bg-[#003B21]",
      textColor: "text-white",
      image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&q=80&w=1600",
      isIllustration: false,
      onExplore: onExplorePay
    }
  ];

  return (
    <div ref={containerRef} className="relative h-[600vh] bg-white rounded-t-[48px] md:rounded-t-[100px] -mt-12 md:-mt-24 z-30">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <div className="max-w-[1700px] mx-auto w-full px-6 md:px-12 pt-16 md:pt-24 lg:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-24 mb-12 md:mb-16"
          >
            <div className="flex-1 space-y-6 md:space-y-10 group">
              <div className="flex items-center gap-5">
                <span className="w-12 h-[2px] bg-[#00D665] origin-left group-hover:scale-x-150 transition-transform duration-700"></span>
                <span className="text-[12px] font-black uppercase tracking-[0.4em] text-black/20">The Ecosystem</span>
              </div>
              <h2 className="text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-light tracking-tight leading-[0.85] text-black">
                Simply <br />
                <span className="font-black text-[#00D665] tracking-tighter">Better.</span>
              </h2>
            </div>
          </motion.div>

          <div className="overflow-visible">
            <motion.div style={{ x }} className="flex gap-8 md:gap-16 items-start">
              {services.map((service, idx) => (
                <ServiceCard
                  key={idx}
                  index={idx}
                  subtitle={service.subtitle}
                  bgColor={service.bgColor}
                  textColor={service.textColor}
                  image={service.image}
                  isIllustration={service.isIllustration}
                  onExplore={service.onExplore}
                  progress={scrollYProgress}
                />
              ))}
              <div className="shrink-0 w-[50vw]" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySlider;
