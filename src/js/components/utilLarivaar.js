var matrasThatAppearAtRightSideOfChar = "wIuUyYoOW"
var halfCharThatAppearAtRightSideOfChar = "Í´R@˜®"
var nasalSoundCaharacter = "NMµ"
var sihari = "i";
var allMatrasHalfCharAndNasalSoundChar = sihari + matrasThatAppearAtRightSideOfChar + halfCharThatAppearAtRightSideOfChar + nasalSoundCaharacter
var unicodeMatras = "ਾਿੀੁੂੇੈੋੌੰਂ"

// Look for consonants and break word
export function fixLarivaar(str) {
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
		console.log(segmentedStr)
	}
    return arrWordBreak
}

// In unicode All matras are right hand sided
// and matras comes after main consonant and half character
// we need to break word after Matras not consonant
export function fixLarivaarUnicode(str) {
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

