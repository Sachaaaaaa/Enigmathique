import React from 'react';
import PropTypes from 'prop-types';
import {useGLTF} from '@react-three/drei';


const GraphicItem = (props) => {
	const {scene} = useGLTF('models/' + props.name + '.glb');
	return <primitive object={scene}/>;
};

GraphicItem.propTypes = {
	name: PropTypes.string.isRequired,
};

export default GraphicItem;