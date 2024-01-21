import React from "react";
import PropTypes from "prop-types";
import TopBarStudent from "../components/TopBarStudent";
const LayoutStudent = (props) => {
	return (
		<div className="flex flex-col fullscreen-container">
			<TopBarStudent/>
			{props.children}
		</div>
	);
};
LayoutStudent.propTypes = {
	children: PropTypes.node.isRequired,
};
export default LayoutStudent;