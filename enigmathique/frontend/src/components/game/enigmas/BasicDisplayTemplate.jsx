import React from 'react';
import PropTypes from 'prop-types';

const BasicDisplayTemplate = ({title, description, image}) => {
	return (
		<>
			<h1>{title}</h1>
			<p>{description}</p>
			<img src={image} alt='enigma image'/>
		</>
	);
};

export default BasicDisplayTemplate;

BasicDisplayTemplate.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	image: PropTypes.string,
};