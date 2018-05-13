import React from 'react';
import PropTypes from 'prop-types';
import { LARIVAAR_ASSIST_COLOR } from '../constants';

export default class Larivaar extends React.PureComponent {
  static defaultProps = {
    larivaarAssist: false,
    enable: true,
  };

  static propTypes = {
    larivaarAssist: PropTypes.bool,
    enable: PropTypes.bool,
    children: PropTypes.string.isRequired,
  };

  render() {
    const { larivaarAssist, enable, children } = this.props;
    const larivaarAssistColor = larivaarAssist ? LARIVAAR_ASSIST_COLOR : '';
    return (
      <React.Fragment>
        {enable
          ? children.split(' ').map(
              (val, i) => {
                if(val.indexOf('॥') !== -1 || val.indexOf(']') !== -1) {
                  return `${val} `
                } else {
                  var breakSupportedCharList = [];

                  // before rendering each word
                  // Search for matras, lagakhar, dut akhar etc in it to preserve word break
                  // we can't use css word-break - break all property anymore
                  // In that case we have to put wbr with every character
                  // So we are checking every character
                  var splitArr = val.split('')
                  for(let i=0;i<splitArr.length;i++) {
                    // checking for (Right side matras) Lavaa, Dulavaa, Aunkar, Dulainkar, Bihari, Kanna, Bindi and Tippi
                    // Will optimize this condition
                    // Remaining check for - Haf Characters(Dutt akhar) and combination of Right Side Matras and Half characters
                    // Many complexwords are present which containscombination of Right SIde matras with Half characters and Bindi, Tippi, Adhak
                    // need to test thoroughly for this condition
                    // Remainig check for Kanaa + Bindi Combination
                    // Check for unicode would be diffrent as there is no left side matra in Unicode - Unicode have right side matras only
                    // and combination of Matras + Bindi + Tippi + Half character is diffrent than fnts we use
                    // 
                    if(splitArr[i+1] && ((splitArr[i+1].indexOf("Y")  != -1) || (splitArr[i+1].indexOf("y")  != -1) || (splitArr[i+1].indexOf("w")  != -1) || (splitArr[i+1].indexOf("I")  != -1)  || (splitArr[i+1].indexOf("u")  != -1) || (splitArr[i+1].indexOf("U")  != -1) || (splitArr[i+1].indexOf("N")  != -1) || (splitArr[i+1].indexOf("N")  != -1))) {
                      breakSupportedCharList.push(
                        <span key={i} style={{ color: i % 2 === 1 ? larivaarAssistColor : '' }}>
                          {splitArr[i] + splitArr[i+1]}<wbr />
                        </span>
                      )
                      i++;
                    } else if(splitArr[i].indexOf("i") != -1) {
                      // checking for sihari matra 
                      breakSupportedCharList.push(
                        <span key={i} style={{ color: i % 2 === 1 ? larivaarAssistColor : '' }}>
                          {splitArr[i] + splitArr[i+1]}<wbr />
                        </span>
                      )
                      i++;
                    } else {
                      // check for all muktas
                      breakSupportedCharList.push(
                        <span key={i} style={{ color: i % 2 === 1 ? larivaarAssistColor : '' }}>
                          {splitArr[i]}<wbr />
                        </span>
                      )  
                    }
                  }

                  if(breakSupportedCharList.length) {
                    return breakSupportedCharList.map((element) => {
                      return element
                    })
                  } else {
                    return (
                      <span key={i} style={{ color: i % 2 === 1 ? larivaarAssistColor : '' }}>
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
