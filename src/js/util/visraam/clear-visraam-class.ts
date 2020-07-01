import { VISRAAM_CONSTANTS } from "../../constants";

export const clearVisraamClass = () => {
  Object.keys(VISRAAM_CONSTANTS.SOURCES).forEach(element => {
    document.body.classList.remove(VISRAAM_CONSTANTS.SOURCE_CLASS(element));
  });
  Object.keys(VISRAAM_CONSTANTS.TYPES).forEach(element => {
    document.body.classList.remove(VISRAAM_CONSTANTS.TYPE_CLASS(element));
  });
}
