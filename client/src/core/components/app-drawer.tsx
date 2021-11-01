import {
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
  FunctionComponent
} from "react";
import styled from "styled-components";
import store from "../settings/store";
import {
  AppComponentProps,
  createAppWindow
} from "../drivers/app-manager";
import {
  addGlobalEventHandler,
  removeGlobalEventHandler
} from "../utils/global-events";
import { TIME_SETTING } from "../drivers/time";
import { APP_DRAWER_Z_INDEX } from "../utils/constants";

import { ThemeProps } from "../../theme/types";

const GROUPS = [
  'PRODUCTIVITY',
  'DEVELOPMENT',
  'UTILITIES',
  'SYSTEM',
  'ALL'
];

const GROUPS_DISPLAY_NAME: any = {
  PRODUCTIVITY: 'Productivity',
  DEVELOPMENT: 'Development',
  UTILITIES: 'Utilities',
  SYSTEM: 'System',
  ALL: 'All'
};

const DrawerWrapper = styled.div`
  & {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 2rem;
    width: 8rem;
    border-bottom-left-radius: 8rem;
    border-bottom-right-radius: 8rem;
    background-color: ${props => props.theme.colors.bg_1};
    z-index: ${APP_DRAWER_Z_INDEX};
    transition: all 0.75s;
    overflow: hidden;
  }

  &.open {
    height: min(75%, 400px);
    width: min(75%, 400px);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  &.open .drawer-container {
    opacity: 1;
  }
`;

const DrawerContainer = styled.div`
  display: flex;
  flex-direction: row;
  opacity: 0;
  transition: all 0.75s;
`;

const DrawerCategories = styled.div`
  padding: 5px;
`;

const DrawerApps = styled.div`
  padding: 5px;
  flex-grow: 1
`;

const DisplayElement = styled.div<ThemeProps>`
  & {
    padding: 10px;
    cursor: pointer;
  }

  &:hover {
    background-color: ${props => props.theme.colors.bg_2}
  }
`;

const TimeContainer = styled.div<ThemeProps>`
  display: flex;
  justify-content: center;
  width: 100%;
  color: ${props => props.theme.colors.fg_1};
  cursor: pointer;
`;

function AppDrawer({ apps } : AppDrawerProps) {
  const [isOpen, setOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(() => GROUPS[0]);
  const [time, setTime] = useState(() => (store.get(TIME_SETTING) || new Date()));
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = (time: Date) => {
      setTime(time);
    };
    store.addListener(TIME_SETTING, listener);
    return () => store.removeListener(TIME_SETTING, listener);
  }, []);

  // Enable closing on outside click
  useEffect(() => {
    if(!isOpen) {
      return;
    }

    const listener = (e: Event) => {
      if(containerRef.current?.contains(e.target as HTMLElement)) {
        return;
      }

      setOpen(false);
    }
    addGlobalEventHandler('click', listener);
    return () => removeGlobalEventHandler('click', listener);
  }, [ isOpen ]);

  const onGroupSelect = useCallback(e => {
    const element = e.currentTarget;
    const group = element.getAttribute('data-group');
    setSelectedGroup(group);
  }, []);

  const openApp = useCallback(component => {
    createAppWindow(component);
    setOpen(false);
  }, []);

  const appsToDisplay = useMemo(() => {
    const filtered = apps.filter(({ groups }) => 
      selectedGroup === 'ALL' || groups.includes(selectedGroup));
    if(filtered.length === 0) {
      return <DisplayElement style={{ color: 'gray' }}>No apps selected</DisplayElement>;
    }

    return filtered.map(({ name, component }) => {
      return (
        <DisplayElement
          key={name}
          onClick={openApp.bind(null, component)}
        >{
          name
        }</DisplayElement>
      );
    })
  }, [ apps, selectedGroup, openApp ]);

  return (
    <DrawerWrapper className={isOpen ? 'open' : ''} ref={containerRef}>
      <TimeContainer onClick={() => setOpen(open => !open)}>
        <span style={{ marginTop: '4px' }}>{ mapToDisplayStr(time) }</span>
      </TimeContainer>
      <DrawerContainer className="drawer-container">
        <DrawerCategories>{
          GROUPS.map(group => {
            return (
              <DisplayElement
                key={group}
                onClick={onGroupSelect}
                data-group={group}
              >{
                GROUPS_DISPLAY_NAME[group]
              }</DisplayElement>
            )
          })
        }</DrawerCategories>
        <DrawerApps>{
          appsToDisplay
        }</DrawerApps>
      </DrawerContainer>
    </DrawerWrapper>
  );
}

function mapToDisplayStr(date: Date) {
  return `${date.toLocaleTimeString()}`;
}

interface App {
  icon?: string,
  name: string,
  component: FunctionComponent<AppComponentProps>,
  groups: Array<string>
}

interface AppDrawerProps {
  apps: Array<App>
}

export default AppDrawer;
