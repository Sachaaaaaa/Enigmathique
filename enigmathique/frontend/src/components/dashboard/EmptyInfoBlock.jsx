import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const EmptyInfoBlock = ({title, link, minHeight}) => {
    const minHeightClass = "min-h-[" + minHeight + "]";
    return (
        <div className={`info-block self-stretch grow justify-center items-center ${minHeightClass}`}>
			<Link to={link} className='primary-font-color w-fit text-sm hover:underline'> {title} </Link>
		</div>
    );
    }

EmptyInfoBlock.propTypes = {
    title: PropTypes.string,
    link: PropTypes.string,
    minHeight: PropTypes.string,
};

export default EmptyInfoBlock;

