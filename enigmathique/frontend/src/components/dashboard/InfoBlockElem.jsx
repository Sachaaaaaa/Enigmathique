import React from 'react';
import PropTypes from 'prop-types';

const InfoBlockElem = ({ title, text, additionalClasses = "" }) => {
    const classes = "element-info-block col-span-1 " + additionalClasses;
    return (
        <article className={classes}>
				<h3 className='small-title'>{title}</h3>
				<p className='small-text'>{text}</p>
			</article>
    )
}

InfoBlockElem.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    additionalClasses: PropTypes.string,
};

export default InfoBlockElem;