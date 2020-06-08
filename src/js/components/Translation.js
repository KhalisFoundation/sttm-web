import React from 'react';
import PropTypes from 'prop-types';
import { TRANSLATION_LANGUAGES } from '../constants';

const PUNJABI = 'punjabi';
export default class Translation extends React.PureComponent {
  static defaultProps = { children: '' };

  static propTypes = {
    type: PropTypes.oneOf(TRANSLATION_LANGUAGES),
    unicode: (props, propName) => {
      if (
        props.type === PUNJABI &&
        (props[propName] === undefined || typeof props[propName] !== 'boolean')
      ) {
        return new Error(
          `${propName} is required when props.type = '${PUNJABI}'`
        );
      }
    },
    text: (props, propName) => {
      if (
        props.type === PUNJABI &&
        (props[propName] === undefined ||
          !['gurmukhi', 'unicode'].every(key => key in props[propName]))
      ) {
        return new Error(
          `${propName} is required when props.type = '${PUNJABI}' of shape { gurmukhi: String, unicode: String }`
        );
      }
    },
    fontSize: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    children: PropTypes.string,
  };

  static getTranslationProps = ({
    translationMap,
    language,
    shabad,
    unicode,
  }) =>
    language === PUNJABI
      ? { unicode, text: translationMap.punjabi(shabad) }
      : { children: translationMap[language](shabad) };

  render() {
    const defaultFontSize = '18px';
    const { type, unicode, text, fontSize: _fontSize } = this.props;
    const fontSize = _fontSize ? (0.7 * _fontSize) + 'em' : defaultFontSize;

    if (type === PUNJABI) {
      return (
        <blockquote style={{ fontSize }} className="translation punjabi gurbani-font">
          {unicode ? (
            <div className="unicode">{text.unicode}</div>
          ) : (
              <div className="gurlipi">{text.gurmukhi}</div>
            )}
        </blockquote>
      );
    } else {
      return (
        <blockquote style={{ fontSize }} className={`translation ${type}`}>
          {this.props.children}
        </blockquote>
      );
    }
  }
}
