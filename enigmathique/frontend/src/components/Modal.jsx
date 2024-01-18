import React from 'react';
import PropTypes from 'prop-types';
import '../index.css';

function ModalHeader({title}) {
	return (
		<div className='w-full bg-white rounded-t-lg flex flex-col justify-center items-start border-b-2 box-border border-white-color'>
			<h1 className='text-xl font-semibold primary-font-color text-center p-5'>{title}</h1>
		</div>
	);
}

function ModalBody({children}) {
	return (
		<div className='w-full h-full p-5'>
			{children}
		</div>
	);
}

function Modal({setOpenModal, children, width = 400, height = 300}) {
	// setOpenModal sert a fermer le modal quand on clique en dehors du modal
	// Faire en sorte que le modal se ferme lorsqu'on clique en dehors
	return (
		<div className='mt-0 absolute top-0 left-0 '>
			<div className='w-full h-full fixed backdrop-blur-sm flex items-center'>
				<div className={`p-auto main-background-color relative rounded-lg shadow-2xl mx-auto h-fit `} style={{width: `${width}px`}}>
					{children}
				</div>
			</div>
		</div>
	);
}

ModalHeader.propTypes = {
	title: PropTypes.node,
};

ModalBody.propTypes = {
	children: PropTypes.node,
};

Modal.propTypes = {
	setOpenModal: PropTypes.func,
	children: PropTypes.node,
	width: PropTypes.string,
	height: PropTypes.string,
};

export {ModalHeader, ModalBody};
export default Modal;