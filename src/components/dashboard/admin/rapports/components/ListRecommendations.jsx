//REACT IMPORT
import React from 'react';
//LIBRARY IMPORT
import PropTypes from 'prop-types';

/**
 * A React component that displays a list of UX recommendations.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.recommendations - An object containing UX
 * recommendations. The object keys are the recommendation titles and
 * the object values are the recommendation descriptions.
 *
 * @returns {JSX.Element} The rendered component.
 *
 * This component displays each recommendation as a list item with a
 * Roman numeral and a bold title, followed by the recommendation
 * description.
 */
const ListRecommendations = ({ recommendations }) => {


    const convertToRoman = (num) => {
        const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
        return romanNumerals[num - 1] || num;
    }

    /*RENDER */
    if (!recommendations) return null;
    return (
        <ul>
            {Object.entries(recommendations).map(([key, value], index) => (
                <li key={ index }>
                    <div>
                        <span className="roman-number">{convertToRoman(index + 1)}.</span>
                    </div>
                    <div>
                        <span className='text-bold'> { key } :</span>
                        <span> { value } </span>
                    </div>
                </li>
            ))}
        </ul>
    );
};

//PROPTYPES
ListRecommendations.propTypes = {
    recommendations: PropTypes.object
};

//EXPORT
export default ListRecommendations
