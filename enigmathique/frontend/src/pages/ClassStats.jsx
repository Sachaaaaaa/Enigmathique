import {useParams} from 'react-router-dom';
import LayoutProf from '../layouts/LayoutProf';
import Notification from '../components/Notification';
import React from 'react';
import ClassDetails from '../components/class/ClassDetails';

const ClassStats = () =>{
	const {idClass} = useParams();
	return(
		<LayoutProf title='class' id={parseInt(idClass)} >
			<main>
				<Notification/>
				<ClassDetails idClass={parseInt(idClass)}/>
			</main>
		</LayoutProf>
	);
};
export default ClassStats;