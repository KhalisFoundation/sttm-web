import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { VISRAAM } from '../constants';
import { clearVisraamClass } from '../util';
import { QUICK_SETTINGS, ADVANCED_SETTINGS, CONTROLLER_SETTINGS, CONTROLLER_ADVANCED_SETTINGS } from '../constants/settings';
import { MultiSelect } from './MultiSelect';
class ShabadControls extends React.PureComponent {
  static propTypes = {
    setTranslationLanguages: PropTypes.func,
    setTransliterationLanguages: PropTypes.func,
    resetDisplayOptions: PropTypes.func,
    resetFontOptions: PropTypes.func,
    toggleVisraams: PropTypes.func,
    toggleLarivaarOption: PropTypes.func,
    toggleSehajPaathMode: PropTypes.func,
    toggleLarivaarAssistOption: PropTypes.func,
    setFontSize: PropTypes.func,
    setTranslationFontSize: PropTypes.func,
    setTransliterationFontSize: PropTypes.func,
    setLineHeight: PropTypes.func,
    toggleCenterAlignOption: PropTypes.func,
    toggleSplitViewOption: PropTypes.func,
    toggleDarkMode: PropTypes.func,
    toggleAutoScrollMode: PropTypes.func,
    toggleParagraphMode: PropTypes.func,
    toggleReadingMode: PropTypes.func,
    setVisraamSource: PropTypes.func,
    setVisraamStyle: PropTypes.func,
    changeFont: PropTypes.func,
    toggleAdvancedOptions: PropTypes.func,
    setLarivaarAssistStrength: PropTypes.func,
    setSteekLanguages: PropTypes.func,
    setSgBaaniLength: PropTypes.func,
    setSplitView: PropTypes.func,
    setReadingMode: PropTypes.func,
    setSehajPaathMode: PropTypes.func,

    translationLanguages: PropTypes.array,
    transliterationLanguages: PropTypes.array,
    history: PropTypes.object,
    location: PropTypes.object,
    visraams: PropTypes.bool,
    visraamSource: PropTypes.string,
    visraamStyle: PropTypes.string,
    larivaarAssist: PropTypes.bool,
    larivaar: PropTypes.bool,
    fontSize: PropTypes.number,
    larivaarAssistStrength: PropTypes.number,
    translationFontSize: PropTypes.number,
    transliterationFontSize: PropTypes.number,
    lineHeight: PropTypes.number,
    centerAlignGurbani: PropTypes.bool,
    splitView: PropTypes.bool,
    darkMode: PropTypes.bool,
    autoScrollMode: PropTypes.bool,
    paragraphMode: PropTypes.bool,
    readingMode: PropTypes.bool,
    sehajPaathMode: PropTypes.bool,
    fontFamily: PropTypes.string,
    showAdvancedOptions: PropTypes.bool,

    desktopSettings: PropTypes.object,
    isBaniController: PropTypes.bool,
    updateSettings: PropTypes.func,
    desktopSettings: PropTypes.object,
    sgBaani: PropTypes.string,
  };

  bakeSettings = settingsObj => {
    let controlsMarkup, options, Icon;
    const isBetaFeature = settingsObj.stage === 'beta';
    switch (settingsObj.type) {
      case 'multiselect_checkbox':
        return (
          <MultiSelect
            collections={settingsObj.collections}
            dropdownLabel={settingsObj.label}
          />
        )
      case 'text-option':
        return (
          <span onClick={settingsObj.action}>{settingsObj.label}</span>
        )
      case 'toggle-option':
        return (
          <>
            <p className="toggle-text">
              {settingsObj.label}
            </p>
            <span style={{ position: 'relative' }}>
              <input type='checkbox'
                id={`${settingsObj.label}-control`}
                checked={settingsObj.checked}
                className="toggle-checkbox"
                onChange={settingsObj.action} />
              <label
                className="toggle-label"
                htmlFor={`${settingsObj.label}-control`} >
              </label>
              {isBetaFeature && <span className="feature-stage-text">beta</span>}
            </span>
          </>
        )
      case 'icon-toggle':
        controlsMarkup = settingsObj.controlsList.map((c, idx) => {
          const { icon, control, controlOptions, value, action, actionType } = c;
          const CustomControl = icon || control;
          const isOnChange = actionType === 'change';
          const isOnClick = actionType !== 'change';

          return (
            <CustomControl
              options={controlOptions}
              value={value}
              key={'icon-toggle' + idx}
              onClick={isOnClick ? action : undefined}
              onChange={isOnChange ? action : undefined}
            />
          );
        });
        return (
          <>
            <p className="toggle-text">{settingsObj.label}</p>
            {controlsMarkup}
          </>
        )
      case 'separator':
        return (
          <span className="separator" />
        )
      case 'dropdown':
        options = Object
          .keys(settingsObj.options)
          .map(key =>
            <option key={key} value={key}>{settingsObj.options[key]}</option>
          )
        return (
          <>
            <p className="toggle-text">{settingsObj.label}</p>
            <select
              value={settingsObj.value}
              onChange={(e) => {
                settingsObj.action(e.currentTarget.value);
              }}>
              {options}
            </select>
          </>
        )
      case 'icon-text-toggle':
        Icon = settingsObj.icon;
        return (
          <>
            <Icon value={settingsObj.value} onClick={settingsObj.action} />
            <span
              onClick={settingsObj.action}
              className={`icon-label ${settingsObj.value ? 'enabled' : ''}`}>
              {settingsObj.label}
            </span>
          </>
        )
    }
  }

  componentDidUpdate() {
    clearVisraamClass();
    document.body.classList[this.props.visraams ? 'add' : 'remove'](
      VISRAAM.CLASS_NAME,
      VISRAAM.SOURCE_CLASS(this.props.visraamSource),
      VISRAAM.TYPE_CLASS(this.props.visraamStyle)
    );
  }

  render() {
    const { isBaniController, updateSettings, desktopSettings } = this.props;
    let settings = [];
    let advanced = [];

    if (isBaniController) {
      settings = desktopSettings ? CONTROLLER_SETTINGS(updateSettings, desktopSettings) : [];
      advanced = CONTROLLER_ADVANCED_SETTINGS();
    } else {
      settings = QUICK_SETTINGS(this.props);
      advanced = ADVANCED_SETTINGS(this.props);
    }

    const quickSettingsPanel = (
      <>
        {settings.map((element, i) => {
          if (element.type) {
            return (
              <div data-cy={element.label} key={`settings-${i}`}
                className={`qs-option controller-option controller-multiselect ${element.type}`}>
                {this.bakeSettings(element)}
              </div>
            )
          }
          return null;
        })}
      </>
    );

    return (
      <React.Fragment>
        <div id="shabad-controllers" className={isBaniController ? 'bani-controller-settings' : 'sttm-settings'}>
          <div className="quick-settings">
            {quickSettingsPanel}
          </div>
          {this.props.showAdvancedOptions && (
            <div className="advanced-options">
              <button className="advanced-options--close" onClick={this.props.toggleAdvancedOptions}> X </button>
              {advanced.map((element, i) => {
                if (element.type) {
                  return (
                    <div
                      data-cy={element.label}
                      key={`settings-${i}`}
                      className={`controller-option ${element.type}`}>
                      {this.bakeSettings(element)}
                    </div>
                  )
                }
                return null;
              })}
              {quickSettingsPanel}
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(ShabadControls);
