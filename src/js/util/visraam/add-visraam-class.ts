import { clearVisraamClass } from "./clear-visraam-class";
import {
  getBooleanFromLocalStorage,
  getStringFromLocalStorage
} from "../localstorage";
import {
  LOCAL_STORAGE_KEY_FOR_VISRAAMS,
  VISRAAM_CONSTANTS,
  LOCAL_STORAGE_KEY_FOR_VISRAAM_SOURCE,
  DEFAULT_VISRAAM_SOURCE,
  LOCAL_STORAGE_KEY_FOR_VISRAAMS_STYLE,
  DEFAULT_VISRAAM_STYLE
} from "../../constants";

export const addVisraamClass = () => {
  clearVisraamClass();
  document.body.classList[getBooleanFromLocalStorage(LOCAL_STORAGE_KEY_FOR_VISRAAMS) ? 'add' : 'remove'](
    VISRAAM_CONSTANTS.CLASS_NAME,
    VISRAAM_CONSTANTS.SOURCE_CLASS(getStringFromLocalStorage(LOCAL_STORAGE_KEY_FOR_VISRAAM_SOURCE) ||
      DEFAULT_VISRAAM_SOURCE),
    VISRAAM_CONSTANTS.TYPE_CLASS(getStringFromLocalStorage(LOCAL_STORAGE_KEY_FOR_VISRAAMS_STYLE) ||
      DEFAULT_VISRAAM_STYLE)
  );
}
