
import React, { useState, useEffect } from 'react';
import {
  Utensils,
  ShoppingBag,
  ArrowRight,
  Star,
  Clock,
  Plus,
  Smile,
  Store,
  Search,
  ChevronDown,
  Info,
  ArrowLeft,
  X,
  Heart,
  MoreHorizontal,
  Share2,
  ChevronRight
} from 'lucide-react';

import MerchantGrid from './MerchantGrid';

const OrderPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [view, setView] = useState<'hub' | 'directory' | 'menu'>('hub');
  const [activeTab, setActiveTab] = useState<'food' | 'dineout' | 'markets'>('food');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPartner, setSelectedPartner] = useState<any | null>(null);
  const [selectedPartnerForInfo, setSelectedPartnerForInfo] = useState<any | null>(null);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [view, activeTab]);

  const tabs = [
    { id: 'food', label: 'Takeout', icon: <Utensils size={18} /> },
    { id: 'dineout', label: 'Reservations', icon: <Smile size={18} /> },
  ];

  const partners = [
    {
      name: 'The Wok Shop',
      logo: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=400',
      banner: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1600',
      category: 'Asian Fusion',
      rating: '4.8',
      reviews: '5k+',
      deliveryFee: '$1.00',
      address: 'Central Plaza, DriveGo District',
      description: 'Modern takes on classic Asian street food. Fresh ingredients, bold spices, and lightning-fast preparation.',
      menu: [
        {
          category: 'Bestsellers',
          items: [
            { id: 1, name: 'Chilli Garlic Crunch Noodles', price: '$10.00', popularity: '98%', ratingCount: 1200, badge: 'Top Choice', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=400', desc: 'Sizzling noodles tossed in our secret spicy garlic oil.' },
            { id: 2, name: 'Tofu Soya Bowl (VG)', price: '$9.00', popularity: '95%', ratingCount: 450, image: 'https://images.unsplash.com/photo-158503222665a-71d2c88275f5?auto=format&fit=crop&q=80&w=400', desc: 'Protein-packed bowl with crisp greens and silken tofu.' }
          ]
        }
      ]
    },
    { name: 'Burger Hub', logo: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400', category: 'Gourmet Burgers' },
    { name: 'Pizza Roma', logo: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400', category: 'Italian' }
  ];

  const DineOutHub = () => (
    <div className="animate-reveal">
      <section className="mx-6 md:mx-12 lg:mx-20 mt-8 mb-24 rounded-[64px] overflow-hidden min-h-[600px] flex items-center bg-[#EBFFF5] relative group">
        <div className="container mx-auto px-12 md:px-24 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-zinc-900 text-6xl md:text-[8vw] font-black tracking-tighter leading-[0.85]">
              Dine better, <br /> <span className="text-[#00D665]">pay less.</span>
            </h1>
            <p className="text-2xl text-zinc-500 font-medium">Book tables at 1,000+ spots and save up to 50% on your total bill.</p>
            <button className="bg-[#00D665] text-black px-12 py-6 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl flex items-center gap-4">
              Find a Table <ArrowRight size={24} />
            </button>
          </div>
          <div className="hidden lg:block aspect-video rounded-[48px] overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Dining" />
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 text-center mb-32">
        <h2 className="text-7xl font-black tracking-tighter mb-12">Eat Out</h2>
        <HubSwitcher />
        <p className="text-2xl text-zinc-500 font-medium max-w-2xl mx-auto">Discover local gems and unlock exclusive member-only discounts at the city's finest restaurants.</p>
      </div>
    </div>
  );

  const FoodHub = () => (
    <div className="animate-reveal">
      <section className="mx-6 md:mx-12 lg:mx-20 mt-8 mb-24 rounded-[64px] overflow-hidden min-h-[600px] flex items-center bg-[#00D665] relative group">
        <div className="container mx-auto px-12 md:px-24 relative z-10">
          <div className="max-w-2xl space-y-8">
            <h1 className="text-white text-6xl md:text-[8vw] font-black tracking-tighter leading-[0.85]">
              Everything you crave, <br /> <span className="text-zinc-900 italic">instantly.</span>
            </h1>
            <button className="bg-zinc-900 text-[#00D665] px-12 py-6 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl flex items-center gap-4">
              View Menus <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 max-w-[1400px] mx-auto px-6 text-center">
        <h2 className="text-7xl font-black tracking-tighter mb-12">Order Food</h2>
        <HubSwitcher />
        <p className="text-2xl text-zinc-500 font-medium leading-relaxed max-w-3xl mx-auto">
          From morning coffee to late-night snacks. Choose from thousands of local kitchens and global brands, delivered hot to your door.
        </p>
      </section>

      <section className="py-24 mx-6 md:mx-12 lg:mx-20">
        <div className="bg-[#EBFFF5] rounded-[64px] p-12 md:p-24 grid lg:grid-cols-2 gap-20 items-center overflow-hidden">
          <div className="space-y-12 relative z-10">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
              Free delivery <br />
              <span className="text-[#00D665]">with Elite.</span>
            </h2>
            <p className="text-2xl text-zinc-600 font-medium max-w-lg leading-relaxed">
              Join Elite Access for $5/month and pay zero delivery fees on every single order.
            </p>
            <button className="bg-black text-white px-12 py-6 rounded-2xl font-black text-xl hover:bg-[#00D665] hover:text-black transition-all">
              Go Elite
            </button>
          </div>
          <img src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800" className="w-full rounded-[48px] shadow-2xl" alt="Elite Access" />
        </div>
      </section>
    </div>
  );

  const HubSwitcher = () => (
    <div className="flex justify-center gap-4 p-2 bg-zinc-50 rounded-[32px] w-fit mx-auto border border-zinc-100 mb-20">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id as any)}
          className={`flex items-center gap-3 px-10 py-4 rounded-[24px] font-black text-sm transition-all ${activeTab === tab.id ? 'bg-[#00D665] text-black shadow-lg' : 'text-zinc-400 hover:text-black'}`}
        >
          {tab.icon} {tab.label}
        </button>
      ))}
    </div>
  );

  return (
    <div className="bg-white min-h-screen pt-24 animate-reveal">
      {activeTab === 'food' ? <FoodHub /> : <DineOutHub />}

      <MerchantGrid />

      <section className="py-32 bg-[#EBFFF5] rounded-[80px] mx-6 md:mx-12 lg:mx-20 mb-32">
        <div className="max-w-[1200px] mx-auto px-12">
          <h2 className="text-7xl font-black tracking-tighter text-center mb-24">FAQs</h2>
          <div className="space-y-6">
            {[
              { q: "Can I schedule orders?", a: "Yes, you can pre-order up to 24 hours in advance." },
              { q: "How do I use Elite benefits?", a: "Elite benefits are applied automatically at checkout once you join." },
              { q: "My order is wrong, what now?", a: "Contact support via the 'Help' button for an instant fix or refund." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-[32px] p-10 cursor-pointer hover:border-[#00D665] border border-transparent transition-all" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                <h4 className="text-3xl font-black tracking-tight">{item.q}</h4>
                {openFaq === idx && <p className="mt-8 text-xl text-zinc-500 font-medium">{item.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-40 bg-zinc-950 text-white text-center rounded-[80px] mx-6 md:mx-12 lg:mx-20 mb-32">
        <h2 className="text-8xl md:text-[10rem] font-black tracking-tighter mb-16 leading-[0.85]">
          Eat local <br /> <span className="text-[#00D665]">with DriveGo.</span>
        </h2>
        <button onClick={onBack} className="bg-white text-black px-16 py-8 rounded-full font-black text-xl hover:bg-[#00D665]">Return Home</button>
      </section>
    </div>
  );
};

export default OrderPage;
