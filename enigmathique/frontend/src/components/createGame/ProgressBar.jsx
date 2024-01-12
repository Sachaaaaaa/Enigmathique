import React from "react";
import PropTypes from "prop-types";
import './createGame.css';

const ProgressBar = (props) => {
	return(
		<section className="flex flex-row w-full h-7 p-2 gap-2">
			<div className={props.step >= 1 ? 'progress-bar-on' : 'progress-bar-off'}></div>
            <div className={props.step >= 2 ? 'progress-bar-on' : 'progress-bar-off'}></div>
            <div className={props.step === 3  ? 'progress-bar-on' : 'progress-bar-off'}></div>
		</section>
	);
}
ProgressBar.propTypes = {
	step: PropTypes.number.isRequired,
}
export default ProgressBar;