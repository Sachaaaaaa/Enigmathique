import React from 'react';
import Team from './Team';
import PropTypes from "prop-types";
import {usePreGameContext} from "../contexts/PreGame.context";

const TeamContainer = (props) => {

	const {teams} = usePreGameContext();
	return (
		<section className='w-5/12 flex h-full flex-col items-start gap-2'>
			<h2 className='text-center text-xl'>
				{props.accepted ?
					'Équipes en acceptées :'
					:
					'Équipes en attente :'
				}
			</h2>
			<section className='border-2 shadow bg-white h-full w-full'>
				<section className='flex flex-col gap-2 h-full overflow-y-scroll'>

					{props.accepted ?
						//CAS OU LE CONTAINER EST CELUI AVEC LES TEAMS ACCEPTEES
						teams.map((team, index)=>{
							return team.isValidated ?
								<>
									<Team
										key={index}
										id={team.id}
										name={team.name}
										students={team.students}
										isValidated={team.isValidated}
									/>
									<hr></hr>
								</>
								:
								null
						})
						:
						//CAS OU LE CONTAINER EST CELUI AVEC LES TEAMS EN ATTENTES
						teams.map((team, index)=>{
							return team.isValidated ?
								null
								:
								<>
									<Team
										key={index}
										id={team.id}
										name={team.name}
										students={team.students}
										isValidated={team.isValidated}
									/>
									<hr></hr>
								</>
						})
					}

				</section>
			</section>
		</section>
	);
}
TeamContainer.propTypes = {
	accepted: PropTypes.bool.isRequired,
}
export default TeamContainer;