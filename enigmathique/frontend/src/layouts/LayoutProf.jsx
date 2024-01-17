import React from "react";
import PropTypes from "prop-types";
import SideBar from "../components/SideBar";
import TopBarProf from "../components/TopBarProf";

const LayoutProf = (props) => {
	return(
		<div className="flex flex-row h-screen w-screen overflow-y-hidden overflow-x-hidden">
			<SideBar/>
			<div className="flex flex-col w-full h-full box-border">
				<TopBarProf/>
				{props.children}
			</div>
		</div>
	);
}
LayoutProf.propTypes = {
	children: PropTypes.node.isRequired,
}
export default LayoutProf;