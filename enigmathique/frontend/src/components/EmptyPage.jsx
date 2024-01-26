import React from 'react';
import { FiInbox } from 'react-icons/fi';
import PropTypes from 'prop-types';

/**
 * Affichage d'une liste lorsqu'elle est vide
 * @param title label de la page vide
 * @returns {Element}
 * @constructor
 */
const EmptyPage = ({title}) => {
    return (
        <section className='flex flex-col justify-center items-center w-full pt-[10%]'>
            <div className="w-fit h-fit border-2 border-dashed border-blue-color rounded-full" 
            >
                <div className='w-fit bg-purple-color rounded-full p-5 m-5'>
                    <FiInbox size={60} className='primary-font-color' />
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