import React, {useState} from 'react';
import Counter from './Counter';
import {Link} from 'react-router-dom';

const GameCreationForm = () => {

	const [gameName, setGameName] = useState('');
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');


	const ListClass = () => {
		const classes = ['seconde A', 'seconde B', 'seconde C'];
		return classes.map((classe) => <option key={classe} value={classe}>{classe}</option>);
	};

	const handleSuivant = (e) => {
		// Empêcher le rechargement de la page
		e.preventDefault();
		// Réinitialiser le message d'erreur
		setMessage('');
		setLoading(true);
		alert('accès à la page suivante');
	};

	return (
		<div className='flex justify-center items-center h-screen'>
			<div className='w-full max-w-md'>
				<form
					onSubmit={handleSuivant}
					className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
				>
					<div className='mb-4'>
						<label
							className='block text-gray-700 text-sm font-bold mb-2'
							htmlFor='gameName'
						>
							Nom de la partie
						</label>
						<input
							type='text'
							id='gameName'
							name='gameName'
							value={gameName}
							onChange={(e) => setGameName(e.target.value)}
							placeholder='Entrer le nom'
							className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							required
						/>
					</div>
					<div className='mb-4'>
						<label
							className='block text-gray-700 text-sm font-bold mb-2'
							htmlFor='TailleEquipe'
						>
							Classe
						</label>
						<select>
							<ListClass/>
						</select>
					</div>
					<div className='mb-4'>
						<label
							className='block text-gray-700 text-sm font-bold mb-2'
							htmlFor='username'
						>Taille de l&apos;équipe
						</label>
						<Counter/>
					</div>
					<div className='flex items-center justify-between'>
						<Link to='../creationgame2'>
							<button
								className='bg-red-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full'
								type='submit'
								disabled={loading}
							>
								{loading && (
									<span className='spinner-border spinner-border-sm'></span>
								)}
								<span>Valider</span>
							</button>
						</Link>
					</div>
					{message && (
						<div className='text-red-500 text-xs mt-2'>{message}</div>
					)}
				</form>
			</div>
		</div>
	);

};

export default GameCreationForm;