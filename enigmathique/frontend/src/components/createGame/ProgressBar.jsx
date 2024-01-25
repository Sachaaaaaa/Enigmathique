import React from "react";
import PropTypes from "prop-types";

const ProgressBar = (props) => {
	return(
		<section className="flex flex-row flex-grow gap-5 w-full px-5 py-2 justify-between">
			<div className={props.step >= 1 ? 'progress-bar-on' : 'progress-bar-off'}></div>
            <div className={props.step === 2 ? 'progress-bar-on' : 'progress-bar-off'}></div>
		</section>
	);
}
ProgressBar.propTypes = {
	step: PropTypes.number.isRequired,
}
export default ProgressBar;