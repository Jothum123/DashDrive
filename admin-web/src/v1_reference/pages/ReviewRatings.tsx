import {
    ArrowUpDown,
    Calendar,
    Filter,
    MessageSquare,
    Search,
    Star,
    Trash2,
    User
} from 'lucide-react';
import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { useAdminStore } from '../../stores/adminStore';

export const ReviewRatings: React.FC = () => {
    const { reviews, deleteReview } = useAdminStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterRating, setFilterRating] = useState<number | 'all'>('all');
    const [filterTarget, setFilterTarget] = useState<'all' | 'driver' | 'user'>('all');

    const filteredReviews = reviews.filter(rev => {
        const matchesSearch =
            rev.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            rev.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            rev.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
            rev.rideId.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesRating = filterRating === 'all' || rev.rating === filterRating;
        const matchesTarget = filterTarget === 'all' || rev.target === filterTarget;

        return matchesSearch && matchesRating && matchesTarget;
    });

    const avgRating = reviews.length > 0
        ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1)
        : '0.0';

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this review? This action is permanent.')) {
            deleteReview(id);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Header
                title="Review Analytics"
                subtitle="Mission Feedback & Behavioral Audit"
            />

            <div className="flex-1 p-8 space-y-8">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[32px] space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Global Score</p>
                        <div className="flex items-center gap-3">
                            <span className="text-3xl font-black">{avgRating}</span>
                            <div className="flex text-primary">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} fill={i < Math.round(Number(avgRating)) ? 'currentColor' : 'none'} className={i < Math.round(Number(avgRating)) ? 'text-primary' : 'text-zinc-800'} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[32px] space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Feedback Volume</p>
                        <p className="text-3xl font-black">{reviews.length}</p>
                    </div>
                    <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[32px] space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Critical Alerts</p>
                        <p className="text-3xl font-black text-red-500">{reviews.filter(r => r.rating <= 2).length}</p>
                    </div>
                    <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[32px] space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Positive Vector</p>
                        <p className="text-3xl font-black text-primary">{reviews.filter(r => r.rating >= 4).length}</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center justify-between gap-6">
                    <div className="flex gap-4">
                        <div className="relative group w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-primary transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="Search by name, ride ID, or content..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl py-3 pl-12 pr-4 text-xs font-bold outline-none focus:border-primary/30 transition-all placeholder:text-zinc-600"
                            />
                        </div>

                        <select
                            value={filterRating}
                            onChange={(e) => setFilterRating(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                            className="bg-zinc-900/50 border border-zinc-800 rounded-2xl px-6 py-3 text-[10px] font-black uppercase tracking-widest outline-none focus:border-primary/30 appearance-none min-w-[140px]"
                        >
                            <option value="all">Rating: All</option>
                            <option value="5">5 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="2">2 Stars</option>
                            <option value="1">1 Star</option>
                        </select>

                        <select
                            value={filterTarget}
                            onChange={(e) => setFilterTarget(e.target.value as any)}
                            className="bg-zinc-900/50 border border-zinc-800 rounded-2xl px-6 py-3 text-[10px] font-black uppercase tracking-widest outline-none focus:border-primary/30 appearance-none min-w-[140px]"
                        >
                            <option value="all">Target: All</option>
                            <option value="driver">Target: Pilot</option>
                            <option value="user">Target: User</option>
                        </select>
                    </div>

                    <button className="flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all">
                        <ArrowUpDown size={14} />
                        Sort: Newest
                    </button>
                </div>

                {/* Review Table/List */}
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-[40px] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] border-b border-zinc-800 bg-zinc-900/20">
                                    <th className="px-8 py-6">Participants</th>
                                    <th className="px-8 py-6">Mission Ref</th>
                                    <th className="px-8 py-6">Score</th>
                                    <th className="px-8 py-6">Evaluation Details</th>
                                    <th className="px-8 py-6">Temporal Data</th>
                                    <th className="px-8 py-6 text-right">Control</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800/50">
                                {filteredReviews.map((rev) => (
                                    <tr key={rev.id} className="hover:bg-zinc-800/20 transition-all group">
                                        <td className="px-8 py-8">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2">
                                                    <User size={12} className="text-zinc-500" />
                                                    <span className={`text-[11px] font-black uppercase ${rev.target === 'user' ? 'text-primary' : 'text-zinc-400'}`}>{rev.userName}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-3 h-3 rounded-full bg-zinc-800 flex items-center justify-center">
                                                        <div className="w-1 h-1 rounded-full bg-zinc-600" />
                                                    </div>
                                                    <span className={`text-[11px] font-black uppercase ${rev.target === 'driver' ? 'text-primary' : 'text-zinc-400'}`}>{rev.driverName}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-8">
                                            <span className="text-xs font-mono font-black text-zinc-500 tracking-tighter">{rev.rideId}</span>
                                        </td>
                                        <td className="px-8 py-8">
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={12} fill={i < rev.rating ? 'currentColor' : 'none'} className={i < rev.rating ? 'text-primary' : 'text-zinc-800'} />
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-8 py-8 max-w-md">
                                            <div className="flex items-start gap-4">
                                                <MessageSquare size={16} className="text-zinc-700 mt-1 shrink-0" />
                                                <p className="text-xs font-bold text-zinc-400 leading-relaxed italic">
                                                    "{rev.comment}"
                                                </p>
                                            </div>
                                            <div className="mt-2 flex">
                                                <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest ${rev.target === 'driver' ? 'bg-zinc-800 text-zinc-500 border border-zinc-700' : 'bg-primary/10 text-primary border border-primary/20'
                                                    }`}>
                                                    Against {rev.target}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-8">
                                            <div className="flex items-center gap-2 text-zinc-500">
                                                <Calendar size={12} />
                                                <span className="text-[10px] font-black">{rev.createdAt}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-8 text-right">
                                            <button
                                                onClick={() => handleDelete(rev.id)}
                                                className="p-3 rounded-2xl bg-red-500/5 text-zinc-800 hover:text-red-500 transition-all border border-transparent hover:border-red-500/20"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredReviews.length === 0 && (
                        <div className="py-24 text-center">
                            <div className="w-16 h-16 bg-zinc-950 rounded-[20px] border border-zinc-800 flex items-center justify-center mx-auto mb-6">
                                <Filter className="text-zinc-800" size={32} />
                            </div>
                            <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-2">No feedback found</h3>
                            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Adjust your scan parameters to find archives</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReviewRatings;
