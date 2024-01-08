import React from 'react';
import PropTypes from "prop-types";
import logo from '../assets/img/logo-enigmathique.png';

const Join = (props) => {
	return (
		<>
			<header className="flex flex-row items-center m-5">
				<img
					className="h-24 w-24 rounded-full"
					src={logo}
					alt="Logo Enigmatique"
				/>
				<h1 className="text-3xl text-blue-800">
					Rejoindre la partie de{" "}
					<span className="text-red-600">{props.professorName}</span>
				</h1>
			</header>
			<section>{/*Les divs progressions*/}</section>
		</>
	);
};

Join.propTypes = {
	professorName: PropTypes.string.isRequired,
};

export default Join;