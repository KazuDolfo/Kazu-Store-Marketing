const SETTINGS_KEY = "kazustore_hub_settings_v1";

const DEFAULT_SETTINGS = {
  yapeNum: "987 654 321",
  yapeName: "KazuStore Perú",
  plinNum: "987 654 321",
  plinName: "KazuStore Perú",
  bcp: "194-XXXXXXXX-0-XX (CCI: 002-194XXXXXXXXX)",
  bbva: "0011-XXXX-XXXXXXXXXX",
  interbank: "898-XXXXXXXXXX"
};

export function getSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
  } catch (e) {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(newSettings) {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
    return true;
  } catch (e) {
    console.error("Error guardando settings:", e);
    return false;
  }
}

export function initSettings(showToast) {
  const yapeNumInput = document.getElementById("set-yape-num");
  const yapeNameInput = document.getElementById("set-yape-name");
  const plinNumInput = document.getElementById("set-plin-num");
  const plinNameInput = document.getElementById("set-plin-name");
  const bcpInput = document.getElementById("set-bcp");
  const bbvaInput = document.getElementById("set-bbva");
  const interbankInput = document.getElementById("set-interbank");
  const saveBtn = document.getElementById("save-settings-btn");

  const current = getSettings();
  yapeNumInput.value = current.yapeNum;
  yapeNameInput.value = current.yapeName;
  plinNumInput.value = current.plinNum;
  plinNameInput.value = current.plinName;
  bcpInput.value = current.bcp;
  bbvaInput.value = current.bbva;
  interbankInput.value = current.interbank;

  saveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const updated = {
      yapeNum: yapeNumInput.value.trim().slice(0, 30),
      yapeName: yapeNameInput.value.trim().slice(0, 60),
      plinNum: plinNumInput.value.trim().slice(0, 30),
      plinName: plinNameInput.value.trim().slice(0, 60),
      bcp: bcpInput.value.trim().slice(0, 60),
      bbva: bbvaInput.value.trim().slice(0, 60),
      interbank: interbankInput.value.trim().slice(0, 60)
    };
    saveSettings(updated);
    showToast("¡Cuentas de cobro guardadas exitosamente en tu navegador!");
  });
}
