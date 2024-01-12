import {Link} from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';

const GameElem = (props) => {
	return (
		<article className='flex w-1/3 flex-wrap bg-white m-5 pt-1 border-2 rounded-[30px] shadow-md items-end'>
			<article className='flex-grow elem-dashboard'>
				<h3 className='txt-dashboard'>Nom</h3>
				<p>{props.game.name}</p>
			</article>
			<article className='elem-dashboard'>
				<h3 className='txt-dashboard'>Classe</h3>
				<p>Seconde {props.game.className}</p>
			</article>
			<article className='elem-dashboard'>
				<h3 className='txt-dashboard'>Date</h3>
				<p>{props.game.date}</p>
			</article>
			<article className='elem-dashboard'>
				<h3 className='txt-dashboard'>Gagnants</h3>
				<p>{props.game.winners[0]} & {props.game.winners[1]}</p>
			</article>
			<article className='elem-dashboard'>
				<h3 className='txt-dashboard'>Taux de réussite</h3>
				<p>{props.game.winRate} %</p>
			</article>
			<Link to='' className='btn-show'>
				Voir
			</Link>
		</article>
	)
}

GameElem.propTypes = {
	game: PropTypes.object.isRequired
}

export default GameElem;