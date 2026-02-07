import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { StyledIonicons, StyledSafeAreaView } from "../src/lib/interop";
import { useSavedPlacesStore } from "../src/lib/store";

const RECENT_HISTORY = [
    { id: "1", title: "Emily Homes Subd Ph 2", subtitle: "Cabantian, Davao City", icon: "time-sharp" },
    { id: "2", title: "Bangoy Int'l Airport", subtitle: "Sasa, Davao City", icon: "airplane", tag: "Travel" },
    { id: "3", title: "Buddy Store", subtitle: "Malagamot Road, Communal", icon: "time-sharp" },
];

export default function SearchScreen() {
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const { home, work, custom } = useSavedPlacesStore();

    return (
        <StyledSafeAreaView className="flex-1 bg-white dark:bg-black">
            {/* Elevated Header */}
            <View className="px-6 pt-10 flex-row items-center justify-between z-50">
                <View className="flex-row items-center">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-secondary shadow-lg mr-4"
                    >
                        <StyledIonicons name="arrow-back" size={22} color={colorScheme === 'dark' ? 'white' : 'black'} />
                    </TouchableOpacity>

                    <Text className="text-2xl font-uber-bold text-secondary dark:text-white">Ride</Text>
                </View>

                <TouchableOpacity
                    onPress={() => router.push("/search/map-picker" as any)}
                    className="flex-row items-center bg-accent-light/30 dark:bg-zinc-800/30 px-4 py-2 rounded-full border border-accent-light/50 dark:border-zinc-700/50"
                >
                    <StyledIonicons name="map-outline" size={16} color={colorScheme === 'dark' ? 'white' : 'black'} />
                    <Text className="ml-2 font-uber-bold text-xs text-secondary dark:text-white">Map</Text>
                </TouchableOpacity>
            </View>

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
                                <StyledIonicons name="calendar-clear" size={16} color="#adadad" />
                                <Text className="ml-2 font-uber-bold text-xs text-secondary dark:text-white uppercase tracking-tighter">Later</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
                                <StyledIonicons name={item.icon as any} size={22} color="#adadad" />
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
                            <StyledIonicons name="chevron-forward" size={18} color="#71717a" />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Refined Quick Actions with Navigation Heading */}
                <View className="px-6 mb-4">
                    <TouchableOpacity
                        onPress={() => router.push("/search/choose-place" as any)}
                        className="flex-row items-center justify-between mb-4"
                    >
                        <Text className="text-xl font-uber-bold text-secondary dark:text-white">Saved Places</Text>
                        <View className="h-8 w-8 items-center justify-center rounded-full bg-gray-50 dark:bg-zinc-800">
                            <StyledIonicons
                                name="chevron-forward"
                                size={20}
                                color={colorScheme === 'dark' ? 'white' : 'black'}
                            />
                        </View>
                    </TouchableOpacity>

                    <View className="flex-row justify-between mb-6">
                        <QuickAction
                            icon="home"
                            label={home ? home.title : "Add Home"}
                            color="#00ff90"
                            sub={home ? home.address : "Setup"}
                            onPress={() => router.push({ pathname: "/search/map-picker", params: { type: 'home' } } as any)}
                        />
                        <QuickAction
                            icon="briefcase"
                            label={work ? work.title : "Add Work"}
                            color="#3b82f6"
                            sub={work ? work.address : "Setup"}
                            onPress={() => router.push({ pathname: "/search/map-picker", params: { type: 'work' } } as any)}
                        />
                        <QuickAction
                            icon="add"
                            label="Add New"
                            color="#6366f1"
                            sub="Save"
                            onPress={() => router.push({ pathname: "/search/map-picker", params: { type: 'custom' } } as any)}
                        />
                    </View>
                </View>

                {/* Always using the same locations? Info Section */}
                <View className="px-6 mb-10 items-center justify-center pt-10">
                    <View className="h-40 w-40 bg-gray-50/50 dark:bg-zinc-800/20 rounded-full items-center justify-center mb-8">
                        <StyledIonicons name="location" size={80} color={colorScheme === 'dark' ? '#333' : '#eee'} />
                        <View className="absolute top-8 right-8 h-10 w-10 bg-primary/20 rounded-full items-center justify-center">
                            <StyledIonicons name="heart" size={20} color="#00ff90" />
                        </View>
                    </View>
                    <Text className="text-xl font-uber-bold text-secondary dark:text-white mb-2 text-center">
                        Always using the same locations?
                    </Text>
                    <Text className="text-sm font-uber text-accent-gray dark:text-zinc-500 text-center px-10">
                        Save them and make your bookings easily.
                    </Text>
                </View>

                {/* Redesigned VIP Travel Card (Airport Drop-off) */}
                <View className="px-6 mb-10">
                    <TouchableOpacity className="rounded-[40px] bg-[#CCEFFF] p-8 flex-row items-center overflow-hidden border border-white/20 shadow-sm">
                        <View className="flex-1">
                            <Text className="text-zinc-900 dark:text-zinc-900 text-2xl font-uber-bold leading-9 pr-2 mb-4">
                                Simplify your airport arrivals and departures.
                            </Text>
                            <TouchableOpacity className="self-start bg-white px-8 py-3 rounded-full shadow-sm">
                                <Text className="text-secondary font-uber-bold text-sm">Schedule ride</Text>
                            </TouchableOpacity>
                        </View>
                        <View className="absolute right-[-20] bottom-[-10] opacity-30">
                            <StyledIonicons name="airplane" size={140} color="#3b82f6" style={{ transform: [{ rotate: '-45deg' }] }} />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Bento Grid - Rides for your every need */}
                <View className="px-6 mb-12">
                    <Text className="text-xl font-uber-bold text-secondary dark:text-white mb-6">Your journey, simplified</Text>
                    <View className="flex-row flex-wrap gap-4">
                        {/* Featured Advance Booking Card */}
                        <DashServiceCard
                            icon="calendar"
                            title="Advance Booking"
                            desc=""
                            color="#3b82f6"
                            bgColor="#CCEFFF"
                            className="w-full h-44"
                            iconAtBottom
                        />

                        {/* Mid-sized Grid */}
                        <View className="flex-row w-full gap-4">
                            <DashServiceCard
                                icon="people"
                                title="Group ride"
                                desc=""
                                color="#65a30d"
                                bgColor="#E6F4A2"
                                className="flex-1 h-28"
                                iconRight
                            />
                            <DashServiceCard
                                icon="people-circle"
                                title="Family account"
                                desc=""
                                color="#d97706"
                                bgColor="#FFEFB0"
                                className="flex-1 h-28"
                                iconRight
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>

        </StyledSafeAreaView>
    );
}

