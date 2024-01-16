import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {IoAddCircle, IoRemoveCircle} from 'react-icons/io5';

import AvailableContext from './AvailableStudents.context';
import SelectedContext from './SelectedStudents.context';
import {useSocket} from "../../contexts/SocketContext";
import {ClientToServer} from "../../data/socketMessages";

const Student = (props) => {

	const socket = useSocket();
	const onAvailableStudentClick = (student) => {
		// Demande via le socket de rejoindre l'équipe
		socket.emit(ClientToServer.JoinTeam, student.id);
	};

	const onSelectedStudentClick = (student) => {
		// Demande via le socket de quitter l'équipe
		socket.emit(ClientToServer.LeaveTeam, student.id);
	};

	return (
		<div className='flex flex-row items-center gap-10 justify-start p-4 bg-cyan-500 text-white rounded-xl'>
			<p className='w-56'>{props.firstname}</p>
			<p className='w-56'>{props.lastname}</p>
			{props.isSelected ?
				<button className='p-2 bg-red-500 rounded-xl' onClick={onSelectedStudentClick}>
					<IoRemoveCircle size={25}/>
				</button>
				:
				<button className='p-2 bg-green-500 rounded-xl' onClick={onAvailableStudentClick}>
					<IoAddCircle size={25}/>
				</button>
			}
		</div>
	);
}
Student.propTypes = {
	lastname: PropTypes.string.isRequired,
	firstname: PropTypes.string.isRequired,
	isSelected: PropTypes.bool.isRequired,
	teamSize: PropTypes.number,
}
export default Student;