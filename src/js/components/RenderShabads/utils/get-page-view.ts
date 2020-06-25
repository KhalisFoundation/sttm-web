import { IUtilArguments } from "./types";
import { routes } from "../constants";

export const getPageView = ({
  baaniId,
  shabadId,
  routeValue
}: IUtilArguments) => {
  switch (routeValue) {
    case routes.sundarGutka: `/sundar-gutka/${baaniId}`
    case routes.amritKeertan: `/amrit-keertan/shabads/${shabadId}`
  }
}