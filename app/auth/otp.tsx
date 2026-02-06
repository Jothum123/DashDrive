import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Keyboard,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../src/components/ui/Button";

export default function OTPScreen() {
    const router = useRouter();
    const [code, setCode] = useState(["", "", "", ""]);
    const [timer, setTimer] = useState(20);
    const inputRefs = React.useRef<any>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleTextChange = (text: string, index: number) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        if (text.length === 1 && index < 3) {
            inputRefs.current[index + 1].focus();
        }

        if (newCode.every((digit) => digit !== "")) {
            Keyboard.dismiss();
            // Simulate verification and navigate to Home
            setTimeout(() => {
                router.replace("/setup/payment-method" as any);
            }, 500);
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === "Backspace" && index > 0 && code[index] === "") {
            inputRefs.current[index - 1].focus();
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-black">
            <View className="px-6 py-4">
                <TouchableOpacity onPress={() => router.back()} className="mb-6 h-10 w-10 items-center justify-center bg-secondary/5 dark:bg-white/5 rounded-2xl">
                    <FontAwesome name="arrow-left" size={20} color="#adadad" />
                </TouchableOpacity>

                <Text className="mb-2 text-3xl font-uber-bold text-secondary dark:text-white">
                    Enter the code
                </Text>
                <Text className="mb-10 text-base font-uber-medium text-accent-gray dark:text-zinc-500">
                    A code was sent to <Text className="text-secondary dark:text-primary font-uber-bold">+44 ********79</Text>
                </Text>

                <View className="flex-row justify-between gap-4 mb-10">
                    {[0, 1, 2, 3].map((index) => (
                        <TextInput
                            key={index}
                            ref={(ref) => {
                                inputRefs.current[index] = ref;
                            }}
                            className="h-20 w-16 rounded-2xl border-2 border-primary bg-primary/5 dark:bg-primary/10 text-center text-3xl font-uber-bold text-secondary dark:text-white"
                            keyboardType="number-pad"
                            placeholderTextColor="#71717a"
                            maxLength={1}
                            value={code[index]}
                            onChangeText={(text) => handleTextChange(text, index)}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                            autoFocus={index === 0}
                        />
                    ))}
                </View>

                <Text className="text-base font-uber-medium text-accent-gray dark:text-zinc-500">
                    Resend code in <Text className="text-secondary dark:text-primary font-uber-bold">{timer}</Text>
                </Text>

                <View className="mt-auto mb-6">
                    <Button
                        label="Verify & Continue"
                        disabled={code.some(digit => digit === "")}
                        onPress={() => router.replace("/setup/payment-method" as any)}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}
