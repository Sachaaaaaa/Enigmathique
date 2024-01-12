import React from "react";
import LayoutProf from "../layouts/LayoutProf";
import CreationGame1 from "../components/createGame/1/CreationGame1";
import ProgressBar from "../components/createGame/ProgressBar";
import {useCreationGameContext} from "../components/contexts/CreationGame.context";


const CreateGame = () => {

	//const [step, setStep] = useState(1);
	const {step} = useCreationGameContext();

	const stepComponent = {
		1: <CreationGame1/>
	}

	return (
		<LayoutProf>
			<main className="h-full w-full bg-[#f5f7fa]">
				<ProgressBar step={step}/>
				{stepComponent[step]}
			</main>
		</LayoutProf>
	);
}

export default CreateGame;