import { useState, useEffect } from 'react';
import store from './store';

const BOARD_PLACEMENT_SETTING = "board_placement";

function useBoardPlacement() {
  let placement = store.get(BOARD_PLACEMENT_SETTING);

  if(placement === undefined) {
    placement = 'top';
    store.set(BOARD_PLACEMENT_SETTING, placement);
  }

  const [, setRerenderer] = useState(0);

  useEffect(() => {
    const listener = () => setRerenderer(Date.now());
    store.addListener(BOARD_PLACEMENT_SETTING, listener);
    return () => store.removeListener(BOARD_PLACEMENT_SETTING, listener);
  }, []);

  return placement;
}

export {
  useBoardPlacement
};
