export interface ThemeType {
  id: string,
  name: string,
  colors: {
    bg_1: string,
    bg_2: string,
    bg_3: string,
    bg_4?: string,
    fg_1: string,
    fg_2: string,
    fg_3: string,
    fg_4?: string,

    primary: string,
    success: string,
    error: string,
    muted: string,

    body: string,
    panel: string,
    text: string,
    "muted-text": string,
    link: {
      color: string
    }
  },
  font: string
}

export interface ThemeProps {
  theme: ThemeType
}

export enum ThemeNames {
  light = 'light',
  dark = 'dark'
}

export interface ThemesType {
  data: {
    [key in ThemeNames]: ThemeType
  }
}

export interface ThemeSettings {
  theme: ThemeType
}
