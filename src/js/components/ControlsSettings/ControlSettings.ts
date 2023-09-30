import {
  TRANSLATION_LANGUAGES,
  TRANSLITERATION_LANGUAGES,
  TEXTS,
  STEEK_LANGUAGES,
  SG_BAANIS,
  DEFAULT_SG_BAANI_LENGTH,
  DEFAULT_VISRAAM_STYLE,
  HINDI_TRANSLATION_LANGUAGES,
  ENGLISH_TRANSLATION_LANGUAGES,
} from '@/constants';

import {
  selectItemInArray,
  toFixedFloat,
  isShowAutoScrollRoute,
  isShowSehajPaathModeRoute,
} from '@/util';

import {  
  PlusIcon,
  MinusIcon,
  SizeControl,  
} from '@/components/Icons/CustomIcons';


export interface ISettingActions {
  setTranslationLanguages: () => {},
  setEnglishTranslationLanguages: (attr: string[]) => {},
  setHindiTranslationLanguages: (attr: string[]) => {},
  setTransliterationLanguages: () => {},
  resetDisplayOptions: () => {},
  resetFontOptions: () => {},
  toggleVisraams: () => {},
  toggleAutoScrollMode: () => {},
  toggleLarivaarOption: () => {},
  toggleLarivaarAssistOption: () => {},
  setFontSize: (attr: any) => {},
  setTranslationFontSize: (attr: any) => {},
  setSteekLanguages: (attr: string[]) => {},
  setTransliterationFontSize: () => {},
  setLineHeight: () => {},
  toggleCenterAlignOption: () => {},
  toggleSplitViewOption: () => {},
  toggleDarkMode: () => {},
  toggleCartoonifiedPages: () => {},
  toggleShabadAudioPlayer: () => {},
  toggleParagraphMode: () => {},
  toggleReadingMode: () => {},
  toggleSehajPaathMode: () => {},
  toggleSettingsPanel: () => {},
  closePinSettings: () => {},
  toggleKeyboardShortcutsPanel: () => {},
  setVisraamSource: () => {},
  setVisraamStyle: () => {},
  changeFont: () => {},
  toggleAdvancedOptions: () => {},
  setLarivaarAssistStrength: (attr: any) => {},
  setSgBaaniLength: (attr: any) => {},
  setSplitView: (attr: boolean) => {},
  setReadingMode: (attr: boolean) => {},
  setSehajPaathMode: (attr: boolean) => {},
  location: {
    pathname?: string,
  },
  larivaarAssistStrength: number,
  translationLanguages: string[],
  englishTranslationLanguages: string[],
  hindiTranslationLanguages: string[],
  steekLanguages: string[],
  transliterationLanguages: string[],
  showSettingsPanel: string,
  showKeyboardShortcutsPanel: string,
  visraams: boolean,
  visraamSource: string,
  visraamStyle: string,
  larivaarAssist: boolean,
  larivaar: boolean,
  fontSize: number,
  translationFontSize: number,
  transliterationFontSize: number,
  paragraphMode: boolean,
  readingMode: boolean,
  sehajPaathMode: boolean,
  autoScrollMode: boolean,
  lineHeight: number,
  centerAlignGurbani: boolean,
  splitView: boolean,
  darkMode: boolean,
  sgBaaniLength: string,
  fontFamily: string,
  showAdvancedOptions: boolean,
  showCartoonifiedPages: boolean,
  showShabadAudioPlayer: boolean,
}

export const HEADER_SETTINGS = ({
  toggleSettingsPanel,
  closePinSettings,
  toggleKeyboardShortcutsPanel,
  showSettingsPanel,
  showKeyboardShortcutsPanel  
}: ISettingActions) => {
  return [
    {
      type: 'header',
      label: showKeyboardShortcutsPanel ? 'Shortcuts' : 'Settings',
      value: showSettingsPanel,
      action: showKeyboardShortcutsPanel
        ? () => {
            toggleKeyboardShortcutsPanel(), toggleSettingsPanel();
          }
        : () => {
            closePinSettings(), toggleSettingsPanel();
          },
    },
  ];
}

