import React from 'react';
import PropTypes from 'prop-types';
import { TRANSLATION_LANGUAGES } from '../constants';

const PUNJABI = 'punjabi';
export default class Translation extends React.PureComponent {
  static defaultProps = {
    children: '',
  };

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
    children: PropTypes.string,
  };

  render() {
    const { type, unicode, text } = this.props;
    const className = `transliteration ${type} ${
      type === PUNJABI ? 'gurbani-font' : ''
    }`;
    return type === PUNJABI ? (
      <blockquote className="translation punjabi gurbani-font">
        {unicode ? (
          <div className="unicode">{text.unicode}</div>
        ) : (
          <div className="gurlipi">{text.gurmukhi}</div>
        )}
      </blockquote>
    ) : (
      <blockquote className={className}>{this.props.children}</blockquote>
    );
  }
}
