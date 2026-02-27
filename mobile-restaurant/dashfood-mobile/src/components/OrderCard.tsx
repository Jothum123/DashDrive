import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { Text } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import StatusBadge from './StatusBadge';
import { orderService } from '@/src/services/orderService';

interface OrderItem {
    name: string;
    quantity: number;
}

interface Order {
    id: string;
    external_order_id?: string;
    customer_name: string;
    status: string;
    total_amount: number;
    created_at: string;
    accepted_at?: string;
    items?: OrderItem[];
}

export default function OrderCard({ order }: { order: Order }) {
    const [elapsed, setElapsed] = useState<string>('00:00');

    useEffect(() => {
        if (order.status === 'completed' || order.status === 'unfulfilled') {
            return;
        }

        const timer = setInterval(() => {
            const startTime = order.accepted_at ? new Date(order.accepted_at) : new Date(order.created_at);
            const seconds = Math.floor((new Date().getTime() - startTime.getTime()) / 1000);
            const m = Math.floor(seconds / 60);
            const s = seconds % 60;
            setElapsed(`${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
        }, 1000);

        return () => clearInterval(timer);
    }, [order.created_at, order.accepted_at, order.status]);

    const handleAction = async (nextStatus: string) => {
        // For demo purposes, we'll use a placeholder user ID
        await orderService.updateOrderStatus(order.id, nextStatus, order.external_order_id, 'manager_01');
    };

    const renderActions = () => {
        switch (order.status) {
            case 'new':
                return (
                    <View style={styles.actions}>
                        <Pressable
                            style={[styles.button, styles.acceptButton]}
                            onPress={() => handleAction('in_progress')}
                        >
                            <Text style={styles.buttonText}>Accept</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.rejectButton]}
                            onPress={() => handleAction('unfulfilled')}
                        >
                            <Text style={styles.rejectButtonText}>Reject</Text>
                        </Pressable>
                    </View>
                );
            case 'in_progress':
                return (
                    <Pressable
                        style={[styles.button, styles.readyButton]}
                        onPress={() => handleAction('ready')}
                    >
                        <Text style={styles.buttonText}>Mark Ready</Text>
                    </Pressable>
                );
            case 'ready':
                return (
                    <Pressable
                        style={[styles.button, styles.completeButton]}
                        onPress={() => handleAction('completed')}
                    >
                        <Text style={styles.buttonText}>Complete Order</Text>
                    </Pressable>
                );
            default:
                return null;
        }
    };

    const isLate = parseInt(elapsed.split(':')[0]) >= 15;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.orderId}>#{order.id.slice(0, 8).toUpperCase()}</Text>
                    <Text style={styles.customerName}>{order.customer_name}</Text>
                </View>
                <StatusBadge status={order.status} />
            </View>

            <View style={styles.divider} />

            <View style={styles.details}>
                <View style={styles.detailRow}>
                    <Ionicons name="time-outline" size={16} color={isLate ? "#F44336" : "#888"} />
                    <Text style={[styles.detailText, isLate && styles.lateText]}>
                        {order.status === 'completed' ? 'Finished' : elapsed}
                    </Text>
                </View>
                <View style={styles.detailRow}>
                    <Ionicons name="cash-outline" size={16} color="#888" />
                    <Text style={styles.detailText}>${order.total_amount.toFixed(2)}</Text>
                </View>
            </View>

            {renderActions()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(150, 150, 150, 0.05)',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    orderId: {
        fontSize: 14,
        fontWeight: 'bold',
        opacity: 0.5,
    },
    customerName: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 2,
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(150, 150, 150, 0.1)',
        marginBottom: 12,
    },
    details: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    detailText: {
        fontSize: 14,
        opacity: 0.6,
        marginLeft: 4,
    },
    lateText: {
        color: '#F44336',
        fontWeight: 'bold',
        opacity: 1,
    },
    actions: {
        flexDirection: 'row',
        gap: 10,
    },
    button: {
        flex: 1,
        height: 48,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    acceptButton: {
        backgroundColor: '#4CAF50',
    },
    rejectButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#F44336',
    },
    readyButton: {
        backgroundColor: '#2196F3',
    },
    completeButton: {
        backgroundColor: '#673AB7',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    rejectButtonText: {
        color: '#F44336',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
