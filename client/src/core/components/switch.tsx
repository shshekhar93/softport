import { useCallback } from 'react';
import styled from 'styled-components';
import { ThemeProps } from '../../theme/types';

const SliderSwitchLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  transform: scale(0.75);
`;

const SliderSwitchInput = styled.input<ThemeProps>`
  & {
    opacity: 0;
    width: 0;
    height: 0;
  }

  &:checked + span {
    background-color: ${({theme}) => theme.colors.primary};
  }

  &:focus + span {
    box-shadow: ${({theme}) => `0 0 3px ${theme.colors.bg_3}`};
  }

  &:checked + span:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
`;

const SliderSwitchSpan = styled.span<ThemeProps>`
  & {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({theme}) => theme.colors.muted};
    -webkit-transition: .4s;
    border-radius: 34px;
    transition: .4s;
  }

  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    border-radius: 50%;
    -webkit-transition: .4s;
    transition: .4s;
  }
`;

function SliderSwitch({ name, value, onChange }: SliderSwitchProps) {
  const wrappedOnChange = useCallback((e: React.SyntheticEvent<HTMLInputElement>) => {
    const {
      name, checked
    } = e.currentTarget;
    
    onChange(checked, name);
  }, [ onChange ]);

  return (
    <SliderSwitchLabel>
      <SliderSwitchInput
        type="checkbox"
        name={ name }
        onChange={ wrappedOnChange }
        checked={ value } />
      <SliderSwitchSpan />
    </SliderSwitchLabel>
  );
}

SliderSwitch.defaultProps = {
  name: '',
  value: false
};

type SliderSwitchOnChange = (value: boolean, name: string) => void;

export interface SliderSwitchProps {
  name: string,
  value: boolean,
  onChange: SliderSwitchOnChange
};

export default SliderSwitch;
