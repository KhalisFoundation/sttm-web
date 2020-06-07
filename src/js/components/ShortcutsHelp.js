import React from 'react';
import { getApplicationKeyMap } from 'react-hotkeys';

const ShortcutsHelp = () => {
  const keyMap = getApplicationKeyMap()
  return (
    <div>
      {Object.entries(keyMap).map( ([name, info]) => {
        const { sequences } = info

        const [macSeq, winSeq] = sequences
        return (
          <div key={name}>
            {name}
          </div>
        ) 
      })}
    </div>
  );
}

export default ShortcutsHelp;