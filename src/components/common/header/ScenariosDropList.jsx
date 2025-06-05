//REACT IMPORTS
import PropTypes from "prop-types";
import React, { useMemo } from "react";
//REDUX IMPORT
import  { useSelector } from 'react-redux'
//LIBRARY IMPORT
import { Input } from "reactstrap";

/**
 * Render the left side of the header.
 *
 * @param {Array} scenarios - The list of scenarios.
 * @param {string} title - The title of the header.
 * @param {function} onChangeScenario - The function to handle scenario change.
 * @return {JSX.Element} The rendered header left side.
 */
const ScenariosDropList = ({scenarios, onChangeScenario, renderType}) => {

    //HOOKS
    const { selectedScenario } = useSelector((state) => state.scenario);

    const activeScenarios = useMemo(()=>{
        return scenarios?.filter(scenario => scenario.progress > 0)
    },[scenarios])

    
    const scenarioOptions = useMemo(() => activeScenarios?.map((scenario, id) => (
        <option key={id} value={renderType ==="allData" || renderType === "panel" ?scenario.id : id} selected={selectedScenario.id === scenario.id}>
            {scenario.title}
        </option>
    )), [activeScenarios, renderType, selectedScenario.id]);
    

    //RENDER
    return (
        <div>
        <Input type="select" name="select" className='btn_filter_select_scena-header' id="exampleSelect" onChange={onChangeScenario}>
            <option selected disabled>Sélectionner un scénario</option>
            { scenarioOptions }
        </Input>
    </div>
    )
}

//PROPTYPES
ScenariosDropList.propTypes = {
    scenarios: PropTypes.array,
    onChangeScenario: PropTypes.func,
    renderType: PropTypes.string
};

//EXPORT
export default ScenariosDropList;