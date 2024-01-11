import React from 'react';
import PropTypes from 'prop-types';
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

function Modal({ setOpenModal, children, width=500, height=500 }) {
	// Faire en sorte que le modal se ferme lorsqu'on clique en dehors
	return (
		<div className='mt-0 absolute top-0 left-0 '>
			<div className='w-full h-full fixed backdrop-blur-sm top-0'>
				<div className={`w-[${width}px] h-[${height}px] relative m-auto bg-white rounded-lg shadow-2xl`}>
					{children}
				</div>
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
	width : PropTypes.string,
	height : PropTypes.string,
};

export { ModalHeader, ModalBody };
export default Modal;