import React from 'react';
import PropTypes from 'prop-types';
import { TRANSLATION_LANGUAGES } from '../constants';

export default class Translation extends React.PureComponent {
  static propTypes = {
    type: PropTypes.oneOf(TRANSLATION_LANGUAGES),
    unicode: (props, propName) => {
      if (props.type === 'punjabi' && (
        props[propName] === undefined
        || typeof props[propName] !== 'boolean'
      )) {
        return new Error(`${propName} is required when props.type = 'punjabi'`);
      }
    },
    text: (props, propName) => {
      if (props.type === 'punjabi' && (
        props[propName] === undefined
        || !('gurmukhi' in props[propName])
        || !('unicode' in props[propName])
        || typeof props[propName].gurmukhi !== 'string'
        || typeof props[propName].unicode !== 'string'
      )) {
        return new Error(`${propName} is required when props.type = 'punjabi' of shape { gurmukhi: String, unicode: String }`);
      }
    },
    children: PropTypes.string.isRequired,
  };

  render() {
    const {
      type,
      unicode,
      text
    } = this.props;

    const PUNJABI = 'punjabi';
    const className = `transliteration ${type} ${type === PUNJABI ? 'gurbani-font' : ''}`;
    return type === PUNJABI
      ? (

        <blockquote className="translation punjabi gurbani-font">
          {
            unicode
              ? <div className="unicode">{text.unicode}</div>
              : <div className="gurlipi">{text.gurmukhi}</div>
          }
        </blockquote>
      )
      : (
        <blockquote className={className}>{this.props.children}</blockquote>
      );
  }
}