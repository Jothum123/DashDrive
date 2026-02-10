import {
    Bot,
    Phone,
    Send
} from 'lucide-react';
import React, { useState } from 'react';
import { Header } from '../components/layout/Header';

interface Message {
    id: string;
    sender: 'rider' | 'agent';
    text: string;
    timestamp: string;
}

const INITIAL_MESSAGES: Message[] = [
    { id: '1', sender: 'rider', text: "Hey, I'm currently at the airport and my driver isn't at the designated pickup point. It says he's 2 mins away but he's not moving.", timestamp: '14:20' },
    { id: '2', sender: 'agent', text: "Hello Sarah, I'm looking into this now. I can see the driver is stuck at the terminal 3 security checkpoint. I'll message him to move to the backup lane.", timestamp: '14:21' },
];

export const AutomatedSupport: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const generateSmartReply = async () => {
        if (isTyping) return;
        setIsTyping(true);
        // Simulating AI response for demo purposes
        setTimeout(() => {
            setInput("I'm checking the driver's exact coordinates and terminal traffic. One moment.");
            setIsTyping(false);
        }, 1500);
    };

    const sendMessage = () => {
        if (!input.trim()) return;
        const newMessage: Message = {
            id: Date.now().toString(),
            sender: 'agent',
            text: input,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
        };
        setMessages([...messages, newMessage]);
        setInput('');
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Header title="Support Desk" subtitle="AI-Augmented Incident Resolution" />

            <div className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-4 gap-8 overflow-hidden h-[calc(100vh-140px)]">
                {/* Sidebar: Inbound Queue */}
                <aside className="w-full flex flex-col gap-4 overflow-hidden">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-sm font-black uppercase tracking-widest text-zinc-400">Live Queue</h2>
                        <span className="text-[10px] font-black text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20 tracking-widest">8 LIVE</span>
                    </div>
                    <div className="flex-1 overflow-y-auto no-scrollbar space-y-3 pr-2">
                        {[
                            { name: 'Sarah J.', msg: "Driver location mismatch", time: '2m', priority: 'High', type: 'Pickup' },
                            { name: 'Marcus T.', msg: "Forgotten laptop in vehicle", time: '12m', priority: 'Med', type: 'Lost Item' },
                            { name: 'Elena R.', msg: "Safety concern - erratic driving", time: '1h', priority: 'Urgent', type: 'Safety' },
                        ].map((ticket, idx) => (
                            <div key={idx} className={`group bg-zinc-900/50 border border-zinc-800 p-5 rounded-[32px] cursor-pointer transition-all hover:border-zinc-700 ${idx === 0 ? 'border-primary/40 bg-zinc-900' : ''}`}>
                                <div className="flex justify-between items-start mb-2">
                                    <p className="text-sm font-black text-white group-hover:text-primary transition-colors">{ticket.name}</p>
                                    <span className="text-[9px] font-black text-zinc-600 uppercase tracking-tighter">{ticket.time}</span>
                                </div>
                                <p className="text-[11px] text-zinc-500 line-clamp-1 mb-4 font-bold">{ticket.msg}</p>
                                <div className="flex items-center justify-between">
                                    <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-widest ${ticket.priority === 'High' || ticket.priority === 'Urgent' ? 'bg-red-500/20 text-red-500' : 'bg-zinc-500/10 text-zinc-500'
                                        }`}>{ticket.priority}</span>
                                    <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">{ticket.type}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Main Chat Interface */}
                <div className="lg:col-span-3 bg-zinc-900/50 border border-zinc-800 rounded-[40px] flex flex-col overflow-hidden shadow-2xl relative">
                    {/* Chat Header */}
                    <div className="px-8 py-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/30">
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-zinc-800 p-1 border border-zinc-700">
                                <img src="https://picsum.photos/seed/sarah/200/200" className="w-full h-full rounded-xl object-cover grayscale" alt="User" />
                            </div>
                            <div className="text-left">
                                <h3 className="text-lg font-black text-white tracking-tight">Sarah Jenkins</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                                    <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Session: #FLEET-9021</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button className="w-11 h-11 flex items-center justify-center bg-zinc-800 border border-zinc-700 rounded-2xl text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all">
                                <Phone size={18} />
                            </button>
                            <button className="px-6 py-2.5 bg-primary text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all">Resolve Ticket</button>
                        </div>
                    </div>

                    {/* Message View */}
                    <div className="flex-1 overflow-y-auto no-scrollbar p-10 space-y-8">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.sender === 'agent' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[70%] space-y-3`}>
                                    <div className={`px-6 py-5 rounded-[2.5rem] text-sm leading-relaxed ${msg.sender === 'agent'
                                        ? 'bg-primary text-black rounded-tr-none font-bold'
                                        : 'bg-black border border-zinc-800 text-zinc-300 rounded-tl-none'
                                        }`}>
                                        {msg.text}
                                    </div>
                                    <p className={`text-[9px] font-black text-zinc-600 uppercase tracking-widest px-2 ${msg.sender === 'agent' ? 'text-right' : 'text-left'}`}>
                                        {msg.timestamp} • Delivered
                                    </p>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-zinc-900 border border-zinc-800 px-5 py-3 rounded-full flex gap-1.5">
                                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Message Input Area */}
                    <div className="p-8 bg-black/50 border-t border-zinc-800">
                        <div className="flex items-center gap-3 mb-5">
                            <button
                                onClick={generateSmartReply}
                                disabled={isTyping}
                                className="group flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-xl text-[10px] font-black uppercase text-primary hover:bg-primary/20 transition-all disabled:opacity-50"
                            >
                                <Bot size={16} />
                                AI Smart Response
                            </button>
                            <button className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-[10px] font-black uppercase text-zinc-500 hover:text-zinc-300 transition-all">Internal Note</button>
                        </div>

                        <div className="flex items-center gap-4 bg-zinc-900/50 border border-zinc-800 p-4 rounded-3xl focus-within:border-primary/40 transition-all">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                                placeholder="Compose secure response..."
                                className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 text-white placeholder-zinc-700 font-bold"
                            />
                            <button
                                onClick={sendMessage}
                                className="w-12 h-12 flex items-center justify-center rounded-2xl bg-primary text-black hover:scale-[1.05] active:scale-95 transition-all shadow-xl shadow-primary/10"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AutomatedSupport;
