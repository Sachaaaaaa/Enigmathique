import React from "react";
import { useState } from "react";
import AuthService from "../services/auth.service";

const SignupForm = () => {
	const [firstname, setFirstname] = useState("");
	const [secondname, setSecondname] = useState("");
	const [mail, setMail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	const handleRegister = (e) => {
	// Empêcher le rechargement de la page
		e.preventDefault();
		// Réinitialiser le message d'erreur
		setMessage("");
		setLoading(true);

		// Envoie des données de connexion à l'API
		AuthService.register(firstname,secondname,mail,password).then(
			() => {
				// Redirection vers la page d'accueil
				window.location.href = "/";
			},
			(error) => {
				// Gestion des erreurs
				const resMessage =
					(error.response &&
						error.response.data &&
						error.response.data.message) ||
					error.message ||
					error.toString();
				setLoading(false);
				setMessage(resMessage);
			}
		);
	};
	return (
		<div className="flex justify-center items-center h-screen">
			<div className="w-full max-w-md">
				<form
					onSubmit={handleRegister}
					className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="username">
							Prénom
						</label>
						<input
							type="text"
							id=""
							name="firstname"
							value={firstname}
							onChange={(e) => setFirstname(e.target.value)}
							placeholder="Prénom"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							required/>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="name">
							Nom
						</label>
						<input
							type="text"
							id=""
							name="secondname"
							value={secondname}
							onChange={(e) => setSecondname(e.target.value)}
							placeholder="Nom"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							required/>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="name">
							Email
						</label>
						<input
							type="email"
							id=""
							name="mail"
							value={mail}
							onChange={(e) => setMail(e.target.value)}
							placeholder="Jean@test.test"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							required/>
					</div>

					<div className="mb-6">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="password">
							Password
						</label>
						<input
							type="password"
							id="password"
							name="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="******************"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							required/>
					</div>
					<div className="flex items-center justify-between">
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="submit"
							disabled={loading}>
							{loading && (
								<span className="spinner-border spinner-border-sm"></span>
							)}
							<span>Register</span>
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

export default SignupForm;
