const SUPABASE_URL = "https://ukktilhrpadjmadrlocr.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_P_BxPMpdaUZh-g9kAB74Pg_Ax7THddH";

function getClient() {
    if (!window._kazuSupabaseClient && window.supabase && typeof window.supabase.createClient === 'function') {
        window._kazuSupabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    return window._kazuSupabaseClient || null;
}

window.kazuAdminDb = {
    getClient,

    async getProducts() {
        const client = getClient();
        if (!client) return [];
        const { data, error } = await client
            .from('products')
            .select('*, categories(name, slug)')
            .is('deleted_at', null)
            .order('name', { ascending: true });
        if (error) {
            console.error(error);
            return [];
        }
        return data || [];
    },

    async getCategories() {
        const client = getClient();
        if (!client) return [];
        const { data, error } = await client
            .from('categories')
            .select('*')
            .is('deleted_at', null)
            .order('display_order', { ascending: true });
        if (error) return [];
        return data || [];
    },

    async saveProduct(productData) {
        const client = getClient();
        if (!client) return null;
        if (productData.id) {
            const { data, error } = await client
                .from('products')
                .update(productData)
                .eq('id', productData.id)
                .select()
                .single();
            return error ? null : data;
        } else {
            const { data, error } = await client
                .from('products')
                .insert([productData])
                .select()
                .single();
            return error ? null : data;
        }
    },

    async grantOrRedeemStamps(phone, amount, action, reason) {
        const client = getClient();
        if (!client || !phone) return { success: false, error: 'Sin conexión a Supabase o número inválido' };
        
        let { data: clientData } = await client
            .from('clients')
            .select('id, stamps_balance')
            .eq('phone', phone.trim())
            .maybeSingle();

        if (!clientData) {
            const { data: newClient, error: clientErr } = await client
                .from('clients')
                .insert([{ phone: phone.trim() }])
                .select('id, stamps_balance')
                .single();
            if (clientErr) return { success: false, error: clientErr.message };
            clientData = newClient;
        }

        const delta = action === 'redeemed' ? -Math.abs(amount) : Math.abs(amount);
        const { data: ledger, error: ledgerErr } = await client
            .from('stamps_ledger')
            .insert([{
                client_id: clientData.id,
                amount: delta,
                action: action,
                reason: reason || (action === 'earned' ? 'Compra de servicio' : 'Canje de promoción'),
                balance_after: 0
            }])
            .select()
            .single();

        if (ledgerErr) return { success: false, error: ledgerErr.message };
        return { success: true, ledger };
    },

    async getDashboardMetrics() {
        const client = getClient();
        if (!client) return null;
        const { data, error } = await client
            .from('v_dashboard_metrics')
            .select('*')
            .single();
        if (error) return null;
        return data;
    },

    async getExpiringSubscriptions() {
        const client = getClient();
        if (!client) return [];
        const { data, error } = await client
            .from('v_expiring_soon_subscriptions')
            .select('*');
        if (error) return [];
        return data || [];
    }
};
