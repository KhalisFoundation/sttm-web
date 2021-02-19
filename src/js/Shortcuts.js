import store from './features/store'
import { selectItemInArray } from './util'

const ViewerShortcuts = {
  toggleLarivar: {
    name: 'Toggle Larivar',
    sequences: ['l']
  },
  toggleLarivarAssist: {
    name: "Toggle Larivar Assist",
    sequences: ['shift+l']
  },
  toggleVishraams: {
    name: 'Toggle Vishraams',
    sequences: ['v'],
  },
  toggleAutoScrollMode: {
    name: 'Toggle AutoScroll Mode',
    sequences: ['a']
  },
  centerAlign: {
    name: 'Center Align',
    sequences: ['meta+shift+c', 'ctrl+shift+c']
  },
  toggleEngTranslation: {
    name: 'Toggle English Translation',
    sequences: ['e'], // alt + e = Dead, accoring to hotkeys handler
  },
  togglePunjabiTranslation: {
    name: 'Toggle Punjabi Translation',
    sequences: ['t']
  },
  toggleSpanishTranslation: {
    name: 'Toggle Spanish Translation',
    sequences: ['s'],
  },
  toggleEngTranslit: {
    name: 'Toggle English Transliteration',
    sequences: ['shift+e']
  },
  toggleShahTranslit: {
    name: 'Toggle Shahmukhi Transliteration',
    sequences: ['shift+s']
  },
  toggleHinTranslit: {
    name: 'Toggle Hindi Transliteration',
    sequences: ['shift+h']
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
    const searchbar = document.querySelector('#search')

    searchbar.focus()
    searchbar.value = ''
  }
}
const ViewerShortcutHanders = {
  toggleLarivar: () => {
    store.dispatch({ type: "TOGGLE_LARIVAAR_OPTION" })
  },
  toggleLarivarAssist: () => {
    store.dispatch({ type: 'TOGGLE_LARIVAAR_ASSIST_OPTION', })
  },
  toggleVishraams: () => {
    store.dispatch({ type: "TOGGLE_VISRAAMS" })
  },
  toggleAutoScrollMode: () => {
    store.dispatch({ type: "TOGGLE_AUTO_SCROLL_MODE" })
  },
  centerAlign: () => {
    const state = store.getState();
    store.dispatch({ type: "SET_CENTER_ALIGN_OPTION", payload: !state.centerAlignGurbani })
  },
  toggleEngTranslation: (e) => {
    e.preventDefault();
    const state = store.getState();
    store.dispatch({ type: 'SET_TRANSLATION_LANGUAGES', payload: selectItemInArray('english', state.translationLanguages) })
  },
  togglePunjabiTranslation: (e) => {
    e.preventDefault();
    const state = store.getState();
    store.dispatch({ type: 'SET_TRANSLATION_LANGUAGES', payload: selectItemInArray('punjabi', state.translationLanguages) })
  },
  toggleSpanishTranslation: (e) => {
    e.preventDefault();
    const state = store.getState();
    store.dispatch({ type: 'SET_TRANSLATION_LANGUAGES', payload: selectItemInArray('spanish', state.translationLanguages) })
  },
  toggleEngTranslit: () => {
    const state = store.getState();
    store.dispatch({ type: 'SET_TRANSLITERATION_LANGUAGES', payload: selectItemInArray('english', state.transliterationLanguages) })
  },
  toggleShahTranslit: () => {
    const state = store.getState();
    store.dispatch({ type: 'SET_TRANSLITERATION_LANGUAGES', payload: selectItemInArray('shahmukhi', state.transliterationLanguages) })
  },
  toggleHinTranslit: () => {
    const state = store.getState();
    store.dispatch({ type: 'SET_TRANSLITERATION_LANGUAGES', payload: selectItemInArray('hindi', state.transliterationLanguages) })
  }
}

// export default Shortcuts;
export { ViewerShortcutHanders, ViewerShortcuts, GlobalHandlers, GlobalShortcuts }