import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { Text } from '../../components/Themed';
import { Ionicons } from '@expo/vector-icons';

interface Issue {
    id: string;
    type: 'missing_item' | 'late' | 'wrong_order' | 'refund' | 'complaint';
    severity: 'low' | 'medium' | 'high' | 'critical';
    status: 'open' | 'reviewing' | 'resolved' | 'escalated';
    created_at: string;
    orders: {
        customer_name: string;
        total_amount: number;
    };
}

const SEVERITY_COLORS = {
    low: '#4CAF50',
    medium: '#FF9800',
    high: '#F44336',
    critical: '#B71C1C',
};

const TYPE_LABELS = {
    missing_item: 'Missing Item',
    late: 'Late Delivery',
    wrong_order: 'Wrong Order',
    refund: 'Refund Request',
    complaint: 'Customer Complaint',
};

export default function IssueCard({ issue }: { issue: Issue }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={[styles.severityBadge, { backgroundColor: SEVERITY_COLORS[issue.severity] }]}>
                    <Text style={styles.severityText}>{issue.severity.toUpperCase()}</Text>
                </View>
                <Text style={styles.date}>
                    {new Date(issue.created_at).toLocaleDateString()}
                </Text>
            </View>

            <Text style={styles.type}>{TYPE_LABELS[issue.type]}</Text>

            <View style={styles.orderInfo}>
                <Ionicons name="person-outline" size={16} color="#888" />
                <Text style={styles.customerName}>{issue.orders?.customer_name || 'Unknown Customer'}</Text>
                <Text style={styles.orderAmount}> • ${issue.orders?.total_amount.toFixed(2)}</Text>
            </View>

            <View style={styles.footer}>
                <View style={styles.statusContainer}>
                    <View style={[styles.statusDot, { backgroundColor: issue.status === 'open' ? '#F44336' : '#4CAF50' }]} />
                    <Text style={styles.statusText}>{issue.status.replace('_', ' ')}</Text>
                </View>
                <Pressable style={styles.detailLink}>
                    <Text style={styles.detailLinkText}>View Details</Text>
                    <Ionicons name="chevron-forward" size={14} color="#2196F3" />
                </Pressable>
            </View>
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
        alignItems: 'center',
        marginBottom: 12,
    },
    severityBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    severityText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#fff',
    },
    date: {
        fontSize: 12,
        opacity: 0.4,
    },
    type: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    orderInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    customerName: {
        fontSize: 14,
        opacity: 0.6,
        marginLeft: 6,
    },
    orderAmount: {
        fontSize: 14,
        opacity: 0.6,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'rgba(150, 150, 150, 0.1)',
        paddingTop: 12,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },
    statusText: {
        fontSize: 13,
        fontWeight: '600',
        textTransform: 'capitalize',
    },
    detailLink: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailLinkText: {
        fontSize: 14,
        color: '#2196F3',
        fontWeight: '600',
        marginRight: 2,
    },
});
