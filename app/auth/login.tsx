import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../src/components/ui/Button";
import { Input } from "../../src/components/ui/Input";

export default function LoginScreen() {
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleContinue = () => {
        if (phoneNumber.length >= 10) {
            router.push("/auth/otp" as any);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-black">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6 py-8">
                <View className="mb-10 items-center">
                    <Text className="text-3xl font-uber-bold text-secondary dark:text-white">
                        Enter your number
                    </Text>
                </View>

                <View className="mb-8 flex-row items-center gap-2">
                    <View className="flex-row items-center rounded-2xl border-2 border-accent-light dark:border-zinc-800 bg-accent-light/30 dark:bg-zinc-800/50 px-4 py-4">
                        <Text className="text-lg">🇬🇧</Text>
                        <Text className="ml-2 text-base font-uber-medium text-secondary dark:text-white">
                            +44
                        </Text>
                        <FontAwesome
                            name="chevron-down"
                            size={12}
                            color="#adadad"
                            className="ml-2"
                        />
                    </View>
                    <View className="flex-1">
                        <Input
                            placeholder="Phone number"
                            keyboardType="phone-pad"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            containerClassName="mb-0"
                        />
                    </View>
                </View>

                <View className="mb-8 flex-row items-center">
                    <View className="h-[1px] flex-1 bg-accent-light dark:bg-zinc-800" />
                    <Text className="mx-4 font-uber-medium text-accent-gray dark:text-zinc-500">OR</Text>
                    <View className="h-[1px] flex-1 bg-accent-light dark:bg-zinc-800" />
                </View>

                <View className="gap-4">
                    <Button
                        label="Continue with Apple"
                        variant="ghost"
                        className="border-accent-light dark:border-zinc-800"
                        textClassName="text-secondary dark:text-white"
                        icon={<FontAwesome name="apple" size={24} color="#adadad" />}
                    />
                    <Button
                        label="Continue with Google"
                        variant="ghost"
                        className="border-accent-light dark:border-zinc-800"
                        textClassName="text-secondary dark:text-white"
                        icon={<FontAwesome name="google" size={24} color="#DB4437" />}
                    />
                    <Button
                        label="Continue with Facebook"
                        variant="ghost"
                        className="border-accent-light dark:border-zinc-800"
                        textClassName="text-secondary dark:text-white"
                        icon={<FontAwesome name="facebook" size={24} color="#4267B2" />}
                    />
                </View>

                <View className="mt-auto pt-10">
                    <Text className="text-center text-xs font-uber-medium text-accent-gray dark:text-zinc-500 leading-5">
                        By signing up, you agree to our{" "}
                        <Text className="text-secondary dark:text-primary underline">Terms & Conditions</Text>
                        , acknowledge our{" "}
                        <Text className="text-secondary dark:text-primary underline">Privacy Policy</Text>,
                        and confirm that you're over 18.
                    </Text>
                </View>

                <View className="mt-6">
                    <Button
                        label="Continue"
                        disabled={phoneNumber.length < 10}
                        onPress={handleContinue}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