export const KEYBOARD_SHORTCUTS = () =>{
  return [
    {
      type: 'keyboard-shortcut-options',
      label: 'Larivar',
      shortcut: ['l'],
    },
    {
      type: 'keyboard-shortcut-options',
      label: 'Larivar Assist',
      shortcut: ['shift+l'],
    },
    {
      type: 'keyboard-shortcut-options',
      label: 'Vishraams',
      shortcut: ['v'],
    },
    {
      type: 'keyboard-shortcut-options',
      label: 'AutoScroll Mode',
      shortcut: ['a'],
    },
    {
      type: 'keyboard-shortcut-options',
      label: 'Dark Mode',
      shortcut: ['o'],
    },
    {
      type: 'keyboard-shortcut-options',
      label: 'Split Mode',
      shortcut: ['/'],
    },
    {
      type: 'keyboard-shortcut-options',
      label: 'FullScreen Mode',
      shortcut: ['f'],
    },
    {
      type: 'keyboard-shortcut-options',
      label: 'Reading Mode',
      shortcut: ['r'],
    },
    {
      type: 'keyboard-shortcut-options',
      label: 'Unicode',
      shortcut: ['u'],
    },
    {
      type: 'keyboard-shortcut-options',
      label: 'Center Align',
      shortcut: ['(cmd)ctrl+shift+c'],
    },
    {
      type: 'keyboard-shortcut-options',
      label: 'English Translation',
      shortcut: ['e'],
    },
    {
      type: 'keyboard-shortcut-options',
      label: 'Punjabi Translation',
      shortcut: ['t'],
    },
    {
      type: 'keyboard-shortcut-options',
      label: 'Spanish Translation',
      shortcut: ['s'],
    },
    {
      type: 'keyboard-shortcut-options',
      label: 'English Transliteration',
      shortcut: ['shift+e'],
    },
    {
      type: 'keyboard-shortcut-options',
      label: 'Shahmukhi Transliteration',
      shortcut: ['shift+s'],
    },
    {
      type: 'keyboard-shortcut-options',
      label: 'Hindi Transliteration',
      shortcut: ['shift+h'],
    },
    {
      type: 'keyboard-shortcut-options',
      label: 'Increase Font Size',
      shortcut: ['+'],
    },
    {
      type: 'keyboard-shortcut-options',
      label: 'Decrease Font Size',
      shortcut: ['-'],
    },
    {
      type: 'keyboard-shortcut-options',
      label: 'Search Bar',
      shortcut: ['(cmd)ctrl+/'],
    },
]
}

