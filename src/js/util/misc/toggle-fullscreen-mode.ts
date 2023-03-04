
export const toggleFullScreenMode = (isFullScreenMode: boolean) => {
  try {
    if (isFullScreenMode) {
      document.body.classList.add('fullscreen-view');
      document.documentElement.requestFullscreen();
    } else {
      if(document.fullscreenElement) {
         document.exitFullscreen();
      }
      document.body.classList.remove('fullscreen-view');
    }
  } catch(err) {
    // eslint-disable-next-line no-console
    console.warn(err.message)
  }  
}