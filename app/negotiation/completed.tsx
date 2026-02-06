import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../src/components/ui/Button";
import { Card } from "../../src/components/ui/Card";

export default function RideCompletedScreen() {
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const handleFinish = () => {
        router.replace("/home" as any);
    };

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-black">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <ScrollView className="flex-1 px-6">
                    <View className="items-center mt-10 mb-8">
                        <View className="w-20 h-20 bg-primary/20 rounded-full items-center justify-center mb-4">
                            <Ionicons name="checkmark-circle" size={50} color="#00ff90" />
                        </View>
                        <Text className="text-2xl font-uber-bold dark:text-white">Trip Completed!</Text>
                        <Text className="text-gray-500 font-uber dark:text-zinc-500">Hope you had a great ride with DashDrive</Text>
                    </View>

                    <Card className="mb-8 p-6 items-center">
                        <Text className="text-sm font-uber-medium text-gray-400 dark:text-zinc-600 uppercase tracking-widest mb-1">Total Fare</Text>
                        <Text className="text-4xl font-uber-bold mb-6 dark:text-white">MX$65.00</Text>

                        <View className="w-full h-[1px] bg-gray-100 dark:bg-zinc-800 mb-6" />

                        <View className="flex-row justify-between w-full px-4 text-center">
                            <View className="items-center">
                                <Text className="text-xs text-gray-400 dark:text-zinc-600 font-uber">Distance</Text>
                                <Text className="font-uber-medium dark:text-zinc-300">4.2 km</Text>
                            </View>
                            <View className="items-center">
                                <Text className="text-xs text-gray-400 dark:text-zinc-600 font-uber">Duration</Text>
                                <Text className="font-uber-medium dark:text-zinc-300">12 mins</Text>
                            </View>
                            <View className="items-center">
                                <Text className="text-xs text-gray-400 dark:text-zinc-600 font-uber">Vehicle</Text>
                                <Text className="font-uber-medium dark:text-zinc-300">Versa (Silver)</Text>
                            </View>
                        </View>
                    </Card>

                    <View className="items-center mb-8">
                        <Text className="text-lg font-uber-medium mb-4 dark:text-white">Rate Sarah M.</Text>
                        <View className="flex-row space-x-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                                    <Ionicons
                                        name={rating >= star ? "star" : "star-outline"}
                                        size={36}
                                        color={rating >= star ? "#FFD700" : "#adadada"}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View className="mb-10">
                        <Text className="text-sm font-uber-medium text-gray-500 dark:text-zinc-500 mb-2">Leave a comment (optional)</Text>
                        <TextInput
                            multiline
                            numberOfLines={4}
                            placeholder="How was your ride?"
                            placeholderTextColor="#71717a"
                            value={comment}
                            onChangeText={setComment}
                            className="bg-gray-50 dark:bg-zinc-900 p-4 rounded-2xl font-uber min-h-[100px] text-base border border-gray-100 dark:border-zinc-800 text-secondary dark:text-white"
                            textAlignVertical="top"
                        />
                    </View>

                    <Button
                        label="Done"
                        onPress={handleFinish}
                        className="mb-10"
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
