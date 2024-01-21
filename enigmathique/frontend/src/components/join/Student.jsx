import React from 'react';
import PropTypes from 'prop-types';
import {IoAddCircle, IoRemoveCircle} from 'react-icons/io5';


import {useSocket} from '../../contexts/SocketContext';
import {ClientToServer} from '../../data/socketMessages';

const Student = (props) => {

	const socket = useSocket();
	const onAvailableStudentClick = () => {
		// Demande via le socket de rejoindre l'équipe
		console.log('Emiting join team : ' + props.id);
		socket.emit(ClientToServer.AddStudent, props.id);
	};

	const onSelectedStudentClick = () => {
		// Demande via le socket de quitter l'équipe
		socket.emit(ClientToServer.RemoveStudent, props.id);
	};

	return (
		<div className='flex flex-row items-center gap-10 justify-between p-4 bg-white'>
			<div className='flex flex-row items-center gap-2'>
				<div className='h-10 w-10 rounded-full bg-gray-500'></div>
				<p className=''>{props.firstname} {props.lastname}</p>
			</div>
			{props.isSelected ?
				<button className='text-[#ef4565]' onClick={onSelectedStudentClick}>
					<IoRemoveCircle size={40}/>
				</button>
				:
				<button className='blue-font-color' onClick={onAvailableStudentClick}>
					<IoAddCircle size={40}/>
				</button>
			}
		</div>
	);
};
Student.propTypes = {
	id: PropTypes.number.isRequired,
	lastname: PropTypes.string.isRequired,
	firstname: PropTypes.string.isRequired,
	isSelected: PropTypes.bool.isRequired,
};
export default Student;