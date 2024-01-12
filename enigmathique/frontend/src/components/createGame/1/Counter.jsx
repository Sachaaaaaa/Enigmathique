import React from 'react';
import {useCreationGameContext} from "../../contexts/CreationGame.context";

const Counter = () => {

	const {formData, setFormData} = useCreationGameContext();

	const handleOnClickplus = () => {
		setFormData({...formData, teamSize: formData.teamSize + 1});
	};
	const handleOnClickminus = () => {
		formData.teamSize > 1 ? setFormData({...formData, teamSize: formData.teamSize - 1}) : setFormData({...formData, teamSize: 1});
	}
	return (
		<>
			<p className='block text-gray-700 text-sm font-bold mb-2'>
				Taille de l&apos;équipe
			</p>
			<div className='flex'>

				<button className='w-5 bg-blue-300 text-2xl rounded-l-lg'
						onClick={handleOnClickminus}>-
				</button>
				<p className=' text-2xl w-5 flex justify-center'>{formData.teamSize}</p>
				<button className='w-5 bg-blue-300 text-2xl rounded-r-lg'
						onClick={handleOnClickplus}>+
				</button>
			</div>
		</>
	);
}
export default Counter;
