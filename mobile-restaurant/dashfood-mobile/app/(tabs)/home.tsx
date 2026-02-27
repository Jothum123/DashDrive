import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Pressable, Modal, FlatList } from 'react-native';
import { Text } from '../../components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import KPIWidget from '../../src/components/KPIWidget';
import ActivityItem from '../../src/components/ActivityItem';
import { useStoreContext } from '../../src/store/useStoreContext';
import { supabase } from '../../src/lib/supabase';

export default function HomeScreen() {
    const { activeStoreId, setActiveStoreId } = useStoreContext();
    const [stores, setStores] = useState<any[]>([]);
    const [showSelector, setShowSelector] = useState(false);

    useEffect(() => {
        fetchStores();
    }, []);

    const fetchStores = async () => {
        const { data } = await supabase.from('stores').select('id, name');
        setStores(data || []);
        if (data && data.length > 0 && !activeStoreId) {
            setActiveStoreId(data[0].id);
        }
    };

    const activeStore = stores.find(s => s.id === activeStoreId);

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.title}>Dashboard</Text>
                        <Pressable style={styles.storeSelector} onPress={() => setShowSelector(true)}>
                            <Text style={styles.storeName}>{activeStore?.name || 'All Stores'}</Text>
                            <Ionicons name="chevron-down" size={16} color="#888" style={{ marginLeft: 4 }} />
                        </Pressable>
                    </View>
                    <Text style={styles.subtitle}>Overview of your restaurant's performance</Text>
                </View>

                <Modal visible={showSelector} transparent animationType="fade">
                    <Pressable style={styles.modalOverlay} onPress={() => setShowSelector(false)}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Switch Store</Text>
                            <FlatList
                                data={[{ id: null, name: 'All Stores' }, ...stores]}
                                keyExtractor={(item) => (item.id || 'all')}
                                renderItem={({ item }) => (
                                    <Pressable
                                        style={styles.storeOption}
                                        onPress={() => {
                                            setActiveStoreId(item.id);
                                            setShowSelector(false);
                                        }}
                                    >
                                        <Text style={[styles.storeOptionText, activeStoreId === item.id && styles.activeStoreOption]}>
                                            {item.name}
                                        </Text>
                                        {activeStoreId === item.id && <Ionicons name="checkmark" size={20} color="#2196F3" />}
                                    </Pressable>
                                )}
                            />
                        </View>
                    </Pressable>
                </Modal>

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
    storeSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    storeName: {
        fontSize: 16,
        color: '#2196F3',
        fontWeight: '600',
    },
    subtitle: {
        fontSize: 16,
        opacity: 0.6,
        marginTop: 4,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#1C1C1E',
        borderRadius: 20,
        padding: 20,
        maxHeight: '60%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    storeOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(150,150,150,0.1)',
    },
    storeOptionText: {
        fontSize: 18,
        opacity: 0.8,
    },
    activeStoreOption: {
        color: '#2196F3',
        fontWeight: 'bold',
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

