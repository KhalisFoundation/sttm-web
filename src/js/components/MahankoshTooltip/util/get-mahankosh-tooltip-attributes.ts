import { STTM_ORANGE, STTM_BLACK } from '@/constants';

export const getMahankoshTooltipAttributes = (isDarkMode: boolean) => {
  return {
    ['data-for']: 'mahankoshTooltip',
    ['data-background-color']: isDarkMode ? STTM_ORANGE : STTM_BLACK,
    ['data-place']: "top",
    ['data-tip']: '...',
    ['data-event']: 'click'
  }
}