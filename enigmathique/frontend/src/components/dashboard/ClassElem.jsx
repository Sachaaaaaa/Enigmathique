// ClassElem.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(...registerables);

const ClassElem = (props) => {

	const data = {
		labels: ['Taux de réussite moyen'],
		datasets: [
			{
				label: 'Taux de réussite moyen',
				data: [props.classGroup.winRate],
				backgroundColor: 'green',
			}
		],
	}

	const options = {
		scales: {
			yAxes: [{
				gridLines: {
					drawBorder: false,
				},
			}]
		},
	}


	return (
		<article
			className='bg-white m-5 border-2 rounded-[30px] shadow-md w-full md:max-w-md xl:max-w-lg flex flex-col min-h-[700px]'>
			<div className='p-5'>
				<h3 className='txt-dashboard'>NOM</h3>
				<p className='mb-4'>Seconde {props.classGroup.name}</p>

				<div className='grid grid-cols-2 gap-4 mb-4'>
					<div>
						<h3 className='txt-dashboard'>ÉLÈVES</h3>
						<p className=''>{props.classGroup.nbStudents}</p>
					</div>
					<div>
						<h3 className='txt-dashboard'>NOMBRE DE PARTIES JOUÉES</h3>
						<p className=''>{props.classGroup.nbGames}</p>
					</div>
				</div>

				<div>
					<h3 className='txt-dashboard'>DERNIÈRE PARTIE</h3>
					<p className='mb-4'>{props.classGroup.lastGame}</p>
				</div>
			</div>

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