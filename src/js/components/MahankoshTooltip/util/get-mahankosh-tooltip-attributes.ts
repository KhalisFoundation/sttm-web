import { STTM_ORANGE, STTM_BLACK } from '@/constants';

export const getMahankoshTooltipAttributes = (isDarkMode: boolean, tooltipId: string) => {
  return {
    ['data-for']: tooltipId,
    ['data-background-color']: isDarkMode ? STTM_ORANGE : STTM_BLACK,
    ['data-tip']: '...',
  }
}