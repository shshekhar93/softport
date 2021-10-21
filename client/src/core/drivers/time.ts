import store from "../settings/store";

export const TIME_SETTING = 'time';

export function manageTime() {
  // add NTP functionality.
  
  const setTime = () => {
    store.set(TIME_SETTING, new Date());
  };
  setTime();
  return setInterval(setTime, 1000);
}
