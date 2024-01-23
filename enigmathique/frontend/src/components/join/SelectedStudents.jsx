import React from 'react';
import PropTypes from 'prop-types';
import Student from './Student';
import { AiOutlineTeam } from "react-icons/ai";

const SelectedStudents = (props) => {
	const color = props.selected.length === props.teamSize ? 'text-green-500' : 'text-[#EF4565]';

	return (
		<section className="relative join-list-container">
			<h2 className='medium-title uppercase'> {"Membres de l'équipe"}</h2>
			<section className="absolute join-list">
				<nav className="flex flex-row justify-center items-center gap-2 py-2 px-5 border-b border-white-color">
					<AiOutlineTeam size={30} className='blue-font-color' />
					<input
						className="w-full p-2 bg-transparent primary-font-color focus:border-transparent focus:outline-none "
						type="text"
						placeholder="Nom de l'équipe"
						onChange={props.handleChange}
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