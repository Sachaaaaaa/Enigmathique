import React from "react";
import {IconContext} from "react-icons";
import {FaSearch} from "react-icons/fa";
import PropTypes from "prop-types";

const SearchInput = (props) => {
	return(
		<section className='flex flex-row items-center justify-center bg-white rounded-full p-4 gap-2 shadow'>
			<IconContext.Provider value={{className: 'text-[#0a06f4]'}} >
				<FaSearch/>
			</IconContext.Provider>
			<input
				type='text'
				placeholder='Rechercher'
				onChange={props.handleChangeText}
				className="focus:border-transparent"
			/>
		</section>
	);
}
SearchInput.propTypes = {
	handleChangeText: PropTypes.func.isRequired,
}
export default SearchInput;