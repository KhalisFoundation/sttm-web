import store from './features/store'

const TranslitMap = {
  name: 'Transliteration',
  map: [
   'English',
   'Shahmukhi',
   'Hindi'
  ],
  baseKey: 'mod+t'
}

const TranslationMap = {
  name: 'Translation',
  map: [
   'English',
   'Punjabi',
   'Spanish'
  ],
  baseKey: 'mod+m'
}

const maps = [TranslitMap, TranslationMap];

const mapToShortcut = (keyMap) => {
  const {name, map, baseKey} = keyMap;

  return map.reduce((acc, currentName) => {
    const keyName = `toggle${currentName}${name}`;
    const sequence = `${baseKey}+${currentName[0]}`

    return {...acc, 
      [keyName]: { 
      name: `Toggle ${currentName} ${name} `,
      sequence: sequence
    }}
  }, {})
}

const Shortcuts = { 
    toggleLarivar: {
      name: 'Toggle Larivar',
      sequence: 'l'
    },
   toggleVishraams: {
     name: 'Toggle Vishraams',
     sequence: 'v',
   },
   centerAlign: {
     name: 'Center Align',
     sequence: 'meta+shift+e'
   },

  // ...maps.map(shortcutType => mapToShortcut(shortcutType)),

 
}

const ShortcutHanders = 
{  
  toggleLarivar: (e) => {
    e.preventDefault();
    store.dispatch({type: "TOGGLE_LARIVAAR_OPTION"})},
  toggleVishraams: (e) => {
    e.preventDefault();
    store.dispatch({type: "TOGGLE_VISRAAMS"}) },
    centerAlign: () => {
      const state = store.getState();
    store.dispatch({type: "SET_CENTER_ALIGN_OPTION", payload:!state.centerAlignGurbani }) 
  },

  // toggleEnglishTranslation: (e) => {
  //    e.preventDefault();
  //    },

}

export default Shortcuts;
export {ShortcutHanders, maps, mapToShortcut}