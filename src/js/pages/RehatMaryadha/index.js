/* eslint-disable react/prop-types */
/* globals API_URL */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

import PageLoader from '../PageLoader';
import BreadCrumb from '@/components/Breadcrumb';
import Accordion from '@/components/Accordion';

import { pageView } from '@/util/analytics';
import { getTrailingParameter } from '@/util/url';
import { TEXTS } from '@/constants';

const Stub = () => <div className="spinner" />;

const RehatMaryadha = ({ location: { pathname } }) => {
  const getRehatId = () => getTrailingParameter() === 'pb' ? 2 : 1;
  const [state, setState] = useState(false)
  const [rehatId, setRehatId] = useState(getRehatId());

  let url = API_URL + '/rehats/' + rehatId + '/chapters';

  useEffect(() => {
    pageView('/rehat-maryadha');
    setRehatId(getRehatId())
  }, [pathname])

  return (
    <PageLoader url={url}>
      {({ data, loading }) =>
        loading ? (
          <Stub />
        ) : (
          <div className="row" id="content-root">
            <BreadCrumb links={[{ title: TEXTS.URIS.MARYADA }]} />
            <div className="wrapper maryada">
              <div className="maryada__header">
                <div>
                  <img src="/assets/images/rehat-maryada.png" width="200" height="200" />
                </div>
                <div>
                  <h1>Sikh Rehat Maryadha</h1>
                  <div>
                    Available Languages:
                    <ul className="languages">
                      <li><Link to="/rehat-maryadha/en" className={rehatId === 1 ? 'active' : ''}>English</Link></li>
                      <li><Link to="/rehat-maryadha/pb" className={rehatId === 2 ? 'active' : ''}>Punjabi</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="maryada__intro">
                <h2>Introduction</h2>
                <p>The Sikh Rehat Maryada is a code of conduct for Sikhs. This document was preceded by the Gurdwaras Act of 1925, which laid down the definition of a Sikh. In 1915 and later in 1931, attempts were made to create a modern standard rehat (&quot;code&quot;). In 1950 the current Sikh Rehat Maryada was produced basd upon the work of Sikh scholars, seeking to better standardise Sikh practices throughout the international community.</p>
              </div>
              <div className="maryada__body">
                <div className="chapters">
                  <h2>Chapters</h2>
                  <div>
                    <button className="expand" onClick={() => { setState(true) }}>Expand all</button> | <button className="expand" onClick={() => { setState(false) }}>Collapse all</button>
                  </div>
                </div>
                <ul className="accordion">
                  {
                    data.chapters.map(chapter => (
                      <li key={chapter.chapterID}>
                        <Accordion
                          index={chapter.chapterID}
                          title={chapter.chapterName}
                          content={chapter.chapterContent}
                          defaultState={state}
                        />
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </div>
        )
      }
    </PageLoader>
  );
}

export default RehatMaryadha;
