import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import { Helmet } from 'react-helmet';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Helmet>
			<meta charSet="utf-8"/>
			<title>Enigmathique</title>
			<meta name="description" content="Enigmathique est une plateforme ludo-éducative où des élèves de seconde peuvent s'entraîner en mathématiques"/>
			<meta name="keywords" content="enigmathique, mathématiques, seconde, jeu"/>
			<meta name="author" content="LogiGre Edutainment"/>
			<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
			<link rel="icon" href="/favicon.ico"/>
			<meta property="og:title" content="Enigmathique"/>
			<meta property="og:description" content="Enigmathique est une plateforme ludo-éducative où des élèves de seconde peuvent s'entraîner en mathématiques"/>
			<meta property="og:image" content="/preview.png"/>
			<meta property="og:url" content="http://localhost:3000"/>
		</Helmet>
		<BrowserRouter>
			<App/>
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
