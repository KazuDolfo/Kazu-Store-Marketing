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

  async getAllClients() {
    const client = this.getClient();
    if (client && navigator.onLine) {
      try {
        const { data, error } = await client
          .from("clients")
          .select("id, phone, nickname, stamps_balance, created_at")
          .order("created_at", { ascending: false })
          .limit(100);
        if (!error && Array.isArray(data)) {
          const mapped = data.map(c => ({
            ...c,
            referral_code: 'KZ-' + (c.phone ? c.phone.slice(-4) : 'VIP'),
            referral_credits: 0
          }));
          localStorage.setItem("kazustore_cached_clients_list_v1", JSON.stringify(mapped));
          return mapped;
        }
      } catch (err) {
        console.warn("Fallo al obtener clientes de Supabase, usando local:", err);
      }
    }

    // Fallback local consolidado
    const cached = localStorage.getItem("kazustore_cached_clients_list_v1");
    if (cached) {
      try { return JSON.parse(cached); } catch {}
    }

    // Generar consolidado desde registros locales y suscripciones
    const localSubs = JSON.parse(localStorage.getItem("kazustore_local_subscriptions_v1") || "[]");
    const localStamps = this.getPendingStamps();
    const map = new Map();

    localSubs.forEach(s => {
      const p = (s.client_phone || "").replace(/[^\d+]/g, "");
      if (p && !map.has(p)) {
        map.set(p, {
          phone: p,
          nickname: s.client_name || "Cliente",
          stamps_balance: 0,
          referral_credits: 0,
          referral_code: "KZ-" + p.slice(-4),
          created_at: s.created_at || new Date().toISOString()
        });
      }
    });

    localStamps.forEach(st => {
      const p = (st.phone || "").replace(/[^\d+]/g, "");
      if (p) {
        if (!map.has(p)) {
          map.set(p, {
            phone: p,
            nickname: "Cliente KazuStore",
            stamps_balance: 0,
            referral_credits: 0,
            referral_code: "KZ-" + p.slice(-4),
            created_at: st.queued_at || new Date().toISOString()
          });
        }
        const c = map.get(p);
        c.stamps_balance = Math.max(0, (c.stamps_balance || 0) + (st.amount || 0));
      }
    });

    return Array.from(map.values());
  }

  async getClientAudit(phone) {
    const cleanPhone = (phone || "").trim().replace(/[^\d+]/g, "").slice(0, 16);
    if (!cleanPhone || cleanPhone.length < 8) return null;

    const client = this.getClient();
    if (client && navigator.onLine) {
      try {
        const { data: clientRecord } = await client
          .from("clients")
          .select("id, phone, nickname, stamps_balance")
          .eq("phone", cleanPhone)
          .maybeSingle();

        if (clientRecord) {
          const myCode = 'KZ-' + cleanPhone.slice(-4);

          // Consultas paralelas en Supabase para reducir la latencia a la mitad
          const [ledgerRes, refFriendsRes] = await Promise.all([
            client
              .from("stamps_ledger")
              .select("id, amount, action, reason, festivity, created_at, balance_after")
              .eq("client_id", clientRecord.id)
              .order("created_at", { ascending: false })
              .limit(30),
            client
              .from("clients")
              .select("id, phone, stamps_balance")
              .eq("referred_by", myCode)
              .limit(50)
          ]);

          const ledger = ledgerRes.data || [];
          const refFriends = refFriendsRes.data || [];
          const qualified = refFriends.filter(f => (f.stamps_balance || 0) >= 2);

          return {
            source: "supabase",
            client: clientRecord,
            stamps_balance: clientRecord.stamps_balance || 0,
            referral_credits: clientRecord.referral_credits !== undefined ? Number(clientRecord.referral_credits) : qualified.length,
            qualified_friends: qualified.length,
            total_friends: refFriends.length,
            ledger: ledger
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
    let cloudExpiring = [];
    const client = this.getClient();

    if (client && navigator.onLine) {
      try {
        const { data, error } = await client.from("v_expiring_soon_subscriptions").select("*").limit(20);
        if (!error && Array.isArray(data)) {
          cloudExpiring = data;
        }
      } catch (e) {
        console.warn("Fallo al obtener suscripciones de Supabase, revisando almacenamiento local:", e);
      }
    }

    // Obtener suscripciones locales y calcular días restantes dinámicamente
    const localSubs = JSON.parse(localStorage.getItem("kazustore_local_subscriptions_v1") || "[]");
    const now = new Date();

    const calculatedLocal = localSubs.map(s => {
      let daysLeft = s.days_remaining;
      if (s.end_date) {
        // Formato dd/mm/yyyy
        const parts = s.end_date.split("/");
        if (parts.length === 3) {
          const target = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
          const diffTime = target - now;
          daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        }
      }
      return {
        ...s,
        days_remaining: daysLeft !== undefined ? daysLeft : s.days_remaining
      };
    }).filter(s => s.days_remaining !== undefined && s.days_remaining <= 5 && s.days_remaining >= -1);

    // Unificar cloud + local sin duplicados
    const combined = [...cloudExpiring];
    calculatedLocal.forEach(ls => {
      const exists = combined.some(c => c.client_phone === ls.client_phone && c.product_name === ls.product_name);
      if (!exists) {
        combined.push(ls);
      }
    });

    // Ordenar de menor a mayor días restantes
    combined.sort((a, b) => (Number(a.days_remaining) || 0) - (Number(b.days_remaining) || 0));

    localStorage.setItem("kazustore_cached_expiring_v1", JSON.stringify(combined.slice(0, 20)));
    return combined;
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
            .insert([{ 
              phone: cleanPhone, 
              nickname: name || "Cliente",
              stamps_balance: clientData.giveStamp ? 1 : 0
            }])
            .select("id, stamps_balance")
            .single();
          clientRecord = created;

          if (clientData.giveStamp && created) {
            await client.from("stamps_ledger").insert([{
              client_id: created.id,
              amount: 1,
              action: "earned",
              reason: `🎁 1er Sello de Bienvenida / Compra (${serviceName})`,
              festivity: "auto",
              balance_after: 1
            }]);
          }
        } else if (clientRecord && clientData.giveStamp) {
          // Si ya existía y se marcó otorgar sello por compra, sumar 1
          const newBal = (clientRecord.stamps_balance || 0) + 1;
          await client.from("clients").update({ stamps_balance: newBal }).eq("id", clientRecord.id);
          await client.from("stamps_ledger").insert([{
            client_id: clientRecord.id,
            amount: 1,
            action: "earned",
            reason: `➕ Sello por compra (${serviceName})`,
            festivity: "auto",
            balance_after: newBal
          }]);
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
    const validActions = ["earned", "redeemed", "claim_coupon_3", "reset_full_card_8", "use_referral_credits"];
    const safeAction = validActions.includes(action) ? action : "earned";
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

      let delta = 0;
      let newBalance = clientData.stamps_balance || 0;

      if (safeAction === "earned") {
        delta = Math.abs(safeAmount);
        newBalance = newBalance + delta;
      } else if (safeAction === "claim_coupon_3") {
        delta = 0; // No resta sellos, es un hito
        newBalance = clientData.stamps_balance || 0;
      } else if (safeAction === "reset_full_card_8") {
        delta = -(clientData.stamps_balance || 0); // Resta todo para reiniciar a 0
        newBalance = 0;
      } else if (safeAction === "redeemed") {
        delta = -Math.abs(safeAmount);
        newBalance = Math.max(0, newBalance + delta);
      } else if (safeAction === "use_referral_credits") {
        // Descontar y dejar en 0 los créditos de referidos
        await client.from("clients").update({ referral_credits: 0 }).eq("id", clientData.id);
        delta = 0; // No altera los sellos de la tarjeta
      }

      // 1. Actualizar balance consolidado en el registro del cliente
      if (safeAction !== "use_referral_credits" && safeAction !== "claim_coupon_3") {
        await client
          .from("clients")
          .update({ stamps_balance: newBalance })
          .eq("id", clientData.id);
      }

      // 2. Determinar motivo formateado
      let formattedReason = safeReason;
      if (safeAction === "claim_coupon_3") {
        formattedReason = `🎟️ Cupón S/ 3.00 OFF Aplicado (Hito 5 Sellos conservado)`;
      } else if (safeAction === "reset_full_card_8") {
        formattedReason = `🏆 Premio Mayor S/ 8.00 Canjeado (Tarjeta completada y reiniciada a 0)`;
      } else if (safeAction === "use_referral_credits") {
        formattedReason = `💰 Canje de Créditos por Referidos (Descuento aplicado)`;
      }

      // 3. Registrar movimiento en stamps_ledger
      const { data: ledger, error: ledgerErr } = await client
        .from("stamps_ledger")
        .insert([{
          client_id: clientData.id,
          amount: delta,
          action: safeAction,
          reason: formattedReason,
          festivity: safeFestivity,
          balance_after: newBalance
        }])
        .select()
        .single();

      if (ledgerErr) throw ledgerErr;

      // Mantener sincronizado el registro local también
      const localLedger = this.getPendingStamps();
      localLedger.push({
        phone: cleanPhone,
        amount: delta,
        action: safeAction,
        reason: formattedReason,
        festivity: safeFestivity,
        id: "tx_" + Date.now(),
        synced: true
      });
      localStorage.setItem(OFFLINE_STAMPS_KEY, JSON.stringify(localLedger));

      return { success: true, ledger, offline: false, newBalance, usedCredits: safeAction === "use_referral_credits" };
    } catch (e) {
      // Si la llamada remota falló (ej. RLS, corte de red súbito), salvaguardamos localmente
      console.warn("Fallo remoto al registrar stamp, archivando offline:", e.message);
      const deltaOffline = safeAction === "redeemed" ? -Math.abs(safeAmount) : Math.abs(safeAmount);
      const fallbackRecord = {
        phone: cleanPhone,
        amount: deltaOffline,
        action: safeAction,
        reason: safeReason,
        festivity: safeFestivity,
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

