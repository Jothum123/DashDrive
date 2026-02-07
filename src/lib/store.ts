import { useEffect, useState } from 'react';

interface SavedPlace {
    id: string;
    title: string;
    address: string;
    icon: string;
}

interface SavedPlacesState {
    home: SavedPlace | null;
    work: SavedPlace | null;
    custom: SavedPlace[];
}

let state: SavedPlacesState = {
    home: null,
    work: null,
    custom: [],
};

const listeners = new Set<() => void>();

const setState = (newState: Partial<SavedPlacesState>) => {
    state = { ...state, ...newState };
    listeners.forEach((l) => l());
};

export const useSavedPlacesStore = () => {
    const [currState, setCurrState] = useState(state);

    useEffect(() => {
        let isMounted = true;
        const listener = () => {
            if (isMounted) setCurrState(state);
        };
        listeners.add(listener);
        return () => {
            isMounted = false;
            listeners.delete(listener);
        };
    }, []);

    return {
        ...currState,
        setHome: (address: string, title?: string) => setState({ home: { id: 'home', title: title || 'Home', address, icon: 'home-outline' } }),
        setWork: (address: string, title?: string) => setState({ work: { id: 'work', title: title || 'Work', address, icon: 'briefcase-outline' } }),
        addCustom: (title: string, address: string) => setState({
            custom: [...state.custom, { id: Math.random().toString(), title, address, icon: 'location-outline' }]
        }),
        updateCustom: (id: string, title: string, address: string) => setState({
            custom: state.custom.map(p => p.id === id ? { ...p, title, address } : p)
        }),
        removeHome: () => setState({ home: null }),
        removeWork: () => setState({ work: null }),
        removeCustom: (id: string) => setState({
            custom: state.custom.filter(p => p.id !== id)
        }),
    };
};
