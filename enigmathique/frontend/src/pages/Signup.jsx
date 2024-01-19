import React from 'react';
import SignupForm from '../components/SignupForm';
import '../index.css';
import AuthHeader from 'components/AuthHeader';


function Signup() {
	return (
		<div className='h-screen w-screen'>
			<AuthHeader title="Inscription"/>
			<SignupForm/>
		</div>);
}


export default Signup;
