import React, { useState, useMemo } from 'react';
import { StyleSheet, View, FlatList, Pressable, ScrollView } from 'react-native';
import { Text } from '../../components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useOrderStore } from '../../src/store/useOrderStore';
import { useRealtimeOrders } from '../../src/hooks/useRealtimeOrders';
import OrderCard from '../../src/components/OrderCard';
import { useStoreContext } from '../../src/store/useStoreContext';

const TABS = [
    { id: 'new', label: 'New' },
    { id: 'in_progress', label: 'Prep' },
    { id: 'ready', label: 'Ready' },
    { id: 'history', label: 'History' },
    { id: 'unfulfilled', label: 'Issues' },
];

export default function OrdersScreen() {
    const [activeTab, setActiveTab] = useState('new');
    const { orders } = useOrderStore();
    const { activeStoreId } = useStoreContext();
    // Realtime subscription (using an example storeId)
    useRealtimeOrders();

    const filteredOrders = useMemo(() => {
        return orders.filter(order => {
            const matchesTab = activeTab === 'history'
                ? order.status === 'completed'
                : order.status === activeTab;

            const matchesStore = !activeStoreId || order.store_id === activeStoreId;

            return matchesTab && matchesStore;
        });
    }, [orders, activeTab, activeStoreId]);

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <Text style={styles.title}>Orders</Text>
            </View>

            <View style={styles.tabBarContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabBar}>
                    {TABS.map((tab) => (
                        <Pressable
                            key={tab.id}
                            onPress={() => setActiveTab(tab.id)}
                            style={[
                                styles.tab,
                                activeTab === tab.id && styles.activeTab
                            ]}
                        >
                            <Text style={[
                                styles.tabLabel,
                                activeTab === tab.id && styles.activeTabLabel
                            ]}>
                                {tab.label}
                            </Text>
                            {orders.filter(o => o.status === tab.id).length > 0 && (
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>
                                        {orders.filter(o => o.status === tab.id).length}
                                    </Text>
                                </View>
                            )}
                        </Pressable>
                    ))}
                </ScrollView>
            </View>

            <FlatList
                data={filteredOrders}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <OrderCard order={item} />}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No {activeTab.replace('_', ' ')} orders found</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    header: {
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 16,
    },
    title: {
        fontSize: 34,
        fontWeight: '800',
        color: '#FFFFFF',
        letterSpacing: -0.5,
    },
    tabBarContainer: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.05)',
        marginBottom: 8,
    },
    tabBar: {
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    tab: {
        paddingHorizontal: 18,
        paddingVertical: 10,
        marginRight: 10,
        borderRadius: 14,
        backgroundColor: '#1C1C1E',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    activeTab: {
        backgroundColor: '#007AFF',
        borderColor: '#007AFF',
    },
    tabLabel: {
        fontSize: 15,
        fontWeight: '700',
        color: '#8E8E93',
    },
    activeTabLabel: {
        color: '#FFFFFF',
    },
    badge: {
        backgroundColor: '#FF3B30',
        borderRadius: 8,
        minWidth: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
        paddingHorizontal: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    badgeText: {
        color: '#FFFFFF',
        fontSize: 11,
        fontWeight: '800',
    },
    listContent: {
        padding: 20,
        paddingBottom: 40,
    },
    emptyContainer: {
        marginTop: 120,
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    emptyText: {
        color: '#8E8E93',
        fontSize: 17,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 16,
    },
});
