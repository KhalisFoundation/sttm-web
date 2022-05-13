import React from 'react';
export const ToggleSwitch = ({ onButtonClick }) => {
  return (
    <div className="toggle-switch">
      <label className="switch">
        <input
          type="checkbox"
          className="switch input"
          onChange={onButtonClick}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
};
