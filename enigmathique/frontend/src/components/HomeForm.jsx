import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

const HomeForm = () => {
	const [code, setCode] = useState('');

	const navigate = useNavigate();

	const handleValider = () => {
		//TODO: vérifier que le code est valide
		navigate(`/join/${code}`);
	};

	return (
		<div className="flex justify-center items-center h-screen">
			<div className="w-full max-w-md">
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
						className="bg-red-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
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
