import {
  PlusIcon,
  MinusIcon,
  IconLabel,
} from '@/components/Icons/CustomIcons';

interface IGetControlsList {
  controlAction: (obj: any) => {},
  target: string,
  value: string,
}

const getControlList = (
  { controlAction, value, target }: IGetControlsList
) => {
  return [
    {
      icon: MinusIcon,
      action: () => controlAction({
        action: 'changeFontSize',
        target,
        value: 'minus',
      })
    },
    {
      control: IconLabel,
      value,
    },
    {
      icon: PlusIcon,
      action: () => controlAction({
        action: 'changeFontSize',
        target,
        value: 'plus',
      })
    }
  ]
}

export const CONTROLLER_SETTINGS = (
  updateSettings: (obj: any) => {},
  desktopSettings: any
) => {
  const { gurbani, translation, teeka, transliteration } = desktopSettings.fontSizes;

  return [
    {
      type: 'icon-toggle',
      label: 'Gurbani',
      controlsList: getControlList({
        value: gurbani,
        target: 'gurbani',
        controlAction: updateSettings,
      })
    },
    {
      type: 'icon-toggle',
      label: 'Translation',
      controlsList: getControlList({
        value: translation,
        target: 'translation',
        controlAction: updateSettings,
      })
    },
    {
      type: 'icon-toggle',
      label: 'Teeka',
      controlsList: getControlList({
        value: teeka,
        target: 'teeka',
        controlAction: updateSettings,
      })
    },
    {
      type: 'icon-toggle',
      label: 'Transliteration',
      controlsList: getControlList({
        value: transliteration,
        target: 'transliteration',
        controlAction: updateSettings,
      })
    },
  ];
}
export const CONTROLLER_ADVANCED_SETTINGS = () => [];