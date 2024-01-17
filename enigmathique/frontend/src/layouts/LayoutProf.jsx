import React from "react";
import PropTypes from "prop-types";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";

const LayoutProf = (props) => {
	return(
		<div className="flex flex-row h-screen w-screen overflow-y-hidden overflow-x-hidden">
			<SideBar/>
			<div className="flex flex-col w-full h-full box-border">
				<TopBar/>
				{props.children}
			</div>
		</div>
	);
}
LayoutProf.propTypes = {
	children: PropTypes.node.isRequired,
}
export default LayoutProf;