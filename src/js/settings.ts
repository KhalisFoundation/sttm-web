import {
  TRANSLATION_LANGUAGES,
  TRANSLITERATION_LANGUAGES,
} from './constants';

import { toggleItemInArray } from './util';

export const QUICK_SETTINGS = (
  translationLanguages: Array<string>,
  transliterationLanguages: Array<string>,
  setTranslationLanguages: Function,
  setTransliterationLanguages: Function,
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
    // {
    //   type: 'icon_toggle',
    //   label: 'Font Size',
    //   icon: 'something',
    // }
  ]
