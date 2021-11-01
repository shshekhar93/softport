import useTheme from "../../../theme/use-theme";
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyles } from "../../../theme/global-styles";
import { getAppWindows, setRefresher } from "../../drivers/app-manager";
import { useEffect, useState } from "react";
import AppDrawer from "../../components/app-drawer";
import { ALL_APPS } from "../../utils/constants";

const RootContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding-top: 2rem;
  overflow: hidden;
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
  const [, rerenderer] = useState(0);

  useEffect(() => {
    setRefresher(() => rerenderer(Date.now()));
    return () => setRefresher(null);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <RootContainer>
        <AppDrawer apps={ ALL_APPS } />
        <WindowsContainerOuter>
          <WindowsContainerInner id="windows-container">
            { getAppWindows() }
          </WindowsContainerInner>
        </WindowsContainerOuter>
      </RootContainer>
    </ThemeProvider>
  )
}

export default SystemRoot;
