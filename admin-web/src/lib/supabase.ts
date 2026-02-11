import { createClient } from '@supabase/supabase-js';

// These should be set in .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Real-time Channel Subscriptions (Agent-Beta)
 */
export const subscribeToNegotiations = (callback: (payload: any) => void) => {
    return supabase
        .channel('negotiations_channel')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'negotiations' },
            (payload) => callback(payload)
        )
        .subscribe();
};

export const subscribeToTelemetry = (callback: (payload: any) => void) => {
    return supabase
        .channel('telemetry_channel')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'telemetry' },
            (payload) => callback(payload)
        )
        .subscribe();
};
