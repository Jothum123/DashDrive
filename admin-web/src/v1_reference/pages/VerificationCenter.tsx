import {
    Car,
    CheckCircle2,
    Clock,
    Maximize2,
    RotateCcw,
    Search,
    XCircle
} from 'lucide-react';
import React, { useState } from 'react';

const applicants = [
    { id: '1', name: 'Marcus Sterling', time: '14 mins ago', vehicle: 'Tesla Model 3 • White', status: 'NEW', priority: 'High' },
    { id: '2', name: 'Elena Rodriguez', time: '2 hours ago', vehicle: 'Toyota Camry • Silver', status: 'RE-SUBMITTED', priority: 'Medium' },
    { id: '3', name: 'David Chen', time: '4 hours ago', vehicle: 'Honda Civic • Blue', status: 'NEW', priority: 'Low' },
    { id: '4', name: 'Sarah Jenkins', time: '5 hours ago', vehicle: 'Ford Mustang • Black', status: 'NEW', priority: 'Medium' },
];

export const VerificationCenter: React.FC = () => {
    const [selectedApplicant, setSelectedApplicant] = useState(applicants[0]);
    const [activeTab, setActiveTab] = useState('License & ID');

    return (
        <div className="flex h-[calc(100vh-100px)] -m-10 bg-[#0a0f18] text-white overflow-hidden">
            {/* Left Sidebar: Applicants List */}
            <div className="w-[350px] border-r border-white/5 flex flex-col">
                <div className="p-8 space-y-6">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search applications..."
                            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-transparent focus:border-blue-500/30 rounded-xl text-sm outline-none transition-all"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="flex-1 px-4 py-2 bg-blue-600 rounded-lg text-xs font-bold tracking-wider uppercase">All Pending</button>
                        <button className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold tracking-wider uppercase transition-colors">Priority</button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {applicants.map(app => (
                        <div
                            key={app.id}
                            onClick={() => setSelectedApplicant(app)}
                            className={`p-6 border-b border-white/5 cursor-pointer transition-all ${selectedApplicant.id === app.id ? 'bg-blue-600/10 border-l-4 border-l-blue-600' : 'hover:bg-white/5'}`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-[15px]">{app.name}</h4>
                                <span className={`px-2 py-0.5 rounded text-[9px] font-black tracking-widest ${app.status === 'NEW' ? 'bg-blue-600 text-white' : 'bg-amber-500/20 text-amber-500'}`}>
                                    {app.status}
                                </span>
                            </div>
                            <p className="text-xs text-gray-500 mb-3 flex items-center gap-1.5">
                                <Clock size={12} /> Submitted {app.time}
                            </p>
                            <p className="text-xs text-gray-400 flex items-center gap-2 italic">
                                <Car size={14} className="text-gray-500" /> {app.vehicle}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content: Applicant Details */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Applicant Header */}
                <div className="p-10 border-b border-white/10 flex justify-between items-start bg-gradient-to-r from-blue-600/5 to-transparent">
                    <div>
                        <div className="flex items-center gap-4 mb-2">
                            <h2 className="text-3xl font-bold tracking-tight">{selectedApplicant.name}</h2>
                            <span className="px-3 py-1 bg-white/5 rounded-lg text-[10px] text-gray-400 font-bold uppercase tracking-widest border border-white/5">ID: #VR-99281</span>
                        </div>
                        <p className="text-gray-500 text-sm font-medium">
                            Registered since Jan 2024 • <span className="text-blue-400">4.95 Rating</span> (Previous Platform)
                        </p>
                    </div>
                    <div className="flex gap-12">
                        <div className="text-right">
                            <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Verification Type</p>
                            <p className="text-sm font-bold">Standard P2P Tier</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Region</p>
                            <p className="text-sm font-bold flex items-center justify-end gap-1.5 leading-tight">
                                San Francisco, <br /> CA
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-10 space-y-12 shadow-inner custom-scrollbar bg-[#0d131f]">
                    {/* Navigation Tabs */}
                    <div className="flex gap-4">
                        {['License & ID', 'Insurance Policy', 'Vehicle Photos'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-8 py-3 rounded-xl text-xs font-bold tracking-wider transition-all duration-300 ${activeTab === tab ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Document Section */}
                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h5 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Driver's License (Front)</h5>
                                <div className="flex gap-4 text-gray-500">
                                    <Maximize2 size={16} className="cursor-pointer hover:text-white" />
                                    <RotateCcw size={16} className="cursor-pointer hover:text-white" />
                                </div>
                            </div>
                            <div className="aspect-[1.6/1] bg-black rounded-[20px] border border-white/10 overflow-hidden group relative">
                                <img
                                    src="https://images.unsplash.com/photo-1559828589-4a72745c2293?q=80&w=1000&auto=format&fit=crop"
                                    alt="License Front"
                                    className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-2">Sample Document</p>
                                        <div className="w-12 h-1 bg-blue-600/30 rounded-full mx-auto" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h5 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Driver's License (Back)</h5>
                                <div className="flex gap-4 text-gray-500">
                                    <Maximize2 size={16} className="cursor-pointer hover:text-white" />
                                    <RotateCcw size={16} className="cursor-pointer hover:text-white" />
                                </div>
                            </div>
                            <div className="aspect-[1.6/1] bg-white rounded-[20px] border border-white/10 overflow-hidden group relative">
                                <img
                                    src="https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?q=80&w=1000&auto=format&fit=crop"
                                    alt="License Back"
                                    className="w-full h-full object-cover opacity-80"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/5 backdrop-blur-[2px]">
                                    <div className="text-center">
                                        <div className="w-48 h-2 bg-black/10 rounded-full mb-4 mx-auto" />
                                        <div className="w-32 h-2 bg-black/10 rounded-full mx-auto" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Vehicle Card */}
                    <div className="bg-gradient-to-br from-white/5 to-transparent p-10 rounded-[30px] border border-white/10 flex items-center gap-10">
                        <div className="w-40 h-28 bg-white rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center border border-white/10 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1536700503339-1e4b06520771?q=80&w=500&auto=format&fit=crop" alt="Tesla" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 grid grid-cols-3 gap-8">
                            <div>
                                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1 flex items-center gap-2">
                                    Make & Model <span className="bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded text-[8px]">VIN MATCHED</span>
                                </p>
                                <p className="text-lg font-bold">Tesla Model 3 (2022)</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Plate Number</p>
                                <p className="text-lg font-bold">8WJK122 (CA)</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Color</p>
                                <p className="text-lg font-bold">Pearl White</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Sidebar: Action Panel */}
            <div className="w-[350px] border-l border-white/10 flex flex-col pt-10 px-8 bg-[#0a0f18]">
                <div className="mb-12">
                    <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Review Checklist</h4>
                    <p className="text-xs text-gray-400 leading-relaxed font-medium">Ensure all data points match the digital application before approving.</p>
                </div>

                <div className="flex-1 space-y-12">
                    <section>
                        <h5 className="text-[9px] font-black text-blue-500 uppercase tracking-[0.2em] mb-6 border-b border-blue-500/20 pb-2">Identity & Legal</h5>
                        <div className="space-y-6">
                            <CheckItem label="ID Name matches profile name" />
                            <CheckItem label="Date of Birth &gt; 21 years old" />
                            <CheckItem label="Expiry Date is valid (&gt; 3 mo)" />
                        </div>
                    </section>

                    <section>
                        <h5 className="text-[9px] font-black text-blue-500 uppercase tracking-[0.2em] mb-6 border-b border-blue-500/20 pb-2">Vehicle & Insurance</h5>
                        <div className="space-y-6">
                            <CheckItem label="Plate matches vehicle photo" />
                            <CheckItem label="Commercial insurance present" />
                            <CheckItem label="Photo quality is sufficient" />
                        </div>
                    </section>

                    <section>
                        <h5 className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4">Internal Note</h5>
                        <textarea
                            placeholder="Add a private note about this partner..."
                            className="w-full h-32 bg-white/5 border border-white/5 rounded-2xl p-4 text-xs italic focus:outline-none focus:border-blue-500/30 transition-all resize-none"
                        />
                    </section>
                </div>

                <div className="py-10 space-y-4">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-600/20">
                        <CheckCircle2 size={18} /> Approve Partner
                    </button>
                    <button className="w-full bg-white/5 hover:bg-rose-500/20 hover:text-rose-500 text-gray-400 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all border border-transparent hover:border-rose-500/30">
                        <XCircle size={18} /> Reject Application
                    </button>
                </div>
            </div>
        </div>
    );
};

const CheckItem = ({ label }: { label: string }) => (
    <div className="flex items-center gap-4 group cursor-pointer">
        <div className="w-5 h-5 rounded-md border border-white/10 bg-white/5 group-hover:border-blue-500/50 transition-all flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-blue-600 rounded-sm scale-0 group-hover:scale-100 transition-transform" />
        </div>
        <span className="text-xs text-gray-300 font-medium group-hover:text-white transition-colors">{label}</span>
    </div>
);

export default VerificationCenter;
