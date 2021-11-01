import React, { FunctionComponent, ReactElement } from "react";
import { v4 as uuidv4 } from 'uuid';

let currentWindows = new Array<WindowsContainer>();
let refresher: RefreshFunction | null = null;

export function createAppWindow(windowElement: AppComponent): string {
  const instanceId = uuidv4();
  const element = React.createElement(windowElement, {
    instanceId,
    key: instanceId,
    onClose: closeWindow.bind(null, instanceId)
  });

  currentWindows.push({
    instanceId,
    element
  });

  triggerRefresh();

  return instanceId;
};

export function closeWindow(instanceId: string): void {
  currentWindows = currentWindows.filter(window => window.instanceId !== instanceId);
  triggerRefresh();
}

export function getAppWindows(): Array<ReactElement> {
  return currentWindows.map(({ element }) => element);
}

export function setRefresher(fn: RefreshFunction | null): void {
  refresher = fn;
}

function triggerRefresh(): void {
  refresher && refresher();
}

export interface AppComponentProps {
  instanceId: string,
  key: string,
  onClose: () => void
}

interface WindowsContainer {
  instanceId: string,
  element: ReactElement
}

declare type RefreshFunction = () => void;

declare type AppComponent = FunctionComponent<AppComponentProps>;
