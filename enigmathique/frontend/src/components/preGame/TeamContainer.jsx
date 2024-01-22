import React from 'react';
import Team from './Team';
import PropTypes from 'prop-types';

const TeamContainer = (props) => {
	return (
		<section className="flex flex-col gap-2 w-[48%] min-w-[250px] h-full pb-5">
			<h2 className="medium-title uppercase">
				{props.isValidated ? 'Équipes acceptées' : 'Équipes en attente'}
			</h2>
			<section className="w-full h-full p-0 m-0 bg-white border-l border-r shadow-md overflow-y-auto">
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
