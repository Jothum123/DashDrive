import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Switch, Pressable } from 'react-native';
import { Text } from '@/components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../src/lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../src/store/useAuthStore';

interface Store {
    id: string;
    name: string;
    location: string;
    status: 'open' | 'closed' | 'busy';
}

export default function StoresScreen() {
    const [stores, setStores] = useState<Store[]>([]);
    const [loading, setLoading] = useState(true);
    const { hasRole } = useAuthStore();

    useEffect(() => {
        fetchStores();
    }, []);

    const fetchStores = async () => {
        try {
            const { data, error } = await supabase
                .from('stores')
                .select('*');

            if (error) throw error;
            setStores(data || []);
        } catch (error) {
            console.error('Error fetching stores:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleStoreStatus = async (storeId: string, currentStatus: string) => {
        const nextStatus = currentStatus === 'open' ? 'closed' : 'open';
        try {
            const { error } = await supabase
                .from('stores')
                .update({ status: nextStatus })
                .eq('id', storeId);

            if (error) throw error;
            setStores(stores.map(s => s.id === storeId ? { ...s, status: nextStatus as any } : s));
        } catch (error) {
            console.error('Error toggling store status:', error);
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <Text style={styles.title}>My Stores</Text>
                <Text style={styles.subtitle}>Manage your restaurant locations</Text>
            </View>

            <FlatList
                data={stores}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.storeCard}>
                        <View style={styles.storeInfo}>
                            <Text style={styles.storeName}>{item.name}</Text>
                            <Text style={styles.storeLocation}>{item.location}</Text>
                        </View>
                        <View style={styles.storeActions}>
                            <View style={styles.statusLabelContainer}>
                                <View style={[
                                    styles.statusIndicator,
                                    { backgroundColor: item.status === 'open' ? '#4CAF50' : '#F44336' }
                                ]} />
                                <Text style={styles.statusLabel}>
                                    {item.status.toUpperCase()}
                                </Text>
                            </View>
                            <Switch
                                value={item.status === 'open'}
                                onValueChange={() => toggleStoreStatus(item.id, item.status)}
                                disabled={!hasRole(['manager', 'owner'])}
                                trackColor={{ false: '#767577', true: '#4CAF50' }}
                                thumbColor="#f4f3f4"
                            />
                        </View>
                    </View>
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>{loading ? 'Loading stores...' : 'No stores found'}</Text>
                    </View>
                }
                contentContainerStyle={styles.listContent}
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
        marginBottom: 10,
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
    storeCard: {
        backgroundColor: 'rgba(150, 150, 150, 0.05)',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    storeInfo: {
        flex: 1,
    },
    storeName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    storeLocation: {
        fontSize: 14,
        opacity: 0.5,
        marginTop: 2,
    },
    storeActions: {
        alignItems: 'flex-end',
    },
    statusLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    statusIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },
    statusLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        opacity: 0.7,
    },
    listContent: {
        padding: 20,
    },
    emptyContainer: {
        marginTop: 100,
        alignItems: 'center',
    },
    emptyText: {
        opacity: 0.4,
    },
});
