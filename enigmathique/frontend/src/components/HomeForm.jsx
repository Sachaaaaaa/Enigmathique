import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from 'assets/img/logo-name-enigmathique-white.png';


/**
 * Formulaire d'entrée du code pour se connecter à une partie
 * @returns {Element}
 * @constructor
 */
const HomeForm = () => {
	const [code, setCode] = useState('');

	const navigate = useNavigate();

	const handleValider = () => {
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
					{/* Flèche pour aller vers le bas */}
					{/* <Link
						className="moving-arrow down"
						activeClass="active"
						to="presentation"
						spy={true}
						smooth={true}
						offset={0}
						duration={500}
					>
						<IoIosArrowDown size={50} />
					</Link> */}
				</form>
			</div>

			{/* <div className="home-section bg-white">
				<a id="presentation"></a>
				<Link
					className="moving-arrow up "
					activeClass="active"
					to="home"
					spy={true}
					smooth={true}
					offset={0}
					duration={500}
				>
					{' '}
					<IoIosArrowUp id="presentation" size={50} />
				</Link>

				<section className="w-[80%] h-[80%]">
					<Carousel
						defaultControlsConfig={{
						pagingDotsContainerClassName : 'flex justify-center items-center gap-3',
					}}
						wrapAround={true}
						renderCenterLeftControls={({ previousSlide }) => (
							<button onClick={previousSlide}>
								<FaChevronLeft/>
							</button>
						)}
						renderCenterRightControls={({ nextSlide }) => (
							<button onClick={nextSlide}>
								<FaChevronRight/>
							</button>
						)}	
					>
						<article className='p-20'>
							<h2>Enigmathique</h2>
							<p>
								Enigmathique est une application qui permet de jouer à des jeux
								d&apos;énigmes en ligne. Elle est destinée aux enseignants de
								mathématiques en seconde qui souhaitent entrainer leurs élèves à
								travers des énigmes permettant de faire mieux comprendre et de
								mieux assimiler les notions de mathématiques du programme de
								seconde
							</p>
						</article>
						<article className='p-20'>
							<h2>Créer une partie</h2>
							<p>
								Pour créer une partie, il suffit de se connecter à l&apos;
								application et de remplir le formulaire de création de partie.
								Il est possible de créer plusieurs parties. Une partie est
								composée de différentes salles dont les élèves vont devoir
								s&apos;échapper en équipes, à la manière d&apos;un escape game.
								Une fois les élèves sortis d&apos;une salle, ou au bout du temps
								imparti, les équipes récupèreront les salles des autres équipes
								et devront à nouveau sortir des salles dans les temps.
							</p>
						</article>
						<article className='p-20'>
							<h2>Tableau de bord</h2>
							<p>
								Le tableau de bord permet de voir les statistiques des équipes
								qui ont joué au jeu, de gérer ses classes, ses élèves et de voir
								les salles disponibles sur l&apos;application. Il est possible
								de voir les statistiques d&apos;une équipe en particulier.
							</p>
						</article>
					</Carousel>
				</section>
			</div> */}
		</>
	);
};
export default HomeForm;
