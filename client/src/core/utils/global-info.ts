export const foo='foo';

let initialized = false;
let maxWidth = 0;
let maxHeight = 0;

function initialize() {
  const {
    width, height
  } = document.getElementById('windows-container')?.getBoundingClientRect() || {};
  
  maxWidth = width || 0;
  maxHeight = height || 0;
  initialized = true;
}

(() => {
  window.addEventListener('resize', initialize);
})();

export function getMaxWidth() {
  if(!initialized) {
    initialize();
  }
  return maxWidth;
}

export function getMaxHeight() {
  if(!initialized) {
    initialize();
  }
  return maxHeight;
}
