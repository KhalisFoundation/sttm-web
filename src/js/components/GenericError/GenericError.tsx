import React from 'react';
import PropTypes from 'prop-types';

const BalpreetSingh = 'Balpreet Singh';
const SachKaur = 'Sach Kaur';

const images = {
  [BalpreetSingh]: {
    url: '/assets/images/404.png',
    alt: 'Image of a Sikh Man smiling at you',
  },
  [SachKaur]: {
    url: '/assets/images/Sach Kaur.png',
    alt: 'Image of a Sikh Girl face-palming',
  },
};

/**
 *
 *
 * @export
 * @class GenericError
 * @extends {React.PureComponent<GenericErrorProps>}
 */
export default class GenericError extends React.PureComponent {
  static BalpreetSingh = BalpreetSingh;
  static SachKaur = SachKaur;

  /**
   * @typedef {object} GenericErrorProps
   * @property {*} title
   * @property {*} description
   * @property {(BalpreetSingh|SachKaur)} image
   *
   * @static
   * @memberof GenericError
   */
  static propTypes = {
    title: PropTypes.any,
    description: PropTypes.node,
    image: PropTypes.oneOf([SachKaur, BalpreetSingh]),
  };

  render() {
    const { title, description, image } = this.props;
    const { url, alt } = images[image];

    return (
      <div className="error-message">
        <div>
          <h3>{title}</h3>
          <section>{description}</section>
        </div>
        <div>
          <img src={url} alt={alt} />
        </div>
      </div>
    );
  }
}
