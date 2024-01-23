import {FaDoorOpen, FaExclamationCircle, FaLightbulb, FaPuzzlePiece} from "react-icons/fa";
import React from "react";
import PropTypes from "prop-types";

function ItemStats ({text, logo, value, color}){
	//TODO faire une map pour mettre les logos dedans
	const Icons = {
		indices : <FaLightbulb className="text-yellow-500 text-3xl" />,
		erreurs : <FaExclamationCircle className="text-red-500 text-3xl" />,
		sallesReussies :<FaDoorOpen className="text-blue-500 text-3xl" />,
		enigmesResolues : <FaPuzzlePiece className="text-green-500 text-3xl" />
	}
	const Colors = {
		yellow : "bg-yellow-100",
		red : "bg-red-100",
		blue :"bg-blue-100",
		green : "bg-green-100"
	}
	return (
		<div className="flex items-center">
			<div className={`p-4 rounded-full ${Colors[color]}`}>
				{Icons[logo]}
			</div>
			<div className="ml-3">
				<p className="text-sm text-gray-500">{text}</p>
				<p className="text-lg">{value}</p>
			</div>
		</div>
	)
}
ItemStats.propTypes = {
	text: PropTypes.string.isRequired,
	logo: PropTypes.string.isRequired,
	value: PropTypes.number.isRequired,
	color: PropTypes.string.isRequired,
}

export default ItemStats;