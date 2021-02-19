import { routes } from '../constants';

export const getRouteValue = (pathname: string) => {
  if (pathname.includes('sundar-gutka')) {
    return routes.sundarGutka;
  } else if (pathname.includes('amrit-keertan')) {
    return routes.amritKeertan;
  }

  return -1;
}