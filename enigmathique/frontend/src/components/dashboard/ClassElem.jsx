// ClassElem.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(...registerables);

const ClassElem = (props) => {

	const data = {
		labels: [''],
		datasets: [
			{
				label: 'Taux de réussite',
				data: [props.classGroup.winRate],
				backgroundColor: 'green',
			}
		],
	}

	const options = {
		barPercentage: 1,
		scales: {
			x: {
				display: false,
				suggestedMax: 100
			}
		},
		legend: {
			title: {
				display: false
			}
		},
		indexAxis: 'y',
		borderRadius: 20
	}


	return (
		<article
			className='info-container w-full md:max-w-md xl:max-w-lg '>
			<article className='col-span-2 pt-2 flex-grow elem-dashboard'>
				<h3 className='small-title'>NOM</h3>
				<p className='small-text'>Seconde {props.classGroup.name}</p>
			</article>
			<article className='col-span-2 pt-2 flex-grow elem-dashboard'>
				<h3 className='small-title'>ÉLÈVES</h3>
				<p className='small-text'>{props.classGroup.nbStudents}</p>
			</article>

			<article>
				<h3 className='small-title'>NOMBRE DE PARTIES JOUÉES</h3>
				<p className='small-text'>{props.classGroup.nbGames}</p>
			</article>

			<article>
					<h3 className='small-title'>DERNIÈRE PARTIE</h3>
					<p className='small-text'>{props.classGroup.lastGame}</p>
			</article>


			{/* Div pour les statistiques */}
			<Bar data={data} options={options}/>
			<div className='px-5 mt-auto'>
				<p className='text-lg font-semibold mb-4'>Taux de
					réussite moyen : {props.classGroup.winRate}%</p>
			</div>

			{/* Bouton 'Voir' */}
			<Link to='' className='btn-show'>
				Voir
			</Link>
		</article>
	)
}

ClassElem.propTypes = {
	classGroup: PropTypes.object.isRequired
}

export default ClassElem;