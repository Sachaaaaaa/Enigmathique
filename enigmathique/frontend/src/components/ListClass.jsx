import React from "react";
import { Link } from "react-router-dom";
import PopupDelete from "./PopupDelete";

const ListClass = () => {
	const ObjectClass = [
		{
			name: "seconde A",
			id: 1,
			Eleves: ["samanta William", "samanta William", "samanta William"],
		},
		{
			name: "seconde B",
			id: 2,
			Eleves: ["samanta William", "samanta William", "samanta William"],
		},
		{
			name: "seconde C",
			id: 3,
			Eleves: ["samanta William", "samanta William", "samanta William"],
		},
		{
			name: "seconde C",
			id: 3,
			Eleves: ["samanta William", "samanta William", "samanta William"],
		},
		{
			name: "seconde C",
			id: 3,
			Eleves: ["samanta William", "samanta William", "samanta William"],
		},
		{
			name: "seconde C",
			id: 3,
			Eleves: ["samanta William", "samanta William", "samanta William"],
		},
		{
			name: "seconde C",
			id: 3,
			Eleves: ["samanta William", "samanta William", "samanta William"],
		},
		{
			name: "seconde C",
			id: 3,
			Eleves: ["samanta William", "samanta William", "samanta William"],
		},
	];
	//ouverture d'une popup pour voir les élèves de la classe

	return (
		<ul className="bg-blue-300 space-y-10">
			{ObjectClass.map((classe) => (
				<li
					key={classe.id}
					value={classe.name}
					className="bg-blue-700 flex h-10 p-1"
				>
					<h3 className="w-40 text-center">{classe.name}</h3>
					<Link to="/class/students">
						<button className="bg-green-300 w-40 border-2 border-green-900">
							Voir les élèves
						</button>
					</Link>
					<Link to="/">
						<button className="bg-amber-300 w-40 border-2 border-amber-900">
							Modifier la classe
						</button>
					</Link>
					<PopupDelete name={classe.name} type="class" />
				</li>
			))}
		</ul>
	);
};

export default ListClass;
