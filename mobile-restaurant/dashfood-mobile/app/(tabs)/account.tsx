import React from 'react';
import { StyleSheet, View, Pressable, ScrollView, Image } from 'react-native';
import { Text } from '@/components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/src/lib/supabase';

export default function AccountScreen() {
    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.profileHeader}>
                    <View style={styles.avatarPlaceholder}>
                        <Ionicons name="person" size={40} color="#fff" />
                    </View>
                    <Text style={styles.userName}>Restaurant Manager</Text>
                    <Text style={styles.userRole}>Store Owner • DashFood Enterprise</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Settings</Text>
                    <Pressable style={styles.menuItem}>
                        <View style={styles.menuItemLeft}>
                            <View style={[styles.menuIconContainer, { backgroundColor: '#2196F320' }]}>
                                <Ionicons name="notifications-outline" size={20} color="#2196F3" />
                            </View>
                            <Text style={styles.menuItemLabel}>Notifications</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color="#888" />
                    </Pressable>

                    <Pressable style={styles.menuItem}>
                        <View style={styles.menuItemLeft}>
                            <View style={[styles.menuIconContainer, { backgroundColor: '#4CAF5020' }]}>
                                <Ionicons name="shield-outline" size={20} color="#4CAF50" />
                            </View>
                            <Text style={styles.menuItemLabel}>Security</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color="#888" />
                    </Pressable>

                    <Pressable style={styles.menuItem}>
                        <View style={styles.menuItemLeft}>
                            <View style={[styles.menuIconContainer, { backgroundColor: '#FF980020' }]}>
                                <Ionicons name="key-outline" size={20} color="#FF9800" />
                            </View>
                            <Text style={styles.menuItemLabel}>API Keys</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color="#888" />
                    </Pressable>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Support</Text>
                    <Pressable style={styles.menuItem}>
                        <View style={styles.menuItemLeft}>
                            <View style={[styles.menuIconContainer, { backgroundColor: '#9C27B020' }]}>
                                <Ionicons name="help-circle-outline" size={20} color="#9C27B0" />
                            </View>
                            <Text style={styles.menuItemLabel}>Help Center</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color="#888" />
                    </Pressable>

                    <Pressable style={styles.menuItem}>
                        <View style={styles.menuItemLeft}>
                            <View style={[styles.menuIconContainer, { backgroundColor: '#607D8B20' }]}>
                                <Ionicons name="document-text-outline" size={20} color="#607D8B" />
                            </View>
                            <Text style={styles.menuItemLabel}>Terms of Service</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color="#888" />
                    </Pressable>
                </View>

                <Pressable style={styles.logoutButton} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={20} color="#F44336" />
                    <Text style={styles.logoutButtonText}>Log Out</Text>
                </Pressable>

                <Text style={styles.versionText}>dashFood Mobile v1.0.0</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 40,
        marginTop: 20,
    },
    avatarPlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#2196F3',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    userName: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    userRole: {
        fontSize: 14,
        opacity: 0.6,
        marginTop: 4,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        opacity: 0.4,
        textTransform: 'uppercase',
        marginBottom: 12,
        marginLeft: 4,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(150, 150, 150, 0.05)',
        padding: 12,
        borderRadius: 12,
        marginBottom: 8,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuIconContainer: {
        width: 36,
        height: 36,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    menuItemLabel: {
        fontSize: 16,
        fontWeight: '500',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(244, 67, 54, 0.2)',
        marginTop: 20,
    },
    logoutButtonText: {
        color: '#F44336',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    versionText: {
        textAlign: 'center',
        opacity: 0.3,
        fontSize: 12,
        marginTop: 30,
        marginBottom: 40,
    },
});
