import React, {useState} from "react";
import Student from "../../models/student.model";

import Modal, {ModalBody} from "../Modal";
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
			Student.delete(id),
			{
				loading: 'Suppression...',
				success: "L'élève a bien été supprimé",
				error: "Une erreur s'est produite",
			}
		);
		
		onChange();
		setDeleteModalOpen(false);
		//console.log('delete ' + id);
	}
	
	
	const handleClickEdit = async (event, firstname, lastname, idCourse, idStudent) => {
		event.preventDefault();
		firstname ==="" ? firstname = student.firstname : firstname;
		lastname ==="" ? lastname = student.lastname : lastname;
		await toast.promise(
			Student.edit(firstname, lastname, idCourse, idStudent),
			{
				loading: 'Enregistrement...',
				success: "L'élève a bien été modifiée",
				error: "Une erreur s'est produite",
			}
		);
		onChange();
		setEditModalOpen(false);
		//console.log('edit ' + id);
	}
	
	
	return (
		<li key={student.id} value={student.firstname}
				className='bg-white flex-col p-2 h-[220px] w-[220px] rounded-lg drop-shadow-md'>
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
						link='/'
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
					<div className='w-full bg-white rounded-t-lg flex flex-col justify-center items-start border-b-2 box-border border-white-color'>
						<h1 className='text-normal font-semibold primary-font-color text-center py-2 px-5'>Modifier un élève</h1>
					</div>
				<ModalBody>
				<form className='flex flex-col justify-between w-full gap-2'>
						<div className='w-full pb-[2px]'>
						<input
							type='text'
							name='firstname'
							id='firstname'
							defaultValue={student.firstname}
								onChange={(e) => setFirstname(e.target.value)}
							className='form-inputfield-style modal-student-input-style '/> 
						</div>
						<div className='w-full pb-[2px]'>
						<input
							type='text'
							name='lastname'
							id='lastname'
							defaultValue={student.lastname}
							onChange={(e) => setLastname(e.target.value)}
							className='form-inputfield-style modal-student-input-style '/> 
						</div>
						<div className="w-full">
						<button
							type='submit'
							className='bg-blue-gradient-color modal-validate-button-style modal-student-button-style'
							onClick={(event) => handleClickEdit(event, firstname, lastname, id, student.id)}>
							Modifier
						</button>
						<button
							className='modal-cancel-button-style modal-student-button-style'
							onClick={() => setEditModalOpen(false)}>
							Annuler
						</button>
						</div>
					</form>
				</ModalBody>
			</Modal>)}
			{deleteModalOpen && (
				<Modal setOpenModal={setDeleteModalOpen} width='250' height='250'>
					<div className='w-full bg-white rounded-t-lg flex flex-col justify-center items-start border-b-2 box-border border-white-color'>
						<h1 className='text-normal font-semibold primary-font-color text-center py-2 px-5'>Supprimer un élève</h1>
					</div>

					<ModalBody>
						<form className='flex flex-col space-y-2'>
							<p className=' block text-sm text-center font-medium mb-2 primary-font-color'>Êtes-vous sûr de vouloir supprimer {"l'élève"} {student.firstname} {student.lastname} ?</p>
							<button
								type='submit'
								className='modal-validate-button-style bg-[#ef4565] hover:bg-red-500 modal-student-button-style'
								onClick={(event) => handleClickDelete(event, student.id)}>
								Supprimer
							</button>
							<button
								className='modal-cancel-button-style modal-student-button-style'
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