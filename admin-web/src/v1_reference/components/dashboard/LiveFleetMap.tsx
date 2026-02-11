import { AdvancedMarker, Map } from '@vis.gl/react-google-maps';
import { useGoogleMaps } from '../../../hooks/useGoogleMaps';
import { useAdminStore } from '../../../stores/adminStore';

const SATELLITE_STYLES = [
    {
        featureType: "all",
        elementType: "labels",
        stylers: [{ visibility: "off" }]
    }
];

export function LiveFleetMap() {
    const { isLoaded } = useGoogleMaps();
    const { drivers } = useAdminStore();

    if (!isLoaded) {
        return (
            <div className="w-full h-full bg-zinc-900 animate-pulse rounded-[32px] flex items-center justify-center">
                <span className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Initializing Radar...</span>
            </div>
        );
    }

    return (
        <div className="w-full h-full rounded-[32px] overflow-hidden border border-white/5 shadow-2xl relative">
            <Map
                defaultCenter={{ lat: 51.5074, lng: -0.1278 }}
                defaultZoom={11}
                mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID || "330dd4d2eb9c8b5578df2d93"}
                disableDefaultUI={true}
                gestureHandling={'none'}
                styles={SATELLITE_STYLES as google.maps.MapTypeStyle[]}
                mapTypeId={'satellite'}
                style={{ width: '100%', height: '100%' }}
            >
                {drivers.map(driver => (
                    <DriverMarker key={driver.id} driver={driver} />
                ))}
            </Map>
            <div className="absolute top-6 left-6 z-10">
                <div className="px-3 py-1.5 bg-black/80 backdrop-blur-md border border-white/10 rounded-full flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_8px_#00ff90]" />
                    <span className="text-[9px] font-black uppercase text-white tracking-widest">Live Fleet: {drivers.filter(d => d.onlineStatus === 'online').length}</span>
                </div>
            </div>

            <div className="absolute inset-0 pointer-events-none border-[12px] border-black/5" />
        </div>
    );
}

function DriverMarker({ driver }: { driver: any }) {
    return (
        <AdvancedMarker
            position={driver.location}
        >
            <div
                style={{
                    transform: `rotate(${driver.telemetry?.heading || 0}deg)`,
                    transition: 'transform 0.3s ease-in-out'
                }}
            >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 0L18 18L10 14.4L2 18L10 0Z"
                        fill={driver.onlineStatus === 'online' ? "#00ff90" : "#71717a"}
                        stroke="black"
                        strokeWidth="1"
                    />
                </svg>
            </div>
        </AdvancedMarker>
    );
}
