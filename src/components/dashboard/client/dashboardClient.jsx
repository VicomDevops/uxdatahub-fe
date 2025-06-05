import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onGetScenarios, onSelectedScenario } from "../../../actions/scenarioActions"
import scenarioServices from '../../../services/scenarioServices'
import  Pause  from "../../../assets/pause.svg"
import  Play  from "../../../assets/tdb/play.svg"
import  Delete  from "../../../assets/tdb/delete.svg"
import  Lock  from "../../../assets/tdb/lock.png"
import  Add from "../../../assets/tdb/panel.svg"
import  AddIcon  from "../../../assets/ajouter.svg"
import { Col, Progress } from "reactstrap"
import { onGetSubClients } from '../../../actions/userActions'
import "../dashboard.css"
import "../../scenario/scenario.css"
import ReactTooltip from 'react-tooltip';
import { toast } from 'react-toastify';
import RightStat from './RightStat';
import Favorite from '../../common/header/favorite'
import RendreDeleteModal from './Modals/DeleteModal';
import RendreDuplicateModal from './Modals/DuplicateModal';
import RendreLoadingModal from './Modals/LoadingModal';
import RendreClotureModal from './Modals/ClotureModal';
import { changeActiveItemTabDashboard, changeActiveMenuTabDashboard } from "../../../actions/navigationAction";
import { Tag } from 'antd';
import { useHistory } from "react-router-dom";
import { SCENARIO_ETAT } from "../../../utils/constant";
import './dashboard.css'
import Table from '../../common/table/table';

/**
 * This component displays the client's dashboard.
 * It shows the list of the client's scenarios with the associated information such as the title, product, progress, and etat.
 * It also displays the buttons to duplicate, delete, and close the scenario.
 * The component also renders the RightStat component which displays the statistics of the client.
 * The component uses the Table ableTable component to render the table.
 * The component uses the useState and useEffect hooks to manage the state of the component.
 * The component also uses the useDispatch hook to dispatch the onGetScenarios and onGetSubClients actions.
 * The component uses the useSelector hook to get the data and subClients from the store.
 * The component uses the useHistory hook to redirect the user to the statistics page.
 * The component uses the toastify library to display the toast messages.
 * The component uses the ReactTooltip library to display the tooltips.
 */
