import React from "react";
import PropTypes from "prop-types";
import {IoRemoveCircle, IoCheckmarkCircleOutline} from "react-icons/io5";

const Team = (props) => {
    return (
        <div className="flex flex-row items-center gap-10 justify-start p-4 bg-cyan-500 text-white rounded-xl">
            <p className="w-56">{props.name}</p>
            {props.isValidated ?
                {/*Quand la team est validé*/}
                :
                <div>
                    <button className="p-2 bg-green-500 rounded-xl" onClick="">
                        <IoCheckmarkCircleOutline size={25}/>
                    </button>
                    <button className="p-2 bg-red-500 rounded-xl" onClick="">
                        <IoRemoveCircle size={25}/>
                    </button>
                </div>

            }
        </div>
    );
}

Team.propTypes = {
    name: PropTypes.string.isRequired,
    students: PropTypes.array.isRequired,
    isValidated: PropTypes.bool.isRequired,
}
export default Team;