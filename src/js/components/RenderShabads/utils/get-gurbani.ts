import { versesToGurbani } from "../../../util";
import { routes } from "../constants";

export const getGurbani = ({ data, routeValue }) => {
  switch (routeValue) {
    case routes.sundarGutka: return versesToGurbani(data.verses.filter(v => v.mangalPosition !== 'above'))
    case routes.amritKeertan: return data.verses;
  }
}
