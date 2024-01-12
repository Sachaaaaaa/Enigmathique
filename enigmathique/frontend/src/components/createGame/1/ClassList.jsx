import React from "react";
import {useCreationGameContext} from "../../contexts/CreationGame.context";
import PropTypes from "prop-types";

const ClassList = (props) => {
	const {formData, setFormData} = useCreationGameContext();
	return(
		<>
			<label htmlFor="courses" className="block mb-2 text-sm font-medium text-gray-700">Select an option</label>
			<select
				id="courses"
				className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
				onChange={(e) => setFormData({...formData, course: parseInt(e.target.value)})}
				value={formData.course}
			>
				<option value={0} disabled={true}>Choississez une classe</option>
				{props.classes.map((classe) => <option key={classe.id} value={classe.id}>{classe.name}</option>)}
			</select>
		</>
	);
}
ClassList.propTypes = {
	classes: PropTypes.object.isRequired,
};
export default ClassList;
