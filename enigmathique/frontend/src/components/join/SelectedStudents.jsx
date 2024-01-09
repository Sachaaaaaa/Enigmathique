import React from "react";
import PropTypes from "prop-types";
import Student from "../Student";

const SelectedStudents = (props) => {
    return(
        <section className="w-5/12 border-2 border-dotted border-blue-800 rounded-xl">
            <nav className="flex flex-col items-center p-2">
                <input
                    className="border-2 border-blue-800 rounded-xl w-1/2 p-2"
                    type="text"
                />
                <p>Taille équipe : {props.teamSize}</p>
            </nav>
            <section className="p-2">
                <div className="flex flex-col gap-2 p-4 h-[500px] overflow-y-scroll">
                    {props.selected.map((student, index) => {
                        return(
                            <Student
                                key={index}
                                name={student.name}
                                firstname={student.firstname}
                                isSelected={true}
                            />
                        );

                    })}
                </div>
            </section>
        </section>
    );
}
SelectedStudents.propTypes = {
    selected: PropTypes.array.isRequired,
    teamSize: PropTypes.number.isRequired
}
export default SelectedStudents;