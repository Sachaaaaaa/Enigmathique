import React from 'react';

import logo from '../assets/img/logo-enigmathique.png';
import {Link} from 'react-router-dom';

const Header = () => {
    return(
        <header className="flex">
            <img src={logo} alt="logo" className="h-24"/>
            <nav>
                <Link to="" className="">Tableau de Bord</Link>
                <Link to="">Créer une Partie</Link>
                <Link to="">Créer une Classe</Link>
                <Link to="">Voir les salles</Link>
            </nav>
        </header>
    );
};

export default Header;