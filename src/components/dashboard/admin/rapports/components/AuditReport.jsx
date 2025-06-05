//REACT IMPORT
import React from 'react';
//COMPONENT IMPORT
import AuditReportContainer from './AuditReportContainer';
import ImageDecoder from '../../../../common/ImageDeoder';
//LIBRARY IMPORT
import PropTypes from 'prop-types';

/**
 * A React component that displays a detailed UX audit report based on the provided data?
 * It includes client information, main entity notes, strong points, areas for improvement, 
 * brief recommendations, and competitor analysis. A PDF of the report can be downloaded by 
 * clicking a button, with a loading spinner shown during the PDF generation process.
 * 
 * @param {Object} props - The component props.
 * @param {Object} props.data? - The data? used to populate the report.
 * @param {number} props.nbPage - The number of the page in the PDF report.
 * @param {string} props.clientName - The name of the client for whom the report is generated.
 * 
 * @returns {JSX.Element} The rendered component.
*/
const AuditReport = ({data, nbPage, clientName, image}) => {    
    //RENDER
    return (
        <div id={`pdf-content-${nbPage}`} className="audit-container">
            <AuditReportContainer data={data} clientName={clientName}/>
            <div className="right-section">
                <div className="main-image-container">
                    <ImageDecoder base64Image={image} alt="Page de garde" />
                </div>
            </div>
        </div>
    )
}

//PROPTYPES
AuditReport.propTypes = {
    data: PropTypes.object,
    nbPage: PropTypes.number,
    clientName: PropTypes.string,
    image: PropTypes.string
};

//EXPORT
export default AuditReport;