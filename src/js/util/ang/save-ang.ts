import {
  LOCAL_STORAGE_KEY_FOR_PREVIOUSLY_READ_ANG,
} from '../../constants';

import { saveToLocalStorage } from '../localstorage';

export const saveAng = (ang: number) =>
  saveToLocalStorage(LOCAL_STORAGE_KEY_FOR_PREVIOUSLY_READ_ANG, ang.toString());
