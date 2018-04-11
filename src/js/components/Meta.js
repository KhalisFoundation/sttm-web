import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { TEXTS } from '../constants';
import { isFalsy, toAngURL, navLink } from '../util';
import Chevron from './Icons/Chevron';

const isGotoShabadEnabled = type => ['hukamnama'].includes(type);
const angOrPanna = (source, english = false) => {
  if (source === 'G') {
    return english ? 'Ang' : 'AMg';
  }
  return english ? 'Pannaa' : 'pMnw';
};

export default class Meta extends React.PureComponent {
  static defaultProps = {
    nav: {},
  };

  static propTypes = {
    type: PropTypes.string.isRequired,
    info: PropTypes.object.isRequired,
    nav: PropTypes.shape({
      previous: PropTypes.string,
      next: PropTypes.string,
    }),
  };

  render() {
    const { nav = {}, type, info } = this.props;
    const link = navLink(type, info.source.id);
    const Item = ({ children, last = false }) =>
      children ? (
        <React.Fragment>
          {children}
          {last ? '' : ' - '}
        </React.Fragment>
      ) : null;
    return (
      <div id="metadata">
        {isFalsy(nav.previous) === false && (
          <div className="shabad-nav left">
            <Link title="Previous" to={link + nav.previous}>
              <Chevron left />
            </Link>
          </div>
        )}
        <div className="meta">
          {isGotoShabadEnabled(type) && (
            <h4>
              <Link title="Go to Shabad" to={`/shabad?id=${info.id}`}>
                {TEXTS.GO_TO_SHABAD}
              </Link>
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
                  title={`Open ${angOrPanna(info.source.id, false)}`}
                  to={toAngURL({
                    ang: info.source.pageno,
                    source: info.source.id,
                  })}
                >
                  {angOrPanna(info.source.id, false)} {info.source.pageno}
                </Link>
              )}
            </Item>
          </h4>
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
                title={`Open ${angOrPanna(info.source.id, true)}`}
                to={toAngURL({
                  ang: info.source.pageno,
                  source: info.source.id,
                })}
              >
                {angOrPanna(info.source.id, true)} {info.source.pageno}
              </Link>
            </Item>
          </h4>
        </div>

        {isFalsy(nav.next) === false && (
          <div className="shabad-nav right">
            <Link title="Next" to={link + nav.next}>
              <Chevron right />
            </Link>
          </div>
        )}
      </div>
    );
  }
}
