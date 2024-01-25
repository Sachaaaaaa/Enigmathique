import React from 'react';
import { FiInbox } from "react-icons/fi";
import PropTypes from 'prop-types';

const EmptyPage = ({title}) => {
    return (
        <section className='flex flex-col justify-center items-center'
        style={{position: "absolute", left: "50%", transform: "translate(-40%,50%)"
                }}>
            <div className="w-fit h-fit border-2 border-dashed border-blue-color rounded-full" 
            >
                <div className='w-fit bg-purple-color rounded-full p-5 m-7'>
                    <FiInbox size={75} className='primary-font-color' />
                </div>
            
            </div>
            <h1 className='p-3 primary-font-color text-lg font-medium'>{title}</h1>
        </section>
    );
}

EmptyPage.propTypes = {
    title: PropTypes.string.isRequired,
}
export default EmptyPage;