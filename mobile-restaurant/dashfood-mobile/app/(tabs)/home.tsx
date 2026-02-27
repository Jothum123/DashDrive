import React from 'react';
import { StyleSheet, ScrollView, View, Pressable } from 'react-native';
import { Text } from '../../components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import KPIWidget from '../../src/components/KPIWidget';
import ActivityItem from '../../src/components/ActivityItem';

export default function HomeScreen() {
    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.title}>Dashboard</Text>
                    <Text style={styles.subtitle}>Overview of your restaurant's performance</Text>
                </View>

                <View style={styles.kpiGrid}>
                    <KPIWidget
                        label="Orders Today"
                        value="42"
                        trend="+12%"
                        icon="receipt-outline"
                        color="#4CAF50"
                    />
                    <KPIWidget
                        label="Revenue"
                        value="$1,280"
                        trend="+8.5%"
                        icon="cash-outline"
                        color="#2196F3"
                    />
                    <KPIWidget
                        label="Avg Prep Time"
                        value="14 min"
                        trend="-2 min"
                        icon="time-outline"
                        color="#FF9800"
                    />
                    <KPIWidget
                        label="Issues"
                        value="2"
                        trend="-1"
                        icon="alert-circle-outline"
                        color="#F44336"
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <View style={styles.quickActionsGrid}>
                        <Pressable style={styles.quickAction}>
                            <View style={[styles.actionIcon, { backgroundColor: '#F4433615' }]}>
                                <Ionicons name="pause-circle-outline" size={24} color="#F44336" />
                            </View>
                            <Text style={styles.actionLabel}>Pause Orders</Text>
                        </Pressable>
                        <Pressable style={styles.quickAction}>
                            <View style={[styles.actionIcon, { backgroundColor: '#FF980015' }]}>
                                <Ionicons name="fast-food-outline" size={24} color="#FF9800" />
                            </View>
                            <Text style={styles.actionLabel}>Mark Stockout</Text>
                        </Pressable>
                        <Pressable style={styles.quickAction}>
                            <View style={[styles.actionIcon, { backgroundColor: '#2196F315' }]}>
                                <Ionicons name="chatbubble-ellipses-outline" size={24} color="#2196F3" />
                            </View>
                            <Text style={styles.actionLabel}>Support</Text>
                        </Pressable>
                        <Pressable style={styles.quickAction}>
                            <View style={[styles.actionIcon, { backgroundColor: '#4CAF5015' }]}>
                                <Ionicons name="print-outline" size={24} color="#4CAF50" />
                            </View>
                            <Text style={styles.actionLabel}>Terminal</Text>
                        </Pressable>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Live Activity</Text>
                    <View style={styles.activityCard}>
                        <ActivityItem
                            type="order"
                            title="New Order #F23A"
                            time="2m ago"
                            description="John Doe • $28.50"
                        />
                        <ActivityItem
                            type="issue"
                            title="Refund Requested"
                            time="15m ago"
                            description="Order #A12B • $14.20"
                        />
                        <ActivityItem
                            type="system"
                            title="Store Status Changed"
                            time="1h ago"
                            description="Main St. Store marked as Busy"
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
    },
    header: {
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
        opacity: 0.6,
        marginTop: 4,
    },
    kpiGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    section: {
        marginTop: 10,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 12,
    },
    quickActionsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    quickAction: {
        width: '23%',
        alignItems: 'center',
    },
    actionIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    actionLabel: {
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'center',
        opacity: 0.7,
    },
    activityCard: {
        backgroundColor: 'rgba(150, 150, 150, 0.05)',
        borderRadius: 16,
        paddingHorizontal: 16,
    },
});

