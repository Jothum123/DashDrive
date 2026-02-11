import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { io } from 'socket.io-client';
import { create } from 'zustand';
import { supabase } from '../lib/supabase';

const socket = io('http://localhost:3001');


// Existing Types
export interface ActiveTrip {
    origin: { code: string; city: string };
    destination: { code: string; city: string };
    progress: number;
    eta: string;
    distance: string;
    startTime: string;
    aircraftType?: string; // Re-mapping some flight terms for flavor
    registration?: string;
}

export interface Driver {
    id: string;
    name: string;
    email: string;
    status: 'active' | 'pending' | 'suspended' | 'rejected';
    rating: number;
    totalTrips: number;
    totalEarnings: number;
    carModel: string;
    carType: string;
    licensePlate: string;
    joinedAt: string;
    city: string;
    onlineStatus: 'online' | 'offline';
    location: { lat: number; lng: number };
    telemetry?: {
        speed: number;
        battery: number;
        heading: number;
        altitude?: number;
    };
    activeTrip?: ActiveTrip;
    documents: { type: string; status: 'verified' | 'pending' | 'rejected'; url: string }[];
    serviceType: 'Standard' | 'Comfort' | 'Executive' | 'XL';
}

export interface Passenger {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: 'active' | 'suspended' | 'banned';
    totalTrips: number;
    totalSpent: number;
    rating: number;
    joinedAt: string;
}

// New Types for Reconstruction
export interface Negotiation {
    id: string;
    city: string;
    riderProposedFare: number;
    avgDriverCounter: number;
    matchPrice: number | null;
    timeToMatch: string;
    status: 'negotiating' | 'matched' | 'expired';
    passengerName: string;
    driverName: string | null;
    timestamp: string;
}

export interface LiveEvent {
    id: string;
    type: 'ride_completed' | 'driver_online' | 'surge_alert' | 'request_pending' | 'ride_started' | 'ride_cancelled';
    title: string;
    description: string;
    amount?: number;
    timestamp: string;
    priority: 'low' | 'medium' | 'high';
}

export interface Strategy {
    activeCity: string;
    bidSensitivity: 'Low' | 'Medium' | 'High';
    priceFloor: number;
    fareMultiplier: number;
    autoAdjustFloor: boolean;
    smartCounterBids: boolean;
}

export interface RequiredDocument {
    id: string;
    name: string;
    description: string;
    isRequired: boolean;
    category: 'identity' | 'vehicle' | 'license' | 'other';
}

export interface RideRecord {
    id: string;
    passenger: string;
    passengerPhone?: string;
    driver: string | 'Searching...';
    pickupAddress: string;
    destinationAddress: string;
    fare: number;
    vehicleType: string;
    status: 'completed' | 'in_progress' | 'cancelled' | 'scheduled';
    timestamp: string;
    commissionAdmin: number;
    commissionDriver: number;
    paymentType: 'Cash' | 'Wallet' | 'Card';
    scheduledTime?: string;
    cancellationReason?: string;
    canceledBy?: 'user' | 'driver' | 'system';
}

export interface Transaction {
    id: string;
    type: 'ride' | 'payout' | 'refund' | 'promo';
    amount: number;
    status: 'completed' | 'pending' | 'failed';
    description: string;
    createdAt: string;
}

export interface SafetyIncident {
    id: string;
    type: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    status: 'open' | 'investigating' | 'resolved' | 'dismissed';
    description: string;
    passengerName: string;
    driverName: string;
    date: string;
}

export interface VehicleService {
    id: string;
    type: string;
    costPerKm: number;
    icon: string;
    status: 'active' | 'inactive';
    eligibleVehicles: string[];
    minYear: number;
}

export interface PromoCode {
    id: string;
    code: string;
    discount: number;
    type: 'percentage' | 'fixed';
    maxUses: number;
    usedCount: number;
    expiryDate: string;
    active: boolean;
}

export interface LiveLogEvent {
    id: string;
    type: 'entry' | 'exit' | 'violation';
    geofenceId: string;
    geofenceName: string;
    driverId: string;
    driverName: string;
    timestamp: string;
}

export interface RideReview {
    id: string;
    rideId: string;
    userName: string;
    driverName: string;
    rating: number;
    comment: string;
    target: 'driver' | 'user';
    createdAt: string;
}

