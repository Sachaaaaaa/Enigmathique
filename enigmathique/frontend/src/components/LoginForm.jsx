import React, {useState} from 'react';

const LoginForm = () => {
	const [inputs, setInputs] = useState({});

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs((values) => ({...values, [name]: value}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		alert('la requete est soumise' + inputs);
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Email :
				<input
					type='email'
					name='email'
					value={inputs.email || ''}
					onChange={handleChange}
				/>
			</label>
			<label>
				Mot de Passe :
				<input
					type='password'
					name='password'
					value={inputs.password || ''}
					onChange={handleChange}
				/>
			</label>
			<input type='submit'/>
		</form>
	);
};

export default LoginForm;
