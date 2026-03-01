import { supabase } from "../lib/supabase";
import axios from "axios";
import { auditLogService } from "./auditLogService";
import { offlineQueue } from "./offlineQueue";
// Integration note: User should install @react-native-community/netinfo
// import NetInfo from "@react-native-community/netinfo";

// This should be your external naming backend URL
const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL || "https://your-node-backend.com";

export const orderService = {
    /**
   * Update order status in Supabase and sync with external backend
   */
    async updateOrderStatus(orderId: string, status: string, externalOrderId?: string, userId?: string, reason?: string) {
        try {
            // Check connectivity (Simplified for now, expecting NetInfo integration)
            const isOnline = true; // TODO: Wire this to NetInfo.fetch().isConnected

            if (!isOnline) {
                // Offline Fallback: Queue the update with a local timestamp
                const timestamp = new Date().toISOString();
                offlineQueue.add({
                    orderId,
                    status,
                    externalOrderId,
                    userId,
                    reason,
                    timestamp
                });

                // Optional: Optimistic local update via Supabase if direct access is allowed
                // This will be overwritten by the authoritative backend sync later
                return { success: true, offline: true };
            }

            // ==========================================
            // 🚀 AUTHORITATIVE BACKEND PATH (ENTERPRISE)
            // ==========================================
            // Canonical API call - Server sets timestamps and broadcasts via Socket.io
            const response = await axios.patch(`${BACKEND_URL}/api/orders/status`, {
                orderId,
                status,
                reason,
                userId // For backend-side audit logging
            });

            if (response.status !== 200) {
                throw new Error("Backend status update failed");
            }

            // Sync with Node backend (Historical sync logic if still needed separately)
            if (externalOrderId && !BACKEND_URL.includes("/api/orders/status")) {
                await axios.patch(`${BACKEND_URL}/api/orders/${externalOrderId}/status`, {
                    status,
                    reason,
                });
            }

            return { success: true, data: response.data };
        } catch (error) {
            console.error("Error updating order status:", error);
            return { success: false, error };
        }
    },

    async fetchOrders(storeId: string) {
        const { data, error } = await supabase
            .from("orders")
            .select("*")
            .eq("store_id", storeId)
            .order("created_at", { ascending: false });

        if (error) throw error;
        return data;
    },

    /**
     * Fetch store metrics for the dashboard
     */
    async fetchStoreMetrics(storeId: string) {
        const { data, error } = await supabase.rpc('get_store_metrics', {
            p_store_id: storeId
        });

        if (error) throw error;
        return data;
    },

    /**
     * Fetch items for a specific order
     */
    async fetchOrderItems(orderId: string) {
        const { data, error } = await supabase
            .from('order_items')
            .select('*')
            .eq('order_id', orderId);

        if (error) throw error;
        return data;
    }
};
