import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonChange}) => {
	return (
		<div>
			<p className="f2">
				{'This Magic Brain will detect faces in your pictures. Give it a try!'}
			</p>
			<div className='center'>
				<div className='form center pa3 br3 shadow-5'>
					<input className="input f5 pa3 w-60 center shadow-5" placeholder='Insert your URL here...' type='text' onChange={onInputChange}/>
					<button className="button w-40 grow f3 link ph3 pv2 dib white bg-orange shadow-5" onClick={onButtonChange}>Detect</button>
				</div>
			</div>
		</div>
	);
}

export default ImageLinkForm;