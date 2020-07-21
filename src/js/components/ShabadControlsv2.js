import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { VISRAAM } from '../constants';
import { clearVisraamClass } from '../util';
import { QUICK_SETTINGS, ADVANCED_SETTINGS } from '../settings';
import { MultiSelect } from '../components/MultiSelect';



class ShabadControls extends React.PureComponent {
  static propTypes = {
    setTranslationLanguages: PropTypes.func.isRequired,
    setTransliterationLanguages: PropTypes.func.isRequired,
    resetDisplayOptions: PropTypes.func.isRequired,
    resetFontOptions: PropTypes.func.isRequired,
    toggleVisraams: PropTypes.func.isRequired,
    toggleLarivaarOption: PropTypes.func.isRequired,
    toggleLarivaarAssistOption: PropTypes.func.isRequired,
    setFontSize: PropTypes.func.isRequired,
    setTranslationFontSize: PropTypes.func.isRequired,
    setTransliterationFontSize: PropTypes.func.isRequired,
    setLineHeight: PropTypes.func.isRequired,
    toggleCenterAlignOption: PropTypes.func.isRequired,
    toggleSplitViewOption: PropTypes.func.isRequired,
    toggleDarkMode: PropTypes.func.isRequired,
    toggleAutoScrollMode: PropTypes.func.isRequired,
    toggleParagraphMode: PropTypes.func.isRequired,
    setVisraamSource: PropTypes.func.isRequired,
    setVisraamStyle: PropTypes.func.isRequired,
    changeFont: PropTypes.func.isRequired,
    toggleAdvancedOptions: PropTypes.func.isRequired,
    setLarivaarAssistStrength: PropTypes.func.isRequired,

    translationLanguages: PropTypes.array.isRequired,
    transliterationLanguages: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    visraams: PropTypes.bool.isRequired,
    visraamSource: PropTypes.string.isRequired,
    visraamStyle: PropTypes.string.isRequired,
    larivaarAssist: PropTypes.bool.isRequired,
    larivaar: PropTypes.bool.isRequired,
    fontSize: PropTypes.number.isRequired,
    larivaarAssistStrength: PropTypes.number.isRequired,
    translationFontSize: PropTypes.number.isRequired,
    transliterationFontSize: PropTypes.number.isRequired,
    lineHeight: PropTypes.number.isRequired,
    centerAlignGurbani: PropTypes.bool.isRequired,
    splitView: PropTypes.bool.isRequired,
    darkMode: PropTypes.bool.isRequired,
    autoScrollMode: PropTypes.bool.isRequired,
    paragraphMode: PropTypes.bool.isRequired,
    fontFamily: PropTypes.string.isRequired,
    showAdvancedOptions: PropTypes.bool.isRequired,
  };

  bakeSettings = settingsObj => {
    let controlsMarkup, options, Icon;
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
            <p className="toggle-text">{settingsObj.label}</p>
            <input type='checkbox'
              id={`${settingsObj.label}-control`}
              checked={settingsObj.checked}
              className="toggle-checkbox"
              onChange={settingsObj.action} />
            <label
              className="toggle-label"
              htmlFor={`${settingsObj.label}-control`} />
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
    const settings = QUICK_SETTINGS(this.props);
    const advanced = ADVANCED_SETTINGS(this.props);

    const quickSettingsPanel = (
      <>
        {settings.map((element, i) => {
          if (element.type) {
            return (
              <div key={`settings-${i}`}
                className={`qs-option controller-option ${element.type}`}>
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
        <div id="shabad-controllers">
          <div className="quick-settings">
            {quickSettingsPanel}
          </div>
          {this.props.showAdvancedOptions && (
            <div className="advanced-options">
              {advanced.map((element, i) => {
                if (element.type) {
                  return (
                    <div key={`settings-${i}`} className={`controller-option ${element.type}`}>
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
