import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Pressable, Alert } from 'react-native';
import { Text } from '../../components/Themed';
import { Ionicons } from '@expo/vector-icons';
import StatusBadge from './StatusBadge';
import { orderService } from '../services/orderService';
import { useAuthStore } from '../store/useAuthStore';

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

    const { user, hasRole } = useAuthStore();

    const handleAction = async (nextStatus: string, reason?: string) => {
        if (!user) return;
        await orderService.updateOrderStatus(order.id, nextStatus, order.external_order_id, user.id, reason);
    };

    const handleReject = () => {
        Alert.alert(
            "Reject Order",
            "Please select a reason for rejection",
            [
                { text: "Out of Stock", onPress: () => handleAction('unfulfilled', 'out_of_stock') },
                { text: "Too Busy", onPress: () => handleAction('unfulfilled', 'too_busy') },
                { text: "Kitchen Closed", onPress: () => handleAction('unfulfilled', 'kitchen_closed') },
                { text: "Cancel", style: "cancel" }
            ]
        );
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
                        {hasRole(['manager', 'owner']) && (
                            <Pressable
                                style={[styles.button, styles.rejectButton]}
                                onPress={handleReject}
                            >
                                <Text style={styles.rejectButtonText}>Reject</Text>
                            </Pressable>
                        )}
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
        backgroundColor: '#1E1E1E',
        borderRadius: 24,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 6,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    orderId: {
        fontSize: 12,
        fontWeight: '700',
        color: '#8E8E93',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    customerName: {
        fontSize: 20,
        fontWeight: '700',
        color: '#FFFFFF',
        marginTop: 4,
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        marginBottom: 16,
    },
    details: {
        flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: 12,
        padding: 12,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 24,
    },
    detailText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#FFFFFF',
        marginLeft: 6,
    },
    lateText: {
        color: '#FF453A',
    },
    actions: {
        flexDirection: 'row',
        gap: 12,
    },
    button: {
        flex: 1,
        height: 52,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    acceptButton: {
        backgroundColor: '#34C759',
    },
    rejectButton: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: '#FF453A',
    },
    readyButton: {
        backgroundColor: '#007AFF',
    },
    completeButton: {
        backgroundColor: '#AF52DE',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 16,
    },
    rejectButtonText: {
        color: '#FF453A',
        fontWeight: '700',
        fontSize: 16,
    },
});
