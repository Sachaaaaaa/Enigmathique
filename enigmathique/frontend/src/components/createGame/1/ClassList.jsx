import React from "react";
import {useCreationGameContext} from "../../contexts/CreationGame.context";

const ClassList = () => {
	const {formData, setFormData, courses} = useCreationGameContext();
	return(
		<>
			<label
				className='label-creation'
				htmlFor="courses"
			>
				Classe
			</label>
			<select
				id="courses"
				className="data-selection"
				onChange={(e) => setFormData({...formData, course: parseInt(e.target.value)})}
				value={formData.course}
			>
				<option value={0} disabled={true}>Choississez une classe :</option>
				{courses.map((course) => <option key={course.id} value={course.id}>{course.name}</option>)}
			</select>
		</>
	);
}
export default ClassList;
