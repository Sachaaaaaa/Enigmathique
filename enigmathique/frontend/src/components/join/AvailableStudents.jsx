import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import Student from './Student';
import {FaSearch} from 'react-icons/fa';

const AvailableStudents = (props) => {

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
		<section className='w-5/12 border-2 border-blue-800 rounded-xl'>
			<section className='bg-blue-800/50 p-2 rounded-t-xl'>
				<nav
					className=' flex flex-row items-center justify-center bg-transparent border-2 border-blue-800 w-full rounded-xl p-2'>
					<input
						className='w-11/12 p-2 bg-transparent'
						type='text'
						placeholder='Élève'
						onChange={handleSearch}
					/>
					<button className='w-min p-2'><FaSearch size={25}/></button>
				</nav>
			</section>
			<section className='p-2'>
				<div className='flex flex-col gap-2 p-4 h-[440px] overflow-y-scroll'>
					{searchResult.map((student, index) => {
						return (
							<Student
								key={student.id}
								lastname={student.lastname}
								firstname={student.firstname}
								isSelected={false}
								teamSize={props.teamSize}
							/>
						);

					})}
				</div>
			</section>
		</section>
	);
}
AvailableStudents.propTypes = {
	available: PropTypes.array.isRequired,
	teamSize: PropTypes.number.isRequired
}
export default AvailableStudents;