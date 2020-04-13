import React from 'react';
import PropTypes from 'prop-types';

import { VISRAAM_CONSTANTS } from '../constants';
import { clearVisraamClass } from '../util';
import { QUICK_SETTINGS } from '../settings';
import { MultiSelect } from '../components/MultiSelect';

export default class ShabadControls extends React.PureComponent {
  static propTypes = {
    setTranslationLanguages: PropTypes.func.isRequired,
    setTransliterationLanguages: PropTypes.func.isRequired,
    resetDisplayOptions: PropTypes.func.isRequired,
    resetFontOptions: PropTypes.func.isRequired,
    toggleVisraams: PropTypes.func.isRequired,
    toggleLarivaarOption: PropTypes.func.isRequired,
    toggleLarivaarAssistOption: PropTypes.func.isRequired,
    setFontSize: PropTypes.func.isRequired,
    toggleCenterAlignOption: PropTypes.func.isRequired,
    toggleSplitViewOption: PropTypes.func.isRequired,

    translationLanguages: PropTypes.array.isRequired,
    transliterationLanguages: PropTypes.array.isRequired,
    visraams: PropTypes.bool.isRequired,
    visraamSource: PropTypes.string.isRequired,
    visraamStyle: PropTypes.string.isRequired,
    larivaarAssist: PropTypes.bool.isRequired,
    larivaar: PropTypes.bool.isRequired,
    fontSize: PropTypes.number.isRequired,
    centerAlignGurbani: PropTypes.bool.isRequired,
    splitView: PropTypes.bool.isRequired,
  };

  bake_settings = settingsObj => {
    let iconsMarkup;
    switch (settingsObj.type) {
      case 'multiselect_checkbox':
        return (
          <MultiSelect
            collections={settingsObj.collections}
          />
        )
      case 'text-option':
        return (
          <span onClick={settingsObj.action}>{settingsObj.label}</span>
        )
      case 'toggle-option':
        return (
          <>
            <p className="toggle-text">{settingsObj.label}</p>
            <input type='checkbox'
              id={`${settingsObj.label}-control`}
              checked={settingsObj.checked}
              className="toggle-checkbox"
              onChange={settingsObj.action} />
            <label className="toggle-label" htmlFor={`${settingsObj.label}-control`}></label>
          </>
        )
      case 'icon-toggle':
        iconsMarkup = settingsObj.iconList.map((i, x) => {
          const Icon = i.icon;
          return (
            <Icon value={i.value} key={'icon-toggle' + x} onClick={i.action} />
          );
        });
        return (
          <>
            <p className="toggle-text">{settingsObj.label}</p>
            <>
              {iconsMarkup}
            </>
          </>
        )
      case 'separator':
        return (
          <span className="separator"></span>
        )
    }
  }

  componentDidUpdate() {
    clearVisraamClass();
    document.body.classList[this.props.visraams ? 'add' : 'remove'](
      VISRAAM_CONSTANTS.CLASS_NAME,
      VISRAAM_CONSTANTS.SOURCE_CLASS(this.props.visraamSource),
      VISRAAM_CONSTANTS.TYPE_CLASS(this.props.visraamStyle)
    );
  }

  render() {
    const {
      translationLanguages,
      transliterationLanguages,
      visraams,
      setTranslationLanguages,
      setTransliterationLanguages,
      setFontSize,
      resetDisplayOptions,
      resetFontOptions,
      toggleVisraams,
      toggleLarivaarOption,
      toggleLarivaarAssistOption,
      larivaarAssist,
      larivaar,
      fontSize,
      toggleCenterAlignOption,
      centerAlignGurbani,
      toggleSplitViewOption,
      splitView,
    } = this.props;

    const settings = QUICK_SETTINGS(
      translationLanguages,
      transliterationLanguages,
      setTranslationLanguages,
      setTransliterationLanguages,
      resetDisplayOptions,
      resetFontOptions,
      toggleVisraams,
      toggleLarivaarOption,
      toggleLarivaarAssistOption,
      visraams,
      larivaarAssist,
      larivaar,
      setFontSize,
      fontSize,
      toggleCenterAlignOption,
      centerAlignGurbani,
      toggleSplitViewOption,
      splitView,
    );

    return (
      <React.Fragment>
        <div id="shabad-controllers">
          {settings.map((element, i) => (
            <div key={`settings-${i}`} className={`controller-option ${element.type}`}>
              {this.bake_settings(element)}
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}
