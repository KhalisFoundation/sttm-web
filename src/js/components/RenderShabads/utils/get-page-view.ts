import { IUtilArguments } from "./types";
import { routes } from "../constants";

export const getPageView = ({
  id,
  routeValue
}: IUtilArguments) => {
  switch (routeValue) {
    case routes.sundarGutka: `/sundar-gutka/${id}`
    case routes.amritKeertan: `/amrit-keertan/shabads/${id}`
  }
}