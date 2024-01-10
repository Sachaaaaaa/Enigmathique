import React from "react";
import PropTypes from "prop-types";

const ClassElem = (props) => {
    return (
        <article>
            <article>
                <h3>NOM</h3>
                <p>{props.classGroup.name}</p>
            </article>
            <article>
                <h3>ELEVES</h3>
                <p>{props.classGroup.nbStudents}</p>
            </article>
            <article>
                <h3>DERNIERE PARTIE</h3>
                <p>{props.classGroup.lastGame}</p>
            </article>
            <article>
                <h3>NOMBRE DE PARTIES JOUEES</h3>
                <p>{props.classGroup.nbGames}</p>
            </article>
            <article>
                Graph
                {/*TODO : Intégration des graphes*/}
            </article>
        </article>
    )
}

ClassElem.propTypes = {
    classGroup: PropTypes.object.isRequired
}

export default ClassElem;