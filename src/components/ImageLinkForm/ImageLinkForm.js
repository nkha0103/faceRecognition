import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit, onGenerateImage }) => {
    return (
        <div>
            <p className='f3'>
                {'This Magic Brain will detect faces in your pictures. Give it a try'}
            </p>
            <div className='center flex-column items-center'>
                <button className='w-30 grow f4 link ph3 mv2 pv2 dib white bg-light-blue' onClick={onGenerateImage}>Generate Image</button>
                <div className='form center pa4 br3 shadow-5'>
                    <input id='inputValue' className='f4 pa2 w-70 center' type='text' placeholder='link to image or use Generate button' onChange={onInputChange} />
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onButtonSubmit}>Detect faces</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;