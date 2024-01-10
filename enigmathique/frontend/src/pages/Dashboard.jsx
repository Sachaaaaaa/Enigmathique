import React from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../components/SideBar';
import ClassElem  from '../components/dashboard/ClassElem';
import RoomElem from '../components/dashboard/RoomElem';
import GameElem from '../components/dashboard/GameElem';


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
			lastGame: "11/12/23",
			nbGames: 4
		},
		{
			name: "B",
			nbStudents: 31,
			lastGame: "23/10/23",
			nbGames: 3
		}
	]

	return (
		<div className="flex font-montserrat">
			<SideBar/>
			<div className="flex flex-grow bg-[#F5F7FA] border-2 flex-wrap">
				<div className="flex bg-white w-full h-fit justify-between"> {/*divs à changer si nécessaire*/}
					<h2>Vue d&apos;ensemble</h2>
					<img src={""} alt="user-icon"/>
				</div>
				<div className="flex w-full">
					<div className="flex-grow mr-2 flex-wrap">
						<div className="flex-grow">
							<div className="flex justify-between">
								<h2 className="block">Mes Parties</h2>
								<Link to="" className="block">Voir tout</Link>
							</div>
							<div className="flex justify-around ">
								{games.map((game, index) => (
									<GameElem key={index} game={game}/>
								))}
							</div>
						</div>
						<div className="flex-grow">
							<div className="flex justify-between">
								<h2 className="block">Proposition de salles</h2>
								<Link to="" className="block">Voir tout</Link>
							</div>
							<div className="flex justify-around">
								{rooms.map((room, index) => (
									<RoomElem key={index} room={room}/>
								))}
							</div>
						</div>
					</div>
					<div className="flex-warp">
						<div className="flex">
							<h2 className="block">Mes Classes</h2>
							<button>{'<'}</button>
							<button>{'>'}</button>
						</div>
						<div>
							{classGroups.map((classGroup, index) => (
								<ClassElem key={index} classGroup={classGroup}/>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;