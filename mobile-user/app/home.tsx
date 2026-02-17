import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
    Dimensions,
    Image,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Animated, {
    FadeInDown,
    FadeInUp, FadeOutUp, interpolate,
    useAnimatedStyle, useSharedValue
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { SideMenu } from "../src/components/SideMenu";
import { StyledFontAwesome5, StyledIonicons, StyledMaterialCommunityIcons } from "../src/lib/interop";
import MapView, { Marker, PROVIDER_GOOGLE } from "../src/lib/MapView";
import { useSavedPlacesStore } from "../src/lib/store";
import { darkMapStyle, mapStyle } from "../src/styles/mapStyles";

const { width, height } = Dimensions.get("window");

const CAR_IMAGE = require("../assets/images/tamitoy.png");

// --- STABLE MARKER IMPLEMENTATION (FRESH START) ---
interface Point {
    lat: number;
    lng: number;
}

interface RoadSegment {
    id: string;
    start: Point;
    end: Point;
    next: string[];
}

interface Driver {
    id: string;
    segmentId: string;
    progress: number;
    speed: number;
    latitude: number;
    longitude: number;
    heading: number;
}

const getHeading = (start: Point, end: Point) => {
    const lat1 = start.lat * (Math.PI / 180);
    const lon1 = start.lng * (Math.PI / 180);
    const lat2 = end.lat * (Math.PI / 180);
    const lon2 = end.lng * (Math.PI / 180);

    const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) -
        Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
    const brng = Math.atan2(y, x) * (180 / Math.PI);
    return (brng + 360) % 360;
};

const LUSAKA_NETWORK: RoadSegment[] = [
    // Cairo Road (Central Loop)
    {
        id: "cairo-n1",
        start: { lat: -15.4285, lng: 28.2825 }, // Kafue Roundabout
        end: { lat: -15.4215, lng: 28.2838 },   // Central
        next: ["cairo-n2"]
    },
    {
        id: "cairo-n2",
        start: { lat: -15.4215, lng: 28.2838 },
        end: { lat: -15.4095, lng: 28.2865 },   // Kabwe Roundabout
        next: ["geast-e1", "cairo-s1"]
    },
    {
        id: "cairo-s1",
        start: { lat: -15.4095, lng: 28.2865 },
        end: { lat: -15.4215, lng: 28.2838 },
        next: ["cairo-s2"]
    },
    {
        id: "cairo-s2",
        start: { lat: -15.4215, lng: 28.2838 },
        end: { lat: -15.4285, lng: 28.2825 },
        next: ["cairo-n1", "indep-e1"]
    },
    // Great East Road
    {
        id: "geast-e1",
        start: { lat: -15.4095, lng: 28.2865 },
        end: { lat: -15.4050, lng: 28.3000 },   // Levy Junction area
        next: ["geast-e2"]
    },
    {
        id: "geast-e2",
        start: { lat: -15.4050, lng: 28.3000 },
        end: { lat: -15.3950, lng: 28.3220 },   // Manda Hill area
        next: ["geast-w1"]
    },
    {
        id: "geast-w1",
        start: { lat: -15.3950, lng: 28.3220 },
        end: { lat: -15.4050, lng: 28.3000 },
        next: ["geast-w2"]
    },
    {
        id: "geast-w2",
        start: { lat: -15.4050, lng: 28.3000 },
        end: { lat: -15.4095, lng: 28.2865 },
        next: ["cairo-s1", "geast-e1"]
    },
    // Independence Avenue
    {
        id: "indep-e1",
        start: { lat: -15.4285, lng: 28.2825 },
        end: { lat: -15.4265, lng: 28.2950 },   // Central Police area
        next: ["indep-e2"]
    },
    {
        id: "indep-e2",
        start: { lat: -15.4265, lng: 28.2950 },
        end: { lat: -15.4250, lng: 28.3100 },   // Civic Centre / Government area
        next: ["indep-w1"]
    },
    {
        id: "indep-w1",
        start: { lat: -15.4250, lng: 28.3100 },
        end: { lat: -15.4265, lng: 28.2950 },
        next: ["indep-w2"]
    },
    {
        id: "indep-w2",
        start: { lat: -15.4265, lng: 28.2950 },
        end: { lat: -15.4285, lng: 28.2825 },
        next: ["cairo-n1", "indep-e1"]
    }
];

