import React, {useState , useEffect, useCallback} from 'react'
import Modals from '../../../common/modals/modal'
import { Button } from 'reactstrap'
import Checkbox from '@material-ui/core/Checkbox';
import SpinnerLoader from '../../../common/loaders/SpinnerLoader';
import scenarioServices from '../../../../services/scenarioServices';

const DetachTesterModal = ({ showDetacher, onShowDetacherModal, onSelectDetachScenarioId, onDetacherScenariosTester, testerId, panelId }) => {
    /*HOOKS */
    const [scenarios, setScenarios] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getUnpassedScenarios = useCallback(async () => {
        setIsLoading(true)
        try{
            let payload = {
                client_tester_id: testerId,
                panel_id: panelId
            }
            const resulat = await scenarioServices.unpassedScenario(payload)
            if(resulat?.header.code !== 200){
                console.log("Error while fetching unpassed scenarios")
            }else{
                setScenarios(resulat?.response)
            }
        }catch(err){
            console.log("Error while fetching unpassed scenarios",err)
        }
        setIsLoading(false)
    }, [ panelId, testerId])

    useEffect(() => {
        getUnpassedScenarios()
    }, [getUnpassedScenarios])



    /*RENDER */
    return (
        <Modals
            header="Detacher Testeur"
            show={showDetacher}
            modalSize="modal-sm"
            toggleShow={onShowDetacherModal}
        >                   
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "2rem", flexDirection: "column" }}>
                <p className="text-center">Voulez-vous vraiment detacher ce testeur de ces scénarios ?</p>  
                {
                    isLoading ? 
                        <SpinnerLoader /> 
                    :
                        <div>
                            {
                                scenarios?.length === 0 ? 
                                    <p> Ce testeur a bien passé tous les scénarios. </p>
                                : 
                                <>
                                    <div className='mb-5'>
                                        {
                                            scenarios.map(scenario => (
                                                <div key={scenario.scenario_id} style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "2rem", marginBottom: "1rem" }}>
                                                    <span>{scenario.scenario_name} </span> 
                                                    <Checkbox onChange={() => onSelectDetachScenarioId(scenario.scenario_id)} />
                                                </div>
                                            ))   
                                        }
                                    </div>
                                    <div className='panelModalButton'>
                                        <Button className="btn-success" onClick={onDetacherScenariosTester}>Valider</Button>
                                        <Button onClick={onShowDetacherModal}>Non</Button>
                                    </div>
                                </>
                            }
                        </div>
                }
            </div>
        </Modals>
    )
}

export default DetachTesterModal;
