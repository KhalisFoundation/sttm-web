import React, { useEffect } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { Location } from 'history';

import ShabadContent from '../ShabadContent';
import Fetch from '../Fetch';
import { pageView } from '../../util/analytics';
import {
  getBaaniUrl,
  getRouteValue,
  getPageView,
  getGurbani
} from './utils';

interface MatchParams {
  shabadId?: string;
  baaniId?: string;
}

interface IRenderShabadsProps extends RouteComponentProps<MatchParams> {
  location: Location
}

export const RenderShabads: React.FC<IRenderShabadsProps> = ({ match, location }) => {
  const { url, params: { shabadId, baaniId } } = match;
  const { pathname } = location;
  const routeValue = getRouteValue(pathname);
  const baaniUrl = getBaaniUrl({ shabadId, baaniId, routeValue });
  const pageViewUrl = getPageView({ shabadId, baaniId, routeValue });

  useEffect(() => {
    pageView(`${pageViewUrl}`);
  }, [pageViewUrl])

  return (
    <div className="baani">
      <Fetch url={`${baaniUrl}`}>
        {({ data, error, loading }) => {
          console.info(error, "FROM RENDER SHABADS")

          if (loading) {
            return <div className="spinner" />
          }

          return (
            <ShabadContent
              type="shabad"
              info={data.baniInfo}
              nav={data.nav}
              gurbani={getGurbani({ data, routeValue })}
              hideMeta
              controlProps={{
                disableSplitView: true,
              }}
            />
          )
        }}
      </Fetch>
    </div>
  );
}
