import { useCallback, MouseEventHandler } from 'react';
import styled from "styled-components";
import { ThemeProps } from "../../../theme/types";
import { addGlobalEventHandler, removeGlobalEventHandler } from '../../utils/global-events';

const TitleBarContainer = styled.div<ThemeProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 1.75rem;
  padding: 0 3px;
  background-color: ${({theme}) => theme.colors.bg_1};
  color: ${({theme}) => theme.colors.fg_1}
  user-select: none;
  cursor: default;
`;

const TitleContainer = styled.span`
  font-size: 0.875rem;
`;

const ButtonsContainer = styled.div`
  position: relative;
  top: -2px;
`;

const WindowButton = styled.span`
  margin-left: 3px;
  cursor: pointer;
`;

function TitleBar({
  moveWindow, title, closeButton, maximizeButton, toggleMaximized, isMaximized
}: TitleBarSettings) {
  const onMouseDown: MouseEventHandler = useCallback((e) => {
    let knownCoords = [e.clientX, e.clientY];

    const moveListener = (e: Event) => {
      const [ oldX, oldY ] = knownCoords;
      const { clientX, clientY } = (e as MouseEvent);
      knownCoords = [ clientX, clientY ];
      moveWindow(clientX - oldX, clientY - oldY);
    }

    const upListener = () => {
      removeGlobalEventHandler('mouseup', upListener);
      removeGlobalEventHandler('mousemove', moveListener);
    };

    addGlobalEventHandler('mouseup', upListener);
    addGlobalEventHandler('mousemove', moveListener);
  }, [ moveWindow ]);

  return (
    <TitleBarContainer onMouseDown={ onMouseDown } onDoubleClick={ toggleMaximized }>
      <TitleContainer>{ title }</TitleContainer>
      <ButtonsContainer>
        { maximizeButton && <WindowButton onClick={ toggleMaximized }>{
          // isMaximized ? '&#128471;' : '&#128470;'
          isMaximized ? '🗗︎' : '🗖︎'
        }</WindowButton> }
        { closeButton && <WindowButton>&#128473;</WindowButton> }
      </ButtonsContainer>
    </TitleBarContainer>
  );
}

TitleBar.defaultProps = {
  closeButton: true,
  maximizeButton: true,
  isMaximized: false
};

export type MoveWindowFn = (dx: number, dy:number) => void;
export type MaximizeFn = () => void;

export interface TitleBarSettings {
  title: string,
  closeButton: boolean,
  maximizeButton: boolean,
  isMaximized: boolean,
  moveWindow: MoveWindowFn,
  toggleMaximized: MaximizeFn
}

export default TitleBar;
