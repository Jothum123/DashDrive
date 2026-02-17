import React from 'react';

export const DashboardOverview: React.FC = () => {
    return (
        <div className="space-y-10">
            <div className="flex flex-col">
                <h1 className="text-4xl font-black text-white tracking-tighter uppercase font-display leading-none">
                    Global <span className="text-primary italic">Command</span>
                </h1>
                <p className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-[10px] mt-2">
                    Predictive Operations Hub // Harare Metro
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPIBox title="Total Revenue" value="$4,852,102" trend="+18.4%" />
                <KPIBox title="Active Fleet" value="1,284" trend="+42" />
                <KPIBox title="Success Rate" value="98.2%" trend="+0.4%" />
                <KPIBox title="Pending Bids" value="452" trend="Live" />
            </div>

            <div className="h-[500px] glass-card-2026 light-catcher flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary animate-pulse">
                        <span className="material-icons-outlined text-4xl">radar</span>
                    </div>
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Initializing Map Engine...</p>
                </div>
            </div>
        </div>
    );
};

const KPIBox = ({ title, value, trend }: { title: string, value: string, trend: string }) => (
    <div className="glass-card-2026 light-catcher group hover:border-primary/30">
        <div className="flex justify-between items-start mb-4">
            <h3 className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">{title}</h3>
            <span className="text-[10px] font-black text-primary py-0.5 px-2 bg-primary/10 rounded-full">{trend}</span>
        </div>
        <p className="text-3xl font-black text-white tracking-tight">{value}</p>
    </div>
);
