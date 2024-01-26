import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import Student from './Student';
import {FaSearch} from 'react-icons/fa';

const 	AvailableStudents = (props) => {

	const [searchResult, setSearchResult] = React.useState(props.available);
	const [search, setSearch] = React.useState('');

	const handleSearch = (event) => {
		setSearch(event.target.value);
	};

	useEffect(() => {
		if (search === '') {
			setSearchResult(props.available);
		} else {
			setSearchResult(props.available.filter(student =>
				student.lastname.toLowerCase().includes(search.toLowerCase()) || student.firstname.toLowerCase().includes(search.toLowerCase())));
		}
	}, [search, props.available]);
	
	return (
		<section className="relative pregame-join-list-container">
			<h2 className='medium-title uppercase'> Élèves</h2>
			<div className='absolute pregame-join-list'>
				<nav className="join-list-header">
					<FaSearch size={25} className='blue-font-color' />
					<input
						className="join-input "
						type="text"
						placeholder="Élève"
						onChange={handleSearch}
					/>
				</nav>
				<div className='overflow-y-auto'>
						{searchResult.map((student, index) => (
							<>
								<Student
									index={index}
									key={index}
									id={student.id}
									lastname={student.lastname}
									firstname={student.firstname}
									isSelected={false}
								/>
								{index!==searchResult.length-1 && <hr></hr>}
							</>
						))}
				</div>
			</div>
		</section>
	);
}
AvailableStudents.propTypes = {
	available: PropTypes.array.isRequired,
	teamSize: PropTypes.number.isRequired
}
export default AvailableStudents;