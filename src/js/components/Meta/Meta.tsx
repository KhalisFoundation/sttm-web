import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { TEXTS } from '@/constants';
import { isFalsy, toAngURL, toNavURL, saveAng, shouldSaveAng } from '@/util';
import Chevron from '@/components/Icons/Chevron';

/**
 *
 *
 * @export
 * @class Meta
 * @augments {React.PureComponent<MetaProps>}
 */
class Meta extends React.PureComponent {
  static defaultProps = {
    nav: {},
  };

  /**
   * @typedef {object} MetaProps
   * @property {ShabadContentTypes} type
   * @property {object} info
   * @property {array} translationLanguages
   * @property {array} transliterationLanguages
   * @property {object} nav
   *
   * @static
   * @memberof Meta
   */
  static propTypes = {
    history: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    info: PropTypes.object.isRequired,
    translationLanguages: PropTypes.array.isRequired,
    transliterationLanguages: PropTypes.array.isRequired,
    nav: PropTypes.shape({
      previous: PropTypes.string,
      next: PropTypes.string,
    }),
  };

  render() {
    const {
      nav = {},
      type,
      info,
      translationLanguages,
      transliterationLanguages,
    } = this.props;

    const link = toNavURL(this.props);
    const Item = ({ children, last = false }) =>
      children ? (
        <React.Fragment>
          {children}
          {last ? '' : ' - '}
        </React.Fragment>
      ) : null;

    const shouldShowEnglishInHeader =
      translationLanguages.includes('english') ||
      transliterationLanguages.includes('english');

    return (
      <div id="metadata">
        {isFalsy(nav.previous) === false ? (
          <div className="shabad-nav left">
            <Link to={link + nav.previous}>
              <Chevron direction={Chevron.DIRECTIONS.LEFT} />
            </Link>
          </div>
        ) : (
          <div className="shabad-nav left disabled-nav">
            <a>
              <Chevron direction={Chevron.DIRECTIONS.LEFT} />
            </a>
          </div>
        )}
        <div className="meta">
          {['hukamnama'].includes(type) && (
            <h4>
              <Link to={`/shabad?id=${info.id}`}>{TEXTS.GO_TO_SHABAD}</Link>
            </h4>
          )}
          <h4 className="gurbani-font">
            <Item>
              {info.raag &&
                info.raag.gurmukhi &&
                info.raag.gurmukhi !== 'null' &&
                info.raag.gurmukhi}
            </Item>
            <Item>{info.writer && info.writer.gurmukhi}</Item>
            <Item>{info.source.gurmukhi}</Item>
            <Item last>
              {info.pageno !== null && (
                <Link
                  to={toAngURL({
                    ang: info.source.pageno,
                    source: info.source.id,
                  })}
                >
                  {info.source.id == 'G' ? 'AMg' : 'pMnw'} {info.source.pageno}
                </Link>
              )}
            </Item>
          </h4>

          {shouldShowEnglishInHeader && (
            <h4>
              <Item>
                {info.raag &&
                  info.raag.english &&
                  info.raag.english !== 'null' &&
                  info.raag.english}
              </Item>
              <Item>{info.writer && info.writer.english}</Item>
              <Item>{info.source.english}</Item>
              <Item last>
                <Link
                  to={toAngURL({
                    ang: info.source.pageno,
                    source: info.source.id,
                  })}
                >
                  {info.source.id == 'G' ? 'Ang' : 'Pannaa'}{' '}
                  {info.source.pageno}
                </Link>
              </Item>
            </h4>
          )}
        </div>

        {isFalsy(nav.next) === false ? (
          <div className="shabad-nav right">
            <a role="button" aria-label="next" onClick={this.handleSaveAng}>
              <Chevron direction={Chevron.DIRECTIONS.RIGHT} />
            </a>
          </div>
        ) : (
          <div className="shabad-nav right disabled-nav">
            <a>
              <Chevron direction={Chevron.DIRECTIONS.RIGHT} />
            </a>
          </div>
        )}
      </div>
    );
  }

  /**
   * Handle SaveAng
   * @memberof Meta
   */
  handleSaveAng = () => {
    const link = toNavURL(this.props);
    shouldSaveAng(this.props) && saveAng(this.props.nav.next);
    this.props.history.push(link + this.props.nav.next);
  };
}

export default withRouter(Meta);
