import {FaRegCircle, FaStar} from "react-icons/fa";
import React from "react";

const getPositionIcon = (index) => {
	switch (index) {
		case 0:
			return <FaStar className="text-3xl text-yellow-400" />;
		case 1:
			return <FaStar className="text-3xl text-gray-500" />;
		case 2:
			return <FaStar className="text-3xl text-orange-600" />;
		default:
			return <FaRegCircle className="text-4xl text-blue-300 stroke-2" />;
	}
};

const getPositionStyle = (index) => {
	const positionStyles = [
		'text-white',
		'text-white',
		'text-white',
	];
	return index < 3 ? positionStyles[index] : 'text-black';
};
export {getPositionIcon, getPositionStyle};