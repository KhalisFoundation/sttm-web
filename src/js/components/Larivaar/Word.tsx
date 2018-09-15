import React from 'react';
import PropTypes from 'prop-types';
import { fixLarivaarUnicode, fixLarivaarGurmukhiFont } from './util';

/**
 *
 *
 * @export
 * @class LarivaarWord
 * @augments {React.PureComponent<LarivaarWordProps>}
 */
export default class LarivaarWord extends React.PureComponent {
  /**
   * @typedef {object} LarivaarWordProps
   * @property {string} word
   * @property {boolean} [unicode]
   * @property {string} larivaarAssistColor
   * @property {number} index
   */

  public static propTypes = {
    word: PropTypes.string.isRequired,
    unicode: PropTypes.bool,
    larivaarAssistColor: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
  };

  public render() {
    const { word, unicode, larivaarAssistColor, index } = this.props;

    const segments = unicode
      ? fixLarivaarUnicode(word)
      : fixLarivaarGurmukhiFont(word);

    return segments.map((item, i) => {
      const color = index % 2 === 1 ? larivaarAssistColor : '';
      const key = `${index}.${i}`;

      if (item.includes('´')) {
        // handle space break for this special character
        return (
          <span
            key={key}
            style={{
              color,
              display: 'inline-block',
            }}
          >
            {item}
            <wbr />
          </span>
        );
      } else {
        return (
          <span key={key} style={{ color }}>
            <span>
              {item}
              <wbr />
            </span>
          </span>
        );
      }
    });
  }
}
