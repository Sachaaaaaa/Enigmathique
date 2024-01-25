import React from 'react';
import AuthHeader from "components/AuthHeader";
import InfoCGUElem from "components/InfoCGUElem";

const CGU = () => {

	return(
		<div className='fullscreen-container overflow-y-auto'>
			<AuthHeader title="Conditions Générales d'Utilisation"/>
			<InfoCGUElem title='1. Introduction'>
				Bienvenue sur Enigmathique, une application web ludique et éducative. En utilisant Enigmathique,
				vous acceptez d&apos;être lié par ces Conditions Générales d&apos;Utilisation (CGU).
			</InfoCGUElem>
			<InfoCGUElem title="2. Utilisation d'Enigmathique">
				Création de Compte : Seuls les enseignants sont autorisés à créer un compte.
				Ils peuvent ensuite créer des classes virtuelles et ajouter des élèves,
				soit avec les vrais noms (avec accord parental), soit avec des pseudonymes.
				<br></br>
				Déroulement des Parties : Les enseignants peuvent lancer des parties,
				générer des codes d&apos;accès pour les élèves, et suivre les progrès des équipes en temps réel.
				Les élèves rejoignent les parties en utilisant ces codes et participent en résolvant des énigmes mathématiques.
			</InfoCGUElem>
			<InfoCGUElem title='3. Contenu et Propriété Intellectuelle'>
				Droits sur l&apos;Application : Le contenu et les fonctionnalités d&apos;Enigmathique sont la propriété de
				LogiGre Edutainment et sont protégés par les lois sur la propriété intellectuelle.
			</InfoCGUElem>
			<InfoCGUElem title='4. Confidentialité et Données Personnelles'>
				Protection des Données des Élèves : Nous prenons la confidentialité très au sérieux,
				notamment concernant les données des élèves. Notre Politique de Confidentialité détaille notre approche
				en matière de collecte, d&apos;utilisation et de protection des données personnelles.
				<br></br>
				Utilisation de Cookies : Enigmathique utilise des cookies pour améliorer l&apos;expérience utilisateur.
			</InfoCGUElem>
			<InfoCGUElem title='5. Limitation de Responsabilité'>
				Exclusions : Enigmathique ne peut être tenu responsable des dommages indirects liés à l&apos;utilisation
				de l&apos;application.
				<br></br>
				Indemnisation : Les utilisateurs s&apos;engagent à indemniser LogiGre Edutainment de toute réclamation liée
				à une utilisation inappropriée de l&apos;application.
			</InfoCGUElem>
			<InfoCGUElem title='6. Modifications des CGU'>
				Mises à Jour : Ces CGU peuvent être modifiées. Les utilisateurs seront informés de tout changement important.
			</InfoCGUElem>
			<InfoCGUElem title='7. Dispositions Générales'>
				Droit Applicable et Juridiction : Ces CGU sont régies par le droit français.
				Les litiges seront soumis aux tribunaux compétents en France.
			</InfoCGUElem>
			<p className='m-4 pl-[172px] text-[14px]'>Contact : Pour toute question, veuillez nous contacter à contact@enigmatique.fr</p>
		</div>
)
}

export default CGU;