import {Link} from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';

const GameElem = (props) => {
	return (
		<article className='grid grid-cols-2 gap-1 info-container'>
			<article className='col-span-2 pt-2 flex-grow elem-dashboard'>
				<h3 className='small-title'>Nom</h3>
				<p className='small-text'>{props.game.name}</p>
			</article>
			<article className='col-span-1 elem-dashboard'>
				<h3 className='small-title'>Classe</h3>
				<p className='small-text'>Seconde {props.game.className}</p>
			</article>
			<article className='col-span-1 elem-dashboard'>
				<h3 className='small-title'>Date</h3>
				<p className='small-text'>{props.game.date}</p>
			</article>
			<article className='col-span-1 elem-dashboard'>
				<h3 className='small-title'>Gagnants</h3>
				<p className='small-text'>{props.game.winners[0]} & {props.game.winners[1]}</p>
			</article>
			<article className='col-span-1 elem-dashboard'>
				<h3 className='small-title'>Taux de réussite</h3>
				<p className='small-text'>{props.game.winRate} %</p>
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