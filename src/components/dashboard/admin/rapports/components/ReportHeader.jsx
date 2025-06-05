//REACT IMPORT
import React from 'react';
//ASSETS IMPORT
import Logo from "../../../../../assets/logo-vector.svg";
//LIBRARY IMPORT
import PropTypes from 'prop-types';

/**
 * A component to display the header of the report with the logo and title
 * 
 * @param {{title: string}} props
 * @prop {string} title - the title of the report
 */
const ReportHeader = ({ title }) => {
    //RENDER
    return (
        <div className="header mb-5">
            <div className="logoPDF-container">
                <img src={Logo} alt="insightData logo" />
            </div>
            <h3>{title}</h3>
        </div>
    )
};

//PROPTYPES
ReportHeader.propTypes = {
    title: PropTypes.string
};

//EXPORT
export default ReportHeader;