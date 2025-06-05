//REACT IMPORT
import React from 'react';
//LIBRARY IMPORT
import PropTypes from 'prop-types';

/**
 * A component to display a score box.
 *
 * @prop {string} title - the title of the score box
 * @prop {string} value - the value of the score box
 * @prop {string} className - an optional class name to be applied
 *
 * @returns {JSX.Element} A div with the score box
 */
const ScoreBox = ({ title, value, className = '', TextClassName=''}) => {
    return (
        <div className={`rapport-score ${className}`}>
            <div className="rapport-score-title">{title}</div>
            <div className="rapport-score-value">
                <span className={TextClassName}>    
                    {value}
                </span>
            </div>
        </div>
    );
};

//PROTYPES
ScoreBox.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    className: PropTypes.string,
    TextClassName: PropTypes.string
};

//EXPORT
export default ScoreBox;
