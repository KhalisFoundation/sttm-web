import React from 'react';
import PropTypes from 'prop-types';
import { LARIVAAR_ASSIST_COLOR } from '../constants';
import { fixLarivaar, fixLarivaarUnicode } from './utilLarivaar';

export default class Larivaar extends React.PureComponent {
  static defaultProps = {
    larivaarAssist: false,
    enable: true,
  };

  static propTypes = {
    larivaarAssist: PropTypes.bool,
    enable: PropTypes.bool,
    unicode: PropTypes.bool,
    children: PropTypes.string.isRequired,
  };

  render() {
    const { larivaarAssist, enable, children, unicode } = this.props;
    const larivaarAssistColor = larivaarAssist ? LARIVAAR_ASSIST_COLOR : '';
    return (
      <React.Fragment>
        {enable
          ? children.split(' ').map(
              (val, indexVal) => {
                if(val.indexOf('॥') !== -1 || val.indexOf(']') !== -1) {
                  return `${val} `
                } else {
                  var breakSupportedCharList = [];

                  var segmentedValArr = null;
                  if(unicode) {
                    segmentedValArr = fixLarivaarUnicode(val);
                  } else {
                    segmentedValArr = fixLarivaar(val);
                  }

                  // Add each segment with wbr in a new span
                  for(let i=0;i<segmentedValArr.length;i++) {
                    if(segmentedValArr[i].indexOf("´") != -1) {
                      // handle space break for this special character
                      breakSupportedCharList.push(
                        <span key={i} className = "wordBreakSpecialChar">
                          {segmentedValArr[i]}<wbr />
                        </span>
                      )    
                    } else {
                      breakSupportedCharList.push(
                        <span key={i}>
                          {segmentedValArr[i]}<wbr />
                        </span>
                      )  
                    }
                  }

                  // highlight if larivaar assist is on
                  if(breakSupportedCharList.length) {
                    return <span key={indexVal} style={{ color: indexVal % 2 === 1 ? larivaarAssistColor : '' }}>{breakSupportedCharList.map((element) => {
                      return element
                    })}</span>
                  } else {
                    return (
                      <span key={indexVal}>
                        {val}
                      </span>
                    )  
                  }
                }
              }
            )
          : children}
      </React.Fragment>
    );
  }
}
