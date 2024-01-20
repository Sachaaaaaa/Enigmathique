import React from "react";
import PropTypes from "prop-types";
import SideBar from "../components/SideBar";
import TopBarProf from "../components/TopBarProf";
import {Toaster} from "react-hot-toast";

const LayoutProf = (props) => {
	return(
		// Ecran entier
		<div className="flex fullscreen-container">

			{/* Menu latéral (width 1/6) */}
			<SideBar/>

			{/* TopBar et contenu (width 5/6) */}
			<div className="flex flex-col flex-grow w-5/6 min-h-screen overflow-x-auto">
				<TopBarProf/>
				{props.children}
				<Toaster
					containerStyle={{
						top: 100,
						left: 20,
						bottom: 20,
						right: 20,
					}}
				/>
			</div>
		</div>
	);
}
LayoutProf.propTypes = {
	children: PropTypes.node.isRequired,
}
export default LayoutProf;