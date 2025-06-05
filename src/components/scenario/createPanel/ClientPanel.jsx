import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Col, Row, Button } from "reactstrap"
import scenarioServices from '../../../services/scenarioServices'
import { toast } from 'react-toastify';
import { AvForm } from 'availity-reactstrap-validation';
import AddTesterModel from './models/AddTesterModel';
import  SpinnerLoader from '../../common/loaders/SpinnerLoader';
import TesterTable from './TesterTable';
import PanelHeader from './PanelHeader';
import DeleteTesterModal from './models/DeleteTesterModal';
import DetachTesterModal from './models/DetachTesterModal';
import DeleteTestsModal from './models/DeleteTestsModal';
import './panel.css'
import userServices from '../../../services/userServices';

/**
 * ClientPanel component manages the display and operations related to a panel of testers.
 * 
 * This component handles tester management including addition, modification, deletion,
 * detachment from scenarios, and credential resending. It uses various modals to manage
 * testers and scenarios associated with a panel.
*/
const ClientPanel = () => {

    /*HOOKS */
    let { state } = useLocation();
    const [panelDetails, setPanelDetails] = useState({})
    const [loading, setLoading] = useState(false)
    const [showTesterModal, setShowTesterModal] = useState(false)
    const [showDeleteTesterModal, setShowDeleteTesterModal] = useState(false)
    const [showDetacherModal, setShowDetacherModal] = useState(false)
    const [showDeleteTestsModal, setShowDeleteTestsModal] = useState(false)
    const [clientTester, setClientTester] = useState({
        id: null,
        name: "",
        lastname: "",
        email: "",
        tests_pending : [],
        tests_passed : [],
        tableData : [],
    })
    const [updateTester, setUpdateTester] = useState("add") 
    const [errorExistTester, setErrorExistTester] = useState("")
    const [deletedRowTester, setDeletedRowTester] = useState({})
    const [detachedScenarios, setDetachedScenarios] = useState([])
    const [deleteTests, setdeleteTests] = useState([])

    const [detachTester, setDetachTester] = useState({})
    const [remplaceTester, setRemplaceTester] = useState({})
    const [testerId, setTesterId] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isUpdated, setIsUpdated] = useState(true)

    const history = useHistory();

    const testers = useMemo(() =>{
        return panelDetails?.clientTesters
    },[panelDetails])

    const scenariosNumber = useMemo(() =>{
        return panelDetails?.scenarios?.length
    },[panelDetails])

    /*FUNCTIONS */
    
    
    /**
     * Submits the form if the state is modified.
     *
     * @param {Event} event - The event object triggered by the form submission.
     * @param {Object} errors - The errors object containing validation errors.
     * @param {Object} values - The values object containing form input values.
     * @return {Promise} A promise that resolves when the form submission is complete.
    */
    const submitForm = async (event, errors, values) => {
        let updatedPanel = {
            ...panelDetails,
            ...values,
            testersNb: panelDetails?.clientTesters?.length
        }
        try {
            const response = await scenarioServices.editPanel(updatedPanel, updatedPanel.id);
            if (response?.header?.code !== 200) {
                toast.error(response?.header?.message);
            } else {
                toast.success(response?.header?.message);
                setTimeout(() => {
                    history.push("/client/panellist")
                },1000)
            }
        } catch (error) {
            console.error("ERROR",error);
        }
    }




    /**
     * Retrieves the panel details by its ID.
     * 
     * @param {number} id - The ID of the panel.
    */
    const fetchPanelById = useCallback(async (id) => {
        setLoading(true);
        const res = await scenarioServices.getPanelById(id);
        try{
            if (res?.header?.code !== 200) {
                toast.error(res?.header?.message);
            } else {
                setPanelDetails(res?.response);
                
            }
        }catch(err){
            toast.error('Erreur lors de la recuperation du panel');
        }
        setLoading(false);
    }, []);


    const handlePanelName = (e) => {
        setPanelDetails({
            ...panelDetails,
            name: e.target.value
        })
    }



    const handleToggleTesterModal = (rowData=null, type) => {
        if(rowData){ 
            if(type === "update"){
                let { id, name, lastname, email, tableData, gender, country } = rowData
                setClientTester({ id,name, lastname, email, gender, country, tableData })
                setUpdateTester(type)
                setShowTesterModal((prev) => !prev)
            } else if(type === "remplace"  && rowData.tests_passed?.length === 0){
                setRemplaceTester(rowData)
                setClientTester({ name: "", lastname: "", email: "" })
                setUpdateTester(type)
                setShowTesterModal((prev) => !prev)
            }
        }else{
            if(type === "detacher"){
                setClientTester({ name: "", lastname: "", email: "" })
                setUpdateTester(type)
                setShowTesterModal((prev) => !prev)
            }else{
                setClientTester({ name: "", lastname: "", email: "" })
                setUpdateTester("add")
                setShowTesterModal((prev) => !prev)
            }
        }
    }

    const handleChangeTester = (e) => {
        e.preventDefault();
        setClientTester({
            ...clientTester,
            [e.target.name]: e.target.value
        })
    } 

    
    const checkTesterMailer = async (email) => {
        try{
            const checkResponse = await userServices.checkTesterMail(email)
            if(checkResponse.header.code !== 200){
                setErrorExistTester(checkResponse?.header?.message)
                setTimeout(() => {
                    setErrorExistTester("")
                },3000)
                return true;
            }
        }catch(err){
            console.error("ERROR",err);
        }
    }


    const checkExistenceTester = (email, testerList ,index = -1) => {
        const isExist = testerList.some(tester => tester?.email?.toLowerCase() === email?.toLowerCase())
        if(index !== -1 && isExist){
            if(testerList[index].email === email){
                return false
            }else{
                setErrorExistTester("Vous avez deja ajouter ce testeur")
                console.error("Error", "Vous avez deja ajouter ce testeur");
                setTimeout(() => {
                    setErrorExistTester("")
                },3000)
                return true
            }
        }
        if(isExist){
            setErrorExistTester("Vous avez deja ajouter ce testeur")
            setTimeout(() => {
                setErrorExistTester("")
            },3000)
        }
        return isExist;
    }

    const handleSubmitTesteur = async () => {
        const formdata = new FormData();        
        formdata.append("email", clientTester.email)
        let panel_id = panelDetails?.id;
        const isExist = checkExistenceTester(clientTester.email, testers);
        if(!isExist){
            const mailExist = await checkTesterMailer(formdata)
            if(!mailExist){
                setIsLoading(true)
                try{
                    const addTester = await scenarioServices.ajouterTesterPanel(panel_id, clientTester);
                    if(addTester.header.code !== 200){
                        toast.error(addTester?.header?.message || "Erreur lors de l'ajout du testeur !");
                    }else{
                        setIsUpdated(true);
                        toast.success(addTester?.header?.message);
                        setShowTesterModal((prev) => !prev)
                    }
                }catch(err){
                    console.error("ERROR",err);
                }
                setIsLoading(false)
            }
        }
    }

    const handleModifTesteur = async () => {
        const index = testers.findIndex(item => item.tableData.id === clientTester.tableData.id);
        const currentTester = testers[index];
        const formdata = new FormData();
        formdata.append("email", clientTester.email)
        const isExist = checkExistenceTester(clientTester.email, testers, index);
        if(!isExist){
            const mailExist = await checkTesterMailer(formdata)
            if(!mailExist){
                if(currentTester.id === null || currentTester.id === undefined){ 
                    setPanelDetails({
                        ...panelDetails,
                        clientTesters: [...testers.slice(0, index), clientTester, ...testers.slice(index + 1)]
                    })
                    toast.success("Testeur modifié avec succes");
                    setShowTesterModal((prev) => !prev)
                }else{
                    const updateTesterResponse = await scenarioServices.editTesterFromPanel(clientTester);
                    if(updateTesterResponse.header.code !== 200){
                        toast.error(updateTesterResponse.header.message);
                    }else{
                        setIsUpdated(true);
                        toast.success(updateTesterResponse?.header?.message);
                        setShowTesterModal((prev) => !prev)
                    }
                }
            }
        }
    }


    const handleDetacherScenarioFromTester = async () => {
        setShowDetacherModal((prev) => !prev)
        handleToggleTesterModal(null,"detacher")
    }


    const handleDetachTesteur = async () => {
        const formdata = new FormData();    
        formdata.append("email", clientTester.email)
        const isExist = checkExistenceTester(clientTester.email, testers);
        if(!isExist){
            const mailExist = await checkTesterMailer(formdata)
            if(!mailExist){
                setIsLoading(true)
                try{
                    const resulat = await scenarioServices.detachementTesterFromPanel(panelDetails?.id, detachTester?.id, detachedScenarios, clientTester)
                    if(resulat?.header?.code === 200){
                        toast.success(resulat?.header?.message)
                        setDetachedScenarios([])
                        setIsUpdated(true);
                        setShowTesterModal(false)
                    }else{
                        toast.error(resulat?.header?.message)
                    }    
                }catch(err){
                    console.error("ERROR",err);
                }
                setIsLoading(false)
            }
        }
    }


    const handleRemplaceTester = async  () => {
        const formdata = new FormData();    
        formdata.append("email", clientTester.email)
        const isExist = checkExistenceTester(clientTester.email, testers);
        if(!isExist){
            const mailExist = await checkTesterMailer(formdata)
            if(!mailExist){
                setIsLoading(true)
                try{
                    const resulat = await scenarioServices.replaceTester(panelDetails.id, remplaceTester.id, clientTester)
                    if(resulat?.header?.code === 200){
                        toast.success(resulat?.header?.message)
                        setIsUpdated(true);
                        setShowTesterModal(false)
                    }else{
                        toast.error(resulat?.header?.message)
                    }    
                }catch(err){
                    console.error("ERROR",err);
                }
                setIsLoading(false)
            }
        } 
    }

    const handleSelectedDetachScenarioId = (scenarioId) => {
        if (detachedScenarios.includes(scenarioId)) {
            setDetachedScenarios(detachedScenarios.filter(item => item !== scenarioId) )
        }else{
            setDetachedScenarios([...detachedScenarios, scenarioId])
        }       
    }

    const handleShowDetacherModal = (rowData) => {
        if(!rowData){
            setDetachedScenarios([])
            return setShowDetacherModal(false)
        }
        const { id, tests_passed, tests_pending, name, lastname } = rowData
        if(tests_passed?.length !== undefined && tests_passed?.length !== 0 && tests_pending?.length !== 0){
            setShowDetacherModal((prev) => !prev)
            setTesterId(id)
            setDetachTester({
                id,
                name,
                lastname
            })
        }else{
            setShowDetacherModal(false)
            setDetachedScenarios([])
        }
    }

    const handleShowDeleteTestModal = () => {
        setShowDeleteTestsModal(false)
        setdeleteTests([])
    }

    const handleSelectedTestsId = (testsId) => {
        if (deleteTests.includes(testsId)) {
            setdeleteTests(deleteTests.filter(item => item !== testsId) )
        }else{
            setdeleteTests([...deleteTests, testsId])
        }       
    }

    const handleDeleteTesterTestsById = async () => {
        setIsLoading(true)
        try{
            const result = await scenarioServices.deleteTestsById(deleteTests)
            if(result?.header?.code === 200){
                toast.success(result?.header?.message)
                setShowDeleteTestsModal(false)
                setdeleteTests([])
                setIsUpdated(true);
            }else{
                toast.error(result?.header?.message)
            }    
        }catch(err){
            console.error("ERROR",err);
        }
        setIsLoading(false)
    }

    const handleShowDeleteTestsModal = (rowData) => {

        if(!rowData){
            setdeleteTests([])
            return setShowDeleteTestsModal(false)
        }
        const { id, tests_passed, tests_pending, name, lastname } = rowData
        if(tests_passed?.length !== undefined && tests_passed?.length !== 0 && tests_pending?.length !== 0){
            setShowDeleteTestsModal((prev) => !prev)
            setTesterId(id)
            setDetachTester({
                id,
                name,
                lastname
            })
        }else{
            setShowDetacherModal(false)
            setdeleteTests([])
        }
    }
    
    const handleModalDeleteTester = (tester) => {
        if(tester?.id){
            if(tester?.tests_passed?.length === 0 || tester?.tests_pending === undefined){
                setShowDeleteTesterModal((prev) => !prev)
                setDeletedRowTester(tester)
            }else{
                return
            }
        }else{
            setShowDeleteTesterModal((prev) => !prev)
            setDeletedRowTester(tester)
        }
    }

    const handleResentCredentials = async (tester) => {
        const scenarioIds = panelDetails.scenarios.map(scenario => scenario.id);
                setIsLoading(true)
                try{
                    let resentJDDResponse = await scenarioServices.resentTesterCredentials(tester.id,scenarioIds);
                    if (resentJDDResponse.header.code === 201){
                        toast.info(resentJDDResponse.header.message);
                    }else if(resentJDDResponse.header.code === 200){
                        toast.success(resentJDDResponse.header.message);
                    }else{
                        toast.error(resentJDDResponse.header.message);
                    }
                }catch(err){
                    console.error("ERROR",err);
                }
                setIsLoading(false)
        }

    const handleDeleteTester = async () => {
        const testerId = deletedRowTester.id;
        const panelId = panelDetails.id;
        const formData = new FormData()
        formData.append("client_tester_id", testerId)
        formData.append("panel_id", panelId)
        if(testers.length === 1){
            toast.error("Impossible de supprimer le dernier testeur d'un panel");
            return
        }else {
            if(testerId !== undefined){
                setIsLoading(true)
                try{
                    let deleteTesterResponse = await scenarioServices.deleteTesterFromPanel(formData);
                    if(deleteTesterResponse.header.code !== 200){
                        toast.error(deleteTesterResponse.header.message);
                    }else{
                        setIsUpdated(true);
                        setShowDeleteTesterModal(!showDeleteTesterModal);
                        toast.success(deleteTesterResponse.header.message);
                    }
                }catch(err){
                    console.error("ERROR",err);
                }
                setIsLoading(false)
            }else{
                let newTesters = testers.filter(item => item !== deletedRowTester);
                setPanelDetails({ ...panelDetails, clientTesters: newTesters });
                setShowDeleteTesterModal(!showDeleteTesterModal);
                toast.success("Testeur supprimé avec succès");
            }
        }
    }

    /* EFFECT */
    useEffect(() => {
        if (state?.modified && isUpdated) {
            fetchPanelById(state?.id);
            setIsUpdated(false);
        }

        return (() => {
            setPanelDetails({})
            setDetachedScenarios([])
            setClientTester({})
        })
    }, [state, fetchPanelById, isUpdated]);


    /* RENDERING */
    if(loading) {
        return (
            <SpinnerLoader />
        )
    }

    /*RENDER */
    return (
        <>
            <div className="scenario__ctn-panel">
                <span className="title__style__testeur">Panel de testeurs</span>
                <Row className='row_panel'>
                    <Col md='12'>
                        <AvForm onSubmit={submitForm}>
                            <PanelHeader 
                                scenarios={panelDetails?.scenarios}
                                panelName={panelDetails?.name} 
                                onChangePanelName={handlePanelName}
                                onToggleTesterModal={handleToggleTesterModal}
                            /> 
                            <div className='footer__form__panel'>
                                <div className='footer__table_form__panel'>
                                    <TesterTable 
                                        testers={testers}  
                                        onToggleUpdateTester={handleToggleTesterModal}
                                        onToggleDeleteTester={handleModalDeleteTester} 
                                        onToggleDetacherModal={handleShowDetacherModal}
                                        onToggleDeleteTest={handleShowDeleteTestsModal}
                                        onToggleResentCredentials={handleResentCredentials}
                                        scenariosNumber={scenariosNumber}
                                    />
                                </div>
                            </div>
                            <div className='panelClient-footer'>
                                {
                                    state?.modified === false ?
                                        <Button className='create-panel-testeurs'> Valider </Button>
                                    :
                                        <Button className='create-panel-testeurs'> Modifier </Button>
                                }
                            </div>
                        </AvForm>
                        {
                            showTesterModal && 
                                <AddTesterModel
                                    show={showTesterModal}
                                    onToggle={handleToggleTesterModal}
                                    onSubmitTesteur={handleSubmitTesteur}
                                    onRemplaceTesteur={handleRemplaceTester}
                                    onModifTesteur={handleModifTesteur}
                                    onChange={handleChangeTester}
                                    clientTester={clientTester}
                                    toggleModifier={updateTester}
                                    errorExistTester={errorExistTester}
                                    remplaceTester={remplaceTester}
                                    detachTester={detachTester}
                                    onDetachTesteur={handleDetachTesteur}
                                    isLoading={isLoading}
                                />
                        }
                        {
                            showDeleteTesterModal &&
                                <DeleteTesterModal
                                    showDelete={showDeleteTesterModal}
                                    onModalDeleteTester={handleModalDeleteTester}
                                    onDeleteTester={handleDeleteTester}
                                    isLoading={isLoading}
                                />
                        }
                        {
                            showDetacherModal &&
                                <DetachTesterModal
                                    showDetacher={showDetacherModal}
                                    onShowDetacherModal={handleShowDetacherModal}
                                    onDetacherScenariosTester={handleDetacherScenarioFromTester}
                                    onSelectDetachScenarioId={handleSelectedDetachScenarioId}
                                    testerId={testerId}
                                    panelId={state?.id}
                                    isLoading={isLoading}
                                />
                        }
                        {
                            showDeleteTestsModal &&
                                <DeleteTestsModal
                                    showDeleteTests={showDeleteTestsModal}
                                    onShowDeleteTestModal={handleShowDeleteTestModal}
                                    onSelectTestsId={handleSelectedTestsId}
                                    onDeleteTesterTest={handleDeleteTesterTestsById}
                                    testerId={testerId}
                                    panelId={state?.id}
                                    isLoading={isLoading}
                                />
                        }
                    </Col>
                </Row>
            </div>
        </>
    )
};

export default ClientPanel;