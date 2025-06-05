//REACT IMPORT
import React from 'react';
//LIBRARY IMPORT
import PropTypes from 'prop-types';
//COMPONENT IMPORT
import RapportHeader from './RapportHeader';
/**
 * A React functional component that renders a report of a scenario
 * 
 * @prop {Object} data - An object containing the answers and scores of the scenario
 * 
 * @returns {JSX.Element} A div containing sections for the recommandations, the scores and the video link
*/
const ConcretReportData = ({ data }) => {

    //RENDER
    return (
        <>
            <div className='rapport-content' id={`pdf-content-${data?.step-1}`}>
                <div className='rapport-header'>
                <RapportHeader label={`Nom: `} value={data?.testerName} color="bg-light-green" />
                    <RapportHeader label={`Etape ${data?.step}`} value={data?.preconisations} color="bg-light" />
                </div>
                <div className='rapport-recommandations'>
                    <div className='rapport-recommandation'>
                        <div className='rapport-recommandation-content'>
                            <div className='rapport-section-subtitle'>
                                L'argument
                            </div>
                            <div className='rapport-recommandation-text'>
                                <p className='mt-3'>
                                    {data?.argument}
                                </p>
                            </div>
                            <div className='rapport-section-subtitle'>
                                Preconisations
                            </div>
                            <div className='rapport-recommandation-text'>
                                <p className='mt-3'>
                                    {data?.preconisations}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}



//PROTYPES
ConcretReportData.propTypes = {
    data: PropTypes.shape({
        argument: PropTypes.string,
        citations: PropTypes.string,
        preconisations: PropTypes.string,
        step: PropTypes.number,
        testerName: PropTypes.string,
        testerNumber: PropTypes.string
    })
};

//EXPORT
export default ConcretReportData;
