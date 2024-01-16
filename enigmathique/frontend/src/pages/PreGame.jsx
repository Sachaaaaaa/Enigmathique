import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import LayoutProf from "../layouts/LayoutProf";
import {usePreGameContext} from "../components/contexts/PreGame.context";
import TeamContainer from "../components/preGame/TeamContainer";


const PreGame = () => {

	const waitingTeams = [
		{
			id: 1,
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
			id: 2,
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
			id: 3,
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
			id: 4,
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
	const {setTeams} = usePreGameContext([]);
	const {code} = useParams();


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
				<main className="h-5/6 w-full bg-[#f5f7fa] p-4">
					<section className='flex flex-col h-[96%] w-full gap-4'>
						<section className='h-[10%] flex flex-row justify-evenly items-center rounded-full shadow bg-white'>
							<h1 className='font-bold'>Code de connexion : {code}</h1>
						</section>
						<section className="h-[80%] flex flex-row justify-evenly items-center">
							<TeamContainer accepted={false}/>
							<TeamContainer accepted={true}/>
						</section>
						<section className='flex flex-row justify-end items-center h-[10%] w-full'>
							<button className='btn-validate' onClick={handleStartGame}>Commencer la partie
							</button>
						</section>
					</section>
				</main>
			</LayoutProf>
	);
}

export default PreGame;