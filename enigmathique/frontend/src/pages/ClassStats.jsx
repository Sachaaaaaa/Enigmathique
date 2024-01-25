import {useParams} from "react-router-dom";
import LayoutProf from "../layouts/LayoutProf";
import Notification from "../components/Notification";
import React from "react";
import ClassDetails from "../components/class/ClassDetails";

const ClassStats = () =>{
	const {idStudent} = useParams()
	return(
		<LayoutProf>
			<main>
				<Notification/>

				<ClassDetails id={}/>
			</main>
		</LayoutProf>
	)
}
export default ClassStats;