import { VISRAAM } from "../../constants";

export const clearVisraamClass = () => {
  Object.keys(VISRAAM.SOURCES).forEach(element => {
    document.body.classList.remove(VISRAAM.SOURCE_CLASS(element));
  });
  Object.keys(VISRAAM.TYPES).forEach(element => {
    document.body.classList.remove(VISRAAM.TYPE_CLASS(element));
  });
}
