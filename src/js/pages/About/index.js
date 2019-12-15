import React from 'react';
import { pageView } from '../../util/analytics';
import BreadCrumb from '../../components/Breadcrumb';
import { TEXTS } from '../../constants';

export default class About extends React.PureComponent {
  render() {
    return (
      <div className="row" id="content-root">
        <BreadCrumb links={[{ title: TEXTS.URIS.ABOUT }]} />
        <div className="wrapper">
        <h4>About</h4>
          Originally developed by Bhai Tarsem Singh (SHARE Charity UK),
          SikhiToTheMax has become a defacto standard for Keertan events, camps and Gurdwaras
          around the world to display Gurbani on large  screens for Sangat to be able to join into
          the depth of Gurbani and translations. Our website further expands the reach
          of the software allowing anyone to search Gurbani any time from their desktop web browsers or
          handheld devices.
          <br />
          <br />
          SikhiToTheMax is now developed by Khalis Foundation as seva to the
          Panth and are working hard to ensure it remains the most accurate Gurbani application.
          <br />
          <br />
          <span style={{ fontWeight: 500 }}>Website: </span>
          <a href="http://www.sikhitothemax.org">
            SikhiToTheMax.org
          </a>
          <br />
          <br />
          <span style={{ fontWeight: 500 }}>Acknowledgements: </span>
          Bhai Tarsem Singh (UK), <a href="https://sharecharityuk.com/" target="_blank">SHARE Charity UK</a>, Khalis Foundation, Khalsa Foundation
          UK, Dr. Sant Singh Khalsa, Dr. Kulbir Singh Thind.
          <br />
          <br />
          <div class="text-center"><span style={{ fontWeight: 500 }}>Powered by</span></div>
          <div class="logo-center">
          <a href="http://www.banidb.com" target="_blank"><img src="/assets/images/banidb-full.png" alt="Bani DB logo" title="BaniDB"/></a>
          </div>
          <br />
          <div class="text-center"><span style={{ fontWeight: 500 }}>Developed by</span></div>
          <div class="logo-center">
          <a href="http://www.khalisfoundation.org" target="_blank"><img src="/assets/images/khalis.png" alt="Bani DB logo" title="BaniDB"/></a>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    pageView('/about');
  }
}
