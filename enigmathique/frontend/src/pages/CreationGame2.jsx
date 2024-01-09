import React from 'react';
import SideBar from "../components/SideBar";
import PropTypes from "prop-types";


const RoomItem = (props) => {
  return (
      <section>
        <img src="" alt="img-room"/>
        <h2>{props.name}</h2>
        <p>Difficulté : {props.difficulty}</p>
      </section>
  )
}

const CreationGame2 = () => {

  const rooms = [
    {
      name: "Room1",
      difficulty: "facile"
    },
    {
      name: "Room2",
      difficulty: "moyen"
    },
  ]

  return (
      <div className="flex">
        <SideBar />
        <div>
          <div>
            <h2>Séléction des salles</h2>
            <button>Suites</button>
            <button>Probabilités</button>
            <button>Fonctions</button>
            <button>Ensembles</button>
          </div>
          {rooms.map((room, index) => (<RoomItem key={index} name={room.name} difficulty={room.difficulty} />))}
        </div>
      </div>
  );
};

RoomItem.propTypes = {
  name: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired
}

export default CreationGame2;