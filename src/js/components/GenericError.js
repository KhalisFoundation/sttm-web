import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
export const BalpreetSingh = 'Balpreet Singh';
export const SachKaur = 'Sach Kaur';

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

class GenericError extends React.PureComponent {
  static propTypes = {
    title: PropTypes.node,
    description: PropTypes.node,
    image: PropTypes.oneOf([SachKaur, BalpreetSingh]),
    showCartoonifiedPages: PropTypes.bool,
  };
  render() {
    const { title, description, image, showCartoonifiedPages } = this.props;
    const { url, alt } = images[image];
    return (
      <div className="error-message">
        <div>
          <h3>{title}</h3>
          {typeof description === 'string' ? (
            <section dangerouslySetInnerHTML={{ __html: description }} />
          ) : (
              <section>{description}</section>
            )}
        </div>
        {showCartoonifiedPages && 
          <div>
            <img src={url} alt={alt} />
          </div> 
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({ showCartoonifiedPages: state.showCartoonifiedPages })

export default connect(mapStateToProps)(GenericError);
