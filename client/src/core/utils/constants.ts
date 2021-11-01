import EditorApp from "../apps/system/editor";
import SettingsApp from "../apps/system/settings";
import TerminalApp from "../apps/system/terminal";

export const FOCUSED_Z_INDEX = 1009;
export const APP_DRAWER_Z_INDEX = 2009;

// All pre-installed apps
export const ALL_APPS = [
  {
    name: 'Settings',
    component: SettingsApp,
    groups: [ 'SYSTEM' ]
  },
  {
    name: 'Editor',
    component: EditorApp,
    groups: [ 'SYSTEM', 'PRODUCTIVITY', 'UTILITIES' ]
  },
  {
    name: 'Terminal',
    component: TerminalApp,
    groups: [ 'SYSTEM', 'UTILITIES' ]
  }
];