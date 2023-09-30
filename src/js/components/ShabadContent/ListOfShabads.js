import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { GlobalHotKeys } from 'react-hotkeys';

import Controls, { supportedMedia } from '@/components/Controls';
import Meta from '@/components/Meta';
import ProgressBar from '@/components/ProgressBar';
import Baani from '@/components/Baani';

import { ViewerShortcuts, ViewerShortcutHanders } from '../../Shortcuts';

/**
 *
 *
 * @class Shabad
 * @augments {React.PureComponent<ShabadProps, ShabadState>}
 */
class ListOfShabads extends React.PureComponent {   

  static defaultProps = {
    hideControls: false,
    hideMeta: false,
    controlProps: {},
  };

  /**
   * @typedef {object} ShabadProps
   * @property {array} gurbani
   * @property {number} highlight LineNo of highlighted shabad line
   * @property {ShabadContentTypes} type of shabad
   * @property {{ previous: string, next: string }} nav
   * @property {object} info
   * @property {boolean} [hideMeta=false]
   * @property {boolean} [hideControls=false]
   * @property {{}} controlProps override props passed to <Controls />.
   *
   * TODO: Refactor code to support render props to allow different configurations.
   *
   * @memberof Shabad
   */
  static propTypes = {
    shabads: PropTypes.array.isRequired,
    type: PropTypes.oneOf(['shabad', 'ang', 'hukamnama', 'sync']).isRequired,
    hideMeta: PropTypes.bool,
    hideControls: PropTypes.bool,
    controlProps: PropTypes.object,
    isLoadingContent: PropTypes.bool,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    splitView: PropTypes.bool.isRequired,
    translationLanguages: PropTypes.array.isRequired,
    transliterationLanguages: PropTypes.array.isRequired,
    steekLanguages: PropTypes.array.isRequired,
    larivaarAssist: PropTypes.bool.isRequired,
    larivaar: PropTypes.bool.isRequired,
    unicode: PropTypes.bool.isRequired,
    fontSize: PropTypes.number.isRequired,
    lineHeight: PropTypes.number.isRequired,
    transliterationFontSize: PropTypes.number.isRequired,
    translationFontSize: PropTypes.number.isRequired,
    fontFamily: PropTypes.string.isRequired,
    centerAlignGurbani: PropTypes.bool.isRequired,
    showFullScreen: PropTypes.bool,
    paragraphMode: PropTypes.bool,
    readingMode: PropTypes.bool,
    sgBaaniLength: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }
  render() {
    const {
      props: {        
        sgBaaniLength,
        readingMode,
        ...baniProps
      },
      handleEmbed,
      handleCopyAll,
    } = this;   

    const {
      type,
      shabads,
      highlights,
      translationLanguages,
      transliterationLanguages,
      unicode,
    } = baniProps;   
    
    const isShowMetaData = this.props.hideMeta === false;
    const isShowControls = this.props.hideControls === false;
    const highlightsArray = highlights.split(',')

    return (
      <GlobalHotKeys
        keyMap={ViewerShortcuts}
        handlers={ViewerShortcutHanders}
        root
      >
        <React.Fragment>
          {isShowControls && (
            <Controls
              media={supportedMedia.filter(m => m !== 'addShabad')}
              onCopyAllClick={handleCopyAll}
              onEmbedClick={handleEmbed}
              {...this.props.controlProps}
            />
          )}

          {
            shabads.map(({shabadInfo: info, navigation: nav, verses: gurbani}, index) => {
              const highlight = parseInt(highlightsArray[index], 10)
              return (
                <React.Fragment key={index}>
                  {isShowMetaData && (
                    <Meta
                      isArrowsHidden={true}
                      isUnicode={unicode}
                      info={info}
                      nav={nav}
                      type={type}
                      translationLanguages={translationLanguages}
                      transliterationLanguages={transliterationLanguages}
                    />
                  )}
                  <div id="shabad" className={`shabad display display-${type}`}>
                    <div className="shabad-container">
                      {
                        <Baani
                          {...baniProps}
                          isScroll={false}
                          gurbani={gurbani}
                          highlight={highlight}
                          sgBaaniLength={sgBaaniLength}
                          isSundarGutkaRoute={false}
                          isParagraphMode={false}
                          isReadingMode={readingMode}
                        />
                      }
                    </div>
                  </div>
                </React.Fragment>
              )
            })
          }
          <ProgressBar />
        </React.Fragment>
      </GlobalHotKeys>
    );
  }
}

const stateToProps = (state) => state;
export default connect(stateToProps)(withRouter(ListOfShabads));
