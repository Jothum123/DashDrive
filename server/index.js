const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Vite default port
        methods: ["GET", "POST"]
    }
});

// Initial mock data for drivers
let drivers = [
    {
        id: 'PILOT-342',
        name: 'John Smith',
        location: { lat: 51.5074, lng: -0.1278 },
        telemetry: { speed: 42, battery: 85, heading: 180, altitude: 12 },
        onlineStatus: 'online'
    },
    {
        id: 'PILOT-882',
        name: 'Sarah Johnson',
        location: { lat: 51.5154, lng: -0.1410 },
        telemetry: { speed: 12, battery: 92, heading: 45, altitude: 8 },
        onlineStatus: 'online'
    }
];

// Market Negotiation State
let activeTrips = [];

// Simulation loop
setInterval(() => {
    // ... existing driver simulation ...
    drivers = drivers.map(d => {
        const speedKms = d.telemetry.speed / 3600;
        const rad = (d.telemetry.heading * Math.PI) / 180;
        const deltaLat = (Math.cos(rad) * speedKms) / 111.32;
        const deltaLng = (Math.sin(rad) * speedKms) / (111.32 * Math.cos(d.location.lat * Math.PI / 180));
        const newHeading = (d.telemetry.heading + (Math.random() - 0.5) * 10 + 360) % 360;

        return {
            ...d,
            location: {
                lat: d.location.lat + deltaLat,
                lng: d.location.lng + deltaLng
            },
            telemetry: {
                ...d.telemetry,
                heading: newHeading,
                speed: Math.max(10, Math.min(60, d.telemetry.speed + (Math.random() - 0.5) * 5))
            }
        };
    });

    io.emit('driversUpdate', drivers);
    io.emit('marketUpdate', {
        liquidityRatio: 0.84,
        discoveryGap: 4.20,
        activeTrips: activeTrips.length
    });
}, 2000);

io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    socket.emit('driversUpdate', drivers);

    // Module B: Negotiation Engine Handler
    socket.on('proposeFare', (data) => {
        const tripId = `TRIP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        const newTrip = {
            id: tripId,
            riderId: data.riderId,
            initialOffer: data.amount,
            currentPrice: data.amount,
            negotiation_history: [{ type: 'Rider Proposal', price: data.amount, time: new Date() }],
            status: 'negotiating'
        };
        activeTrips.push(newTrip);

        // Broadcast to nearby drivers
        io.emit('newTripRequest', newTrip);
        console.log(`Fare proposed for ${tripId}: $${data.amount}`);
    });

    socket.on('driverCounterOffer', (data) => {
        const trip = activeTrips.find(t => t.id === data.tripId);
        if (trip) {
            trip.currentPrice = data.amount;
            trip.negotiation_history.push({
                type: 'Driver Counter',
                driverId: data.driverId,
                price: data.amount,
                time: new Date()
            });
            io.emit('tripUpdate', trip);
            console.log(`Driver ${data.driverId} countered for ${data.tripId}: $${data.amount}`);
        }
    });

    socket.on('acceptFare', (data) => {
        const trip = activeTrips.find(t => t.id === data.tripId);
        if (trip) {
            trip.status = 'matched';
            trip.finalPrice = trip.currentPrice;
            io.emit('tripMatched', trip);
            console.log(`Trip ${data.tripId} matched at $${trip.finalPrice}`);
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Real-time simulation server running on port ${PORT}`);
});
