import React, {useState} from 'react';

const Counter = () => {

	const [count, setCount] = useState(1);
	const handleOnClickplus = () => {
		setCount(count + 1);
	};
	const handleOnClickminus = () => {
		count > 1 ? setCount(count - 1) : setCount(1);
	}
	return (
		<div className='flex'>

			<button className='w-5 bg-blue-300 text-2xl rounded-l-lg'
					onClick={handleOnClickminus}>-
			</button>
			<p className=' text-2xl w-5 flex justify-center'>{count}</p>
			<button className='w-5 bg-blue-300 text-2xl rounded-r-lg'
					onClick={handleOnClickplus}>+
			</button>
		</div>
	);
}
export default Counter;
