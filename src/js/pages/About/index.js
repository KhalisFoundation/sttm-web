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
          SikhiToTheMax has become a defacto standard for events, camps and Gurdwaras around the world
          to display Gurbani on large screens for Sangat to be able to join into the depth of Gurbani
          and translations. This website further expands the reach of the software allowing anyone
          to search Gurbani any time from their desktop web browsers or mobile devices. Our desktop
          application also includes features for overlaying Gurbani and translations as subtitles whilst
          broadcasting live. We offer multiple languages for translations and transliterations to
          make Gurbani more accessible and understandable.
          <br />
          <br />
          SikhiToTheMax is now developed by Khalis Foundation as seva to the
          Panth and are working hard to ensure it remains the most accurate
          Gurbani application.
          <br />
          <br />
          <span style={{ fontWeight: 500 }}>Website: </span>
          <a href="http://www.sikhitothemax.org">SikhiToTheMax.org</a>
          <br />
          <br />
          <span style={{ fontWeight: 500 }}>Acknowledgements: </span>
          Bhai Tarsem Singh (UK),{' '}
          <a href="https://sharecharityuk.com/" target="_blank">
            SHARE Charity UK
          </a>
          , Khalis Foundation, Khalsa Foundation UK, Dr. Sant Singh Khalsa, Dr.
          Kulbir Singh Thind, <a href="https://barusahib.org/">Baru Sahib</a>.
          <br />
          <br />
          <div className="text-center">
            <span style={{ fontWeight: 500 }}>Powered by</span>
          </div>
          <div className="logo-center">
            <a href="http://www.banidb.com" target="_blank">
              <img
                src="/assets/images/banidb-full.png"
                alt="Bani DB logo"
                title="BaniDB"
              />
            </a>
          </div>
          <br />
          <div className="text-center">
            <span style={{ fontWeight: 500 }}>Developed by</span>
          </div>
          <div className="logo-center">
            <a href="http://www.khalisfoundation.org" target="_blank">
              <img
                src="/assets/images/khalis.png"
                alt="Bani DB logo"
                title="BaniDB"
              />
            </a>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    pageView('/about');
  }
}
