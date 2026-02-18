
import React, { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

interface ServiceCardProps {
  subtitle: string;
  bgColor: string;
  textColor: string;
  image?: string;
  isIllustration?: boolean;
  onExplore?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  subtitle,
  bgColor,
  textColor,
  image,
  isIllustration = false,
  onExplore
}) => {
  return (
    <div
      onClick={onExplore}
      className={`
        ${bgColor} ${textColor} snap-start shrink-0
        rounded-[48px] md:rounded-[60px]
        p-10 md:p-16 flex flex-col justify-end
        min-h-[500px] md:min-h-[620px]
        w-[88vw] md:w-[780px] lg:w-[1050px]
        transition-all duration-[0.8s] ease-[cubic-bezier(0.23,1,0.32,1)]
        cursor-pointer relative group overflow-hidden
        border border-white/5 select-none
        hover:shadow-[0_64px_128px_-32px_rgba(0,0,0,0.3)]
      `}
    >
      {/* Handcrafted Depth Glass Rim */}
      <div className="absolute inset-0 border-[0.5px] border-white/10 rounded-[inherit] z-20 pointer-events-none group-hover:border-[#00D665]/20 transition-colors duration-700" />

      {/* Background Image (Cinematic Fade) */}
      {image && !isIllustration && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src={image}
            className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-all duration-[1.5s] ease-out opacity-20 group-hover:opacity-40 grayscale group-hover:grayscale-0"
            alt={subtitle}
            draggable="false"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700"></div>
          {/* Subtle Grainy Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
        </div>
      )}

      {/* Illustration (Centered/Descriptive) */}
      {image && isIllustration && (
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 md:w-1/2 aspect-square z-10 pointer-events-none group-hover:-translate-y-4 transition-transform duration-700">
          <img src={image} className="w-full h-full object-contain drop-shadow-2xl" alt={subtitle} draggable="false" />
        </div>
      )}

      {/* Engineering Label */}
      <div className="absolute top-10 left-10 md:top-14 md:left-16 z-20">
        <div className="flex items-center gap-3 opacity-30 group-hover:opacity-60 transition-opacity duration-500">
          <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] whitespace-nowrap">Service Module v4.0</span>
        </div>
      </div>

      {/* Minimalist Top Action */}
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

      {/* Editorial Typography */}
      <div className="relative z-20 max-w-4xl pointer-events-none">
        <h3 className={`text-5xl sm:text-7xl lg:text-[7.5rem] leading-[0.82] tracking-[-0.05em] mb-12 select-none whitespace-pre-line lowercase italic transition-all duration-700 font-light group-hover:tracking-[-0.07em]`}>
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
            VIEW PROGRAM
          </button>
          <div className={`h-[1px] flex-1 max-w-[200px] transition-all duration-1000 ease-out origin-left scale-x-50 group-hover:scale-x-100 ${textColor === 'text-white' ? 'bg-white/10' : 'bg-black/10'}`}></div>
        </div>
      </div>
    </div>
  );
};

interface CategorySliderProps {
  onExploreRide?: () => void;
  onExploreOrder?: () => void;
  onExploreDeliver?: () => void;
  onExplorePay?: () => void;
}

const CategorySlider: React.FC<CategorySliderProps> = ({ onExploreRide, onExploreOrder, onExploreDeliver, onExplorePay }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    // Use pageX directly or relative to container
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    scrollContainerRef.current.style.scrollSnapType = 'none';
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.style.scrollSnapType = 'x mandatory';
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.scrollSnapType = 'x mandatory';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      // Precise scroll amount based on CSS widths (Card + Gap)
      // LG: 1050 + 64 (gap-16 is 4rem/64px) = 1114 approx
      // MD: 780 + 64 = 844 approx
      const scrollAmount = window.innerWidth >= 1280 ? 1114 : (window.innerWidth >= 768 ? 844 : window.innerWidth * 0.9);
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

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
    <section className="pt-24 pb-32 md:pt-40 md:pb-56 bg-white overflow-hidden rounded-t-[48px] md:rounded-t-[100px] -mt-12 md:-mt-24 relative z-20">
      <div className="max-w-[1700px] mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-16 lg:gap-24 mb-24 md:mb-36">
          <div className="flex-1 space-y-10 group">
            <div className="flex items-center gap-5">
              <span className="w-12 h-[2.5px] bg-[#00D665] origin-left group-hover:scale-x-150 transition-transform duration-700"></span>
              <span className="text-[12px] font-black uppercase tracking-[0.4em] text-black/20">The Ecosystem</span>
            </div>
            <h2 className="text-7xl md:text-9xl lg:text-[11rem] font-light tracking-tight leading-[0.8] text-black">
              Simply <br />
              <span className="font-black text-[#00D665] tracking-tighter">Better.</span>
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => scroll('left')}
              className="w-20 h-20 rounded-full border border-black/[0.06] flex items-center justify-center hover:bg-zinc-50 transition-all duration-500 active:scale-95 group"
              aria-label="Previous slide"
            >
              <ArrowLeft size={28} className="text-black/20 group-hover:text-black transition-colors" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center hover:bg-[#00D665] hover:text-black transition-all duration-700 active:scale-95 group shadow-[0_24px_48px_rgba(0,0,0,0.12)]"
              aria-label="Next slide"
            >
              <ArrowRight size={28} className="group-hover:translate-x-1.5 transition-transform duration-500 ease-out" />
            </button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`
            flex gap-12 md:gap-16
            overflow-x-auto no-scrollbar snap-x snap-mandatory
            pb-32 px-4 cursor-grab active:cursor-grabbing select-none
            transition-all duration-700
          `}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {services.map((service, idx) => (
            <ServiceCard
              key={idx}
              subtitle={service.subtitle}
              bgColor={service.bgColor}
              textColor={service.textColor}
              image={service.image}
              isIllustration={service.isIllustration}
              onExplore={service.onExplore}
            />
          ))}
          <div className="shrink-0 w-24 md:w-48" />
        </div>
      </div>
    </section>
  );
};

export default CategorySlider;
