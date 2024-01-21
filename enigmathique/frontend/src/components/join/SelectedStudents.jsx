import React from 'react';
import PropTypes from 'prop-types';
import Student from './Student';
import { AiOutlineTeam } from "react-icons/ai";
const SelectedStudents = (props) => {
	const color = props.selected.length === props.teamSize ? 'text-green-500' : 'text-red-500';

	return (
		<section className="flex flex-col h-full w-1/3 gap-2">
			<section>
				<h1>Membres de l&apos;équipe</h1>
			</section>
			<section className="flex flex-col h-[90%] bg-whiteshadow-md p-2">
				<nav className="flex flex-row justify-center items-center gap-2 p-2">
					<AiOutlineTeam size={25} className='blue-font-color' />
					<input
						className="w-full p-2 bg-transparent"
						type="text"
						placeholder="Nom de l'équipe"
						onChange={props.handleChange}
					/>
					<p className={color}>Taille équipe : {props.selected.length}/{props.teamSize}</p>

				</nav>
				<hr></hr>
				<section className="h-full overflow-y-scroll">
					{props.selected.map((student, index) => (
						<>
							<Student
								key={student.id}
								id={student.id}
								lastname={student.lastname}
								firstname={student.firstname}
								isSelected={true}
							/>
							{index!==props.selected.length-1 && <hr></hr>}
						</>
					))}

				</section>
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