import React from 'react';
import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <div>
            <div className="flex"> {/*divs à changer si nécessaire*/}
                <h2>MON TABLEAU DE BORD</h2>
                <img src={""} alt="user-icon"/>
            </div>
            <div>
                <section className="flex">
                    <article className="w-1/2 border-2 drop-shadow-md m-1">
                        <h3>Mes parties récentes</h3>
                        <Link to=""></Link>
                        <Link to=""></Link>
                        <Link to=""></Link>
                    </article>
                    <article className="w-1/2 border-2 drop-shadow-md m-1">
                        <h3>Mes classes</h3>
                        <Link to="">Seconde</Link>
                        <Link to="">Seconde</Link>
                        <Link to="">Seconde</Link>
                    </article>
                </section>
                <section className="flex">
                    <article className="w-1/2 border-2 drop-shadow-md m-1">
                        <h3>Proposition de salles</h3>
                        <Link to="">Seconde</Link>
                        <Link to="">Seconde</Link>
                        <Link to="">Seconde</Link>
                    </article>
                    <article className="w-1/2 border-2 drop-shadow-md m-1">
                        <h3>Meilleure classe</h3>
                        <div></div>
                    </article>
                </section>
            </div>
        </div>

    )
}

export default Dashboard;