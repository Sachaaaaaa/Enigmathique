import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ClassElem from '../components/dashboard/ClassElem';
import RoomElem from '../components/dashboard/RoomElem';
import GameElem from '../components/dashboard/GameElem';
import EmptyInfoBlock from 'components/dashboard/EmptyInfoBlock';

import { randInt } from 'three/src/math/MathUtils';
import LayoutProf from '../layouts/LayoutProf';
import { FaAngleLeft } from 'react-icons/fa6';
import { FaAngleRight } from 'react-icons/fa6';

import useCourses from '../hooks/useCourses';
import useGames from '../hooks/useGames';
import useRooms from '../hooks/useRooms';

const Dashboard = () => {
	//récupération des classes à l'aide du hook useCourses
	const [courses] = useCourses();
	//récupération des parties à l'aide du hook useGames
	const [games] = useGames();
	//récupération des salles à l'aide du hook useRooms
	const [rooms] = useRooms();

	// Ajout d'un état pour les salles sélectionnées
	const [selectedRooms, setSelectedRooms] = useState([]);
	// Ajout d'un état pour suivre l'indice de la classe actuelle
	const [currentClassIndex, setCurrentClassIndex] = useState(0);

	/**
	 * useEffect pour choisir les salles à afficher au chargement de la page
	 */
	useEffect(() => {
		roomSelection();
	}, [rooms]);

	/**
	 * Selection des salles à afficher
	 */
	const roomSelection = () => {
		if (rooms.length > 2) {
			let max = rooms.length - 1;
			let roomSelect = [];
			let selectedIndex = -1;
			while (roomSelect.length < 2) {
				let index = randInt(0, max);
				if (index !== selectedIndex) {
					roomSelect.push(rooms[index]);
				}
				selectedIndex = index;
			}
			return setSelectedRooms(roomSelect);
		} else if (rooms.length !== 0) {
			setSelectedRooms(rooms);
		} else {
			setSelectedRooms([]);
		}
	};

	/**
	 * Permet d'aller à la classe précédente
	 */
	const prevClass = () => {
		setCurrentClassIndex((prevIndex) =>
			prevIndex > 0 ? prevIndex - 1 : courses.length - 1
		);
	};

	/**
	 * Permet d'aller à la classe suivante
	 */
	const nextClass = () => {
		setCurrentClassIndex((prevIndex) =>
			prevIndex < courses.length - 1 ? prevIndex + 1 : 0
		);
	};

	/**
	 * Pemet d'afficher les parties en fonction de leur nombre dans la db
	 */
	const showGames = () => {
		if (games.length !== 0) {
			// Si il y a plus de 2 parties, on affiche les 2 dernières
			if (games.length >= 2) {
				return games
					.slice(-2)
					.map((game, index) => <GameElem key={index} game={game} />);
				// Si il y a une seule partie, on l'affiche et on propose d'en créer une nouvelle
			} else if (games.length === 1) {
				return (
					<>
						<GameElem key={0} game={games[0]} />
						<EmptyInfoBlock
							title="Nouvelle partie ?"
							link="/create-game"
							sizeClasses="min-h-[200px]"
						/>
					</>
				);
			}
			// Si il n'y a pas de parties, on place deux blocs vides
		} else {
			return (
				<>
					<EmptyInfoBlock
						title="Nouvelle partie ?"
						link="/create-game"
						sizeClasses="min-h-[200px]"
					/>
					<EmptyInfoBlock
						title="Nouvelle partie ?"
						link="/create-game"
						sizeClasses="min-h-[200px]"
					/>
				</>
			);
		}
	};

	return (
		<LayoutProf>
			{/* Conteneur principal du tableau de bord */}
			<main className="flex flex-wrap flex-grow gap-2 justify-between overflow-x-hidden">
				{/* Section de gauche (Parties récentes et salles) */}
				<section className="section w-[45svw]">
					{/* Parties récentes */}
					<article className="flex flex-col">
						<div className="title-container">
							<h2 className="medium-title">Mes parties récentes</h2>
							<Link to="/games" className="show-all-text">
								Voir tout
							</Link>
						</div>

						<div className="info-container">
							{/* Affichage dynamique des parties récentes */}
							{showGames()}
						</div>
					</article>

					{/* Proposition de salles */}
					<article className="flex flex-col pt-7">
						<div className="title-container">
							<h2 className="medium-title">Proposition de salles</h2>
							<Link to="/rooms" className="show-all-text">
								Voir tout
							</Link>
						</div>

						<div className="info-container">
							{/* Affichage dynamique des salles */}
							{selectedRooms.map((room, index) => (
								<RoomElem key={index} room={room}></RoomElem>
							))}
						</div>
					</article>
				</section>

				{/* Section de droite (Classes) */}
				<section className="section w-[35svw]">
					{/* Titre de la section */}
					<div className="title-container primary-font-color">
						<h2 className="medium-title">Mes classes</h2>
						<div>
							{/* Flèches de navigation entre les classes */}
							<button onClick={prevClass}>
								<FaAngleLeft />
							</button>
							<button onClick={nextClass}>
								<FaAngleRight />
							</button>
						</div>
					</div>

					{/* Afficher seulement la classe actuellement sélectionnée */}
					{courses.length !== 0 ? (
						<ClassElem
							key={currentClassIndex}
							classGroup={courses[currentClassIndex]}
						/>
					) : (
						<EmptyInfoBlock
							title="Créer une classe ?"
							link="/class"
							sizeClasses="w-full h-[calc(100%-50px)]"
						/>
					)}
				</section>
			</main>
		</LayoutProf>
	);
};

export default Dashboard;
