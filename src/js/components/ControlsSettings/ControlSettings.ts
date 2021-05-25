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
  toggleParagraphMode: () => {},
  toggleSehajPaathMode: () => {},
  toggleSettingsPanel: () => {},
  setVisraamSource: () => {},
  setVisraamStyle: () => {},
  changeFont: () => {},
  toggleAdvancedOptions: () => {},
  setLarivaarAssistStrength: (attr: any) => {},
  setSgBaaniLength: (attr: any) => {},
  location: {
    pathname: string,
  },
  larivaarAssistStrength: number,
  translationLanguages: string[],
  steekLanguages: string[],
  transliterationLanguages: string[],
  showSettingsPanel: string,
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

export const HEADER_SETTINGS = ({
  toggleSettingsPanel,
  showSettingsPanel,
}: ISettingActions) => {
  return [
    {
      type: 'header',
      label: 'Settings',
      value: showSettingsPanel,
      action: toggleSettingsPanel,
    },
  ]
}

export const QUICK_SETTINGS = ({
  setTranslationLanguages,
  setTransliterationLanguages,
  toggleVisraams,
  toggleLarivaarOption,
  toggleLarivaarAssistOption,
  toggleCenterAlignOption,
  toggleSplitViewOption,
  toggleDarkMode,
  toggleParagraphMode,
  toggleSehajPaathMode,
  toggleAutoScrollMode,
  setSteekLanguages,
  setSgBaaniLength,
  setVisraamStyle,
  translationLanguages,
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
  paragraphMode,
  steekLanguages,
  sgBaaniLength,
}: ISettingActions) => {
  const isShowSehajPaathMode = isShowSehajPaathModeRoute(location.pathname);
  const isShowAutoScroll = isShowAutoScrollRoute(location.pathname);
  const isSundarGutkaRoute = location.pathname.includes('sundar-gutka');

  return [
    {
      type: 'label-options',
      label: 'Text Align',
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
          action: toggleLarivaarOption
        },
        {
          label: 'Larivaar Assist',
          checked: larivaarAssist,
          action: toggleLarivaarAssistOption
        },
      ]
    },
    {
      type: 'label-options-custom',
      label: 'Vishraam Style',
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
    },  
     isSundarGutkaRoute ? {
      type: 'label-options-custom',
      label: 'Baanis Length',
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
      checked: paragraphMode,
      action: toggleParagraphMode
    } : {},   
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
    isShowSehajPaathMode ? {
      type: 'toggle-option',
      label: 'Reading [Akhand Paath]',
      checked: sehajPaathMode,
      stage: 'beta',
      action: toggleSehajPaathMode,
    } : {},
    isShowAutoScroll ? {
      type: 'toggle-option',
      label: 'Auto Scroll',
      checked: autoScrollMode,
      action: toggleAutoScrollMode,
    } : {},
    {
      type: 'toggle-option',
      label: 'Split',
      checked: splitView,
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
          },
          children: {
            english: {
              label: 'English Translations',
              options: ENGLISH_TRANSLATION_LANGUAGES,
              checked: translationLanguages,
              action: (lang: string) => {
                setTranslationLanguages(
                  selectItemInArray(lang, translationLanguages)
                )
              },
            }, 
            hindi: {
              label: 'Hindi Translations',
              options: HINDI_TRANSLATION_LANGUAGES,
              checked: translationLanguages,
              action: (lang: string) => {
                setTranslationLanguages(
                  selectItemInArray(lang, translationLanguages)
                )
              },
            }
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
