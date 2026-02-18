
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
  onNavigate?: (page: 'home' | 'mobility' | 'order' | 'delivery' | 'payment' | 'partners' | 'plus' | 'about') => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogoClick, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPartnersMenuOpen, setIsPartnersMenuOpen] = useState(false);
  const [isCompanyMenuOpen, setIsCompanyMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'ride' | 'food' | 'shopping' | 'financial'>('ride');
  const menuRef = useRef<HTMLDivElement>(null);
  const partnersRef = useRef<HTMLDivElement>(null);
  const companyRef = useRef<HTMLDivElement>(null);

  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const languageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setIsMenuOpen(false);
      if (partnersRef.current && !partnersRef.current.contains(event.target as Node)) setIsPartnersMenuOpen(false);
      if (companyRef.current && !companyRef.current.contains(event.target as Node)) setIsCompanyMenuOpen(false);
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) setIsLanguageOpen(false);
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
    setIsCompanyMenuOpen(false);
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 p-4 md:p-6 pointer-events-none">
        <div className="max-w-[1440px] mx-auto relative">
          <nav className={`
            rounded-[32px] md:rounded-[40px] 
            transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
            px-6 md:px-8 py-3 md:py-4 
            flex items-center justify-between pointer-events-auto
            ${isScrolled || isMenuOpen || isPartnersMenuOpen || isCompanyMenuOpen
              ? 'bg-white/80 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-black/[0.03]'
              : 'bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-transparent'}
          `}>
            <div className="flex items-center gap-12">
              <div onClick={onLogoClick} className="flex items-center gap-3 cursor-pointer group">
                <div className="w-9 h-9 md:w-10 md:h-10 bg-[#00D665] rounded-[14px] flex items-center justify-center text-black shadow-[0_8px_20px_rgba(0,214,101,0.25)] group-hover:scale-110 transition-all duration-500 ease-out">
                  <Navigation size={20} fill="currentColor" className="md:w-5 md:h-5" />
                </div>
                <span className="text-xl md:text-2xl font-black tracking-[-0.03em] text-black">DriveGo</span>
              </div>

              <div className="hidden xl:flex items-center gap-1 text-[14px] md:text-[14.5px] font-semibold text-black/70">
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => { setIsMenuOpen(!isMenuOpen); setIsPartnersMenuOpen(false); setIsLanguageOpen(false); }}
                    className={`
                      px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-1.5
                      ${isMenuOpen ? 'bg-zinc-100 text-black' : 'hover:bg-zinc-50 hover:text-black'}
                    `}
                  >
                    Services
                    <ChevronDown size={14} className={`transition-transform duration-500 ${isMenuOpen ? 'rotate-180' : 'opacity-40'}`} />
                  </button>

                  {/* Services Modal Dropdown */}
                  {isMenuOpen && (
                    <div className="absolute top-[calc(100%+12px)] left-0 w-[300px] bg-white/90 backdrop-blur-xl rounded-[28px] shadow-[0_24px_64px_rgba(0,0,0,0.12)] border border-black/[0.04] overflow-hidden animate-reveal p-2 z-[60]">
                      <div className="flex flex-col gap-0.5">
                        {Object.values(menuData).flatMap(category => category.services).map((service, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleServiceClick(service.id)}
                            className="flex items-center gap-3.5 p-3.5 hover:bg-black/[0.02] rounded-2xl text-left transition-all group"
                          >
                            <div className="w-9 h-9 bg-zinc-50 border border-black/[0.03] rounded-xl flex items-center justify-center text-zinc-400 group-hover:text-[#00D665] group-hover:bg-white group-hover:shadow-sm transition-all duration-300">
                              {service.icon}
                            </div>
                            <span className="font-bold text-[13.5px] tracking-tight text-black/60 group-hover:text-black transition-colors">
                              {service.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative" ref={partnersRef}>
                  <button
                    onClick={() => { setIsPartnersMenuOpen(!isPartnersMenuOpen); setIsMenuOpen(false); }}
                    className={`
                      px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-1.5
                      ${isPartnersMenuOpen ? 'bg-zinc-100 text-black' : 'hover:bg-zinc-50 hover:text-black'}
                    `}
                  >
                    Partners
                    <ChevronDown size={14} className={`transition-transform duration-500 ${isPartnersMenuOpen ? 'rotate-180' : 'opacity-40'}`} />
                  </button>

                  {/* Partners Modal Dropdown */}
                  {isPartnersMenuOpen && (
                    <div className="absolute top-[calc(100%+12px)] left-0 w-[300px] bg-white/90 backdrop-blur-xl rounded-[28px] shadow-[0_24px_64px_rgba(0,0,0,0.12)] border border-black/[0.04] overflow-hidden animate-reveal p-2 z-[60]">
                      <div className="flex flex-col gap-0.5">
                        {partnersData.map((partner, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleServiceClick(partner.id)}
                            className="flex items-center gap-3.5 p-3.5 hover:bg-black/[0.02] rounded-2xl text-left transition-all group"
                          >
                            <div className="w-9 h-9 bg-zinc-50 border border-black/[0.03] rounded-xl flex items-center justify-center text-zinc-400 group-hover:text-[#00D665] group-hover:bg-white group-hover:shadow-sm transition-all duration-300">
                              {partner.icon}
                            </div>
                            <span className="font-bold text-[13.5px] tracking-tight text-black/60 group-hover:text-black transition-colors">
                              {partner.label}
                            </span>
                          </button>
                        ))}
                        <div className="px-2 pt-2 border-t border-black/[0.03] mt-2">
                          <button
                            onClick={() => handleServiceClick('partners')}
                            className="w-full flex items-center justify-center gap-2 py-3 bg-[#00D665] rounded-xl font-bold text-[12px] text-black hover:brightness-105 transition-all active:scale-95 shadow-sm"
                          >
                            VIEW ALL PARTNERSHIPS
                            <ArrowRight size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleServiceClick('plus')}
                  className="px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 group hover:bg-[#00D665]/5"
                >
                  <Crown size={15} className="text-[#00D665] group-hover:scale-110 transition-transform" />
                  <span className="whitespace-nowrap text-[14px] font-bold text-black/80 group-hover:text-[#00D665] transition-colors">DashDrive Plus</span>
                </button>

                <div className="relative" ref={companyRef}>
                  <button
                    onClick={() => { setIsCompanyMenuOpen(!isCompanyMenuOpen); setIsMenuOpen(false); setIsPartnersMenuOpen(false); setIsLanguageOpen(false); }}
                    className={`
                      px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-1.5
                      ${isCompanyMenuOpen ? 'bg-zinc-100 text-black' : 'hover:bg-zinc-50 hover:text-black'}
                    `}
                  >
                    Company
                    <ChevronDown size={14} className={`transition-transform duration-500 ${isCompanyMenuOpen ? 'rotate-180' : 'opacity-40'}`} />
                  </button>

                  {isCompanyMenuOpen && (
                    <div className="absolute top-[calc(100%+12px)] left-0 w-[200px] bg-white/90 backdrop-blur-xl rounded-[24px] shadow-[0_24px_64px_rgba(0,0,0,0.12)] border border-black/[0.04] overflow-hidden animate-reveal p-2 z-[60]">
                      <button
                        onClick={() => handleServiceClick('about')}
                        className="w-full flex items-center gap-3 p-3.5 hover:bg-black/[0.02] rounded-xl text-left transition-all group"
                      >
                        <span className="font-bold text-[13.5px] tracking-tight text-black/60 group-hover:text-black">
                          About Us
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative" ref={languageRef}>
                <button
                  onClick={() => { setIsLanguageOpen(!isLanguageOpen); setIsMenuOpen(false); setIsPartnersMenuOpen(false); setIsCompanyMenuOpen(false); }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-zinc-50 transition-all text-black/50 hover:text-black font-bold text-[13px]"
                >
                  <Globe size={16} />
                  <span>{currentLang}</span>
                </button>

                {isLanguageOpen && (
                  <div className="absolute top-[calc(100%+10px)] right-0 w-[140px] bg-white shadow-2xl border border-black/[0.03] rounded-2xl p-1.5 z-[60] animate-reveal">
                    <button
                      onClick={() => { setCurrentLang('EN'); setIsLanguageOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-[12.5px] font-bold transition-all ${currentLang === 'EN' ? 'bg-zinc-50 text-[#00D665]' : 'hover:bg-zinc-50 text-black/60'}`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => { setCurrentLang('AR'); setIsLanguageOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-[12.5px] font-bold transition-all ${currentLang === 'AR' ? 'bg-zinc-50 text-[#00D665]' : 'hover:bg-zinc-50 text-black/60'}`}
                    >
                      العربية
                    </button>
                  </div>
                )}
              </div>

              <button className="bg-black text-white text-[13.5px] font-bold px-8 py-3 rounded-full hover:bg-zinc-800 transition-all shadow-[0_4px_16px_rgba(0,0,0,0.1)] active:scale-95 active:brightness-90">
                Sign in
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Subtle Backdrop */}
      {(isMenuOpen || isPartnersMenuOpen || isCompanyMenuOpen) && (
        <div
          className="fixed inset-0 bg-black/5 backdrop-blur-[1px] z-40 transition-all cursor-pointer"
          onClick={() => { setIsMenuOpen(false); setIsPartnersMenuOpen(false); setIsCompanyMenuOpen(false); }}
        />
      )}
    </>
  );
};

export default Navbar;
