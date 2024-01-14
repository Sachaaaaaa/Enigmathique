import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {IoCheckmarkCircleOutline, IoChevronDown, IoChevronUp, IoRemoveCircle} from 'react-icons/io5';
import {useCreationGameContext} from "../contexts/CreationGame.context";

const Team = (props) => {

	const [isExpanded, setIsExpanded] = useState(false);

	const {teams, setTeams} = useCreationGameContext();

	const addingTeam = (event) => {
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
			className='flex flex-col items-center gap-10 justify-start p-4 bg-cyan-500 text-white rounded-xl'
			onClick={() => setIsExpanded(!isExpanded)}
		>
			<div className='flex flex-row items-center justify-between w-full'>
				<p className='w-56'>{props.name}</p>
				{props.isValidated ?
					<>
						<div>
							<button className='p-2 bg-red-500 rounded-xl' onClick={removingTeam}>
								<IoRemoveCircle size={25}/>
							</button>
						</div>
						{isExpanded ? <IoChevronUp/> : <IoChevronDown/>}
					</>
					:
					<>
						<div className='flex flex-row gap-2'>
							<button className='p-2 bg-green-500 rounded-xl' onClick={addingTeam}>
								<IoCheckmarkCircleOutline size={25}/>
							</button>
							<button className='p-2 bg-red-500 rounded-xl' onClick={removingTeam}>
								<IoRemoveCircle size={25}/>
							</button>
						</div>
						{isExpanded ? <IoChevronUp/> : <IoChevronDown/>}
					</>
				}
			</div>
			{isExpanded && props.students.map((student) => {
				return (
					<div
						className='flex flex-row items-center w-full'
						key={student.name + student.firstname}
					>
						<p className='w-56'>{student.name}</p>
						<p className='w-56'>{student.firstname}</p>
					</div>
				);
			})}
		</section>
	);
}

Team.propTypes = {
	name: PropTypes.string.isRequired,
	students: PropTypes.array.isRequired,
	isValidated: PropTypes.bool.isRequired,
}
export default Team;