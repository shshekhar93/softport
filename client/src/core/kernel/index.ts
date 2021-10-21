/* At some point this file should be made to run in a worker */

import { loadFonts } from "../drivers/fonts";
import { manageTime } from "../drivers/time";
import store from "../settings/store";

const KERNEL_SETTING = 'kernel_setup_complete';

export function kMain() {
  store.set(KERNEL_SETTING, false);

  // load fonts
  loadFonts();

  // start timer
  manageTime();

  // All done
  store.set(KERNEL_SETTING, true);
}
