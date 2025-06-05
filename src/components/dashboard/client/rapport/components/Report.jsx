//REACT IMPORT
import React from 'react';
//LIBRARY IMPORT
import PropTypes from 'prop-types';
//UTILS IMPORT
import { formatNumber } from '../../../../../utils/helpers';
//COMPONENT IMPORT
import RapportHeader from './RapportHeader';
import RapportTable from './RapportTable';
import ScoreBox from './ScoreBox';
import FeedbackSection from './FeedbackSection';
/**
 * A React functional component that renders a report of a scenario
 * 
 * @prop {Object} data - An object containing the answers and scores of the scenario
 * 
 * @returns {JSX.Element} A div containing sections for the recommandations, the scores and the video link
*/
const Report = ({ data }) => {

    //RENDER
    return (
        <>
            <div className='rapport-content' id={`pdf-content-${data?.step-1}`}>
                <div className='rapport-header'>
                    <RapportHeader label={`Etape ${data?.step}`} value={data?.step_details?.question} color="bg-light-green" />
                </div>
                <div className='rapport-recommandations'>
                    <div className='rapport-recommandation'>
                        <div className='rapport-recommandation-content'>
                            <div className='rapport-section-title'>
                                Analyse des réponses et des scores :  
                            </div>
                            <div className='rapport-section-subtitle'>
                                Bilan des réactions
                            </div>
                            <div className='rapport-recommandation-text'>
                                <p className='mt-3'>
                                    {data?.bilan_redaction}
                                </p>
                            </div>
                        </div>
                        <ScoreBox 
                            title="Nb de Réponses" 
                            value={data?.answers?.length}
                            className="bg-colors-wihte" 
                        />
                    </div>
                    <div>
                        <div className='rapport-recommandation'>
                            <div className='rapport-recommandation-content'>
                                <div className='rapport-section-subtitle'>
                                    Analyses des Scores
                                </div>
                                <div className='rapport-recommandation-text'>
                                    <p className='mt-3'>
                                        {data?.analyse_score}
                                    </p>
                                </div>
                                <div className='retours-container'>
                                    <div className='rapport-section-subtitle'>
                                            Retours les plus marquants
                                    </div>
                                    <div className='rapport-constats'>
                                        <FeedbackSection feedbacks={data?.most_remarquable_feedback} />
                                    </div>
                                </div>
                            </div>
                            <ScoreBox 
                                title="Score Moyen" 
                                value={formatNumber(data?.average_score)} 
                                className="bg-light-green" 
                                TextClassName={data?.average_score >= 0 ? "green-text": "red-text"}
                            />
                        </div>
                    </div>
                    <div className='rapport-recommandation'>
                        <div className='rapport-recommandation-content'>
                            <div className='rapport-section-subtitle'>
                                Liste des Réponses
                            </div>
                            <RapportTable  data={data?.answers} />                       
                        </div>
                        <ScoreBox 
                            title="Durée Moyenne" 
                            value={formatNumber(data?.average_duration)} 
                            className="bg-colors-wihte"    
                        />
                    </div>
                </div>
            </div>
        </>
    )
}


//PROTYPES
Report.propTypes = {
    data: PropTypes.shape({
        step_details: PropTypes.shape({
            scenario_name: PropTypes.string,
            question: PropTypes.string,
        }),
        step: PropTypes.number,
        bilan_redaction: PropTypes.string,
        analyse_score: PropTypes.string,
        most_remarquable_feedback: PropTypes.arrayOf(PropTypes.array),
        answers: PropTypes.array,
        average_score: PropTypes.number,
        average_duration: PropTypes.number,
    }).isRequired,
};

//EXPORT
export default Report;
