import React from 'react' ;
import PropTypes from 'prop-types';
import { MdCancel } from "react-icons/md";

import { Md3DRotation } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { BsFillDoorOpenFill } from "react-icons/bs";
import { IoMdTrophy } from "react-icons/io";
import { HiCursorClick } from "react-icons/hi"


const ruleDivClassname = "flex gap-2 primary-font-color" ; 
const Rules = ({onCloseClick}) => {
    return (

        <div className='z-[999] absolute bottom-0 right-0 p-5 shadow-md bg-white'

        >
            {/* Contenu de la fenêtre */}
            <h2> <strong>Aide</strong></h2>
            <div className={ruleDivClassname}>
                <BsFillDoorOpenFill style={{ height: '2em', width: '2em' }} />
                <p> Votre objectif ? Vous échappez de la pièce dans le temps imparti ! Dans chaque salle, cliquez sur la <strong>porte</strong> pour afficher le contexte.</p>
            </div>
            <div className={ruleDivClassname}>
                <Md3DRotation style={{ height: '2em', width: '2em' }} />
                <p> Vous pouvez tourner la salle en maintenant <strong>clic gauche</strong> et en déplaçant votre souris. 
                Déplacer la salle avec <strong>clic droit </strong> et zoomer avec la molette.</p>
            </div>
            <div className={ruleDivClassname}>
                <IoIosSearch style={{ height: '2em', width: '2em' }} />
                <p> Passez votre souris sur tous les éléments de la scène pour voir lesquels sont interactifs. Ceux-ci <strong> changent de couleur </strong>.
                    Certains éléments sont durs à trouver, ouvrez {"l'oeil !"} </p>
            </div>
            <div className={ruleDivClassname}>
                <IoMdTrophy style={{ height: '2em', width: '2em' }} />
                <p> Chaque bonne réponse vous fait gagner <strong>100 points</strong>, chaque mauvaise réponse vous fait perdre <strong>10 points</strong> et chaque indice vous fait perdre <strong>20 points.</strong>
                <strong> 500 points</strong> si vous sortez de la salle avant la fin du temps imparti. Evitez {"d'être"} dans le négatif {":)"}</p>
            </div>
            <div className={ruleDivClassname}>
                <HiCursorClick style={{ height: '2em', width: '2em' }} />
                <p>
                    Pour fermer une énigme ou une autre fenêtre vous pouvez appuyer sur 
                    la <strong>croix</strong> en bas ou <strong>rappuyer</strong> sur l&apos;objet cliqué.
                </p>
            </div>
            <div className='w-full flex justify-end'>
            <button onClick={onCloseClick} className='btn-action text-[#EF4565]'>
            <MdCancel style={{ height: '3em', width: '3em' }} /></button>
            </div>
		</div>

    )
}

Rules.propTypes = {
    onCloseClick: PropTypes.func.isRequired,
};

export default Rules ;