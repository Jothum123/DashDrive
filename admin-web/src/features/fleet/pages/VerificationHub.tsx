import {
    Activity,
    Bolt,
    CheckCircle2,
    Clock,
    FileText,
    History,
    ShieldCheck,
    UserCircle
} from 'lucide-react';
import React, { useState } from 'react';

const applicants = [
    {
        id: "1",
        name: "Marco Rossi",
        registered: "2h ago",
        status: "In Review",
        isExpress: true,
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAyxc3scrOA9yw6qQI_cAWwMDuvAZyvvhKYyiaphzzpWyZps-DWeEOWsdKtEPv3OowwRfWUNH_zl10yXYDe7Mb0sDuF5fqhOLR-KkDaOLgZreYgL7ZeHVOP1PRDQNIm9wjnTk7c4XuEq2sKmM8Nw1uQ43cm5c7Etb0lc6j1O_ayez8pWown6grcXFwXqDG3f_dVdkA-tG8WXvq46JOqLe4eMJXvygGATsiI3k7r5-Uf6WtddTvcxqxoB-E-2oVhs2HANX8YwXbhfLg",
        idValidated: true,
        backgroundPending: true
    },
    {
        id: "2",
        name: "Liam Chen",
        registered: "5h ago",
        status: "80% Complete",
        isExpress: false,
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVdh0P9JGLT5gsg9IF22M0U50oSIfRtut5BADEn6YImBLp1Ue0I76ezqcmg1HxCzkLlfvGvov8PdBPXWCMChIvZvUit6YXG6FpP7U9YQGxkFZ44m3VlxPNIgaYpELGxj8jX493j1s4gOfUsZnYf6-oFA-mcxADz7lz5PFt4G87BrIuYULtkuLqSrVSEguJ-48pusoeIj4r4qaHxvu28yRqEireXsu_yFfAJFu3c_pViOyfRtSo9dIg4BEAXiFdslYkPGQSKg3xZW4",
        idValidated: true,
        backgroundPending: false
    }
];

