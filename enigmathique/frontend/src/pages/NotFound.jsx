import React from "react";
import {Link} from "react-router-dom";

const NotFound = () => {
	return (
		<main
			className="home-section background-animation overflow-hidden flex flex-col justify-evenly"
		>
			<h1 className='text-5xl text-white'>Page inexistante</h1>
			<Link
				className="home-form-content text-white uppercase tracking-wide hover:bg-[#5705F5] hover:border-[#5705F5] transition duration-300 "
				to='/'
			>
				<span>Retour à l&apos;accueil</span>
			</Link>
		</main>
	);
};

export default NotFound;