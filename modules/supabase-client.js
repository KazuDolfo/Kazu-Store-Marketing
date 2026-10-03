export const SUPABASE_CONFIG = {
  url: "https://ukktilhrpadjmadrlocr.supabase.co",
  anonKey: "sb_publishable_P_BxPMpdaUZh-g9kAB74Pg_Ax7THddH"
};

const OFFLINE_STAMPS_KEY = "kazustore_pending_stamps_v1";

class SupabaseService {
  constructor() {
    this.client = null;
    this.init();
  }

  init() {
    try {
      if (window.supabase && typeof window.supabase.createClient === "function") {
        this.client = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
      }
    } catch (e) {
      console.warn("Supabase init exception:", e);
    }
  }

  getClient() {
    if (!this.client && window.supabase) {
      this.init();
    }
    return this.client;
  }

  // Persistencia offline de transacciones de sellos
  savePendingStampLocal(record) {
    try {
      const pending = JSON.parse(localStorage.getItem(OFFLINE_STAMPS_KEY) || "[]");
      pending.push({ ...record, queued_at: new Date().toISOString() });
      localStorage.setItem(OFFLINE_STAMPS_KEY, JSON.stringify(pending));
    } catch (e) {
      console.warn("No se pudo guardar stamp offline:", e);
    }
  }

  getPendingStamps() {
    try {
      return JSON.parse(localStorage.getItem(OFFLINE_STAMPS_KEY) || "[]");
    } catch {
      return [];
    }
  }

  async getClientAudit(phone) {
    const cleanPhone = (phone || "").trim().replace(/[^\d+]/g, "").slice(0, 16);
    if (!cleanPhone || cleanPhone.length < 8) return null;

    const client = this.getClient();
    if (client && navigator.onLine) {
      try {
        const { data: clientRecord } = await client
          .from("clients")
          .select("id, phone, nickname, stamps_balance, referral_credits, referral_code, referred_by")
          .eq("phone", cleanPhone)
          .maybeSingle();

        if (clientRecord) {
          const { data: ledger } = await client
            .from("stamps_ledger")
            .select("id, amount, action, reason, festivity, created_at, balance_after")
            .eq("client_id", clientRecord.id)
            .order("created_at", { ascending: false });

          // Validar amigos calificados (que compraron)
          const myCode = clientRecord.referral_code || ('KZ-' + cleanPhone.slice(-4));
          const { data: refFriends } = await client
            .from("clients")
            .select("id, phone, stamps_balance")
            .eq("referred_by", myCode);

          const qualified = (refFriends || []).filter(f => (f.stamps_balance || 0) >= 2);

          return {
            source: "supabase",
            client: clientRecord,
            stamps_balance: clientRecord.stamps_balance || 0,
            referral_credits: clientRecord.referral_credits !== undefined ? Number(clientRecord.referral_credits) : qualified.length,
            qualified_friends: qualified.length,
            total_friends: (refFriends || []).length,
            ledger: ledger || []
          };
        }
      } catch (err) {
        console.warn("Fallo al auditar en Supabase, revisando caché local:", err);
      }
    }

    // Fallback a libro contable offline si no existe en la nube o no hay red
    const pending = this.getPendingStamps().filter(s => s.phone && s.phone.includes(cleanPhone));
    const totalOfflineStamps = pending.reduce((acc, curr) => acc + (curr.amount || 0), 0);
    if (pending.length > 0) {
      return {
        source: "local_ledger",
        client: { phone: cleanPhone, nickname: "Registro Local / Pendiente" },
        stamps_balance: totalOfflineStamps,
        referral_credits: 0,
        qualified_friends: 0,
        total_friends: 0,
        ledger: pending
      };
    }

    return null;
  }

  async getDashboardMetrics() {
    const client = this.getClient();
    if (!client || !navigator.onLine) {
      return this.getCachedMetrics();
    }
    try {
      const { data, error } = await client.from("v_dashboard_metrics").select("*").maybeSingle();
      if (error) throw error;
      if (data) {
        localStorage.setItem("kazustore_cached_metrics_v1", JSON.stringify(data));
      }
    } catch (e) {
      // Proyecto Supabase inactivo, pausado o sin red: fallback automático a caché local
      return this.getCachedMetrics();
    }
  }

