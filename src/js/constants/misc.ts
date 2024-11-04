import { SOURCES, SOURCES_WITH_ANG, TYPES as _TYPES } from '@sttm/banidb';
import { SEARCH_TYPES } from './search-types';

// TODO: Need to move this to @sttm/banidb module
// _TYPES.push('Ask a Question (English)');

export { SOURCES, SOURCES_WITH_ANG };

export const BANI_LENGTH_COLS = {
  short: 'existsSGPC',
  medium: 'existsMedium',
  long: 'existsTaksal',
  extralong: 'existsBuddhaDal',
};

export const TYPES = _TYPES.filter((value, index) =>
  Object.values(SEARCH_TYPES).includes(index));

export const SHORT_DOMAIN = 'sttm.co';
export const MAHANKOSH_TOOLTIP_SOURCE = 'Source: Mahaan Kosh (Encyclopedia)';
export const HUKAMNAMA_AUDIO_URL = '//hs.sgpc.net/uploadhukamnama/hukamnama.mp3';
export const API_URL = "https://audio.sikhitothemax.org/v1/";
