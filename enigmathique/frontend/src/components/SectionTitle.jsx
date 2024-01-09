import React from 'react';
import PropTypes from 'prop-types';

function SectionTitle(props) {
	return (
		<h2>{props.content}</h2>
	);
}

SectionTitle.propTypes = {
	content: PropTypes.string.isRequired
};

export default SectionTitle;