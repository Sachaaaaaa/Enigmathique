import React, {useState} from 'react';
import SideBar from "../components/SideBar";
import PropTypes from "prop-types";
import WaitingTeams from "../components/creation3/WaitingTeams";
import AcceptedTeams from "../components/creation3/AcceptedTeams";
import TeamContext from "../components/creation3/Teams.context";

const CreationGame3 = () => {

    const waitingTeams = [
        {
            name: "Team 1",
            students: [
                {
                    name: "Tardy",
                    firstname: "Mathéo",

                },
                {
                    name: "Dupuis",
                    firstname: "Aboubacar aqualand népal",
                },
            ],
            isValidated: false,
        },
        {
            name: "Team 2",
            students: [
                {
                    name: "Briand",
                    firstname: "Damien",
                },
                {
                    name: "Dalban",
                    firstname: "Yvain",
                },
            ],
            isValidated: false,
        },
        {
            name: "Team 3",
            students: [
                {
                    name: "Guillevic",
                    firstname: "Mathéo",
                },
                {
                    name: "Wos",
                    firstname: "Sacha",
                },
            ],
            isValidated: false,
        },
        {
            name: "Team 4",
            students: [
                {
                    name: "Pivot",
                    firstname: "Raphaël",
                },
                {
                    name: "Bergery",
                    firstname: "Loic",
                },
            ],
            isValidated: false,
        },

    ]
    const [teams, setTeams] = useState(waitingTeams);
	const handleStartGame = () => {
		alert("La partie va commencer");
	}

    return (
        <TeamContext.Provider value={{teams, setTeams}}>
            <div className="flex">
                <SideBar />
                <main className="flex flex-col gap-4 w-full h-screen p-4">
                    <h1 className="text-3xl">Validation des équipes</h1>
                    <section className="flex flex-row justify-evenly w-full">
                        <WaitingTeams />
                        <AcceptedTeams />
                    </section>
					<section className="flex flex-row justify-end p-4 w-full">
						<button className="p-2 bg-blue-800 rounded-xl text-white" onClick={handleStartGame}>Commencer la partie</button>
					</section>
                </main>
            </div>
        </TeamContext.Provider>
    );
};


export default CreationGame3;