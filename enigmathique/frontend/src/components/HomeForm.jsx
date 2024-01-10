import React, {useState} from 'react';

const HomeForm = () =>  {

		const [code, setCode] = useState("");
		const [loading, setLoading] = useState(false);
		const [message, setMessage] = useState("");

		const handleValider = (e) => {
			// Empêcher le rechargement de la page
			e.preventDefault();
			// Réinitialiser le message d'erreur
			setMessage("");
			setLoading(true);
			alert("accès à la partie");
		};

		return (
			<div className="flex justify-center items-center h-screen">
				<div className="w-full max-w-md">
					<form
						onSubmit={handleValider}
						className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
					>
						<div className="mb-4">
							<label
								className="block text-gray-700 text-sm font-bold mb-2"
								htmlFor="username"
							>
							</label>
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
								disabled={loading}
							>
								{loading && (
									<span className="spinner-border spinner-border-sm"></span>
								)}
								<span>Valider</span>
							</button>
						</div>
						{message && (
							<div className="text-red-500 text-xs mt-2">{message}</div>
						)}
					</form>
				</div>
			</div>
		);

}
export default HomeForm;