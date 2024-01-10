import {Link} from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";

const RoomElem = (props) => {
    return (
        <article>
            <figure>
                <img src="" alt="img-room"/>
                <figcaption>{props.room.name}</figcaption>
            </figure>
            <article>
                <h3>CHAPITRE</h3>
                <p>{props.room.cat}</p>
            </article>
            <article>
                <h3>DIFFICULTE</h3>
                <p>{props.room.difficulty}</p>
            </article>
            <Link to="">Voir</Link>
        </article>
    )
}

RoomElem.propTypes = {
    room: PropTypes.object.isRequired
}

export default RoomElem;