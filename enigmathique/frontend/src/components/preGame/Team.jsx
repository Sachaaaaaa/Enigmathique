import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {IoCheckmarkCircleOutline, IoChevronDown, IoChevronUp, IoRemoveCircle} from 'react-icons/io5';
import {IconContext} from "react-icons";
import {usePreGameContext} from "../contexts/PreGame.context";
import gameService from "../../services/game.service";

const Team = (props) => {

	const [isExpanded, setIsExpanded] = useState(false);

	const {teams, setTeams} = usePreGameContext();

	const addingTeam = (event) => {
		gameService.acceptTeam(props.id, );
		event.stopPropagation();
		const updatedTeams = teams.filter(team =>
			team.name !== props.name || team.students !== props.students);


		updatedTeams.push({
			name: props.name,
			students: props.students,
			isValidated: true,
		});

		setTeams(updatedTeams);
	}
	const removingTeam = (event) => {
		event.stopPropagation();
		setTeams(teams.filter(team =>
			team.name !== props.name || team.students !== props.students));
	}

	return (
		<section
			className='flex flex-col items-start justify-center py-2 px-4 gap-2'
			onClick={() => setIsExpanded(!isExpanded)}
		>
			<div className='flex flex-row items-center justify-between w-full'>
				<p className='w-4/12'>{props.name}</p>
				{props.isValidated ?
					<>
						{isExpanded ? <IoChevronUp/> : <IoChevronDown/>}
						<div>
							<button onClick={removingTeam}>
								<IconContext.Provider value={{className: 'text-[#ef4565]'}}>
									<IoRemoveCircle size={25}/>
								</IconContext.Provider>
							</button>
						</div>
					</>
					:
					<>
						{isExpanded ? <IoChevronUp/> : <IoChevronDown/>}
						<div className='flex flex-row gap-2'>
							<button onClick={addingTeam}>
								<IconContext.Provider value={{className: 'text-[#019799]'}}>
									<IoCheckmarkCircleOutline size={25}/>
								</IconContext.Provider>
							</button>
							<button onClick={removingTeam}>
								<IconContext.Provider value={{className: 'text-[#ef4565]'}}>
									<IoRemoveCircle size={25}/>
								</IconContext.Provider>
							</button>
						</div>
					</>
				}
			</div>
			<div className='flex flex-col gap-2 items-start w-full'>
				{isExpanded && props.students.map((student) => {
					return (
						<div
							className='flex flex-row items-center w-full gap-4'
							key={student.name + student.firstname}
						>
							<div className='h-10 w-10 rounded-full bg-gray-500'></div>
							<p>{student.name} {student.firstname}</p>
						</div>
					);
				})}
			</div>
		</section>
	);
}

Team.propTypes = {
	id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	students: PropTypes.array.isRequired,
	isValidated: PropTypes.bool.isRequired,
}
export default Team;