const DashboardClient = () => {

    //HOOKS
    const { data } = useSelector((state) => state.scenario);
    const dispatch = useDispatch();
    let history = useHistory();

    const [ open, setOpen] = useState(false)
    const [ scenarios, setScenarios]= useState([])
    const [ show , setShow] = useState(false)
    const [ showDelete, setShowDelete] = useState(false)
    const [ scenarioId, setScenarioId] = useState(null)
    const [ newScenario, setNewScenario] = useState()
    const [ textError, setTextError] = useState("")
    const [ showClose, setShowClose] = useState(false)
    const [ currentScenario, setCurrentScenario] = useState({
        oldName: "",
        newName: "",
    })

    let scenarioLabel = {
        oldName: "Nom du scénario actuel",
        newName: "Nouveau nom du scénario",
    }

    useEffect(() => {
        let scenarios = []
        if (data === undefined || data?.length === 0) {
            dispatch(onGetScenarios())
            dispatch(onGetSubClients())
        }
        else {
            data.map(scenario => 
                scenarios = [...scenarios, {
                    id: scenario.id,
                    createdAt: scenario.createdAt,
                    product: scenario.product,
                    isModerate: scenario.isModerate,
                    title: scenario.title,
                    progress: scenario.progress,
                    isUnique: scenario.isUnique,
                    state: scenario.state,
                    panel: scenario.panel,
                    etat: scenario.etat,
                    steps : scenario.steps,
                }]
            )
            setScenarios(scenarios)
        }
        dispatch(changeActiveItemTabDashboard("Tableau de Bord"));
        dispatch(changeActiveMenuTabDashboard(""));
    }, [ data, dispatch ]);


    const handleOpenDeleteScenario = (id, etat) => {
        if( etat < 3 ){
            setShowDelete(true)
            setScenarioId(id)
        }
    }

    const handleCloseDeleteScenario = () => {
        setShowClose(false)
        setScenarioId(null)
    }

    const dropScenario = async () => {
        await scenarioServices.deleteScenario(scenarioId).then(res => {
            dispatch(onGetScenarios())
            toast.success('Le scénario a été supprimé')
        })
        setShowDelete((prevState) => !prevState);
        setScenarioId(null)
    }

    const toggleOpen = () => {
        setOpen((prevState) => !prevState);
    }

    const playAndPauseScenario = async (id, etat) => {
        if(etat === 2){
            toggleOpen()
            try {
                const res = await scenarioServices.playScenario(id);
                if (res.header.code !== 200) {
                    toast.error(res.header.message)
                    setTimeout(() => { 
                        toggleOpen();
                    }, 2000)
                }else {
                    dispatch(onGetScenarios());
                    toast.success(res.header.message);
                    setTimeout(() => { 
                        toggleOpen();
                    }, 2000)
                }
            }catch (error) {
                console.log(error)
            }
        }
    }

    const SetOnPauseOnPlayScenario = async (id) =>{
        try {
            const res = await scenarioServices.setPauseScenario(id);
            if (res.header.code !== 200) {
                toast.error(res.header.message)
                setTimeout(() => { 
                    toggleOpen();
                }, 2000)
            }else {
                dispatch(onGetScenarios());
                toast.success(res.response);
            }
        }catch (error) {
            console.log(error)
        }
    };

    const onChangeScenario = (e) => {
        setCurrentScenario({ ...currentScenario, newName: e.target.value })
    }

    const showDetails = (data) => {
        setShow((prevState) => !prevState);
        setNewScenario(data);
        setCurrentScenario({ ...currentScenario, oldName: data?.title, newName: "" })
    }

    const onSubmit = async () => {
        if (data.filter(scenario => scenario.title.toLowerCase() === currentScenario.newName.toLowerCase()).length > 0) {
            setTextError("Ce scénario existe déjà")
            setTimeout(() => {
                setTextError('')
            }, 3000)
        }
        else {
            await scenarioServices.duplicateScenario(newScenario?.id).then(async res => {
                await scenarioServices.editScenario(res.id, { title: currentScenario.newName }).then(res => {
                    setShow((prevState) => !prevState)
                    dispatch(onGetScenarios())
                    toast.success('Scénario dupliqué avec succés')
                })
            },)
            setCurrentScenario({ ...currentScenario, newName: "" })
        }
        setTimeout(() => {
            setCurrentScenario({ ...currentScenario, newName: "" })
        }, 3000)
    }


    const handleToggleCloseScenario = (id) => {
        setShowClose((prevState) => !prevState)
        setScenarioId(id)
    }

    const handleCloseScenario = async () => {
        try {
            toggleOpen() 
            const res = await scenarioServices.closeScenario(scenarioId);
            if (res.header.code !== 200) {
                toast.error(res.header.message)
                setTimeout(() => { 
                    toggleOpen() 
                }, 2000)
            }else {
                dispatch(onGetScenarios());
                toast.success(res.header.message);
                setShowClose((prevState) => !prevState)
                setTimeout(() => { 
                        toggleOpen() 
                }, 2000)
            }
            setScenarioId(null)
        }catch (error) {
            toast.error(error)
            console.log(error);
            setTimeout(() => { 
                    toggleOpen() 
            }, 2000)
        }
    }

    const handleUnActiveScenario = useCallback(() => {
        if(data){
            const scenarioSans0et1 = data?.filter(scenario => scenario.etat !== 0 && scenario.etat !== 1)
            const scenarioL = scenarioSans0et1?.sort((a, b) => a.etat - b.etat)
            scenarioL.push(...data?.filter(scenario => scenario.etat === 0 || scenario.etat === 1))
            setScenarios(scenarioL)
        }
    }, [data])

    const handleSortedScenario = useCallback(() => {
        if(data){
            const scenarioL = data.sort((a, b) => b.etat - a.etat)
            setScenarios(scenarioL)
        }
    }, [data])

    const onRowClick = (data) => {
        dispatch(onSelectedScenario(data));
        dispatch(changeActiveMenuTabDashboard("Résulats"));
        dispatch(changeActiveItemTabDashboard("Résulats1"));
        history.push({
            pathname: "/client/statistics",
            state: {
                selectedScenario: data
            }
        })
    }

    /**
     * Render a Tag component with a color and label based on the given scenario's etat.
     * 
     * @param {number} etat - The etat of the scenario.
     * @returns {JSX.Element} - A Tag component with a color and label based on the given scenario's etat.
     */
    const handleEtatScenario = (etat) => {
        const etatMapping = {
            0: { color: 'red', label: SCENARIO_ETAT.COMPLETER },
            1: { color: 'magenta', label: SCENARIO_ETAT.ASSOCIER },
            2: { color: 'blue', label: SCENARIO_ETAT.LANCER },
            3: { color: 'orange', label: SCENARIO_ETAT.EN_COURS },
            4: { color: 'green', label: SCENARIO_ETAT.TERMINER },
            5: { color: 'green', label: SCENARIO_ETAT.TERMINER },
            6: { color: 'purple', label: SCENARIO_ETAT.PAUSE }
        };
    
        const { color, label } = etatMapping[etat] || { color: 'red', label: SCENARIO_ETAT.ERREUR };
    
        return <Tag color={color}>{label}</Tag>;
    };
    

    const handleTypologie = (isUnique, isModerate, etat) => {
        return (
            <span className={etat === 2 ? 'bold':undefined}>
                {(isUnique === true && isModerate === true) ?
                    <div style={{ display: 'flex', flexDirection: "column", gap: 1 }}><div>Unique </div> <div>Modéré</div></div> :
                    (isUnique === true && isModerate === false) ?
                        <div style={{ display: 'flex', flexDirection: "column", gap: 1 }}><div>Unique </div> <div>Non Modéré</div></div> :
                        (isUnique === false && isModerate === true) ?
                            <div style={{ display: 'flex', flexDirection: "column", gap: 1 }}><div>A/B Testing </div> <div>Modéré</div></div> :
                            <div style={{ display: 'flex', flexDirection: "column", gap: 1 }}><div>A/B Testing </div> <div>Non Modéré</div></div>}
            </span>
        )
    }


    const handleCreePanel = (rowData) => {
        history.push({
            pathname: '/client/testerpanel',
            state: rowData
        })
    }

    const renderTableClickable = () => {
        const columns = [
            {
                title: "Date", field: 'createdAt',
                DateSort: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
                render: rowData =>
                    <span className={rowData.etat === 2 ? 'bold' : undefined} >{rowData.createdAt}</span>
            },
            {
                title: "Nom de scénario", field: 'title', 
                render: rowData => <span className={rowData.etat === 2 ? 'bold' : undefined} >{rowData.title}</span>
            },
            {
                title: "Produit", field: 'product', 
                render: rowData => <span className={rowData.etat === 2 ? 'bold' : undefined} >{rowData.product}</span>
            },
            {
                title: "Typologie", field: 'isUnique',
                render: rowData => handleTypologie(rowData.isUnique, rowData.isModerate, rowData.etat)
            },
            {
                title: "Avancement", field: '', 
                render: rowData => <Progress className='progress_bar' color="success" value={rowData.progress ? rowData.progress : 0}>{rowData.progress}%</Progress>
            },
            {
                title: "Etat", field: 'etat',
                render: rowData => handleEtatScenario(rowData.etat, rowData.progress)
            },
        ];
    
        const actions = [
            {
                icon: () => <img src={AddIcon} alt="insightData duplicate" className='tableIcons2' style={{ marginTop: '.1rem' }}/>,
                tooltip: 'Dupliquer',
                onClick: (event, rowData) => showDetails(rowData),
            },
            rowData => ({
                icon: () => <img src={Delete} alt="insightData delete" className={`${[3, 4, 5, 6].includes(rowData.etat) ? 'tableIcons1 tableIconsDisabled' : 'tableIcons1'}`} />,
                tooltip: 'Supprimer',
                onClick: (event, rowData) => rowData.etat !== 3 || rowData.etat !== 5 || rowData.etat !== 6 ? handleOpenDeleteScenario(rowData.id, rowData.etat) : null,
            }),
            rowData => ({
                icon: () => <img src={Add} alt='insightData associer' className={`${rowData.progress === 100 || rowData.etat === 1 ? 'tableIcons1' : 'tableIcons1 tableIconsDisabled'}`} />,
                tooltip: 'Panels',
                onClick: (event, rowData) => rowData.progress === 100 || rowData.etat === 1 ? handleCreePanel(rowData) : null,
            }),
            rowData => ({
                icon: () =>
                    rowData.etat === 3 ? 
                        <img src={Pause} alt="insightData pause" className={`${rowData.etat < 2 || rowData.progress === 100 || rowData.progress === 0 ? 'tableIcons2 ' : 'tableIcons2'}`} />
                    : 
                        <img src={Play} alt="insightData play" className={`${[0, 1, 4, 5].includes(rowData.etat)  ? 'tableIcons1 tableIconsDisabled' : 'tableIcons1'}`} />,
                tooltip: rowData.etat === 3 ? 'Pause' : 'Play',
                onClick: (event, rowData) => {
                    switch (rowData.etat) {
                        case 2:
                            playAndPauseScenario(rowData.id, rowData.etat, rowData.progress);
                            break;
                        case 3:
                            SetOnPauseOnPlayScenario(rowData.id);
                            break;
                        case 6:
                            SetOnPauseOnPlayScenario(rowData.id);
                            break;
                        default:
                            break;
                    }
                },
            }),
            rowData => ({
                icon: () => <img src={Lock} alt="insightData lock" className={`${rowData?.etat === 3 ? 'tableIcons1' : 'tableIcons1 tableIconsDisabled'}`} />,
                tooltip: 'Cloturer',
                onClick: (event, rowData) => rowData?.etat === 3 ? handleToggleCloseScenario(rowData.id) : null ,
            }),
        ];
    
        return (
            <Table
                title="Liste des scénarios"
                columns={columns}
                data={scenarios}
                actions={actions}
                onRowClick={(event, rowData) => rowData.progress && onRowClick(rowData)}
            />
        );
    };
    

    //RENDER
    return (
        <>
            <div className='display__flex__row-dashboard_client'>
                <Col md='10' className='dashboard_client'>
                    <Favorite />
                    <div className='tableContainer mt-4'>
                        {renderTableClickable()}
                    </div>
                </Col>
                <Col md='2' className='dashboard_client-right_side'>
                    <RightStat handleScenarioC={handleSortedScenario} handleScenarioL={handleUnActiveScenario} />
                </Col>
            </div>
            {
                show &&  <RendreDuplicateModal 
                            show={show} 
                            onToggleShowDetails={showDetails} 
                            onChangeScenario={onChangeScenario} 
                            currentScenario={currentScenario} 
                            scenarioLabel={scenarioLabel} 
                            onSubmit={onSubmit} 
                            textError={textError}
                        />
            }
            {   
                open && <RendreLoadingModal open={open} onToggleClose={toggleOpen} />
            }
            {
                showDelete &&<RendreDeleteModal 
                                showDeleteModal={showDelete} 
                                onToggleDeleteScenario={handleCloseDeleteScenario} 
                                onDeleteScenario={dropScenario}  
                            />
            }
            {
                showClose && <RendreClotureModal 
                                showClose={showClose} 
                                onToggleCloseScenario={handleToggleCloseScenario} 
                                onCloseScenario={handleCloseScenario} 
                            /> 
            }
            <ReactTooltip />
        </>
    );  
}

//EXPORT
export default DashboardClient;
