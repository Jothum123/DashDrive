import { useState } from 'react';
import { DestinationManager } from '../components/dispatch/DestinationManager';
import { DispatchMap } from '../components/maps/DispatchMap';

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

const defaultOrigin = {
    lat: 51.5074,
    lng: -0.1278
};

export function DispatchPlanner() {
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);

    const handleAddDestination = (dest: Omit<Destination, 'id' | 'label'>) => {
        const nextLabel = String.fromCharCode(65 + (destinations.length % 26));
        const newDest: Destination = {
            ...dest,
            id: Math.random().toString(36).substr(2, 9),
            label: nextLabel
        };
        setDestinations(prev => [...prev, newDest]);
        setActiveId(newDest.id);
    };

    const handleRemoveDestination = (id: string) => {
        setDestinations(prev => prev.filter(d => d.id !== id));
        if (activeId === id) setActiveId(null);
    };

    const handleRouteInfoUpdate = (id: string, info: { distance: string; duration: string }) => {
        setDestinations(prev => prev.map(d =>
            d.id === id ? { ...d, routeInfo: info } : d
        ));
    };

    return (
        <div className="relative w-full h-screen bg-[#F8F9FA] dark:bg-zinc-950 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <DispatchMap
                    origin={defaultOrigin}
                    destinations={destinations}
                    activeId={activeId}
                    onRouteInfoUpdate={handleRouteInfoUpdate}
                />
            </div>

            <DestinationManager
                destinations={destinations}
                onAdd={handleAddDestination}
                onRemove={handleRemoveDestination}
                onSelect={(id) => setActiveId(id)}
                activeId={activeId}
            />
        </div>
    );
}

export default DispatchPlanner;
