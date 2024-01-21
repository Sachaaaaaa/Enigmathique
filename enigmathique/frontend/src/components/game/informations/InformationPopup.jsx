import React from 'react';
import PropTypes from 'prop-types';

import { extend } from '@react-three/fiber';
import { Html } from '@react-three/drei';

import { IoIosCloseCircle } from 'react-icons/io';

extend({ Html });

const InformationPopup = ({ title, information, image, closePopup }) => {
	return (
		<Html>
			<div className="absolute translate-y-[-70%] top-0 left-1/2 p-4 bg-white rounded-md flex flex-col items-center" style={{ width: '700px' }}>
				<h1> <strong>{title}</strong> </h1>
				<p>{information}</p>
				{image && <img src={image} alt="information image"/>}
				<button onClick={closePopup}
					style={{
						display: 'flex',
						justifyContent: 'space-around',
						alignItems: 'center',
						background: '#ff6666',
						padding: '8px',
						borderRadius: '8px',
						width: '9vw',
						marginBottom: '10px',
					}}>
					<IoIosCloseCircle /> Fermer
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
