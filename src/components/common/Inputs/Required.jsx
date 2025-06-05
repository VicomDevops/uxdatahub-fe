//REACT IMPORT
import React from 'react'

/**
 * A functional React component that displays an asterisk symbol
 * with a "required" class, typically used to indicate that a form
 * field is mandatory.
 * @returns {JSX.Element} A span element with a "required" class.
 */
const Required = () => {
    //RENDER
    return (
        <span className="required"> *</span>
    )
}

//EXPORT
export default Required