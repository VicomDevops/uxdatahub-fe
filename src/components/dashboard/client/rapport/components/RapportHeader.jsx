//REACT IMPORT
import React from 'react'

/**
 * A component to display a header section for a report
 * 
 * @prop {string} label - the label to be displayed
 * @prop {string} value - the value to be displayed
 * @prop {string} color - the color class to be applied to the title
 */
const RapportHeader = ({label, value, color}) => {
    return (
        <div className='content'> 
            <div className='rapport-label'>
                {label}
            </div>
            <div className={`rapport-title ${color}`}>
                {value}
            </div>
        </div>
    )
}
//RENDER
export default RapportHeader
