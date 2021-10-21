import { useCallback, useState, useEffect, useRef } from 'react';
import styled from "styled-components";
import { ThemeProps } from "../../../theme/types";
import { getMaxHeight, getMaxWidth } from '../../utils/global-info';
import TitleBar from "./title-bar";

const WindowBorder = styled.div<ThemeProps>`
  border: solid 2px;
  border-color: ${props => props.theme.colors.bg_3};
  background-color: ${props => props.theme.colors.bg_1};
  height: 100%;
`;
export default function AWindow(props: WindowSettings) {
  const [top, setTop] = useState(props.top);
  const [left, setLeft] = useState(props.left);
  const [width, setWidth] = useState(props.width);
  const [height, setHeight] = useState(props.height);

  const leftBound = useRef(0);
  const topBound = useRef(0);

  // Do this after first render.
  useEffect(() => {
    leftBound.current = getMaxWidth() - width;
    topBound.current = getMaxHeight() - height;
  }, [ width, height ]);

  const moveWindow = useCallback((dx: number, dy: number) => {
    setLeft(left => Math.max(0, Math.min(left + dx, leftBound.current)));
    setTop(top => Math.max(0, Math.min(top + dy, topBound.current)));
  }, [
    leftBound, topBound
  ]);

  return (
    <div style={{
      position: 'absolute',
      top: top,
      left: left,
      width: props.width,
      height: props.height
    }}>
      <WindowBorder>
        <TitleBar moveWindow={moveWindow} />
        <span>foo</span>
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
  maximizeButton: true
};

export interface WindowSettings {
  top: number,
  left: number,
  width: number,
  height: number,
  resizable: boolean,
  closeButton: boolean,
  maximizeButton: boolean
}