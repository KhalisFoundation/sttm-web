import {
  TRANSLATION_LANGUAGES,
  TRANSLITERATION_LANGUAGES,
  TEXTS,
  STEEK_LANGUAGES,
} from '@/constants';

import {
  selectItemInArray,
  toFixedFloat,
} from '@/util';

import {
  PlusIcon,
  MinusIcon,
  SizeControl,
} from '@/components/Icons/CustomIcons';

export interface SETTING_ACTIONS {
  setTranslationLanguages: Function,
  setTransliterationLanguages: Function,
  resetDisplayOptions: Function,
  resetFontOptions: Function,
  toggleVisraams: Function,
  toggleAutoScrollMode: Function,
  toggleLarivaarOption: Function,
  toggleLarivaarAssistOption: Function,
  setFontSize: Function,
  setTranslationFontSize: Function,
  setSteekLanguages: Function,
  setTransliterationFontSize: Function,
  setLineHeight: Function,
  toggleCenterAlignOption: Function,
  toggleSplitViewOption: Function,
  toggleDarkMode: Function,
  toggleParagraphMode: Function,
  toggleSehajPaathMode: Function,
  setVisraamSource: Function,
  setVisraamStyle: Function,
  changeFont: Function,
  toggleAdvancedOptions: Function,
  setLarivaarAssistStrength: Function,
  setSgBaaniLength: Function,

  location: {
    pathname: string,
  },
  larivaarAssistStrength: number,
  translationLanguages: string[],
  steekLanguages: string[],
  transliterationLanguages: string[],
  visraams: boolean,
  visraamSource: string,
  visraamStyle: string,
  larivaarAssist: boolean,
  larivaar: boolean,
  fontSize: number,
  translationFontSize: number,
  transliterationFontSize: number,
  paragraphMode: boolean,
  sehajPaathMode: boolean,
  autoScrollMode: boolean,
  lineHeight: number,
  centerAlignGurbani: boolean,
  splitView: boolean,
  darkMode: boolean,
  sgBaaniLength: string,
  fontFamily: string,
  showAdvancedOptions: boolean,
}

export const QUICK_SETTINGS = ({
  setTranslationLanguages,
  setTransliterationLanguages,
  toggleVisraams,
  toggleSplitViewOption,
  toggleDarkMode,
  setSteekLanguages,
  translationLanguages,
  transliterationLanguages,
  visraams,
  darkMode,
  steekLanguages,
}: SETTING_ACTIONS) => {

  return [
    {
      type: 'toggle-option',
      label: 'Dark Mode',
      checked: darkMode,
      action: toggleDarkMode,
    },
    {
      type: 'toggle-option',
      label: 'Vishraams',
      checked: visraams,
      action: toggleVisraams,
    },
    {
      type: 'toggle-option',
      label: 'Split',
      action: toggleSplitViewOption,
    },
    {
      type: 'collapsible_item',
      label: TEXTS.TRANSLITERATION,
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
      collections: [
        {
          label: TEXTS.TRANSLATION,
          options: TRANSLATION_LANGUAGES,
          checked: translationLanguages,
          action: (lang: string) => {
            setTranslationLanguages(
              selectItemInArray(lang, translationLanguages)
            )
          }
        },
      ]
    },
    {
      type: 'collapsible_item',
      label: 'Steek',
      collections: [
        {
          label: 'Steek',
          options: STEEK_LANGUAGES,
          checked: steekLanguages,
          action: (lang: string) => {
            setSteekLanguages(
              selectItemInArray(lang, steekLanguages)
            )
          }
        }
      ],
    },
  ];
}

export const ADVANCED_SETTINGS = ({
  setVisraamSource,
  setVisraamStyle,
  setLineHeight,
  larivaarAssistStrength,
  lineHeight,
  changeFont,
  sehajPaathMode,
  toggleSehajPaathMode,
  larivaarAssist,
  setSgBaaniLength,
  setFontSize,
  fontSize,
  setTranslationFontSize,
  setTransliterationFontSize,
  translationFontSize,
  transliterationFontSize,
}: SETTING_ACTIONS) => {

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
