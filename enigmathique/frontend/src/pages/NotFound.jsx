import React from "react";
import {Link} from "react-router-dom";

const NotFound = () => {
	return (
		<main
			className="home-section background-animation overflow-hidden flex flex-col justify-center gap-10"
		>
			<div className="flex flex-col items-center">
				<h1 className="text-[100px] text-white font-bold uppercase">404</h1>
				<h2 className='text-4xl text-white uppercase'>Page non trouvée</h2>
			</div>
			<Link
				className="home-form-content text-white uppercase tracking-wide hover:bg-[#5705F5] hover:border-[#5705F5] transition duration-300 "
				to='/'
			>
				<span>{"Retour à l'accueil"}</span>
			</Link>
		</main>
	);
};

export default NotFound;