import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const EmptyInfoContainer = ({title, link, minHeight}) => {
    return (
        <div className='empty-info-container'>
			<Link to={link} className={`primary-font-color w-fit text-sm hover:underline min-h-[${minHeight}] `}> {title} </Link>
		</div>
    );
    }

EmptyInfoContainer.propTypes = {
    title: PropTypes.string,
    link: PropTypes.string,
    minHeight: PropTypes.string,
};

export default EmptyInfoContainer;

