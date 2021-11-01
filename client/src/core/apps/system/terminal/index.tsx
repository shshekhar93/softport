import { useEffect, useRef } from "react";
import { Terminal } from 'xterm';
import styled from "styled-components";
import AWindow from "../../../components/window";
import { AppComponentProps } from "../../../drivers/app-manager";

import 'xterm/css/xterm.css';

const TerminalWrapper = styled.div`
  height: 100%;
`;

function TerminalApp(props: AppComponentProps) {
  const terminalContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(!terminalContainerRef.current) {
      return;
    }

    const term = new Terminal();
    term.open(terminalContainerRef.current);
    term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')

    return () => term.dispose();
  }, []);

  return (
    <AWindow
      top={0}
      left={0}
      width={745}
      height={445}
      resizable={false}
      title="Terminal"
      instanceId={props.instanceId}
      isFocused={props.isFocused}
      onClose={props.onClose}
    >
      <TerminalWrapper ref={terminalContainerRef}></TerminalWrapper>
    </AWindow>
  );
}

export default TerminalApp;
