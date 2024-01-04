import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Routes,
	Link
} from "react-router-dom";
import './assets/index.css';
import Home from './pages/Home';
import reportWebVitals from './reportWebVitals';

function PageDoesNotExist() {
	return (
		<div>
			<h1>Page does not exist</h1>
			<p>Sorry, the page you are looking for does not exist.</p>
		</div>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="*" element={<PageDoesNotExist />} />
			</Routes>
		</Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
