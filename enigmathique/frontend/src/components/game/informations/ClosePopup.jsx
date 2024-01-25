import React from 'react';
import PropTypes from 'prop-types';
import { IoClose } from "react-icons/io5";

const ClosePopup = ({onClick}) => {
    return (
        <button onClick={onClick} className='close-button p-2'>
					<IoClose size={"2em"}/>
		</button>
    )
}

ClosePopup.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default ClosePopup;