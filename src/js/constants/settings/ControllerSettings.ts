import {
    PlusIcon,
    MinusIcon,
    IconLabel,
} from '@/components/Icons/CustomIcons';

export const CONTROLLER_SETTINGS = (updateSettings: Function,
    desktopSettings: any) => [
        {
            type: 'icon-toggle',
            label: 'Gurbani',
            controlsList: [
                {
                    icon: MinusIcon,
                    action: () => updateSettings({
                        action: 'changeFontSize',
                        target: 'gurbani',
                        value: 'minus',
                    })
                },
                {
                    control: IconLabel,
                    value: desktopSettings.fontSizes.gurbani,
                },
                {
                    icon: PlusIcon,
                    action: () => updateSettings({
                        action: 'changeFontSize',
                        target: 'gurbani',
                        value: 'plus',
                    })
                },
            ],
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

export const CONTROLLER_ADVANCED_SETTINGS = () => [];