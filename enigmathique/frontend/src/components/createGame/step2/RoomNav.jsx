import React from "react";
import PropTypes from "prop-types";


const RoomNav = (props) => {

	const {selectedFilter, chapterChange} = props;

	const filtersMap = [
		{label: 'Fonctions',value: 'fonctions'},
		{label: 'Nombres et calculs',value: 'nombres'},
		{label: 'Probabilités',value: 'probabilités'},
		{label: 'Ensembles',value: 'ensembles'},
		{label: 'Géométrie',value: 'géométrie'},
	]

	return(
		<section className="flex flex-row justify-center items-center p-0">
			{filtersMap.map((filter,index) => (
				<label key={index} className={selectedFilter.chapter === filter.value ? 'label-filter-selected':'label-filter'}> 
					<input
						value={filter.value}
						type='radio'
						name='chapitre'
						className='hidden'
						checked={selectedFilter.chapter === filter.value}
						onChange={chapterChange}
					/>
					{filter.label}
				</label>
			))
			}
		</section>
			
	);
}
RoomNav.propTypes = {
	chapterChange: PropTypes.func.isRequired,
	selectedFilter: PropTypes.object.isRequired,
}
export default RoomNav;