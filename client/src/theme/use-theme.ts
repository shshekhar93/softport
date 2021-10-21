import { useState } from 'react';
import themes from './schema';
import { ThemeNames, ThemeSettings, ThemesType } from './types';

function useTheme(): ThemeSettings {
  const [ theme, setTheme ] = useState((themes as ThemesType).data.light);

  function changeTheme(themeName: ThemeNames) {
    if(!themes.data[themeName]) {
      return;
    }
    setTheme(themes.data[themeName]);
  }

  return {
    theme,
    changeTheme
  };
}

export default useTheme;
