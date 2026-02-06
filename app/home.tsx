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
    const [selectedSettingMode, setSelectedSettingMode] = useState<'light' | 'dark' | 'system'>('system');
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

    const [activeMapStyle, setActiveMapStyle] = useState(colorScheme === 'dark' ? darkMapStyle : mapStyle);

    useEffect(() => {
        // Use a timeout to ensure the layout transition has fully settled 
        // before the native map engine tries to apply a new JSON style.
        const timer = setTimeout(() => {
            setActiveMapStyle(colorScheme === 'dark' ? darkMapStyle : mapStyle);
        }, 300);
        return () => clearTimeout(timer);
    }, [colorScheme]);

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

            {/* Header Overlays */}
            <SafeAreaView className="absolute top-0 w-full px-6 pt-4" pointerEvents="box-none">
                <Animated.View
                    style={headerAnimatedStyle}
                    className="flex-row items-center justify-between"
                    pointerEvents="box-none"
                >
                    <HomeHeaderControl
                        isMenuOpen={isMenuOpen}
                        onMenuPress={() => setIsMenuOpen(true)}
                        selectedMode={selectedSettingMode}
                        onThemeSelect={(mode) => {
                            setSelectedSettingMode(mode);
                            setColorScheme(mode);
                        }}
                    />

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
                    {/* Integrated Search Bar inside Bottom Sheet */}
                    <View className="mb-6">
                        <TouchableOpacity
                            onPress={() => router.push("/search" as any)}
                            className="flex-row items-center rounded-2xl bg-accent-light/30 dark:bg-zinc-800/50 px-4 py-4 border border-accent-light/50 dark:border-zinc-700/50"
                        >
                            <FontAwesome5 name="search" size={18} color={colorScheme === 'dark' ? '#71717a' : '#adadad'} />
                            <Text className="ml-3 flex-1 font-uber-medium text-secondary/60 dark:text-white/60 text-lg">
                                Where to?
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Recent Searches */}
                    <View className="mb-6">
                        <Text className="text-xs font-uber-bold text-accent-gray dark:text-zinc-500 uppercase tracking-widest mb-3">
                            Recent Searches
                        </Text>
                        <TouchableOpacity className="flex-row items-center mb-4">
                            <View className="h-8 w-8 items-center justify-center rounded-full bg-accent-light/20 dark:bg-zinc-800/30 mr-3">
                                <FontAwesome5 name="clock" size={14} color={colorScheme === 'dark' ? '#71717a' : '#adadad'} />
                            </View>
                            <View className="flex-1">
                                <Text className="font-uber-medium text-secondary dark:text-white">Avenue Mazatlan</Text>
                                <Text className="text-xs font-uber text-accent-gray dark:text-zinc-500">Colonia Condesa</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-row items-center">
                            <View className="h-8 w-8 items-center justify-center rounded-full bg-accent-light/20 dark:bg-zinc-800/30 mr-3">
                                <FontAwesome5 name="history" size={14} color={colorScheme === 'dark' ? '#71717a' : '#adadad'} />
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
                                    className="flex-1 bg-accent-light/30 dark:bg-zinc-800/30 rounded-3xl p-4 justify-between border border-accent-light/50 dark:border-zinc-700/50"
                                >
                                    <FontAwesome5 name="city" size={20} color={colorScheme === 'dark' ? 'white' : 'black'} />
                                    <Text className="font-uber-bold text-secondary dark:text-white">Intercity</Text>
                                </TouchableOpacity>

                                {/* Delivery */}
                                <TouchableOpacity
                                    onPress={() => router.push("/negotiation/fare-input" as any)}
                                    className="flex-1 bg-accent-light/30 dark:bg-zinc-800/30 rounded-3xl p-4 justify-between border border-accent-light/50 dark:border-zinc-700/50"
                                >
                                    <FontAwesome5 name="box" size={20} color={colorScheme === 'dark' ? 'white' : 'black'} />
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
                                    <FontAwesome5 name="truck" size={22} color="#00ff90" />
                                </View>
                                <View>
                                    <Text className="text-lg font-uber-bold text-white">Freight</Text>
                                    <Text className="text-xs font-uber text-accent-gray dark:text-zinc-500">Move heavy loads</Text>
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




function HomeHeaderControl({
    onMenuPress,
    selectedMode,
    onThemeSelect
}: {
    isMenuOpen: boolean,
    onMenuPress: () => void,
    selectedMode: 'light' | 'dark' | 'system',
    onThemeSelect: (mode: 'light' | 'dark' | 'system') => void
}) {
    const { colorScheme } = useColorScheme();

    return (
        <View
            className="flex-row items-center bg-white dark:bg-secondary rounded-full shadow-lg h-14 pr-1 overflow-hidden"
            pointerEvents="box-none"
        >
            {/* Menu Trigger */}
            <TouchableOpacity
                onPress={onMenuPress}
                className="h-14 w-14 items-center justify-center"
                activeOpacity={0.7}
            >
                <FontAwesome5 name="bars" size={18} color={colorScheme === 'dark' ? 'white' : 'black'} />
            </TouchableOpacity>

            <View className="h-8 w-[1px] bg-gray-100 dark:bg-zinc-700/50" />

            {/* Integrated Theme Switcher */}
            <View className="px-2" pointerEvents="box-none">
                <ThemeSwitcher selectedMode={selectedMode} onSelect={onThemeSelect} mini />
            </View>
        </View>
    );
}

