import {Link} from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';

const GameElem = (props) => {
    return (
        <article>
            <article>
                <h3>NOM</h3>
                <p>{props.game.name}</p>
            </article>
            <article>
                <h3>CLASSE</h3>
                <p>Seconde {props.game.className}</p>
            </article>
            <article>
                <h3>DATE</h3>
                <p>{props.game.date}</p>
            </article>
            <article>
                <h3>GAGNANTS</h3>
                <p>{props.game.winners[0]} & {props.game.winners[1]}</p>
            </article>
            <article>
                <h3>TAUX DE REUSSITE</h3>
                <p>{props.game.winRate} %</p>
            </article>
            <Link to="">Voir</Link>
        </article>
    )
}

GameElem.propTypes = {
    game: PropTypes.object.isRequired
}

export default GameElem;