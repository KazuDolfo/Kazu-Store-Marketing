const SUPABASE_URL = "https://ukktilhrpadjmadrlocr.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_P_BxPMpdaUZh-g9kAB74Pg_Ax7THddH";

const supabaseClient = (window.supabase && window.supabase.createClient) 
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) 
    : null;

window.kazuAdminDb = {
    client: supabaseClient,

    async getProducts() {
        if (!supabaseClient) return [];
        const { data, error } = await supabaseClient
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
        if (!supabaseClient) return [];
        const { data, error } = await supabaseClient
            .from('categories')
            .select('*')
            .is('deleted_at', null)
            .order('display_order', { ascending: true });
        if (error) return [];
        return data || [];
    },

    async saveProduct(productData) {
        if (!supabaseClient) return null;
        if (productData.id) {
            const { data, error } = await supabaseClient
                .from('products')
                .update(productData)
                .eq('id', productData.id)
                .select()
                .single();
            return error ? null : data;
        } else {
            const { data, error } = await supabaseClient
                .from('products')
                .insert([productData])
                .select()
                .single();
            return error ? null : data;
        }
    },

    async grantOrRedeemStamps(phone, amount, action, reason) {
        if (!supabaseClient || !phone) return { success: false, error: 'Sin conexión o teléfono' };
        
        let { data: client } = await supabaseClient
            .from('clients')
            .select('id, stamps_balance')
            .eq('phone', phone.trim())
            .maybeSingle();

        if (!client) {
            const { data: newClient, error: clientErr } = await supabaseClient
                .from('clients')
                .insert([{ phone: phone.trim() }])
                .select('id, stamps_balance')
                .single();
            if (clientErr) return { success: false, error: clientErr.message };
            client = newClient;
        }

        const delta = action === 'redeemed' ? -Math.abs(amount) : Math.abs(amount);
        const { data: ledger, error: ledgerErr } = await supabaseClient
            .from('stamps_ledger')
            .insert([{
                client_id: client.id,
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
        if (!supabaseClient) return null;
        const { data, error } = await supabaseClient
            .from('v_dashboard_metrics')
            .select('*')
            .single();
        if (error) return null;
        return data;
    },

    async getExpiringSubscriptions() {
        if (!supabaseClient) return [];
        const { data, error } = await supabaseClient
            .from('v_expiring_soon_subscriptions')
            .select('*');
        if (error) return [];
        return data || [];
    }
};
