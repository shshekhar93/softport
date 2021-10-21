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
  background-color: ${props => props.theme.colors.bg_3};
  user-select: none;
`;

const TitleContainer = styled.span<ThemeProps>`
  font-size: 0.875rem;
`;

const ButtonsContainer = styled.div<ThemeProps>`
  position: relative;
  top: -2px;
`;

const WindowButton = styled.span<ThemeProps>`
  margin-left: 3px;
  cursor: pointer;
`;

function TitleBar({moveWindow, title, closeButton, maximizeButton }: TitleBarSettings) {
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
    <TitleBarContainer onMouseDown={onMouseDown}>
      <TitleContainer>{ title }</TitleContainer>
      <ButtonsContainer>
        { maximizeButton && <WindowButton>&#128470;</WindowButton> }
        { closeButton && <WindowButton>&#128473;</WindowButton> }
      </ButtonsContainer>
    </TitleBarContainer>
  );
}

TitleBar.defaultProps = {
  title: 'Unnamed Window',
  closeButton: true,
  maximizeButton: true
};

export type MoveWindowFn = (dx: number, dy:number) => void;

export interface TitleBarSettings {
  title: string,
  closeButton: boolean,
  maximizeButton: boolean,
  moveWindow: MoveWindowFn
}

export default TitleBar;
