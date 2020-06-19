import {
  TRANSLATION_LANGUAGES,
  TRANSLITERATION_LANGUAGES,
  FONT_OPTIONS,
  VISRAAM_CONSTANTS,
} from './constants';

import { toggleItemInArray, toFixedFloat } from './util';

import {
  LarivaarIcon,
  LarivaarAssistIcon,
  PlusIcon,
  MinusIcon,
  FontSizeControl,
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
  toggleLarivaarOption: Function,
  toggleLarivaarAssistOption: Function,
  setFontSize: Function,
  setTranslationFontSize: Function,
  setTransliterationFontSize: Function,
  setLineHeight: Function,
  toggleCenterAlignOption: Function,
  toggleSplitViewOption: Function,
  toggleDarkMode: Function,
  toggleParagraphMode: Function,
  setVisraamSource: Function,
  setVisraamStyle: Function,
  changeFont: Function,
  toggleAdvancedOptions: Function,

  translationLanguages: string[],
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
}: SETTING_ACTIONS) => {

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
            toggleItemInArray(lang, transliterationLanguages)
          )
        }
      }, {
        label: 'Translation',
        options: TRANSLATION_LANGUAGES,
        checked: translationLanguages,
        action: (lang: string) => {
          setTranslationLanguages(
            toggleItemInArray(lang, translationLanguages)
          )
        }
      }
      ],
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
          control: FontSizeControl,
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
    {
      type: 'icon-toggle',
      label: "Paragraph",
      controlsList: [
        {
          icon: ParagraphIcon,
          action: toggleParagraphMode,
          value: paragraphMode,
        }
      ]
    },
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
  ]
}

export const ADVANCED_SETTINGS = ({
  setVisraamSource,
  setVisraamStyle,
  setLineHeight,
  lineHeight,
  changeFont,
  visraamSource,
  visraamStyle,
  fontFamily,
  setTranslationFontSize,
  setTransliterationFontSize,
  translationFontSize,
  transliterationFontSize,
}: SETTING_ACTIONS) => [
    {
      type: 'icon-toggle',
      label: 'Line Height',
      controlsList: [
        {
          icon: MinusIcon,
          action: () => setLineHeight(Math.max(toFixedFloat(lineHeight - 0.2), 1)),
        },
        {
          control: FontSizeControl,
          controlOptions: [1, 1.2, 1.4, 1.6, 1.8, 2],
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
          control: FontSizeControl,
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
          control: FontSizeControl,
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
    {
      type: 'dropdown',
      label: 'Visraam Source',
      value: visraamSource,
      action: setVisraamSource,
      options: VISRAAM_CONSTANTS.SOURCES,
    },
    {
      type: 'dropdown',
      label: 'Visraam Style',
      value: visraamStyle,
      action: setVisraamStyle,
      options: VISRAAM_CONSTANTS.TYPES,
    },
    {
      type: 'dropdown',
      label: 'Font Family',
      value: fontFamily,
      action: changeFont,
      options: FONT_OPTIONS,
    },
  ]