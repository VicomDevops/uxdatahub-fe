//REACT IMPORT
import React from 'react'
//LIBRARY IMPORT
import PropTypes from 'prop-types'
//COMPONENTS IMPORT
import ReportHeader from './ReportHeader'
import ReportVerticalBar from './ReportVerticalBar'
import ClientInfo from './ClientInfo'
import AuditDataItem from './AuditDataItem'
import { capitalizeFirstLetter } from '../../../../../utils/helpers'

/**
 * A React component that displays a detailed audit report container
 * with the top 5 UX recommendations.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.data - An array of data objects containing
 * information about UX recommendations, steps, citations, users,
 * and arguments.
 *
 * @returns {JSX.Element} The rendered component.
 *
 * This component renders client and scenario information using the
 * `ClientInfo` component, a vertical bar with the `ReportVerticalBar`
 * component, and a list of UX recommendations. It conditionally
 * displays the second recommendation if available.
*/
const AuditReportContainer = ({ data, clientName }) => {
    //RENDER
    return (
        <div className="left-section">
            <div className="section-container">
                <ReportHeader title="Top 5 préconisations UX" />
                <div className="section-left-side mt-5">
                    <ReportVerticalBar data="PRECO-TOP5" className="audit-bar" /> 
                    <div className='client-info-sectio'>
                        <div className="client-info-container">
                            <div className="client-info">
                                <ClientInfo payload={capitalizeFirstLetter(clientName)}  title="Client"/>
                                <ClientInfo payload={`Audit_ux_${clientName}`}  title="Scenario Test"/>
                            </div>
                        </div>
                        <div className="main-content">
                            <div className="main-content-container">
                            <h2 className='preconisation'> Préconisation </h2>
                                <AuditDataItem data={data[0]} />
                                {
                                    data[1] && <AuditDataItem data={data[1]}  />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

//PROPTYPES
AuditReportContainer.propTypes = {
    data: PropTypes.array,
    clientName: PropTypes.string
};

//EXPORT
export default AuditReportContainer;