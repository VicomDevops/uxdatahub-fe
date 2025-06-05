//REACT IMPORT
import React from 'react'
//LIBRARY IMPORT
import { Label, Row } from 'reactstrap'
import PropTypes from 'prop-types';

/**
 * A component to display a row with a label and an answer.
 *
 * @param {Object} props - The props of the component.
 * @param {string} props.label - The label of the row.
 * @param {string} props.answer - The answer of the row.
 *
 * @return {JSX.Element} The rendered component.
 */

const AnswerDisplay = ({label, answer}) => {
    return (
        <Row className="asnwer_row">
            <Label   Label className="video_label">{label} :</Label>
            <span className='video_span'>{answer ?? 'Aucune données'}</span>
        </Row>
    )
}

//PROPTYPES
AnswerDisplay.propTypes = {
    label: PropTypes.string,
    answer: PropTypes.string
};

//EXPORT
export default AnswerDisplay