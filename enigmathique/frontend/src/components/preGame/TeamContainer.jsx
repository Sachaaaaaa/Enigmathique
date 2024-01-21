import React from 'react';
import Team from './Team';
import PropTypes from 'prop-types';

const TeamContainer = (props) => {
	return (
		<section className="w-5/12 flex h-full flex-col items-start gap-2">
			<h2 className="text-center text-xl">
				{props.isValidated ? 'Équipes acceptées :' : 'Équipes en attente :'}
			</h2>
			<section className="border-2 shadow-md bg-white h-full w-full">
				<section className="flex flex-col gap-2 h-full overflow-y-scroll">
					{props.teams.map((team) => (
						<>
							<Team
								key={9384928493284932}
								name={team.name}
								students={team.students}
								isValidated={props.isValidated}
								id={team.id}
							/>
							<hr></hr>
						</>
					))}
				</section>
			</section>
		</section>
	);
};
TeamContainer.propTypes = {
	teams: PropTypes.array.isRequired,
	isValidated: PropTypes.bool.isRequired,
};

export default TeamContainer;
