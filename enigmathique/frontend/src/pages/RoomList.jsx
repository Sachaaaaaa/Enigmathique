import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import LayoutProf from '../layouts/LayoutProf';

import { Mafs, Coordinates } from "mafs";



const RoomList = () => {

    const data = [

    ]

    return (
        <LayoutProf>
        <Mafs
        viewBox={{ x: [-10, 10], y: [-2, 2] }}>
      <Coordinates.Cartesian />
        </Mafs>
        </LayoutProf>
    );
}

export default RoomList;