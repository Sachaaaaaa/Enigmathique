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
		<div className={`flex items-center justify-between  p-4
						border-t border-[#CECDFD]  ${props.index % 2 == 0 ? 'bg-[#EBECF9]' : 'bg-[#F1F3FA]'}`}>
			<div className='flex items-center gap-2'>
				<div className='h-10 w-10 rounded-full bg-purple-color'></div>
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
	index: PropTypes.number.isRequired,
	id: PropTypes.number.isRequired,
	lastname: PropTypes.string.isRequired,
	firstname: PropTypes.string.isRequired,
	isSelected: PropTypes.bool.isRequired,
};
export default Student;