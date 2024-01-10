import React from 'react';
import SideBar from '../components/SideBar';
import RoomItem from '../components/creationgame2/RoomItem';
import {useState} from 'react';


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
            <div className="flex-grow">
                <div>
                    <h2>Séléction des salles</h2>
                    <label className="hover:bg-gray-300 has-[:checked]:border-b-2 border-indigo-600 w-1/4">
                        <input
                            value="suit"
                            type="radio"
                            name="chapitre"
                            className="hidden"
                            checked={selected==='suit'}
                            onChange={handleChange}
                        />
                        Suites
                    </label>
                    <label className="hover:bg-gray-300 has-[:checked]:border-b-2 border-indigo-600">
                        <input
                            value="proba"
                            type="radio"
                            name="chapitre"
                            className="hidden"
                            checked={selected==='proba'}
                            onChange={handleChange}
                        />
                        Probabilités
                    </label>
                    <label className="hover:bg-gray-300 has-[:checked]:border-b-2 border-indigo-600">
                        <input
                            value="fonct"
                            type="radio"
                            name="chapitre"
                            className="hidden"
                            checked={selected==='fonct'}
                            onChange={handleChange}
                        />
                        Fonctions
                    </label>
                    <label className="hover:bg-gray-300 has-[:checked]:border-b-2 border-indigo-600">
                        <input
                            value="ens"
                            type="radio"
                            name="chapitre"
                            className="hidden"
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