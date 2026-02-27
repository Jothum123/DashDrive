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
        backgroundColor: '#000000',
    },
    header: {
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 24,
    },
    title: {
        fontSize: 34,
        fontWeight: '800',
        color: '#FFFFFF',
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 16,
        color: '#8E8E93',
        fontWeight: '500',
        marginTop: 6,
    },
    storeCard: {
        backgroundColor: '#1C1C1E',
        borderRadius: 24,
        padding: 24,
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    storeInfo: {
        flex: 1,
    },
    storeName: {
        fontSize: 20,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    storeLocation: {
        fontSize: 14,
        color: '#8E8E93',
        marginTop: 4,
        fontWeight: '500',
    },
    storeActions: {
        alignItems: 'flex-end',
        marginLeft: 16,
    },
    statusLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    statusIndicator: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 6,
    },
    statusLabel: {
        fontSize: 11,
        fontWeight: '800',
        color: '#FFFFFF',
        letterSpacing: 0.5,
    },
    listContent: {
        padding: 24,
        paddingBottom: 40,
    },
    emptyContainer: {
        marginTop: 120,
        alignItems: 'center',
    },
    emptyText: {
        color: '#8E8E93',
        fontSize: 17,
        fontWeight: '600',
    },
});
