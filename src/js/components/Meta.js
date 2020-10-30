import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import DatePicker from 'react-date-picker';
import CalendarIcon from './Icons/CalendarIcon';
import Chevron from './Icons/Chevron';
import Hour24 from './Icons/Hour24';
import { getSourceId, getWriter, getRaag } from '@/util/api/shabad';

import { isFalsy, toAngURL, toNavURL, dateMath } from '../util';
import { TEXTS, PAGE_NAME, FIRST_HUKAMNAMA_DATE } from '@/constants';
import ForwardIcon from './Icons/ForwardIcon';

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
   * @property {boolean} isUnicode
   * @property {boolean} isArrowsHidden
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
    isUnicode: PropTypes.bool.isRequired,
    nav: PropTypes.shape({
      current: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      previous: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      next: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
    isArrowsHidden: PropTypes.bool
  };

  renderLeftArrow() {
    const {
      type,
      nav = {},
      isArrowsHidden,
    } = this.props;

    const link = toNavURL(this.props);
    const isShowPreviousArrow = isFalsy(nav.previous) === false;
    const isSync = type === 'sync';
    const isHukamnama = type === 'hukamnama';

    if (!isArrowsHidden) {
      if (isShowPreviousArrow) {
        return (
          <div className="shabad-nav left">
            <Link to={link + nav.previous}>
              {isHukamnama ? (
                <div className='hukamnama-nav-icon'>
                  <Hour24 direction='previous' />
                  <span>{dateMath.expand(nav.previous, false)}</span>
                </div>
              ) : (
                  <Chevron direction={Chevron.DIRECTIONS.LEFT} />
                )}
            </Link>
          </div>
        )
      }
      if (!isSync) {
        return (
          <div className="shabad-nav left disabled-nav">
            <a>
              {isHukamnama ? (
                <Hour24 direction='previous' />
              ) : (
                  <Chevron direction={Chevron.DIRECTIONS.LEFT} />
                )}
            </a>
          </div>
        )
      }
    }

    return '';
  }


  renderRightArrow() {
    const {
      type,
      nav = {},
      isArrowsHidden,
    } = this.props;

    const isShowNextArrow = isFalsy(nav.next) === false
    const isSync = type === 'sync';
    const isHukamnama = type === 'hukamnama';

    if (!isArrowsHidden) {

      if (isShowNextArrow) {
        return (
          <div className="shabad-nav right">
            <a role="button" aria-label="next" onClick={this.goToNextAng}>
              {isHukamnama ? (
                <div className='hukamnama-nav-icon'>
                  <Hour24 direction='next' />
                  <span>{dateMath.expand(nav.next, false)}</span>
                </div>
              ) : (
                  <Chevron direction={Chevron.DIRECTIONS.RIGHT} />
                )}
            </a>
          </div>
        )
      }

      if (!isSync) {
        return (
          <div className="shabad-nav right disabled-nav">
            <a>
              {isHukamnama ? (
                <Hour24 direction='next' />
              ) : (
                  <Chevron direction={Chevron.DIRECTIONS.RIGHT} />
                )}
            </a>
          </div>
        )
      }
    }

    return '';
  }

  render() {
    const {
      type,
      info,
      nav,
      isUnicode,
      translationLanguages,
      transliterationLanguages,
    } = this.props;
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
    const contentType = isUnicode ? 'unicode' : 'gurmukhi'
    const isHukamnama = type === 'hukamnama';

    // const isShabad = type === 'shabad';
    return (
      <div id="metadata" className={`metadata-${type}`}>
        {!isHukamnama && this.renderLeftArrow()}

        <div className="meta">
          {isHukamnama && (
            <div className="meta-hukamnama">
              <div className="meta-hukamnama-left">
                <DatePicker
                  clearIcon={null}
                  onChange={this.goToParticularHukamnama}
                  value={new Date(nav.current)}
                  maxDate={new Date()}
                  minDate={new Date(FIRST_HUKAMNAMA_DATE)}
                  calendarIcon={<CalendarIcon width={20} />}
                />
                <span>Past Hukamnamas</span>
              </div>
              <h4>
                {TEXTS.HUKAMNAMA}, <span>{nav.current}</span>
              </h4>
              <div className="meta-hukamnama-right">
                <ForwardIcon />
                <Link to={`/shabad?id=${info.shabadId}`}>
                  {TEXTS.GO_TO_SHABAD}
                </Link>
              </div>
            </div>
          )}
          <h4 className="gurbani-font">
            <Item>
              {getRaag(info) &&
                getRaag(info)[contentType] &&
                getRaag(info)[contentType] !== 'null' &&
                getRaag(info)[contentType]}
            </Item>
            <Item>{getWriter(info) && getWriter(info)[contentType]}</Item>
            <Item>{info.source[contentType]}</Item>
            {info.source.pageNo !== null && (
              <Item last>
                <Link
                  to={toAngURL({
                    ang: info.source.pageNo,
                    source: getSourceId(info),
                  })}
                >
                  {getSourceId(info) == 'G' ? PAGE_NAME.ANG[contentType] : PAGE_NAME.PANNA[contentType]}{' '}
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

        {!isHukamnama && this.renderRightArrow()}
      </div>
    );
  }

  /**
   * Handle SaveAng
   * @memberof Meta
   */

  goToParticularHukamnama = (date) => {
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const day = date.getDate();

    const hukamnamaDate = `${year}/${month}/${day}`;
    const link = toNavURL(this.props)
    this.props.history.push(link + hukamnamaDate);
  }
  goToNextAng = () => {
    const link = toNavURL(this.props);
    this.props.history.push(link + this.props.nav.next);
  };
}

export default withRouter(Meta);
