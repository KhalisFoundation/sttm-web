import { VISRAAM } from "../../constants";

export const clearVisraamClass = () => {
  Object.keys(VISRAAM.SOURCES).forEach(element => {
    document.body.classList.remove(VISRAAM.getSourceClass(element));
  });
  Object.keys(VISRAAM.TYPES).forEach(element => {
    document.body.classList.remove(VISRAAM.getTypeClass(element));
  });
}
