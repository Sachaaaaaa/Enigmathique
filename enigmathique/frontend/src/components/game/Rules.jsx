import React from 'react' ;
import PropTypes from 'prop-types';
import { MdCancel } from "react-icons/md";

import { Md3DRotation } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { BsFillDoorOpenFill } from "react-icons/bs";
import { IoMdTrophy } from "react-icons/io";
import { HiCursorClick } from "react-icons/hi"
import leftclick from "../../assets/img/mouse-img/clicgauche.png";
import rightclick from "../../assets/img/mouse-img/clicdroit.png";
import scroll from "../../assets/img/mouse-img/scroll.png";
import './game.css'
import { IconContext } from "react-icons";  


const Rules = ({onCloseClick}) => {
    return (

        <div className='z-[999] absolute bottom-0 right-0 p-5 shadow-md bg-white'
        >
            {/* Contenu de la fenêtre */}
            <IconContext.Provider
                value={{
                    color: '#0A06F4',
                }}
            >
            <section className='flex gap-3'>
                <article className="rule-article">
                    <h2 className="rule-title"> Déplacements</h2>
                    <div className="rule-div-content">
                        <img src={leftclick} alt="leftclick" width={40}/>
                        <p> <strong>Tournez</strong> la salle en maintenant clic gauche</p>
                    </div>
                    <div className="rule-div-content">
                        <img src={rightclick} alt="rightclick" width={40} />
                        <p> <strong>Déplacez</strong> la salle grâce au clic droit</p>               
                    </div>
                    <div className="rule-div-content">
                        <img src={scroll} alt="scroll" width={40}/>
                        <p> <strong>Zoomez</strong> avec la molette </p>               
                    </div>
                </article>

                <article className="rule-article">
                    <h2 className="rule-title"> Objectif </h2>
                    <div className="rule-div-content">
                        <div className="icon-rule-div">
                            <BsFillDoorOpenFill size='2em' />
                        </div>
                        <p> Votre objectif ? Vous <strong>échappez</strong> de la pièce dans le <strong>temps imparti</strong> ! Dans chaque salle, cliquez sur la <strong>porte</strong> pour afficher le contexte.</p>
                    </div>
                    <div className="rule-div-content">
                        <div className="icon-rule-div">
                            <IoMdTrophy  size='2em' />
                        </div>
                        <div>
                            <p> <span className='green-font-color font-medium' > +500 points </span> si vous sortez de la salle</p>
                            <p> <span className='green-font-color font-medium'> +100 points </span> par énigme résolue</p>
                            <p> <span className='red-font-color font-medium'>-10 points</span> par indice utilisé</p>
                            <p> <span className='red-font-color font-medium'> -20 points</span> par mauvaise réponse</p>
                        </div>
                    </div>
                </article>
                
                <article className="rule-article">
                    <h2 className="rule-title"> énigmes </h2>
                    <div className="rule-div-content">
                        <div className="icon-rule-div">
                            <IoIosSearch  size='2em' />
                        </div>
                        <p> Passez votre souris sur tous les <strong>éléments</strong> de la scène pour voir lesquels sont <strong>interactifs</strong>. Ceux-ci <strong> changent de couleur </strong>.
                            Certains éléments sont durs à trouver, ouvrez {"l'oeil !"} </p>
                    </div>
                    <div className="rule-div-content">
                        <div className="icon-rule-div">
                            <HiCursorClick  size='2em' />
                        </div>
                        <p>
                            Pour <strong>fermer</strong> une énigme ou une autre fenêtre vous pouvez appuyer sur 
                            la <strong>croix</strong> rouge ou <strong>rappuyer</strong> sur {"'objet"} cliqué.
                        </p>
                    </div>
                </article>
            </section>
            </IconContext.Provider>
            <div className='w-full flex justify-end'>
            <button className=' close-button'
								onClick={onCloseClick}><MdCancel size='4em'/></button>
            </div>
		</div>

    )
}

Rules.propTypes = {
    onCloseClick: PropTypes.func.isRequired,
};

export default Rules ;