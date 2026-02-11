import { useMapsLibrary } from '@vis.gl/react-google-maps';
import {
    Bike,
    Bus,
    Car,
    Footprints,
    Navigation,
    Trash2
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Destination {
    id: string;
    name: string;
    location: google.maps.LatLngLiteral;
    label: string;
    travelMode: google.maps.TravelMode;
    routeInfo?: {
        distance: string;
        duration: string;
    };
}

interface DestinationManagerProps {
    destinations: Destination[];
    onAdd: (dest: Omit<Destination, 'id' | 'label'>) => void;
    onRemove: (id: string) => void;
    onSelect: (id: string) => void;
    activeId: string | null;
}

export function DestinationManager({ destinations, onAdd, onRemove, onSelect, activeId }: DestinationManagerProps) {
    const placesLib = useMapsLibrary('places');
    const inputRef = useRef<HTMLInputElement>(null);
    const [travelMode, setTravelMode] = useState<google.maps.TravelMode>('DRIVING' as google.maps.TravelMode);

    useEffect(() => {
        if (!placesLib || !inputRef.current) return;

        const autocomplete = new placesLib.Autocomplete(inputRef.current, {
            fields: ['geometry', 'name', 'formatted_address'],
        });

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (place.geometry?.location) {
                onAdd({
                    name: place.name || place.formatted_address || 'Unknown Location',
                    location: {
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                    },
                    travelMode
                });
                inputRef.current!.value = '';
            }
        });
    }, [placesLib, onAdd, travelMode]);

    return (
        <div className="absolute top-6 left-6 w-[380px] flex flex-col gap-4 z-[1000]">
            {/* Search Card */}
            <div className="bg-white dark:bg-zinc-900 rounded-[28px] shadow-2xl border border-gray-100 dark:border-white/10 p-4 transition-all hover:shadow-brand-500/5">
                <div className="relative group">
                    <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-500 group-focus-within:scale-110 transition-transform" size={20} />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search for a destination..."
                        className="w-full pl-12 pr-4 py-4 bg-gray-50/50 dark:bg-white/5 border border-transparent focus:border-brand-500/20 rounded-2xl text-sm focus:outline-none transition-all font-uber font-bold text-gray-800 dark:text-white"
                    />
                </div>

                <div className="flex gap-1 mt-3 p-1 bg-gray-50 dark:bg-white/5 rounded-xl">
                    {[
                        { mode: 'DRIVING', icon: <Car size={16} /> },
                        { mode: 'TRANSIT', icon: <Bus size={16} /> },
                        { mode: 'BICYCLING', icon: <Bike size={16} /> },
                        { mode: 'WALKING', icon: <Footprints size={16} /> }
                    ].map((t) => (
                        <button
                            key={t.mode}
                            onClick={() => setTravelMode(t.mode as google.maps.TravelMode)}
                            className={`flex-1 flex items-center justify-center p-2.5 rounded-lg transition-all ${travelMode === t.mode
                                ? 'bg-white dark:bg-white/10 text-brand-500 shadow-sm ring-1 ring-black/5'
                                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                                }`}
                        >
                            {t.icon}
                        </button>
                    ))}
                </div>
            </div>

            {/* Destinations List */}
            <div className="flex flex-col gap-3 max-h-[calc(100vh-250px)] overflow-y-auto no-scrollbar pb-10">
                {destinations.map((dest) => (
                    <div
                        key={dest.id}
                        onClick={() => onSelect(dest.id)}
                        className={`p-4 rounded-[24px] border transition-all cursor-pointer group animate-in slide-in-from-left duration-300 ${activeId === dest.id
                            ? 'bg-white dark:bg-zinc-900 border-brand-500 shadow-xl'
                            : 'bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-transparent hover:border-brand-500/30 shadow-lg'
                            }`}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black shadow-lg transition-transform ${activeId === dest.id
                                    ? 'bg-brand-500 text-white scale-110'
                                    : 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-950'
                                    }`}>
                                    {dest.label}
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-sm font-uber-bold text-gray-900 dark:text-white truncate max-w-[180px]">{dest.name}</p>
                                    <div className="flex items-center gap-1.5 opacity-60">
                                        <TravelModeIcon mode={dest.travelMode} />
                                        <span className="text-[10px] font-bold uppercase tracking-wider">{dest.travelMode.toLowerCase()}</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRemove(dest.id);
                                }}
                                className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>

                        {dest.routeInfo && (
                            <div className={`mt-4 grid grid-cols-2 gap-2 p-3 rounded-2xl ${activeId === dest.id ? 'bg-brand-50 dark:bg-brand-500/10' : 'bg-gray-50/50 dark:bg-white/5'
                                }`}>
                                <div className="flex flex-col">
                                    <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Duration</span>
                                    <span className={`text-base font-black ${activeId === dest.id ? 'text-brand-600 dark:text-brand-400' : 'text-gray-900 dark:text-white'}`}>
                                        {dest.routeInfo.duration}
                                    </span>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Distance</span>
                                    <span className="text-xs font-bold text-gray-500">{dest.routeInfo.distance}</span>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

function TravelModeIcon({ mode }: { mode: google.maps.TravelMode }) {
    const m = String(mode).toUpperCase();
    switch (m) {
        case 'DRIVING': return <Car size={10} />;
        case 'TRANSIT': return <Bus size={10} />;
        case 'BICYCLING': return <Bike size={10} />;
        case 'WALKING': return <Footprints size={10} />;
        default: return null;
    }
}
