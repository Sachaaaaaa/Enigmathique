import React from 'react';
import PropTypes from "prop-types";
import logo from '../../assets/img/logo-enigmathique.png';
import AvailableStudents from "./AvailableStudents";
import SelectedStudents from "./SelectedStudents";

import AvailableContext from "./AvailableStudents.context";
import SelectedContext from "./SelectedStudents.context";

const Join = (props) => {

    const students = [
        {
            name: "Tardy",
            firstname: "Mathéo",

        },
        {
            name: "Dupuis",
            firstname: "Aboubacar aqualand népal",
        },
        {
            name: "Briand",
            firstname: "Damien",
        },
        {
            name: "Dalban",
            firstname: "Yvain",
        },
        {
            name: "Guillevic",
            firstname: "Mathéo",
        },
        {
            name: "Wos",
            firstname: "Sacha",
        },
        {
            name: "Pivot",
            firstname: "Raphaël",
        },
        {
            name: "Bergery",
            firstname: "Loic",
        },
    ]


    const [available, setAvailable] = React.useState(students);
    const [selected, setSelected] = React.useState([]);

    return (
        <AvailableContext.Provider value={{available, setAvailable}}>
            <SelectedContext.Provider value={{selected, setSelected}}>
                <header className="flex flex-row items-center m-5">
                    <img
                        className="h-24 w-24 rounded-full"
                        src={logo}
                        alt="Logo Enigmatique"/>
                    <h1 className="text-3xl text-blue-800">Rejoindre la partie de <span className="text-red-600">{props.professorName}</span></h1>
                </header>
                <main className="flex flex-col m-5">
                    <section>
                        {/*Les divs progressions*/}
                    </section>
                    <h1 className="text-2xl">Création de l&apos;équipe</h1>
                    <section className="flex flex-row justify-between p-4 w-full">
                        <AvailableStudents available={available}/>
                        <SelectedStudents selected={selected} teamSize={4}/>
                    </section>
                </main>
            </SelectedContext.Provider>
        </AvailableContext.Provider>
    );
}
Join.propTypes = {
    professorName: PropTypes.string.isRequired,
}
export default Join;