import { useState, useEffect } from 'react';
import store from '../core/settings/store';
import themes from './schema';
import { ThemeSettings, ThemesType, ThemeType } from './types';

export const THEME_SETTING = "dark_theme";

function useTheme(): ThemeSettings {
  const [ theme, setTheme ] = useState(() => {
    let darkTheme = store.get(THEME_SETTING);

    if(darkTheme === undefined) {
      store.set(THEME_SETTING, true);
      darkTheme = true;
    }

    return (themes as ThemesType).data[darkTheme ? 'dark': 'light'];
  });

  useEffect(() => {
    const listener = (darkTheme: ThemeType) => setTheme(
      (themes as ThemesType).data[darkTheme ? 'dark': 'light']
    );

    store.addListener(THEME_SETTING, listener);
    return () => store.removeListener(THEME_SETTING, listener);
  });

  return {
    theme
  };
}

export default useTheme;
