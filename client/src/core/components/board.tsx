import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ThemeProps } from '../../theme/types';
import { TIME_SETTING } from '../drivers/time';
// import { useBoardPlacement } from '../settings/settings-provider';
import store from '../settings/store';

const BoardContainer = styled.div<ThemeProps>`
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const TimeContainer = styled.div<ThemeProps>`
  height: 2rem;
  width: 8rem;
  background-color: ${props => props.theme.colors.bg_4};
  color: ${props => props.theme.colors.fg_4};
  border-bottom-left-radius: 8rem;
  border-bottom-right-radius: 8rem;
  display: flex;
  justify-content: center;
`;

function Board() {
  // const [placement] = useBoardPlacement();
  const [time, setTime] = useState(() => (store.get(TIME_SETTING) || new Date()));

  useEffect(() => {
    const listener = (time: Date) => {
      setTime(time);
    };
    store.addListener(TIME_SETTING, listener);
    return () => store.removeListener(TIME_SETTING, listener);
  }, []);

  return (
    <BoardContainer>
      <TimeContainer>
        <span style={{ marginTop: '4px' }}>{ mapToDisplayStr(time) }</span>
      </TimeContainer>
    </BoardContainer>
  );
}

function mapToDisplayStr(date: Date) {
  return `${date.toLocaleTimeString()}`;
}

export default Board;
