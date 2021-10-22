import { useState, useCallback } from 'react';
import styled from 'styled-components';
import { ThemeProps } from '../../../theme/types';
import { THEME_SETTING } from '../../../theme/use-theme';
import SliderSwitch from '../../components/switch';
import AWindow from "../../components/window";
import store from '../../settings/store';

const SettingsItemContainer = styled.div<ThemeProps>`
  & {
    display: flex;
    align-item: center;
    justify-content: space-between;
    padding: 5px 0;
  }

  &.separator {
    border-bottom: ${({theme}) => `2px solid ${theme.colors.muted}`};
  }
`;

function SettingsItem({ label, type, value, onChange, isLast }: SettingsItemProps) {
  return (
    <SettingsItemContainer className={ isLast ? '' : 'separator'}>
      <span style={{ display: 'flex', alignItems: 'center' }}>{label}</span>
      <SliderSwitch onChange={ onChange } value={value} />
    </SettingsItemContainer>
  );
}

enum SettingsType {
  Boolean,
  Input
}

export interface SettingsItemProps {
  label: string,
  type: SettingsType,
  value: any,
  onChange: (value: any, name: string) => void,
  isLast: boolean
}

function SettingsWindow() {
  const [,rerender] = useState(0);

  const onThemeChange = useCallback((value: boolean) => {
    store.set(THEME_SETTING, value);
    rerender(Date.now());
  }, []);

  return (
    <AWindow title="Settings" width={500} height={400}>
      <SettingsItem
        label="Dark theme"
        value={store.get(THEME_SETTING, false)}
        onChange={onThemeChange}
        isLast={false} 
        type={SettingsType.Boolean} />
    </AWindow>
  );
}

export default SettingsWindow;