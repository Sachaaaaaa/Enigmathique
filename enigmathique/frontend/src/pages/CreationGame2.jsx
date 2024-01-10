import React from 'react';
import SideBar from "../components/SideBar";
import RoomItem from "../components/creationgame2/RoomItem";
import {useState} from "react";


const CreationGame2 = () => {

    const [selected, setSelected] = useState('suit')

    const rooms = [
        {
            name: "Room1",
            difficulty: "facile",
            cat: "proba"
        },
        {
            name: "Room2",
            difficulty: "moyen",
            cat: "suit"
        },
        {
            name: "Room3",
            difficulty: "difficile",
            cat: "fonct"
        }
    ]

    const handleChange = changeEvent => {
        setSelected(changeEvent.target.value);
    }

    return (
        <div className="flex">
            <SideBar/>
            <div>
                <div>
                    <h2>Séléction des salles</h2>
                    <label>
                        <input
                            value="suit"
                            type="radio"
                            name="chapitre"
                            className=""
                            checked={selected==='suit'}
                            onChange={handleChange}
                        />
                        Suites
                    </label>
                    <label>
                        <input
                            value="proba"
                            type="radio"
                            name="chapitre"
                            className=""
                            checked={selected==='proba'}
                            onChange={handleChange}
                        />
                        Probabilités
                    </label>
                    <label>
                        <input
                            value="fonct"
                            type="radio"
                            name="chapitre"
                            className=""
                            checked={selected==='fonct'}
                            onChange={handleChange}
                        />
                        Fonctions
                    </label>
                    <label>
                        <input
                            value="ens"
                            type="radio"
                            name="chapitre"
                            className=""
                            checked={selected==='ens'}
                            onChange={handleChange}
                        />
                        Ensembles
                    </label>
                </div>
                {rooms.map((room, index) => (
                    room.cat === selected && <RoomItem key={index} name={room.name} difficulty={room.difficulty}/>
                ))}
            </div>
        </div>
    );
};



export default CreationGame2;