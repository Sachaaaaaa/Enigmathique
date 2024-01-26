import React from 'react';
import PropTypes from 'prop-types';
import Student from './Student';
import { AiOutlineTeam } from "react-icons/ai";

const SelectedStudents = (props) => {
	const color = props.selected.length === props.teamSize ? 'text-green-500' : 'text-[#EF4565]';

	return (
		<section className="relative pregame-join-list-container">
			<h2 className='medium-title uppercase'> {"Membres de l'équipe"}</h2>
			<section className="absolute pregame-join-list">
				
				<nav className="join-list-header">
					<AiOutlineTeam size={30} className='blue-font-color' />
					<input
						className="join-input"
						type="text"
						placeholder="Nom de l'équipe"
						onChange={props.handleChange}
						maxLength={40}
					/>
					<p className={` text-sm whitespace-nowrap ${color}`}> Membres {props.selected.length}/{props.teamSize}</p>
				</nav>
				<div className='overflow-y-auto'>
					{props.selected.map((student, index) => (
						<>
							<Student
								index={index}
								key={index}
								id={student.id}
								lastname={student.lastname}
								firstname={student.firstname}
								isSelected={true}
							/>
						</>
					))}
				</div>
			</section>
		</section>
	);
}
SelectedStudents.propTypes = {
	selected: PropTypes.array.isRequired,
	teamSize: PropTypes.number.isRequired,
	handleChange: PropTypes.func.isRequired,
}
export default SelectedStudents;