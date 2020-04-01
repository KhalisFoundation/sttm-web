import {
  TRANSLATION_LANGUAGES,
  TRANSLITERATION_LANGUAGES,
} from './constants';

import { toggleItemInArray } from './util';
import { toggleLarivaarAssistOption } from '@/features/actions';
import {
  LarivaarIcon,
  LarivaarAssistIcon,
  FontPlus,
  CurrentFont,
  FontMinus,
  AlignCenterIcon,
  AlignLeftIcon,
  SplitViewIcon,
} from '@/components/Icons/CustomIcons';

export const QUICK_SETTINGS = (
  translationLanguages: Array<string>,
  transliterationLanguages: Array<string>,
  setTranslationLanguages: Function,
  setTransliterationLanguages: Function,
  resetDisplayOptions: Function,
  resetFontOptions: Function,
  toggleVisraams: Function,
  toggleLarivaarOption: Function,
  toggleLarivaarAssistOption: Function,
  visraams: Boolean,
  larivaarAssist: Boolean,
  larivaar: Boolean,
  setFontSize: Function,
  fontSize: number,
  toggleCenterAlignOption: Function,
  centerAlignGurbani: Boolean,
  toggleSplitViewOption: Function,
  splitView: Boolean,
) => [
    {
      type: 'multiselect_checkbox',
      label: 'Transliteration',
      options: TRANSLITERATION_LANGUAGES,
      checked: transliterationLanguages,
      action: (lang: String) => {
        setTransliterationLanguages(
          toggleItemInArray(lang, transliterationLanguages)
        )
      },
    },
    {
      type: 'multiselect_checkbox',
      label: 'Translation',
      options: TRANSLATION_LANGUAGES,
      checked: translationLanguages,
      action: (lang: String) => {
        setTranslationLanguages(
          toggleItemInArray(lang, translationLanguages)
        )
      },
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
          action: (size) => { setFontSize(parseFloat((size / 10).toFixed(1))); },
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
    { type: 'separator' },
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
      },
    },
    {
      type: 'text-option',
      label: 'Advanced',
      action: () => {
        console.log("will open advanced settings");
      },
    }
  ]
