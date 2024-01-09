import React, {useContext} from "react";
import PropTypes from "prop-types";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";

import AvailableContext from "./join/AvailableStudents.context";
import SelectedContext from "./join/SelectedStudents.context";

const Student = (props) => {

    const {available, setAvailable} = useContext(AvailableContext);
    const {selected, setSelected} = useContext(SelectedContext);
    const targetStudent = {
        name: props.name,
        firstname: props.firstname,
    }

    const handleState = () => {
        if (selected.length === props.teamSize && !props.isSelected) {
            alert("Vous avez atteint la taille maximale de l'équipe : "+props.teamSize);
            return;
        }
        if (available.some(student =>
        student.name === targetStudent.name && student.firstname === targetStudent.firstname)) {
            setAvailable(available.filter(student =>
                student.name !== targetStudent.name || student.firstname !== targetStudent.firstname));
            setSelected([...selected, targetStudent]);
        } else {
            setSelected(selected.filter(student =>
                student.name !== targetStudent.name || student.firstname !== targetStudent.firstname));
            setAvailable([...available, targetStudent]);
        }

    };


    return (
        <div className="flex flex-row items-center gap-10 justify-start p-4 bg-cyan-500 text-white rounded-xl">
            <p className="w-56">{props.firstname}</p>
            <p className="w-56">{props.name}</p>
            {props.isSelected ?
                <button className="p-2 bg-red-500 rounded-xl" onClick={handleState}>
                    <IoRemoveCircle size={25}/>
                </button>
                :
                <button className="p-2 bg-green-500 rounded-xl" onClick={handleState}>
                    <IoAddCircle size={25}/>
                </button>
            }
        </div>
    );
}
Student.propTypes = {
    name: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    teamSize: PropTypes.number,
}
export default Student;