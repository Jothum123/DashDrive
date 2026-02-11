import type { Marker } from '@googlemaps/markerclusterer';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import {
    AdvancedMarker,
    Map,
    Pin,
    useMap,
    useMapsLibrary
} from '@vis.gl/react-google-maps';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useGoogleMaps } from '../../../hooks/useGoogleMaps';
import { useAdminStore, type Driver } from '../../../stores/adminStore';
import { Circle } from './Circle';

interface GeofenceMapProps {
    selectedGeofenceId: string | null;
    isDrawingMode: boolean;
    onGeofenceDrawn: (coordinates: [number, number][]) => void;
}

const defaultCenter = {
    lat: 51.5074,
    lng: -0.1278
};

export default function GeofenceMap({ selectedGeofenceId, isDrawingMode, onGeofenceDrawn }: GeofenceMapProps) {
    const { geofences, drivers } = useAdminStore();
    const { isLoaded } = useGoogleMaps();
    const map = useMap();
    const drawingLib = useMapsLibrary('drawing');
    const drawingManagerRef = useRef<google.maps.drawing.DrawingManager | null>(null);
    const [highlightedDriverId, setHighlightedDriverId] = useState<string | null>(null);

    // Initialize Drawing Manager
    useEffect(() => {
        if (!map || !drawingLib) return;

        const drawingManager = new drawingLib.DrawingManager({
            drawingMode: null,
            drawingControl: false,
            polygonOptions: {
                fillColor: '#1E79FF',
                fillOpacity: 0.3,
                strokeWeight: 2,
                strokeColor: '#1E79FF',
                clickable: true,
                editable: true,
                zIndex: 1
            }
        });

        drawingManager.setMap(map);
        drawingManagerRef.current = drawingManager;

        const listener = google.maps.event.addListener(drawingManager, 'overlaycomplete', (event: google.maps.drawing.OverlayCompleteEvent) => {
            if (event.type === google.maps.drawing.OverlayType.POLYGON && event.overlay instanceof google.maps.Polygon) {
                const polygon = event.overlay;
                const path = polygon.getPath();
                const coords: [number, number][] = [];
                for (let i = 0; i < path.getLength(); i++) {
                    const latLng = path.getAt(i);
                    coords.push([latLng.lat(), latLng.lng()]);
                }
                polygon.setMap(null);
                onGeofenceDrawn(coords);
                drawingManager.setDrawingMode(null);
            }
        });

        return () => {
            google.maps.event.removeListener(listener);
            drawingManager.setMap(null);
        };
    }, [map, drawingLib, onGeofenceDrawn]);

    useEffect(() => {
        if (drawingManagerRef.current) {
            drawingManagerRef.current.setDrawingMode(
                isDrawingMode ? google.maps.drawing.OverlayType.POLYGON : null
            );
        }
    }, [isDrawingMode]);

    if (!isLoaded) {
        return (
            <div className="w-full h-full bg-zinc-950 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const highlightedDriver = drivers.find(d => d.id === highlightedDriverId);

    return (
        <Map
            defaultCenter={defaultCenter}
            defaultZoom={12}
            mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID || "330dd4d2eb9c8b5578df2d93"}
            disableDefaultUI={true}
            style={{ width: '100%', height: '100%' }}
        >
            {/* Polygons for Geofences */}
            {geofences.map((gf) => (
                <PolygonOverlay
                    key={gf.id}
                    paths={gf.coordinates.map(([lat, lng]) => ({ lat, lng }))}
                    options={{
                        fillColor: gf.color || (gf.type === 'restricted' ? '#EF4444' : gf.type === 'surge' ? '#F59E0B' : '#10B981'),
                        fillOpacity: selectedGeofenceId === gf.id ? 0.3 : 0.1,
                        strokeColor: gf.color || (gf.type === 'restricted' ? '#EF4444' : gf.type === 'surge' ? '#F59E0B' : '#10B981'),
                        strokeWeight: selectedGeofenceId === gf.id ? 2 : 1,
                    }}
                />
            ))}

            {/* Selected Driver Radius */}
            {highlightedDriver && (
                <Circle
                    radius={800}
                    center={highlightedDriver.location}
                    strokeColor={'#3b82f6'}
                    strokeOpacity={0.8}
                    strokeWeight={2}
                    fillColor={'#3b82f6'}
                    fillOpacity={0.1}
                    clickable={false}
                />
            )}

            {/* Driver Markers */}
            <DriverMarkers
                drivers={drivers}
                onDriverClick={(id) => setHighlightedDriverId(id)}
            />
        </Map>
    );
}

function PolygonOverlay({ paths, options }: { paths: google.maps.LatLngLiteral[], options: google.maps.PolygonOptions }) {
    const map = useMap();
    const polygonRef = useRef<google.maps.Polygon | null>(null);

    useEffect(() => {
        if (!map) return;
        if (!polygonRef.current) {
            polygonRef.current = new google.maps.Polygon();
        }
        polygonRef.current.setMap(map);
        polygonRef.current.setOptions({ ...options, paths });

        return () => {
            if (polygonRef.current) polygonRef.current.setMap(null);
        };
    }, [map, paths, options]);

    return null;
}

const DriverMarkers = ({ drivers, onDriverClick }: { drivers: Driver[], onDriverClick: (id: string) => void }) => {
    const map = useMap();
    const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
    const clusterer = useRef<MarkerClusterer | null>(null);

    useEffect(() => {
        if (!map) return;
        if (!clusterer.current) {
            clusterer.current = new MarkerClusterer({ map });
        }
    }, [map]);

    useEffect(() => {
        if (!clusterer.current) return;
        clusterer.current.clearMarkers();
        clusterer.current.addMarkers(Object.values(markers));
    }, [markers]);

    // Stable callback factory to avoid infinite loop
    const setMarkerRef = useCallback((marker: Marker | null, key: string) => {
        setMarkers(prev => {
            if (marker) {
                if (prev[key] === marker) return prev;
                return { ...prev, [key]: marker };
            } else {
                if (!prev[key]) return prev;
                const newMarkers = { ...prev };
                delete newMarkers[key];
                return newMarkers;
            }
        });
    }, []);

    return (
        <>
            {drivers.map(driver => (
                <DriverMarkerItem
                    key={driver.id}
                    driver={driver}
                    onDriverClick={onDriverClick}
                    setMarkerRef={setMarkerRef}
                />
            ))}
        </>
    );
};

const DriverMarkerItem = ({ driver, onDriverClick, setMarkerRef }: {
    driver: Driver,
    onDriverClick: (id: string) => void,
    setMarkerRef: (marker: Marker | null, key: string) => void
}) => {
    const map = useMap();

    // Stable ref per marker
    const ref = useCallback((marker: Marker | null) => {
        setMarkerRef(marker, driver.id);
    }, [driver.id, setMarkerRef]);

    return (
        <AdvancedMarker
            position={driver.location}
            ref={ref}
            clickable={true}
            onClick={() => {
                if (map) map.panTo(driver.location);
                onDriverClick(driver.id);
            }}
        >
            <Pin
                background={driver.onlineStatus === 'online' ? '#10B981' : '#52525b'}
                borderColor={'#ffffff'}
                glyphColor={'#ffffff'}
            />
        </AdvancedMarker>
    );
};
