import React from "react";
import PropTypes from "prop-types";

const Student = (props) => {
    return (
        <div>
            <p>{props.firstname}</p>
            <p>{props.name}</p>
        </div>
    );
}
Student.propTypes = {
    name: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
}
export default Student;