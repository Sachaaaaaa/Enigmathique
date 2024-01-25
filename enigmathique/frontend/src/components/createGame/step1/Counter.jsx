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

	const btnClassname = 'grow text-xl text-white leading-10 shadow-md';
	return (
		<>
			<label className='form-label-style ' htmlFor="courses">
				{"Taille des équipes"}
			</label>
			<div className='flex flex-grow w-full h-fit shadow-md'>
				{/* Bouton pour diminuer la taille des équipes */}
				<button className={`${btnClassname} ${formData.teamSize<2?'bg-[#4c49ed]':'bg-blue-color'} rounded-l`}
						onClick={handleOnClickminus}
						disabled={formData.teamSize < 2}>
						-
				</button>
				<span className='grow-[2] self-stretch flex justify-center items-center bg-white text-lg border-y'>{formData.teamSize}</span>
				<button className={`${btnClassname} bg-blue-color rounded-r`}
						onClick={handleOnClickplus}>+
				</button>
			</div>
		</>
	);
}
export default Counter;
