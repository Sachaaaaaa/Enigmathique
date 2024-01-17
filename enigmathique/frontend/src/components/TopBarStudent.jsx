import React from "react";
import {FaGear} from "react-icons/fa6";
import {useParams} from "react-router-dom";
const TopBarStudent = () => {
	const {sessionId} = useParams();

	return (
		<section className="topbar-container pl-5 flex justify-between h-fit">
			<div className="flex flex-row h-24">
				<h1 className="text-[#343C6A] text-2xl font-semibold py-5">Session : {sessionId}</h1>
			</div>
			<div className="flex flex-row items-center gap-2">
				<div className="p-2 rounded-full bg-[#E6EFF5]">
					<FaGear color="#807FF7"/>
				</div>
			</div>
		</section>
	);
};

export default TopBarStudent;