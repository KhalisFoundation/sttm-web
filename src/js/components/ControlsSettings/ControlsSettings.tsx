import React from 'react';
import Times from '../Icons/Times';


const ControlsSettings = (props) => {

  const handleListItemClick = () => {
    console.log('list item clicked');
  }

   return (
      <>
        <div className="settings-panel">
          <div className="settings-header">
            <p className="settings-header-text">Settings</p>
            <a className="settings-close"><Times /></a>
          </div>
          <div className="settings-items">
            <div className="settings-item" onClick={handleListItemClick}>
              <span className="settings-action-icon"><Times /></span>
              <span>Night Mode</span>
            </div>
            <div className="settings-item" onClick={handleListItemClick}>
              <span className="settings-action-icon"><Times /></span>
              <span>Reading [Akhand Path]</span>
            </div>
            <div className="settings-item" onClick={handleListItemClick}>
              {/* <span className="settings-action-icon"><Times /></span>
              <details>
                <summary>{"granthName"}</summary>
                <ul>
                  {/* {indices.map(({ name }) => (
                    <li key={name}>
                      <a href={`#${sanitizeHash(granthName, name)}`}>
                        {name}
                      </a>
                    </li>
                  ))} * /}
                </ul>
              </details> */}
            </div>
            <div className="settings-item" onClick={handleListItemClick}>
              <span className="settings-action-icon"><Times /></span>
              <span>Larivaar</span>
            </div>
          </div>
        </div>
      </>
    );
}

export default ControlsSettings;