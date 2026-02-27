import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';

interface KPIWidgetProps {
    label: string;
    value: string;
    trend: string;
    icon: keyof typeof Ionicons.glyphMap;
    color: string;
}

export default function KPIWidget({ label, value, trend, icon, color }: KPIWidgetProps) {
    const isPositive = trend.startsWith('+');
    const isNeutral = !trend.startsWith('+') && !trend.startsWith('-');

    return (
        <View style={styles.container}>
            <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
                <Ionicons name={icon} size={24} color={color} />
            </View>
            <View style={styles.content}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.value}>{value}</Text>
                <View style={styles.trendContainer}>
                    <Text style={[
                        styles.trend,
                        { color: isPositive ? '#4CAF50' : isNeutral ? '#888' : '#F44336' }
                    ]}>
                        {trend}
                    </Text>
                    <Text style={styles.trendLabel}> vs yesterday</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '48%',
        backgroundColor: 'rgba(150, 150, 150, 0.05)',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        flexDirection: 'column',
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    content: {
        flexDirection: 'column',
    },
    label: {
        fontSize: 14,
        opacity: 0.6,
        marginBottom: 4,
    },
    value: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    trendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    trend: {
        fontSize: 12,
        fontWeight: '600',
    },
    trendLabel: {
        fontSize: 12,
        opacity: 0.4,
    },
});
