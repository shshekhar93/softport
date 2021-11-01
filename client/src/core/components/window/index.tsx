import { useCallback, useState, useEffect, useRef } from 'react';
import styled from "styled-components";
import { ThemeProps } from "../../../theme/types";
import { setFocusedWindow } from '../../drivers/app-manager';
import { FOCUSED_Z_INDEX } from '../../utils/constants';
import { getMaxHeight, getMaxWidth } from '../../utils/global-info';
import Resizer from './resizer';
import TitleBar from "./title-bar";

export const WIN_MIN_WIDTH = 300;
export const WIN_MIN_HEIGHT = 200;

const WindowBorder = styled.div<ThemeProps>`
  border: solid 2px;
  border-color: ${props => props.theme.colors.bg_1};
  background-color: ${props => props.theme.colors.bg_2};
  height: 100%;
`;

const WindowContents = styled.div`
  padding: 3px;
  height: calc(100% - 1.75rem);
`;

export default function AWindow(props: WindowSettings) {
  const [isMaximized, setMaximized] = useState(false);
  const [top, setTop] = useState(props.top);
  const [left, setLeft] = useState(props.left);
  const [width, setWidth] = useState(props.width);
  const [height, setHeight] = useState(props.height);

  const leftBound = useRef(0);
  const topBound = useRef(0);
  const widthBound = useRef(0);
  const heightBound = useRef(0);

  // Do this after first render.
  useEffect(() => {
    leftBound.current = getMaxWidth() - width;
    topBound.current = getMaxHeight() - height;
  }, [ width, height ]);

  useEffect(() => {
    widthBound.current = getMaxWidth() - left;
    heightBound.current = getMaxHeight() - top;
  }, [ top, left ]);

  const moveWindow = useCallback((dx: number, dy: number) => {
    setLeft(left => Math.max(0, Math.min(left + dx, leftBound.current)));
    setTop(top => Math.max(0, Math.min(top + dy, topBound.current)));
  }, []);

  const {
    onResize,
    isFocused,
    instanceId
  } = props;

  const resizeWindow = useCallback((dw: number, dh: number) => {
    setWidth(width => Math.max(WIN_MIN_WIDTH, Math.min(widthBound.current, width + dw)));
    setHeight(height => Math.max(WIN_MIN_HEIGHT, Math.min(heightBound.current, height + dh)));
    onResize && onResize();
  }, [ onResize ]);

  const toggleMaximized = useCallback(() => {
    setMaximized(max => !max);
    onResize && onResize();
  }, [ onResize ]);

  const setFocus = useCallback(() => {
    if(isFocused) {
      return;
    }
    
    setFocusedWindow(instanceId);
  }, [ isFocused, instanceId ]);

  return (
    <div
    className="softport-window"
    onClick={ setFocus }
    style={{
      position: 'absolute',
      top: isMaximized ? 0 : top,
      left: isMaximized ? 0 : left,
      width: isMaximized ? '100%' : width,
      height: isMaximized ? '100%' : height,
      zIndex: isFocused? FOCUSED_Z_INDEX : undefined
    }}>
      <WindowBorder>
        <TitleBar
          title={props.title}
          moveWindow={moveWindow}
          toggleMaximized={toggleMaximized}
          isMaximized={isMaximized}
          onClose={props.onClose} />
        <WindowContents>
          {props.children}
        </WindowContents>
        {props.resizable && 
          <Resizer resizeWindow={resizeWindow} />
        }
      </WindowBorder>
    </div>
  );
}

AWindow.defaultProps = {
  top: 0,
  left: 0,
  width: 350,
  height: 200,
  resizable: true,
  closeButton: true,
  maximizeButton: true,
  children: []
};

export interface WindowSettings {
  title: string,
  top: number,
  left: number,
  width: number,
  height: number,
  resizable: boolean,
  isFocused: boolean,
  instanceId: string,
  closeButton: boolean,
  maximizeButton: boolean,
  onResize?: () => void,
  onClose: () => void,
  children: React.ReactNode
}