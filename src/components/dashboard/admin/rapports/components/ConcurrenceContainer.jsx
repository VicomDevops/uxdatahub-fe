//REACT IMPORT
import React from 'react';
//LIBRARY IMPORT
import PropTypes from 'prop-types';
//ASSET IMPORT
import ReportArrow from '../../../../../assets/Report/ReportArrow.png';

/**
 * A component that displays a competitor's information, including an icon, title, UX score, and description.
 *
 * @param {Object} props - The props of the component.
 * @param {string} props.name - The name of the competitor.
 * @param {number} props.note - The UX score of the competitor.
 * @param {string} props.description - The description of the competitor.
 * @return {JSX.Element} The rendered component.
*/
const ConcurrenceContainer = ({name, note, title, description}) => {
    return (
        <div className="competitor">
            <div className='competitor-info'>
                <div>
                    <span className="competitor-icon">
                        <img src={ReportArrow} alt={name} />
                    </span> 
                    <span className="concurrence-title">{name}</span>
                </div>
                <div className="competitor-note">
                    <span className='ux-note'>Note UX </span> 
                    <span className='competitor-score'>{note} / 10</span>
                </div>
            </div>
            <div className="competitor-description"><span className='text-bold'>{title}</span> : {description} </div>
        </div>
    )
}

//PROPTYPES
ConcurrenceContainer.propTypes = {
    name: PropTypes.string,
    note: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string
};

//EXPORT
export default ConcurrenceContainer;