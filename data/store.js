/**
 * Reactive Store nativo con Proxy y Pub/Sub + TabSync
 * Estándar pro-vanilla-web-v3 (state-sync-engine)
 */
export function createStore(initialState = {}, storageKey = null) {
  // 1. Cargar persistencia si existe
  let stored = { ...initialState };
  if (storageKey) {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) stored = { ...initialState, ...JSON.parse(raw) };
    } catch (e) {
      // Tolerar modo incógnito o storage deshabilitado
      console.warn("Storage no disponible o restringido:", e);
    }
  }

  const subscribers = new Set();

  // 2. Proxy para interceptar mutaciones y notificar reactivamente
  const state = new Proxy(stored, {
    set(target, prop, value) {
      if (target[prop] === value) return true;
      target[prop] = value;

      // Auto-guardado resiliente
      if (storageKey) {
        try {
          localStorage.setItem(storageKey, JSON.stringify(target));
        } catch (e) {
          console.warn("Error guardando estado persistente:", e);
        }
      }

      // Notificar suscriptores
      subscribers.forEach((callback) => {
        try {
          callback(prop, value, target);
        } catch (err) {
          console.error("Error en suscriptor del store:", err);
        }
      });
      return true;
    }
  });

  return {
    get: () => ({ ...state }),
    set: (prop, val) => { state[prop] = val; },
    update: (updater) => {
      if (typeof updater === "function") {
        const next = updater({ ...state });
        Object.keys(next).forEach(k => {
          state[k] = next[k];
        });
      }
    },
    subscribe: (callback) => {
      subscribers.add(callback);
      return () => subscribers.delete(callback); // Unsubscribe limpio
    }
  };
}

/**
 * Sincronización multi-pestaña resiliente (BroadcastChannel)
 */
export function initTabSync(channelName, onMessage) {
  if (typeof window === "undefined" || !("BroadcastChannel" in window)) {
    return {
      post: () => {},
      close: () => {}
    };
  }

  try {
    const channel = new BroadcastChannel(channelName);
    channel.onmessage = (event) => {
      if (event.data && typeof onMessage === "function") {
        onMessage(event.data);
      }
    };

    return {
      post: (data) => {
        try {
          channel.postMessage(data);
        } catch (err) {
          console.warn("Error enviando mensaje por BroadcastChannel:", err);
        }
      },
      close: () => {
        try {
          channel.close();
        } catch (err) {}
      }
    };
  } catch (e) {
    return { post: () => {}, close: () => {} };
  }
}
