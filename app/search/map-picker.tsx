import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { darkMapStyle, mapStyle } from "../../src/styles/mapStyles";

export default function MapPickerScreen() {
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const [region, setRegion] = React.useState({
        latitude: 51.5074,
        longitude: -0.1278,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });

    return (
        <View className="flex-1">
            <MapView
                provider={PROVIDER_GOOGLE}
                className="flex-1"
                initialRegion={region}
                onRegionChangeComplete={setRegion}
                customMapStyle={colorScheme === 'dark' ? darkMapStyle : mapStyle}
            />

            {/* Floating Marker in Center */}
            <View className="absolute inset-0 items-center justify-center pointer-events-none" style={{ marginTop: -40 }}>
                <Ionicons name="location" size={50} color="#00ff90" />
            </View>

            <SafeAreaView className="absolute top-0 w-full px-6 pt-4 flex-row items-center">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-zinc-800 shadow-lg"
                >
                    <Ionicons name="arrow-back" size={24} color={colorScheme === 'dark' ? 'white' : 'black'} />
                </TouchableOpacity>
                <View className="flex-1 mx-4 bg-white/90 dark:bg-zinc-900/90 py-3 px-6 rounded-2xl shadow-lg items-center">
                    <Text className="font-uber-bold text-secondary dark:text-white">Move map to pin</Text>
                </View>
            </SafeAreaView>

            <View className="absolute bottom-10 left-0 right-0 px-10">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="bg-primary py-5 rounded-2xl shadow-xl items-center"
                >
                    <Text className="font-uber-bold text-secondary text-lg uppercase tracking-widest">Confirm Location</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
