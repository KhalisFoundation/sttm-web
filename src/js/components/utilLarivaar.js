import React from 'react';

const matrasThatAppearAtRightSideOfChar = "wIuUyYoOW"
const halfCharThatAppearAtRightSideOfChar = "Í´R@˜®"
const nasalSoundCaharacter = "NMµ"
const sihari = "i";
const allMatrasHalfCharAndNasalSoundChar = sihari + matrasThatAppearAtRightSideOfChar + halfCharThatAppearAtRightSideOfChar + nasalSoundCaharacter
const unicodeMatras = "ਾਿੀੁੂੇੈੋੌੰਂ"

export function fixLarivaar(word, unicode, larivaarAssistColor, indexVal) {
    var breakSupportedCharList = [];
    
    var segmentedValArr = null;
    if(unicode) {
        segmentedValArr = fixLarivaarUnicode(word);
    } else {
        segmentedValArr = fixLarivaarGurmukhiFont(word);
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
                <span key={indexVal} style={{ color: indexVal % 2 === 1 ? larivaarAssistColor : '' }}>
                    <span key={i}>
                    {segmentedValArr[i]}<wbr />
                    </span>
                </span>
            )
        }
    }    
    return breakSupportedCharList;
      
}
// Look for consonants and break word
function fixLarivaarGurmukhiFont(str) {
	var arrWordBreak = [];
	// search and break till next consonant
    var segmentedStr = '';
	for(var i=0;i<str.length;i++) {
        segmentedStr += str[i]
        // handle sihari exeption
        // add to the segment string and ignore other checks
        if(isSihari(str[i])) {
            continue;
        }
		if(isConsonant(str[i+1]) || isSihari(str[i+1])) {
			arrWordBreak.push(segmentedStr)
			segmentedStr = '';
		}
	}
    return arrWordBreak
}

// In unicode All matras are right hand sided
// and matras comes after main consonant and half character
// we need to break word after Matras not consonant
function fixLarivaarUnicode(str) {
	var arrWordBreak = [];
	// search and break till next consonant
    var segmentedStr = '';
	for(var i=0;i<str.length;i++) {
        segmentedStr += str[i]
        // exception for half character
        if(str[i+1] == "੍") {
            segmentedStr += str[i+1]
            i=i+1;
            continue;
        }
		if(!isUnicodeConsonant(str[i+1])) {
			arrWordBreak.push(segmentedStr)
			segmentedStr = '';
		}
	}
    return arrWordBreak
}

function isConsonant(char) {
	if(allMatrasHalfCharAndNasalSoundChar.indexOf(char) == -1) {
		return true;
	} else {
		return false;
	}
}

function isUnicodeConsonant(char) {
	if(unicodeMatras.indexOf(char) != -1) {
		return true;
	} else {
		return false;
	}
}

function isSihari(char) {
	if(char == sihari) {
		return true;
	} else {
		return false;
	}
}

