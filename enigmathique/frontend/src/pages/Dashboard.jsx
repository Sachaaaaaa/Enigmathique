import React from 'react';
import { Link } from "react-router-dom";
import SideBar from "../components/SideBar";

const Dashboard = () => {
    return (
        <div className="flex">
            <SideBar />
            <div className="flex"> {/*divs à changer si nécessaire*/}
                <h2>MON TABLEAU DE BORD</h2>
                <img src={""} alt="user-icon"/>
            </div>
            <div>
                <section className="flex">
                    <Link to="" className="w-1/2 border-2 drop-shadow-md m-1 hover:bg-gray-200"> {/*Lien vers la liste des parties*/}
                        <h3>Mes parties récentes</h3>
                        <Link to="">Partie du {/*date de la partie*/}  Seconde {/*libellé de la classe*/}</Link> {/*liens vers les parties spécifiques*/}
                        <Link to="">Partie du {/*date de la partie*/}  Seconde {/*libellé de la classe*/}</Link>
                        <Link to="">Partie du {/*date de la partie*/}  Seconde {/*libellé de la classe*/}</Link>
                    </Link>
                    <Link to="" className="w-1/2 border-2 drop-shadow-md m-1 hover:bg-gray-200">
                        <h3>Mes classes</h3>
                        <Link to="" className="hover:bg-gray-300">Seconde</Link>
                        <Link to="">Seconde</Link>
                        <Link to="">Seconde</Link>
                    </Link>
                </section>
                <section className="flex">
                    <Link to="" className="w-1/2 border-2 drop-shadow-md m-1 hover:bg-gray-200">
                        <h3>Proposition de salles</h3>
                        <Link to="">{/*nom de la salle*/}</Link>
                        <Link to="">{/*nom de la salle*/}</Link>
                        <Link to="">{/*nom de la salle*/}</Link>
                    </Link>
                    <Link to="" className="w-1/2 border-2 drop-shadow-md m-1 hover:bg-gray-200">
                        <h3>Meilleure classe</h3>
                        <div>
                            <div>
                                <p>{/*nombre de parties jouées*/} parties jouées</p>
                                <p>Temps moyen : {/*temps moyen de résolution des salles de la classe*/}</p>
                                <p>Nb moyen d{"'"}indices : {/*nb moyen d'indices utilisés par salle de la classe*/}</p>
                            </div>
                        </div>
                    </Link>
                </section>
            </div>
        </div>
    );
};

export default Dashboard;