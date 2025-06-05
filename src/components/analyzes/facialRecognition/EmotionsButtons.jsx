import React from 'react'
import { Button } from 'reactstrap'


/**
 * A component to display a button for a given emotion.
 * 
 * @param {String} selectedEmotion - The selected emotion.
 * @param {Function} handleEmotionClick - A function to handle the emotion click.
 * @param {String} emotion - The emotion.
 * @param {String} label - The label of the emotion.
 * @param {String} btnClass - The class of the button.
 * @param {String} selectedClass - The class of the selected button.
 * @return {JSX.Element} The rendered button component.
 */
const EmotionsButtons = ({ selectedEmotion, handleEmotionClick, emotion, label, notSelectedClass, selectedClass}) => {

    /* RENDER */
    return (
        <Button
            key={emotion}
            className={selectedEmotion === emotion ? `btn_filter ${selectedClass}` : `btn_filter ${notSelectedClass}`}
            onClick={() => handleEmotionClick(emotion)}
        >
            {label}
        </Button>
    )
}

export default EmotionsButtons