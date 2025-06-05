/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
//REACT IMPORTS
import React, { useReducer, useCallback, useEffect, useRef, useState } from "react";
//SERVICE IMPORTS
import scenarioServices from '../../../services/scenarioServices';
import analyseServices from '../../../services/analyzeServices';
import { useSelector } from 'react-redux'
import statServices from '../../../services/statServices';
//COMPONENTS IMPORTS
import SkeletonAnalyse from "./skeletonAnalyse";
import HeaderBar from "../../common/header/HeaderBar";
import AnalyseChartSection from "./analyseBody/AnalyseChartSection";
import AnalyseDetailsSection from "./analyseBody/AnalyseDetailsSection";
import { analyseMapper } from "./analyseMapper";
import { Button } from "reactstrap";
import DashboardHeader from "../../common/header/DashboardHeader";
import NoDataSelected from "../../common/NoDataSelected";
import { reducer, initialState } from './analyseReducer';
//STYLES IMPORT
import "./stepAnalyzes.css";
//LIBRARY IMPORTS
import ReactTooltip from 'react-tooltip';
import { toast } from "react-toastify";



/**
 * Responsible for rendering the StepAnalyses component and its child components.
 */
const StepAnalyses = () => {

    /* HOOKS */
    const myRef = useRef(null);
    const [state, dispatch] = useReducer(reducer, initialState);
    const { data, selectedScenario } = useSelector((state) => state.scenario);
    const [currentScenarioId, setCurrentScenarioId] = useState(0);
    const [responseType, setResponseType ] = useState("R");

    /* FUNCTIONS */
    const fetchScenarios = useCallback(async () => {
        //Put the scenarios with a non-null progress into the state.
        let scenariosTab = [];
        data?.forEach((scenario) => {
            if (scenario.progress !== 0 && scenario.progress !== null && scenario.progress !== undefined) {
                scenariosTab.push(scenario);
            }
        });

        dispatch({ type: 'LIST_SCENARIOS', payload: { scenarios: scenariosTab } });
    }, [data]);


    /* EFFECTS */
    useEffect(() => {
        fetchScenarios();
        dispatch({ type: 'RESET_SKELETON_LOADING', payload: { loading: false, skeleton: false } })
        if (selectedScenario.id !== null && selectedScenario.id !== undefined) {
            onChangeScenario(selectedScenario.id);
        }
    }, [fetchScenarios]);

    /* FUNCTIONS */

    /**
     * 
     * @param {*} e
     * modifier le contenu du page lors de la selection d'un scénario 
    */
    const onChangeScenario = async (e) => {
        
        let id = 0;
        let scenario = null;
        
        if (isNaN(e) && e !== null && e !== undefined) {           
            id = state.scenarios[e.target.value].id;
            scenario = state.selectedScenario ? state.selectedScenario : state.scenarios[e.target.value];
        } else {
            id = selectedScenario?.id ? selectedScenario.id : currentScenarioId;
            scenario = state.selectedScenario ? state.selectedScenario : state.scenarios[currentScenarioId];
        }        
        setCurrentScenarioId(id)
        
        dispatch({ type: 'SET_STATE', payload: { loading: true, skeleton: true, questionStep: "", selectedStep: 1, selectedRow: -1 } })
        dispatch({ type: 'SET_SELECTED_SCENARIO', payload: { scenarioId: id } })
        let testers = 0;
        try {
            if(id !== 0) {
                const response = await statServices.getScenarioDetails(id);
                if (response.header.code !== 200) {
                    toast.error(response.header.message)
                } else {
                    testers = response.response?.testers;
                    dispatch({ type: 'SET_HEADER', payload: { header: response.response } })
                }
            }
        } catch (e) {
            console.log(e);
            toast.error('Une erreur est survenue')
        }
        let data1 = {
            labels: [],
            datasets: [
                {
                    data: [],
                },
            ],
        }
        let dataTest = []
        let data2 = {
            labels: [],
            datasets: [
                {
                    data: [],
                },
            ],
        }
        let analyses = []
        let etape1 = []

        const dataAv = {
            labels: [],
            datasets: [
                {
                    data: [],
                },
            ],
        };
        const dataDev = {
            labels: [],
            datasets: [
                {
                    data: [],
                },
            ],
        };
        const analyseObj = [];

        dispatch({ type: 'RESET_SCENARIO', payload: {scenario, dataAv: dataAv, dataDev: dataDev, analyseObj: analyseObj } });
    
        let scoreTab = [];
        let etapeTab = [];
        let ecartTab = [];
        let tabEtapes = [];
        let tabMax = [];
        let tabMin = [];
        let nbrTesters = 0
        let analyseObjState = [];
        // recuperation des analyses
        try {
            let scAnalyse = null
            
            if(responseType === 'R'){
                scAnalyse = await analyseServices.getScenarioAnalysesR(id)
            }else{
                scAnalyse = await analyseServices.getScenarioAnalysesRC(id)
            }           
            
            if (scAnalyse) {
                if (scAnalyse.header.code !== 200) {
                    toast.error(scAnalyse.header.message)
                    return
                } else {
                    etape1 = scAnalyse?.response[0]?.stepId;
                    scAnalyse.response.map((obj, idx) => {
                        if (obj?.average !== null) {
                            scoreTab.push(obj?.average === null ? 0 : parseFloat(obj?.average));
                            ecartTab.push(obj?.deviation === null || obj?.deviation === undefined || obj?.deviation === "" ? 0 : parseFloat(obj?.deviation));
                            tabMax.push(obj?.max === null ? 0 : parseFloat(+obj?.max));
                            tabMin.push(obj?.min === null ? 0 : parseFloat(+obj?.min));
                            etapeTab.push(obj?.labels);
                            nbrTesters = obj?.testersNb;
                        }                        
                        state.dataDev?.datasets[0]?.data?.push(obj?.deviation)
                        data1.labels[idx] = obj.labels
                        dataTest[idx] = obj.average
                        data2 = {
                            labels: [...data2.labels, obj.labels],
                            datasets: [
                                {
                                    data: state.dataDev.datasets[0].data,
                                }
                            ]
                        }
                        
                        analyseObjState.push(obj)
                        return tabEtapes.push(obj);
                    })
                    const questionStep = scenario?.steps[0]?.question;                          
                    dispatch({ type: 'SET_STEP', payload: { tabEtapes, questionStep, analyseObj: analyseObjState } })
                }
            } 
        } catch (err) {
            console.log(err)
            toast.error("Une erreur est survenue lors de la recuperation des etapes")
        }

        // recuperation de scenario selectionner
        try {
            await scenarioServices.getScenarioById(id).then(async res => {
                if (res.header.code !== 200) {
                    toast.error(res.header.message);
                    return
                } else {
                    let stAnalyse = null
                    dispatch({ type: 'SET_SCENARIO_STEP', payload: { scenario: res.response, step: res.response.steps[0] } })                    
                    if(responseType=== 'R'){
                        stAnalyse = await analyseServices.getStepAnalysesR(etape1)
                    }else{
                        stAnalyse = await analyseServices.getStepAnalysesRC(etape1)
                    }
                    if (stAnalyse) {
                        if (stAnalyse.header.code !== 200) {
                            toast.error(stAnalyse.header.message)
                        } else {
                            stAnalyse.response.answers.forEach((analyse) => {
                                if (analyse?.score == null) {
                                    analyse.score = 0
                                }
                                if (analyse?.videoText == null || analyse?.videoText.trim() === "" || analyse?.videoText === ".") {
                                    analyse.videoText = "Aucune donnée"
                                }
                                const testerName = `${analyse.tester_name.charAt(0).toUpperCase() + analyse.tester_name.slice(1)} ${analyse.tester_lastName.charAt(0).toUpperCase()}`;
                                const tester_id = analyse.tester_id;
                                if (analyse.score !== 0 || analyse.score !== null || analyse.score !== undefined) {
                                    analyses = analyseMapper(analyses, analyse, testerName, tester_id);
                                }
                            });
                        }
                    }
                    if (analyses.length > 1) {
                        const dataMoyChart = {
                            labels: etapeTab,
                            datasets: [
                                {
                                    label: 'Moyenne',
                                    data: scoreTab,
                                    pointBackgroundColor:
                                        scoreTab.map((value, idx) => {
                                            if (value === 0) {
                                                return 'black'
                                            } else if (value > 0) {
                                                return 'green'
                                            }
                                            else {
                                                return 'red'
                                            }
                                        }),
                                    pointBorderColor:
                                        scoreTab.map((value, idx) => {
                                            if (value === 0) {
                                                return 'black'
                                            } else if (value > 0) {
                                                return 'green'
                                            }
                                            else {
                                                return 'red'
                                            }
                                        }),
                                },
                                {
                                    label: 'Valeur maximales',
                                    data: tabMax,
                                    borderColor: 'rgba(0, 163, 89, 1)',
                                    backgroundColor: 'rgba(0, 163, 89, 1)',
                                    datalabels: {
                                        display: false, // Masquer les valeurs pour la courbe "max"
                                    },
                                    pointRadius: 2.5, // Masquer les points pour la courbe "moyenne"
                                    pointHoverRadius: 2.5,
                                    borderDash: [4, 7],
                                    // backgroundColor: 'green',
                                    pointBorderColor: 'green',
                                    borderWidth: .5,
                                },
                                {
                                    label: 'Valeur minimales',
                                    data: tabMin,
                                    borderColor: 'rgba(255, 0, 0, 1)',
                                    backgroundColor: 'rgba(255, 0, 0, 1)',
                                    datalabels: {
                                        display: false, // Masquer les valeurs pour la courbe "min"
                                    },
                                    pointRadius: 2.5, // Masquer les points pour la courbe "moyenne"
                                    pointHoverRadius: 2.5,
                                    borderDash: [4, 7], // Pour les pointillés
                                    pointBorderColor: 'red',
                                    borderWidth: .5,
                                },
                            ]
                        }
                        dispatch({ type: 'SET_CHART', payload: { dataMoyChart: dataMoyChart } });
                    } else {
                        const dataMoyChart = {
                            labels: etapeTab,
                            datasets: [
                                {
                                    label: 'Moyenne',
                                    data: scoreTab,
                                    pointBackgroundColor:
                                        scoreTab.map((value, idx) => {
                                            if (value === 0) {
                                                return 'black'
                                            } else if (value > 0) {
                                                return 'green'
                                            }
                                            else {
                                                return 'red'
                                            }
                                        }),
                                    pointBorderColor:
                                        scoreTab.map((value, idx) => {
                                            if (value === 0) {
                                                return 'black'
                                            } else if (value > 0) {
                                                return 'green'
                                            }
                                            else {
                                                return 'red'
                                            }
                                        }),
                                }
                            ]
                        }
                        dispatch({ type: 'SET_CHART', payload: { dataMoyChart: dataMoyChart } });
                    }
                    setTimeout(() => {
                        dispatch({
                            type: 'SET_STATE', payload: {
                                stepAnalyse: analyses,
                                analyse: stAnalyse?.response && stAnalyse?.response[0],
                                duration: stAnalyse?.response && parseFloat(stAnalyse?.response?.step_duration),
                                score: stAnalyse?.response && parseFloat(stAnalyse?.response?.score),
                                deviation: stAnalyse?.response && parseFloat(stAnalyse?.response?.deviation),
                                nbrTester: analyses.length,
                                cliqueEtape: 1
                            }
                        });
                    }, 1000)
                }
            }).catch(err => {
                console.log(err)
            })

        } catch (err) {
            console.log(err)
            toast.error("Une erreur est survenue !!!");
        }

        const ecartTypeData = {
            labels: etapeTab,
            datasets: [
                {
                    label: 'Ecart type',
                    data: ecartTab,
                }
            ]
        }
        data1 = {
            ...data1,
            datasets: [{
                data: dataTest,
            },
            ]
        }
        dispatch({ type: 'SET_CHART_DATA', payload: { dataAv: data1, dataDev: data2, dataEcartChart: ecartTypeData } })

        setTimeout(() => {
            dispatch({ type: 'RESET_SKELETON_LOADING', payload: { loading: false, skeleton: false } })
        }, 2000)
    }


    const getStepAnalysesById = async stepId => {
        let analyses = []
        let stAnalyse = {}
        if(responseType === 'R'){
            stAnalyse = await analyseServices.getStepAnalysesR(stepId)
        }else{
            stAnalyse = await analyseServices.getStepAnalysesRC(stepId)
        }
        if (stAnalyse?.header) {
            if (stAnalyse.header.code !== 200) {
                toast.error(stAnalyse.header.message)
                return
            } else {
                stAnalyse.response.answers.forEach((analyse, idx) => {
                    if (analyse?.score === null || analyse?.score === undefined || analyse?.score === "") {
                        analyse.score = 0
                    }
                    if (analyse?.videoText == null || analyse?.videoText.trim() === "" || analyse?.videoText === ".") {
                        analyse.videoText = "Aucune donnée"
                    }
                    const testerName = `${analyse.tester_name.charAt(0).toUpperCase() + analyse.tester_name.slice(1)} ${analyse.tester_lastName.charAt(0).toUpperCase()}`;
                    const tester_id = analyse.tester_id;
                    analyses = analyseMapper(analyses, analyse, testerName, tester_id);
                })
                dispatch({
                    type: 'SET_STATE', payload: {
                        stepAnalyse: analyses,
                        videoEtap: stAnalyse?.response && stAnalyse?.response[0]?.video,
                        analyse: stAnalyse?.response && stAnalyse?.response[0],
                        duration: stAnalyse?.response && parseFloat(stAnalyse?.response?.step_duration),
                        score: stAnalyse?.response && parseFloat(stAnalyse?.response?.score),
                        deviation: stAnalyse?.response && parseFloat(stAnalyse?.response?.deviation),
                    }
                });
            }
        }
    }

    /**
     * 
     * @param {*} e
     * modifier le contenu de la table lors de la selection d'une etape 
     */
    const onChangeStep = async (e) => {
        
        //mode moyenne
        if (state.btn2 === "moyenne") {
            dispatch({ type: 'CHANGE_STEP', payload: { selectedRow: -1 } });
            // si on clique sur une etape depuis le select
            if (isNaN(e)) {
                let stepId = e.target.value;
                const etapeNumber = state.tabEtapes.findIndex(res => res.stepId === stepId)                
                const questionStep = state.scenario?.steps[etapeNumber]?.question
                dispatch({ type: 'SELECTED_STEP', payload: { selectedStep: etapeNumber + 1, questionStep: questionStep } });
                getStepAnalysesById(stepId);
            }
            // si on clique sur une etape depuis le chart
            else {
                dispatch({ type: 'CLICKED_STEP', payload: { cliqueEtape: e } });
                const questionStep = state.scenario?.steps[e - 1]?.question;
                dispatch({ type: 'SELECTED_STEP', payload: { selectedStep: e, questionStep: questionStep } });
                const stepId = state.tabEtapes[e - 1]?.stepId;
                getStepAnalysesById(stepId);
            }
            dispatch({ type: 'LOADING_STEP', payload: { loading: false } });
            //mode ecart type
        } else {
            dispatch({ type: 'CHANGE_STEP', payload: { selectedRow: -1 } });
            //depuis le select
            if (isNaN(e)) {
                let stepId = e.target.value;
                const etapeNumber = state.tabEtapes.findIndex(res => res.stepId === stepId)
                const questionStep = state.scenario.steps[etapeNumber].question
                dispatch({ type: 'SELECTED_STEP', payload: { selectedStep: etapeNumber + 1, questionStep: questionStep } });
                getStepAnalysesById(stepId);
            }
            //depuis le chart
            else {
                dispatch({ type: 'CLICKED_STEP', payload: { cliqueEtape: e } });
                const questionStep = state.scenario.steps[e - 1].question
                dispatch({ type: 'SELECTED_STEP', payload: { selectedStep: e, questionStep: questionStep } });
                const stepId = state.tabEtapes[e - 1]?.stepId;
                getStepAnalysesById(stepId);
            }
        }
    }

    /**
     * 
     * @param {*} evt
     * scroll qunad on clique sur une etape depuis le chart 
    */
    const stepView = () => {
        const targetRef = myRef.current;
        if (targetRef instanceof HTMLElement) {
            targetRef.scrollIntoView({ behavior: 'smooth' });
        }
    }

    useEffect(() => {
        if(currentScenarioId !== 0 && currentScenarioId !== null && currentScenarioId !== undefined) {            
            setTimeout(() => onChangeScenario(currentScenarioId), 500);
        }
    },[responseType])
    
    const handleChangeAnalyseType = (type) => {
        setResponseType(type);   
    }

    //RENDER
    return (
        <>
            <div className='analyze_form'>
                <DashboardHeader>
                    <HeaderBar
                        title="Analyse sémantique"
                        header={state.header}
                        scenarios={state.scenarios}
                        onChangeScenario={onChangeScenario}
                        analyseObj={state.analyseObj}
                        renderType="analyse"
                        skeleton={state.skeleton}
                    />
                </DashboardHeader>
                {
                    state.skeleton ?
                        <SkeletonAnalyse />
                        :
                        !state.header.score && !state.loading ?
                            <NoDataSelected title="Veuillez sélectionner un scénario." />
                            :
                            <div className="analyze_semantique_container">
                                <div className="filter-section-container">
                                    <div className='filter-section'>
                                        <span className="ml-1 question-text-chart"> Veuillez selectionner un point du graphique pour voir le détail des étapes </span>
                                    </div>
                                    {
                                        currentScenarioId !== 0 &&
                                        <div>
                                            <Button 
                                                className={responseType === "R" ? "shortcut_client btnIsActive" : "shortcut_client border-1"} 
                                                onClick={() => handleChangeAnalyseType("R")}
                                            >
                                                Analyse Par Response
                                            </Button>
                                            <Button 
                                                className={responseType === "RC" ? "shortcut_client btnIsActive" : "shortcut_client"} 
                                                onClick={() => handleChangeAnalyseType("RC")}
                                            >
                                                Analyse Par Response et Commantaire
                                            </Button>
                                        </div>
                                    }
                                </div>
                                <div className="analyze-section">
                                    <AnalyseChartSection
                                        dataMoyChart={state.dataMoyChart}
                                        stepView={stepView}
                                        onChangeStep={onChangeStep}
                                        analyseObj={state.analyseObj}
                                    />
                                    <AnalyseDetailsSection
                                        ref={myRef}
                                        cliqueEtape={state.cliqueEtape}
                                        tabEtapes={state.tabEtapes}
                                        duration={state.duration}
                                        onChangeStep={onChangeStep}
                                        questionStep={state.questionStep}
                                        score={state.score}
                                        stepAnalyse={state.stepAnalyse}
                                    />
                                    <ReactTooltip />
                                </div>
                            </div>
                }
            </div>
            <ReactTooltip />
        </>
    );
};


//EXPORT
export default StepAnalyses;