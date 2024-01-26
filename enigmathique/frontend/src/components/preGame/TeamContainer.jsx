import React from 'react';
import Team from './Team';
import PropTypes from 'prop-types';


const TeamContainer = (props) => {

	let nbValidatedStudents = 0;
	props.isValidated && props.teams.map((team) => {
		nbValidatedStudents = nbValidatedStudents + team.students.length;
	});

	return (
		<section className="relative pregame-join-list-container ">
			<article className="absolute pregame-join-list">
				{/* Affichage des élèves validés */}
				{props.isValidated && <p className='absolute top-0 right-0 p-2 blue-font-color font-medium'> {JSON.stringify(nbValidatedStudents)} élèves</p>}
				<h2 className="pregame-list-header">
					{props.isValidated ? "Équipes acceptées" : "Équipes en attente"}
				</h2>
				<div className="overflow-y-auto">
					{props.teams.map((team, index) => (
						<>
							<Team
								key={team.id}
								index={index}
								name={team.name}
								students={team.students}
								isValidated={props.isValidated}
								id={team.id}
							/>
						</>
					))}
				</div>
			</article>
		</section>
	);
};
TeamContainer.propTypes = {
	teams: PropTypes.array.isRequired,
	isValidated: PropTypes.bool.isRequired,
};

export default TeamContainer;
