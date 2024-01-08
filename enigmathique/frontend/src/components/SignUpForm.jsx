import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom/client';

function SignUpForm() {
	const [inputs, setInputs] = useState({});

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs(values => ({...values, [name]: value}))
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		alert('la requete est soumise'+inputs);
	}

	return (
		<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="username"
					value={inputs.username || ''}
					placeholder='Prénom'
					onChange={handleChange}
				/>
				<input
					type="text"
					name="name"
					value={inputs.name || ''}
					onChange={handleChange}
					placeholder='nom'
				/>

			<input type="submit" />
		</form>
	)
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SignUpForm />);
export default SignUpForm;