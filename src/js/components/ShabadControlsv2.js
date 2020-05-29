import React from 'react';
import PropTypes from 'prop-types';

import { VISRAAM_CONSTANTS } from '../constants';
import { clearVisraamClass } from '../util';
import { QUICK_SETTINGS, ADVANCED_SETTINGS } from '../settings';
import { MultiSelect } from '../components/MultiSelect';
import { AutoScrollControl } from '../components/AutoScrollControl';

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
    toggleDarkMode: PropTypes.func.isRequired,
    toggleAutoScrollMode: PropTypes.func.isRequired,
    setVisraamSource: PropTypes.func.isRequired,
    setVisraamStyle: PropTypes.func.isRequired,
    changeFont: PropTypes.func.isRequired,
    toggleAdvancedOptions: PropTypes.func.isRequired,

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
    darkMode: PropTypes.bool.isRequired,
    autoScrollMode: PropTypes.bool.isRequired,
    fontFamily: PropTypes.string.isRequired,
    showAdvancedOptions: PropTypes.bool.isRequired,
  };

  bake_settings = settingsObj => {
    let iconsMarkup, options, Icon;
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
      case 'dropdown':
        options = Object.keys(settingsObj.options).map(key =>
          <option key={key} value={key}>{settingsObj.options[key]}</option>
        )
        return (
          <>
            <p className="toggle-text">{settingsObj.label}</p>
            <select value={settingsObj.value} onChange={(e) => {
              settingsObj.action(e.currentTarget.value);
            }}> {options} </select>
          </>
        )
      case 'icon-text-toggle':
        Icon = settingsObj.icon;
        return (
          <>
            <Icon value={settingsObj.value} onClick={settingsObj.action} />
            <span onClick={settingsObj.action} className={`icon-label ${settingsObj.value ? 'enabled' : ''}`}>{settingsObj.label}</span>
          </>
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
    const isAutoScrollMode = this.props.autoScrollMode;
    const settings = QUICK_SETTINGS(this.props);
    const advanced = ADVANCED_SETTINGS(this.props);

    const quickSettingsPanel = (
      <>
        {settings.map((element, i) => (
          <div key={`settings-${i}`} className={`qs-option controller-option ${element.type}`}>
            {this.bake_settings(element)}
          </div>
        ))}
      </>
    );

    return (
      <React.Fragment>
        <div id="shabad-controllers">
          <div className="quick-settings">
            {quickSettingsPanel}
            {isAutoScrollMode && <AutoScrollControl />}
          </div>
          {this.props.showAdvancedOptions && (
            <div className="advanced-options">
              {advanced.map((element, i) => (
                <div key={`settings-${i}`} className={`controller-option ${element.type}`}>
                  {this.bake_settings(element)}
                </div>
              ))}
              {quickSettingsPanel}
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}
