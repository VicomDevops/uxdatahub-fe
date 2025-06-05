import React, {useState , useEffect, useCallback} from 'react'
import Modals from '../../../common/modals/modal'
import { Button } from 'reactstrap'
import Checkbox from '@material-ui/core/Checkbox';
import SpinnerLoader from '../../../common/loaders/SpinnerLoader';
import scenarioServices from '../../../../services/scenarioServices';

const DeleteTestsModal = ({ showDeleteTests, onShowDeleteTestModal,onSelectTestsId,onDeleteTesterTest, testerId, panelId }) => {
    /*HOOKS */
    const [tests, setTests] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getpassedTests = useCallback(async () => {
        setIsLoading(true)
        try{
            let payload = {
                client_tester_id: testerId,
                panel_id: panelId
            }
            const resulat = await scenarioServices.passedTests(payload)
            if(resulat?.header.code !== 200){
                console.log(resulat?.header.message)
            }else{
                setTests(resulat?.response)
            }
        }catch(err){
            console.log("Error while fetching passed scenarios",err)
        }

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, [panelId, testerId])

    useEffect(() => {
        getpassedTests()
    }, [getpassedTests])

    /*RENDER */
    return (
        <Modals
            header="Supprimé un Test"
            show={showDeleteTests}
            modalSize="modal-sm"
            toggleShow={onShowDeleteTestModal}
        >                   
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "2rem", flexDirection: "column" }}>
                <p className="text-center">Veillez selectionné Test à supprimer !</p>  
                {
                    isLoading ? 
                        <SpinnerLoader /> 
                    :
                        <div>
                            {
                                tests?.length === 0 ? 
                                    <p> Pas encore des scénarios. </p>
                                : 
                                <>
                                    <div className='mb-5'>
                                        {
                                            tests.map(test => (
                                                <div key={test.test_id} style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "2rem", marginBottom: "1rem" }}>
                                                    <span>{test.scenario_name} </span> 
                                                    <Checkbox onChange={() => onSelectTestsId(test.test_id)} />
                                                </div>
                                            ))   
                                        }
                                    </div>
                                    <div className='panelModalButton'>
                                        <Button className="btn-success" onClick={onDeleteTesterTest}>Valider</Button>
                                        <Button onClick={onShowDeleteTestModal}>Non</Button>
                                    </div>
                                </>
                            }
                        </div>
                }
            </div>
        </Modals>
    )
}

export default DeleteTestsModal;