import { Ionicons } from "@expo/vector-icons";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import {
    interpolateColor,
    runOnJS,
    withSpring
} from "react-native-reanimated";

function ThemeSwitcher({
    selectedMode,
    onSelect,
    mini = false
}: {
    selectedMode: 'light' | 'dark' | 'system',
    onSelect: (mode: 'light' | 'dark' | 'system') => void,
    mini?: boolean
}) {
    const modes: ('light' | 'dark' | 'system')[] = ['light', 'dark', 'system'];
    const activeIndex = modes.indexOf(selectedMode);
    const [containerWidth, setContainerWidth] = React.useState(0);

    const translationX = useSharedValue(activeIndex);

    // Update shared value when selectedMode props changes
    React.useEffect(() => {
        translationX.value = withSpring(activeIndex, { damping: 20, stiffness: 120 });
    }, [activeIndex]);

    const activeIndexOnStart = useSharedValue(activeIndex);

    const panGesture = Gesture.Pan()
        .onStart(() => {
            activeIndexOnStart.value = translationX.value;
        })
        .onUpdate((event) => {
            const padding = 4;
            const thumbWidth = (containerWidth - (padding * 2)) / 3;
            if (thumbWidth > 0) {
                const deltaIndex = event.translationX / thumbWidth;
                translationX.value = Math.max(0, Math.min(2, activeIndexOnStart.value + deltaIndex));
            }
        })
        .onEnd(() => {
            const finalIndex = Math.round(translationX.value);
            translationX.value = withSpring(finalIndex);
            runOnJS(onSelect)(modes[finalIndex]);
        });

    const tapGesture = Gesture.Tap()
        .onEnd((event) => {
            const padding = 4;
            const thumbWidth = (containerWidth - (padding * 2)) / 3;
            if (thumbWidth > 0) {
                const tappedIndex = Math.floor((event.x - padding) / thumbWidth);
                if (tappedIndex >= 0 && tappedIndex < 3) {
                    translationX.value = withSpring(tappedIndex);
                    runOnJS(onSelect)(modes[tappedIndex]);
                }
            }
        });

    const composedGesture = Gesture.Race(panGesture, tapGesture);

    const thumbStyle = useAnimatedStyle(() => {
        const padding = 4;
        const thumbWidth = (containerWidth - (padding * 2)) / 3;
        return {
            transform: [{ translateX: translationX.value * thumbWidth }],
            width: thumbWidth || '33.33%',
            opacity: containerWidth > 0 ? 1 : 0
        };
    });

    return (
        <GestureDetector gesture={composedGesture}>
            <View
                onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
                className={`flex-row items-center bg-gray-50/50 dark:bg-zinc-800/30 p-1 rounded-full relative ${mini ? 'h-10 w-[140px]' : 'h-14'} overflow-hidden border border-gray-100/30 dark:border-zinc-700/10`}
            >
                <Animated.View
                    style={[
                        thumbStyle,
                        {
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.05,
                            shadowRadius: 2,
                            elevation: 1
                        }
                    ]}
                    className="absolute top-1 bottom-1 left-1 bg-white dark:bg-zinc-600 rounded-full"
                />

                {modes.map((mode) => (
                    <ThemeButton
                        key={mode}
                        mode={mode}
                        myIndex={modes.indexOf(mode)}
                        activeIndexShared={translationX}
                        mini={mini}
                    />
                ))}
            </View>
        </GestureDetector>
    );
}

const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons);

function ThemeButton({
    mode,
    myIndex,
    activeIndexShared,
    mini
}: {
    mode: 'light' | 'dark' | 'system',
    myIndex: number,
    activeIndexShared: any,
    mini?: boolean
}) {
    const icons = { light: 'sunny-outline', dark: 'moon-outline', system: 'settings-outline' };
    const labels = { light: 'Light', dark: 'Dark', system: 'System' };

    const iconStyle = useAnimatedStyle(() => {
        const distance = Math.abs(activeIndexShared.value - myIndex);
        const isActive = distance < 0.5;

        return {
            color: interpolateColor(
                distance,
                [0, 0.5],
                ['#00ff90', '#adadad']
            ),
            transform: [{ scale: withSpring(isActive ? 1.1 : 1) }]
        };
    });

    return (
        <View className="flex-1 items-center justify-center flex-row h-full z-10">
            <AnimatedIonicons
                name={icons[mode] as any}
                size={mini ? 14 : 16}
                style={iconStyle}
            />
            {!mini && (
                <Text className={`ml-1.5 font-uber-bold text-[10px] uppercase tracking-tighter text-secondary dark:text-white`}>
                    {labels[mode]}
                </Text>
            )}
        </View>
    );
}
