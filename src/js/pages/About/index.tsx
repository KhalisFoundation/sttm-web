import React from 'react';
import { pageView } from '@/util/analytics';
import BreadCrumb from '@/components/Breadcrumb/Breadcrumb';
import { TEXTS } from '@/constants';

export default class About extends React.PureComponent {
  public render() {
    return (
      <div className="row" id="content-root">
        <BreadCrumb links={[{ title: TEXTS.URIS.ABOUT }]} />
        <div className="wrapper">
          Originally developed by Bhai Tarsem Singh of SHARE charity UK,
          SikhiToTheMax has become a defacto standard for keertans and gurdwaras
          around the world to display gurbani on screens for sangat to join into
          the depth of Gurbani and translations.
          <br />
          <br />
          SikhiToTheMax is now developed by Khalis Foundation as seva to the
          panth and is working hard to ensure it lives up to its name.
          <br />
          <br />
          <span style={{ fontWeight: 500 }}>Website:</span>
          <a href="http://www.sikhitothemax.org">
            http://www.SikhiToTheMax.org
          </a>
          <br />
          <br />
          <span style={{ fontWeight: 500 }}>Developer:</span>
          <a
            href="https://www.khalisfoundation.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Khalis Foundation
          </a>
          <br />
          <br />
          <span style={{ fontWeight: 500 }}>Acknowledgements:</span>
          Bhai Tarsem Singh UK, SHARE UK, Khalis Foundation, Khalsa Foundation
          UK, Dr. Sant Singh Khalsa, Dr. Kulbir Singh Thind
        </div>
      </div>
    );
  }

  public componentDidMount() {
    pageView('/about');
  }
}
