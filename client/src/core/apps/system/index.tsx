import { useEffect } from 'react';
import useTheme from "../../../theme/use-theme";
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyles } from "../../../theme/global-styles";
import Board from "../../components/board";
import AWindow from "../../components/window/index";

const RootContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const WindowsContainerOuter = styled.div`
  height: calc(100vh - 2rem);
  padding: 5px;
`;

const WindowsContainerInner = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

function SystemRoot() {
  const {
    theme,
    // changeTheme
  } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <RootContainer>
        <Board />
        <WindowsContainerOuter>
          <WindowsContainerInner id="windows-container">
            <AWindow>
              <span>Foo</span>
            </AWindow>
          </WindowsContainerInner>
        </WindowsContainerOuter>
      </RootContainer>
    </ThemeProvider>
  )
}

export default SystemRoot;
