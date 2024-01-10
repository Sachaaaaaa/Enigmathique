import React from 'react';
import SideBar from "../components/SideBar";
import RoomItem from "../components/creationgame2/RoomItem";




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
              <input id="Suites" type="radio" name="chapitre" className="" checked/>
              <label htmlFor="Suites">Suites</label>
              <input id="Proba" type="radio" name="chapitre" className=""/>
              <label htmlFor="Proba">Probabilités</label>
              <input id="Fonct" type="radio" name="chapitre" className=""/>
              <label htmlFor="Fonct">Fonctions</label>
              <input id="Ens" type="radio" name="chapitre" className=""/>
              <label htmlFor="Ens">Ensembles</label>
          </div>
          {rooms.map((room, index) => (<RoomItem key={index} name={room.name} difficulty={room.difficulty} />))}
        </div>
      </div>
  );
};



export default CreationGame2;