import React, {useState} from 'react';
import SideBar from '../components/SideBar';
import WaitingTeams from '../components/preGame/WaitingTeams';
import AcceptedTeams from '../components/preGame/AcceptedTeams';
import TeamContext from '../components/creation3/Teams.context';
import LayoutProf from "../layouts/LayoutProf";

const CreationGame3 = () => {

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
	const [teams, setTeams] = useState(waitingTeams);
	const handleStartGame = () => {
		alert('La partie va commencer');
	}

	return (
		<LayoutProf>
			<TeamContext.Provider value={{teams, setTeams}}>
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
			</TeamContext.Provider>
		</LayoutProf>
	);
};


export default CreationGame3;