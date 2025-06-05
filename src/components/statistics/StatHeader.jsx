//REACT IMPORT
import React from "react";
//LIBRARY IMPORT
import { Input } from 'reactstrap'
import PropTypes from "prop-types";

/**
 * Renders the header component for the statistics page.
 *
 * @param {Object[]} scenarios - The list of scenarios.
 * @param {function} onChangeScenario - The function to handle scenario changes.
 * @param {Object} headerPayload - The payload for the header.
 * @return {JSX} The rendered header component.
*/
const StatHeader = ({scenarios, onChangeScenario, headerPayload}) => {
    return(
        <div className="s-top-component-container-panel">
            <div style={{ marginBottom: '1em' }}>
                <span className="top-component-green-style2">Visualisation des réponses</span>
            </div>
            <div className="s-top-component-container-header panel-header">
                <div className="sub-sub-top-component-container" style={{ marginRight: '1em' }}>
                    <span className="top-component-black-style3">Sélectionner un scénario</span>
                </div>
                <div>
                    <Input type="select" name="select" className='btn_filter_select_scenario' id="exampleSelect" onChange={onChangeScenario}>
                    <option selected disabled>Sélectionner un scénario</option>
                    {
                        scenarios.map((scen, idx) => {
                        return <option key={idx} value={scen.id} >{scen.title}</option>
                        })
                    }
                    </Input>
                </div>
                <div className="panel_etapes">
                    <div className="sub-sub-top-component-container-panel" style={{ marginRight: '2.3em' }}>
                    <span className="top-component-black-style">Etapes</span>
                    <div style={{ paddingLeft: 10 }}></div>
                    <span className="top-component-fine-black-style">
                        {headerPayload?.steps}
                    </span>
                    </div>

                    <div className="sub-sub-top-component-container-panel" style={{ marginRight: '2.3em' }}>
                    <span className="top-component-black-style">Testeurs</span>
                    <div style={{ paddingLeft: 10 }}></div>
                    <span className="top-component-fine-black-style">
                        {
                            headerPayload?.testers ? 
                            <>
                                {
                                    headerPayload.testersDone === headerPayload?.testers ?
                                        <span className='header_span completTest'>
                                            {`${headerPayload.testersDone}/${headerPayload?.testers}`}
                                        </span>
                                    :
                                        <span className='header_span encoursTest'>
                                            {`${headerPayload.testersDone}/${headerPayload?.testers}`}
                                        </span>
                                }
                            </>
                            :
                                ""
                        }
                    </span>
                    </div>

                    <div className="sub-sub-top-component-container-panel" style={{ marginRight: '0' }}>
                    <span className="top-component-black-style">Panel</span>
                    <div style={{ paddingLeft: 10 }}></div>
                    <span className="top-component-fine-black-style">
                        {headerPayload?.type}
                    </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

//PROPTYPES
StatHeader.propTypes = {
    scenarios: PropTypes.array,
    onChangeScenario: PropTypes.func,
    headerPayload: PropTypes.object
};

//EXPORT
export default StatHeader;