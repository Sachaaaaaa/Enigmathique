import React from "react";
import {useCreationGameContext} from "../../contexts/CreationGame.context";

const ClassList = () => {
	const {formData, setFormData, courses} = useCreationGameContext();
	return(
		<>
			<label className='form-label-style' htmlFor="courses">
				Classe
			</label>
			<select
				id="courses"
				className="form-inputfield-style"
				onChange={(e) => setFormData({...formData, course: parseInt(e.target.value)})}
				value={formData.course}>

				<option value={0} disabled={true} style={{color: '#343C6A'}}>Choisissez une classe</option>
				{courses.map((course,index) => <option key={index} value={course.id} style={{color: '#343C6A'}}>{course.name}</option>)}
			
			</select>
		</>
	);
}
export default ClassList;
