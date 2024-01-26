import React from 'react';
import {useCreationGameContext} from 'components/contexts/CreationGame.context';
import { useState } from 'react';

/**
 * Composant qui affiche la liste des classes
 * @returns {Element}
 * @constructor
 */
const ClassList = () => {
	const {formData, setFormData, courses} = useCreationGameContext();
	const [isExpanded, setIsExpanded] = useState(false);
	return(
		<>
			<label className='form-label-style' htmlFor="courses">
				Classe 
			</label>
			<select
				onSelect={() =>setIsExpanded(!isExpanded)}
				id="courses"
				className="form-inputfield-style cursor-pointer"
				onChange={(e) => setFormData({...formData, course: parseInt(e.target.value)})}
				value={formData.course }>
				{/* {isExpanded ? <IoChevronUp /> : <IoChevronDown />} */}
				<option value={0} disabled={true} style={{color: '#343C6A'}}>
					Choisissez une classe
					
				</option>
				{courses.map((course,index) => <option key={index} value={course.id} style={{color: '#343C6A'}}>{course.name}</option>)}
			
			</select>
		</>
	);
};
export default ClassList;
