import { APIProvider } from '@vis.gl/react-google-maps';
import { type ReactNode } from 'react';

export function GoogleMapsProvider({ children }: { children: ReactNode }) {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";
    console.log('[GoogleMapsProvider] Initializing with key present:', !!apiKey);

    return (
        <APIProvider apiKey={apiKey} libraries={['places', 'geometry', 'drawing', 'marker']}>
            {children}
        </APIProvider>
    );
}
