import React from "react";
import PropTypes from "prop-types";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";

const LayoutProf = (props) => {
	return(
		<div className="flex flex-row h-screen w-screen">
			<SideBar/>
			<div className="flex flex-col w-full h-full">
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