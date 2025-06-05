//REACT IMPORT
import React from 'react'
//STYLES IMPORT
import './index.css';
/**
 * Function to render a spinner loader component.
 *
 * @return {JSX.Element} The spinner loader component.
 */
const SpinnerLoader = () => {
  return (
    <div className="spinner_container">
        <div className="spinner"></div>
    </div>
  )
}

//EXPORT
export default SpinnerLoader;