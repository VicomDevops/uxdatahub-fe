//REACT IMPORT
import React from "react";
//PROPTYPES
import PropTypes from "prop-types";
//COMPONENTS IMPORT
import ScenariosDropList from "./ScenariosDropList";
import HeaderItems from "./HeaderItems";

/**
 * Renders the HeaderBar component.
 *
 * @param {Object} skeleton - The skeleton object.
 * @param {Object} header - The header object.
 * @param {number} nbrTester - The number of testers.
 * @param {Array} scenarios - The scenarios array.
 * @param {string} title - The title string.
 * @param {function} onChangeScenario - The callback function for scenario change.
 * @return {ReactNode} The rendered HeaderBar component.
 */
const HeaderBar = ({ title, header, scenarios, onChangeScenario, analyseObj, skeleton, renderType, arrayOftesters, excel=false })=> {
    
    //RENDER
    return(
        <>
            <div className='analyse-title-section'>
                <span className="analyse-title">{title}</span>
            </div>
            <div className='header-bar-container'>
                <div className="header-title-section">
                    <span className="header-title">Sélectionner un scénario:</span>
                </div>
                <ScenariosDropList scenarios={scenarios} onChangeScenario={onChangeScenario}  renderType={renderType}/>
                <HeaderItems skeleton={skeleton} header={header} excel={excel} analyseObj={analyseObj} arrayOftesters={arrayOftesters} renderType={renderType}/>
            </div>
        </>
    )
}

//PROPTYPES
HeaderBar.propTypes = {
    title: PropTypes.string,
    header: PropTypes.object,
    scenarios: PropTypes.array,
    onChangeScenario: PropTypes.func,
    analyseObj: PropTypes.object,
    skeleton: PropTypes.bool,
    renderType: PropTypes.string
};

//EXPORT
export default HeaderBar;