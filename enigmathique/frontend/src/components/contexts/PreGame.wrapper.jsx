import React, {useEffect} from "react";
import { PreGameDataProvider } from './PreGame.context';
import PreGame from '../../pages/PreGame';
import GameModel from "../../models/game.model";
import {useNavigate, useParams} from "react-router-dom";

const PreGameWrapper = () => {
	const navigate = useNavigate();
	const { sessionId } = useParams();
	const checkIfSessionIdExists = async () => {
		const games = await GameModel.getAll();
		if (games === undefined) {
			navigate('/dashboard');
			return;
		}
		for (const game of games) {
			if (game.gameCode === sessionId) {
				if (game.state === 0) {
					return;
				} else {
					navigate('/dashboard');
					return;
				}
			}
		}
		navigate('/dashboard');
	};
	useEffect(() => {
		checkIfSessionIdExists();
	}, []);
	return (
		<PreGameDataProvider>
			<PreGame />
		</PreGameDataProvider>
	);
};

export default PreGameWrapper