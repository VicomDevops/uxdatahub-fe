//REACT IMPORT
import React from 'react'

/**
 * A component to display the header of the report with the title
 * 
 * @param {{title: string}} props
 * @prop {string} title - the title of the report
 */
const Header = ({title}) => {
    //RENDER
    return (
        <div>
            <span className="header-section">{title}</span>
        </div>
    )
}

//EXPORT
export default Header;
