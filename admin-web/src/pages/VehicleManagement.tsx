import {
    Award,
    Car,
    Edit3,
    Plus,
    Power,
    Shield,
    Trash2,
    Users,
    X,
    Zap
} from 'lucide-react';
import { useState } from 'react';
import { Header } from '../components/layout/Header';
import { useAdminStore, type VehicleService } from '../stores/adminStore';

const iconMap: Record<string, any> = {
    Car,
    Zap,
    Users,
    Award,
    Shield
};

export function VehicleManagement() {
    const { vehicleServices, addVehicleService, updateVehicleService, removeVehicleService } = useAdminStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<VehicleService | null>(null);

    const [formData, setFormData] = useState<Omit<VehicleService, 'id'>>({
        type: '',
        costPerKm: 0,
        icon: 'Car',
        status: 'active',
        eligibleVehicles: [],
        minYear: 2015
    });

    const [eligibleVehiclesStr, setEligibleVehiclesStr] = useState('');

    const handleOpenModal = (service?: VehicleService) => {
        if (service) {
            setEditingService(service);
            setFormData({
                type: service.type,
                costPerKm: service.costPerKm,
                icon: service.icon,
                status: service.status,
                eligibleVehicles: service.eligibleVehicles,
                minYear: service.minYear
            });
            setEligibleVehiclesStr(service.eligibleVehicles.join(', '));
        } else {
            setEditingService(null);
            setFormData({
                type: '',
                costPerKm: 0,
                icon: 'Car',
                status: 'active',
                eligibleVehicles: [],
                minYear: 2015
            });
            setEligibleVehiclesStr('');
        }
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const updatedData = {
            ...formData,
            eligibleVehicles: eligibleVehiclesStr.split(',').map(v => v.trim()).filter(v => v !== '')
        };

        if (editingService) {
            updateVehicleService(editingService.id, updatedData);
        } else {
            addVehicleService(updatedData);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Header
                title="Vehicle Service Matrix"
                subtitle="Fleet Configuration & Pricing Algorithms"
                actions={
                    <button
                        onClick={() => handleOpenModal()}
                        className="bg-primary text-black font-black px-6 py-3 rounded-2xl flex items-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/10 text-[10px] uppercase tracking-widest"
                    >
                        <Plus size={14} />
                        Add New Service
                    </button>
                }
            />

            <div className="flex-1 p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {vehicleServices.map((service) => {
                        const Icon = iconMap[service.icon] || Car;
                        return (
                            <div
                                key={service.id}
                                className={`relative group bg-zinc-900/40 border rounded-[32px] p-8 transition-all duration-300 hover:bg-zinc-800/50 hover:border-white/20 ${service.status === 'active' ? 'border-white/5' : 'border-red-500/20 opacity-60'
                                    }`}
                            >
                                <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleOpenModal(service)}
                                        className="p-2 bg-zinc-950 rounded-lg border border-white/5 text-zinc-400 hover:text-white hover:border-white/20 transition-all"
                                    >
                                        <Edit3 size={14} />
                                    </button>
                                    <button
                                        onClick={() => removeVehicleService(service.id)}
                                        className="p-2 bg-zinc-950 rounded-lg border border-white/5 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>

                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-2xl ${service.status === 'active' ? 'bg-primary/10 text-primary' : 'bg-red-500/10 text-red-500'
                                    }`}>
                                    <Icon size={28} />
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-black tracking-tight">{service.type}</h3>
                                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                                            Pricing Algorithm v1.2
                                        </p>
                                    </div>

                                    <div className="flex items-end justify-between">
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em]">Cost per KM</p>
                                            <p className="text-2xl font-black tabular-nums">£{service.costPerKm.toFixed(2)}</p>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border flex items-center gap-1.5 ${service.status === 'active'
                                            ? 'bg-primary/10 text-primary border-primary/20'
                                            : 'bg-red-500/10 text-red-500 border-red-500/20'
                                            }`}>
                                            <Power size={10} />
                                            {service.status}
                                        </div>
                                    </div>

                                    {/* Vehicle Configuration Specs */}
                                    <div className="pt-4 border-t border-white/5 space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[9px] font-black uppercase text-zinc-600">Model Age</span>
                                            <span className="text-[10px] font-bold text-zinc-400">{service.minYear}+</span>
                                        </div>
                                        <div className="space-y-1.5">
                                            <span className="text-[9px] font-black uppercase text-zinc-600 block">Eligible Assets</span>
                                            <div className="flex flex-wrap gap-1.5">
                                                {service.eligibleVehicles.slice(0, 3).map((v, i) => (
                                                    <span key={i} className="px-2 py-0.5 bg-zinc-950 border border-white/5 rounded text-[8px] font-black text-zinc-500">
                                                        {v}
                                                    </span>
                                                ))}
                                                {service.eligibleVehicles.length > 3 && (
                                                    <span className="text-[8px] font-bold text-zinc-700">+{service.eligibleVehicles.length - 3} more</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Service Configuration Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
                    <div className="relative w-full max-w-lg bg-zinc-900 border border-white/10 rounded-[40px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
                            <h3 className="text-xl font-black tracking-tight uppercase">
                                {editingService ? 'Edit Fleet Asset' : 'Register New Hub Asset'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                                <X size={24} className="text-zinc-500" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Asset Category Name</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.type}
                                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                                    className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-xl text-xs focus:border-primary outline-none transition-all"
                                    placeholder="e.g., Luxury Executive"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Base Cost (£/KM)</label>
                                    <input
                                        required
                                        type="number"
                                        step="0.01"
                                        value={formData.costPerKm}
                                        onChange={e => setFormData({ ...formData, costPerKm: parseFloat(e.target.value) })}
                                        className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-xl text-xs focus:border-primary outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Symbol Projection</label>
                                    <select
                                        value={formData.icon}
                                        onChange={e => setFormData({ ...formData, icon: e.target.value })}
                                        className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-xl text-xs focus:border-primary outline-none transition-all appearance-none"
                                    >
                                        <option value="Car">Standard Vehicular</option>
                                        <option value="Zap">Electric Pulse</option>
                                        <option value="Users">High Capacity</option>
                                        <option value="Award">Premium Status</option>
                                        <option value="Shield">Safety First</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Eligible Vehicle Models (Comma Separated)</label>
                                <textarea
                                    required
                                    value={eligibleVehiclesStr}
                                    onChange={e => setEligibleVehiclesStr(e.target.value)}
                                    className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-xl text-xs focus:border-primary outline-none transition-all h-24 resize-none"
                                    placeholder="e.g., Tesla Model 3, BMW i4, Audi Q8 e-tron"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Minimum Model Year</label>
                                <input
                                    required
                                    type="number"
                                    value={formData.minYear}
                                    onChange={e => setFormData({ ...formData, minYear: parseInt(e.target.value) })}
                                    className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-xl text-xs focus:border-primary outline-none transition-all"
                                    placeholder="2015"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Operational State</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, status: 'active' })}
                                        className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${formData.status === 'active'
                                            ? 'bg-primary text-black border-primary'
                                            : 'bg-black text-zinc-600 border-zinc-800 hover:border-zinc-700'
                                            }`}
                                    >
                                        Online (Active)
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, status: 'inactive' })}
                                        className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${formData.status === 'inactive'
                                            ? 'bg-red-500 text-white border-red-500'
                                            : 'bg-black text-zinc-600 border-zinc-800 hover:border-zinc-700'
                                            }`}
                                    >
                                        Offline (Halted)
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-primary text-black text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl hover:scale-[1.01] active:scale-[0.98] transition-all shadow-xl shadow-primary/20"
                            >
                                {editingService ? 'Commit Changes' : 'Initialize Service'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
