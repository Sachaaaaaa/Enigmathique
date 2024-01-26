import React from 'react';
import PropTypes from 'prop-types';
import SideBar from 'components/SideBar';
import TopBarProf from 'components/TopBarProf';

/**
 * Layout pour les professeurs
 * @param props
 * @returns {Element}
 * @constructor
 */
const LayoutProf = (props) => {
	return (
		// Ecran entier
		<div className='flex h-screen w-screen overflow-hidden'>

			{/* Menu latéral (width 1/6) */}
			<SideBar/>

			{/* TopBar et contenu (width 5/6) */}
			<div className='flex flex-col flex-grow w-5/6 min-h-screen overflow-x-auto'>
				<TopBarProf title={props.title} id={props.id}/>
				{props.children}
			</div>
		</div>
	);
};
LayoutProf.propTypes = {
	children: PropTypes.node.isRequired,
	title: PropTypes.string.isRequired,
	id: PropTypes.number,
};
export default LayoutProf;