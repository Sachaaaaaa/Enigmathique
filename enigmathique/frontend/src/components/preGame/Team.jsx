import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {IoCheckmarkCircleOutline, IoChevronDown, IoChevronUp, IoRemoveCircle} from 'react-icons/io5';
import { FaCheckCircle } from "react-icons/fa";
import {IconContext} from "react-icons";
import {usePreGameContext} from "../contexts/PreGame.context";
import gameService from "../../services/game.service";
import {useSocket} from "../../contexts/SocketContext";
import { ClientToServer } from 'data/socketMessages';
import ActionButton from 'components/dashboard/ActionButton';
import toast from 'react-hot-toast';

const Team = (props) => {
	const socket = useSocket();
	const [isExpanded, setIsExpanded] = useState(false);

	const addingTeam = (event) => {
		event.preventDefault();
		event.stopPropagation();
		socket.emit(ClientToServer.ValidateTeam,  {id: props.id});
	};
	const removingTeam = (event) => {
		event.preventDefault();
		event.stopPropagation();
		socket.emit(ClientToServer.RefuseTeam, {id: props.id});
	};

	return (
		<section
			className={`p-4 primary-font-color cursor-pointer
					border-t border-[#CECDFD]  ${props.index % 2 == 0 ? 'bg-[#EBECF9]' : 'bg-[#F1F3FA]'}`}
			onClick={() => setIsExpanded(!isExpanded)}
		>
			<div className='flex justify-between'>
				<p className='leading-8'>{props.name}</p>
				<div className='flex justify-center items-center'>{isExpanded ? <IoChevronUp /> : <IoChevronDown/>}</div>
				{props.isValidated ?
						
					<div className='flex justify-end'>
						<ActionButton
							title='Refuser'
							onClick={removingTeam}
						/>
					</div>
					:
					<div className='flex justify-end gap-4'>
					<ActionButton
						title='Valider'
						onClick={addingTeam}
						/>
					
						<ActionButton
						title='Refuser'
						onClick={removingTeam}
						/>
					</div>
				}
			</div>
			<div className='gap-3'>
				{isExpanded && props.students.map((student) => {
					return (
						<div
							className='flex items-center gap-4 mt-3'
							key={student.lastname + student.firstname}>
							<div className='w-10 h-10 rounded-full bg-purple-color'></div>
							<p>{student.lastname} {student.firstname}</p>
						</div>
					);
				})}
			</div>
		</section>
	);
};

Team.propTypes = {
	index : PropTypes.number.isRequired,
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	students: PropTypes.array.isRequired,
	isValidated: PropTypes.bool.isRequired,
};
export default Team;