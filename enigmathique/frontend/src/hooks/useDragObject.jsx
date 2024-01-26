import { useState, useRef } from 'react';

const useDragObjet = () => {
	const [isDragging, setDragging] = useState(false);
	const [position, setPosition] = useState([0, 0, 0]);
	const initialMousePosition = useRef([0, 0]);

	const handlePointerDown = (event) => {
		setDragging(true);
		initialMousePosition.current = [event.clientX, event.clientY];
	};

	const handlePointerMove = (event) => {
		if (!isDragging) return;

		const deltaX = event.clientX - initialMousePosition.current[0];
		const deltaY = event.clientY - initialMousePosition.current[1];

		setPosition((prevPosition) => [
			prevPosition[0] + deltaX / 100, // Adjust the sensitivity as needed
			prevPosition[1] - deltaY / 100, // Invert deltaY based on your coordinate system
			prevPosition[2],
		]);

		initialMousePosition.current = [event.clientX, event.clientY];
	};

	const handlePointerUp = () => {
		setDragging(false);
	};

	return {
		isDragging,
		position,
		handlePointerDown,
		handlePointerMove,
		handlePointerUp,
	};
};

export default useDragObjet;
