// ClassElem.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const ClassElem = (props) => {

    const rateCalc = (winRate) => {
        if(winRate<50) {
            return 'bas';
        } else if(winRate<80) {
            return 'moyen';
        } else {
            return 'haut';
        }
    }

    return (
        <article className="bg-white m-5 border-2 rounded-[30px] shadow-md w-full md:max-w-md xl:max-w-lg flex flex-col min-h-screen">
            <div className="p-5">
                <h3 className="text-lg font-semibold">NOM</h3>
                <p className="text-xl mb-4">Seconde {props.classGroup.name}</p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <h3 className="text-lg font-semibold">ÉLÈVES</h3>
                        <p className="text-xl">{props.classGroup.nbStudents}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">NOMBRE DE PARTIES JOUÉES</h3>
                        <p className="text-xl">{props.classGroup.nbGames}</p>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold">DERNIÈRE PARTIE</h3>
                    <p className="text-xl mb-4">{props.classGroup.lastGame}</p>
                </div>
            </div>

            {/* Div pour les statistiques avec un texte placeholder */}
            <div className="px-5 mt-auto">
                <p className="text-lg font-semibold mb-4">Taux de réussite {rateCalc(props.classGroup.winRate)} : {props.classGroup.winRate}%</p>
            </div>

            {/* Bouton "Voir" */}
            <Link className="btn-show">
                Voir
            </Link>
        </article>
    )
}

ClassElem.propTypes = {
    classGroup: PropTypes.object.isRequired
}

export default ClassElem;