
import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  User, 
  Navigation, 
  X, 
  Car, 
  Bike, 
  Search, 
  GraduationCap, 
  Utensils, 
  Smile, 
  Zap, 
  Store, 
  Stethoscope, 
  Smartphone, 
  Package, 
  Wallet, 
  Send,
  Globe,
  ArrowRight,
  ShoppingBag,
  ChevronDown,
  Briefcase,
  Crown
} from 'lucide-react';

interface NavbarProps {
  onLogoClick?: () => void;
  onNavigate?: (page: 'home' | 'mobility' | 'order' | 'delivery' | 'payment' | 'partners' | 'plus') => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogoClick, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPartnersMenuOpen, setIsPartnersMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'ride' | 'food' | 'shopping' | 'financial'>('ride');
  const menuRef = useRef<HTMLDivElement>(null);
  const partnersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
      if (partnersRef.current && !partnersRef.current.contains(event.target as Node)) {
        setIsPartnersMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const menuData = {
    ride: {
      label: 'Ride',
      services: [
        { id: 'mobility', label: 'Ride', icon: <Car size={16} /> },
        { id: 'mobility', label: 'Taxi', icon: <Navigation size={16} /> },
        { id: 'mobility', label: 'Bike', icon: <Bike size={16} /> },
        { id: 'mobility', label: 'Rental', icon: <Search size={16} /> },
        { id: 'mobility', label: 'School', icon: <GraduationCap size={16} /> },
      ]
    },
    food: {
      label: 'Food',
      services: [
        { id: 'order', label: 'Takeout', icon: <Utensils size={16} /> },
        { id: 'order', label: 'Dining', icon: <Smile size={16} /> },
        { id: 'order', label: 'Elite', icon: <Globe size={16} /> },
      ]
    },
    shopping: {
      label: 'Shopping',
      services: [
        { id: 'delivery', label: 'Instant', icon: <Zap size={16} /> },
        { id: 'delivery', label: 'Grocery', icon: <Store size={16} /> },
        { id: 'delivery', label: 'Health', icon: <Stethoscope size={16} /> },
        { id: 'delivery', label: 'Tech', icon: <Smartphone size={16} /> },
        { id: 'delivery', label: 'Parcel', icon: <Package size={16} /> },
      ]
    },
    financial: {
      label: 'Financial Services',
      services: [
        { id: 'payment', label: 'Wallet', icon: <Wallet size={16} /> },
        { id: 'payment', label: 'Send', icon: <Send size={16} /> },
        { id: 'payment', label: 'Corporate', icon: <ArrowRight size={16} /> },
      ]
    }
  };

  const partnersData = [
    { id: 'partners', label: 'DriveGo Driver', icon: <Car size={16} /> },
    { id: 'partners', label: 'Food Delivery', icon: <Utensils size={16} /> },
    { id: 'partners', label: 'Express Courier', icon: <Package size={16} /> },
    { id: 'partners', label: 'Shopping Merchant', icon: <Store size={16} /> },
    { id: 'partners', label: 'Pay Merchant', icon: <Wallet size={16} /> },
  ];

  const handleServiceClick = (page: any) => {
    onNavigate?.(page);
    setIsMenuOpen(false);
    setIsPartnersMenuOpen(false);
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 p-4 md:p-5 pointer-events-none">
        <div className="max-w-[1400px] mx-auto relative">
          <nav className={`rounded-[24px] transition-all duration-500 px-6 py-3 flex items-center justify-between pointer-events-auto ${isScrolled || isMenuOpen || isPartnersMenuOpen ? 'bg-white shadow-lg shadow-black/5 ring-1 ring-black/5' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-10">
              <div onClick={onLogoClick} className="flex items-center gap-2 cursor-pointer group">
                <div className="w-8 h-8 bg-[#00D665] rounded-lg flex items-center justify-center text-black shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                  <Navigation size={16} fill="currentColor" />
                </div>
                <span className="text-xl font-black tracking-tighter text-black">DriveGo</span>
              </div>
              
              <div className="hidden lg:flex items-center gap-8 text-[13px] font-bold text-black/40">
                <div className="relative" ref={menuRef}>
                  <button 
                    onClick={() => { setIsMenuOpen(!isMenuOpen); setIsPartnersMenuOpen(false); }} 
                    className={`transition-all font-black flex items-center gap-1.5 py-2 px-1 rounded-lg ${isMenuOpen ? 'text-[#00D665]' : 'hover:text-black'}`}
                  >
                    Services
                    <ChevronDown size={14} className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Services Modal Dropdown */}
                  {isMenuOpen && (
                    <div className="absolute top-[calc(100%+12px)] left-0 w-[520px] bg-white rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden animate-reveal p-1 z-[60]">
                      <div className="flex h-[360px]">
                        <div className="w-[180px] bg-zinc-50/80 p-3 flex flex-col gap-1.5 border-r border-gray-100">
                          {(Object.keys(menuData) as Array<keyof typeof menuData>).map((key) => (
                            <button
                              key={key}
                              onClick={() => setActiveCategory(key)}
                              className={`w-full text-left p-3.5 rounded-xl transition-all flex flex-col gap-0.5 group ${activeCategory === key ? 'bg-white shadow-sm ring-1 ring-black/5' : 'hover:bg-black/5'}`}
                            >
                              <span className={`block font-black text-[13px] tracking-tight transition-colors ${activeCategory === key ? 'text-[#00D665]' : 'text-black/60'}`}>
                                {menuData[key].label}
                              </span>
                            </button>
                          ))}
                        </div>
                        <div className="flex-1 p-6 overflow-y-auto no-scrollbar bg-white">
                          <div className="grid grid-cols-2 gap-3">
                            {menuData[activeCategory].services.map((service, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleServiceClick(service.id)}
                                className="flex items-center gap-3 p-4 bg-zinc-50/50 rounded-2xl text-left transition-all hover:bg-[#00D665]/5 hover:ring-1 hover:ring-[#00D665]/20 group"
                              >
                                <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-zinc-400 group-hover:text-[#00D665] group-hover:scale-110 transition-all shadow-sm">
                                  {service.icon}
                                </div>
                                <span className="font-bold text-[13px] tracking-tight text-black opacity-70 group-hover:opacity-100">
                                  {service.label}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Partners Modal Trigger */}
                <div className="relative" ref={partnersRef}>
                  <button 
                    onClick={() => { setIsPartnersMenuOpen(!isPartnersMenuOpen); setIsMenuOpen(false); }} 
                    className={`transition-all font-black flex items-center gap-1.5 py-2 px-1 rounded-lg ${isPartnersMenuOpen ? 'text-[#00D665]' : 'hover:text-black'}`}
                  >
                    Partners
                    <ChevronDown size={14} className={`transition-transform duration-300 ${isPartnersMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Partners Modal Dropdown */}
                  {isPartnersMenuOpen && (
                    <div className="absolute top-[calc(100%+12px)] left-0 w-[280px] bg-white rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden animate-reveal p-2 z-[60]">
                      <div className="flex flex-col gap-1">
                        {partnersData.map((partner, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleServiceClick(partner.id)}
                            className="flex items-center gap-3 p-4 bg-white hover:bg-zinc-50 rounded-xl text-left transition-all group"
                          >
                            <div className="w-8 h-8 bg-zinc-50 rounded-lg flex items-center justify-center text-zinc-400 group-hover:text-[#00D665] transition-all">
                              {partner.icon}
                            </div>
                            <span className="font-bold text-[12px] tracking-tight text-black opacity-70 group-hover:opacity-100 whitespace-nowrap">
                              {partner.label}
                            </span>
                          </button>
                        ))}
                        <div className="border-t border-gray-100 mt-2 pt-2">
                          <button 
                            onClick={() => handleServiceClick('partners')}
                            className="w-full p-4 bg-[#00D665]/5 rounded-xl text-center font-black text-[11px] text-[#00D665] hover:bg-[#00D665]/10 transition-all uppercase tracking-widest"
                          >
                            View All Partnerships
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => handleServiceClick('plus')}
                  className="hover:text-black transition-colors font-black flex items-center gap-1.5 text-[#00D665]"
                >
                  <Crown size={14} />
                  DriveGo Plus
                </button>
                <button className="hover:text-black transition-colors font-bold">About Us</button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="hidden sm:flex items-center gap-2 text-black/60 hover:text-black text-[13px] font-bold transition-all">
                <MapPin size={14} className="text-[#00D665]" />
                <span>Select city</span>
              </button>
              <button className="bg-black text-white text-[13px] font-bold px-8 py-3 rounded-full hover:bg-zinc-800 transition-all active:scale-95 flex items-center gap-2">
                <User size={14} />
                <span>Sign in</span>
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Subtle Backdrop */}
      {(isMenuOpen || isPartnersMenuOpen) && (
        <div 
          className="fixed inset-0 bg-black/5 backdrop-blur-[1px] z-40 transition-all cursor-pointer"
          onClick={() => { setIsMenuOpen(false); setIsPartnersMenuOpen(false); }}
        />
      )}
    </>
  );
};

export default Navbar;
