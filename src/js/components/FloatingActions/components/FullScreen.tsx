import React, { useState, useEffect } from 'react';
import { useDispatch} from 'react-redux';
import { setFullScreenMode as setFullScreenModeGlobal } from '@/features/actions';
import FullscreenIcon from '@/components/Icons/FullscreenIcon';

const html = document.querySelector('html');

const FullScreen = () => {
  const dispatch = useDispatch()
  const [isFullScreenMode, setFullScreenMode] = useState<boolean>(false);

  const handleToggleFullScreen = () => {
    setFullScreenMode(!isFullScreenMode);
  };

  const handleFullScreenMode = () => {
    setFullScreenMode(
      document.fullscreen || document.webkitIsFullScreen || false
    );
  };

  useEffect(() => {
    handleFullScreenMode();
    document.addEventListener('fullscreenchange', handleFullScreenMode);

    return () =>
      document.removeEventListener('fullscreenchange', handleFullScreenMode);
  }, []);

  useEffect(() => {
    const updateFullScreenMode = async () => {
      try {
        if (isFullScreenMode) {
          document.body.classList.add('fullscreen-view');
          console.log(html, 'HTML ?', html?.requestFullscreen);
          html.requestFullscreen && html.requestFullscreen();
          html.webkitRequestFullscreen && html.webkitRequestFullscreen();
          dispatch(setFullScreenModeGlobal(true));
        } else {
          document.fullscreen && document.exitFullscreen();
          document.body.classList.remove('fullscreen-view');
          dispatch(setFullScreenModeGlobal(false));
        }
      } catch (err) {
        console.warn(err, 'ERROR');
      }
    };

    updateFullScreenMode();
  });

  return (
    <div
      role="button"
      className="fab fullscreen"
      onClick={handleToggleFullScreen}
    >
      <FullscreenIcon state={isFullScreenMode} />
    </div>
  );
};

export default FullScreen;