// --- COMPONENTS ---

// Removed MovingMarker to fix recursive update loop

export default function HomeScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { colorScheme, setColorScheme } = useColorScheme();
    const { isBusinessMode, setIsBusinessMode } = useSavedPlacesStore();
    const [selectedSettingMode, setSelectedSettingMode] = useState<'light' | 'dark' | 'system'>('system');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMoreServicesOpen, setIsMoreServicesOpen] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const bottomSheetRef = useRef<BottomSheet>(null);
    const animatedIndex = useSharedValue(1);
    const [mapPadding, setMapPadding] = useState(height * 0.4);
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const placeholders = ["Search places", "Search food", "Order delivery"];

    // --- FRESH MARKER STATE ---
    const [carSize, setCarSize] = useState(120);
    const isTrackingMarkers = true; // Permanent tracking for reliability

    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        }, 1500);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        if (params.setupSuccess === "true") {
            setShowSuccessPopup(true);
            bottomSheetRef.current?.snapToIndex(1); // Intermediate stage (60%)
            const timer = setTimeout(() => {
                setShowSuccessPopup(false);
                bottomSheetRef.current?.snapToIndex(1); // Keep at intermediate stage
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [params.setupSuccess]);

    // Snap points: 15% (collapsed), 60% (intermediate), 100% (fully expanded)
    const snapPoints = useMemo(() => ["15%", "60%", "100%"], []);

    const [region, setRegion] = useState({
        latitude: -15.4190,
        longitude: 28.2840,
        latitudeDelta: 0.0350,
        longitudeDelta: 0.0350,
    });

    const [drivers, setDrivers] = useState<Driver[]>(
        // Use 6 drivers spread across different segments to avoid overlap blinking
        [0, 2, 4, 6, 8, 10].map((segIdx, i) => {
            const seg = LUSAKA_NETWORK[segIdx % LUSAKA_NETWORK.length];
            return {
                id: (i + 1).toString(),
                segmentId: seg.id,
                progress: i * 0.15, // Stagger starting positions
                speed: 0.003 + (i * 0.0005), // Slightly different speeds to avoid bunching
                latitude: seg.start.lat + (seg.end.lat - seg.start.lat) * (i * 0.15),
                longitude: seg.start.lng + (seg.end.lng - seg.start.lng) * (i * 0.15),
                heading: getHeading(seg.start, seg.end)
            };
        })
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setDrivers((prev: Driver[]) => prev.map((d: Driver) => {
                let { segmentId, progress, speed } = d;
                let currentSeg = LUSAKA_NETWORK.find((s: RoadSegment) => s.id === segmentId) || LUSAKA_NETWORK[0];

                // Advance progress
                let nextProgress = progress + speed;

                // Handle segment transitions
                if (nextProgress >= 1) {
                    nextProgress = 0;
                    const nextIds = currentSeg.next;
                    const nextId = nextIds[Math.floor(Math.random() * nextIds.length)];
                    currentSeg = LUSAKA_NETWORK.find((s: RoadSegment) => s.id === nextId) || LUSAKA_NETWORK[0];
                    segmentId = currentSeg.id;
                }

                // Smooth interpolation with safety checks
                const lat = currentSeg.start.lat + (currentSeg.end.lat - currentSeg.start.lat) * nextProgress;
                const lng = currentSeg.start.lng + (currentSeg.end.lng - currentSeg.start.lng) * nextProgress;
                const head = getHeading(currentSeg.start, currentSeg.end);

                // Safety: Ensure we never return NaN
                if (isNaN(lat) || isNaN(lng)) return d;

                return {
                    ...d,
                    segmentId,
                    progress: nextProgress,
                    latitude: lat,
                    longitude: lng,
                    heading: head
                };
            }));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    const handleSheetChange = useCallback((index: number) => {
        // Dynamic map padding based on snap points
        if (index === 0) setMapPadding(height * 0.15);
        else if (index === 1) setMapPadding(height * 0.4);
        else if (index === 2) setMapPadding(height * 0.2); // Less padding when expanded to 90%
    }, []);

    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                {...props}
                appearsOnIndex={2}
                disappearsOnIndex={1}
                opacity={0.3}
            />
        ),
        []
    );

    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                animatedIndex.value,
                [1, 1.7], // Smoothly fade out as the sheet approaches the top
                [1, 0],
                "clamp"
            ),
            transform: [
                {
                    translateY: interpolate(
                        animatedIndex.value,
                        [1, 2],
                        [0, -50], // Moves up slightly while fading
                        "clamp"
                    ),
                },
                {
                    scale: interpolate(
                        animatedIndex.value,
                        [1, 1.8],
                        [1, 0.95],
                        "clamp"
                    ),
                },
            ],
        };
    });

    const internalHeaderAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                animatedIndex.value,
                [1.4, 1.8],
                [0, 1],
                "clamp"
            ),
            transform: [
                {
                    translateY: interpolate(
                        animatedIndex.value,
                        [1.4, 1.8],
                        [-20, 0], // Subtle slide down into place
                        "clamp"
                    ),
                },
            ],
            // Use absolute positioning to avoid affecting layout flow during gesture
            position: 'absolute',
            zIndex: 10,
        };
    });

    const contentAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        animatedIndex.value,
                        [1.4, 1.8],
                        [0, 80], // Push services down to make room for the header
                        "clamp"
                    ),
                },
            ],
        };
    });

    const [activeMapStyle, setActiveMapStyle] = useState(colorScheme === 'dark' ? darkMapStyle : mapStyle);
    const [showLocationModal, setShowLocationModal] = useState(false);

    useEffect(() => {
        // Use a timeout to ensure the layout transition has fully settled 
        // before the native map engine tries to apply a new JSON style.
        const timer = setTimeout(() => {
            setActiveMapStyle(colorScheme === 'dark' ? darkMapStyle : mapStyle);
        }, 300);

        // Show location modal after 1.5s
        const modalTimer = setTimeout(() => {
            setShowLocationModal(true);
        }, 1500);

        return () => {
            clearTimeout(timer);
            clearTimeout(modalTimer);
        };
    }, [colorScheme]);

    const handleLocationPermission = () => {
        setShowLocationModal(false);
    };

    return (
        <View className="flex-1 bg-white dark:bg-black">
            {/* Map Layer */}
            <MapView
                provider={PROVIDER_GOOGLE}
                style={StyleSheet.absoluteFillObject}
                initialRegion={region}
                customMapStyle={activeMapStyle}
                mapPadding={{ top: 0, right: 0, bottom: mapPadding, left: 0 }}
                onRegionChangeComplete={(newRegion) => {
                    setRegion(newRegion);
                    setCarSize(120); // Maintain stable size
                }}
            >
                {/* Current Location Marker */}
                <Marker coordinate={{ latitude: -15.4190, longitude: 28.2840 }}>
                    <View className="h-12 w-12 items-center justify-center">
                        <View className="h-4 w-4 rounded-full bg-blue-500 border-2 border-white shadow-lg" />
                    </View>
                </Marker>

                {/* Live Drivers */}
                {drivers.map((driver: Driver) => (
                    <Marker
                        key={`driver-${driver.id}`}
                        coordinate={{ latitude: driver.latitude, longitude: driver.longitude }}
                        rotation={driver.heading}
                        anchor={{ x: 0.5, y: 0.5 }}
                        tracksViewChanges={false}
                        flat={true}
                        zIndex={100}
                        image={CAR_IMAGE}
                    />
                ))}
            </MapView>

            {/* Floating Search Bar */}
            <SafeAreaView className="absolute top-12 left-6 right-6 z-40" pointerEvents="box-none">
                <Animated.View style={[headerAnimatedStyle, { flexDirection: 'row', alignItems: 'center', gap: 12 }]}>
                    <TouchableOpacity
                        onPress={() => router.push("/search" as any)}
                        activeOpacity={0.9}
                        className="flex-1 flex-row items-center rounded-3xl bg-white dark:bg-zinc-900 px-5 py-4 shadow-xl border border-gray-100 dark:border-zinc-800"
                    >
                        <StyledFontAwesome5 name="search" size={18} color={colorScheme === 'dark' ? '#adadad' : '#71717a'} />
                        <Text className="ml-3 flex-1 font-uber-medium text-secondary/60 dark:text-white/60 text-lg">
                            {placeholders[placeholderIndex]}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setIsMenuOpen(true)}
                        activeOpacity={0.8}
                        className="h-14 w-14 rounded-full bg-white dark:bg-zinc-900 shadow-xl border border-gray-100 dark:border-zinc-800 items-center justify-center overflow-hidden"
                    >
                        <View className="h-full w-full items-center justify-center bg-primary">
                            <StyledFontAwesome5 name="user-alt" size={20} color="black" />
                        </View>
                    </TouchableOpacity>
                </Animated.View>

                {/* More Services Modal */}
                <Modal
                    visible={isMoreServicesOpen}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setIsMoreServicesOpen(false)}
                >
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
                        <Pressable style={{ flex: 1 }} onPress={() => setIsMoreServicesOpen(false)} />
                        <Animated.View
                            entering={FadeInDown.springify().damping(20)}
                            className="bg-white dark:bg-zinc-900 rounded-t-[40px] p-6 pb-2"
                            style={{ maxHeight: '85%' }}
                        >
                            <View className="flex-row items-center justify-between mb-8 px-2">
                                <Text className="text-secondary dark:text-white font-uber-bold text-2xl">Dash Services</Text>
                                <TouchableOpacity
                                    onPress={() => setIsMoreServicesOpen(false)}
                                    className="h-10 w-10 rounded-full bg-primary items-center justify-center shadow-sm"
                                >
                                    <StyledFontAwesome5 name="times" size={16} color="black" />
                                </TouchableOpacity>
                            </View>

                            <ScrollView showsVerticalScrollIndicator={false} className="mb-4">
                                <View className="px-2 pb-10">
                                    {/* Modal Grid Row 1: Insurance & Loans */}
                                    <View className="flex-row gap-4 mb-8">
                                        <YangoCard
                                            label="Insurance"
                                            image={require("../assets/images/protection.png")}
                                            onPress={() => setIsMoreServicesOpen(false)}
                                            containerStyle="flex-1 h-[110px]"
                                            imageStyle={{ width: 130, height: 130 }}
                                            overflowHidden={true}
                                        />
                                        <YangoCard
                                            label="BNPL"
                                            image={require("../assets/images/loan.png")}
                                            onPress={() => {
                                                setIsMoreServicesOpen(false);
                                                router.push("/bnpl" as any);
                                            }}
                                            containerStyle="flex-1 h-[110px]"
                                            imageStyle={{ width: 130, height: 130 }}
                                            overflowHidden={true}
                                        />
                                    </View>

                                    {/* Modal Grid Row 2: Paying Bills Banner */}
                                    <TouchableOpacity
                                        onPress={() => setIsMoreServicesOpen(false)}
                                        activeOpacity={0.9}
                                        className="bg-[#F2F2F2] dark:bg-zinc-800 rounded-[28px] p-6 mb-8 overflow-hidden h-[115px] flex-row items-center"
                                    >
                                        <View className="flex-1">
                                            <Text className="text-secondary dark:text-white font-uber-bold text-xl mb-1">
                                                Pay bills
                                            </Text>
                                            <Text className="text-secondary/50 dark:text-white/50 font-uber-medium text-xs">
                                                Utilities, airtime & more
                                            </Text>
                                        </View>
                                        <View style={{ position: 'absolute', right: -10, bottom: -15 }}>
                                            <Image
                                                source={require("../assets/images/paymore.png")}
                                                style={{ width: 130, height: 130 }}
                                                resizeMode="contain"
                                            />
                                        </View>
                                    </TouchableOpacity>

                                    {/* Modal Grid Row 3: Gifts, Map, BnB */}
                                    <View className="flex-row gap-4">
                                        <YangoCard
                                            label="Gifts"
                                            image={require("../assets/images/gifts.png")}
                                            onPress={() => setIsMoreServicesOpen(false)}
                                            containerStyle="flex-1 h-[90px]"
                                            imageStyle={{ width: 120, height: 120 }}
                                            overflowHidden={true}
                                        />
                                        <YangoCard
                                            label="Map"
                                            image={require("../assets/images/map.png")}
                                            onPress={() => setIsMoreServicesOpen(false)}
                                            containerStyle="flex-1 h-[90px]"
                                            imageStyle={{ width: 110, height: 110 }}
                                            overflowHidden={true}
                                        />
                                        <YangoCard
                                            label="BnB"
                                            image={require("../assets/images/bnb.png")}
                                            onPress={() => {
                                                setIsMoreServicesOpen(false);
                                                router.push("/airbnb" as any);
                                            }}
                                            containerStyle="flex-1 h-[90px]"
                                            imageStyle={{ width: 120, height: 120 }}
                                            overflowHidden={true}
                                        />
                                    </View>
                                </View>
                            </ScrollView>
                        </Animated.View>
                    </View>
                </Modal>
            </SafeAreaView>

            {/* Success Popup */}
            {
                showSuccessPopup && (
                    <Animated.View
                        entering={FadeInUp.duration(600)}
                        exiting={FadeOutUp.duration(600)}
                        className="absolute top-16 left-6 right-6 z-50 bg-primary rounded-3xl p-6 shadow-2xl flex-row items-center border border-black/5"
                    >
                        <View className="h-12 w-12 rounded-full bg-black/10 items-center justify-center mr-4">
                            <StyledFontAwesome5 name="check" size={20} color="black" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-black font-uber-bold text-lg">You're all set, Jothum.</Text>
                            <Text className="text-black/70 font-uber-medium text-sm">Happy riding!</Text>
                        </View>
                        <TouchableOpacity onPress={() => {
                            setShowSuccessPopup(false);
                            bottomSheetRef.current?.snapToIndex(1); // Back to intermediate stage
                        }}>
                            <StyledFontAwesome5 name="times" size={16} color="black" />
                        </TouchableOpacity>
                    </Animated.View>
                )
            }



            <SideMenu
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
            />

            {/* Interactive Bottom Sheet */}
            <BottomSheet
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                animatedIndex={animatedIndex}
                onChange={handleSheetChange}
                backdropComponent={renderBackdrop}
                enablePanDownToClose={false}
                handleIndicatorStyle={{
                    backgroundColor: colorScheme === 'dark' ? '#3f3f46' : '#e7e8ec',
                    width: 48,
                    height: 6
                }}
                backgroundStyle={{
                    borderRadius: 40,
                    backgroundColor: colorScheme === 'dark' ? '#111111' : 'white', // Standards to a deep zinc-950/black tone
                    borderTopWidth: 0,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: -10 },
                    shadowOpacity: 0.1,
                    shadowRadius: 20
                }}
            >
                <Animated.View
                    style={[
                        internalHeaderAnimatedStyle,
                        {
                            backgroundColor: colorScheme === 'dark' ? '#111111' : 'white',
                            paddingTop: 12,
                            paddingBottom: 15,
                            paddingHorizontal: 24,
                            left: 0,
                            right: 0,
                            top: 0,
                        }
                    ]}
                >
                    <View className="flex-row items-center gap-3">
                        <TouchableOpacity
                            onPress={() => router.push("/search" as any)}
                            activeOpacity={0.9}
                            className="flex-1 flex-row items-center rounded-2xl bg-accent-light/30 dark:bg-zinc-900 px-5 py-3 border border-accent-light dark:border-zinc-800"
                        >
                            <StyledFontAwesome5 name="search" size={16} color="#71717a" />
                            <Text className="ml-3 flex-1 font-uber-medium text-secondary/60 dark:text-white/60">
                                {placeholders[placeholderIndex]}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setIsMenuOpen(true)}
                            className="h-12 w-12 rounded-full bg-primary items-center justify-center shadow-sm"
                        >
                            <StyledFontAwesome5 name="user-alt" size={16} color="black" />
                        </TouchableOpacity>
                    </View>
                </Animated.View>

                <BottomSheetScrollView
                    className="flex-1"
                    contentContainerStyle={{ paddingBottom: 60 }}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ paddingHorizontal: 16, paddingTop: 12 }}>
                        {/* --- TOP BANNER --- */}
                        <TouchableOpacity
                            activeOpacity={0.9}
                            className="bg-primary rounded-[28px] p-6 mb-4 overflow-hidden"
                            style={{ height: 110 }}
                        >
                            <View className="flex-1">
                                <Text className="text-secondary font-uber-bold text-xl mb-1">
                                    All services in one place
                                </Text>
                                <Text className="text-secondary/80 font-uber-medium text-sm pr-12">
                                    Book rides, order food, and send packages with ease
                                </Text>
                            </View>
                            <View className="absolute right-[-10] bottom-[-10] opacity-20">
                                <StyledFontAwesome5 name="th-large" size={80} color="black" />
                            </View>
                        </TouchableOpacity>

                        {/* --- YANGO-STYLE BENTO GRID --- */}
                        <View className="mb-6 px-4">
                            {/* Row 1: Delivery & Food */}
                            <View className="flex-row gap-4 mb-6">
                                <YangoCard
                                    label="Delivery"
                                    image={require("../assets/images/bikedelivery.png")}
                                    onPress={() => router.push("/negotiation/fare-input" as any)}
                                    containerStyle="flex-[1.3] h-[80px]"
                                    imageStyle={{ width: 140, height: 140, position: 'absolute', right: -30, top: -30 }}
                                    overflowHidden={false}
                                />
                                <YangoCard
                                    label="Food"
                                    image={require("../assets/images/Fast Food.png")}
                                    badge="-K121"
                                    onPress={() => router.push("/food" as any)}
                                    containerStyle="flex-[0.7] h-[80px]"
                                    imageStyle={{ width: 100, height: 100, position: 'absolute', right: -5, top: -20 }}
                                    overflowHidden={false}
                                />
                            </View>

                            {/* --- SHOPS BANNER --- */}
                            <TouchableOpacity
                                onPress={() => router.push("/mart" as any)}
                                activeOpacity={0.9}
                                className="bg-[#F2F2F2] dark:bg-zinc-800 rounded-[28px] p-4 mb-8 h-[80px] flex-row items-start relative"
                                style={{ overflow: 'visible' }}
                            >
                                <View style={[StyleSheet.absoluteFillObject, { backgroundColor: colorScheme === 'dark' ? '#1c1c1e' : '#F2F2F2', borderRadius: 24 }]} />
                                <View className="z-20">
                                    <Text className="text-secondary dark:text-white font-uber-bold text-[15px] leading-tight">
                                        Shops
                                    </Text>
                                    <Text className="text-secondary/50 dark:text-white/50 font-uber-medium text-[10px] mt-0.5">
                                        Essentials & more
                                    </Text>
                                </View>
                                <View style={{ position: 'absolute', right: -10, bottom: -15, zIndex: 10 }}>
                                    <Image
                                        source={require("../assets/images/grocery.png")}
                                        style={{ width: 120, height: 120 }}
                                        resizeMode="contain"
                                    />
                                </View>
                            </TouchableOpacity>

                            {/* Row 2: Intercity & Cargo */}
                            <View className="flex-row gap-4 mb-6">
                                <YangoCard
                                    label="Intercity"
                                    image={require("../assets/images/citytocity.png")}
                                    onPress={() => router.push("/negotiation/fare-input" as any)}
                                    containerStyle="flex-1 h-[80px]"
                                    imageStyle={{ width: 120, height: 120, position: 'absolute', right: -30, bottom: -20 }}
                                    overflowHidden={false}
                                />
                                <YangoCard
                                    label="Cargo"
                                    image={require("../assets/images/truckloading.png")}
                                    onPress={() => router.push("/negotiation/fare-input" as any)}
                                    containerStyle="flex-1 h-[80px]"
                                    imageStyle={{ width: 120, height: 120, position: 'absolute', right: -30, top: -15 }}
                                    overflowHidden={false}
                                />
                            </View>

                            {/* Row 3: Rides */}
                            <View className="flex-row gap-4 mb-6 items-end">
                                <YangoCard
                                    label="Rides"
                                    subtitle="from 4 min"
                                    image={require("../assets/images/legend.png")}
                                    onPress={() => router.push("/search" as any)}
                                    containerStyle="flex-1 h-[100px]"
                                    imageStyle={{ width: 120, height: 120, position: 'absolute', right: -40, top: -20 }}
                                    overflowHidden={false}
                                />
                            </View>

                            {/* Row 4: Extended Services */}
                            <View className="flex-row gap-4">
                                <YangoCard
                                    label="Business"
                                    image={require("../assets/images/business.png")}
                                    onPress={() => router.push("/search" as any)}
                                    containerStyle="flex-1 h-[80px]"
                                    imageStyle={{ width: 120, height: 120, position: 'absolute', right: -30, top: -20 }}
                                    overflowHidden={false}
                                />
                                <YangoCard
                                    label="More"
                                    icon={<StyledFontAwesome5 name="th-large" size={20} color={colorScheme === 'dark' ? 'white' : 'black'} />}
                                    onPress={() => setIsMoreServicesOpen(true)}
                                    containerStyle="flex-1 h-[80px]"
                                    bgColor="#00ff90"
                                    imageStyle={{ justifyContent: 'center', alignItems: 'center' }}
                                />
                            </View>
                        </View>

                        {/* --- YANGO-STYLE SEARCH BAR --- */}
                        <TouchableOpacity
                            onPress={() => router.push("/search" as any)}
                            activeOpacity={0.9}
                            className="bg-[#F2F2F2] dark:bg-zinc-800 rounded-[24px] h-[72px] mb-6 flex-row items-center overflow-hidden px-4"
                        >
                            <View style={{ width: 70, height: '100%', justifyContent: 'center', marginLeft: -25 }}>
                                <Image
                                    source={require("../assets/images/cityride.png")}
                                    style={{ width: 120, height: 70 }}
                                    resizeMode="contain"
                                />
                            </View>
                            <Text className="flex-1 text-secondary dark:text-white font-uber-bold text-[20px] text-center pr-8">
                                Where to?
                            </Text>
                            <View className="absolute right-5 h-9 w-9 rounded-full bg-white dark:bg-zinc-700 items-center justify-center shadow-sm">
                                <StyledFontAwesome5 name="chevron-right" size={14} color="black" />
                            </View>
                        </TouchableOpacity>

                        {/* --- RECENT LOCATIONS --- */}
                        <View className="mb-8">
                            <LocationCard
                                label="Inter City Bus Station"
                                time="15 min"
                                subtitle="Lusaka, Central Business District"
                                icon="bus"
                                color="#E0E0E0"
                            />
                            <View className="h-[1px] bg-secondary/5 dark:bg-white/10 mx-14 my-1" />
                            <LocationCard
                                label="Kentucky Fried...ill Mall, Lusaka"
                                time="7 min"
                                subtitle="Lusaka, Mulungus...rema Road, 19255"
                                icon="utensils"
                                color="#E0E0E0"
                            />
                        </View>
                    </View>
                </BottomSheetScrollView>
            </BottomSheet>

            <Modal
                transparent
                visible={showLocationModal}
                animationType="fade"
            >
                <View className="flex-1 items-center justify-center bg-black/40 px-8">
                    <View className="w-full rounded-[20px] bg-white/95 dark:bg-[#323232] overflow-hidden shadow-2xl">
                        <View className="pt-6 px-6 pb-4 items-center">
                            <View className="mb-4">
                                <StyledIonicons name="location-outline" size={32} color={colorScheme === 'dark' ? 'white' : 'black'} />
                            </View>
                            <Text className="mb-2 text-center text-[17px] font-uber-bold text-secondary dark:text-white">
                                Allow "DashDrive" to access your location?
                            </Text>
                            <Text className="text-center text-[13px] font-uber-medium text-secondary/70 dark:text-white/80 leading-5">
                                Your location will be used to show your current position on the map and for calculating ride fares.
                            </Text>
                        </View>

                        <View className="h-[0.5px] bg-secondary/10 dark:bg-white/10" />

                        <View>
                            <Pressable
                                onPress={handleLocationPermission}
                                className="items-center justify-center py-4 border-b-[0.5px] border-secondary/10 dark:border-white/10"
                            >
                                <Text className="text-[17px] font-uber-bold text-[#0A84FF]">
                                    Allow Precise
                                </Text>
                            </Pressable>
                            <Pressable
                                onPress={handleLocationPermission}
                                className="items-center justify-center py-4 border-b-[0.5px] border-secondary/10 dark:border-white/10"
                            >
                                <Text className="text-[17px] font-uber-medium text-[#0A84FF]">
                                    Allow Once
                                </Text>
                            </Pressable>
                            <Pressable
                                onPress={() => setShowLocationModal(false)}
                                className="items-center justify-center py-4"
                            >
                                <Text className="text-[17px] font-uber-medium text-secondary/60 dark:text-white/60">
                                    Don't Allow
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View >
    );
}

