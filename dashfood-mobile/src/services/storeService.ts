import { supabase } from "../lib/supabase";
import { useStoreSettings } from "../store/useStoreSettings";
import { useSLASettings } from "../store/useSLASettings";

export const storeService = {
    /**
     * Fetch store configuration from Supabase
     */
    async fetchStoreSettings(storeId: string) {
        try {
            const { data, error } = await supabase
                .from("stores")
                .select("acceptance_mode, sla_warning_minutes, sla_breach_minutes, escalation_roles, escalation_enabled")
                .eq("id", storeId)
                .single();

            if (error) throw error;

            if (data) {
                useStoreSettings.getState().setAcceptanceMode(
                    data.acceptance_mode as 'manual' | 'auto'
                );
                useSLASettings.getState().setSLA(
                    data.sla_warning_minutes || 10,
                    data.sla_breach_minutes || 20
                );
            }
            return data;
        } catch (error) {
            console.error("Error fetching store settings:", error);
            return null;
        }
    },

    /**
     * Update store configuration
     */
    async updateStoreSettings(storeId: string, updates: {
        acceptance_mode?: 'manual' | 'auto',
        sla_warning_minutes?: number,
        sla_breach_minutes?: number,
        escalation_roles?: string[],
        escalation_enabled?: boolean
    }) {
        try {
            const { error } = await supabase
                .from("stores")
                .update(updates)
                .eq("id", storeId);

            if (error) throw error;

            // Update local state
            if (updates.acceptance_mode) {
                useStoreSettings.getState().setAcceptanceMode(updates.acceptance_mode);
            }
            if (updates.sla_warning_minutes !== undefined || updates.sla_breach_minutes !== undefined) {
                const current = useSLASettings.getState();
                useSLASettings.getState().setSLA(
                    updates.sla_warning_minutes ?? current.warningMinutes,
                    updates.sla_breach_minutes ?? current.breachMinutes
                );
            }

            return { success: true };
        } catch (error) {
            console.error("Error updating store settings:", error);
            return { success: false, error };
        }
    }
};
