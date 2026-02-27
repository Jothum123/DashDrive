import { supabase } from "../lib/supabase";
import axios from "axios";
import { auditLogService } from "./auditLogService";

// This should be your external naming backend URL
const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL || "https://your-node-backend.com";

export const orderService = {
    /**
   * Update order status in Supabase and sync with external backend
   */
    async updateOrderStatus(orderId: string, status: string, externalOrderId?: string, userId?: string, reason?: string) {
        try {
            // 1. Update Supabase
            const { data: orderData, error: fetchError } = await supabase
                .from("orders")
                .select("total_amount")
                .eq("id", orderId)
                .single();

            if (fetchError) throw fetchError;

            const { error: supabaseError } = await supabase
                .from("orders")
                .update({
                    status,
                    accepted_at: status === 'in_progress' ? new Date().toISOString() : undefined,
                    completed_at: status === 'completed' ? new Date().toISOString() : undefined,
                })
                .eq("id", orderId);

            if (supabaseError) throw supabaseError;

            // 2. If rejected/unfulfilled, log to unfulfilled_orders
            if (status === 'unfulfilled') {
                await supabase
                    .from("unfulfilled_orders")
                    .insert({
                        order_id: orderId,
                        reason: reason || 'Unknown',
                        revenue_loss: orderData.total_amount,
                    });
            }

            // 3. Audit Logging
            if (userId) {
                await auditLogService.logAction(
                    'order',
                    orderId,
                    `Status changed to ${status}${reason ? ` (Reason: ${reason})` : ''}`,
                    userId
                );
            }

            // 4. Sync back to Node backend
            if (externalOrderId) {
                await axios.patch(`${BACKEND_URL}/orders/${externalOrderId}/status`, {
                    status,
                    reason,
                });
            }

            return { success: true };
        } catch (error) {
            console.error("Error updating order status:", error);
            return { success: false, error };
        }
    },

    /**
     * Fetch initial orders for a store
     */
    async fetchOrders(storeId: string) {
        const { data, error } = await supabase
            .from("orders")
            .select("*")
            .eq("store_id", storeId)
            .order("created_at", { ascending: false });

        if (error) throw error;
        return data;
    },
};
