import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import React from "react";
import {
    Pressable,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Animated, {
    FadeIn,
    FadeOut,
    SlideInLeft,
    SlideOutLeft
} from "react-native-reanimated";

interface SideMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SideMenu = ({ isOpen, onClose }: SideMenuProps) => {
    const { colorScheme, setColorScheme } = useColorScheme();
    const [selectedMode, setSelectedMode] = React.useState<'light' | 'dark' | 'system'>('system');

    // Sync selectedMode with actual colorScheme when menu opens
    React.useEffect(() => {
        if (!colorScheme) setSelectedMode('system');
        else setSelectedMode(colorScheme as 'light' | 'dark');
    }, [colorScheme, isOpen]);

    const handleThemeChange = (mode: 'light' | 'dark' | 'system') => {
        setSelectedMode(mode);
        setColorScheme(mode);
    };

    if (!isOpen) return null;

    return (
        <View className="absolute inset-0 z-[100]">
            <View className="flex-1">
                <Animated.View
                    entering={FadeIn}
                    exiting={FadeOut}
                    className="absolute inset-0 bg-black/50"
                >
                    <Pressable className="flex-1" onPress={onClose} />
                </Animated.View>

                <Animated.View
                    entering={SlideInLeft.duration(300)}
                    exiting={SlideOutLeft.duration(300)}
                    className="absolute top-0 bottom-0 left-0 w-[85%] bg-white dark:bg-zinc-900 shadow-2xl pt-14 px-6"
                >
                    <View className="flex-row items-center mb-10">
                        <View className="h-16 w-16 rounded-full bg-primary items-center justify-center mr-4">
                            <FontAwesome5 name="user-alt" size={24} color="black" />
                        </View>
                        <View>
                            <Text className="text-xl font-uber-bold text-secondary dark:text-white">Bruce M.</Text>
                            <Text className="text-sm font-uber text-accent-gray dark:text-zinc-400 italic">Premium Member</Text>
                        </View>
                    </View>

                    <View className="flex-1">
                        <MenuOption icon="time-outline" label="History" />
                        <MenuOption icon="wallet-outline" label="Payment" />
                        <MenuOption icon="bookmark-outline" label="Saved Places" />
                        <MenuOption icon="gift-outline" label="Promos" />
                        <MenuOption icon="help-circle-outline" label="Support" />
                        <MenuOption icon="settings-outline" label="Settings" />

                        <View className="h-[1] bg-gray-100 dark:bg-zinc-800 my-6" />

                        <TouchableOpacity className="mb-10 flex-row items-center">
                            <Ionicons name="log-out-outline" size={24} color="#f44336" />
                            <Text className="ml-4 text-lg font-uber-bold text-red-500">Log Out</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        </View>
    );
};

function MenuOption({ icon, label }: { icon: any, label: string }) {
    const { colorScheme } = useColorScheme();
    return (
        <TouchableOpacity className="flex-row items-center py-4">
            <Ionicons name={icon} size={22} color={colorScheme === 'dark' ? '#71717a' : '#adadad'} />
            <Text className="ml-4 text-lg font-uber-medium text-secondary dark:text-white">{label}</Text>
        </TouchableOpacity>
    );
}
