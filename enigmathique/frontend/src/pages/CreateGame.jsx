import React, {useEffect, useState} from 'react';
import LayoutProf from 'layouts/LayoutProf';
import CreationGame1 from 'components/createGame/step1/CreationGame1';
import ProgressBar from 'components/createGame/ProgressBar';
import {initialFormData, useCreationGameContext} from 'components/contexts/CreationGame.context';
import CreationGame2 from 'components/createGame/step2/CreationGame2';
import RoomModel from 'models/room.model';
import CourseModel from 'models/course.model';
import Notification from 'components/Notification';

/**
 * Page de création d'une partie
 * @returns {Element}
 * @constructor
 */
const CreateGame = () => {

	const {setCourses, setRooms, setFormData} = useCreationGameContext();

	const [step, setStep] = useState(1); //Étape de création
	/**
	 * Charge les salles d'escape game
	 * @returns {Promise<void>}
	 */
	const loadRooms = async () => {
		const data =  await RoomModel.getAll();
		setRooms(data);
	};
	/**
	 * Charge les classes
	 * @returns {Promise<void>}
	 */
	const loadCourse = async () => {
		const data =  await CourseModel.getAll();
		setCourses(data);
	};
	/**
	 * Charge les classes et les salles d'escape game au chargement de la page
	 *
	 */
	useEffect(() => {
		loadCourse();
		loadRooms();
		return () => {
			setFormData(initialFormData); // Réinitialise les données du formulaire
		};
	}, []);

	/**
	 * Composant correspondant à l'étape de création
	 * @type {{1: React.JSX.Element, 2: React.JSX.Element}}
	 */
	const stepComponent = {
		1: <CreationGame1 setStep={setStep}/>,
		2: <CreationGame2 setStep={setStep}/>
	};

	return (
		<LayoutProf title="Nouvelle partie">
			<main>
				<Notification/>
				{/* Barre de progression indiquant les étapes de création */}
				<ProgressBar step={step}/>
				{/* Affiche le composant correspondant à l'étape de création */}
				{stepComponent[step]}
			</main>
		</LayoutProf>
	);
};

export default CreateGame;