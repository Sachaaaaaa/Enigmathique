import React from 'react';
import {useCreationGameContext} from "../../contexts/CreationGame.context";
import '../createGame.css'

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
			<p className='label-creation'>
				Taille de l&apos;équipe
			</p>
			<div className='flex w-full'>
				<button className={`w-1/3 ${formData.teamSize<2?'bg-[#4c49ed]':'bg-[#0a06f4]'} text-2xl text-white rounded-l-lg`}
						onClick={handleOnClickminus}
						disabled={formData.teamSize < 2}

				>-
				</button>
				<span className='bg-white border-y text-2xl w-1/3 flex justify-center'>{formData.teamSize}</span>
				<button className='w-1/3 bg-[#0a06f4] text-2xl text-white rounded-r-lg'
						onClick={handleOnClickplus}>+
				</button>
			</div>
		</>
	);
}
export default Counter;
