import {Link} from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';

const GameElem = (props) => {
	return (
		<article className='grid grid-cols-2 gap-2 w-[48%] h-full mt-5 flex-wrap bg-white rounded-[30px] shadow-md '>
			<article className='col-span-2 pt-2 flex-grow elem-dashboard'>
				<h3 className='txt-dashboard'>Nom</h3>
				<p>{props.game.name}</p>
			</article>
			<article className='col-span-1 elem-dashboard'>
				<h3 className='txt-dashboard'>Classe</h3>
				<p>Seconde {props.game.className}</p>
			</article>
			<article className='col-span-1 elem-dashboard'>
				<h3 className='txt-dashboard'>Date</h3>
				<p>{props.game.date}</p>
			</article>
			<article className='col-span-1 elem-dashboard'>
				<h3 className='txt-dashboard'>Gagnants</h3>
				<p>{props.game.winners[0]} & {props.game.winners[1]}</p>
			</article>
			<article className='col-span-1 elem-dashboard'>
				<h3 className='txt-dashboard'>Taux de réussite</h3>
				<p>{props.game.winRate} %</p>
			</article>
			<Link to='' className='col-span-2 btn-show'>
				Voir
			</Link>
		</article>
	)
}

GameElem.propTypes = {
	game: PropTypes.object.isRequired
}

export default GameElem;