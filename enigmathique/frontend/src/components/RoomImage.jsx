import React, { useState } from 'react';
import PropTypes from 'prop-types';
import image from 'assets/img/room-img/Laboratory.png';

const RoomImage = ({ name, className = "" }) => {

    const [imgSrc, setImgSrc] = useState('../assets/img/room-img/Laboratory.png');
    const handleError = (e) => {
        e.stopPropagation();
        setImgSrc("../assets/img/room-img/defaultroom.png");
    };
    return (				
        <figure className='col-span-2 relative h-[120px] rounded-t-[30px]'
        style={{
            backgroundImage: `url(${require('../assets/img/room-img/Laboratory.png')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
    <figcaption className='absolute text-white font-bold bottom-2 left-4'>{name}</figcaption>
</figure>
);
}

RoomImage.propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string
}

export default RoomImage;