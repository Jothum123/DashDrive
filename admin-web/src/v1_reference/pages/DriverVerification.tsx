import { CheckCircle2, FileText, Info, Search } from 'lucide-react';
import React, { useState } from 'react';

interface PendingDriver {
    id: string;
    name: string;
    email: string;
    submittedAt: string;
    documents: {
        license: string;
        insurance: string;
        registration: string;
    };
}

const mockDrivers: PendingDriver[] = [
    {
        id: 'DRV-992',
        name: 'Michael Chen',
        email: 'm.chen@example.com',
        submittedAt: '2024-02-10 14:24',
        documents: {
            license: 'lic_882.jpg',
            insurance: 'ins_882.pdf',
            registration: 'reg_882.jpg'
        }
    },
    {
        id: 'DRV-102',
        name: 'Sarah Williams',
        email: 'sarah.w@example.com',
        submittedAt: '2024-02-10 15:10',
        documents: {
            license: 'lic_102.jpg',
            insurance: 'ins_102.pdf',
            registration: 'reg_102.jpg'
        }
    }
];

export const DriverVerification: React.FC = () => {
    const [selectedId, setSelectedId] = useState<string | null>(mockDrivers[0].id);
    const selectedDriver = mockDrivers.find(d => d.id === selectedId);

    return (
        <div className="flex h-[calc(100vh-160px)] gap-8">
            {/* Left: Pending Queue */}
            <div className="w-[400px] flex flex-col gap-6">
                <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/10 p-6 rounded-[32px] shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-uber-bold text-gray-900 dark:text-white leading-tight">Verification Queue</h2>
                        <span className="px-3 py-1 bg-brand-500/10 text-brand-500 text-[10px] font-black rounded-lg">
                            {mockDrivers.length} PENDING
                        </span>
                    </div>
                    <div className="relative mb-4">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search pending drivers..."
                            className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-white/5 border border-transparent focus:border-brand-500/20 rounded-2xl text-xs focus:outline-none transition-all font-medium"
                        />
                    </div>

                    <div className="space-y-2 max-h-[500px] overflow-y-auto no-scrollbar">
                        {mockDrivers.map(driver => (
                            <div
                                key={driver.id}
                                onClick={() => setSelectedId(driver.id)}
                                className={`p-4 rounded-2xl cursor-pointer transition-all border ${selectedId === driver.id
                                        ? 'bg-brand-500 border-brand-500 shadow-lg shadow-brand-500/20'
                                        : 'bg-transparent border-transparent hover:bg-gray-50 dark:hover:bg-white/5'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className={`text-sm font-uber-bold ${selectedId === driver.id ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                                            {driver.name}
                                        </p>
                                        <p className={`text-[10px] font-medium mt-0.5 ${selectedId === driver.id ? 'text-white/60' : 'text-gray-500'}`}>
                                            {driver.id} • {driver.submittedAt}
                                        </p>
                                    </div>
                                    {selectedId === driver.id && <CheckCircle2 className="text-white" size={16} />}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-6 bg-zinc-950 dark:bg-white rounded-[28px] text-white dark:text-zinc-950 shadow-2xl">
                    <div className="flex items-center gap-2 mb-4">
                        <Info size={16} className="text-brand-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest leading-none">Status Note</span>
                    </div>
                    <p className="text-xs font-medium leading-relaxed opacity-70">
                        Drivers must provide high-res documents. Automated OCR is currently processing SARAH-102's insurance.
                    </p>
                </div>
            </div>

            {/* Right: Document Viewer */}
            <div className="flex-1 bg-white dark:bg-zinc-900 rounded-[40px] border border-gray-100 dark:border-white/10 shadow-xl overflow-hidden flex flex-col">
                {selectedDriver ? (
                    <>
                        <div className="p-8 border-b border-gray-50 dark:border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-white/5 flex items-center justify-center border border-gray-200 dark:border-white/10">
                                    <span className="text-xl font-black text-gray-400">MC</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-uber-bold text-gray-900 dark:text-white">{selectedDriver.name}</h3>
                                    <p className="text-sm text-gray-500 font-medium">{selectedDriver.email}</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button className="px-8 py-3 bg-rose-500/10 text-rose-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all">
                                    Reject
                                </button>
                                <button className="px-8 py-3 bg-brand-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/20 active:scale-95">
                                    Approve Profile
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 p-8 overflow-y-auto no-scrollbar grid grid-cols-2 gap-8">
                            <DocumentCard title="Driver's License" filename={selectedDriver.documents.license} />
                            <DocumentCard title="Vehicle Insurance" filename={selectedDriver.documents.insurance} />
                            <DocumentCard title="Vehicle Registration" filename={selectedDriver.documents.registration} fullWidth />
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-12 opacity-40">
                        <FileText size={64} className="mb-6" />
                        <h3 className="text-xl font-uber-bold">Select a profile</h3>
                        <p className="max-w-xs mt-2">Pick a driver from the left queue to begin verification</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const DocumentCard: React.FC<{ title: string; filename: string; fullWidth?: boolean }> = ({ title, filename, fullWidth }) => (
    <div className={`space-y-3 ${fullWidth ? 'col-span-2' : ''}`}>
        <div className="flex items-center justify-between px-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{title}</span>
            <span className="text-[10px] font-bold text-brand-500 cursor-pointer hover:underline">View Original</span>
        </div>
        <div className="aspect-[4/3] bg-gray-50 dark:bg-black/20 rounded-3xl border border-dashed border-gray-200 dark:border-white/10 flex items-center justify-center group relative overflow-hidden">
            <div className="text-center group-hover:scale-110 transition-transform">
                <FileText size={42} className="text-gray-300 dark:text-white/10 mx-auto mb-2" />
                <p className="text-[10px] font-bold text-gray-400">{filename}</p>
            </div>
            {/* Visualizer overlay */}
            <div className="absolute inset-0 bg-brand-500/0 group-hover:bg-brand-500/5 transition-colors" />
        </div>
    </div>
);

export default DriverVerification;
