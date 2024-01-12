import React from "react";
import SideBar from "../components/SideBar";
import ListStudents from "../components/ListStudents";
import {useParams} from "react-router-dom";
import LayoutProf from "../layouts/LayoutProf";

function Class() {
	const {id} = useParams()
	return (
		<LayoutProf>
			<main>
				<ListStudents id={parseInt(id)}/>
			</main>
		</LayoutProf>
	);
}
export default Class;