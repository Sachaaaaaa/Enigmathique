import React from "react";
import PropTypes from "prop-types";
import Student from "../Student";

const SelectedStudents = (props) => {
    const color = props.selected.length === props.teamSize ? "text-green-500" : "text-red-500";
    return(
        <section className="w-5/12 border-2 border-dotted border-blue-800 rounded-xl">
            <section className="flex flex-col items-center p-2">
                <p className={color}>Taille équipe : {props.selected.length}/{props.teamSize}</p>
            </section>
            <section className="p-2">
                <div className="flex flex-col gap-2 p-4 h-[440px] overflow-y-scroll">
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