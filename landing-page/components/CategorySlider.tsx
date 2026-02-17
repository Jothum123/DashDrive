
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
      className={`${bgColor} ${textColor} snap-start shrink-0 rounded-[40px] md:rounded-[48px] p-10 md:p-14 lg:p-20 flex flex-col justify-end min-h-[480px] md:min-h-[580px] w-[88vw] md:w-[750px] lg:w-[1000px] transition-all duration-[0.8s] cubic-bezier(0.25, 1, 0.5, 1) cursor-pointer relative group overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_70px_100px_-20px_rgba(0,0,0,0.2)] border border-white/5 select-none`}
    >
      
      {/* Background Image (Full Bleed) */}
      {image && !isIllustration && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img src={image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.2s] opacity-40 group-hover:opacity-60" alt={subtitle} draggable="false" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-700"></div>
        </div>
      )}

      {/* Illustration (Centered/Descriptive) */}
      {image && isIllustration && (
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 md:w-1/2 aspect-square z-10 pointer-events-none group-hover:-translate-y-4 transition-transform duration-700">
          <img src={image} className="w-full h-full object-contain drop-shadow-2xl" alt={subtitle} draggable="false" />
        </div>
      )}
      
      {/* Minimalist Top Action */}
      <div className="absolute top-10 right-10 md:top-14 md:right-14 z-20">
        <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full border border-black/10 backdrop-blur-md flex items-center justify-center group-hover:bg-black group-hover:border-black group-hover:text-white transition-all duration-500 shadow-2xl ${textColor === 'text-white' ? 'border-white/20' : 'border-black/10'}`}>
          <ArrowUpRight size={24} className="group-hover:rotate-45 transition-transform duration-500" />
        </div>
      </div>

      {/* Hero-grade Typography */}
      <div className="relative z-20 max-w-2xl pointer-events-none">
        <h3 className={`text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.05] tracking-tighter mb-10 select-none whitespace-pre-line break-keep drop-shadow-sm ${textColor}`}>
          {subtitle}
        </h3>
        
        <div className="flex items-center gap-8">
          <button className={`px-10 py-4 rounded-full font-bold text-sm transition-all shadow-xl active:scale-95 pointer-events-auto ${bgColor === 'bg-[#00D665]' ? 'bg-black text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-[#00D665]'}`}>
            Explore
          </button>
          <div className={`hidden sm:block h-[1px] w-24 group-hover:w-32 transition-all duration-500 ${textColor === 'text-white' ? 'bg-white/20 group-hover:bg-[#00D665]' : 'bg-black/10 group-hover:bg-black'}`}></div>
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
    const x = e.pageX - startX;
    const walk = (x - startX) * 2;
    if (scrollContainerRef.current) scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 850 : 350;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const services = [
    {
      subtitle: "Ride\nanywhere",
      bgColor: "bg-[#00D665]",
      textColor: "text-black",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800",
      isIllustration: true,
      onExplore: onExploreRide
    },
    {
      subtitle: "Order\nAnytime",
      bgColor: "bg-[#5B6BF3]",
      textColor: "text-white",
      image: "https://images.unsplash.com/photo-1558522195-e1201b090344?auto=format&fit=crop&q=80&w=800",
      isIllustration: true,
      onExplore: onExploreOrder
    },
    {
      subtitle: "Anything\nDelivered",
      bgColor: "bg-zinc-900",
      textColor: "text-white",
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1600",
      onExplore: onExploreDeliver
    },
    {
      subtitle: "Just\nPay",
      bgColor: "bg-[#003B21]",
      textColor: "text-white",
      image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&q=80&w=800",
      isIllustration: true,
      onExplore: onExplorePay
    }
  ];

  return (
    <section className="pt-16 pb-24 md:pt-24 md:pb-40 bg-white overflow-hidden">
      <div className="max-w-[1700px] mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 lg:gap-16 mb-20 md:mb-28">
          <div className="flex-1 space-y-8">
            <div className="flex items-center gap-4">
              <span className="w-10 h-[2px] bg-[#00D665]"></span>
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-black/30">Our Ecosystem</span>
            </div>
            <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.8] text-black">
              Simply<br />
              <span className="text-[#00D665]">Better.</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-8">
            <button 
              onClick={() => scroll('left')}
              className="w-20 h-20 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all active:scale-95 group"
              aria-label="Previous slide"
            >
              <ArrowLeft size={28} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center hover:bg-[#00D665] hover:text-black transition-all active:scale-95 group shadow-2xl shadow-black/20"
              aria-label="Next slide"
            >
              <ArrowRight size={28} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div 
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex gap-10 md:gap-14 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-20 px-2 cursor-grab active:cursor-grabbing select-none`}
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
          <div className="shrink-0 w-12 md:w-32" />
        </div>
      </div>
    </section>
  );
};

export default CategorySlider;
