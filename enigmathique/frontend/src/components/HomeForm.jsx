import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, animateScroll as scroll } from 'react-scroll';
import logo from '../assets/img/logo-name-enigmathique-white.png';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import GameModel from '../models/game.model';
import Carousel from 'nuka-carousel';
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";
const HomeForm = () => {
	const [code, setCode] = useState('');

	const navigate = useNavigate();

	const handleValider = () => {
		//TODO: vérifier que le code est valide
		const rep = GameModel.getAll();
		navigate(`/join/${code}`);
	};

	return (
		<>
			{/* Ecran entier */}
			<div
				id="home"
				className="home-section background-animation overflow-hidden"
			>
				{/* Formulaire pour rejoindre une partie */}
				<form
					className="relative flex flex-col justify-center items-center w-full h-full max-w-md "
					onSubmit={handleValider}
				>
					{/* Logo enigmathique */}
					<img src={logo} alt="logo" className="pb-10 z-0" />
					{/* Textfield pour le code */}
					<input
						className="home-form-content primary-font-color appearance-none focus:border-[#5705F5] focus:outline-none"
						type="text"
						id="code"
						name="code"
						value={code}
						onChange={(e) => setCode(e.target.value)}
						placeholder="Code PIN du jeu"
						required
					/>
					{/* Bouton pour valider le code et rejoindre*/}
					<div className="flex items-center justify-between">
						<button
							className="home-form-content text-white uppercase tracking-wide hover:bg-[#5705F5] hover:border-[#5705F5] transition duration-300 "
							type="submit"
						>
							<span>Rejoindre</span>
						</button>
					</div>
				</form>
			</div>
		</>
	);
};
export default HomeForm;
