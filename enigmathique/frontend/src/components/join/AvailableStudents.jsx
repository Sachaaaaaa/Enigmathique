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
		<section className="relative join-list-container">
			<h2 className='medium-title uppercase'> Élèves</h2>
			<div className='absolute join-list'>
				<nav className="flex flex-row justify-center items-center gap-2 py-2 px-5 border-b border-white-color">
					<FaSearch size={25} className='blue-font-color' />
					<input
						className="w-full p-2 bg-transparent primary-font-color focus:border-transparent focus:outline-none "
						type="text"
						placeholder="Élève"
						onChange={handleSearch}
					/>
				</nav>
				<div className='overflow-y-auto'>
						{searchResult.map((student, index) => (
							<>
								<Student
									key={student.id}
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