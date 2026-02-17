
import React, { useState, useEffect } from 'react';
import { 
  Wallet, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Clock, 
  Globe, 
  CheckCircle2, 
  Send,
  ChevronDown,
  Info
} from 'lucide-react';

const PaymentPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'pay' | 'send'>('pay');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [sendAmount, setSendAmount] = useState<string>('100.00');

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [activeTab]);

  const countries = [
    { name: 'UK', flag: '🇬🇧' }, { name: 'India', flag: '🇮🇳' }, { name: 'Pakistan', flag: '🇵🇰' },
    { name: 'Egypt', flag: '🇪🇬' }, { name: 'Canada', flag: '🇨🇦' }, { name: 'Philippines', flag: '🇵🇭' }
  ];

  const SendMoneyHub = () => (
    <div className="animate-reveal">
      <section className="mx-6 md:mx-12 lg:mx-20 mt-8 mb-12 rounded-[64px] overflow-hidden min-h-[600px] flex items-center bg-[#1E293B] relative group">
        <div className="container mx-auto px-12 md:px-24 relative z-20 flex flex-col lg:flex-row items-center justify-between gap-20 py-20">
          <div className="space-y-10 max-w-xl">
            <h1 className="text-[#00D665] text-6xl md:text-[7vw] font-black tracking-tighter leading-[0.9]">
              Send money <br /> <span className="text-white">home, instantly.</span>
            </h1>
            <p className="text-white text-xl font-bold leading-relaxed opacity-90">
              Low-cost transfers to 30+ countries. Real-time rates, zero hidden fees, and absolute peace of mind.
            </p>
            <button className="bg-white text-black px-12 py-5 rounded-2xl font-black text-xl hover:bg-[#00D665] transition-all">Send Now</button>
          </div>

          <div className="w-full lg:w-[460px] bg-white rounded-[40px] p-10 shadow-2xl space-y-8 relative z-30">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-400">You send (USD)</label>
                <input type="text" value={sendAmount} onChange={(e) => setSendAmount(e.target.value)} className="w-full p-6 bg-zinc-50 rounded-2xl border border-zinc-100 text-4xl font-black outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-400">Recipient gets (INR)</label>
                <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100 text-4xl font-black text-zinc-300">{(parseFloat(sendAmount || '0') * 83.4).toFixed(2)}</div>
              </div>
            </div>
            <button className="w-full py-6 bg-[#00D665] text-black font-black text-xl rounded-2xl shadow-xl">Complete Transfer</button>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 text-center mt-20 mb-32">
        <h2 className="text-7xl font-black tracking-tighter mb-12">Global Reach.</h2>
        <div className="flex justify-center gap-12">
          {countries.map((c, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <span className="text-6xl">{c.flag}</span>
              <span className="font-black text-zinc-400">{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const PayHub = () => (
    <div className="animate-reveal">
      <section className="mx-6 md:mx-12 lg:mx-20 mt-8 mb-12 rounded-[64px] overflow-hidden min-h-[600px] flex items-center bg-[#1E293B] relative group">
        <div className="container mx-auto px-12 md:px-24 relative z-20 flex flex-col lg:flex-row items-center justify-between gap-12 py-20">
          <div className="space-y-10 max-w-xl">
            <h1 className="text-white text-6xl md:text-[8vw] font-black tracking-tighter leading-[0.85]">
              Pay anything, <br /> <span className="text-[#00D665]">seamlessly.</span>
            </h1>
            <p className="text-white/60 text-2xl font-medium">Split bills with friends, settle utility payments, or pay for rides with one tap. Financial freedom starts here.</p>
            <button className="bg-[#00D665] text-black px-12 py-6 rounded-2xl font-black text-xl hover:scale-105 transition-all">Open Wallet</button>
          </div>
          <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800" className="w-full max-w-lg rounded-[64px] shadow-2xl" alt="Fintech" />
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 text-center mt-20 mb-32">
        <h2 className="text-7xl font-black tracking-tighter mb-12">Pay smarter.</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Safe", desc: "Top-tier encryption keeps your data and money 100% secure.", icon: <ShieldCheck size={40} /> },
            { title: "Fast", desc: "Payments settle in seconds. No more waiting for bank cycles.", icon: <Zap size={40} /> },
            { title: "Simple", desc: "All your bills and transfers in one easy-to-use dashboard.", icon: <CheckCircle2 size={40} /> }
          ].map((item, i) => (
            <div key={i} className="bg-zinc-50 p-12 rounded-[48px] border border-transparent hover:bg-white hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center text-[#00D665] mx-auto mb-8">{item.icon}</div>
              <h4 className="text-3xl font-black mb-4">{item.title}</h4>
              <p className="text-xl text-zinc-500 font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen pt-24 animate-reveal">
      <div className="flex justify-center gap-4 mb-12">
        <button onClick={() => setActiveTab('pay')} className={`px-10 py-4 rounded-full font-black ${activeTab === 'pay' ? 'bg-[#00D665] text-black shadow-lg' : 'text-zinc-400'}`}>Local Pay</button>
        <button onClick={() => setActiveTab('send')} className={`px-10 py-4 rounded-full font-black ${activeTab === 'send' ? 'bg-[#00D665] text-black shadow-lg' : 'text-zinc-400'}`}>Remittance</button>
      </div>

      {activeTab === 'pay' ? <PayHub /> : <SendMoneyHub />}

      <section className="py-32 bg-[#312E81] rounded-[80px] mx-6 md:mx-12 lg:mx-20 mb-32 text-white text-center">
        <h2 className="text-7xl font-black tracking-tighter mb-24 italic opacity-80">Payments FAQ</h2>
        <div className="max-w-4xl mx-auto space-y-6 text-left">
          {[
            { q: "Is my money safe?", a: "Yes, we are fully regulated and use military-grade security protocols." },
            { q: "Are there hidden fees?", a: "None. You'll always see the exact exchange rate and fee before you click send." }
          ].map((item, idx) => (
            <div key={idx} className="bg-white/5 rounded-[40px] p-12" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
              <h4 className="text-3xl font-black tracking-tight">{item.q}</h4>
              {openFaq === idx && <p className="mt-8 text-xl text-white/60">{item.a}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="py-40 bg-zinc-950 text-white text-center rounded-[80px] mx-6 md:mx-12 lg:mx-20 mb-32">
         <h2 className="text-8xl md:text-[10rem] font-black tracking-tighter mb-16 leading-[0.85]">
            One Wallet. <br /> <span className="text-[#00D665]">Zero stress.</span>
         </h2>
         <button onClick={onBack} className="bg-white text-black px-16 py-8 rounded-full font-black text-xl hover:bg-[#00D665]">Back Home</button>
      </section>
    </div>
  );
};

export default PaymentPage;
