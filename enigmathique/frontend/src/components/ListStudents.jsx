import React from "react";
import PopupDelete from "./PopupDelete";

const ListStudents = () => {
	const ObjectStudents = [
		{
			firstname: "Samanta",
			secondname: "William",
			id: 1,
			class: "seconde A",
		},
		{
			firstname: "Samanta",
			secondname: "William",
			id: 1,
			class: "seconde A",
		},
		{
			firstname: "Samanta",
			secondname: "William",
			id: 1,
			class: "seconde A",
		},
	];

	const MapStudents = () => {
		return ObjectStudents.map((student) =>
			<li key={student.id} value={student.firstname} className="bg-blue-700 flex h-10 p-1">
				<h3 className="w-40 text-center">{student.firstname}</h3>
				<h3 className="w-40 text-center">{student.secondname}</h3>
				<h3 className="w-40 text-center">{student.class}</h3>
				<button className="bg-green-300 w-40 border-2 border-green-900">voir statistiques</button>
				<button className="bg-amber-300 w-40 border-2 border-amber-900">Modifier élève</button>
				<PopupDelete firstname={student.firstname} secondname={student.secondname} type="student"/>
			</li>
		);
	}

	return (
		<ul className="bg-blue-300 space-y-10">
			<MapStudents/>
		</ul>
	);
}
export default ListStudents;