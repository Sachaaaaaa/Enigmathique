import React, {useState} from 'react';
import PropTypes from 'prop-types';

const ListClassSelect = (props, {children}) => {
	const [selected, setSelected] = useState(false);
	const name = props.name;
	let buttonText;
	if (selected) {
		buttonText = 'Sélectionner';
	} else {
		buttonText = 'Désélectionner';
	}

	const handleClick = () => {
		setSelected(!selected);
	}

	return (
		<div>
			<p>Seconde {name}</p>
			{children}
			<button onClick={handleClick}>{buttonText}</button>
		</div>
	)
}

ListClassSelect.PropTypes = {
	name: PropTypes.string
};

export default ListClassSelect;