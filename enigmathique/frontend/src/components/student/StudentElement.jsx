import React, {useState} from "react";
import StudentModel from "../../models/student.model";

import Modal, {ModalBody, ModalHeader} from 'components/Modal';
import PropTypes from "prop-types";
import ActionButton from "components/dashboard/ActionButton";
import toast from "react-hot-toast";


const StudentElement = ({student, onChange}) => {
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const URL = window.location.href;
	const id = URL.substring(URL.lastIndexOf('/') + 1);
	
	
	const handleClickDelete = async (event, id) => {
		event.preventDefault();
		await toast.promise(
			StudentModel.delete(id),
			{
				loading: 'Suppression...',
				success: "L'élève a bien été supprimé",
				error: "Une erreur s'est produite",
			}
		);
		
		onChange();
		setDeleteModalOpen(false);
	}
	
	
	const handleClickEdit = async (event, firstname, lastname, idCourse, idStudent) => {
		event.preventDefault();
		firstname ==="" ? firstname = student.firstname : firstname;
		lastname ==="" ? lastname = student.lastname : lastname;
		await toast.promise(
			StudentModel.edit(firstname, lastname, idCourse, idStudent),
			{
				loading: 'Enregistrement...',
				success: "L'élève a bien été modifiée",
				error: "Une erreur s'est produite",
			}
		);
		onChange();
		setEditModalOpen(false);
	}
	
	
	return (
		<li key={student.id} value={student.firstname}
				className='bg-white flex-col p-2 h-[220px] w-[220px] rounded-lg' style={{boxShadow:"0px 10px 15px -3px rgba(0,0,0,0.1)"}}>
			<section className='flex flex-col justify-around items-center h-full space-y-1 primary-font-color'>
				<div>
				<figure className="bg-purple-color w-[80px] h-[80px] rounded-full mx-auto">
				</figure>
				<h3 className='p-2 mx-auto text-center'>
					{`${student.firstname} ${student.lastname}`}
				</h3>
				</div>
				<div className='space-x-3'>
					<ActionButton 
						title="Statistiques"
						link={`/student/stats/${student.id}`}
					/>
					<ActionButton
						title="Modifier"
						onClick={() => setEditModalOpen(true)}
					/>
					<ActionButton
						title="Supprimer"
						onClick={() => setDeleteModalOpen(true)}
					/>
				</div>
			</section>
			{editModalOpen && (
				<Modal setOpenModal={setEditModalOpen}>
					<ModalHeader title="Modifier un élève"/>
					<ModalBody>
						<form className='flex flex-col justify-center items-end w-full gap-3 '>
							<div className='w-full pb-3'>
								<label htmlFor='name' className='form-label-style primary-font-color'>
									Prénom de  {"l'élève"}
								</label>
								<input
									type='text'
									name='firstname'
									id='firstname'
									defaultValue={student.firstname}
									onChange={(e) => setFirstname(e.target.value)}
									className='form-inputfield-style  '/>
							</div>
							<div className='w-full pb-3'>
								<label htmlFor='name' className='form-label-style primary-font-color'>
									Nom de {"l'élève"}
								</label>
								<input
									type='text'
									name='lastname'
									id='lastname'
									defaultValue={student.lastname}
									onChange={(e) => setLastname(e.target.value)}
									className='form-inputfield-style  '/>
							</div>
							<button
								type='submit'
								className='bg-gradient-to-r from-[#4C49ED] to-[#0A06F4] modal-validate-button-style'
								onClick={(event) => handleClickEdit(event, firstname, lastname, id, student.id)}>
								Modifier
							</button>
							<button
								className='modal-cancel-button-style'
								onClick={() => setEditModalOpen(false)}>
								Annuler
							</button>
						</form>
					</ModalBody>
				</Modal>)}
			{deleteModalOpen && (
				<Modal setOpenModal={setDeleteModalOpen}>
					<ModalHeader title="Supprimer un élève"/>
					<ModalBody>
						<form className='flex flex-col text-center w-full gap-3'>
							<p className=' block text-sm font-medium mb-5 primary-font-color'>Êtes-vous sûr de vouloir supprimer {"l'élève"} {student.firstname} {student.lastname} ?</p>
							<button
								type='submit'
								className='modal-delete-button-style bg-[#EF4565]'
								onClick={(event) => handleClickDelete(event, student.id)}>
								Supprimer
							</button>
							<button
								className='modal-cancel-button-style'
								onClick={() => setDeleteModalOpen(false)}>
								Annuler
							</button>
						</form>
					</ModalBody>
				</Modal>)}









			
		</li>
	)
}

StudentElement.propTypes = {
	student: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired,
}

export default StudentElement;