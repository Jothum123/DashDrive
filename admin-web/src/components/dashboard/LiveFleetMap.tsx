import { GoogleMap, Marker } from '@react-google-maps/api';
import { useAdminStore } from '../../stores/adminStore';
import { useGoogleMaps } from '../maps/GoogleMapsProvider';

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
            <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={{ lat: 51.5074, lng: -0.1278 }}
                zoom={11}
                options={{
                    mapTypeId: 'satellite',
                    styles: SATELLITE_STYLES,
                    disableDefaultUI: true,
                    zoomControl: false,
                    gestureHandling: 'none', // Static-like map for dashboard
                }}
            >
                {drivers.map(driver => (
                    <Marker
                        key={driver.id}
                        position={driver.location}
                        icon={{
                            path: "M 0,-10 L 8,10 L 0,6 L -8,10 Z",
                            fillColor: driver.onlineStatus === 'online' ? "#00ff90" : "#71717a",
                            fillOpacity: 1,
                            strokeWeight: 1,
                            strokeColor: "#000",
                            scale: 0.8,
                            rotation: driver.telemetry?.heading || 0,
                        }}
                    />
                ))}
            </GoogleMap>
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
