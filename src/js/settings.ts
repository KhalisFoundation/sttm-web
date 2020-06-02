import {
  TRANSLATION_LANGUAGES,
  TRANSLITERATION_LANGUAGES,
  FONT_OPTIONS,
  VISRAAM_CONSTANTS,
} from './constants';

import { toggleItemInArray } from './util';

import {
  LarivaarIcon,
  LarivaarAssistIcon,
  FontPlus,
  CurrentFont,
  FontMinus,
  AlignCenterIcon,
  AlignLeftIcon,
  SplitViewIcon,
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
  toggleCenterAlignOption: Function,
  toggleSplitViewOption: Function,
  toggleDarkMode: Function,
  setVisraamSource: Function,
  setVisraamStyle: Function,
  changeFont: Function,
  toggleAdvancedOptions: Function,

  translationLanguages: Array<string>,
  transliterationLanguages: Array<string>,
  visraams: Boolean,
  visraamSource: String,
  visraamStyle: String,
  larivaarAssist: Boolean,
  larivaar: Boolean,
  fontSize: any,
  centerAlignGurbani: Boolean,
  splitView: Boolean,
  darkMode: Boolean,
  autoScrollMode: Boolean,
  fontFamily: String,
  showAdvancedOptions: Boolean,
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
  toggleDarkMode,

  translationLanguages,
  transliterationLanguages,
  visraams,
  larivaarAssist,
  larivaar,
  fontSize,
  centerAlignGurbani,
  splitView,
  showAdvancedOptions,
  darkMode,
}: SETTING_ACTIONS) => [
    {
      type: 'multiselect_checkbox',
      label: 'Display',
      collections: [{
        label: 'Transliteration',
        options: TRANSLITERATION_LANGUAGES,
        checked: transliterationLanguages,
        action: (lang: String) => {
          setTransliterationLanguages(
            toggleItemInArray(lang, transliterationLanguages)
          )
        }
      }, {
        label: 'Translation',
        options: TRANSLATION_LANGUAGES,
        checked: translationLanguages,
        action: (lang: String) => {
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
      iconList: [
        {
          icon: FontMinus,
          action: () => {
            fontSize >= 1.6 && setFontSize(parseFloat((fontSize - 0.4).toFixed(1)));
          },
          value: Math.floor(fontSize * 10)
        },
        {
          icon: CurrentFont,
          action: (size: any) => { setFontSize(parseFloat((size / 10).toFixed(1))); },
          value: Math.floor(fontSize * 10),
        },
        {
          icon: FontPlus,
          action: () => {
            fontSize < 3.2 && setFontSize(parseFloat((fontSize + 0.4).toFixed(1)));
          },
          value: Math.floor(fontSize * 10)
        },
      ],
    },
    { type: 'separator' },
    {
      type: 'icon-toggle',
      label: 'Text Align',
      iconList: [
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
      iconList: [
        {
          icon: SplitViewIcon,
          action: toggleSplitViewOption,
          value: splitView,
        },
      ],
    },
    {
      type: 'icon-toggle',
      label: 'Larivaar',
      iconList: [
        {
          icon: LarivaarIcon,
          action: () => {
            if (larivaarAssist) {
              toggleLarivaarAssistOption();
            } else {
              toggleLarivaarOption();
            }
          },
          value: larivaar,
        },
        {
          icon: LarivaarAssistIcon,
          action: () => {
            if (larivaar) {
              toggleLarivaarAssistOption();
            } else {
              toggleLarivaarOption();
              toggleLarivaarAssistOption();
            }
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

export const ADVANCED_SETTINGS = ({
  setVisraamSource,
  setVisraamStyle,
  changeFont,

  toggleAutoScrollMode,
  autoScrollMode,
  visraamSource,
  visraamStyle,
  fontFamily,
}: SETTING_ACTIONS) => [
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
      type: 'toggle-option',
      label: 'Auto Scroll Mode',
      checked: autoScrollMode,
      action: toggleAutoScrollMode,
    },
    {
      type: 'dropdown',
      label: 'Font Family',
      value: fontFamily,
      action: changeFont,
      options: FONT_OPTIONS,
    },
  ]