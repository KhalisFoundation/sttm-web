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
  GearsIcon,
} from '@/components/Icons/CustomIcons';
import { LineHeightControl } from './components/Icons/CustomIcons';

const LINE_HEIGHT_CHANGE = 0.2;
const MAX_LINE_HEIGHT = 2;
const MIN_LINE_HEIGHT = 1;
export interface SETTING_ACTIONS {
  setTranslationLanguages: Function,
  setTransliterationLanguages: Function,
  resetDisplayOptions: Function,
  resetFontOptions: Function,
  toggleVisraams: Function,
  toggleLarivaarOption: Function,
  toggleLarivaarAssistOption: Function,
  setFontSize: Function,
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
  fontSize: any,
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
          // value: Math.floor(fontSize * 10)
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
          // value: Math.floor(fontSize * 10)
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
      label: 'Larivaar',
      controlsList: [
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
}

export const ADVANCED_SETTINGS = ({
  setVisraamSource,
  setVisraamStyle,
  setLineHeight,
  toggleParagraphMode,
  paragraphMode,
  lineHeight,
  changeFont,
  visraamSource,
  visraamStyle,
  fontFamily,
}: SETTING_ACTIONS) => [
    {
      type: 'icon-toggle',
      label: 'Line Height',
      controlsList: [
        {
          icon: MinusIcon,
          action: () => setLineHeight(Math.max(toFixedFloat(lineHeight - LINE_HEIGHT_CHANGE), MIN_LINE_HEIGHT)),
        },
        {
          control: LineHeightControl,
          actionType: 'change',
          action: (val: number) => setLineHeight(toFixedFloat(val)),
          value: lineHeight
        },
        {
          icon: PlusIcon,
          action: () => setLineHeight(Math.min(toFixedFloat(lineHeight + LINE_HEIGHT_CHANGE), MAX_LINE_HEIGHT)),
        },
      ],
    },
    {
      type: 'toggle-option',
      label: 'Paragraph',
      checked: paragraphMode,
      action: toggleParagraphMode,
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