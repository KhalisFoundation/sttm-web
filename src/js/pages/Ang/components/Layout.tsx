import React from 'react';
import { Link } from 'react-router-dom';

import GenericError, { BalpreetSingh } from '@/components/GenericError';
import ShabadContent from '@/components/ShabadContent';
import BreadCrumb from '@/components/Breadcrumb';
import { SOURCES, TEXTS } from '@/constants';
import { pageView, errorEvent, ACTIONS, toAngURL } from '@/util';

export const Stub = () => <div className="spinner" />;

type Sources = keyof typeof SOURCES;
interface ILayoutProps {
  ang: number
  source: Sources
  highlight: number
  data: any
}

export default class Layout extends React.PureComponent<ILayoutProps> {

  render() {
    const { ang, source, highlight, data } = this.props;

    if (data.page.length === 0) {
      errorEvent({
        action: ACTIONS.ANG_NOT_FOUND,
        label: `ang:${ang},source:${source}`,
      });
      return (
        <GenericError
          title={TEXTS.ANG_NOT_FOUND}
          description={
            <>
              {TEXTS.ANG_NOT_FOUND_DESCRIPTION(ang, SOURCES[source])}
              <Link to="/help#Desktop-i-cant-find-my-shabad.">
                {' '}
                {TEXTS.HELP_SECTION}
              </Link>{' '}
              or
              <Link to="/index"> {TEXTS.INDEX_SECTION}</Link>.
            </>
          }
          image={BalpreetSingh}
        />
      );
    }

    return (
      <div className="row" id="content-root">
        <BreadCrumb links={[{ title: TEXTS.URIS.ANG }]} />
        <ShabadContent
          gurbani={data.page}
          highlight={highlight}
          nav={Array.isArray(data.navigation) ? {} : data.navigation}
          info={{ source: data.source }}
          type="ang"
        />
      </div>
    );
  }

  componentDidMount() {
    const { ang, source } = this.props;
    pageView(toAngURL({ ang, source }));
  }
}
