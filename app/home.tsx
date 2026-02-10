import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
    Dimensions,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Animated, {
    FadeInUp, FadeOutUp, interpolate,
    useAnimatedStyle, useSharedValue
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { SideMenu } from "../src/components/SideMenu";
import { StyledFontAwesome5, StyledIonicons } from "../src/lib/interop";
import MapView, { Marker, PROVIDER_GOOGLE } from "../src/lib/MapView";
import { useSavedPlacesStore } from "../src/lib/store";
import { darkMapStyle, mapStyle } from "../src/styles/mapStyles";

const { width, height } = Dimensions.get("window");

export default function HomeScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { colorScheme, setColorScheme } = useColorScheme();
    const { isBusinessMode, setIsBusinessMode } = useSavedPlacesStore();
    const [selectedSettingMode, setSelectedSettingMode] = useState<'light' | 'dark' | 'system'>('system');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const bottomSheetRef = useRef<BottomSheet>(null);
    const animatedIndex = useSharedValue(1);
    const [mapPadding, setMapPadding] = useState(height * 0.4);
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const placeholders = ["Search places", "Search food"];

    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (params.setupSuccess === "true") {
            setShowSuccessPopup(true);
            bottomSheetRef.current?.snapToIndex(1); // 50% down
            const timer = setTimeout(() => {
                setShowSuccessPopup(false);
                bottomSheetRef.current?.snapToIndex(2); // Back to 68%
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [params.setupSuccess]);

    // Snap points: 15% (collapsed), 50% (success state), 68% (services), 92% (full)
    const snapPoints = useMemo(() => ["15%", "50%", "68%", "92%"], []);

    const [region, setRegion] = useState({
        latitude: 51.5074,
        longitude: -0.1278,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0121,
    });

    const [drivers, setDrivers] = useState([
        { id: '1', latitude: 51.5085, longitude: -0.1285, heading: 45 },
        { id: '2', latitude: 51.5065, longitude: -0.1265, heading: 180 },
        { id: '3', latitude: 51.5070, longitude: -0.1295, heading: 270 },
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setDrivers(prev => prev.map(d => ({
                ...d,
                latitude: d.latitude + (Math.random() - 0.5) * 0.0002,
                longitude: d.longitude + (Math.random() - 0.5) * 0.0002,
                heading: (d.heading + (Math.random() - 0.5) * 20) % 360
            })));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleSheetChange = useCallback((index: number) => {
        // Dynamic map padding based on snap points
        if (index === 0) setMapPadding(height * 0.15);
        else if (index === 1) setMapPadding(height * 0.5);
        else if (index === 2) setMapPadding(height * 0.6); // Match 68% visible area
        else if (index === 3) setMapPadding(height * 0.5);
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
            transform: [
                {
                    translateY: interpolate(
                        animatedIndex.value,
                        [1, 1.2], // Start moving immediately above 68% (threshold ~70%)
                        [0, -100],
                        "clamp"
                    ),
                },
            ],
            opacity: interpolate(
                animatedIndex.value,
                [1, 1.1], // Fade out quickly as it passes 70%
                [1, 0],
                "clamp"
            ),
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
            >
                {/* Current Location Marker */}
                <Marker coordinate={{ latitude: 51.5074, longitude: -0.1278 }}>
                    <View className="h-12 w-12 items-center justify-center">
                        <View className="h-4 w-4 rounded-full bg-blue-500 border-2 border-white shadow-lg" />
                    </View>
                </Marker>

                {/* Live Drivers */}
                {drivers.map(driver => (
                    <Marker
                        key={driver.id}
                        coordinate={{ latitude: driver.latitude, longitude: driver.longitude }}
                        rotation={driver.heading}
                        tracksViewChanges={false}
                    >
                        <View className="h-10 w-10 items-center justify-center">
                            <View className={`h-8 w-8 items-center justify-center rounded-full ${isBusinessMode ? 'bg-secondary' : 'bg-primary'} border-2 ${isBusinessMode ? 'border-primary' : 'border-secondary'} shadow-md`}>
                                <StyledFontAwesome5 name="car" size={12} color={isBusinessMode ? "#00ff90" : "#000"} />
                            </View>
                        </View>
                    </Marker>
                ))}
            </MapView>

            {/* Floating Search Bar */}
            <SafeAreaView className="absolute top-12 left-6 right-6 z-40" pointerEvents="box-none">
                <View className="flex-row items-center gap-3">
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
                </View>
            </SafeAreaView>

            {/* Success Popup */}
            {showSuccessPopup && (
                <Animated.View
                    entering={FadeInUp.duration(600)}
                    exiting={FadeOutUp.duration(600)}
                    className="absolute top-16 left-6 right-6 z-50 bg-[#05A357] rounded-3xl p-6 shadow-2xl flex-row items-center border border-white/20"
                >
                    <View className="h-12 w-12 rounded-full bg-white/20 items-center justify-center mr-4">
                        <StyledFontAwesome5 name="check" size={20} color="white" />
                    </View>
                    <View className="flex-1">
                        <Text className="text-white font-uber-bold text-lg">You're all set, Jothum.</Text>
                        <Text className="text-white/90 font-uber-medium text-sm">Happy riding!</Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        setShowSuccessPopup(false);
                        bottomSheetRef.current?.snapToIndex(2); // Back to 68%
                    }}>
                        <StyledFontAwesome5 name="times" size={16} color="white" />
                    </TouchableOpacity>
                </Animated.View>
            )}



            <SideMenu
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
            />

            {/* Interactive Bottom Sheet */}
            <BottomSheet
                ref={bottomSheetRef}
                index={1}
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
                    backgroundColor: colorScheme === 'dark' ? '#18181b' : 'white',
                    borderTopWidth: 0,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: -10 },
                    shadowOpacity: 0.1,
                    shadowRadius: 20
                }}
            >
                <BottomSheetView className="flex-1 px-6 pt-2 pb-10">
                    {/* Placeholder content or empty if needed */}

                    {/* Recent Searches */}
                    <View className="mb-6">
                        <Text className="text-xs font-uber-bold text-accent-gray dark:text-zinc-500 uppercase tracking-widest mb-3">
                            Recent Searches
                        </Text>
                        <TouchableOpacity className="flex-row items-center mb-4">
                            <View className="h-8 w-8 items-center justify-center rounded-full bg-accent-light/20 dark:bg-zinc-800/30 mr-3">
                                <StyledFontAwesome5 name="clock" size={14} color={colorScheme === 'dark' ? '#71717a' : '#adadad'} />
                            </View>
                            <View className="flex-1">
                                <Text className="font-uber-medium text-secondary dark:text-white">Avenue Mazatlan</Text>
                                <Text className="text-xs font-uber text-accent-gray dark:text-zinc-500">Colonia Condesa</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-row items-center">
                            <View className="h-8 w-8 items-center justify-center rounded-full bg-accent-light/20 dark:bg-zinc-800/30 mr-3">
                                <StyledFontAwesome5 name="history" size={14} color={colorScheme === 'dark' ? '#71717a' : '#adadad'} />
                            </View>
                            <View className="flex-1">
                                <Text className="font-uber-medium text-secondary dark:text-white">Cuautla 61</Text>
                                <Text className="text-xs font-uber text-accent-gray dark:text-zinc-500">Hipódromo</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Bento Grid Services */}
                    <View className="mb-4">
                        <Text className="text-xl font-uber-bold text-secondary dark:text-white mb-4">
                            Dash Services
                        </Text>

                        <View className="flex-row gap-3 h-48">
                            {/* Large Feature Tile: Ride */}
                            <TouchableOpacity
                                onPress={() => router.push("/search" as any)}
                                className="flex-1 bg-primary rounded-3xl p-5 justify-between"
                            >
                                <StyledFontAwesome5 name="car" size={32} color="black" />
                                <View>
                                    <Text className="text-xl font-uber-bold text-secondary">Ride</Text>
                                    <Text className="text-xs font-uber-medium text-secondary/70">Fast & Fair</Text>
                                </View>
                            </TouchableOpacity>

                            <View className="flex-1 gap-3">
                                {/* Intercity */}
                                <TouchableOpacity
                                    onPress={() => router.push("/negotiation/fare-input" as any)}
                                    className="flex-1 bg-accent-light/30 dark:bg-zinc-800/30 rounded-3xl p-4 justify-between border border-accent-light/50 dark:border-zinc-700/50"
                                >
                                    <StyledFontAwesome5 name="city" size={20} color={colorScheme === 'dark' ? 'white' : 'black'} />
                                    <Text className="font-uber-bold text-secondary dark:text-white">Intercity</Text>
                                </TouchableOpacity>

                                {/* Delivery */}
                                <TouchableOpacity
                                    onPress={() => router.push("/negotiation/fare-input" as any)}
                                    className="flex-1 bg-accent-light/30 dark:bg-zinc-800/30 rounded-3xl p-4 justify-between border border-accent-light/50 dark:border-zinc-700/50"
                                >
                                    <StyledFontAwesome5 name="box" size={20} color={colorScheme === 'dark' ? 'white' : 'black'} />
                                    <Text className="font-uber-bold text-secondary dark:text-white">Delivery</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Freight - Full Width Bottom */}
                        <TouchableOpacity
                            onPress={() => router.push("/negotiation/fare-input" as any)}
                            className="mt-3 flex-row items-center justify-between rounded-3xl bg-secondary dark:bg-zinc-800/80 p-5 border border-transparent dark:border-zinc-700/50"
                        >
                            <View className="flex-row items-center">
                                <View className="h-12 w-12 items-center justify-center rounded-2xl bg-primary/20 mr-4">
                                    <StyledFontAwesome5 name="truck" size={22} color="#00ff90" />
                                </View>
                                <View>
                                    <Text className="text-lg font-uber-bold text-white">Freight</Text>
                                    <Text className="text-xs font-uber text-accent-gray dark:text-zinc-500">Move heavy loads</Text>
                                </View>
                            </View>
                            <View className="h-8 w-8 items-center justify-center rounded-full bg-white/10">
                                <StyledFontAwesome5 name="arrow-right" size={12} color="#00ff90" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </BottomSheetView>
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
        </View>
    );
}







