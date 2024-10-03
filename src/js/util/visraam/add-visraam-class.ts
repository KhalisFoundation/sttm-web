import { clearVisraamClass } from "./clear-visraam-class";
import {
  getBooleanFromLocalStorage,
  getStringFromLocalStorage
} from "../localstorage";
import {
  LOCAL_STORAGE_KEY_FOR_VISRAAMS,
  VISRAAM,
  LOCAL_STORAGE_KEY_FOR_VISRAAM_SOURCE,
  DEFAULT_VISRAAM_SOURCE,
  LOCAL_STORAGE_KEY_FOR_VISRAAMS_STYLE,
  DEFAULT_VISRAAM_STYLE
} from "../../constants";

export const addVisraamClass = () => {
  clearVisraamClass();
  document.body.classList[getBooleanFromLocalStorage(LOCAL_STORAGE_KEY_FOR_VISRAAMS) ? 'add' : 'remove'](
    VISRAAM.CLASS_NAME,
    VISRAAM.getSourceClass(getStringFromLocalStorage(LOCAL_STORAGE_KEY_FOR_VISRAAM_SOURCE) ||
      DEFAULT_VISRAAM_SOURCE),
    VISRAAM.getTypeClass(getStringFromLocalStorage(LOCAL_STORAGE_KEY_FOR_VISRAAMS_STYLE) ||
      DEFAULT_VISRAAM_STYLE)
  );
}
