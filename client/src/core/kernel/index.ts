/* At some point this file should be made to run in a worker */

import { loadFonts } from "../drivers/fonts";
import manageSettings from "../drivers/settings";
import { manageTime } from "../drivers/time";
import store from "../settings/store";

const KERNEL_SETTING = 'kernel_setup_complete';

export function kMain() {
  store.set(KERNEL_SETTING, false);

  // manage settings
  manageSettings();

  // load fonts
  loadFonts();

  // start timer
  manageTime();

  // All done
  store.set(KERNEL_SETTING, true);
}
