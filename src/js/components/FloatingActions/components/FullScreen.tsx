import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { setFullScreenMode as setFullScreenModeGlobal } from '@/features/actions';
import FullscreenIcon from '@/components/Icons/FullscreenIcon';
import { toggleFullScreenMode } from '@/util';

const FullScreen = () => {
  const dispatch = useDispatch()
  const fullScreenMode = useSelector(state => state.fullScreenMode);
  const [isFullScreenMode, setFullScreenMode] = useState<boolean>(false);

  const handleToggleFullScreenMode = () => {
    try {
      toggleFullScreenMode(!isFullScreenMode);
    } catch(err) {
      console.log(err.message,'FULL SCREEN ERROR')
    }

    dispatch(setFullScreenModeGlobal(!isFullScreenMode));
    setFullScreenMode(!isFullScreenMode);
  };

  useEffect(() => {
    setFullScreenMode(fullScreenMode);
  }, [fullScreenMode])

  return (
    <div
      role="button"
      aria-pressed={isFullScreenMode}
      className="fab fullscreen"
      onClick={handleToggleFullScreenMode}
    >
      <FullscreenIcon state={isFullScreenMode} />
    </div>
  );
};

export default FullScreen;
