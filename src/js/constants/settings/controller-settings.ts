import {
  PlusIcon,
  MinusIcon,
  IconLabel,
} from '@/components/Icons/CustomIcons';

interface IGetControlsList {
  decrementAction: () => {}
  incrementAction: () => {}
  value: string
}

const getControlsList = (
  { decrementAction, incrementAction, value }: IGetControlsList
) => {
  return [
    {
      icon: MinusIcon,
      action: decrementAction
    },
    {
      control: IconLabel,
      value,
    },
    {
      icon: PlusIcon,
      action: incrementAction
    },
  ]
}

export const CONTROLLER_SETTINGS =
  (updateSettings: Function, desktopSettings: any) => {
    const { gurbani, translation, teeka, transliteration } = desktopSettings.fontSizes;

    return [
      {
        type: 'icon-toggle',
        label: 'Gurbani',
        controlsList: getControlsList({
          value: gurbani,
          decrementAction: () => updateSettings({
            action: 'changeFontSize',
            target: 'gurbani',
            value: 'minus',
          }),
          incrementAction: () => updateSettings({
            action: 'changeFontSize',
            target: 'gurbani',
            value: 'plus',
          })
        })
      },
      {
        type: 'icon-toggle',
        label: 'Translation',
        controlsList: [
          {
            icon: MinusIcon,
            action: () => updateSettings({
              action: 'changeFontSize',
              target: 'translation',
              value: 'minus',
            })
          },
          {
            control: IconLabel,
            value: desktopSettings.fontSizes.translation,
          },
          {
            icon: PlusIcon,
            action: () => updateSettings({
              action: 'changeFontSize',
              target: 'translation',
              value: 'plus',
            })
          },
        ],
      },
      {
        type: 'icon-toggle',
        label: 'Teeka',
        controlsList: [
          {
            icon: MinusIcon,
            action: () => updateSettings({
              action: 'changeFontSize',
              target: 'teeka',
              value: 'minus',
            })
          },
          {
            control: IconLabel,
            value: desktopSettings.fontSizes.teeka,
          },
          {
            icon: PlusIcon,
            action: () => updateSettings({
              action: 'changeFontSize',
              target: 'teeka',
              value: 'plus',
            })
          }
        ],
      },
      {
        type: 'icon-toggle',
        label: 'Transliteration',
        controlsList: [
          {
            icon: MinusIcon,
            action: () => updateSettings({
              action: 'changeFontSize',
              target: 'transliteration',
              value: 'minus',
            })
          },
          {
            control: IconLabel,
            value: desktopSettings.fontSizes.transliteration,
          },
          {
            icon: PlusIcon,
            action: () => updateSettings({
              action: 'changeFontSize',
              target: 'transliteration',
              value: 'plus',
            })
          }
        ],
      },
    ];
  }
export const CONTROLLER_ADVANCED_SETTINGS = () => [];