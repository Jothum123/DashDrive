import {
    AdvancedMarker,
    Map,
    Pin,
    useMap,
    useMapsLibrary
} from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

interface DispatchMapProps {
    origin: google.maps.LatLngLiteral;
    destinations: Array<{
        id: string;
        location: google.maps.LatLngLiteral;
        label: string;
        travelMode: google.maps.TravelMode;
    }>;
    activeId: string | null;
    onRouteInfoUpdate?: (id: string, info: { distance: string; duration: string }) => void;
}

export function DispatchMap({ origin, destinations, activeId, onRouteInfoUpdate }: DispatchMapProps) {
    return (
        <Map
            defaultCenter={origin}
            defaultZoom={12}
            mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID || "330dd4d2eb9c8b5578df2d93"}
            disableDefaultUI={true}
            style={{ width: '100%', height: '100%' }}
        >
            <AdvancedMarker position={origin}>
                <Pin background={'#000'} borderColor={'#fff'} glyphColor={'#fff'} />
            </AdvancedMarker>

            {destinations.map((dest) => (
                <AdvancedMarker key={dest.id} position={dest.location}>
                    <Pin
                        background={activeId === dest.id ? '#10B981' : '#71717a'}
                        borderColor={'#fff'}
                        glyphColor={'#fff'}
                        glyph={dest.label}
                    />
                </AdvancedMarker>
            ))}

            <DirectionsRenderer
                origin={origin}
                destinations={destinations}
                activeId={activeId}
                onRouteInfoUpdate={onRouteInfoUpdate}
            />
        </Map>
    );
}

function DirectionsRenderer({ origin, destinations, activeId, onRouteInfoUpdate }: DispatchMapProps) {
    const map = useMap();
    const routesLib = useMapsLibrary('routes');
    const [renderers, setRenderers] = useState<Record<string, google.maps.DirectionsRenderer>>({});

    useEffect(() => {
        if (!routesLib || !map) return;

        // Cleanup old renderers
        Object.values(renderers).forEach((r: google.maps.DirectionsRenderer) => r.setMap(null));
        const newRenderers: Record<string, google.maps.DirectionsRenderer> = {};
        const service = new google.maps.DirectionsService();

        destinations.forEach((dest) => {
            const renderer = new google.maps.DirectionsRenderer({
                map,
                suppressMarkers: true,
                preserveViewport: true,
                polylineOptions: {
                    strokeColor: activeId === dest.id ? '#10B981' : '#D4D4D8',
                    strokeWeight: activeId === dest.id ? 5 : 3,
                    strokeOpacity: activeId === dest.id ? 0.8 : 0.4,
                    zIndex: activeId === dest.id ? 100 : 1
                }
            });

            service.route({
                origin,
                destination: dest.location,
                travelMode: dest.travelMode,
            }, (result, status) => {
                if (status === 'OK' && result) {
                    renderer.setDirections(result);
                    const leg = result.routes[0].legs[0];
                    if (onRouteInfoUpdate && leg.distance && leg.duration) {
                        onRouteInfoUpdate(dest.id, {
                            distance: leg.distance.text,
                            duration: leg.duration.text
                        });
                    }
                }
            });

            newRenderers[dest.id] = renderer;
        });

        setRenderers(newRenderers);

        return () => {
            Object.values(newRenderers).forEach((r: google.maps.DirectionsRenderer) => r.setMap(null));
        };
    }, [map, routesLib, origin, destinations, activeId]);

    // Fit bounds when active route changes
    useEffect(() => {
        if (!map || !activeId || !renderers[activeId]) return;
        const renderer = renderers[activeId];
        const directions = renderer.getDirections();
        if (directions) {
            map.fitBounds(directions.routes[0].bounds);
        }
    }, [map, activeId, renderers]);

    return null;
}
