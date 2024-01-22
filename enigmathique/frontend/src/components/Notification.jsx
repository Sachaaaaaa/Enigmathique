import React from 'react';
import { Toaster } from 'react-hot-toast';

const Notification = () => {
    return (       
        <Toaster
        duration={200}
        containerStyle={{
            top: 100,
            left: 20,
            bottom: 20,
            right: 20,
            }} 
        />
    )
}

export default Notification;