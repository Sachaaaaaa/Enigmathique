import React from "react";
import { useState, useRef } from "react";

// Créer un hook pour les objets interactifs qui isolent les fonctions de gestion des événements
const useInteractiveObject = () => {
	const [hovered, setHovered] = useState(false);
	const [clicked, setClicked] = useState(false);
	const mesh = useRef();

	const handlePointerOver = () => {
		setHovered(true);
	};

	const handlePointerOut = () => {
		setHovered(false);
	};

	const handleClick = () => {
		setClicked(!clicked);
	};

	return {
		mesh,
		hovered,
		clicked,
		handlePointerOver,
		handlePointerOut,
		handleClick,
	};
};

export default useInteractiveObject;