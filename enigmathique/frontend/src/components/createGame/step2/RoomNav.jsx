import React from "react";
import '../createGame.css'
import SearchInput from "../../SearchInput";
import PropTypes from "prop-types";


const RoomNav = (props) => {
	return(			
			<section className="flex flex-row justify-center items-center">
				<label className={props.filter.chapter === 'suites'?'label-filter-selected':'label-filter'}>
					<input
						value='suites'
						type='radio'
						name='chapitre'
						className='hidden'
						checked={props.filter.chapter === 'suites'}
						onChange={props.chapterChange}
					/>
					Suites
				</label>
				<label className={props.filter.chapter === 'probabilites'?'label-filter-selected':'label-filter'}>
					<input
						value='probabilites'
						type='radio'
						name='chapitre'
						className='hidden'
						checked={props.filter.chapter === 'probabilites'}
						onChange={props.chapterChange}
					/>
					Probabilités
				</label>
				<label className={props.filter.chapter === 'fonctions'?'label-filter-selected':'label-filter'}>
					<input
						value='fonctions'
						type='radio'
						name='chapitre'
						className='hidden'
						checked={props.filter.chapter === 'fonctions'}
						onChange={props.chapterChange}
					/>
					Fonctions
				</label>
				<label className={props.filter.chapter === 'ensembles'?'label-filter-selected':'label-filter'}>
					<input
						value='ensembles'
						type='radio'
						name='chapitre'
						className='hidden'
						checked={props.filter.chapter === 'ensembles'}
						onChange={props.chapterChange}
					/>
					Ensembles
				</label>
			</section>
	);
}
RoomNav.propTypes = {
	chapterChange: PropTypes.func.isRequired,
	filter: PropTypes.object.isRequired,
}
export default RoomNav;