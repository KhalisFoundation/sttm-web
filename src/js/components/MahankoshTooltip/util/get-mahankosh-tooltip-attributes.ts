import { STTM_ORANGE, STTM_BLACK } from '@/constants';

export const getMahankoshTooltipAttributes = ({isDarkMode, content}: {isDarkMode: boolean, content: string}) => {
  return {
    ['data-tooltip-id']: 'mahankoshTooltipHighlightSearchResult',
    ['data-background-color']: isDarkMode ? STTM_ORANGE : STTM_BLACK,
    ['data-tip']: '...',
  }
}