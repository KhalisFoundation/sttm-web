import {
  TRANSLATION_LANGUAGES,
  TRANSLITERATION_LANGUAGES,
} from './constants';

import { toggleItemInArray } from './util';
import { toggleLarivaarAssistOption } from '@/features/actions';
import { LarivaarIcon, LarivaarAssistIcon } from '@/components/Icons/Larivaar';

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

    // {
    //   type: 'icon-toggle',
    //   label: 'Font Size',
    //   iconList: [
    //     {
    //       icon: 'fontsize1.png',
    //       action: toggleLarivaarOption,
    //     },
    //     {
    //       icon: 'fontsize2.png',
    //       action: toggleLarivaarAssistOption,
    //     },
    //     {
    //       icon: 'fontsize3.png',
    //       action: toggleLarivaarAssistOption,
    //     },
    //   ],
    // },

    {
      type: 'toggle-option',
      label: 'Vishraams',
      checked: visraams,
      action: toggleVisraams,
    },

    {
      type: 'text-option',
      label: 'Reset',
      action: () => {
        resetDisplayOptions();
        resetFontOptions();
      },
    },
    // {
    //   type: 'text-option',
    //   label: 'Advanced',
    //   action: () => {
    //     console.log("will open advanced settings");
    //   },
    // }
  ]
