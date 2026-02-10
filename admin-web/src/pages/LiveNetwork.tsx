import {
    GoogleMap,
    Marker,
} from '@react-google-maps/api';
import {
    Calendar,
    Filter,
    Map as MapIcon,
    Minus,
    Plus,
    Search,
    X
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { useGoogleMaps } from '../components/maps/GoogleMapsProvider';
import { useAdminStore } from '../stores/adminStore';

const MAP_CONTAINER_STYLE = {
    width: '100%',
    height: '100%'
};

const MAP_CENTER = {
    lat: 51.5074,
    lng: -0.1278
};

export function LiveNetwork() {
    const { drivers, recentRides } = useAdminStore();
    const [isMapVisible, setIsMapVisible] = useState(false);
    const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed' | 'cancelled'>('all');

    const { isLoaded } = useGoogleMaps();

    const filteredRides = useMemo(() => {
        if (activeTab === 'all') return recentRides;
        if (activeTab === 'active') return recentRides.filter(r => r.status === 'in_progress');
        if (activeTab === 'completed') return recentRides.filter(r => r.status === 'completed');
        if (activeTab === 'cancelled') return recentRides.filter(r => r.status === 'cancelled');
        return recentRides;
    }, [recentRides, activeTab]);

    const activePilots = useMemo(() => drivers.filter(d => d.onlineStatus === 'online'), [drivers]);

    return (
        <div className="p-8 bg-[#F8F9FA] min-h-full">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Trip Monitoring</h1>
                <div className="flex items-center gap-3">
                    <div className="bg-white px-4 py-2 rounded-xl flex items-center gap-3 border border-gray-200 text-sm font-bold text-gray-700 shadow-sm">
                        <Search size={18} className="text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search rides..."
                            className="bg-transparent border-none outline-none w-48"
                        />
                    </div>
                    <button
                        onClick={() => setIsMapVisible(!isMapVisible)}
                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm font-bold text-gray-700 dark:text-white hover:bg-gray-50 transition-all shadow-sm"
                    >
                        <MapIcon size={18} className="text-[#4A3AFF]" />
                        {isMapVisible ? 'Hide Map' : 'Live Map View'}
                    </button>
                </div>
            </div>

            {isMapVisible && (
                <div className="mb-8 h-[400px] rounded-[32px] overflow-hidden relative border border-gray-200 dark:border-white/10 shadow-lg animate-in fade-in zoom-in duration-300">
                    {isLoaded ? (
                        <GoogleMap
                            mapContainerStyle={MAP_CONTAINER_STYLE}
                            center={MAP_CENTER}
                            zoom={13}
                            options={{
                                disableDefaultUI: true,
                                zoomControl: false,
                                styles: MAP_STYLES,
                            }}
                        >
                            {activePilots.map(pilot => (
                                <Marker
                                    key={pilot.id}
                                    position={pilot.location}
                                    icon={{
                                        path: "M 0,-10 L 8,10 L 0,6 L -8,10 Z",
                                        fillColor: "#4A3AFF",
                                        fillOpacity: 1,
                                        strokeWeight: 2,
                                        strokeColor: "#ffffff",
                                        scale: 1.2,
                                        rotation: pilot.telemetry?.heading || 0,
                                    }}
                                />
                            ))}
                        </GoogleMap>
                    ) : (
                        <div className="h-full bg-gray-100 flex items-center justify-center">
                            <p className="text-gray-400 font-bold uppercase tracking-widest">Loading Map...</p>
                        </div>
                    )}
                    <button
                        onClick={() => setIsMapVisible(false)}
                        className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg border border-gray-100 text-gray-500 hover:text-rose-500 transition-all"
                    >
                        <X size={18} />
                    </button>
                    <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                        <button className="p-3 bg-white rounded-xl shadow-xl border border-gray-200 text-gray-800 hover:bg-gray-50 transition-all"><Plus size={18} /></button>
                        <button className="p-3 bg-white rounded-xl shadow-xl border border-gray-200 text-gray-800 hover:bg-gray-50 transition-all"><Minus size={18} /></button>
                    </div>
                </div>
            )}

            <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[32px] overflow-hidden shadow-sm">
                {/* Tabs & Filters */}
                <div className="px-8 py-6 border-b border-gray-100 dark:border-white/5 flex items-center justify-between bg-gray-50/50">
                    <div className="flex items-center gap-2 p-1 bg-gray-100 dark:bg-white/5 rounded-2xl w-fit">
                        {(['all', 'active', 'completed', 'cancelled'] as const).map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-8 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === tab
                                    ? 'bg-white dark:bg-white/10 text-gray-800 dark:text-white shadow-sm'
                                    : 'text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                {tab === 'all' ? 'All Trips' : tab}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600">
                            <Calendar size={16} />
                            Date Range
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600">
                            <Filter size={16} />
                            More Filters
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 dark:border-white/5">
                                <th className="px-8 py-5">Route</th>
                                <th className="px-8 py-5">Driver</th>
                                <th className="px-8 py-5">Rider</th>
                                <th className="px-8 py-5">Fare</th>
                                <th className="px-8 py-5">Date</th>
                                <th className="px-8 py-5 text-right pr-12">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                            {filteredRides.map((ride) => (
                                <tr key={ride.id} className="hover:bg-gray-50/30 dark:hover:bg-white/[0.01] transition-colors group">
                                    <td className="px-8 py-8 w-[350px]">
                                        <div className="flex items-start gap-4">
                                            <div className="flex flex-col items-center gap-1.5 mt-1">
                                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
                                                <div className="w-[1px] h-8 bg-gray-200 dark:bg-white/10" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.3)]" />
                                            </div>
                                            <div className="flex flex-col gap-4">
                                                <p className="text-sm font-bold text-gray-700 dark:text-white leading-none tracking-tight">{ride.pickupAddress.split(',')[0]}</p>
                                                <p className="text-sm font-bold text-gray-700 dark:text-white leading-none tracking-tight">{ride.destinationAddress.split(',')[0]}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-8">
                                        {ride.driver === 'Searching...' ? (
                                            <span className="text-sm italic font-medium text-gray-400">Unassigned</span>
                                        ) : (
                                            <span className="text-sm font-bold text-gray-700 dark:text-white">{ride.driver}</span>
                                        )}
                                    </td>
                                    <td className="px-8 py-8">
                                        <span className="text-sm font-bold text-gray-700 dark:text-white">{ride.passenger}</span>
                                    </td>
                                    <td className="px-8 py-8">
                                        <span className="text-sm font-black text-gray-800 dark:text-white">${ride.fare.toFixed(2)}</span>
                                    </td>
                                    <td className="px-8 py-8 whitespace-nowrap">
                                        <span className="text-xs font-bold text-gray-500 dark:text-gray-400">Feb 10, 8:30 AM</span>
                                    </td>
                                    <td className="px-8 py-8 text-right pr-12 whitespace-nowrap">
                                        <StatusBadge status={ride.status} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        completed: "bg-[#F0FDF4] text-[#16A34A] border-[#DCFCE7]",
        in_progress: "bg-[#EFF6FF] text-[#2563EB] border-[#DBEAFE]",
        pending: "bg-[#FFF7ED] text-[#EA580C] border-[#FFEDD5]",
        cancelled: "bg-[#FEF2F2] text-[#DC2626] border-[#FEE2E2]",
    };

    const label: Record<string, string> = {
        completed: "Completed",
        in_progress: "In Progress",
        pending: "Pending",
        cancelled: "Cancelled",
    };

    return (
        <span className={`inline-flex px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border whitespace-nowrap ${styles[status] || styles.pending}`}>
            {label[status] || status}
        </span>
    );
}

const MAP_STYLES = [
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#7c93a3" }, { "lightness": "-10" }]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [{ "color": "#fefefe" }, { "lightness": "20" }]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [{ "color": "#f5f5f5" }, { "lightness": "20" }]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{ "color": "#e9e9e9" }, { "lightness": "17" }]
    }
];

export default LiveNetwork;
