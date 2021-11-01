import EditorApp from "../apps/system/editor";
import SettingsWindow from "../apps/system/settings";

export const FOCUSED_Z_INDEX = 1009;
export const APP_DRAWER_Z_INDEX = 2009;

// All pre-installed apps
export const ALL_APPS = [
  {
    name: 'Settings',
    component: SettingsWindow,
    groups: [ 'SYSTEM' ]
  },
  {
    name: 'Editor',
    component: EditorApp,
    groups: [ 'SYSTEM', 'PRODUCTIVITY', 'UTILITIES' ]
  }
];