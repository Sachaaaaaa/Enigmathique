import {useParams} from 'react-router-dom';
import LayoutProf from 'layouts/LayoutProf';
import Notification from 'components/Notification';
import React from 'react';
import ClassDetails from 'components/class/ClassDetails';

/**
 * Page des statistiques d'une classe
 * @returns {Element}
 * @constructor
 */
const ClassStats = () =>{
	const {idClass} = useParams();
	return(
		<LayoutProf title='Historique' >
			<main>
				<Notification/>
				<ClassDetails idClass={parseInt(idClass)}/>
			</main>
		</LayoutProf>
	);
};
export default ClassStats;