  getCachedMetrics() {
    try {
      const cached = localStorage.getItem("kazustore_cached_metrics_v1");
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  }

  async getExpiringSubscriptions() {
    const client = this.getClient();
    if (!client || !navigator.onLine) {
      return this.getCachedExpiring();
    }
    try {
      const { data, error } = await client.from("v_expiring_soon_subscriptions").select("*").limit(10);
      if (error) throw error;
      if (data && data.length > 0) {
        localStorage.setItem("kazustore_cached_expiring_v1", JSON.stringify(data));
      }
      return data || [];
    } catch (e) {
      // Fallback silencioso a caché local
      return this.getCachedExpiring();
    }
  }

  getCachedExpiring() {
    try {
      const cached = localStorage.getItem("kazustore_cached_expiring_v1");
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  }

  async registerSubscription(clientData) {
    const { name, phone, serviceName, days, expiryDate, user, pin } = clientData;
    const cleanPhone = (phone || "").trim().replace(/[^\d+]/g, "").slice(0, 16);
    
    // 1. Guardado inmediato en LocalStorage (resiliente Offline-first)
    const localSubs = JSON.parse(localStorage.getItem("kazustore_local_subscriptions_v1") || "[]");
    const newSub = {
      id: "sub_" + Date.now(),
      client_name: name || "Cliente",
      client_phone: cleanPhone || phone || "Sin teléfono",
      product_name: serviceName,
      days_remaining: days,
      end_date: expiryDate,
      user: user || "",
      pin: pin || "",
      created_at: new Date().toISOString()
    };
    localSubs.unshift(newSub);
    localStorage.setItem("kazustore_local_subscriptions_v1", JSON.stringify(localSubs));

    // Mantener también en lista de suscripciones próximas para el widget
    const expiringList = this.getCachedExpiring();
    expiringList.unshift(newSub);
    localStorage.setItem("kazustore_cached_expiring_v1", JSON.stringify(expiringList.slice(0, 15)));

    // 2. Intentar sincronizar con Supabase Cloud si está disponible
    const client = this.getClient();
    if (client && navigator.onLine) {
      try {
        let { data: clientRecord } = await client
          .from("clients")
          .select("id")
          .eq("phone", cleanPhone)
          .maybeSingle();

        if (!clientRecord && cleanPhone) {
          const { data: created } = await client
            .from("clients")
            .insert([{ phone: cleanPhone, name: name || "Cliente" }])
            .select("id")
            .single();
          clientRecord = created;
        }

        if (clientRecord) {
          await client.from("subscriptions").insert([{
            client_id: clientRecord.id,
            product_name: serviceName,
            status: "active",
            end_date: new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString()
          }]);
        }
      } catch (err) {
        console.warn("No se pudo sincronizar suscripción con Supabase, queda en local:", err.message);
      }
    }

    return { success: true, subscription: newSub };
  }

  async registerStamp(phone, amount = 1, action = "earned", reason = "Compra KazuStore", festivity = "auto") {
    const cleanPhone = (phone || "").trim().replace(/[^\d+]/g, "").slice(0, 16);
    if (!cleanPhone || cleanPhone.length < 8) return { success: false, error: "Teléfono no válido" };

    const safeAmount = Math.max(1, Math.min(20, parseInt(amount, 10) || 1));
    const safeAction = action === "redeemed" ? "redeemed" : "earned";
    const safeReason = String(reason || "Compra KazuStore").trim().slice(0, 100);
    const safeFestivity = String(festivity || "auto").trim().slice(0, 20);

    const client = this.getClient();

    // Fallback Offline inmediato si no hay red o cliente
    if (!client || !navigator.onLine) {
      const offlineRecord = {
        phone: cleanPhone,
        amount: safeAmount,
        action: safeAction,
        reason: safeReason,
        festivity: safeFestivity,
        offline: true,
        id: "offline_" + Date.now()
      };
      this.savePendingStampLocal(offlineRecord);
      return { success: true, ledger: offlineRecord, offline: true };
    }

    try {
      let { data: clientData, error: clientFindErr } = await client
        .from("clients")
        .select("id, stamps_balance")
        .eq("phone", cleanPhone)
        .maybeSingle();

      if (!clientData) {
        const { data: newClient, error: clientErr } = await client
          .from("clients")
          .insert([{ phone: cleanPhone }])
          .select("id, stamps_balance")
          .single();
        if (clientErr) throw clientErr;
        clientData = newClient;
      }

      let delta = safeAction === "redeemed" ? -Math.abs(safeAmount) : Math.abs(safeAmount);
      
      if (safeAction === "use_referral_credits") {
        // Descontar y dejar en 0 los créditos de referidos
        await client.from("clients").update({ referral_credits: 0 }).eq("id", clientData.id);
        delta = 0; // No altera los sellos de la tarjeta
      }

      const { data: ledger, error: ledgerErr } = await client
        .from("stamps_ledger")
        .insert([{
          client_id: clientData.id,
          amount: delta,
          action: safeAction,
          reason: safeAction === "use_referral_credits" ? `💰 Canje de Créditos por Referidos (Descuento aplicado)` : safeReason,
          festivity: safeFestivity,
          balance_after: (clientData.stamps_balance || 0) + delta
        }])
        .select()
        .single();

      if (ledgerErr) throw ledgerErr;
      return { success: true, ledger, offline: false, usedCredits: safeAction === "use_referral_credits" };
    } catch (e) {
      // Si la llamada remota falló (ej. RLS, corte de red súbito), salvaguardamos localmente
      console.warn("Fallo remoto al registrar stamp, archivando offline:", e.message);
      const fallbackRecord = {
        phone: cleanPhone,
        amount: safeAmount,
        action: safeAction,
        reason: safeReason,
        offline: true,
        id: "offline_" + Date.now(),
        error: e.message
      };
      this.savePendingStampLocal(fallbackRecord);
      return { success: true, ledger: fallbackRecord, offline: true, note: e.message };
    }
  }
}

export const dbService = new SupabaseService();

