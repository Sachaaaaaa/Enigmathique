import React, {useEffect, useState} from "react";
import LayoutProf from "../layouts/LayoutProf";
import CreationGame1 from "../components/createGame/step1/CreationGame1";
import ProgressBar from "../components/createGame/ProgressBar";
import {initialFormData, useCreationGameContext} from "../components/contexts/CreationGame.context";
import CreationGame2 from "../components/createGame/step2/CreationGame2";
import RoomModel from "../models/room.model";
import Course from "../models/course.model";

const CreateGame = () => {

	const {setCourses, setRooms, formData, setFormData} = useCreationGameContext();



	const [step, setStep] = useState(1); //Étape de création

	const loadRooms = async () => {
		const data =  await RoomModel.getAll();
		setRooms(data);
	}
	const loadCourse = async () => {
		const data =  await Course.getAll();
		setCourses(data);
	}

	useEffect(() => {
		loadCourse();
		loadRooms();
		return () => {
			setFormData(initialFormData); // Réinitialise les données du formulaire
		};
	}, []);





	const stepComponent = {
		1: <CreationGame1 setStep={setStep}/>,
		2: <CreationGame2 setStep={setStep}/>
	}

	return (
		<LayoutProf>
			<main>
				{/* Barre de progression indiquant les étapes de création */}
				<ProgressBar step={step}/>
				{/* Affiche le composant correspondant à l'étape de création */}
				{stepComponent[step]}
			</main>
		</LayoutProf>
	);
}

export default CreateGame;