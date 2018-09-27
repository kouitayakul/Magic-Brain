import React from 'react';
import Tilt from 'react-tilt'
import brain from './brain100.png'
import './Logo.css'

const Logo = () => {
	return (
		<div className="ma4 mt0">
			<Tilt className="Tilt br2 shadow-5" options={{ max : 55 }} style={{ height: 180, width: 180 }} >
 				<div className="Tilt-inner pa3"> <img style={{paddingTop: '30px'}} alt='logo' src={brain}/> </div>
			</Tilt>
		</div>

	);
}

export default Logo;