const QuickAction = ({ icon, label, color, sub, onPress }: { icon: any, label: string, color: string, sub: string, onPress?: () => void }) => (
    <TouchableOpacity onPress={onPress} className="flex-1 mx-1.5 items-center">
        <View style={{ backgroundColor: color + '10' }} className="h-16 w-16 mb-3 rounded-[24px] items-center justify-center border border-white dark:border-zinc-800 shadow-sm shadow-black/5 dark:shadow-none">
            <StyledIonicons name={icon} size={26} color={color} />
        </View>
        <Text className="text-sm font-uber-bold text-secondary dark:text-white mb-0.5">{label}</Text>
        <Text className="text-[10px] font-uber-bold text-accent-gray dark:text-zinc-500 uppercase tracking-widest">{sub}</Text>
    </TouchableOpacity>
);

const DashServiceCard = ({ icon, title, desc, color, bgColor, className, isLarge, iconAtBottom, iconRight }: { icon: any, title: string, desc: string, color: string, bgColor?: string, className?: string, isLarge?: boolean, iconAtBottom?: boolean, iconRight?: boolean }) => (
    <TouchableOpacity
        style={bgColor ? { backgroundColor: bgColor } : {}}
        className={`${!bgColor ? 'bg-white dark:bg-zinc-900' : ''} rounded-[28px] p-5 border border-gray-50/10 dark:border-zinc-800 shadow-sm ${className}`}
    >
        <View className={`flex-1 ${iconRight ? 'flex-row items-center' : ''}`}>
            <View className="flex-1 justify-center">
                <Text className={`${isLarge ? 'text-xl' : 'text-sm'} font-uber-bold text-zinc-900 dark:text-zinc-900 mb-1`}>
                    {title}
                </Text>
                {desc ? (
                    <Text className={`${isLarge ? 'text-sm' : 'text-[10px]'} font-uber text-zinc-600 dark:text-zinc-600 opacity-80`} numberOfLines={2}>
                        {desc}
                    </Text>
                ) : null}
            </View>

            {(iconRight || iconAtBottom) && (
                <View className={`${iconAtBottom ? 'items-end mt-2' : 'ml-2'}`}>
                    <StyledIonicons name={icon} size={iconAtBottom ? 48 : 32} color={color} />
                </View>
            )}
        </View>

        {!iconRight && !iconAtBottom && (
            <View style={{ backgroundColor: color + '15' }} className="h-10 w-10 rounded-[16px] items-center justify-center mt-2">
                <StyledIonicons name={icon} size={22} color={color} />
            </View>
        )}
    </TouchableOpacity>
);
