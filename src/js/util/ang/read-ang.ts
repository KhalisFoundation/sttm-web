import {
  LOCAL_STORAGE_KEY_FOR_PREVIOUSLY_READ_ANG,
} from '../../constants';

export const readAng = (): number =>
  parseInt(localStorage.getItem(LOCAL_STORAGE_KEY_FOR_PREVIOUSLY_READ_ANG));
