import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../../components/Themed';
import { Ionicons } from '@expo/vector-icons';

interface ActivityItemProps {
    type: 'order' | 'issue' | 'system';
    title: string;
    time: string;
    description: string;
}

const TYPE_CONFIG = {
    order: { icon: 'receipt-outline', color: '#4CAF50' },
    issue: { icon: 'alert-circle-outline', color: '#F44336' },
    system: { icon: 'settings-outline', color: '#2196F3' },
};

export default function ActivityItem({ type, title, time, description }: ActivityItemProps) {
    const config = TYPE_CONFIG[type];

    return (
        <View style={styles.container}>
            <View style={[styles.iconContainer, { backgroundColor: `${config.color}15` }]}>
                <Ionicons name={config.icon as any} size={20} color={config.color} />
            </View>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.time}>{time}</Text>
                </View>
                <Text style={styles.description}>{description}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(150, 150, 150, 0.1)',
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    content: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
    },
    time: {
        fontSize: 12,
        opacity: 0.4,
    },
    description: {
        fontSize: 14,
        opacity: 0.6,
    },
});
