import React, {useContext} from 'react';
import Team from './Team';
import TeamContext from './Teams.context';

const WaitingTeams = () => {

    const {teams} = useContext(TeamContext);

    return (
        <section className="w-5/12 border-2 border-blue-800 rounded-xl p-2">
            <section className="bg-blue-800/50 p-2 rounded-t-xl">
                <h2 className="text-center text-xl">Équipes en attente</h2>
            </section>
            <section className="p-2">
                <section className="flex flex-col gap-2 p-4 h-[440px] overflow-y-scroll">
                    {teams.map((team, index) => {
                        return team.isValidated ? null :
                            <Team
                                key={index}
                                name={team.name}
                                students={team.students}
                                isValidated={team.isValidated}
                            />
                    })}
                </section>
            </section>
        </section>
    );
}

export default WaitingTeams;