export interface VenuePoint {
    id: string;
    name: string;
    type: 'pickup' | 'dropoff';
    location: { lat: number; lng: number };
}

export interface Geofence {
    id: string;
    name: string;
    type: 'restricted' | 'surge' | 'preferred' | 'standard';
    coordinates: [number, number][]; // Array of lat, lng pairs
    active: boolean;
    createdAt: string;
    color?: string;
    dispatchRule?: 'FIFO' | 'Nearest' | 'Balanced';
    venuePoints?: VenuePoint[];
}

// Mock Data
const mockNegotiations: Negotiation[] = [
    {
        id: 'R-88210',
        city: 'London',
        riderProposedFare: 12.50,
        avgDriverCounter: 14.80,
        matchPrice: 13.50,
        timeToMatch: '42s',
        status: 'matched',
        passengerName: 'Alice Cooper',
        driverName: 'John Smith',
        timestamp: new Date().toISOString(),
    },
    {
        id: 'R-88211',
        city: 'Manchester',
        riderProposedFare: 8.00,
        avgDriverCounter: 10.50,
        matchPrice: null,
        timeToMatch: '18s',
        status: 'negotiating',
        passengerName: 'Bob Williams',
        driverName: null,
        timestamp: new Date().toISOString(),
    }
];

const mockVehicleServices: VehicleService[] = [
    { id: 'v-001', type: 'Standard', costPerKm: 1.20, icon: 'Car', status: 'active', eligibleVehicles: ['Toyota Camry', 'Honda Accord', 'Ford Fusion'], minYear: 2015 },
    { id: 'v-002', type: 'Luxury Executive', costPerKm: 2.50, icon: 'Award', status: 'active', eligibleVehicles: ['Mercedes E-Class', 'BMW 5 Series', 'Audi A6'], minYear: 2018 },
    { id: 'v-003', type: 'Electric High Performance', costPerKm: 1.80, icon: 'Zap', status: 'active', eligibleVehicles: ['Tesla Model 3', 'Tesla Model S', 'Lucid Air'], minYear: 2019 },
    { id: 'v-004', type: 'Large SUV', costPerKm: 2.10, icon: 'Users', status: 'active', eligibleVehicles: ['Chevrolet Suburban', 'Ford Expedition', 'Cadillac Escalade'], minYear: 2017 },
];

const mockLiveEvents: LiveEvent[] = [
    {
        id: 'evt-001',
        type: 'ride_completed',
        title: 'Ride #2847 Completed',
        description: 'Successfully reached destination in Soho.',
        amount: 24.50,
        timestamp: '2 mins ago',
        priority: 'low',
    },
    {
        id: 'evt-002',
        type: 'surge_alert',
        title: 'High Demand: Mission District',
        description: '+1.5x Surge pricing activated.',
        timestamp: 'Active Now',
        priority: 'high',
    }
];

const mockRecentRides: RideRecord[] = [
    {
        id: 'R-9021',
        passenger: 'Sarah J.',
        driver: 'Marcus T.',
        pickupAddress: '24 Baker St, London',
        destinationAddress: 'Heathrow Terminal 2',
        fare: 45.50,
        vehicleType: 'Electric High Performance',
        status: 'completed',
        timestamp: '14:20',
        commissionAdmin: 6.82,
        commissionDriver: 38.68,
        paymentType: 'Card'
    },
    {
        id: 'R-9022',
        passenger: 'Elena R.',
        driver: 'David W.',
        pickupAddress: 'Soho Square, London',
        destinationAddress: '10 Downing St',
        fare: 18.20,
        vehicleType: 'Luxury Executive',
        status: 'in_progress',
        timestamp: '14:25',
        commissionAdmin: 2.73,
        commissionDriver: 15.47,
        paymentType: 'Wallet'
    },
    {
        id: 'R-9023',
        passenger: 'James B.',
        driver: 'Sarah L.',
        pickupAddress: 'Canary Wharf',
        destinationAddress: 'London Bridge',
        fare: 22.00,
        vehicleType: 'Hybrid Standard',
        status: 'completed',
        timestamp: '14:10',
        commissionAdmin: 3.30,
        commissionDriver: 18.70,
        paymentType: 'Cash'
    },
    {
        id: 'R-9024',
        passenger: 'Linda K.',
        driver: 'Robert M.',
        pickupAddress: 'King\'s Cross Station',
        destinationAddress: 'Camden Town',
        fare: 12.50,
        vehicleType: 'Standard',
        status: 'cancelled',
        timestamp: '14:05',
        commissionAdmin: 1.88,
        commissionDriver: 10.62,
        paymentType: 'Card',
        cancellationReason: 'Found another transport option',
        canceledBy: 'user'
    },
    {
        id: 'R-9025',
        passenger: 'Mark V.',
        driver: 'Searching...',
        pickupAddress: 'Liverpool St Station',
        destinationAddress: 'Stansted Airport',
        fare: 65.00,
        vehicleType: 'Luxury Executive',
        status: 'scheduled',
        timestamp: 'Tomorrow',
        scheduledTime: '2024-02-10 08:30',
        commissionAdmin: 9.75,
        commissionDriver: 55.25,
        paymentType: 'Card'
    },
    {
        id: 'R-9026',
        passenger: 'Sophia L.',
        driver: 'Kevin D.',
        pickupAddress: 'Notting Hill',
        destinationAddress: 'Victoria Station',
        fare: 15.80,
        vehicleType: 'Standard',
        status: 'cancelled',
        timestamp: '13:45',
        commissionAdmin: 2.37,
        commissionDriver: 13.43,
        paymentType: 'Wallet',
        cancellationReason: 'Vehicle too small for luggage',
        canceledBy: 'driver'
    }
];

