import React from 'react';
import PropTypes from 'prop-types';

const InfoCGUElem = ({title, children}) => {
	return (
		<article className='m-4 pl-[172px] pr-[172px]'>
			<h3 className='medium-title'>{title}</h3>
			<p className='small-text'>{children}</p>
		</article>
	)
}

InfoCGUElem.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.string
}

export default InfoCGUElem;