// Helper components for Vibrant Style
function YangoCard({ label, subtitle, image, icon, onPress, containerStyle, imageStyle, imageContainerStyle, bgColor = '#F2F2F2', badge, overflowHidden = false }: any) {
    const { colorScheme } = useColorScheme();

    // Extract flex value from containerStyle string if present (e.g., flex-[1.3])
    const flexMatch = containerStyle?.match(/flex-\[([\d.]+)\]/);
    const flexValue = flexMatch ? parseFloat(flexMatch[1]) : (containerStyle?.includes('flex-1') ? 1 : 0);

    return (
        <View style={{ flex: flexValue }}>
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.8}
                className={containerStyle}
                style={[
                    {
                        borderRadius: 24,
                        position: 'relative',
                        overflow: overflowHidden ? 'hidden' : 'visible',
                        width: '100%',
                    }
                ]}
            >
                {/* Background Plate */}
                <View
                    style={[
                        StyleSheet.absoluteFillObject,
                        {
                            backgroundColor: colorScheme === 'dark' ? '#1c1c1e' : bgColor,
                            borderRadius: 24,
                        }
                    ]}
                />

                {/* Text Content - Positioned Inside */}
                <View className="absolute top-3 left-3 z-20">
                    <Text className="text-secondary dark:text-white font-uber-bold text-[13px] leading-tight">
                        {label}
                    </Text>
                    {subtitle && (
                        <Text className="text-secondary/40 dark:text-white/40 font-uber-medium text-[9px] mt-0.5">
                            {subtitle}
                        </Text>
                    )}
                </View>

                {/* Image/Icon Content */}
                <View style={[imageContainerStyle || { justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }, { overflow: 'visible' }]}>
                    {image ? (
                        <Image
                            source={image}
                            style={imageStyle}
                            resizeMode="contain"
                        />
                    ) : icon ? (
                        <View style={imageStyle}>
                            {icon}
                        </View>
                    ) : null}
                </View>

                {badge && (
                    <View className="absolute top-0 right-0 bg-black px-2 py-0.5 rounded-bl-lg z-30">
                        <Text className="text-white font-uber-bold text-[8px]">{badge}</Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
}

function VibrantCard({ label, description, image, icon, onPress, containerStyle, imageStyle, bgColor, style }: any) {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            className={containerStyle}
            style={[
                {
                    backgroundColor: bgColor,
                    borderRadius: 32,
                    overflow: 'hidden',
                    borderWidth: 1,
                    borderColor: 'rgba(255,255,255,0.1)'
                },
                style
            ]}
        >
            {image ? (
                <Image
                    source={image}
                    style={imageStyle}
                    resizeMode="contain"
                />
            ) : icon ? (
                <View style={imageStyle}>
                    {icon}
                </View>
            ) : null}
            <View className="flex-1 p-5">
                <Text className="text-white font-uber-bold text-[19px] leading-7 tracking-tight">{label}</Text>
                {description && (
                    <Text className="text-white/80 font-uber-medium text-[12px] mt-1 pr-6 tracking-wide" numberOfLines={2}>
                        {description}
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    );
}

function LocationCard({ label, time, subtitle, icon, color }: any) {
    const { colorScheme } = useColorScheme();
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            className="flex-row items-center p-4 bg-transparent"
        >
            <View className="h-10 w-10 rounded-xl bg-[#F2F2F2] dark:bg-zinc-800 items-center justify-center mr-4">
                <StyledFontAwesome5 name={icon} size={18} color="#9E9E9E" />
            </View>
            <View className="flex-1">
                <Text className="text-secondary dark:text-white font-uber-bold text-[15px] leading-5" numberOfLines={1}>
                    {label}
                </Text>
                {subtitle && (
                    <Text className="text-secondary/40 dark:text-zinc-500 font-uber-medium text-[12px] mt-0.5" numberOfLines={1}>
                        {subtitle}
                    </Text>
                )}
            </View>
            <Text className="text-secondary/40 dark:text-zinc-500 font-uber-medium text-[12px] ml-4">
                {time}
            </Text>
        </TouchableOpacity>
    );
}







