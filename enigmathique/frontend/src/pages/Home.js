import logo from '../assets/logo.svg';
import '../assets/App.css';
import { useEffect, useState } from 'react';

function Home() {
	// Requête à l'API "http://localhost:5000"
	// Afficher les données reçues

	const [data, setData] = useState("loading...");

	useEffect(() => {
		fetch('http://localhost:5000')
			.then(response => response.json())
			.then(data => setData(data.message))
			.catch(error => setData(error.message));
	});

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
					Message from backend: {data}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Home;
