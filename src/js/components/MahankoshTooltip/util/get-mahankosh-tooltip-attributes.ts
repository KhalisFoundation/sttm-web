import { STTM_ORANGE, STTM_BLACK } from '@/constants';

export const getMahankoshTooltipAttributes = (isDarkMode: boolean) => {
  return {
    ['data-event']: 'click',
    ['data-background-color']: isDarkMode ? STTM_ORANGE : STTM_BLACK,
    ['data-place']: "top",
    ['data-tip']: '...',
    ['data-event-off']: 'click',
  }
}