import React from 'react';
import PropTypes from 'prop-types';

import { extend } from '@react-three/fiber';
import { Html } from '@react-three/drei';

import { IoClose } from "react-icons/io5";

extend({ Html });

const InformationPopup = ({ title, image, closePopup, children }) => {

	return (
		<Html>
			<div className="centered-pop-up flex flex-col items-center w-max max-w-[600px] primary-font-color bg-white shadow-md rounded-md">
				<div className='flex justify-between items-start w-full '>
				<h1 className='font-semibold text-lg text-center p-5'>{title} </h1>
				<button onClick={closePopup} className='close-button p-2'>
					<IoClose size={"2em"}/>
				</button>
				</div>
				
				<div className='p-5 pt-0'>
				{children}
				</div>
				
				{image && <img src={image} alt="information image"/>}

			</div>
		</Html>
	);
};

InformationPopup.propTypes = {
	title: PropTypes.string.isRequired,
	image: PropTypes.string,
	closePopup: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
};

export default InformationPopup;

