import React from 'react';
import '../index.css';
import SignUpForm from '../components/SignUpForm'
import ReactDOM from 'react-dom/client';

function SignUp(){

  return (

    <SignUpForm />

  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SignUp />);
export default SignUp;
