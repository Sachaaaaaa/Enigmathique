import React from "react";
import { PreGameDataProvider } from './PreGame.context';
import PreGame from '../../pages/PreGame';

const PreGameWrapper = () => {
	return (
		<PreGameDataProvider>
			<PreGame />
		</PreGameDataProvider>
	);
};

export default PreGameWrapper