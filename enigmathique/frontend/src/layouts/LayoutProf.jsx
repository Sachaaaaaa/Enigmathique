import React from "react";
import PropTypes from "prop-types";
import SideBar from "../components/SideBar";
import TopBarProf from "../components/TopBarProf";

const LayoutProf = (props) => {
	return(
		<div className="flex h-screen w-screen overflow-y-hidden overflow-x-hidden">
			<SideBar/>
			<div className="flex flex-col flex-grow w-5/6 min-h-screen  overflow-x-auto">
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