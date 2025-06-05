//REACT IMPORT
import React from 'react';
//LIBRARY IMPORT
import PropTypes from 'prop-types';

/**
 * A React functional component that renders a section for each feedback in the given feedbacks array.
 * It will return null if the feedbacks array is invalid.
 *
 * @prop {Array} feedbacks - An array of feedbacks, each containing question, response and observation.
 *
 * @returns {JSX.Element | null} A fragment containing sections for each feedback if the data is valid, else null
 */
const FeedbackSection = ({ feedbacks }) => {

    
    //RENDER
    if (!feedbacks || !Array.isArray(feedbacks)) return null;

    return (
        <>
            {feedbacks.map((constat, index) => (
                <div className="rapport-constat" key={index}>
                    <div className="rapport-constat-title">Constat {index + 1}</div>
                    <div className="rapport-constat-content">
                        <div className="rapport-constat-response">
                            {constat[1] || 'Aucune réponse'}
                        </div>
                        <div className="rapport-constat-answer">
                            {constat[2] || 'Aucune observation'}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

//PROPTYPES
FeedbackSection.propTypes = {
    feedbacks: PropTypes.array
};

//EXPORT
export default FeedbackSection;
