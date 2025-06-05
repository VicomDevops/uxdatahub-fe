//REACT IMPORT
import React from 'react';
//LIBRARY IMPORT
import PropTypes from 'prop-types';
//COMPONENTS IMPORT
import Favorite from './favorite';

/**
 * DashboardHeader is a component that displays a header bar
 * with a Favorite component and other children components
 * passed as props.
 *
 * @param {React.ReactNode} children - Children components
 * to be displayed in the header bar.
 */
const DashboardHeader = ({ children }) => {
    //RENDER
    return (
        <div className="header-component-container">
            <Favorite />
            { children }
        </div>
    )
}

//PROPTYPES
DashboardHeader.propTypes = {
    children: PropTypes.node.isRequired
};

//EXPORT
export default DashboardHeader;