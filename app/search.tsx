import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SideMenu } from "../src/components/SideMenu";

const RECENT_HISTORY = [
    { id: "1", title: "Emily Homes Subd Ph 2", subtitle: "Cabantian, Davao City", icon: "time-sharp" },
    { id: "2", title: "Bangoy Int'l Airport", subtitle: "Sasa, Davao City", icon: "airplane", tag: "Travel" },
    { id: "3", title: "Buddy Store", subtitle: "Malagamot Road, Communal", icon: "time-sharp" },
];

export default function SearchScreen() {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-black">
            {/* Elevated Header */}
            <View className="px-6 py-4 flex-row items-center justify-between border-b border-gray-50 dark:border-zinc-800/50">
                <View className="flex-row items-center">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="h-10 w-10 items-center justify-center rounded-2xl bg-secondary/5 dark:bg-white/5"
                    >
                        <Ionicons name="arrow-back" size={22} color="#adadad" />
                    </TouchableOpacity>
                    <Text className="ml-4 text-2xl font-uber-bold text-secondary dark:text-white">Ride</Text>
                </View>
                <TouchableOpacity
                    onPress={() => setIsMenuOpen(true)}
                    className="h-10 w-10 items-center justify-center rounded-2xl bg-accent-light/10 dark:bg-white/5"
                >
                    <Ionicons name="menu" size={20} color="#adadad" />
                </TouchableOpacity>
            </View>

            <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Modern Layered Search Area */}
                <View className="px-6 py-6" style={{ zIndex: 10 }}>
                    <View className="rounded-[32px] bg-accent-light/10 dark:bg-zinc-800/20 p-1.5">
                        <View className="flex-row items-center px-5 py-4 bg-white dark:bg-zinc-900 rounded-[28px] shadow-sm shadow-black/5">
                            <View className="h-3 w-3 rounded-full bg-primary mr-4 border-2 border-secondary/10" />
                            <TextInput
                                placeholder="Where to?"
                                placeholderTextColor="#71717a"
                                className="flex-1 font-uber-medium text-lg text-secondary dark:text-white"
                                autoFocus
                            />
                            <View className="h-8 w-[1px] bg-gray-100 dark:bg-zinc-800 mx-3" />
                            <TouchableOpacity className="flex-row items-center px-4 py-2 rounded-2xl bg-secondary/5 dark:bg-white/5">
                                <Ionicons name="calendar-clear" size={16} color="#adadad" />
                                <Text className="ml-2 font-uber-bold text-xs text-secondary dark:text-white uppercase tracking-tighter">Later</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Refined Quick Actions */}
                <View className="px-6 mb-8 flex-row justify-between">
                    <QuickAction icon="home" label="Home" color="#00ff90" sub="Setup" />
                    <QuickAction icon="briefcase" label="Work" color="#3b82f6" sub="Setup" />
                    <QuickAction icon="add" label="New" color="#6366f1" sub="Save" />
                </View>

                {/* Premium Editorial Promo Section */}
                <View className="px-6 mb-10">
                    <TouchableOpacity className="rounded-[40px] bg-secondary dark:bg-zinc-900 p-8 flex-row items-center overflow-hidden border border-white/5">
                        {/* Decorative Gradient/Light Effect */}
                        <View className="absolute left-[-50] bottom-[-50] h-64 w-64 rounded-full bg-primary/20" />

                        <View className="flex-1">
                            <View className="bg-primary/20 self-start px-3 py-1 rounded-lg mb-4">
                                <Text className="text-primary font-uber-bold uppercase tracking-widest text-[10px]">VIP Travel</Text>
                            </View>
                            <Text className="text-white text-2xl font-uber-bold leading-9 pr-2">Airport Drop-off{'\n'}Made Simple</Text>
                            <TouchableOpacity className="mt-6 self-start bg-primary px-8 py-4 rounded-[20px]">
                                <Text className="text-secondary font-uber-bold uppercase tracking-tighter text-sm">Schedule Now</Text>
                            </TouchableOpacity>
                        </View>
                        <View className="absolute right-[-20] bottom-[-20] h-32 w-32 items-center justify-center">
                            <Ionicons name="airplane" size={120} color="#00ff90" style={{ transform: [{ rotate: '-45deg' }], opacity: 0.2 }} />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Modern History List */}
                <View className="px-6 mb-10">
                    <View className="flex-row items-center justify-between mb-8">
                        <Text className="text-xl font-uber-bold text-secondary dark:text-white">Recent History</Text>
                        <TouchableOpacity>
                            <Text className="text-primary font-uber-bold text-sm">See All</Text>
                        </TouchableOpacity>
                    </View>

                    {RECENT_HISTORY.map((item) => (
                        <TouchableOpacity key={item.id} className="flex-row items-center mb-8">
                            <View className="h-14 w-14 items-center justify-center rounded-[20px] bg-gray-50 dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 mr-5">
                                <Ionicons name={item.icon as any} size={22} color="#adadad" />
                            </View>
                            <View className="flex-1">
                                <View className="flex-row items-center">
                                    <Text className="text-lg font-uber-bold text-secondary dark:text-white mr-2">{item.title}</Text>
                                    {item.tag && (
                                        <View className="px-2 py-0.5 rounded-md bg-primary/10">
                                            <Text className="text-[10px] font-uber-bold text-secondary dark:text-white uppercase">{item.tag}</Text>
                                        </View>
                                    )}
                                </View>
                                <Text className="text-sm font-uber text-accent-gray dark:text-zinc-500 mt-1 leading-5">{item.subtitle}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={18} color="#71717a" />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Bento Grid - Dash Services Discovery */}
                <View className="px-6 mb-12">
                    <Text className="text-xl font-uber-bold text-secondary dark:text-white mb-6">Dash Direct</Text>
                    <View className="flex-row flex-wrap gap-4">
                        {/* Featured Large Card */}
                        <DashServiceCard
                            icon="car-sport"
                            title="Express"
                            desc="Fastest direct path to your destination"
                            color="#00ff90"
                            className="w-full"
                            isLarge
                        />

                        {/* Mid-sized Grid */}
                        <View className="flex-row w-full gap-4">
                            <DashServiceCard
                                icon="people-circle"
                                title="Carpool"
                                desc="Share cost"
                                color="#a855f7"
                                className="flex-1"
                            />
                            <DashServiceCard
                                icon="calendar"
                                title="Advanced"
                                desc="Pre-book"
                                color="#3b82f6"
                                className="flex-1"
                            />
                        </View>

                        <View className="flex-row w-full gap-4">
                            <DashServiceCard
                                icon="people-sharp"
                                title="Family"
                                desc="Kids & Pets"
                                color="#fbbf24"
                                className="flex-1"
                            />
                            <DashServiceCard
                                icon="briefcase"
                                title="Work"
                                desc="Business"
                                color="#6366f1"
                                className="flex-1"
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const QuickAction = ({ icon, label, color, sub }: { icon: any, label: string, color: string, sub: string }) => (
    <TouchableOpacity className="flex-1 mx-1.5 items-center">
        <View style={{ backgroundColor: color + '10' }} className="h-16 w-16 mb-3 rounded-[24px] items-center justify-center border border-white dark:border-zinc-800 shadow-sm shadow-black/5 dark:shadow-none">
            <Ionicons name={icon} size={26} color={color} />
        </View>
        <Text className="text-sm font-uber-bold text-secondary dark:text-white mb-0.5">{label}</Text>
        <Text className="text-[10px] font-uber-bold text-accent-gray dark:text-zinc-500 uppercase tracking-widest">{sub}</Text>
    </TouchableOpacity>
);

const DashServiceCard = ({ icon, title, desc, color, className, isLarge }: { icon: any, title: string, desc: string, color: string, className?: string, isLarge?: boolean }) => (
    <TouchableOpacity
        className={`bg-white dark:bg-zinc-900 rounded-[32px] p-6 border border-gray-50 dark:border-zinc-800 shadow-sm shadow-black/5 dark:shadow-none ${className}`}
    >
        <View className={`${isLarge ? 'flex-row items-center justify-between mb-2' : ''}`}>
            <View style={{ backgroundColor: color + '15' }} className={`${isLarge ? 'h-14 w-14' : 'h-12 w-12'} rounded-[20px] items-center justify-center ${isLarge ? '' : 'mb-4'}`}>
                <Ionicons name={icon} size={isLarge ? 28 : 24} color={color === '#00ff90' ? '#006654' : color} />
            </View>
            {isLarge && (
                <View className="bg-primary/20 px-3 py-1 rounded-full">
                    <Text className="text-primary text-[10px] font-uber-bold uppercase">Popular</Text>
                </View>
            )}
        </View>
        <View>
            <Text className={`${isLarge ? 'text-xl' : 'text-base'} font-uber-bold text-secondary dark:text-white mb-1`}>{title}</Text>
            <Text className={`${isLarge ? 'text-sm' : 'text-xs'} font-uber text-accent-gray dark:text-zinc-500 opacity-80`} numberOfLines={isLarge ? 2 : 1}>{desc}</Text>
        </View>
    </TouchableOpacity>
);
