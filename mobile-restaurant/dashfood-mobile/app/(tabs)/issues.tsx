import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Pressable } from 'react-native';
import { Text } from '@/components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '@/src/lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import IssueCard from '@/src/components/IssueCard';

export default function IssuesScreen() {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchIssues();
    }, []);

    const fetchIssues = async () => {
        try {
            const { data, error } = await supabase
                .from('issues')
                .select(`
          *,
          orders (
            customer_name,
            total_amount
          )
        `)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setIssues(data || []);
        } catch (error) {
            console.error('Error fetching issues:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Issues</Text>
                    <Text style={styles.subtitle}>Track disputes and losses</Text>
                </View>
                <Pressable style={styles.filterButton}>
                    <Ionicons name="filter-outline" size={24} color="#fff" />
                </Pressable>
            </View>

            <FlatList
                data={issues}
                keyExtractor={(item: any) => item.id}
                renderItem={({ item }) => <IssueCard issue={item} />}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="shield-checkmark-outline" size={64} color="rgba(150, 150, 150, 0.2)" />
                        <Text style={styles.emptyText}>All clear! No active issues found.</Text>
                    </View>
                }
                contentContainerStyle={styles.listContent}
                refreshing={loading}
                onRefresh={fetchIssues}
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    filterButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#2196F3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    listContent: {
        padding: 15,
    },
    emptyContainer: {
        marginTop: 100,
        alignItems: 'center',
    },
    emptyText: {
        opacity: 0.4,
        marginTop: 16,
        fontSize: 16,
    },
});
