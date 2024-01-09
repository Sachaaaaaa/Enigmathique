import React from 'react';
import { Link } from "react-router-dom";
import SideBar from "../components/SideBar";

const Dashboard = () => {
    return (
        <div>
            <SideBar/>
            <div> {/*divs à changer si nécessaire*/}
                <h2>MON TABLEAU DE BORD</h2>
                <img src={""} alt="user-icon"/>
            </div>
            <article>
                <h3>Mes parties récentes</h3>
                <Link to=""></Link>
                <Link to=""></Link>
                <Link to=""></Link>
            </article>
            <article>
                <h3>Mes classes</h3>
                <Link to="">Seconde</Link>
                <Link to="">Seconde</Link>
                <Link to="">Seconde</Link>
            </article>
            <article>
                <h3>Proposition de salles</h3>
                <Link to="">Seconde</Link>
                <Link to="">Seconde</Link>
                <Link to="">Seconde</Link>
            </article>
            <article>
                <h3>Meilleure classe</h3>
                <div></div>
            </article>
        </div>

    )
}

export default Dashboard;