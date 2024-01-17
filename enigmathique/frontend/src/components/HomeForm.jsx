import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import logo from '../assets/img/logo-name-nobg.png';
const HomeForm = () => {
	const [code, setCode] = useState('');

	const navigate = useNavigate();

	const handleValider = () => {
		//TODO: vérifier que le code est valide
		navigate(`/join/${code}`);
	};

	return (
		<div className="flex justify-center items-center h-screen bg-gradient-to-r from-[#343C6A]
						via-[#0A06F4] to-[#0599F5] animation">
							{/* bg-gradient-to-r from-[#EE7752]
						via-[#E73C7E] to-[#23A6D5] animation */}
			<div className="w-full max-w-md flex flex-col justify-center">
			<img src={logo} alt='logo'/>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="username"
					></label>
					<input
						type="text"
						id="code"
						name="code"
						value={code}
						onChange={(e) => setCode(e.target.value)}
						placeholder="Code PIN de la partie"
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						required
					/>
				</div>
				<div className="flex items-center justify-between">
					<button
						className=" w-full 
						 text-white font-semibold uppercase py-2 px-4 "
						type="submit"
						onClick={handleValider}
					>
						<span>Valider</span>
					</button>
				</div>
			</div>
		</div>
	);
};
export default HomeForm;
