import React, { useContext } from 'react';
import Team from './Team';
import PropTypes from 'prop-types';

const TeamContainer = (props) => {

	return (
		<section className="w-5/12 flex h-full flex-col items-start gap-2">
			<h2 className="text-center text-xl">
				{props.accepted ? 'Équipes en acceptées :' : 'Équipes en attente :'}
			</h2>
			<section className="border-2 shadow bg-white h-full w-full">
				<section className="flex flex-col gap-2 h-full overflow-y-scroll">
					{
						//CAS OU LE CONTAINER EST CELUI AVEC LES TEAMS ACCEPTEES
						props.teams.map((team, index) => (
							<>
								<Team
									key={index}
									name={team.name}
									students={team.students}
									isValidated={team.isValidated}
								/>
								<hr></hr>
							</>
						))
					}
				</section>
			</section>
		</section>
	);
};
TeamContainer.propTypes = {
	teams: PropTypes.array.isRequired,
	accepted: PropTypes.bool.isRequired,
};

export default TeamContainer;
