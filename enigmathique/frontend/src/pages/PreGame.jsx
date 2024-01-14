import React, {useEffect} from "react";
import WaitingTeams from "../components/preGame/WaitingTeams";
import AcceptedTeams from "../components/preGame/AcceptedTeams";
import LayoutProf from "../layouts/LayoutProf";
import {useCreationGameContext} from "../components/contexts/CreationGame.context";
import CourseService from "../services/course.service";

const PreGame = () => {

	const waitingTeams = [
		{
			name: 'Team 1',
			students: [
				{
					name: 'Tardy',
					firstname: 'Mathéo',

				},
				{
					name: 'Dupuis',
					firstname: 'Aboubacar aqualand népal',
				},
			],
			isValidated: false,
		},
		{
			name: 'Team 2',
			students: [
				{
					name: 'Briand',
					firstname: 'Damien',
				},
				{
					name: 'Dalban',
					firstname: 'Yvain',
				},
			],
			isValidated: false,
		},
		{
			name: 'Team 3',
			students: [
				{
					name: 'Guillevic',
					firstname: 'Mathéo',
				},
				{
					name: 'Wos',
					firstname: 'Sacha',
				},
			],
			isValidated: false,
		},
		{
			name: 'Team 4',
			students: [
				{
					name: 'Pivot',
					firstname: 'Raphaël',
				},
				{
					name: 'Bergery',
					firstname: 'Loic',
				},
			],
			isValidated: false,
		},

	]
	const {setTeams} = useCreationGameContext();


	const loadTeams = () => {
		setTeams(waitingTeams);
	}

	useEffect(() => {
		loadTeams();
	}, []);

	const handleStartGame = () => {
		alert('La partie va commencer');
	}

	return (
		<LayoutProf>
			<main className="flex flex-col gap-4 w-full h-full p-4">
				<h1 className="text-3xl">Validation des équipes</h1>
				<section className="flex flex-row justify-evenly w-full">
					<WaitingTeams/>
					<AcceptedTeams/>
				</section>
				<section className='flex flex-row justify-end p-4 w-full'>
					<button className='p-2 bg-blue-800 rounded-xl text-white' onClick={handleStartGame}>Commencer la partie
					</button>
				</section>
			</main>
		</LayoutProf>
	);
}

export default PreGame;