import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import React from "react";
import {
    Modal,
    Pressable,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Animated, { FadeIn, FadeOut, SlideInLeft, SlideOutLeft } from "react-native-reanimated";

interface SideMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SideMenu = ({ isOpen, onClose }: SideMenuProps) => {
    const { colorScheme, setColorScheme } = useColorScheme();
    const [selectedMode, setSelectedMode] = React.useState<'light' | 'dark' | 'auto'>('auto');

    const handleThemeChange = (mode: 'light' | 'dark' | 'auto') => {
        setSelectedMode(mode);
        const nwMode = mode === 'auto' ? undefined : mode;
        setColorScheme(nwMode as any);
    };

    return (
        <Modal
            transparent
            visible={isOpen}
            animationType="none"
            onRequestClose={onClose}
        >
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
                            <Text className="text-sm font-uber text-accent-gray italic">Premium Member</Text>
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

                        {/* Theme Switcher Section */}
                        <Text className="text-sm font-uber-bold text-accent-gray mb-4 uppercase tracking-widest">Theme</Text>
                        <View className="flex-row justify-between bg-gray-50 dark:bg-zinc-800/50 p-2 rounded-2xl">
                            <ThemeButton
                                active={selectedMode === 'light'}
                                icon="sunny-outline"
                                onPress={() => handleThemeChange('light')}
                                label="Light"
                            />
                            <ThemeButton
                                active={selectedMode === 'dark'}
                                icon="moon-outline"
                                onPress={() => handleThemeChange('dark')}
                                label="Dark"
                            />
                            <ThemeButton
                                active={selectedMode === 'auto'}
                                icon="settings-outline"
                                onPress={() => handleThemeChange('auto')}
                                label="Auto"
                            />
                        </View>
                    </View>

                    <TouchableOpacity className="mb-10 flex-row items-center">
                        <Ionicons name="log-out-outline" size={24} color="#f44336" />
                        <Text className="ml-4 text-lg font-uber-bold text-red-500">Log Out</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </Modal>
    );
};

function MenuOption({ icon, label }: { icon: any, label: string }) {
    return (
        <TouchableOpacity className="flex-row items-center py-4">
            <Ionicons name={icon} size={22} color="#adadad" />
            <Text className="ml-4 text-lg font-uber-medium text-secondary dark:text-white">{label}</Text>
        </TouchableOpacity>
    );
}

function ThemeButton({ active, icon, label, onPress }: { active: boolean, icon: any, label: string, onPress: () => void }) {
    const activeClass = active ? "bg-white dark:bg-zinc-700 shadow-sm" : "";
    return (
        <TouchableOpacity
            onPress={onPress}
            className={`flex-1 flex-row items-center justify-center py-3 rounded-xl ${activeClass}`}
        >
            <Ionicons name={icon} size={18} color={active ? "#00ff90" : "#adadad"} />
            <Text className={`ml-2 font-uber-bold text-xs ${active ? "text-secondary dark:text-white" : "text-accent-gray"}`}>{label}</Text>
        </TouchableOpacity>
    );
}
