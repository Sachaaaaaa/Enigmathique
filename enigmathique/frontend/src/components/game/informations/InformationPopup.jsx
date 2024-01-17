import React from 'react';
import PropTypes from 'prop-types';

import { extend } from '@react-three/fiber';
import { Html } from '@react-three/drei';

extend({ Html });

const InformationPopup = ({ title, information, image, closePopup }) => {
	return (
		<Html>
			<div className="absolute translate-x-[-50%] top-1/2 left-1/2 p-4 bg-white rounded-md flex flex-col items-center" style={{ width: '500px' }}>
				<h1> <strong>{title}</strong> </h1>
				<p>{information}</p>
				{image && <img src={image} alt="information image" />}
				<button onClick={closePopup} className="mt-3"
					style={{
						background: '#ff6666',
						padding: '8px',
						borderRadius: '8px',
						width: '12vw'
					}}>
					Fermer
				</button>
			</div>
		</Html>
	);
};

export default InformationPopup;

InformationPopup.propTypes = {
	title: PropTypes.string.isRequired,
	information: PropTypes.string.isRequired,
	image: PropTypes.string,
	closePopup: PropTypes.func.isRequired,
};
