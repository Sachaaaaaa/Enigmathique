import React, { useEffect, useState } from 'react';
import termos from 'assets/img/termos.png';
import PropTypes from 'prop-types';

const TemperatureButton = ({ step, onClick, isSolved }) => {
    const rotationAngle = step < 0 ? -20: 20 ;
    const [currentAngle, setCurrentAngle] = useState(0);

    useEffect(() => {
        setCurrentAngle(currentAngle + rotationAngle);
    }, [onClick]);

    return (
        <div className='grow relative h-[100px] '>
            <div className="absolute top-[50%] left-[50%] flex flex-col justify-center items-center " style={{transform: `translate(-40%, -50%)` }}>
                <button disabled={isSolved} onClick={onClick} className='w-16 h-16 p-2 bg-black-color rounded-full cursor-pointer disabled:opacity-50'>
                    <img src={termos} alt="img Termos" style={{transform : `rotate(${currentAngle}deg)` }} />
                </button>
                <p className='text-white text-sm text-center'> {step < 0 ? "- ": "+ " }{step}</p>
            </div>
        </div>
    )
}

TemperatureButton.propTypes = {
    step: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    isSolved: PropTypes.bool.isRequired,
};

export default TemperatureButton;