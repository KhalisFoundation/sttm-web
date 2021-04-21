/* eslint-disable react/prop-types */
/* globals API_URL */
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import PageLoader from '../PageLoader';
import { pageView } from '../../util/analytics';
import { getTrailingParameter } from '../../util/url';
import BreadCrumb from '../../components/Breadcrumb';
import { TEXTS } from '../../constants';
import Accordion from '../../components/Accordion';

const Stub = () => <div className="spinner" />;

const Maryada = ({location: {pathname}}) => {  

  const [state, setState] = useState(false)
  const [rehatId, setRehatId] = useState(getTrailingParameter() === 'pb' ? 2 : 1);

  let url = API_URL + '/rehats/' + rehatId + '/chapters';
  
  useEffect(() => {
    pageView('/maryada');
  }, [])   
  
  useEffect(() => {     
    setRehatId(getTrailingParameter() === 'pb' ? 2 : 1)
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
                      <li><Link to="/maryada/en" className={rehatId === 1 ? 'active' : ''}>English</Link></li>
                      <li><Link to="/maryada/pb" className={rehatId === 2 ? 'active' : ''}>Punjabi</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="maryada__intro">
                <h2>Introduction</h2>
                <p></p>
              </div>        
              <div className="maryada__body">
                <div className="chapters">
                  <h2>Chapters</h2>
                  <div>
                    <button onClick={() => {setState(true)}}>Expand all</button> | <button onClick={() => {setState(false)}}>Collapse all</button>
                  </div>
                </div>
                <ul className="accordion">
                  {
                    data.chapters.map(chapter => (
                      <Accordion 
                        key={chapter.chapterID}
                        title={chapter.chapterName}
                        content={chapter.chapterContent}
                        defaultState={chapter.chapterID === data.chapters[0].chapterID || state}
                      />
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

export default Maryada;