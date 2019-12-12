import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { TEXTS } from '../constants';
import { isFalsy, toAngURL, toNavURL, saveAng, shouldSaveAng, dateMath } from '../util';
import Chevron from './Icons/Chevron';
import Hour24 from './Icons/Hour24';
import { withRouter } from 'react-router-dom';
import { getSourceId, getWriter, getRaag } from '@/util/api/shabad';

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
      previous: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      next: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
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
              {type === 'hukamnama' ? (
                <div className='hukamnama-nav-icon'>
                  <Hour24 direction='previous' />
                  <span>{dateMath.expand(nav.previous, false)}</span>
                </div>
              ) : (
                  <Chevron direction={Chevron.DIRECTIONS.LEFT} />
                )}
            </Link>
          </div>
        ) : type !== 'sync' ? (
          <div className="shabad-nav left disabled-nav">
            <a>
              {type === 'hukamnama' ? (
                <Hour24 direction='previous' />
              ) : (
                  <Chevron direction={Chevron.DIRECTIONS.LEFT} />
                )}
            </a>
          </div>
        ) : ''}
        <div className="meta">
          {['hukamnama'].includes(type) && (
            <h4>
              <Link to={`/shabad?id=${info.shabadId}`}>
                {TEXTS.GO_TO_SHABAD}
              </Link>
            </h4>
          )}
          <h4 className="gurbani-font">
            <Item>
              {getRaag(info) &&
                getRaag(info)['gurmukhi'] &&
                getRaag(info)['gurmukhi'] !== 'null' &&
                getRaag(info)['gurmukhi']}
            </Item>
            <Item>{getWriter(info) && getWriter(info)['gurmukhi']}</Item>
            <Item>{info.source.gurmukhi}</Item>
            {info.source.pageNo !== null && (
              <Item last>
                <Link
                  to={toAngURL({
                    ang: info.source.pageNo,
                    source: getSourceId(info),
                  })}
                >
                  {getSourceId(info) == 'G' ? 'AMg' : 'pMnw'}{' '}
                  {info.source.pageNo}
                </Link>
              </Item>
            )}
          </h4>

          {shouldShowEnglishInHeader && (
            <h4>
              <Item>
                {getRaag(info) &&
                  getRaag(info)['english'] &&
                  getRaag(info)['english'] !== 'null' &&
                  getRaag(info)['english']}
              </Item>
              <Item>{getWriter(info) && getWriter(info)['english']}</Item>
              <Item>{info.source.english}</Item>
              {info.source.pageNo !== null && (
                <Item last>
                  <Link
                    to={toAngURL({
                      ang: info.source.pageNo,
                      source: getSourceId(info),
                    })}
                  >
                    {getSourceId(info) == 'G' ? 'Ang' : 'Pannaa'}{' '}
                    {info.source.pageNo}
                  </Link>
                </Item>
              )}
            </h4>
          )}
        </div>

        {isFalsy(nav.next) === false ? (
          <div className="shabad-nav right">
            <a role="button" aria-label="next" onClick={this.goToNextAng}>
              {type === 'hukamnama' ? (
                <div className='hukamnama-nav-icon'>
                  <Hour24 direction='next' />
                  <span>{dateMath.expand(nav.next, false)}</span>
                </div>
              ) : (
                  <Chevron direction={Chevron.DIRECTIONS.RIGHT} />
                )}
            </a>
          </div>
        ) : type !== 'sync' ? (
          <div className="shabad-nav right disabled-nav">
            <a>
              {type === 'hukamnama' ? (
                <Hour24 direction='next' />
              ) : (
                  <Chevron direction={Chevron.DIRECTIONS.RIGHT} />
                )}
            </a>
          </div>
        ) : ''}
      </div>
    );
  }

  /**
   * Handle SaveAng
   * @memberof Meta
   */
  goToNextAng = () => {
    const link = toNavURL(this.props);
    this.props.history.push(link + this.props.nav.next);
  };
}

export default withRouter(Meta);
