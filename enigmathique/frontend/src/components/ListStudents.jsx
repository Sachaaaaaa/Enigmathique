import React, {useEffect, useState} from 'react';
import Modal, {ModalBody, ModalHeader} from './Modal';
import PropTypes from 'prop-types';
import StudentService from '../services/student.service';
import {MdOutlineModeEdit} from 'react-icons/md';
import {ImStatsDots} from 'react-icons/im';

const ListStudents = (props) => {

	const [students, setStudents] = useState([]);

	useEffect(() => {
		StudentService.get(props.id).then((response) => {
			console.log(response)
			setStudents(response);
		}).catch((error) => {
			console.log(error);
		});
	}, []);


	// TODO: Ajouter ce qu'il faut pour appliquer les modifications à l'élève
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [deleteModalOpen, setdeleteModalOpen] = useState(false);

	return (
		<>
			<ul className='bg-blue-300 space-x-10 flex flex-wrap'>
				{students.map((student) => (
					<li key={student.id} value={student.firstname} className='bg-gray-200 flex-col space-y-3 p-1 h-[20%]'>
						<h3 className='w-40 text-center'>{student.firstname} {student.secondname}</h3>
						<h3 className='w-40 text-center'>{student.class}</h3>
						<button className='btn-utils-student'><ImStatsDots color='white' size='1.5em'/></button>
						<button className='btn-utils-student' onClick={() => setEditModalOpen(true)}>
							<MdOutlineModeEdit color='white' size='1.5em'/></button>
						{editModalOpen && (
							<Modal setOpenModal={setEditModalOpen}>
								<ModalHeader>
									<h1 className='text-3xl text-center'>Modifier un élève</h1>
								</ModalHeader>
								<ModalBody>
									<form className='flex flex-col space-y-5'>
										<label htmlFor='firstname'>Prénom</label>
										<input type='text' name='firstname' id='firstname' className='border-2 border-blue-900 rounded-md'/>
										<label htmlFor='secondname'>Nom</label>
										<input type='text' name='secondname' id='secondname'
										       className='border-2 border-blue-900 rounded-md'/>
										<button className='btn-delete'>Annuler</button>
										<button className='btn-validate'>Valider la modification</button>
									</form>
								</ModalBody>
							</Modal>)}
						{deleteModalOpen && (
							<Modal setOpenModal={setdeleteModalOpen} height='300'>
								<ModalHeader>
									<h1 className='text-3xl text-center'>Voulez vous vraiment surpprimer
										l&apos;élève {student.firstname} {student.secondname}</h1>
								</ModalHeader>
								<ModalBody>
									<form className='flex flex-col space-y-5'>
										<button className='btn-delete'>Annuler</button>
										<button className='btn-validate'>Valider la suppression</button>
									</form>
								</ModalBody>
							</Modal>)};
					</li>
				))}
			</ul>

		</>
	);
}
ListStudents.propTypes = {
	id: PropTypes.number.isRequired,
}
export default ListStudents;