export const QUICK_SETTINGS = ({
  setTranslationLanguages,
  setTransliterationLanguages,
  setEnglishTranslationLanguages, 
  setHindiTranslationLanguages,
  toggleVisraams,
  toggleLarivaarOption,
  toggleLarivaarAssistOption,
  toggleCenterAlignOption,
  toggleSplitViewOption,
  toggleDarkMode,
  toggleCartoonifiedPages,
  toggleShabadAudioPlayer,
  toggleParagraphMode,
  toggleReadingMode,
  toggleSehajPaathMode,
  toggleAutoScrollMode,
  setSteekLanguages,
  setSgBaaniLength,
  setVisraamStyle,
  setSplitView,
  setReadingMode,
  setSehajPaathMode,
  translationLanguages,
  englishTranslationLanguages,
  hindiTranslationLanguages,
  transliterationLanguages,
  sehajPaathMode,
  autoScrollMode,
  visraams,
  visraamStyle,
  larivaarAssist,
  larivaar,
  centerAlignGurbani,
  splitView,
  darkMode,
  showCartoonifiedPages,
  showShabadAudioPlayer,
  paragraphMode,
  readingMode,
  steekLanguages,
  sgBaaniLength,
  // eslint-disable-next-line no-unused-vars
  location: { pathname = '/' } = {},
}: ISettingActions) => {
  const isShowSehajPaathMode = isShowSehajPaathModeRoute(location.pathname);
  const isShowAutoScroll = isShowAutoScrollRoute(location.pathname);
  const isSundarGutkaRoute = location.pathname.includes('sundar-gutka');

  return [
    {
      type: 'label-options',
      label: 'Text Align',
      tooltip: 'Align the shabad ( cmd/ctrl+shift+c )',
      collections: [
        {
          label: 'Text Align Left',
          options: "",
          checked: !centerAlignGurbani,
          action: toggleCenterAlignOption
        },
        {
          label: 'Text Align Center',
          options: "",
          checked: centerAlignGurbani,
          action: toggleCenterAlignOption
        },
      ]
    },  
    {
      type: 'two-columns',
      label: '',
      collections: [
        {
          label: 'Larivaar',
          checked: larivaar,
          tooltip: "Set the Larivaar or Padhshed mode ( l )",
          action: toggleLarivaarOption
        },
        {
          label: 'Larivaar Assist',
          checked: larivaarAssist,
          tooltip: "Toggle the Larivaar assistance ( shift+l )",
          action: toggleLarivaarAssistOption
        },
      ]
    },    
    isSundarGutkaRoute ? {
      type: 'label-options-custom',
      label: 'Baanis Length',
      tooltip: 'Set Baani Type',
      checked: true,
      collections:         
        SG_BAANIS.map(({name: lengthName, length, value: lengthValue}) => (
          {
            label: lengthName,
            options: lengthValue,
            checked: length === sgBaaniLength,
            action: (selectedSgBaaniValue: string) => {              
              const {length: selectedLength} = SG_BAANIS.find(({ value }) => value === parseInt(selectedSgBaaniValue))
              setSgBaaniLength(selectedLength ? selectedLength : DEFAULT_SG_BAANI_LENGTH);
            },
          }
        ))
    } : {},
    isSundarGutkaRoute ? {
      type: 'toggle-option',
      label: "Paragraph",
      tooltip: 'Set the paragraph mode',
      checked: paragraphMode,
      action: toggleParagraphMode
    } : {},   
    {
      type: 'toggle-option',
      label: 'Dark Mode',
      tooltip: 'Set the dark or light mode ( o )',
      checked: darkMode,
      action: toggleDarkMode,
    },
    {
      type: 'toggle-option',
      label: 'Vishraams',
      tooltip: 'Add vishraams help ( v )',
      checked: visraams,
      action: toggleVisraams,
    },
    visraams ?
    {
      type: 'label-options-custom',
      label: 'Vishraam Style',
      tooltip: 'Set vishraams style',
      checked: visraams,
      collections: [
        {
          label: 'Vishraams - Colored',
          options: 'colored-words',
          checked: visraamStyle === 'colored-words' && visraams,
          action: (selectedVisraamStyleValue: string) => {
            setVisraamStyle(selectedVisraamStyleValue ? selectedVisraamStyleValue : DEFAULT_VISRAAM_STYLE)
          }
        },
        {
          label: 'Vishraams - Gradient',
          options: 'gradient-bg',
          checked: visraamStyle === 'gradient-bg' && visraams,
          action: (selectedVisraamStyleValue: string) => {
            setVisraamStyle(selectedVisraamStyleValue ? selectedVisraamStyleValue : DEFAULT_VISRAAM_STYLE)
          }
        },
      ]
    }: {},
    isShowSehajPaathMode ? {
      type: 'toggle-option',
      label: 'Reading [Akhand Paath]',
      tooltip: 'Set reading mode into Akhand Paath ( r )',
      checked: sehajPaathMode,
      stage: 'beta',
      action: () => {toggleSehajPaathMode(), setReadingMode(false), setSplitView(false)}
    } : {},
    isShowAutoScroll ? {
      type: 'toggle-option',
      label: 'Auto Scroll',
      tooltip: 'Start auto scrolling ( a )',
      checked: autoScrollMode,
      action: toggleAutoScrollMode,
    } : {},
    {
      type: 'toggle-option',
      label: 'Split',
      tooltip: 'Set split mode ( / )',
      checked: splitView,
      action: () => {toggleSplitViewOption(), setReadingMode(false), setSehajPaathMode(false) }
    },
    !isShowSehajPaathMode ? {
      type: 'toggle-option',
      label: 'Reading',
      tooltip: 'Set reading mode',
      checked: readingMode,
      action: () => {toggleReadingMode(), setSplitView(false), setSehajPaathMode(false) }
    } : {},
    {
      type: 'toggle-option',
      label: 'Cartoon Images',
      tooltip: 'Enable or disable cartoon images',
      checked: showCartoonifiedPages,
      action: toggleCartoonifiedPages,
    },
    {
      type: 'toggle-option',
      label: 'Audio Player',
      tooltip: 'Enable or disable audio player',
      checked: showShabadAudioPlayer,
      action: toggleShabadAudioPlayer,
    },          
    {
      type: 'collapsible_item',
      label: TEXTS.TRANSLITERATION,
      tooltip: 'Open the dropdown and select the transliteration source.(English - shift+e , Shahmukhi - shift+s , Hindi - shift+h)',
      collections: [
        {
          label: TEXTS.TRANSLITERATION,
          options: TRANSLITERATION_LANGUAGES,
          checked: transliterationLanguages,
          action: (lang: string) => {
            setTransliterationLanguages(
              selectItemInArray(lang, transliterationLanguages)
            )
          }
        },
      ]
    },
    {
      type: 'collapsible_item',
      label: TEXTS.TRANSLATION,
      tooltip: 'Open the dropdown and select the translation source.(English - e , Punjabi - t , Spanish - s)',
      collections: [
        {
          label: TEXTS.TRANSLATION,
          options: TRANSLATION_LANGUAGES,
          checked: translationLanguages,
          action: (lang: string) => {
            setTranslationLanguages(
              selectItemInArray(lang, translationLanguages)
            )
          },
          // children keys must be present in parent options values
          children: {
            punjabi: {
              label: TEXTS.PUNJABI_TRANSLATION,
              options: STEEK_LANGUAGES,
              checked: steekLanguages,
              action: (lang: string) => {
                setSteekLanguages(
                  selectItemInArray(lang, steekLanguages)
                )
              }
            },
            english: {
              label: TEXTS.ENGLISH_TRANSLATION,
              options: ENGLISH_TRANSLATION_LANGUAGES,
              checked: englishTranslationLanguages,
              action: (lang: string) => {
                setEnglishTranslationLanguages(
                  selectItemInArray(lang, englishTranslationLanguages)
                )
              },
            }, 
            hindi: {
              label: TEXTS.HINDI_TRANSLATION,
              options: HINDI_TRANSLATION_LANGUAGES,
              checked: hindiTranslationLanguages,
              action: (lang: string) => {
                setHindiTranslationLanguages(
                  selectItemInArray(lang, hindiTranslationLanguages)
                )
              },
            }
          }
        },
      ]
    },
  ];
}

