import store from './features/store'
import { toggleItemInArray } from './util'

const ViewerShortcuts = { 
    toggleLarivar: {
      name: 'Toggle Larivar',
      sequences: ['l']
    },
   toggleVishraams: {
     name: 'Toggle Vishraams',
     sequences: ['v'],
   },
   centerAlign: {
     name: 'Center Align',
     sequences: ['meta+shift+c', 'ctrl+shift+c']
   },
   toggleEngTranslation: {
     name: 'Toggle English Translation',
     sequences: ['shift+e'], // alt + e = Dead, accoring to hotkeys handler
   },
   togglePunjabiTranslation: {
     name: 'Toggle Punjabi Translation',
     sequences: ['shift+t']
   },
   toggleSpanishTranslation: {
    name: 'Toggle Spanish Translation',
    sequences: ['shift+s'],
   },
   toggleEngTranslit: {
     name: 'Toggle English Transliteration',
     sequences: ['meta+alt+shift+e', 'ctrl+alt+shift+e']
   },
   toggleShahTranslit: {
    name: 'Toggle Shahmukhi Transliteration',
    sequences: ['meta+alt+shift+s', 'ctrl+alt+shift+t+s']
   },
   toggleHinTranslit: {
    name: 'Toggle Hindi Transliteration',
    sequences: ['meta+alt+shift+h', 'ctrl+alt+shift+h']
   },

}
const GlobalShortcuts = {
  toggleSearchBar: {
    name: 'activate search bar',
    sequences: ['meta+/', 'ctrl+/']
  }
}

const GlobalHandlers = {
  toggleSearchBar: (e) => {
    e.preventDefault();
    document.querySelector('#search').focus();
  }
}
const ViewerShortcutHanders = {  
  toggleLarivar: (e) => {
    e.preventDefault();
    store.dispatch({type: "TOGGLE_LARIVAAR_OPTION"})},
  toggleVishraams: (e) => {
    e.preventDefault();
    store.dispatch({type: "TOGGLE_VISRAAMS"}) },
    centerAlign: (e) => {
    e.preventDefault();
      const state = store.getState();
    store.dispatch({type: "SET_CENTER_ALIGN_OPTION", payload:!state.centerAlignGurbani }) 
  },
  toggleEngTranslation: (e) => {
    e.preventDefault();
     const state = store.getState();
     store.dispatch({type: 'SET_TRANSLATION_LANGUAGES', payload: toggleItemInArray('english', state.translationLanguages)})
  },
  togglePunjabiTranslation: (e) => {
    e.preventDefault();
    const state = store.getState();
    store.dispatch({type: 'SET_TRANSLATION_LANGUAGES', payload: toggleItemInArray('punjabi', state.translationLanguages)})
  },
  toggleSpanishTranslation: (e) => {
    e.preventDefault();
    const state = store.getState();
    store.dispatch({type: 'SET_TRANSLATION_LANGUAGES', payload: toggleItemInArray('spanish', state.translationLanguages)})
  },
  toggleEngTranslit: () => {
    const state = store.getState();
    store.dispatch({type: 'SET_TRANSLITERATION_LANGUAGES', payload: toggleItemInArray('english', state.transliterationLanguages)})
  },
  toggleShahTranslit: () => {
    const state = store.getState();
    store.dispatch({type: 'SET_TRANSLITERATION_LANGUAGES', payload: toggleItemInArray('shahmukhi', state.transliterationLanguages)})
  },
  toggleHinTranslit: () => {
    const state = store.getState();
    store.dispatch({type: 'SET_TRANSLITERATION_LANGUAGES', payload: toggleItemInArray('hindi', state.transliterationLanguages)})
  }
}

// export default Shortcuts;
export {ViewerShortcutHanders, ViewerShortcuts, GlobalHandlers, GlobalShortcuts}