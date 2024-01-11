import React from "react";
import PropTypes from "prop-types";
import SideBar from "../components/SideBar";

const LayoutProf = (props) => {
	return(
		<div className="flex flex-row h-screen w-screen">
			<SideBar/>
			{props.children}
		</div>
	);
}
LayoutProf.propTypes = {
	children: PropTypes.node.isRequired,
}
export default LayoutProf;