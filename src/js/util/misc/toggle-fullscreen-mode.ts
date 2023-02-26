import * as RHK from 'react-hotkeys';

export const toggleFullScreenMode = (isFullScreenMode: boolean) => {
  console.log('--------------------------- FULLSCREEN ---------------------------')
  setTimeout(() => {
    window.blur();
  }, 1000)
  try {
    if (isFullScreenMode) {
      document.body.classList.add('fullscreen-view');
      document.documentElement.requestFullscreen();
    } else {
      document.documentElement.focus();
      if(document.fullscreenElement) {
         document.exitFullscreen();
      }
      document.body.classList.remove('fullscreen-view');
    }
  } catch(err) {
    console.warn(err.message, RHK, "EMR")
  }  
}