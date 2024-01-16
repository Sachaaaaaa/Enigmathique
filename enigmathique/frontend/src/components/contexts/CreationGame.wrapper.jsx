import React from "react";
import { CreationGameDataProvider } from './CreationGame.context';
import CreateGame from '../../pages/CreateGame';

const CreateGameWrapper = () => {
	return (
		<CreationGameDataProvider>
			<CreateGame />
		</CreationGameDataProvider>
	);
};

export default CreateGameWrapper;