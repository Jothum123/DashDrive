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
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    tabBarContainer: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(150, 150, 150, 0.1)',
    },
    tabBar: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    tab: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginHorizontal: 5,
        borderRadius: 20,
        backgroundColor: 'rgba(150, 150, 150, 0.05)',
        flexDirection: 'row',
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: '#2196F3',
    },
    tabLabel: {
        fontSize: 14,
        fontWeight: '600',
        opacity: 0.7,
    },
    activeTabLabel: {
        color: '#fff',
        opacity: 1,
    },
    badge: {
        backgroundColor: '#F44336',
        borderRadius: 10,
        minWidth: 18,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 6,
        paddingHorizontal: 4,
    },
    badgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    listContent: {
        padding: 15,
        paddingBottom: 40,
    },
    emptyContainer: {
        marginTop: 100,
        alignItems: 'center',
    },
    emptyText: {
        opacity: 0.4,
        fontSize: 16,
    },
});
