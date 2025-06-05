//REACT IMPORT
import React from 'react';
//LIBRARY IMPORT
import PropTypes from 'prop-types';

/**
 * Render a list of points (li) from an object.
 *
 * @param {Object} points - An object with string values.
 *
 * @returns {ReactElement} A list of points.
 */
const ListPoints = ({ points }) => {    
    //RENDER
    if(!points) return null
    
    return (
        <ul>
            {Object.values(points).map((point, index) => (
                <li key={ index }>
                    { point }
                </li>
            ))}
        </ul>
    )
}

//PROPTYPES
ListPoints.propTypes = {
    points: PropTypes.object
};

//EXPORT
export default ListPoints;