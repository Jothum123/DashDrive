import { useJsApiLoader } from '@react-google-maps/api';
import { createContext, useContext, type ReactNode } from 'react';

const GoogleMapsContext = createContext<{ isLoaded: boolean }>({ isLoaded: false });

export const useGoogleMaps = () => useContext(GoogleMapsContext);

const LIBRARIES: ("places" | "drawing" | "geometry" | "visualization")[] = ["places", "geometry"];

export function GoogleMapsProvider({ children }: { children: ReactNode }) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
        libraries: LIBRARIES,
    });

    return (
        <GoogleMapsContext.Provider value={{ isLoaded }}>
            {children}
        </GoogleMapsContext.Provider>
    );
}
