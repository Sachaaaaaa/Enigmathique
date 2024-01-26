import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

import { extend } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { IoClose } from "react-icons/io5";
import Carousel, { PagingDots } from 'nuka-carousel';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ClosePopup from './ClosePopup';

extend({ Html });

const InfoPopupSlider = ({ title, images, closePopup, children }) => {

	const [currentImage, setCurrentImage] = useState(0);

	const handleImageChange = (index) => {
		setCurrentImage(index);
	};

	return (
		<Html>
			<div className="pop-up-container items-center max-w-[400px]">
				<div className="flex justify-between items-start w-full">
					<h1 className="pop-up-title">{title} </h1>
					<ClosePopup onClick={closePopup} />
				</div>

				<div className="p-5 pt-0">
					{children}
				</div>

				{images && images.length > 0 ? (
					<Carousel
						defaultControlsConfig={{
							pagingDotsContainerClassName : 'flex justify-center items-center gap-3',
						}}
						wrapAround={true}
						renderCenterLeftControls={({ previousSlide }) => (
							<button onClick={previousSlide}>
								<FaChevronLeft/>
							</button>
						)}
						renderCenterRightControls={({ nextSlide }) => (
							<button onClick={nextSlide}>
								<FaChevronRight/>
							</button>
						)}	
					>
						{images.map((image, index) => (
							<img className='px-5' key={index} src={image} alt={`Image ${index + 1}`} />
						))}
					</Carousel>
				) : (
					<p>No images available</p>
				)}
			</div>
		</Html>
	);
};

InfoPopupSlider.propTypes = {
	title: PropTypes.string.isRequired,
	images: PropTypes.arrayOf(PropTypes.string),
	closePopup: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
};

export default InfoPopupSlider;

