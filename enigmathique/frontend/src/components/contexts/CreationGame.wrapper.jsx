import React from 'react';
import { CreationGameDataProvider } from 'components/contexts/CreationGame.context';
import CreateGame from '../../pages/CreateGame';

/**
 * Wrapper de la page de création de game
 * @returns {Element}
 * @constructor
 */
const CreateGameWrapper = () => {
	return (
		<CreationGameDataProvider>
			<CreateGame />
		</CreationGameDataProvider>
	);
};

export default CreateGameWrapper;