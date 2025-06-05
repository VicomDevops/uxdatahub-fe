//REACT IMPORT
import React from 'react';
//LIBRARY IMPORT
import PropTypes from 'prop-types';

/**
 * A React functional component that renders a vertical bar with a text label.
 * The bar has a "green-bar" class, and the text is rotated vertically with
 * a "vertical-text" class, displaying the label "Audit Flash".
 * 
 * @returns {JSX.Element} A div element containing a vertically oriented text.
 */
const ReportVerticalBar = ({ data, className }) => {
    //RENDER
    return (
        <div className={`green-bar ${className}`}>      
            <span className="bar-vertical-text">{ data }</span>
        </div>
    )
}

//PROPTYPES
ReportVerticalBar.propTypes = {
    data: PropTypes.string,
    className: PropTypes.string
};

//EXPORT
export default ReportVerticalBar;