export const VerificationHub: React.FC = () => {
    const [selectedApplicant, setSelectedApplicant] = useState(applicants[0]);

    return (
        <div className="flex h-full overflow-hidden dark:bg-zinc-950">
            {/* Left Pane: Queue */}
            <div className="w-1/3 border-r border-border-dark flex flex-col dark:bg-panel-dark/30 shrink-0">
                <div className="p-6 flex items-center justify-between border-b border-border-dark dark:bg-panel-dark/50 backdrop-blur">
                    <div>
                        <h3 className="text-lg font-bold text-white">Verification Queue</h3>
                        <p className="text-xs text-slate-500 font-medium">24 Pending Applications</p>
                    </div>
                    <div className="flex bg-background-dark p-1 rounded-lg border border-border-dark">
                        <button className="px-3 py-1.5 text-[10px] font-bold bg-primary text-black rounded-md shadow-sm">NEWEST</button>
                        <button className="px-3 py-1.5 text-[10px] font-bold text-slate-500 hover:text-slate-300 transition-colors">URGENT</button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3 pt-6">
                    {applicants.map((applicant) => (
                        <div
                            key={applicant.id}
                            onClick={() => setSelectedApplicant(applicant)}
                            className={`
                                p-4 rounded-xl cursor-pointer transition-all border-2
                                ${selectedApplicant.id === applicant.id
                                    ? 'bg-primary/10 border-primary'
                                    : 'bg-panel-dark/50 border-border-dark hover:border-primary/40'}
                            `}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="relative">
                                    <img
                                        src={applicant.avatar}
                                        alt={applicant.name}
                                        className="w-12 h-12 rounded-lg object-cover border border-white/10"
                                    />
                                    {applicant.isExpress && (
                                        <div className="absolute -top-1 -right-1 bg-primary text-black p-0.5 rounded-full ring-2 ring-panel-dark shadow-lg">
                                            <Bolt size={10} fill="currentColor" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <h4 className={`font-bold text-sm truncate ${selectedApplicant.id === applicant.id ? 'text-primary' : 'text-slate-200'}`}>
                                        {applicant.name}
                                    </h4>
                                    <p className="text-[10px] text-slate-500 font-medium uppercase tracking-tight">Registered {applicant.registered}</p>
                                </div>
                                {applicant.isExpress && (
                                    <div className="flex items-center gap-1 text-primary animate-pulse">
                                        <span className="text-[8px] font-black uppercase tracking-tighter">Express</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                {applicant.idValidated && (
                                    <span className="bg-green-500/10 text-green-500 text-[9px] px-2 py-0.5 rounded-full border border-green-500/20 font-bold uppercase">ID Validated</span>
                                )}
                                {applicant.backgroundPending && (
                                    <span className="bg-amber-500/10 text-amber-500 text-[9px] px-2 py-0.5 rounded-full border border-amber-500/20 font-bold uppercase">Background Pending</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Pane: Detailed Profile */}
            <div className="flex-1 overflow-y-auto custom-scrollbar dark:bg-background-dark relative">
                {/* Action Bar Overlay */}
                <div className="sticky top-0 w-full z-20 dark:bg-background-dark/80 backdrop-blur-md border-b border-border-dark px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></div>
                            <span className="text-sm font-bold uppercase tracking-wider text-amber-500">In Review</span>
                        </div>
                        <div className="h-4 w-px bg-border-dark"></div>
                        <div className="flex items-center gap-2">
                            <UserCircle size={16} className="text-slate-500" />
                            <span className="text-xs text-slate-500 font-medium">Assignee: <span className="text-slate-300">Alex Rivera</span></span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="px-4 py-2 rounded-lg border border-red-500/30 text-red-500 text-xs font-bold hover:bg-red-500/10 transition-all uppercase tracking-wide">
                            Reject Application
                        </button>
                        <button className="px-4 py-2 rounded-lg bg-primary text-black text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all uppercase tracking-wide">
                            Approve Driver
                        </button>
                    </div>
                </div>

                <div className="p-8">
                    <div className="grid grid-cols-12 gap-8">
                        {/* Left Column: Details */}
                        <div className="col-span-7 space-y-8">
                            <section>
                                <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                                    <UserCircle size={18} className="text-primary" />
                                    Personal & Vehicle Details
                                </h3>
                                <div className="bg-panel-dark/50 border border-border-dark rounded-xl p-6">
                                    <div className="grid grid-cols-2 gap-y-6">
                                        <div>
                                            <p className="text-[10px] text-slate-500 mb-1 uppercase tracking-widest font-bold">Legal Name</p>
                                            <p className="font-bold text-slate-200">{selectedApplicant.name} Valente</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-500 mb-1 uppercase tracking-widest font-bold">Email Address</p>
                                            <p className="font-bold text-slate-200 underline decoration-primary/30">m.rossi@provider.com</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-500 mb-1 uppercase tracking-widest font-bold">Vehicle Model</p>
                                            <p className="font-bold text-slate-200">Tesla Model 3 (2023)</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-500 mb-1 uppercase tracking-widest font-bold">License Plate</p>
                                            <p className="font-mono bg-primary/10 px-2 py-0.5 rounded border border-primary/20 inline-block font-bold text-primary">RX-774-ML</p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                                    <FileText size={18} className="text-primary" />
                                    Verification Documents
                                </h3>
                                <div className="grid grid-cols-3 gap-4">
                                    {[
                                        { title: "Identity Card", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3V7NPUL4esYwVkZPSJ14yCjZ3Gf5sd5YmOJ73uXLpqksyl9LLNIu4K2ohI32UjHp1_kgYApLHjADmYsAaGRIAPi4uKLt4c3tdLn136MwddQ3ThnW488oc-kmK_ftDvHjXQsprIZ-pz2NzrtZJe2J_hT0QZPxIo81BGn32YSGswehaJJsL1EJRQtQnKkDmUCIneroNnFJAoCWV-daCtni-BJHK-4peZs--RqSD5rD3I69Y39a1-qCYZMVcVG-iUwVV6Dk9Yy1KQgs" },
                                        { title: "Vehicle Registry", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7K9Zi_Lg0CLR7sKrmzN29urmRSjplehXlXo4BoZNj7tdPq9v8L_0ZBmHyIynGx2yPHHiXHgdvY2Iz9GONrqr7feA5hMsKA73bn8OFT6qIpV-IT-nOKFc1n9xp_IOrAgBbWlTfgGWPOYlrcnUeJ3oiAvUMo_A7b7x9RwCobY3bbfzNB3oYEgIXqmW05aVmp3FBFZVAxIuv8vEGX_8kihIj9MqJuhE_FVudU9VIgFAMhRc_sDD6k5iRBQ1vtse_pOBFrDrTDUR2wQA" },
                                        { title: "Vehicle Interior", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBC6Dc8sn90-VLmZQ4qasVeoOVcB024KC2-oyrjdqahEtlxQFeyQjFvUBqxhEP4UOEKkGypk77SdRLq5-rjUqx4bi81Av6MHLUf7RCNFV9NFkfqH2iEFBNOkakp-a5YTdjgd2aG2mkcXU6xEdy3pGD6SfflNk6IuaRJ6wEAQ-vvpY9CQQH4XqfsMvfl4kpQ5JpHPEaoP2y19XvGb1UApao17yWgF65eWRSXZ0c8CvQUmA_WTSTRwyJrGkuakD-OZbwxpF1eqoHNEHk" }
                                    ].map((doc, i) => (
                                        <div key={i} className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-border-dark cursor-zoom-in hover:border-primary transition-all">
                                            <img src={doc.img} alt={doc.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-transparent to-transparent flex items-end p-3">
                                                <span className="text-[10px] font-bold text-white uppercase tracking-wider">{doc.title}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Right Column: Stats & Audit */}
                        <div className="col-span-5 space-y-8">
                            <section>
                                <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                                    <Activity size={18} className="text-primary" />
                                    Performance Analytics
                                </h3>
                                <div className="space-y-4">
                                    <div className="bg-panel-dark/50 border border-border-dark rounded-xl p-5">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Active Bid Confidence</p>
                                                <p className="text-2xl font-black text-primary">88.4%</p>
                                            </div>
                                            <span className="text-green-500 text-xs font-bold bg-green-500/10 px-2 py-1 rounded">+12% vs avg</span>
                                        </div>
                                        <div className="h-16 flex items-end gap-1 px-1">
                                            {[0.4, 0.6, 0.55, 0.8, 0.95, 0.9, 1].map((h, i) => (
                                                <div key={i} className={`flex-1 rounded-t-sm transition-all ${i >= 4 ? 'bg-primary' : 'bg-primary/20'}`} style={{ height: `${h * 100}%` }}></div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-panel-dark/50 border border-border-dark rounded-xl p-5">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Counter-Offer Success</p>
                                                <p className="text-2xl font-black text-slate-300">62/100</p>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-[10px] font-bold uppercase text-slate-500 block">System Avg</span>
                                                <span className="text-xs font-bold text-slate-300">45%</span>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="space-y-1">
                                                <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter">
                                                    <span className="text-slate-400">Conversion Rate</span>
                                                    <span className="text-primary">62%</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-background-dark rounded-full overflow-hidden">
                                                    <div className="h-full bg-primary rounded-full w-[62%] transition-all duration-1000"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                                    <History size={18} className="text-primary" />
                                    Verification Audit
                                </h3>
                                <div className="border-l-2 border-border-dark ml-3 space-y-6">
                                    {[
                                        { title: "Identity Verification Passed", time: "2 hours ago", author: "Verified by AI System", icon: CheckCircle2, color: "text-green-500" },
                                        { title: "Background Check Initiated", time: "1.5 hours ago", author: "System", icon: Clock, color: "text-amber-500" },
                                        { title: "Admin Review Claimed", time: "10 mins ago", author: "Alex Rivera", icon: ShieldCheck, color: "text-primary" }
                                    ].map((event, i) => (
                                        <div key={i} className="relative pl-6">
                                            <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-panel-dark border-2 border-border-dark flex items-center justify-center`}>
                                                <div className={`w-1.5 h-1.5 rounded-full ${event.color.replace('text', 'bg')}`}></div>
                                            </div>
                                            <p className="text-xs font-bold text-slate-200">{event.title}</p>
                                            <p className="text-[10px] text-slate-500 font-medium italic">{event.time} • {event.author}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerificationHub;
