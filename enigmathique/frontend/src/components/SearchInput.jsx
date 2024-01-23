import React from "react";
import {IconContext} from "react-icons";
import {FaSearch} from "react-icons/fa";
import PropTypes from "prop-types";

const SearchInput = (props) => {
	return(
		<section className='min-h-max flex flex-row items-center justify-center self-stretch bg-white rounded-full p-3 gap-2 shadow-md'>
				<FaSearch className="blue-font-color"/>
			<input
				type='text'
				placeholder='Rechercher'
				onChange={(event) => props.handleChangeText(event)}
				className="primary-font-color focus:border-transparent focus:outline-none "
			/>
		</section>
	);
}
SearchInput.propTypes = {
	handleChangeText: PropTypes.func.isRequired,
}
export default SearchInput;