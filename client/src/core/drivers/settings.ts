import store from "../settings/store";

const LOCAL_SETTINGS = "softport_local_settings";
export const SAVE_SETTINGS_LOCALLY = "save_settings_locally";

function manageSettings() {
  let settingsStr = window.localStorage.getItem(LOCAL_SETTINGS);
  if(settingsStr === null) {
    settingsStr = '{}';
  }
  const settings = JSON.parse(settingsStr);
  store.deserialize(settings);

  let saveSettingsLocally = store.get(SAVE_SETTINGS_LOCALLY);

  store.addListener('*', (value, key) => {
    if(key === SAVE_SETTINGS_LOCALLY) {
      saveSettingsLocally = value;

      if(value === false) {
        window.localStorage.removeItem(LOCAL_SETTINGS);
      }
    }

    if(!saveSettingsLocally) {
      return;
    }

    // A setting has changed, we should save it back to local storage.
    window.requestIdleCallback(() => {
      window.localStorage.setItem(LOCAL_SETTINGS, store.serialize());
    }, { timeout: 10000 });
  });
}

export default manageSettings;
