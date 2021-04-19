/* globals API_URL */
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import PageLoader from '../PageLoader';
import { pageView } from '../../util/analytics';
import BreadCrumb from '../../components/Breadcrumb';
import { TEXTS } from '../../constants';
import Accordion from '../../components/Accordion';

const Stub = () => <div className="spinner" />;

const Maryada = () => {

  const [state, setState] = useState(false)

  const url = API_URL + '/rehats/1/chapters';
  
  
  useEffect(() => {
    pageView('/maryada');    
  }, [])   

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
                <div></div>
                <div>
                  <h1>Sikh Rehat Maryadha</h1>
                  <div>
                    Available Languages
                    <ul>
                      <li><Link to="/maryada/en">English</Link></li>
                      <li><Link to="/maryada/pb">Punjabi</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="maryada__intro">
                <h2>Introduction</h2>
                <p></p>
              </div>        
              <div className="maryada__body">
                <div>
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
                        defaultState={state}
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