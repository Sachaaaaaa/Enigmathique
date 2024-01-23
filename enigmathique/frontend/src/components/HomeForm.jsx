import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { Link, animateScroll as scroll } from "react-scroll";
import logo from '../assets/img/logo-name-nobg.png';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import GameModel from '../models/game.model';
const HomeForm = () => {
	const [code, setCode] = useState('');

	const navigate = useNavigate();

	const handleValider = () => {
		//TODO: vérifier que le code est valide
		const rep = GameModel.getAll() ;
		console.log("hehe");
		console.log(rep);
		navigate(`/join/${code}`);
	};

	return (
		<>
		{/* Ecran entier */}
		<div id="home" className="home-section background-animation overflow-hidden">

			{/* Formulaire pour rejoindre une partie */}
			<form className="relative flex flex-col justify-center items-center w-full h-full max-w-md "
			onSubmit={handleValider}>
				{/* Logo enigmathique */}
				<img src={logo} alt='logo' className='pb-10 z-0'/>
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
				{/* Flèche pour aller vers le bas */}
				<Link className='moving-arrow down' activeClass="active" to="presentation"
					spy={true}
					smooth={true}
					offset={0}
					duration={500}> 
				<IoIosArrowDown size={50} /></Link>
			</form>
		</div>

		<div className='home-section bg-white'> 
		<a id="presentation"></a>
		<Link
				className='moving-arrow up '
				activeClass="active"
				to="home"
				spy={true}
				smooth={true}
				offset={0}
				duration={500}
			> <IoIosArrowUp id="presentation" size={50}/></Link>
			
		<section className='w-[80%] h-[80%]'>
			<article className='w-full h-full p-4 grid grid-cols-2 grid-row-3 gap-4'>
				<div className='cols-span-1 row-span-3 border'></div>
				<h2 className='cols-span-1 row-span-1 border'>Enigmathique</h2>
				<p className='cols-span-1 row-span-2 border'>
					Enigmathique est une application qui permet de jouer à des jeux {"d'énigmes"} en ligne.
					Elle est destinée aux enseignants de mathématiques en seconde qui souhaitent entrainer leurs élèves
					à travers des énigmes permettant de faire mieux comprendre et de mieux assimiler les notions de
					mathématiques du programme de seconde
				</p>
			</article>
			{/* <article>
				<h2>Créer un jeu</h2>
				<p>
					Pour créer un jeu, il suffit de se connecter à {"l'application"} et de
					remplir le formulaire de création de jeu. Il est possible de créer
					plusieurs jeux.
				</p>
			</article>
			<article>
				<h2> Tableau de bord</h2>
				<p>
					Le tableau de bord permet de voir les statistiques des équipes qui ont
					joué au jeu. Il est possible de voir les statistiques {"d'une"} équipe en
					particulier.
				</p>
			</article> */}
		</section>
		</div>

		</>
	);
};
export default HomeForm;
