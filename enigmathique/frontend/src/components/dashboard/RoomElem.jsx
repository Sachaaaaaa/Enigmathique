// RoomElem.jsx:
import { Link } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';

const RoomElem = (props) => {
    return (
        <article className="bg-white m-5 border-2 rounded-3xl shadow-md overflow-hidden w-1/3 flex flex-col">
            <figure className="relative h-40 bg-blue-500 rounded-t-3xl"
                    style={{ backgroundImage: `url(${props.room.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <figcaption className="absolute text-white font-bold bottom-2 left-4">{props.room.name}</figcaption>
            </figure>
            <div className="flex-grow flex flex-col justify-between">
                <div className="p-6">
                    <div className="flex justify-between items-center">
                        <article className="elem-dashboard mr-2">
                            <h3 className="txt-dashboard">CHAPITRE</h3>
                            <p className="text-lg">{props.room.cat}</p>
                        </article>
                        <article className="elem-dashboard ml-2">
                            <h3 className="txt-dashboard">DIFFICULTE</h3>
                            <p className="text-lg">{props.room.difficulty}</p>
                        </article>
                    </div>
                </div>
                <Link to="" className="btn-show">
                    Voir
                </Link>
            </div>
        </article>
    )
}

RoomElem.propTypes = {
    room: PropTypes.object.isRequired
}

export default RoomElem;
