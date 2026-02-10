import {
    FileCheck,
    FileText,
    Plus,
    Search,
    Settings,
    Shield,
    Trash2
} from 'lucide-react';
import React, { useState } from 'react';
import type { RequiredDocument } from '../../../src/lib/adminStore';
import { useAdminStore } from '../../../src/lib/adminStore';
import { Header } from '../components/layout/Header';

export const DocumentManagement: React.FC = () => {
    const {
        requiredDocuments,
        updateRequiredDocument,
        deleteRequiredDocument
    } = useAdminStore();

    const [searchQuery, setSearchQuery] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Filter documents
    const filteredDocs = requiredDocuments.filter(doc =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleToggleRequired = (doc: RequiredDocument) => {
        updateRequiredDocument({ ...doc, isRequired: !doc.isRequired });
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this document requirement?')) {
            deleteRequiredDocument(id);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Header title="Document Matrix" subtitle="Define & Mandate Pilot Paperwork" />

            <div className="flex-1 p-8">
                {/* Controls Bar */}
                <div className="flex flex-wrap items-center justify-between gap-6 mb-10">
                    <div className="relative group w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-primary transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Find document requirement..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl py-3.5 pl-12 pr-4 text-xs font-black tracking-widest outline-none focus:border-primary/30 transition-all placeholder:text-zinc-600"
                        />
                    </div>

                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="px-6 py-3.5 bg-primary text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-primary/10 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                    >
                        <Plus size={16} strokeWidth={3} />
                        Initialize Requirement
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Document List */}
                    <div className="lg:col-span-8 space-y-4">
                        <div className="flex items-center gap-3 mb-6">
                            <FileText className="text-primary" size={20} />
                            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-zinc-400">System Registry</h2>
                        </div>

                        <div className="grid gap-4">
                            {filteredDocs.map((doc) => (
                                <div key={doc.id} className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[40px] flex items-center gap-8 group hover:border-zinc-700 transition-all text-left">
                                    <div className={`w-16 h-16 bg-black border border-zinc-800 rounded-3xl flex items-center justify-center transition-colors ${doc.isRequired ? 'text-primary' : 'text-zinc-600'}`}>
                                        <FileCheck size={28} />
                                    </div>

                                    <div className="flex-1 grid grid-cols-12 gap-8 items-center">
                                        <div className="col-span-12 md:col-span-5">
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="text-base font-black text-white">{doc.name}</h3>
                                                <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase border ${doc.category === 'identity' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                    doc.category === 'vehicle' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                                                        doc.category === 'license' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                                                            'bg-zinc-800 text-zinc-500 border-white/5'
                                                    }`}>
                                                    {doc.category}
                                                </span>
                                            </div>
                                            <p className="text-[11px] text-zinc-500 font-bold leading-relaxed">{doc.description}</p>
                                        </div>

                                        <div className="col-span-6 md:col-span-4 flex items-center gap-10">
                                            <div>
                                                <p className="text-[10px] font-black uppercase text-zinc-600 mb-2 tracking-widest">Enforcement</p>
                                                <button
                                                    onClick={() => handleToggleRequired(doc)}
                                                    className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all ${doc.isRequired
                                                        ? 'bg-primary/10 text-primary border-primary/20'
                                                        : 'bg-zinc-800/50 text-zinc-500 border-zinc-800'
                                                        }`}
                                                >
                                                    {doc.isRequired ? 'Mandatory' : 'Optional'}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="col-span-6 md:col-span-3 flex justify-end gap-3">
                                            <button
                                                className="w-12 h-12 rounded-2xl bg-zinc-800/50 border border-zinc-800 flex items-center justify-center text-zinc-600 hover:text-white hover:border-zinc-600 transition-all"
                                            >
                                                <Settings size={20} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(doc.id)}
                                                className="w-12 h-12 rounded-2xl bg-red-500/5 border border-red-500/10 flex items-center justify-center text-zinc-800 hover:text-red-500 hover:border-red-500/30 transition-all"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-zinc-900/50 border border-zinc-800 rounded-[40px] p-8 space-y-6 text-left">
                            <div className="flex items-center gap-3">
                                <Shield className="text-primary" size={20} />
                                <h3 className="text-sm font-black uppercase tracking-widest text-white">Security Protocol</h3>
                            </div>
                            <p className="text-xs text-zinc-500 leading-relaxed font-bold italic">
                                "Updating these requirements will immediately trigger notification vectors to all pending pilots. High-enforcement changes may restrict active pilot status until verified."
                            </p>

                            <div className="pt-6 border-t border-zinc-800 space-y-4">
                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                    <span className="text-zinc-600">Active Mandates</span>
                                    <span className="text-primary">{requiredDocuments.filter(d => d.isRequired).length}</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                    <span className="text-zinc-600">Verification Engine</span>
                                    <span className="text-zinc-400">Autonomous</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-primary rounded-[40px] text-black">
                            <h4 className="text-sm font-black uppercase tracking-widest mb-2">Need Custom Logic?</h4>
                            <p className="text-[11px] font-bold opacity-70 leading-relaxed mb-6 italic">
                                Complex document verification triggers can be configured in the Heuristics Engine.
                            </p>
                            <button className="w-full py-4 bg-black text-primary text-[10px] font-black uppercase tracking-widest rounded-2xl hover:scale-[1.02] transition-all">
                                Go to System Rules
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Simple Mock Modal for Adding (UI only for this demo) */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
                    <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-[40px] p-10 space-y-8 animate-in fade-in zoom-in duration-300">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-black uppercase tracking-tighter">New Requirement</h2>
                            <button onClick={() => setIsAddModalOpen(false)} className="text-zinc-500 hover:text-white">✕</button>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Document Name</label>
                                <input className="w-full bg-black border border-zinc-800 rounded-2xl py-4 px-6 font-bold text-sm outline-none focus:border-primary transition-all" placeholder="e.g. Criminal Background Check" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Category</label>
                                <select className="w-full bg-black border border-zinc-800 rounded-2xl py-4 px-6 font-bold text-sm outline-none focus:border-primary transition-all">
                                    <option>identity</option>
                                    <option>vehicle</option>
                                    <option>license</option>
                                    <option>other</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button onClick={() => setIsAddModalOpen(false)} className="flex-1 py-4 bg-primary text-black text-[10px] font-black uppercase tracking-widest rounded-2xl hover:brightness-110 transition-all">
                                Initialize
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DocumentManagement;
