import React, {useEffect, useState} from "react";
import LayoutProf from "../layouts/LayoutProf";
import CreationGame1 from "../components/createGame/1/CreationGame1";
import ProgressBar from "../components/createGame/ProgressBar";
import {initialFormData, useCreationGameContext} from "../components/contexts/CreationGame.context";
import CreationGame2 from "../components/createGame/2/CreationGame2";
import CourseService from "../services/course.service";
import RoomService from "../services/room.service";
import AuthService from "../services/auth.service";

const CreateGame = () => {

	const {setCourses, setRooms, formData, setFormData} = useCreationGameContext();



	const [step, setStep] = useState(1); //Étape de création

	useEffect(() => {

		AuthService.login("admin@admin.com", "admin").then((response) => {
			CourseService.getAll().then((response) => {
				setCourses(response);
			}).catch((error) => {
				console.log(error);
			});
			RoomService.getAllRooms().then((response) => {
				setRooms(response);
			}).catch((error) => {
				console.log(error);
			});
		}).catch((error) => {
			console.log(error);
		});
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
			<main className="h-5/6 w-full bg-[#f5f7fa] p-4">
				<ProgressBar step={step}/>
				{stepComponent[step]}
			</main>
		</LayoutProf>
	);
}

export default CreateGame;