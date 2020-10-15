import {
  TRANSLATION_LANGUAGES,
  TRANSLITERATION_LANGUAGES,
  FONT_OPTIONS,
  VISRAAM,
  STEEK_LANGUAGES,
} from '@/constants';

import {
  selectItemInArray,
  toFixedFloat,
  isShowParagraphModeRoute,
  isShowAutoScrollRoute,
  isShowSehajPaathModeRoute,
} from '@/util';

import {
  LarivaarIcon,
  LarivaarAssistIcon,
  PlusIcon,
  MinusIcon,
  SizeControl,
  AlignCenterIcon,
  AlignLeftIcon,
  SplitViewIcon,
  ParagraphIcon,
  GearsIcon,
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
  fontFamily: string,
  showAdvancedOptions: boolean,
}

export const QUICK_SETTINGS = ({
  setTranslationLanguages,
  setTransliterationLanguages,
  resetDisplayOptions,
  resetFontOptions,
  toggleVisraams,
  toggleLarivaarOption,
  toggleLarivaarAssistOption,
  setFontSize,
  toggleCenterAlignOption,
  toggleSplitViewOption,
  toggleAdvancedOptions,
  toggleParagraphMode,
  toggleDarkMode,
  setSteekLanguages,
  translationLanguages,
  transliterationLanguages,
  visraams,
  larivaarAssist,
  larivaar,
  fontSize,
  paragraphMode,
  centerAlignGurbani,
  splitView,
  showAdvancedOptions,
  darkMode,
  location,
  steekLanguages,
}: SETTING_ACTIONS) => {

  const isParagraphMode = isShowParagraphModeRoute(location.pathname);

  return [
    {
      type: 'multiselect_checkbox',
      label: 'Display',
      collections: [{
        label: 'Transliteration',
        options: TRANSLITERATION_LANGUAGES,
        checked: transliterationLanguages,
        action: (lang: string) => {
          setTransliterationLanguages(
            selectItemInArray(lang, transliterationLanguages)
          )
        }
      },
      {
        label: 'Translation',
        options: TRANSLATION_LANGUAGES,
        checked: translationLanguages,
        action: (lang: string) => {
          setTranslationLanguages(
            selectItemInArray(lang, translationLanguages)
          )
        }
      },
      {
        label: 'Steek',
        options: STEEK_LANGUAGES,
        checked: steekLanguages,
        action: (lang: string) => {
          setSteekLanguages(
            selectItemInArray(lang, steekLanguages)
          )
        }
      }],
    },
    {
      type: 'icon-toggle',
      label: 'Font Size',
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
    { type: 'separator' },
    {
      type: 'icon-toggle',
      label: 'Text Align',
      controlsList: [
        {
          icon: AlignLeftIcon,
          action: () => {
            centerAlignGurbani && toggleCenterAlignOption();
          },
          value: !centerAlignGurbani,
        },
        {
          icon: AlignCenterIcon,
          action: () => {
            !centerAlignGurbani && toggleCenterAlignOption();
          },
          value: centerAlignGurbani,
        },
      ],
    },
    {
      type: 'icon-toggle',
      label: 'Split',
      controlsList: [
        {
          icon: SplitViewIcon,
          action: toggleSplitViewOption,
          value: splitView,
        },
      ],
    },
    isParagraphMode ? {
      type: 'icon-toggle',
      label: "Paragraph",
      controlsList: [
        {
          icon: ParagraphIcon,
          action: toggleParagraphMode,
          value: paragraphMode,
        }
      ]
    } : {},
    {
      type: 'icon-toggle',
      label: 'Larivaar',
      controlsList: [
        {
          icon: LarivaarIcon,
          action: () => {
            toggleLarivaarOption();
          },
          value: larivaar,
        },
        {
          icon: LarivaarAssistIcon,
          action: () => {
            toggleLarivaarAssistOption();
          },
          value: larivaarAssist
        }
      ],
    },
    { type: 'separator' },
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
    { type: 'separator' },
    {
      type: 'text-option',
      label: 'Reset',
      action: () => {
        resetDisplayOptions();
        resetFontOptions();
        larivaarAssist && toggleLarivaarAssistOption();
        larivaar && toggleLarivaarOption();
      },
    },
    {
      type: 'icon-text-toggle',
      icon: GearsIcon,
      label: 'Advanced',
      value: showAdvancedOptions,
      action: toggleAdvancedOptions,
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

  setLarivaarAssistStrength,
  toggleAutoScrollMode,
  autoScrollMode,
  visraamSource,
  visraamStyle,
  fontFamily,
  setTranslationFontSize,
  setTransliterationFontSize,
  translationFontSize,
  transliterationFontSize,
  location
}: SETTING_ACTIONS) => {
  const isShowAutoScroll = isShowAutoScrollRoute(location.pathname);
  const isShowSehajPaathMode = isShowSehajPaathModeRoute(location.pathname);

  return [
    isShowAutoScroll ? {
      type: 'toggle-option',
      label: 'Auto Scroll',
      checked: autoScrollMode,
      action: toggleAutoScrollMode,
    } : {},
    isShowSehajPaathMode ? {
      type: 'toggle-option',
      label: 'Sehaj Paath Mode',
      checked: sehajPaathMode,
      stage: 'beta',
      action: toggleSehajPaathMode,
    } : {},
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
      label: 'Translation',
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
      label: 'Transliteration',
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
    larivaarAssist ? {
      type: 'icon-toggle',
      label: 'Larivaar contrast',
      controlsList: [
        {
          icon: MinusIcon,
          action: () => setLarivaarAssistStrength(Math.max(larivaarAssistStrength - 1, 1))
        },
        {
          control: SizeControl,
          controlOptions: [1, 2, 3, 4, 5],
          actionType: 'change',
          action: (strength: number) => setLarivaarAssistStrength(Number(strength)),
          value: larivaarAssistStrength,
        },
        {
          icon: PlusIcon,
          action: () => setLarivaarAssistStrength(Math.min(larivaarAssistStrength + 1, 5))
        },
      ],
    } : {},
    {
      type: 'dropdown',
      label: 'Visraam Source',
      value: visraamSource,
      action: setVisraamSource,
      options: VISRAAM.SOURCES,
    },
    {
      type: 'dropdown',
      label: 'Visraam Style',
      value: visraamStyle,
      action: setVisraamStyle,
      options: VISRAAM.TYPES,
    },
    {
      type: 'dropdown',
      label: 'Font Family',
      value: fontFamily,
      action: changeFont,
      options: FONT_OPTIONS,
    },
  ]
}
