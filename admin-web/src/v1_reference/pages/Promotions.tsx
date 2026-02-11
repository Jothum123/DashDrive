import { Gift, Percent, Plus, ToggleLeft, ToggleRight, Trash2, X, Zap } from 'lucide-react';
import React, { useState } from 'react';
import { useAdminStore } from '../../stores/adminStore';

export function Promotions() {
    const { promoCodes, togglePromoCode, addPromoCode } = useAdminStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCode, setNewCode] = useState({
        code: '',
        discount: 0,
        type: 'percentage' as 'percentage' | 'fixed',
        maxUses: 100,
        expiryDate: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addPromoCode({
            ...newCode,
            id: `promo-${Date.now()}`,
            usedCount: 0,
            active: true,
        });
        setIsModalOpen(false);
        setNewCode({
            code: '',
            discount: 0,
            type: 'percentage',
            maxUses: 100,
            expiryDate: '',
        });
    };

    return (
        <div className="min-h-screen bg-transparent">
            <div className="p-8 pb-0">
                <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">Growth Engine</h2>
                <p className="text-sm text-zinc-500 mt-1">Promotion & Retention Matrix</p>
            </div>

            <div className="p-8">
                {/* Header Actions */}
                <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-8">
                        <div className="card-premium py-4 px-8 border-primary/20 bg-primary/5">
                            <p className="text-3xl font-black text-white tracking-tighter">{promoCodes.filter(c => c.active).length}</p>
                            <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Active Vectors</p>
                        </div>
                        <div className="card-premium py-4 px-8">
                            <p className="text-3xl font-black text-white tracking-tighter">
                                {promoCodes.reduce((acc, curr) => acc + curr.usedCount, 0)}
                            </p>
                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Total Conversions</p>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-3 px-8 py-4 bg-primary text-black text-xs font-black uppercase tracking-widest rounded-3xl hover:scale-105 transition-all shadow-xl shadow-primary/20"
                    >
                        <Plus size={20} strokeWidth={3} />
                        Deploy New Vector
                    </button>
                </div>

                {/* Promo Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {promoCodes.map((promo) => (
                        <div
                            key={promo.id}
                            className={`relative group bg-zinc-950 border border-zinc-900 rounded-[40px] overflow-hidden transition-all duration-500 hover:border-zinc-700 ${!promo.active ? 'opacity-50 grayscale' : ''
                                }`}
                        >
                            {/* Card Top: Branding */}
                            <div className={`h-24 flex items-center justify-center relative overflow-hidden ${promo.active ? 'bg-primary' : 'bg-zinc-800'
                                }`}>
                                <Zap className="text-black/20 absolute -right-4 -bottom-4" size={100} strokeWidth={3} />
                                <h4 className="text-3xl font-black text-black tracking-tighter relative z-10">{promo.code}</h4>
                            </div>

                            {/* Card Body */}
                            <div className="p-8">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <p className="text-4xl font-black text-white tracking-tighter">
                                            {promo.type === 'percentage' ? `${promo.discount}%` : `£${promo.discount}`}
                                        </p>
                                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Discount Magnitude</p>
                                    </div>
                                    <div className="text-right">
                                        <div className={`p-3 rounded-2xl border ${promo.active ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-zinc-900 border-zinc-800 text-zinc-600'}`}>
                                            {promo.type === 'percentage' ? <Percent size={20} /> : <Gift size={20} />}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6 mb-8 pt-6 border-t border-zinc-900">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Deployment Range</span>
                                        <span className="text-xs font-black text-white">{promo.usedCount} / {promo.maxUses}</span>
                                    </div>
                                    <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-1000 ${promo.active ? 'bg-primary shadow-[0_0_10px_rgba(0,255,144,0.5)]' : 'bg-zinc-700'}`}
                                            style={{ width: `${(promo.usedCount / promo.maxUses) * 100}%` }}
                                        />
                                    </div>
                                    <div className="flex justify-between items-center pt-2">
                                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Expiry Timestamp</span>
                                        <span className="text-xs font-black text-zinc-300">{new Date(promo.expiryDate).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => togglePromoCode(promo.id)}
                                        className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${promo.active
                                            ? 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
                                            : 'bg-primary text-black hover:scale-105'
                                            }`}
                                    >
                                        {promo.active ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                                        {promo.active ? 'Deactivate' : 'Activate'}
                                    </button>
                                    <button className="p-3.5 bg-zinc-900 border border-zinc-800 rounded-2xl text-zinc-600 hover:text-red-500 hover:bg-red-500/10 transition-all">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Creation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="flex items-center justify-between p-8 border-b border-zinc-900 bg-zinc-900/20">
                            <div>
                                <h3 className="text-2xl font-black text-white tracking-tight">Generate Code</h3>
                                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1">Configure Vector Parameters</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 border border-zinc-800 rounded-xl text-zinc-500 hover:text-white hover:bg-zinc-800">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Designator Code</label>
                                <input
                                    type="text"
                                    required
                                    value={newCode.code}
                                    onChange={(e) => setNewCode({ ...newCode, code: e.target.value.toUpperCase() })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 text-white text-lg font-black tracking-widest placeholder-zinc-700 outline-none focus:border-primary/50 transition-all"
                                    placeholder="e.g. RIDE100"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Magnitude Value</label>
                                    <input
                                        type="number"
                                        required
                                        value={newCode.discount}
                                        onChange={(e) => setNewCode({ ...newCode, discount: Number(e.target.value) })}
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 text-white text-lg font-black outline-none focus:border-primary/50 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Type</label>
                                    <select
                                        value={newCode.type}
                                        onChange={(e) => setNewCode({ ...newCode, type: e.target.value as any })}
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-primary/50 transition-all"
                                    >
                                        <option value="percentage">Percentage (%)</option>
                                        <option value="fixed">Fixed (£)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Cap Limit</label>
                                    <input
                                        type="number"
                                        required
                                        value={newCode.maxUses}
                                        onChange={(e) => setNewCode({ ...newCode, maxUses: Number(e.target.value) })}
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-primary/50 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Expiry Date</label>
                                    <input
                                        type="date"
                                        required
                                        value={newCode.expiryDate}
                                        onChange={(e) => setNewCode({ ...newCode, expiryDate: e.target.value })}
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-primary/50 transition-all [color-scheme:dark]"
                                    />
                                </div>
                            </div>

                            <div className="pt-8">
                                <button
                                    type="submit"
                                    className="w-full bg-primary text-black py-5 rounded-3xl text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                                >
                                    Initiate Deployment
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
