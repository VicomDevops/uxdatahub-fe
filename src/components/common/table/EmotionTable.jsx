// REACT IMPORT
import React from 'react';
// LIBRARY IMPORT
import { Table } from 'reactstrap';
import PropTypes from 'prop-types';

//CONSTANTS
const smallThTdStyle = {
    padding: '3px',
    textAlign: 'center',
};

/**
 * A component to display a table of emotions for a given face shot.
 *
 * @param {Object} currentFaceShot - The face shot for which to display the emotions.
 * @return {JSX.Element} The rendered table component.
 */
const EmotionTable = ({ currentFaceShot }) => {
    // List of emotions to display
    const emotions = [
        { label: 'Calme', key: 'calm' },
        { label: 'Colère', key: 'angry' },
        { label: 'Tristesse', key: 'sad' },
        { label: 'Confusion', key: 'confused' },
        { label: 'Dégoût', key: 'disgusted' },
        { label: 'Surprise', key: 'surprised' },
        { label: 'Joie', key: 'happy' },
        { label: 'Peur', key: 'fear' },
    ];

    // Render
    return (
        <Table bordered responsive>
            <tbody>
                {emotions.map(({ label, key }) => (
                    <tr key={key}>
                        <th scope="row" style={smallThTdStyle}>{label}</th>
                        <td style={smallThTdStyle}>{currentFaceShot?.[key] ?? 'Aucune données'}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

// PROPTYPES
EmotionTable.propTypes = {
    currentFaceShot: PropTypes.shape({
        calm: PropTypes.string,
        angry: PropTypes.string,
        sad: PropTypes.string,
        confused: PropTypes.string,
        disgusted: PropTypes.string,
        surprised: PropTypes.string,
        happy: PropTypes.string,
        fear: PropTypes.string,
    }),
};

// EXPORT
export default EmotionTable;
