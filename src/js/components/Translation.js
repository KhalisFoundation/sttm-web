import React from 'react';
import PropTypes from 'prop-types';
import { TRANSLATION_LANGUAGES, ENGLISH_TRANSLATION_LANGUAGES, HINDI_TRANSLATION_LANGUAGES, PUNJABI_LANGUAGE } from '@/constants';

export default class Translation extends React.PureComponent {
  static defaultProps = { children: '', isReadingMode: false };
  static defaultFontSize = '18px';
  static propTypes = {
    type: PropTypes.oneOf([...TRANSLATION_LANGUAGES, ...ENGLISH_TRANSLATION_LANGUAGES, ...HINDI_TRANSLATION_LANGUAGES]),
    unicode: (props, propName) => {
      if (
        props.type === PUNJABI_LANGUAGE &&
        (props[propName] === undefined || typeof props[propName] !== 'boolean')
      ) {
        return new Error(
          `${propName} is required when props.type = '${PUNJABI_LANGUAGE}'`
        );
      }
    },
    text: (props, propName) => {
      if (
        props.type === PUNJABI_LANGUAGE &&
        (props[propName] === undefined ||
          !['gurmukhi', 'unicode'].every(key => key in props[propName]))
      ) {
        return new Error(
          `${propName} is required when props.type = '${PUNJABI_LANGUAGE}' of shape { gurmukhi: String, unicode: String }`
        );
      }
    },
    fontSize: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    children: PropTypes.string,
    isReadingMode: PropTypes.bool,
  };

  static getTranslationProps = ({
    translationMap,
    language,
    shabad,
    unicode,
  }) => {
    return language === PUNJABI_LANGUAGE
      ? { unicode, text: translationMap.punjabi(shabad) }
      : { children: translationMap[language](shabad) };
  }

  render() {
    const { defaultFontSize } = Translation;
    const { type, unicode, text, fontSize: _fontSize, children, isReadingMode } = this.props;
    const fontSize = _fontSize ? _fontSize + 'em' : defaultFontSize;
    const translationClass = isReadingMode ? 'reading-mode-translation' : 'translation';

    const isTranslationExists = (!!text && (!!text.unicode || !!text.gurmukhi)) || !!children;
    if (!isTranslationExists) return null;

    if (type === PUNJABI_LANGUAGE) {
      return (
        <blockquote style={{ fontSize }} className={`${translationClass} punjabi gurbani-font`}>
          {unicode ? (
            <div className="unicode">{text.unicode}</div>
          ) : (
              <div className="gurlipi">{text.gurmukhi}</div>
            )}
        </blockquote>
      );
    } else {
      return (
        <blockquote style={{ fontSize }} className={`${translationClass} ${type}`}>
          {children}
        </blockquote>
      );
    }
  }
}
