import React from 'react';
import PropTypes from 'prop-types';
import GameModel from 'models/game.model';
import Modal, { ModalBody, ModalHeader } from 'components/Modal';
import ActionButton from './ActionButton';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getRowColor } from 'components/ListManager';

const GameRow = ({ game, index, loadGames }) => {

    const maxTime = 600;
    
	const [scores, setScores] = useState([]);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

	const fetchData = async () => {
		try {
			const scoresData = await GameModel.getScores(game.id);
			setScores(scoresData);
		}catch (e) {
			console.log('erreur fetchData',e);
		}
	}
	
	useEffect(() => {
		fetchData();
	}, []);
	
	
	const getWinRate = () => {
		if (scores == null) return 0;
		let winRate = 0;
		const nbScore = scores.length;
		if(scores.length !== 0) {
			scores.forEach((score) => {
				score.isSolved && winRate++;
			});
			return Math.floor((winRate / nbScore) * 100);
		} else {
			return 0;
		}
	}

    const handleClickDelete = async (event, id) => {
		event.preventDefault();
		await toast.promise(
			GameModel.delete(id),
			{
				loading: 'Suppression...',
				success: "La partie a bien été supprimée",
				error: "Une erreur s'est produite",
			}
		);
		loadGames();
		setDeleteModalOpen(false);
	}

	let successRateLabel ;
    let isDetailsButtonDisabled = true;
    let leaderboardButtonLink ;
    let leaderboardButtonTitle = 'Classement' ;

	switch (game.state) {
		case 0:
			successRateLabel = "Partie non lancée" ;
            leaderboardButtonLink = `/pregame/${game.gameCode}`;
            leaderboardButtonTitle = 'Lancer' ;
			break ;
		case 1:
			successRateLabel = "Partie en cours" ;
            leaderboardButtonLink = `/leaderboard?sessionId=${game.gameCode}`;
			break ;
		case 2:
			successRateLabel = getWinRate()+'%' ;
            leaderboardButtonLink = `/ranking/${game.id}`;
            isDetailsButtonDisabled = false;
			break ;
	}

    return (
        <tr key={index} className={getRowColor(index)}>
            <td className="pl-5 td-style">
                {game.name}
            </td>
            <td className="td-style">{game.createdAt.toLocaleDateString('fr-FR')}</td>
            <td className="td-style">{game.idCourse}</td>
            <td className="td-style">{successRateLabel}</td>
            <td className="td-style text-right pr-5">
                <div className="space-x-3">
                <ActionButton 
                    title={leaderboardButtonTitle}
                    link={leaderboardButtonLink}
                />
                <ActionButton
                    title="Détails"
                    link={`/game/${game.id}`}
                    disabled={isDetailsButtonDisabled}
                />
                <ActionButton
                    title="Supprimer"
                    onClick={() => setDeleteModalOpen(true)}
                />
                </div>
            </td>
            {deleteModalOpen && (
            <Modal setOpenModal={setDeleteModalOpen}>
                <ModalHeader title="Supprimer une partie"/>
                <ModalBody>
                    <form className='flex flex-col text-center w-full gap-3'>
                        <p className=' block text-sm font-medium mb-5 primary-font-color'>Êtes-vous sûr de vouloir supprimer la partie {game.name} ?</p>
                        <button
                            type='submit'
                            className='modal-validate-button-style bg-[#ef4565] hover:bg-red-500'
                            onClick={(event) => handleClickDelete(event, game.id)}>
                            Supprimer
                        </button>
                        <button
                            className='modal-cancel-button-style'
                            onClick={() => setDeleteModalOpen(false)}>
                            Annuler
                        </button>
                    </form>
                </ModalBody>
            </Modal>)}
        </tr>
    )
}

GameRow.propTypes = {
    game: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    loadGames: PropTypes.func.isRequired,
};

export default GameRow;
