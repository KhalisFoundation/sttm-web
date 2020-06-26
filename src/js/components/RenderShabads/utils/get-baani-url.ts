/* globals BANIS_API_URL */
/* globals AMRIT_KEETAN_SHABADS_API_URL */

import { IUtilArguments } from "./types"
import { routes } from "../constants"

export const getBaaniUrl = ({
  baaniId,
  shabadId,
  routeValue
}: IUtilArguments) => {
  switch (routeValue) {
    case routes.sundarGutka: return `${BANIS_API_URL}/${baaniId}`
    case routes.amritKeertan: return `${AMRIT_KEERTAN_SHABADS_API_URL}/${shabadId}`
  }
}