const mockReviews: RideReview[] = [
    { id: 'rev-001', rideId: 'R-9021', userName: 'Sarah J.', driverName: 'Marcus T.', rating: 5, comment: 'Excellent driver, very polite and the car was spotless!', target: 'driver', createdAt: '2024-02-09 14:30' },
    { id: 'rev-002', rideId: 'R-9021', userName: 'Sarah J.', driverName: 'Marcus T.', rating: 5, comment: 'Great passenger, prompt and friendly.', target: 'user', createdAt: '2024-02-09 14:35' },
    { id: 'rev-003', rideId: 'R-9023', userName: 'James B.', driverName: 'Sarah L.', rating: 4, comment: 'Good ride, but a bit of traffic.', target: 'driver', createdAt: '2024-02-09 14:15' },
    { id: 'rev-004', rideId: 'R-9026', userName: 'Sophia L.', driverName: 'Kevin D.', rating: 2, comment: 'Driver cancelled because of my luggage, very frustrating.', target: 'driver', createdAt: '2024-02-09 13:50' },
];

const mockStrategy: Strategy = {
    activeCity: 'London',
    bidSensitivity: 'High',
    priceFloor: 3.50,
    fareMultiplier: 1.2,
    autoAdjustFloor: true,
    smartCounterBids: false,
};

interface AdminState {
    drivers: Driver[];
    passengers: Passenger[];
    transactions: Transaction[];
    incidents: SafetyIncident[];
    promoCodes: PromoCode[];
    negotiations: Negotiation[];
    liveEvents: LiveEvent[];
    recentRides: RideRecord[];
    vehicleServices: VehicleService[];
    strategy: Strategy;
    reviews: RideReview[];
    geofences: Geofence[];
    liveLog: LiveLogEvent[];
    showH3Grid: boolean;
    h3Density: number;
    requiredDocuments: RequiredDocument[];

    getStats: () => {
        totalDrivers: number;
        activeDrivers: number;
        pendingDrivers: number;
        totalPassengers: number;
        activePassengers: number;
        totalRevenue: number;
        totalPayouts: number;
        openIncidents: number;
        bidSuccessRate: number;
        avgCounterMargin: number;
        vehicleDistribution: {
            electric: number;
            luxury: number;
            standard: number;
        };
    };

    updateDriverStatus: (id: string, status: Driver['status']) => void;
    updatePassengerStatus: (id: string, status: Passenger['status']) => void;
    addPassenger: (passenger: Omit<Passenger, 'id' | 'joinedAt' | 'totalTrips' | 'totalSpent' | 'rating' | 'status'>) => void;
    updatePassenger: (id: string, updates: Partial<Passenger>) => void;
    removePassenger: (id: string) => void;
    updateIncidentStatus: (id: string, status: SafetyIncident['status']) => void;
    updateStrategy: (strategy: Partial<Strategy>) => void;
    togglePromoCode: (id: string) => void;
    addPromoCode: (promo: PromoCode) => void;
    createManualBooking: (booking: Omit<RideRecord, 'id' | 'timestamp' | 'status' | 'commissionAdmin' | 'commissionDriver' | 'paymentType'> & { commissionAdmin?: number; commissionDriver?: number; paymentType?: 'Cash' | 'Wallet' | 'Card' }) => void;

