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
              (val, indexVal) => {
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
                    // Pairri rarra is represented by "®" in gurbani font 

                    // Facepalm
                    // 1. other form of Tippi - µ
                    // 2. issue: there are two types of Pairri Rarra - One "R" and other "®"
                    // 
                    // thats why I hate punjabi fonts - No consistency
                    // 
                    // Done:
                    // Kanna Bindi - single entity
                    // Many complex words are present which contains combination of Right Side matras with Half characters and Bindi, Tippi, Adhak
                    // and combination of Matras + Bindi + Tippi + Half character is diffrent than fonts we use
                    // Sihari + char + Half char + Bindi/Tippi
                    if(splitArr[i+1] && ((splitArr[i+1].indexOf("Y")  != -1) || (splitArr[i+1].indexOf("y")  != -1) || (splitArr[i+1].indexOf("w")  != -1) || (splitArr[i+1].indexOf("W")  != -1) || (splitArr[i+1].indexOf("I")  != -1)  || (splitArr[i+1].indexOf("u")  != -1) || (splitArr[i+1].indexOf("U")  != -1) || (splitArr[i+1].indexOf("N")  != -1) || (splitArr[i+1].indexOf("M")  != -1) || (splitArr[i+1].indexOf("´")  != -1) || (splitArr[i+1].indexOf("R")  != -1) || (splitArr[i+1].indexOf("Í")  != -1) || (splitArr[i+1].indexOf("µ")  != -1) || (splitArr[i+1].indexOf("@")  != -1))) {
                      // Dut akhar(Pairi Rarra) + Bindi or Tippi as one entity
                      if(splitArr[i+1].indexOf("´")  != -1 && splitArr[i+2] && ((splitArr[i+2].indexOf("M")  != -1) || (splitArr[i+2].indexOf("N")  != -1))) {
                        breakSupportedCharList.push(
                          <span key={i} className = "wordBreakSpecialChar">
                            {splitArr[i] + splitArr[i+1] + splitArr[i+2]}<wbr />
                          </span>
                        )
                        i=i+2;
                      } else if(splitArr[i+1].indexOf("R")  != -1 && splitArr[i+2] && ((splitArr[i+2].indexOf("w")  != -1) || (splitArr[i+1].indexOf("W")  != -1))) {
                        // pairri Rarra + Kanna
                        breakSupportedCharList.push(
                          <span key={i} className = "wordBreakSpecialChar">
                            {splitArr[i] + splitArr[i+1] + splitArr[i+2]}<wbr />
                          </span>
                        )
                        i=i+2;
                      } else if(splitArr[i+1].indexOf("´")  != -1 && splitArr[i+2] && ((splitArr[i+2].indexOf("Y")  != -1) || (splitArr[i+2].indexOf("y")  != -1) || (splitArr[i+2].indexOf("w")  != -1) || (splitArr[i+2].indexOf("I")  != -1)  || (splitArr[i+2].indexOf("u")  != -1) || (splitArr[i+2].indexOf("U")  != -1) || (splitArr[i+2].indexOf("N")  != -1) || (splitArr[i+2].indexOf("M")  != -1) || (splitArr[i+1].indexOf("µ")  != -1))) {
                        breakSupportedCharList.push(
                          <span key={i} className = "wordBreakSpecialChar">
                            {splitArr[i] + splitArr[i+1] + splitArr[i+2]}<wbr />
                          </span>
                        )
                        i=i+2;
                      } else if(splitArr[i+1].indexOf("@")  != -1 && splitArr[i+2] && ((splitArr[i+2].indexOf("Y")  != -1) || (splitArr[i+2].indexOf("y")  != -1) || (splitArr[i+2].indexOf("w")  != -1) || (splitArr[i+2].indexOf("I")  != -1)  || (splitArr[i+2].indexOf("u")  != -1) || (splitArr[i+2].indexOf("U")  != -1) || (splitArr[i+2].indexOf("N")  != -1) || (splitArr[i+2].indexOf("M")  != -1) || (splitArr[i+1].indexOf("µ")  != -1))) {
                        breakSupportedCharList.push(
                          <span key={i} className = "wordBreakSpecialChar">
                            {splitArr[i] + splitArr[i+1] + splitArr[i+2]}<wbr />
                          </span>
                        )
                        i=i+2;
                      } else if((splitArr[i+1].indexOf("´")  != -1) && splitArr[i+2] && ((splitArr[i+1].indexOf("M")  != -1) || (splitArr[i+1].indexOf("N")  != -1) || (splitArr[i+1].indexOf("µ")  != -1))) {
                        // right side matra + Bindi + Tippi
                        breakSupportedCharList.push(
                          <span key={i} className = "wordBreakSpecialChar">
                            {splitArr[i] + splitArr[i+1] + splitArr[i+2]}<wbr />
                          </span>
                        )
                        i=i+2;
                      } else if((splitArr[i+1].indexOf("M")  != -1) || (splitArr[i+1].indexOf("N")  != -1)  || (splitArr[i+1].indexOf("µ")  != -1)) {
                        // right side matra + Bindi + Tippi
                        breakSupportedCharList.push(
                          <span key={i}>
                            {splitArr[i] + splitArr[i+1]}<wbr />
                          </span>
                        )
                        i=i+1;
                      } else if(splitArr[i+1].indexOf("´")  != -1) {
                        breakSupportedCharList.push(
                          <span key={i} className = "wordBreakSpecialChar">
                            {splitArr[i] + splitArr[i+1]}<wbr />
                          </span>
                        )
                        i++;
                      } else {
                        breakSupportedCharList.push(
                          <span key={i}>
                            {splitArr[i] + splitArr[i+1]}<wbr />
                          </span>
                        )
                        i++;  
                      }

                    } else if(splitArr[i].indexOf("i") != -1 ) {
                      // handle bindi, tippi, dutt akhar with sihari 3 characters together
                      // pending:
                      // handle bindi, tippi, dutt akhar with sihari 4 character together
                      if(splitArr[i+2] && splitArr[i+3] && (splitArr[i+2].indexOf("´")  != -1) && ((splitArr[i+3].indexOf("N")  != -1) || splitArr[i+3].indexOf("M")  != -1)) {
                        // checking for sihari matra with pairri Yayya and Bindi or adhak 
                        breakSupportedCharList.push(
                          <span key={i} className = "wordBreakSpecialChar">
                            {splitArr[i] + splitArr[i+1] + splitArr[i+2] + splitArr[i+3]}<wbr />
                          </span>
                        )
                        i=i+3;
                      } else if(splitArr[i+2] && splitArr[i+3] && (splitArr[i+2].indexOf("´")  != -1)) {
                        // checking for sihari matra with pairri Yayya
                        breakSupportedCharList.push(
                          <span key={i} className = "wordBreakSpecialChar">
                            {splitArr[i] + splitArr[i+1] + splitArr[i+2]}<wbr />
                          </span>
                        )
                        i=i+2;
                      } else if(splitArr[i+2] && splitArr[i+3] && (splitArr[i+2].indexOf("®")  != -1) && ((splitArr[i+3].indexOf("N")  != -1) || splitArr[i+3].indexOf("M")  != -1)) {
                        // checking for sihari matra and pairri rarra other form - bindi, tippi 
                        breakSupportedCharList.push(
                          <span key={i}>
                            {splitArr[i] + splitArr[i+1] + splitArr[i+2] + splitArr[i+3]}<wbr />
                          </span>
                        )
                        i=i+3;
                      } else if(splitArr[i+2] && (splitArr[i+2].indexOf("®")  != -1)) {
                        // checking for sihari matra and pairri rarra only
                        breakSupportedCharList.push(
                          <span key={i}>
                            {splitArr[i] + splitArr[i+1] + splitArr[i+2]}<wbr />
                          </span>
                        )
                        i=i+2;
                      } else if((splitArr[i+1].indexOf("M")  != -1) || (splitArr[i+1].indexOf("N")  != -1)  || (splitArr[i+1].indexOf("µ")  != -1)) {
                        // right side matra + Bindi + Tippi
                        breakSupportedCharList.push(
                          <span key={i}>
                            {splitArr[i] + splitArr[i+1]}<wbr />
                          </span>
                        )
                        i=i+1;
                      } else {
                        // checking for sihari matra 
                        breakSupportedCharList.push(
                          <span key={i}>
                            {splitArr[i] + splitArr[i+1]}<wbr />
                          </span>
                        )
                        i++;
                      }
                    } else {
                      // check for all muktas
                      breakSupportedCharList.push(
                        <span key={i}>
                          {splitArr[i]}<wbr />
                        </span>
                      )  
                    }
                  }

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
