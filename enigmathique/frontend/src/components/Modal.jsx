import React from 'react';
import PropTypes from 'prop-types';
import useOutsideClick from '../hooks/useOutsideClick';
import '../index.css';

function ModalHeader({ children }) {
	return (
		<div className='w-full h-20 bg-blue-500 rounded-t-lg'>
			{children}
		</div>
	);
}

function ModalBody({ children }) {
	return (
		<div className='w-full h-full p-10'>
			{children}
		</div>
	);
}

function Modal({ setOpenModal, children }) {
	// Faire en sorte que le modal se ferme lorsqu'on clique en dehors


	return (
		<div className='w-full h-full fixed backdrop-blur-sm'>
			<div className='w-[500px] h-[500px] relative m-auto bg-white rounded-lg shadow-2xl'>
				{children}
			</div>
		</div>
	);
}

ModalHeader.propTypes = {
	children: PropTypes.node,
};

ModalBody.propTypes = {
	children: PropTypes.node,
};

Modal.propTypes = {
	setOpenModal: PropTypes.func,
	children: PropTypes.node,
};

export { ModalHeader, ModalBody };
export default Modal;