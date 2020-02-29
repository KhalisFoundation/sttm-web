import React from 'react';
import PropTypes from 'prop-types';

import { QUICK_SETTINGS } from '../settings';
import { MultiSelect } from '../components/MultiSelect';

export default class ShabadControls extends React.PureComponent {
  static propTypes = {
    translationLanguages: PropTypes.array.isRequired,
    transliterationLanguages: PropTypes.array.isRequired,
    setTranslationLanguages: PropTypes.func.isRequired,
    setTransliterationLanguages: PropTypes.func.isRequired,
  };

  bake_settings = settingsObj => {
    switch (settingsObj.type) {
      case 'multiselect_checkbox':
        return (
          <MultiSelect
            options={settingsObj.options}
            label={settingsObj.label}
            action={settingsObj.action}
            checkedValues={settingsObj.checked}
          />
        )
      case 'icon_toggle':
        return (
          <p>This is a icon setting</p>
        )
    }
  }

  render() {
    const {
      translationLanguages,
      transliterationLanguages,
      setTranslationLanguages,
      setTransliterationLanguages,
    } = this.props;

    const settings = QUICK_SETTINGS(
      translationLanguages,
      transliterationLanguages,
      setTranslationLanguages,
      setTransliterationLanguages,
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
