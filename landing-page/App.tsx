
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategorySlider from './components/CategorySlider';
import Features from './components/Features';
import ContributionSection from './components/ContributionSection';
import NewsroomSection from './components/NewsroomSection';
import Footer from './components/Footer';
import MobilityPage from './components/MobilityPage';
import OrderPage from './components/OrderPage';
import DeliveryPage from './components/DeliveryPage';
import PaymentPage from './components/PaymentPage';
import PartnersPage from './components/PartnersPage';
import DriveGoPlus from './components/DriveGoPlus';
import AboutUsPage from './components/AboutUsPage';


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'mobility' | 'order' | 'delivery' | 'payment' | 'partners' | 'plus' | 'about'>('home');

  const navigateToHome = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigation = (page: 'home' | 'mobility' | 'order' | 'delivery' | 'payment' | 'partners' | 'plus' | 'about') => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-[#00D665] selection:text-white antialiased">
      <Navbar
        onLogoClick={navigateToHome}
        onNavigate={handleNavigation}
      />

      {currentPage === 'home' && (
        <main>
          <Hero />
          <div id="services-slider">
            <CategorySlider
              onExploreRide={() => setCurrentPage('mobility')}
              onExploreOrder={() => setCurrentPage('order')}
              onExploreDeliver={() => setCurrentPage('delivery')}
              onExplorePay={() => setCurrentPage('payment')}
            />
          </div>
          <Features />
          <div id="impact-section">
            <ContributionSection />
          </div>
          <NewsroomSection />

          <section className="py-32 md:py-48 bg-black text-center text-white overflow-hidden relative rounded-t-[48px] md:rounded-t-[100px] -mt-12 md:-mt-24 z-20">
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
              <h2 className="text-8xl md:text-[12rem] font-black tracking-tighter mb-20 leading-[0.8]">
                Join the <br /><span className="text-[#00D665]">standard.</span>
              </h2>
              <button
                onClick={() => setCurrentPage('plus')}
                className="bg-[#00D665] text-black px-20 py-8 rounded-full text-xl font-bold hover:scale-105 transition-all shadow-[0_40px_80px_rgba(0,214,101,0.3)]"
              >
                Go Plus
              </button>
            </div>
          </section>
        </main>
      )}

      {currentPage === 'mobility' && <MobilityPage onBack={navigateToHome} />}
      {currentPage === 'order' && <OrderPage onBack={navigateToHome} />}
      {currentPage === 'delivery' && <DeliveryPage onBack={navigateToHome} />}
      {currentPage === 'payment' && <PaymentPage onBack={navigateToHome} />}
      {currentPage === 'partners' && <PartnersPage onBack={navigateToHome} />}
      {currentPage === 'plus' && <DriveGoPlus onBack={navigateToHome} />}
      {currentPage === 'about' && <AboutUsPage onBack={navigateToHome} />}

      <Footer />


      <style>{`
        body { overscroll-behavior-y: none; }
        .animate-reveal { animation: reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes reveal {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default App;
