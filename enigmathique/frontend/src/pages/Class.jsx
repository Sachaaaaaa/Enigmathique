import React from 'react';
import LayoutProf from "../layouts/LayoutProf";
import {Link} from 'react-router-dom';
import {MdArrowBackIos} from 'react-icons/md';
import Modal, {ModalBody, ModalHeader} from '../components/Modal';
import {FaPlus} from "react-icons/fa6";
import Course from "../models/course.model";
import ClassElement from '../components/class/ClassElement';
import {useState, useEffect} from 'react';


const Class = () => {

	const [courses, setCourses] = useState([]);
	const [createModalOpen, setCreateModalOpen] = useState(false);
	const [name, setName] = useState('');

	const loadClasses = async () => {
		const data = await Course.getAll();
		setCourses(data);
		console.log(data);
	}

	useEffect(() => {
		loadClasses();
	}, []);


	const handleClickCreate = async (event) => {
		event.preventDefault();
		const data = await Course.create(name);
		console.log(data);
		loadClasses();
		setCreateModalOpen(false);
		setName('');
	}

	return (
		<LayoutProf>
			<main className=' h-screen main-background-color overflow-x-hidden'>
				<nav className='flex flex-row flex-grow justify-between w-full p-5 primary-font-color'>
					<div className='flex items-center font-semibold text-lg'>
						<Link to='/dashboard' className='m-auto p-1'>
							<MdArrowBackIos size='1em'/>
						</Link>
					</div>
					<div className='flex justify-end gap-3 p-5 pr-0'>
						<button
							className="btn-utils btn-utils-create"
							onClick={() => setCreateModalOpen(true)}><FaPlus/><p>Créer une classe</p>
						</button>
					</div>
				</nav>
				<table className="w-full min-w-[550px] primary-font-color ">
					<thead className='w-full '>
						<tr className=" w-full text-left">
							<th className="pl-5 table-title ">Nom</th>
							<th className="table-title">élèves</th>
							<th className="table-title">Dernière partie</th>
							<th className="table-title text-right pr-5">Action</th>
						</tr>
					</thead>
					<tbody>
					{courses.map((classe,index) => (
						<ClassElement key={classe.id} index={index} classe={classe} onChange={() => loadClasses()}/>
					))}
					</tbody>
				</table>

				{createModalOpen && (
				<Modal setOpenModal={setCreateModalOpen}>
					<ModalHeader title="Créer une classe" />
					<ModalBody>
						<form className='flex flex-col justify-center items-end w-full gap-3 '>
							<div className='w-full pb-3'>
							<label htmlFor='name' className='form-label-style primary-font-color'>
								Nom de la classe
							</label>
							<input
								type='text'
								name='name'
								id='name'
								placeholder='Classe'
								onChange={(e) => setName(e.target.value)}
								className='form-inputfield-style  '/> 
							</div>
							<button
								type='submit'
								className='modal-validate-button-style bg-gradient-to-r from-[#4C49ED] to-[#0A06F4]'
								onClick={(event) => handleClickCreate(event)}>
								Créer
							</button>
							<button
								className='modal-cancel-button-style'
								onClick={() => setCreateModalOpen(false)}>
								Annuler
							</button>
						</form>
					</ModalBody>
				</Modal>)}
			</main>
		</LayoutProf>
	);
};

export default Class;
