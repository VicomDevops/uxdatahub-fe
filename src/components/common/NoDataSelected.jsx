//REACT IMPORT
import React from 'react';
//LIBRARY IMPORT
import PropTypes from 'prop-types';

/**
 * Displays a message when no data is selected
 * @param {{title: string}} props
 * @prop {string} title - The title to display
 * @returns {JSX.Element}
 */
const NoDataSelected = ({title}) => {
    //RENDER
    return (
        <div className="allDataResponseLoadersContainer">
            <span className="allDataResponseLoaders">
                {title}
            </span>
        </div>
    )
}

//PROPTYPES
NoDataSelected.propTypes = {
    title: PropTypes.string
};

//EXPORT
export default NoDataSelected;