export const ADVANCED_SETTINGS = ({
  setLineHeight,
  lineHeight,
  setFontSize,
  fontSize,
  setTranslationFontSize,
  setTransliterationFontSize,
  translationFontSize,
  transliterationFontSize,
}: ISettingActions) => {

  return [
    {
      type: 'font-update',
      label: TEXTS.FONT_SIZE,
      controlsList: [
        {
          icon: MinusIcon,
          action: () => {
            fontSize >= 1.6 && setFontSize(toFixedFloat(fontSize - 0.4));
          },
        },
        {
          control: SizeControl,
          actionType: 'change',
          action: (size: any) => { setFontSize(toFixedFloat((size / 10))); },
          value: Math.floor(fontSize * 10),
        },
        {
          icon: PlusIcon,
          action: () => {
            fontSize < 3.2 && setFontSize(toFixedFloat(fontSize + 0.4));
          },
        },
      ],
    },
    {
      type: 'icon-toggle',
      label: 'Line Height',
      controlsList: [
        {
          icon: MinusIcon,
          action: () => setLineHeight(Math.max(toFixedFloat(lineHeight - 0.2), 1.2)),
        },
        {
          control: SizeControl,
          controlOptions: [1.2, 1.4, 1.6, 1.8, 2],
          actionType: 'change',
          action: (val: number) => setLineHeight(toFixedFloat(val)),
          value: lineHeight
        },
        {
          icon: PlusIcon,
          action: () => setLineHeight(Math.min(toFixedFloat(lineHeight + 0.2), 2)),
        },
      ],
    },
    {
      type: 'icon-toggle',
      label: TEXTS.TRANSLATION,
      controlsList: [
        {
          icon: MinusIcon,
          action: () => setTranslationFontSize(Math.max(toFixedFloat(translationFontSize - 0.4), 1.2))
        },
        {
          control: SizeControl,
          controlOptions: [12, 16, 20, 24],
          actionType: 'change',
          action: (size: number) => setTranslationFontSize(toFixedFloat((size / 10))),
          value: Math.floor(translationFontSize * 10),
        },
        {
          icon: PlusIcon,
          action: () => setTranslationFontSize(Math.min(toFixedFloat(translationFontSize + 0.4), 2.4))
        },
      ],
    },
    {
      type: 'icon-toggle',
      label: TEXTS.TRANSLITERATION,
      controlsList: [
        {
          icon: MinusIcon,
          action: () => setTransliterationFontSize(Math.max(toFixedFloat(transliterationFontSize - 0.4), 1.2))
        },
        {
          control: SizeControl,
          actionType: 'change',
          action: (size: number) => setTransliterationFontSize(toFixedFloat((size / 10))),
          value: Math.floor(transliterationFontSize * 10),
        },
        {
          icon: PlusIcon,
          action: () => setTransliterationFontSize(Math.min(toFixedFloat(transliterationFontSize + 0.4), 3.2))
        },
      ],
    },

  ]
}

export const RESET_SETTING = ({
  larivaarAssist,
  larivaar,
  resetDisplayOptions,
  resetFontOptions,
  toggleLarivaarAssistOption,
  toggleLarivaarOption,
}: ISettingActions) => (
  {
    type: 'reset-button',
    label: TEXTS.RESET,
    action: () => {
      resetDisplayOptions();
      resetFontOptions();
      larivaarAssist && toggleLarivaarAssistOption();
      larivaar && toggleLarivaarOption();
    },
  }
)
