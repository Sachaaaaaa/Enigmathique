import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const EmptyInfoBlock = ({title, link, sizeClasses = ""}) => {
    return (
        <div className={"info-block self-stretch grow justify-center items-center " + sizeClasses}>
			<Link to={link} className='primary-font-color w-fit text-sm hover:underline'> {title} </Link>
		</div>
    );
    }

EmptyInfoBlock.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    sizeClasses: PropTypes.string,
};

export default EmptyInfoBlock;

