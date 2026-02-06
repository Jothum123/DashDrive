import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditSavedPlacesScreen() {
    const router = useRouter();
    const { colorScheme } = useColorScheme();

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-black">
            <View className="px-6 pt-10 flex-row items-center justify-between mb-8">
                <View className="flex-row items-center">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-zinc-800 shadow-lg mr-4"
                    >
                        <Ionicons name="arrow-back" size={24} color={colorScheme === 'dark' ? 'white' : 'black'} />
                    </TouchableOpacity>
                    <Text className="text-2xl font-uber-bold text-secondary dark:text-white">Edit Saved Places</Text>
                </View>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text className="text-primary font-uber-bold text-base">Done</Text>
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 px-6">
                <EditPlaceRow
                    icon="home-outline"
                    label="Add home"
                    onPress={() => router.push("/search/map-picker" as any)}
                />
                <View className="h-[1px] bg-gray-100 dark:bg-zinc-800 ml-14 mb-4" />
                <EditPlaceRow
                    icon="briefcase-outline"
                    label="Add work"
                    onPress={() => router.push("/search/map-picker" as any)}
                />
                <View className="h-[1px] bg-gray-100 dark:bg-zinc-800 ml-14 mb-4" />
                <EditPlaceRow
                    icon="add"
                    label="Add new"
                    sub="Save your favourite places"
                    onPress={() => router.push("/search/map-picker" as any)}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const EditPlaceRow = ({ icon, label, sub, onPress }: { icon: any, label: string, sub?: string, onPress: () => void }) => (
    <TouchableOpacity onPress={onPress} className="flex-row items-center py-4">
        <View className="h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-zinc-800 mr-4">
            <Ionicons name={icon} size={20} color="#3b82f6" />
        </View>
        <View className="flex-1">
            <Text className="text-lg font-uber-bold text-primary">{label}</Text>
            {sub && <Text className="text-xs font-uber text-accent-gray dark:text-zinc-500">{sub}</Text>}
        </View>
        <Ionicons name="chevron-forward" size={18} color="#71717a" />
    </TouchableOpacity>
);
