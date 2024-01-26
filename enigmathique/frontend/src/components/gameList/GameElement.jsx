import ActionButton from "../dashboard/ActionButton";
import Modal, {ModalBody, ModalHeader} from "../Modal";
import React, {useState} from "react";
import toast from "react-hot-toast";
import Game from "../../models/game.model";
import PropTypes from "prop-types";

const GameElement = ({game, onChange, index}) => {

	const [deleteModalOpen, setDeleteModalOpen] = useState(false);

	const handleClickDelete = async (event, id) => {
		event.preventDefault();
		await toast.promise(
			Game.delete(id),
			{
				loading: 'Suppression...',
				success: "La partie a bien été supprimée",
				error: "Une erreur s'est produite",
			}
		);
		onChange();
		setDeleteModalOpen(false);
	}

	return (
		<>
			<tr key={index} className={`border-t border-[#CECDFD] ${index % 2 === 0 ? 'bg-[#EBECF9]' : 'bg-[#F1F3FA]'}`}>
				<td className="pl-5 td-style">
					{game.name}
				</td>
				<td className="td-style">{game.createdAt.toLocaleDateString('fr-FR')}</td>
				<td className="td-style">--</td>
				<td className="td-style">--%</td>
				<td className="td-style">--</td>
				<td className="td-style text-right pr-5">
					<div className="space-x-3">
						<ActionButton
							title="Classement"
							link={game.state === 2 ? `/ranking/${game.id}` : game.state === 0 ? `/pregame/${game.gameCode}` : `/leaderboard?idSession=${game.gameCode}`}
						/>
						<ActionButton
							title="Détails"
							link={`/game/${game.id}`}
							disabled={game.state !== 2}
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
									className='modal-delete-button-style bg-[#EF4565]'
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
		</>
	);
}

GameElement.propTypes = {
	game: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
}

export default GameElement;