import React from 'react';
import SideBar from "../components/SideBar";
import PropTypes from "prop-types";
import WaitingTeams from "../components/creation3/WaitingTeams";
import AcceptedTeams from "../components/creation3/AcceptedTeams";

const CreationGame3 = () => {

    return (
        <div className="flex">
            <SideBar />
            <main className="flex flex-col gap-4 w-full h-screen p-4">
                <h1 className="text-3xl">Validation des équipes</h1>
                <section className="flex flex-row justify-evenly w-full h-5/6">
                    <WaitingTeams />
                    <AcceptedTeams />
                </section>
                <section>
                    <button>Start game</button>
                </section>
            </main>

        </div>
    );
};


export default CreationGame3;