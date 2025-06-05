//REACT IMPORT
import React, { useMemo } from 'react';
//LIBRARY IMPORT
import PropTypes from 'prop-types';

/**
 * Decode a base64 image into a URL image.
 *
 * @param {object} base64Image - the base64 representation of the image
 * @param {...any} propos - additional properties for the image element
 * @return {JSX.Element} the image element with the specified URL and additional properties
*/
const ImageDecoder = ({ base64Image, alt, ...propos }) => {

    // Convertir l'image base64 en URL d'image
    const imageUrl = useMemo(() => {
        if(base64Image) {
            return `data:image/png;base64,${base64Image}`;
        }
    }, [base64Image]);  

    //RENDER
    return (
        <img src={imageUrl} alt={alt} {...propos} />
    );
};

//PROPTYPES
ImageDecoder.propTypes = {
    base64Image: PropTypes.string,
    alt: PropTypes.string
};

//EXPORT
export default ImageDecoder;