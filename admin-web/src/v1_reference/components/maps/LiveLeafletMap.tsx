import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useAdminStore } from '../../../stores/adminStore';

// Custom neon icon for pilots
const createPilotIcon = (heading: number) => {
    return L.divIcon({
        className: 'custom-pilot-icon',
        html: `
            <div style="transform: rotate(${heading}deg); width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; filter: drop-shadow(0 0 8px rgba(0, 255, 144, 0.6));">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="#00ff90" stroke="#ffffff" stroke-width="2" style="transform: rotate(45deg);">
                    <path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z" />
                </svg>
            </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
    });
};

export default function LiveLeafletMap() {
    const { drivers, initializeSocket } = useAdminStore();

    useEffect(() => {
        initializeSocket();
    }, [initializeSocket]);

    const activePilots = drivers.filter(d => d.onlineStatus === 'online');

    return (
        <MapContainer
            center={[51.5074, -0.1278]}
            zoom={13}
            style={{ height: '100%', width: '100%', background: '#1a1a1a' }}
            zoomControl={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            {activePilots.map((pilot) => (
                <Marker
                    key={pilot.id}
                    position={[pilot.location.lat, pilot.location.lng]}
                    icon={createPilotIcon(pilot.telemetry?.heading || 0)}
                >
                    <Popup className="custom-leaflet-popup">
                        <div className="p-1 min-w-[150px]">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-black text-gray-800 text-sm tracking-tight">{pilot.name}</h3>
                                <span className="text-[9px] font-bold bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">{pilot.id}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Telemetry</p>
                                    <p className="text-xs font-black text-primary">{Math.round(pilot.telemetry?.speed || 0)}<span className="text-[9px] ml-0.5">KM/H</span></p>
                                </div>
                                <div>
                                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Energy</p>
                                    <p className="text-xs font-black text-emerald-500">{pilot.telemetry?.battery || 0}<span className="text-[9px] ml-0.5">%</span></p>
                                </div>
                            </div>
                            <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between">
                                <span className="text-[9px] font-bold text-gray-500 uppercase">Heading</span>
                                <span className="text-[10px] font-black text-gray-700">{Math.round(pilot.telemetry?.heading || 0)}°</span>
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
