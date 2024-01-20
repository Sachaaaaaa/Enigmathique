import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const EmptyInfoBloc = ({title, link, minHeight}) => {
    return (
        <div className='empty-info-block'>
			<Link to={link} className={`primary-font-color w-fit text-sm hover:underline min-h-[${minHeight}] `}> {title} </Link>
		</div>
    );
    }

EmptyInfoBloc.propTypes = {
    title: PropTypes.string,
    link: PropTypes.string,
    minHeight: PropTypes.string,
};

export default EmptyInfoBloc;

