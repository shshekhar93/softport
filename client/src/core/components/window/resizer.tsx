import { useCallback, MouseEventHandler } from 'react';
import styled from "styled-components";
import { ThemeProps } from "../../../theme/types";
import { addGlobalEventHandler, removeGlobalEventHandler } from '../../utils/global-events';

const ResizerContainer = styled.div<ThemeProps>`
  position: absolute;
  bottom: -4px;
  right: -1px;
  color: ${props => props.theme.colors.bg_1};
  cursor: nwse-resize;
  user-select: none;
`;
function Resizer({ resizeWindow } : ResizerSettings) {
  const onMouseDown: MouseEventHandler = useCallback((e) => {
    let knownCoords = [e.clientX, e.clientY];

    const moveListener = (e: Event) => {
      const [ oldX, oldY ] = knownCoords;
      const { clientX, clientY } = (e as MouseEvent);
      knownCoords = [ clientX, clientY ];
      resizeWindow(clientX - oldX, clientY - oldY);
    }

    const upListener = () => {
      removeGlobalEventHandler('mouseup', upListener);
      removeGlobalEventHandler('mousemove', moveListener);
    };

    addGlobalEventHandler('mouseup', upListener);
    addGlobalEventHandler('mousemove', moveListener);
  }, [ resizeWindow ]);

  return (
    <ResizerContainer onMouseDown={onMouseDown}>◢</ResizerContainer>
  )
}

export type ResizeFn = (dw: number, dh: number) => void;

export interface ResizerSettings {
  resizeWindow: ResizeFn
}

export default Resizer;
