import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Helmet>
			<meta charSet="utf-8" />
			{/* HTML Meta Tags */}
			<title>Enigmathique</title>
			<meta
				name="description"
				content="Enigmathique est une plateforme ludo-éducative où des élèves de seconde peuvent s'entraîner en mathématiques"
			/>

			{/*Facebook Meta Tags*/}
			<meta property="og:url" content="http://176.144.100.242:54872" />
			<meta property="og:type" content="website" />
			<meta property="og:title" content="Enigmathique" />
			<meta
				property="og:description"
				content="Enigmathique est une plateforme ludo-éducative où des élèves de seconde peuvent s'entraîner en mathématiques"
			/>
			{/*
  You can generate this image URL dynamically: https://ogcdn.net/6064b869-74ed-4eb9-b76c-0b701ffe7e6b/v4/{site_text}/{title_text}/{image_url}/og.png
  Replace the variables in the brackets with your own values and use this URL in the image tag below this comment. Ensure values are URL encoded.
  For more information, read: https://www.opengraph.xyz/blog/how-to-implement-dynamic-open-graph-images
*/}
			<meta
				property="og:image"
				content="https://ogcdn.net/6064b869-74ed-4eb9-b76c-0b701ffe7e6b/v4/176.144.100.242/Enigmathique/https%3A%2F%2Fopengraph.b-cdn.net%2Fproduction%2Fdocuments%2F535af243-0323-45e3-91de-229eb82c7c56.png%3Ftoken%3DXVPCCPIhbG6UBtxMH9o4DrUc-PVT_Tgk7ag9oEWdbxM%26height%3D385%26width%3D888%26expires%3D33242035223/og.png"
			/>

			{/* Twitter Meta Tags */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta property="twitter:domain" content="176.144.100.242" />
			<meta property="twitter:url" content="http://176.144.100.242:54872" />
			<meta name="twitter:title" content="Enigmathique" />
			<meta
				name="twitter:description"
				content="Enigmathique est une plateforme ludo-éducative où des élèves de seconde peuvent s'entraîner en mathématiques"
			/>
			{/*
  You can generate this image URL dynamically: https://ogcdn.net/6064b869-74ed-4eb9-b76c-0b701ffe7e6b/v4/{site_text}/{title_text}/{image_url}/og.png
  Replace the variables in the brackets with your own values and use this URL in the image tag below this comment. Ensure values are URL encoded.
  For more information, read: https://www.opengraph.xyz/blog/how-to-implement-dynamic-open-graph-images
*/}
			<meta
				name="twitter:image"
				content="https://ogcdn.net/6064b869-74ed-4eb9-b76c-0b701ffe7e6b/v4/176.144.100.242/Enigmathique/https%3A%2F%2Fopengraph.b-cdn.net%2Fproduction%2Fdocuments%2F535af243-0323-45e3-91de-229eb82c7c56.png%3Ftoken%3DXVPCCPIhbG6UBtxMH9o4DrUc-PVT_Tgk7ag9oEWdbxM%26height%3D385%26width%3D888%26expires%3D33242035223/og.png"
			/>

			{/*  Meta Tags Generated via https://www.opengraph.xyz */}
		</Helmet>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
