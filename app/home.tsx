import { FontAwesome5 } from "@expo/vector-icons";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Animated, { FadeInUp, FadeOutUp, interpolate, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { SideMenu } from "../src/components/SideMenu";
import { darkMapStyle, mapStyle } from "../src/styles/mapStyles";

const { width, height } = Dimensions.get("window");

export default function HomeScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { colorScheme, setColorScheme } = useColorScheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const bottomSheetRef = useRef<BottomSheet>(null);
    const animatedIndex = useSharedValue(1);
    const [mapPadding, setMapPadding] = useState(height * 0.4);

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

    return (
        <View className="flex-1 bg-white dark:bg-black">
            {/* Map Layer */}
            <MapView
                provider={PROVIDER_GOOGLE}
                style={StyleSheet.absoluteFillObject}
                initialRegion={region}
                customMapStyle={colorScheme === 'dark' ? darkMapStyle : mapStyle}
                mapPadding={{ top: 0, right: 0, bottom: mapPadding, left: 0 }}
            >
                <Marker coordinate={{ latitude: 51.5074, longitude: -0.1278 }}>
                    <View className="h-10 w-10 items-center justify-center rounded-full bg-secondary border-2 border-primary">
                        <FontAwesome5 name="car" size={16} color="#00ff90" />
                    </View>
                </Marker>
            </MapView>

            {/* Success Popup */}
            {showSuccessPopup && (
                <Animated.View
                    entering={FadeInUp.duration(600)}
                    exiting={FadeOutUp.duration(600)}
                    className="absolute top-16 left-6 right-6 z-50 bg-[#05A357] rounded-3xl p-6 shadow-2xl flex-row items-center border border-white/20"
                >
                    <View className="h-12 w-12 rounded-full bg-white/20 items-center justify-center mr-4">
                        <FontAwesome5 name="check" size={20} color="white" />
                    </View>
                    <View className="flex-1">
                        <Text className="text-white font-uber-bold text-lg">You're all set, Jothum.</Text>
                        <Text className="text-white/90 font-uber-medium text-sm">Happy riding!</Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        setShowSuccessPopup(false);
                        bottomSheetRef.current?.snapToIndex(2); // Back to 68%
                    }}>
                        <FontAwesome5 name="times" size={16} color="white" />
                    </TouchableOpacity>
                </Animated.View>
            )}

            {/* Header Overlays (Simplified) */}
            <SafeAreaView className="absolute top-0 w-full px-6 pt-4 pointer-events-none">
                <Animated.View
                    style={headerAnimatedStyle}
                    className="flex-row items-center justify-between pointer-events-auto"
                >
                    <TouchableOpacity
                        onPress={() => setIsMenuOpen(true)}
                        className="h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-secondary shadow-lg"
                    >
                        <FontAwesome5 name="bars" size={20} color={colorScheme === 'dark' ? 'white' : 'black'} />
                    </TouchableOpacity>
                    <TouchableOpacity className="h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-secondary shadow-lg">
                        <FontAwesome5 name="user" size={20} color={colorScheme === 'dark' ? 'white' : 'black'} />
                    </TouchableOpacity>
                </Animated.View>
            </SafeAreaView>

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
                handleIndicatorStyle={{ backgroundColor: "#e7e8ec", width: 48, height: 6 }}
                backgroundStyle={{ borderRadius: 40, borderTopWidth: 0, shadowColor: "#000", shadowOffset: { width: 0, height: -10 }, shadowOpacity: 0.1, shadowRadius: 20 }}
            >
                <BottomSheetView className="flex-1 px-6 pt-2 pb-10">
                    {/* Integrated Search Bar inside Bottom Sheet */}
                    <View className="mb-6">
                        <TouchableOpacity
                            onPress={() => router.push("/search" as any)}
                            className="flex-row items-center rounded-2xl bg-accent-light/30 px-4 py-4 border border-accent-light/50"
                        >
                            <FontAwesome5 name="search" size={18} color="#adadada" />
                            <Text className="ml-3 flex-1 font-uber-medium text-secondary/60 text-lg">
                                Where to?
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Recent Searches */}
                    <View className="mb-6">
                        <Text className="text-xs font-uber-bold text-accent-gray uppercase tracking-widest mb-3">
                            Recent Searches
                        </Text>
                        <TouchableOpacity className="flex-row items-center mb-4">
                            <View className="h-8 w-8 items-center justify-center rounded-full bg-accent-light/20 mr-3">
                                <FontAwesome5 name="clock" size={14} color="#adadada" />
                            </View>
                            <View className="flex-1">
                                <Text className="font-uber-medium text-secondary">Avenue Mazatlan</Text>
                                <Text className="text-xs font-uber text-accent-gray">Colonia Condesa</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-row items-center">
                            <View className="h-8 w-8 items-center justify-center rounded-full bg-accent-light/20 mr-3">
                                <FontAwesome5 name="history" size={14} color="#adadada" />
                            </View>
                            <View className="flex-1">
                                <Text className="font-uber-medium text-secondary">Cuautla 61</Text>
                                <Text className="text-xs font-uber text-accent-gray">Hipódromo</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Bento Grid Services */}
                    <View className="mb-4">
                        <Text className="text-xl font-uber-bold text-secondary mb-4">
                            Dash Services
                        </Text>

                        <View className="flex-row gap-3 h-48">
                            {/* Large Feature Tile: Ride */}
                            <TouchableOpacity
                                onPress={() => router.push("/negotiation/fare-input" as any)}
                                className="flex-1 bg-primary rounded-3xl p-5 justify-between"
                            >
                                <FontAwesome5 name="car" size={32} color="black" />
                                <View>
                                    <Text className="text-xl font-uber-bold text-secondary">Ride</Text>
                                    <Text className="text-xs font-uber-medium text-secondary/70">Fast & Fair</Text>
                                </View>
                            </TouchableOpacity>

                            <View className="flex-1 gap-3">
                                {/* Intercity */}
                                <TouchableOpacity
                                    onPress={() => router.push("/negotiation/fare-input" as any)}
                                    className="flex-1 bg-accent-light/30 rounded-3xl p-4 justify-between border border-accent-light/50"
                                >
                                    <FontAwesome5 name="city" size={20} color="black" />
                                    <Text className="font-uber-bold text-secondary">Intercity</Text>
                                </TouchableOpacity>

                                {/* Delivery */}
                                <TouchableOpacity
                                    onPress={() => router.push("/negotiation/fare-input" as any)}
                                    className="flex-1 bg-accent-light/30 rounded-3xl p-4 justify-between border border-accent-light/50"
                                >
                                    <FontAwesome5 name="box" size={20} color="black" />
                                    <Text className="font-uber-bold text-secondary">Delivery</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Freight - Full Width Bottom */}
                        <TouchableOpacity
                            onPress={() => router.push("/negotiation/fare-input" as any)}
                            className="mt-3 flex-row items-center justify-between rounded-3xl bg-secondary p-5"
                        >
                            <View className="flex-row items-center">
                                <View className="h-12 w-12 items-center justify-center rounded-2xl bg-primary/20 mr-4">
                                    <FontAwesome5 name="truck" size={22} color="#00ff90" />
                                </View>
                                <View>
                                    <Text className="text-lg font-uber-bold text-white">Freight</Text>
                                    <Text className="text-xs font-uber text-accent-gray">Move heavy loads</Text>
                                </View>
                            </View>
                            <View className="h-8 w-8 items-center justify-center rounded-full bg-white/10">
                                <FontAwesome5 name="arrow-right" size={12} color="#00ff90" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </BottomSheetView>
            </BottomSheet>
        </View>
    );
}




