
import React from 'react';
import { ChevronDown, Globe, Navigation } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-32 pb-12 border-t border-gray-100">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-16 mb-24">
          <div className="space-y-6">
            <h4 className="font-bold text-sm text-black/40">Services</h4>
            <div className="space-y-4 flex flex-col">
              <a href="#" className="text-lg font-bold hover:text-[#00D665] transition-colors">Everyday rides</a>
              <a href="#" className="text-lg font-bold hover:text-[#00D665] transition-colors">Intercity</a>
              <a href="#" className="text-lg font-bold hover:text-[#00D665] transition-colors">Courier</a>
              <a href="#" className="text-lg font-bold hover:text-[#00D665] transition-colors">Freight</a>
              <a href="#" className="text-lg font-bold hover:text-[#00D665] transition-colors">Corporate</a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold text-sm text-black/40">Driver</h4>
            <div className="space-y-4 flex flex-col">
              <a href="#" className="text-lg font-bold hover:text-[#00D665] transition-colors">Drive with us</a>
              <a href="#" className="text-lg font-bold hover:text-[#00D665] transition-colors">Driver portal</a>
              <a href="#" className="text-lg font-bold hover:text-[#00D665] transition-colors">Safety guides</a>
              <a href="#" className="text-lg font-bold hover:text-[#00D665] transition-colors">Success stories</a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold text-sm text-black/40">Company</h4>
            <div className="space-y-4 flex flex-col">
              <a href="#" className="text-lg font-bold hover:text-[#00D665] transition-colors">About us</a>
              <a href="#" className="text-lg font-bold hover:text-[#00D665] transition-colors">Contact</a>
              <a href="#" className="text-lg font-bold hover:text-[#00D665] transition-colors">Press</a>
              <a href="#" className="text-lg font-bold hover:text-[#00D665] transition-colors">Careers</a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold text-sm text-black/40">Legal</h4>
            <div className="space-y-4 flex flex-col">
              <a href="#" className="text-lg font-bold hover:text-[#00D665] transition-colors">Privacy policy</a>
              <a href="#" className="text-lg font-bold hover:text-[#00D665] transition-colors">Terms of use</a>
              <a href="#" className="text-lg font-bold hover:text-[#00D665] transition-colors">Licenses</a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm text-black/40 mb-6">Region</h4>
            <div className="flex items-center justify-between border-2 border-black rounded-full px-6 py-3 cursor-pointer hover:bg-black hover:text-white transition-all">
              <span className="font-bold">International</span>
              <ChevronDown size={18} />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 pt-12 border-t border-gray-100">
          <div className="text-[13px] text-black/40 space-y-4 leading-relaxed max-w-2xl font-medium">
            <p>DriveGo Mobility Systems. Our services connect passengers and drivers directly for fair pricing and transparency. Built for modern urban efficiency.</p>
            <p>Drivers are independent contractors. All trip offers are subject to verification. © 2025 DriveGo. All rights reserved.</p>
          </div>
          <div className="flex flex-col items-end gap-6">
            <div className="flex items-center gap-4">
              <a href="#" className="p-3 bg-gray-50 rounded-full hover:bg-[#00D665] transition-all"><Globe size={20} /></a>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#00D665] rounded-xl flex items-center justify-center text-black shadow-lg">
                  <Navigation size={18} fill="currentColor" />
                </div>
                <span className="font-black text-2xl tracking-tighter">DriveGo</span>
              </div>
            </div>
            <div className="flex gap-8 text-sm font-bold text-black/40">
              <span>Instagram</span>
              <span>X (Twitter)</span>
              <span>LinkedIn</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
