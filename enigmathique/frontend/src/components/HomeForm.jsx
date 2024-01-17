import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { Link, animateScroll as scroll } from "react-scroll";
import logo from '../assets/img/logo-name-nobg.png';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
const HomeForm = () => {
	const [code, setCode] = useState('');

	const navigate = useNavigate();

	const handleValider = () => {
		//TODO: vérifier que le code est valide
		navigate(`/join/${code}`);
	};

	return (
		<>
		<div id="home" className="flex justify-center items-center min-h-[450px] h-screen background-animation">
							{/* from-[#343C6A] via-[#0A06F4] to-[#0599F5] */}
							{/* bg-gradient-to-r from-[#EE7752]
						via-[#E73C7E] to-[#23A6D5] animation */}
			<div className="relative w-full h-full max-w-md flex flex-col justify-center items-center">
			<img src={logo} alt='logo' className='pb-10'/>
				<div className="mb-4 w-fit h-fit">
					{/* <label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="username"
					></label> */}
					<input
						className="primary-font-color appearance-none shadow-md border-2 border-gray-300 rounded w-[280px] py-2 px-3 font-bold text-center focus:outline-none focus:border-[#343C6A] "
						type="text"
						id="code"
						name="code"
						value={code}
						onChange={(e) => setCode(e.target.value)}
						placeholder="Code PIN du jeu"
						required
					/>
				</div>
				<div className="flex items-center justify-between">
					<button
						className=" shadow-md w-[280px] border-2 border-white rounded
						text-white font-semibold uppercase tracking-wide py-2 px-4 hover:bg-[#5705F5] hover:border-[#5705F5] transition duration-500 "
						type="submit"
						onClick={handleValider}
					>
						<span>Valider</span>
					</button>
				</div>
				<Link
				className='absolute bottom-0 moving-arrow '
				activeClass="active"
				to="presentation"
				spy={true}
				smooth={true}
				offset={0}
				duration={500}
			> <IoIosArrowDown size={50} className='text-white hover:text-[#8293ff]' /></Link>
			</div>


		</div>

		<div className='relative h-screen bg-white flex justify-center items-center'> 
		<a id="presentation"></a>
		<Link
				className='absolute top-0 moving-arrow '
				activeClass="active"
				to="home"
				spy={true}
				smooth={true}
				offset={0}
				duration={500}
			> <IoIosArrowUp id="presentation" size={50} className='text-[#0A06F4] hover:text-[#8293ff]' /></Link>
		<section className='w-[80%] h-[80%]'>
			<article className='w-full h-full p-4 grid grid-cols-2 grid-row-3 gap-4'>
				<div className='cols-span-1 row-span-3 border'></div>
				<h2 className='cols-span-1 row-span-1 border'>Enigmathique</h2>
				<p className='cols-span-1 row-span-2 border'>
					Enigmathique est une application qui permet de créer des jeux {"d'énigmes"}.
					Elle est destinée aux enseignants qui souhaitent créer des jeux
					{"d'énigmes"} pour leurs élèves.
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
