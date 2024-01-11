import React from 'react';
import {Link} from 'react-router-dom';
import SideBar from '../components/SideBar';
import ClassElem from '../components/dashboard/ClassElem';
import RoomElem from '../components/dashboard/RoomElem';
import GameElem from '../components/dashboard/GameElem';
import {randInt} from "three/src/math/MathUtils";
import LayoutProf from "../layouts/LayoutProf";


const Dashboard = () => {

	const rooms = [
		{
			name: "Room1",
			difficulty: "facile",
			cat: "proba"
		},
		{
			name: "Room2",
			difficulty: "moyen",
			cat: "suit"
		},
		{
			name: "Room3",
			difficulty: "difficile",
			cat: "fonct"
		}
	]

	const games = [
		{
			name: "Entrainement proba",
			date: "17/11/23",
			className: "A",
			winners: ["Julie Lustret", "Monstre Gentil"],
			winRate: 80
		},
		{
			name: "Entrainement fonct",
			date: "11/12/23",
			className: "A",
			winners: ["Lucas Crespin", "Girafe Agréable"],
			winRate: 75
		}
	]

	const classGroups = [
		{
			name: "A",
			nbStudents: 32,
			lastGame: '11/12/23',
			nbGames: 4,
			winRate: 80
		},
		{
			name: "B",
			nbStudents: 31,
			lastGame: "23/10/23",
			nbGames: 3
		}
	]

	return (
		<LayoutProf>
			<main className="flex flex-grow bg-[#F5F7FA] border-2 flex-wrap overflow-y-scroll">
				<div className="flex bg-white w-full h-24 justify-between items-center shadow-sm"> {/*divs à changer si nécessaire*/}
					<h2 className="h-fit font-semibold ml-7">Vue d&apos;ensemble</h2>
					<img className="h-fit mr-5" src={""} alt="user-icon"/>
				</div>
				<div className="flex">
					<div className="flex-grow mr-2 flex-wrap max-w-[1000px]">
						<div className="flex-grow p-5">
							<div className="flex justify-between">
								<h2 className="block font-semibold">Mes Parties</h2>
								<Link to="" className="block font-semibold">Voir tout</Link>
							</div>
							<div className="flex justify-around ">
								{games.map((game, index) => (
									<GameElem key={index} game={game}/>
								))}
							</div>
						</div>
						<div className="flex-grow p-5">
							<div className="flex justify-between">
								<h2 className="block font-semibold">Proposition de salles</h2>
								<Link to="" className="block font-semibold">Voir tout</Link>
							</div>
							<div className="flex justify-around">
								{selectedRooms.map((room,index) => (
									<RoomElem key={index} room={room}></RoomElem>
								))}
							</div>
						</div>
					</div>
					<div className="flex-warp p-5">
						<div className="flex justify-between items-center">
							<h2 className="block font-semibold">Mes Classes</h2>
							<div>
								<button onClick={prevClass}>{'<'}</button>
								<button onClick={nextClass}>{'>'}</button>
							</div>
						</div>
						{/* Afficher seulement la classe actuellement sélectionnée */}
						<div className="max-w-md xl:max-w-lg mx-auto">
							<ClassElem key={currentClassIndex} classGroup={classGroups[currentClassIndex]}/>
						</div>
					</div>
				</div>
			</main>
		</LayoutProf>
	);
};

export default Dashboard;