    addVehicleService: (service: Omit<VehicleService, 'id'>) => void;
    updateVehicleService: (id: string, updates: Partial<VehicleService>) => void;
    removeVehicleService: (id: string) => void;
    deleteReview: (id: string) => void;
    simulateMovement: () => void;
    initializeSocket: () => void;
    initializeSupabase: () => () => void;
    addIncident: (incident: Omit<SafetyIncident, 'id' | 'date'>) => void;
    resolveIncident: (id: string) => void;
    // Geofencing Actions
    addGeofence: (geofence: Omit<Geofence, 'id' | 'createdAt'>) => void;
    updateGeofence: (id: string, updates: Partial<Geofence>) => void;
    deleteGeofence: (id: string) => void;
    toggleGeofence: (id: string) => void;
    toggleH3Grid: () => void;
    setH3Density: (density: number) => void;
    addVenuePoint: (geofenceId: string, point: Omit<VenuePoint, 'id'>) => void;
    addRequiredDocument: (doc: Omit<RequiredDocument, 'id'>) => void;
    updateRequiredDocument: (doc: RequiredDocument) => void;
    deleteRequiredDocument: (id: string) => void;
}

export const useAdminStore = create<AdminState>((set, get) => ({
    drivers: [],
    passengers: [],
    transactions: [],
    incidents: [],
    promoCodes: [],
    negotiations: mockNegotiations,
    liveEvents: mockLiveEvents,
    recentRides: mockRecentRides,
    vehicleServices: mockVehicleServices,
    strategy: mockStrategy,
    reviews: mockReviews,
    geofences: [],
    showH3Grid: false,
    h3Density: 0.15,
    requiredDocuments: [
        { id: 'rd1', name: 'Driving License', description: 'Valid front and back copy of national driving license', isRequired: true, category: 'license' },
        { id: 'rd2', name: 'Vehicle Insurance', description: 'Current insurance certificate for the registered vehicle', isRequired: true, category: 'vehicle' },
        { id: 'rd3', name: 'National ID Proof', description: 'Government issued ID card or Passport', isRequired: true, category: 'identity' },
        { id: 'rd4', name: 'Vehicle Registration', description: 'V5C or equivalent vehicle registration document', isRequired: true, category: 'vehicle' },
        { id: 'rd5', name: 'Background Check', description: 'Enhanced criminal record check certificate', isRequired: false, category: 'other' },
    ],
    liveLog: [],

    // Initial population (keep existing mocks for continuity)
    ...({
        drivers: [
            {
                id: 'PILOT-342', // Changing ID style to match flight numbers
                name: 'John Smith',
                email: 'john.smith@dashdrive.com',
                status: 'active',
                rating: 4.85,
                totalTrips: 1247,
                totalEarnings: 15680.50,
                carModel: 'Tesla Model 3',
                carType: 'Electric High Performance',
                licensePlate: 'EV72 ZAP',
                joinedAt: '2023-06-15',
                city: 'London',
                onlineStatus: 'online',
                location: { lat: 51.5074, lng: -0.1278 },
                telemetry: { speed: 42, battery: 85, heading: 180, altitude: 12 },
                activeTrip: {
                    origin: { code: 'LHR', city: 'London' },
                    destination: { code: 'MAN', city: 'Manchester' },
                    progress: 65,
                    eta: '18:45',
                    distance: '182 mi',
                    startTime: '16:20',
                    aircraftType: 'Tesla / Long Range',
                    registration: 'D-AISP'
                },
                documents: [
                    { type: 'Driving License', status: 'verified', url: '#' },
                    { type: 'Vehicle Insurance', status: 'verified', url: '#' }
                ],
                serviceType: 'Comfort'
            },
            {
                id: 'PILOT-882',
                name: 'Sarah Johnson',
                email: 'sarah.j@dashdrive.com',
                status: 'active',
                rating: 4.98,
                totalTrips: 2156,
                totalEarnings: 28450.75,
                carModel: 'Mercedes-Benz EQE',
                carType: 'Luxury Executive',
                licensePlate: 'MQ23 LUX',
                joinedAt: '2022-11-20',
                city: 'London',
                onlineStatus: 'online',
                location: { lat: 51.5154, lng: -0.1410 },
                telemetry: { speed: 12, battery: 92, heading: 45, altitude: 8 },
                activeTrip: {
                    origin: { code: 'SOH', city: 'Soho' },
                    destination: { code: 'CW', city: 'Canary Wharf' },
                    progress: 12,
                    eta: '18:15',
                    distance: '8 mi',
                    startTime: '17:55',
                    aircraftType: 'Merc / Executive',
                    registration: 'G-LUX1'
                },
                documents: [
                    { type: 'Driving License', status: 'verified', url: '#' },
                    { type: 'Insurance', status: 'verified', url: '#' }
                ],
                serviceType: 'Executive'
            },
            {
                id: 'drv-003',
                name: 'Marcus Thorne',
                email: 'm.thorne@dashdrive.com',
                status: 'pending',
                rating: 0,
                totalTrips: 0,
                totalEarnings: 0,
                carModel: 'Toyota Prius',
                carType: 'Hybrid Standard',
                licensePlate: 'PX24 VET',
                joinedAt: '2024-02-01',
                city: 'Manchester',
                onlineStatus: 'offline',
                location: { lat: 53.4808, lng: -2.2426 },
                documents: [
                    { type: 'Driving License', status: 'pending', url: '#' },
                    { type: 'Public Hire Permit', status: 'pending', url: '#' }
                ],
                serviceType: 'Standard'
            }
        ],
        passengers: [
            {
                id: 'pax-001',
                name: 'Alice Cooper',
                email: 'alice.c@gmail.com',
                phone: '+44 7800 100001',
                status: 'active',
                totalTrips: 156,
                totalSpent: 2340.50,
                rating: 4.9,
                joinedAt: '2023-01-15',
            }
        ],
        incidents: [
            {
                id: 'INC-001',
                type: 'Security_Breach',
                priority: 'critical',
                status: 'open',
                description: 'Multiple unsuccessful login attempts from unauthorized IP range detected for driver account.',
                passengerName: 'System Monitor',
                driverName: 'John Smith',
                date: new Date().toISOString(),
            }
        ],
        transactions: [
            {
                id: 'TXN-990-XZ',
                type: 'ride',
                amount: 24.50,
                status: 'completed',
                description: 'Zone 1 to Heathrow Terminal 5',
                createdAt: new Date().toISOString(),
            }
        ],
        promoCodes: [
            {
                id: 'promo-001',
                code: 'WELCOME50',
                discount: 50,
                type: 'percentage',
                maxUses: 1000,
                usedCount: 456,
                expiryDate: '2024-03-31',
                active: true,
            }
        ]
    } as any),

    getStats: () => {
        const { drivers, passengers, transactions, incidents, negotiations } = get();
        const matched = negotiations.filter(n => n.status === 'matched').length;

        // Calculate vehicle distribution
        const vehicles = drivers.reduce((acc, d) => {
            const type = (d.carType || '').toLowerCase();
            if (type.includes('electric')) acc.electric++;
            else if (type.includes('luxury')) acc.luxury++;
            else acc.standard++;
            return acc;
        }, { electric: 0, luxury: 0, standard: 0 });

        return {
            totalDrivers: drivers.length,
            activeDrivers: drivers.filter((d) => d.status === 'active').length,
            pendingDrivers: drivers.filter((d) => d.status === 'pending').length,
            totalPassengers: passengers.length,
            activePassengers: passengers.filter((p) => p.status === 'active').length,
            totalRevenue: transactions
                .filter((t) => t.type === 'ride' && t.status === 'completed')
                .reduce((sum, t) => sum + t.amount, 0),
            totalPayouts: transactions
                .filter((t) => t.type === 'payout' && t.status === 'completed')
                .reduce((sum, t) => sum + t.amount, 0),
            openIncidents: incidents.filter((i) => i.status !== 'resolved' && i.status !== 'dismissed').length,
            bidSuccessRate: negotiations.length > 0 ? (matched / negotiations.length) * 100 : 0,
            avgCounterMargin: 12.5,
            vehicleDistribution: vehicles
        };
    },

    updateDriverStatus: (id, status) =>
        set((state) => ({
            drivers: state.drivers.map((d) => (d.id === id ? { ...d, status } : d)),
        })),

    updatePassengerStatus: (id, status) =>
        set((state) => ({
            passengers: state.passengers.map((p) => (p.id === id ? { ...p, status } : p)),
        })),

    addPassenger: (p) =>
        set((state) => ({
            passengers: [
                {
                    ...p,
                    id: `pax-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
                    status: 'active',
                    totalTrips: 0,
                    totalSpent: 0,
                    rating: 5.0,
                    joinedAt: new Date().toISOString().split('T')[0],
                },
                ...state.passengers,
            ],
        })),

    updatePassenger: (id, updates) =>
        set((state) => ({
            passengers: state.passengers.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        })),

    removePassenger: (id) =>
        set((state) => ({
            passengers: state.passengers.filter((p) => p.id !== id),
        })),

    updateIncidentStatus: (id, status) =>
        set((state) => ({
            incidents: state.incidents.map((i) => (i.id === id ? { ...i, status } : i)),
        })),

    updateStrategy: (newStrategy) =>
        set((state) => ({
            strategy: { ...state.strategy, ...newStrategy },
        })),

    togglePromoCode: (id) =>
        set((state) => ({
            promoCodes: state.promoCodes.map((p) =>
                p.id === id ? { ...p, active: !p.active } : p
            ),
        })),

    addPromoCode: (promo) =>
        set((state) => ({
            promoCodes: [...state.promoCodes, promo],
        })),

    createManualBooking: (booking) =>
        set((state) => ({
            recentRides: [
                {
                    ...booking,
                    id: `R-MAN-${Math.floor(Math.random() * 9000) + 1000}`,
                    status: booking.scheduledTime ? 'scheduled' : 'in_progress',
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    commissionAdmin: booking.fare * 0.15,
                    commissionDriver: booking.fare * 0.85,
                    paymentType: 'Cash',
                },
                ...state.recentRides,
            ],
        })),

    addVehicleService: (service) =>
        set((state) => ({
            vehicleServices: [
                { ...service, id: `v-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}` },
                ...state.vehicleServices
            ]
        })),

    updateVehicleService: (id, updates) =>
        set((state) => ({
            vehicleServices: state.vehicleServices.map((s) => (s.id === id ? { ...s, ...updates } : s))
        })),

    removeVehicleService: (id) =>
        set((state) => ({
            vehicleServices: state.vehicleServices.filter((s) => s.id !== id)
        })),

    deleteReview: (id) =>
        set((state) => ({
            reviews: state.reviews.filter((r) => r.id !== id)
        })),

    simulateMovement: () =>
        set((state) => ({
            drivers: state.drivers.map((d) => {
                if (d.onlineStatus !== 'online') return d;
                const jitterLat = (Math.random() - 0.5) * 0.0001;
                const jitterLng = (Math.random() - 0.5) * 0.0001;
                return {
                    ...d,
                    location: {
                        lat: d.location.lat + jitterLat,
                        lng: d.location.lng + jitterLng,
                    },
                    telemetry: d.telemetry ? {
                        ...d.telemetry,
                        heading: (d.telemetry.heading + (Math.random() - 0.5) * 5) % 360,
                        speed: Math.max(0, d.telemetry.speed + (Math.random() - 0.5) * 2),
                    } : d.telemetry
                };
            }),
        })),

    initializeSocket: () => {
        const checkSpatial = (driver: Driver, geofences: Geofence[]) => {
            const events: LiveLogEvent[] = [];
            const previousDrivers = get().drivers;
            const prevDriver = previousDrivers.find(d => d.id === driver.id);

            geofences.forEach(gf => {
                if (!gf.active) return;

                const isInside = isPointInPoly(driver.location, gf.coordinates);
                const wasInside = prevDriver ? isPointInPoly(prevDriver.location, gf.coordinates) : false;

                if (isInside && !wasInside) {
                    events.push({
                        id: `log-${Date.now()}-${Math.random()}`,
                        type: gf.type === 'restricted' ? 'violation' : 'entry',
                        geofenceId: gf.id,
                        geofenceName: gf.name,
                        driverId: driver.id,
                        driverName: driver.name,
                        timestamp: new Date().toLocaleTimeString()
                    });
                } else if (!isInside && wasInside) {
                    events.push({
                        id: `log-${Date.now()}-${Math.random()}`,
                        type: 'exit',
                        geofenceId: gf.id,
                        geofenceName: gf.name,
                        driverId: driver.id,
                        driverName: driver.name,
                        timestamp: new Date().toLocaleTimeString()
                    });
                }
            });
            return events;
        };

        socket.on('driversUpdate', (updatedDrivers: Driver[]) => {
            const currentGeofences = get().geofences;
            let allNewEvents: LiveLogEvent[] = [];

            updatedDrivers.forEach(d => {
                const events = checkSpatial(d, currentGeofences);
                allNewEvents = [...allNewEvents, ...events];
            });

            set((state) => ({
                drivers: updatedDrivers,
                liveLog: [...allNewEvents, ...state.liveLog].slice(0, 50)
            }));
        });
    },

    addIncident: (incident) => set((state) => ({
        incidents: [
            {
                ...incident,
                id: `INC-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
                date: new Date().toISOString()
            },
            ...state.incidents
        ]
    })),

    resolveIncident: (id) => set((state) => ({
        incidents: state.incidents.map(inc => inc.id === id ? { ...inc, status: 'resolved' as const } : inc)
    })),

    initializeSupabase: () => {
        const channel = supabase
            .channel('realtime_negotiations')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'negotiations' },
                (payload: RealtimePostgresChangesPayload<Negotiation>) => {
                    console.log('[Supabase Realtime] Negotiation Change:', payload);
                    const { eventType, new: newRecord, old: oldRecord } = payload;

                    set((state) => {
                        let updatedNegotiations = [...state.negotiations];

                        if (eventType === 'INSERT') {
                            updatedNegotiations = [newRecord as Negotiation, ...updatedNegotiations];
                        } else if (eventType === 'UPDATE') {
                            updatedNegotiations = updatedNegotiations.map(n =>
                                n.id === (newRecord as any).id ? { ...n, ...newRecord } : n
                            );
                        } else if (eventType === 'DELETE') {
                            updatedNegotiations = updatedNegotiations.filter(n => n.id !== (oldRecord as any).id);
                        }

                        return { negotiations: updatedNegotiations.slice(0, 50) };
                    });
                }
            )
            .subscribe();

        return () => supabase.removeChannel(channel);
    },

    // Geofencing Actions Implementation
    addGeofence: (geofence) => set((state) => ({
        geofences: [
            ...state.geofences,
            {
                ...geofence,
                id: `gf-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
                createdAt: new Date().toISOString().split('T')[0]
            }
        ]
    })),

    updateGeofence: (id, updates) => set((state) => ({
        geofences: state.geofences.map(gf => gf.id === id ? { ...gf, ...updates } : gf)
    })),

    deleteGeofence: (id) => set((state) => ({
        geofences: state.geofences.filter(gf => gf.id !== id)
    })),

    toggleGeofence: (id) => set((state) => ({
        geofences: state.geofences.map(gf => gf.id === id ? { ...gf, active: !gf.active } : gf)
    })),

    toggleH3Grid: () => set((state) => ({ showH3Grid: !state.showH3Grid })),

    setH3Density: (density) => set({ h3Density: density }),

    addVenuePoint: (geofenceId, point) => set((state) => ({
        geofences: state.geofences.map(gf => gf.id === geofenceId ? {
            ...gf,
            venuePoints: [
                ...(gf.venuePoints || []),
                { ...point, id: `vp-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}` }
            ]
        } : gf)
    })),

    addRequiredDocument: (doc) => {
        set((state) => ({
            requiredDocuments: [
                ...state.requiredDocuments,
                { ...doc, id: `rd${Date.now()}` }
            ]
        }));
    },

    updateRequiredDocument: (doc) => {
        set((state) => ({
            requiredDocuments: state.requiredDocuments.map(d => d.id === doc.id ? doc : d)
        }));
    },

    deleteRequiredDocument: (id) => {
        set((state) => ({
            requiredDocuments: state.requiredDocuments.filter(d => d.id !== id)
        }));
    },
}));

// Utility: Ray-casting algorithm for point-in-polygon
function isPointInPoly(point: { lat: number; lng: number }, vs: [number, number][]) {
    const x = point.lat, y = point.lng;
    let inside = false;
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        const xi = vs[i][0], yi = vs[i][1];
        const xj = vs[j][0], yj = vs[j][1];
        const intersect = ((yi > y) !== (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}
