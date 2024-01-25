import React from 'react';
import PropTypes from 'prop-types';

const RoomSelector = ({rooms, selectedRoom, onChange}) => {
    return (
        <div className="relative">
            <select id="room-select" value={selectedRoom} onChange={onChange} 
                className="appearance-none bg-white border border-blue-color blue-font-color w-fit py-1 px-4 pr-6 rounded-full shadow-md-sm focus:outline-none">
                <option value="Global">Global</option>
                {rooms.map((room) => (
                    <option key={room.roomName} value={room.roomName}>{room.roomName}</option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 blue-font-color">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M5.5 7l5 5 5-5H5.5z" />
                </svg>
            </div>
		</div>
    );
}

RoomSelector.propTypes = {
    rooms: PropTypes.array,
    selectedRoom: PropTypes.string,
    onChange: PropTypes.func,
};

export default RoomSelector;