import React, { FunctionComponent, ReactElement } from "react";
import { v4 as uuidv4 } from 'uuid';

let currentWindows = new Array<WindowsContainer>();
let refresher: RefreshFunction|null = null;
let focusedWindowId: string|null = null;

export function createAppWindow(windowElement: AppComponent): string {
  const instanceId = uuidv4();
  const element = React.createElement(windowElement, {
    instanceId,
    key: instanceId,
    isFocused: true,
    onClose: closeWindow.bind(null, instanceId)
  });

  currentWindows.push({
    instanceId,
    element
  });

  // Unfocus existing window, if any.
  if(focusedWindowId) {
    removeFocus(focusedWindowId);
  }

  focusedWindowId = instanceId;

  triggerRefresh();

  return instanceId;
};

export function closeWindow(instanceId: string): void {
  currentWindows = currentWindows.filter(window => window.instanceId !== instanceId);

  if(focusedWindowId === instanceId) {
    focusedWindowId = null;
  }

  triggerRefresh();
}

export function getAppWindows(): Array<ReactElement> {
  return currentWindows.map(({ element }) => element);
}

export function setRefresher(fn: RefreshFunction | null): void {
  refresher = fn;
}

function removeFocus(instanceId: string): boolean {
  const focused = currentWindows.find(window => window.instanceId === instanceId);
  if(!focused) {
    return false;
  }

  focused.element = React.cloneElement(focused.element, {
    isFocused: false
  });

  return true;
}

function addFocus(instanceId: string): boolean {
  const window = currentWindows.find(window => window.instanceId === instanceId);
  if(!window) {
    return false;
  }

  window.element = React.cloneElement(window.element, {
    isFocused: true
  });

  return true;
}

export function setFocusedWindow(instanceId: string) {
  const success = addFocus(instanceId);

  // Bail if we couldn't set focus.
  if(!success) {
    return;
  }

  // Unfocus existing window, if any.
  if(focusedWindowId) {
    removeFocus(focusedWindowId);
  }

  focusedWindowId = instanceId;

  triggerRefresh();
}

function triggerRefresh(): void {
  refresher && refresher();
}

export interface AppComponentProps {
  instanceId: string,
  key: string,
  isFocused: boolean,
  onClose: () => void
}

interface WindowsContainer {
  instanceId: string,
  element: ReactElement
}

declare type RefreshFunction = () => void;

declare type AppComponent = FunctionComponent<AppComponentProps>;
