import React from 'react';
import PropTypes from 'prop-types';

const FullscreenIcon = props => (
	props.state ? 
	<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	width="1em" height="1em" viewBox="0 0 357 357" enableBackground="new 0 0 357 357;">
	<g><g id="fullscreen-exit">
		<path d="M0,280.5h76.5V357h51V229.5H0V280.5z M76.5,76.5H0v51h127.5V0h-51V76.5z M229.5,357h51v-76.5H357v-51H229.5V357z
		M280.5,76.5V0h-51v127.5H357v-51H280.5z"/>
	</g></g>
	</svg>
	:
  <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	width="1em" height="1em" viewBox="0 0 357 357" enableBackground="new 0 0 357 357;"><g>
	<g id="fullscreen">
		<path d="M51,229.5H0V357h127.5v-51H51V229.5z M0,127.5h51V51h76.5V0H0V127.5z M306,306h-76.5v51H357V229.5h-51V306z M229.5,0v51
			H306v76.5h51V0H229.5z"/>
	</g></g>
</svg>
);

FullscreenIcon.propTypes = {
	state: PropTypes.bool.isRequired,
}

export default FullscreenIcon;
