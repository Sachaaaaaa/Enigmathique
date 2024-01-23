import React from 'react';
import Team from './Team';
import PropTypes from 'prop-types';

const TeamContainer = (props) => {
	return (
		<section className="pregame-list-container">
			<h2 className="medium-title uppercase">
				{props.isValidated ? 'Équipes acceptées' : 'Équipes en attente'}
			</h2>
			<section className="pregame-list">
					{props.teams.map((team, index) => (
						<>
							<Team
								index={index}
								name={team.name}
								students={team.students}
								isValidated={props.isValidated}
								id={team.id}
							/>
						</>
					))}
			</section>
		</section>
	);
};
TeamContainer.propTypes = {
	teams: PropTypes.array.isRequired,
	isValidated: PropTypes.bool.isRequired,
};

export default TeamContainer;
