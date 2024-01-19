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
		<section className="flex flex-col h-full w-1/3 gap-2">
			<section>
				<h1>Élèves</h1>
			</section>
			<section className="flex flex-col h-[90%] bg-white shadow p-2">
				<nav className="flex flex-row justify-center items-center gap-2 p-2">
					<FaSearch size={25} className='blue-font-color' />
					<input
						className="w-full p-2 bg-transparent"
						type="text"
						placeholder="Élève"
						onChange={handleSearch}
					/>
				</nav>
				<hr></hr>
				<section className="h-full overflow-y-scroll">
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

				</section>
			</section>
		</section>
	);
}
AvailableStudents.propTypes = {
	available: PropTypes.array.isRequired,
	teamSize: PropTypes.number.isRequired
}
export default AvailableStudents;