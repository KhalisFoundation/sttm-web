import React from 'react';
import PropTypes from 'prop-types';

const props = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  value: PropTypes.number,
};

export const FontPlus = props => (
  <span onClick={props.onClick}
    className={`custom-fa ${props.className}`}>
    <span style={{ 'fontSize': '18px' }}>ਅ</span>+
  </span>
);
FontPlus.propTypes = props;

export const CurrentFont = props => (
  <select
    className={`custom-fa ${props.className}`}
    style={{ 'width': 'inherit', 'marginBottom': '0' }}
    onChange={(e) => {
      const updatedSize = e.currentTarget.value;
      props.onClick(updatedSize)
    }
    }
    value={props.value}>
    <option>12</option>
    <option>16</option>
    <option>20</option>
    <option>24</option>
    <option>28</option>
    <option>32</option>
  </select>
)
CurrentFont.propTypes = props;

export const FontMinus = props => (
  <span onClick={props.onClick}
    className={`custom-fa ${props.className}`}>
    <span style={{ 'fontSize': '14px' }}>ਅ</span>-
  </span>
)
FontMinus.propTypes = props;

export const AlignCenterIcon = props => (
  <span onClick={props.onClick} className={`custom-fa ${props.value ? 'enabled' : ''}`}>
    <svg id="Layer" enableBackground="new 0 0 64 64" height="25" viewBox="0 0 64 64" width="25" xmlns="http://www.w3.org/2000/svg"><path d="m54 8h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z" /><path d="m54 52h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z" /><path d="m46 23c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2z" /><path d="m54 30h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z" /><path d="m46 45c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2z" /></svg>
  </span>
);
AlignCenterIcon.propTypes = {
  ...props,
  value: PropTypes.bool,
};

export const AlignLeftIcon = props => (
  <span onClick={props.onClick} className={`custom-fa ${props.value ? 'enabled' : ''}`}>
    <svg id="Layer" enableBackground="new 0 0 64 64" height="25" viewBox="0 0 64 64" width="25" xmlns="http://www.w3.org/2000/svg"><path d="m54 8h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z" /><path d="m54 52h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z" /><path d="m10 23h28c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2z" /><path d="m54 30h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z" /><path d="m10 45h28c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2z" /></svg>
  </span>
);
AlignLeftIcon.propTypes = {
  ...props,
  value: PropTypes.bool,
};

export const LarivaarIcon = props => (
  <span onClick={props.onClick} className={`custom-fa ${props.value ? 'enabled' : ''}`}>ੳਅ</span>
);
LarivaarIcon.propTypes = {
  ...props,
  value: PropTypes.bool,
};

export const LarivaarAssistIcon = props => (
  <span onClick={props.onClick} className={`custom-fa  custom-fa-assist ${props.value ? 'enabled' : ''}`}>ੳ</span>
);
LarivaarAssistIcon.propTypes = {
  ...props,
  value: PropTypes.bool,
};

export const SplitViewIcon = props => (
  <span onClick={props.onClick} className={`custom-fa ${props.value ? 'enabled' : ''}`}>
    <svg version="1.1" id="Capa_1"
    viewBox="0 0 512 512" enableBackground="new 0 0 512 512;" width="25" height="25"
    style={{'transform': 'rotate(90deg)'}}>
    <g><g>
      <path d="M506.24,243.712l-96-80c-4.768-3.968-11.424-4.8-17.024-2.176C387.584,164.128,384,169.792,384,176v64h-64V16
			c0-8.832-7.168-16-16-16c-8.832,0-16,7.168-16,16v480c0,8.832,7.168,16,16,16c8.832,0,16-7.168,16-16V272h64v64
			c0,6.208,3.584,11.84,9.216,14.496c2.144,0.992,4.48,1.504,6.784,1.504c3.68,0,7.328-1.248,10.24-3.712l96-80
			c3.68-3.04,5.76-7.552,5.76-12.288C512,251.264,509.92,246.752,506.24,243.712z"/>
      </g>
    </g>
    <g>
      <g>
        <path d="M208,0c-8.832,0-16,7.168-16,16v224h-64v-64c0-6.208-3.584-11.872-9.216-14.496c-5.568-2.592-12.256-1.76-17.024,2.208
			l-96,80C2.112,246.752,0,251.264,0,256c0,4.736,2.112,9.248,5.76,12.288l96,80c2.912,2.464,6.56,3.712,10.24,3.712
			c2.304,0,4.64-0.512,6.784-1.504C124.416,347.84,128,342.208,128,336v-64h64v224c0,8.832,7.168,16,16,16c8.832,0,16-7.168,16-16
			V16C224,7.168,216.832,0,208,0z"/>
    </g></g>
    </svg>
  </span>
);
SplitViewIcon.propTypes = {
  ...props,
  value: PropTypes.bool,
};
