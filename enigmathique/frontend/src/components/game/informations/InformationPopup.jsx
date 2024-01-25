import React from 'react';
import PropTypes from 'prop-types';

import { extend } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { IoClose } from "react-icons/io5";
import ClosePopup from './ClosePopup';

extend({ Html });

const InformationPopup = ({ title, image, closePopup, children }) => {

	return (
		<Html>
			<div className="pop-up-container items-center max-w-[600px]">
				<div className='flex justify-between items-start w-full '>
					<h1 className='pop-up-title'>{title} </h1>
					<ClosePopup onClick={closePopup}></ClosePopup>
				</div>

				<div className='p-5 pt-0'>
					{children}
				</div>

				{image && <img src={image} alt="information image" />}

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

