import React from 'react';
import { Toaster } from 'react-hot-toast';

/**
 * Notification gérant les toasters
 * @returns {Element}
 * @constructor
 */
const Notification = () => {
    return (       
        <Toaster
        duration={200}
        containerStyle={{
            top: 100,
            }} 
        toastOptions={{
            style: {
                width: 'max-content',
            },
            }}
        />
    )
}

export default Notification;