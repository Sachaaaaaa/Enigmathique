import React from "react";
import PropTypes from "prop-types";
import TopBarStudent from "../components/TopBarStudent";
const LayoutStudent = (props) => {
	return (
		<div className="flex flex-col h-screen w-screen overflow-y-hidden overflow-x-hidden">
			<TopBarStudent/>
			{props.children}
		</div>
	);
};
LayoutStudent.propTypes = {
	children: PropTypes.node.isRequired,
};
export default LayoutStudent;