import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<App/>
		</BrowserRouter>
	</React.StrictMode>
);

document.title = 'Enigmathique';
document.getElementsByTagName('meta').description = 'Enigmathique est un site ludo-éducatif qui permet aux élèves de seconde de s\'entrainer à la résolution d\'énigmes mathématiques.';
document.getElementsByTagName('meta').ogImage = 'preview.png';
document.getElementsByTagName('meta').ogTitle = 'Enigmathique';
document.getElementsByTagName('meta').ogDescription = 'Enigmathique est un site ludo-éducatif qui permet aux élèves de seconde de s\'entrainer à la résolution d\'énigmes mathématiques.';
//document.getElementsByTagName('meta').ogUrl = 'https://enigmathique.fr';
document.getElementsByTagName('meta').ogType = 'website';
document.getElementsByTagName('meta').ogLocale = 'fr_FR';
document.getElementsByTagName('meta').ogSiteName = 'Enigmathique';

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
