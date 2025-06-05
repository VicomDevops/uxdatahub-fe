/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/**
 * React imports
 */
import React, { useReducer, useCallback, useEffect, useRef, useState } from "react";

/**
 * Service imports
 */
import scenarioServices from '../../../services/scenarioServices';
import analyseServices from '../../../services/analyzeServices';
import { useSelector } from 'react-redux'
import statServices from '../../../services/statServices';
import { useDispatch } from "react-redux";

/**
 * Components imports
 */
import SkeletonAnalyse from "../byStep/skeletonAnalyse";
import HeaderBar from "../../common/header/HeaderBar";
import AnalyseChartSection from "../byStep/analyseBody/AnalyseChartSection";
import AnalyzeEmotionsSection from "./AnalyzeEmotionsSection";
import { analyseEmotionsMapper } from "../byStep/analyseEmotionsMapper";
import Filter from '../../../assets/filter.svg';
import "./facialRecognition.css";

/**
 * others imports
*/
import ReactTooltip from 'react-tooltip';

/**
 * styles imports
*/
import "../byStep/stepAnalyzes.css";
import { Label } from 'reactstrap';
import { toast } from "react-toastify";

/**
 * Reducer state
 */
import { reducer, initialState } from '../byStep/analyseReducer';
import DashboardHeader from "../../common/header/DashboardHeader";
import NoDataSelected from "../../common/NoDataSelected";
import EmotionsButtons from "./EmotionsButtons";
import { emotions } from "./helpers/headerEmotionsButtonFilter";


/**
 * Responsible for rendering the FacialRecognition component and its child components.
 */
const FacialRecognition = () => {

    /* HOOKS */
    const [state, dispatch] = useReducer(reducer, initialState);
    const [localState, setLocalState] = useReducer(reducer, initialState);
    const analysisDispatch = useDispatch();
    const { data, selectedScenario } = useSelector((state) => state.scenario);
    const [currentScenarioId, setCurrentScenarioId] = useState(0);
    const [selectedEmotion, setSelectedEmotion] = useState('happy');
    const scenarioAnalysis = useSelector((state) => state.analysis.scenarioAnalysis);
    const [dataMoyChart, setDataMoyChart] = useState([]);
    const myRef = useRef(null);

    /* FUNCTIONS */
    const fetchScenarios = useCallback(async () => {
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
    let scoreTab = [];
    let etapeTab = [];
    let ecartTab = [];
    let tabMax = [];
    let tabMin = [];
    let nbrTesters = 0
    let analyseObjState = [];
    let id = 0;
    let scenario = null;
    let scAnalyse = null;
    let dataTest = [];
    let analyses = []
    let etape1 = 0
    let data1 = {
        labels: [],
        datasets: [
            {
                data: [],
            },
        ],
    }
    let data2 = {
        labels: [],
        datasets: [
            {
                data: [],
            },
        ],
    }
    const ecartTypeData = {
        labels: etapeTab,
        datasets: [
            {
                label: 'Ecart type',
                data: ecartTab,
            }
        ]
    };
const onChangeScenario = async (e) => {
    determineScenario(e);
    setLoadingState();

    try {
        await fetchScenarioDetails();
    } catch (error) {
        console.log(error);
        toast.error('Erreur lors de la récupération des détails du scénario');
    }

    try {
        await fetchScenarioAnalyses();
    } catch (error) {
        console.log(error);
        toast.error("Erreur lors de la récupération de l'analyse");
    }

    try {
        await fetchSelectedScenario();
    } catch (error) {
        console.log(error);
        toast.error("Erreur lors de la récupération du scénario sélectionné");
    }
    updateChartData(data1, data2, ecartTypeData);
    resetSkeletonLoading();
};

const updateChartData = (data1, data2, ecartTypeData) => {
    dispatch({ 
        type: 'SET_CHART_DATA', 
        payload: { 
            dataAv: data1, 
            dataDev: data2, 
            dataEcartChart: ecartTypeData 
        } 
    });
};

const resetSkeletonLoading = () => {
    setTimeout(() => {
        dispatch({ 
            type: 'RESET_SKELETON_LOADING', 
            payload: { loading: false, skeleton: false } 
        });
    }, 2000);
};


const determineScenario = (e) => {
    if (isNaN(e) && e !== null && e !== undefined) {
        id = state.scenarios[e.target.value].id;
        scenario = state.selectedScenario ? state.selectedScenario : state.scenarios[e.target.value];
    } else {
        id = selectedScenario?.id ? selectedScenario.id : currentScenarioId;
        scenario = state.selectedScenario ? state.selectedScenario : state.scenarios[currentScenarioId];
    }
    setCurrentScenarioId(id);
    dispatch({ type: 'SET_SELECTED_SCENARIO', payload: { scenarioId: id } });
};

const setLoadingState = () => {
    dispatch({ type: 'SET_STATE', payload: { loading: true, skeleton: true, questionStep: "", selectedStep: 1, selectedRow: -1 } });
};

const fetchScenarioDetails = async () => {
    if (id !== 0) {
        const response = await statServices.getScenarioDetails(id);
        if (response.header.code !== 200) {
            toast.error(response.header.message);
        } else {
            dispatch({ type: 'SET_HEADER', payload: { header: response.response } });
        }
    }
};

const fetchScenarioAnalyses = async () => {

    scAnalyse = await analyseServices.getScenarioAnalysesFaceRecognitionEmotions(id);
    if (scAnalyse) {
        if (scAnalyse.header.code !== 200) {
            toast.error(scAnalyse.header.message);
            return;
        } else {
            etape1 = scAnalyse?.response[0]?.stepId;
            analysisDispatch({ type: 'SET_SCENARIO_ANALYSIS', payload: { scAnalyse } });
            processAnalysisData(selectedEmotion)
        }
    }
};

const processAnalysisData = (selectedEmotion) => {
    let tabEtapes = [];
    let analyseObjState = [];
    let data = scAnalyse ? scAnalyse.response :scenarioAnalysis?.scAnalyse?.response;
        data.forEach((obj, idx) => {
            if (obj?.average !== null) {
                scoreTab.push(obj?.average?.[selectedEmotion] === null ? 0 : parseFloat(obj?.average?.[selectedEmotion]));
                ecartTab.push(obj?.deviation?.[selectedEmotion] === null || obj?.deviation?.[selectedEmotion] === undefined || obj?.deviation?.[selectedEmotion] === "" ? 0 : parseFloat(obj?.deviation?.[selectedEmotion]));
                tabMax.push(obj?.max?.[selectedEmotion] === null ? 0 : parseFloat(+obj?.max?.[selectedEmotion]));
                tabMin.push(obj?.min?.[selectedEmotion] === null ? 0 : parseFloat(+obj?.min?.[selectedEmotion]));
                etapeTab.push(obj?.labels);
                nbrTesters = obj?.testersNb;
            
                tabEtapes.push(obj);
                state.dataDev?.datasets[0]?.data?.push(obj?.deviation?.[selectedEmotion]);

                data1.labels[idx] = obj.labels;
                dataTest[idx] = obj.average?.[selectedEmotion];
            
                analyseObjState.push(obj);
            }
        });
        const questionStep = scenario?.steps[0]?.question; 
        dispatch({ type: 'SET_STEP', payload: { tabEtapes, questionStep, analyseObj: analyseObjState } });
    };

const handleEmotionClick = (emotion) => {
    setSelectedEmotion(emotion);
    updateDataMoyChart(emotion);
};


const updateDataMoyChart = (emotion) => {
    const dataMoyChart = createChartDataForEmotion(emotion);
    setDataMoyChart(dataMoyChart);
};

const createChartDataForEmotion = (emotion) => {
    processAnalysisData(emotion)
    const dataMoyChart = createChartData();
    dispatch({ type: 'SET_CHART', payload: { dataMoyChart: dataMoyChart } });

};

const fetchSelectedScenario = async () => {
    await scenarioServices.getScenarioById(id).then(async (res) => {
        if (res.header.code !== 200) {
            toast.error(res.header.message);
            return;
        } else {
            const stAnalyse = await analyseServices.getStepAnalysesEmotions(etape1);
            if (stAnalyse) {
                processStepAnalyses(stAnalyse);
            }
        }
        
    }).catch(err => {
        console.log(err);
    });
};


const processStepAnalyses = (scenarioAnalysis) => {
    if (scenarioAnalysis.header.code !== 200) {
        toast.error(scenarioAnalysis.header.message);
    } else {
        scenarioAnalysis.response.answers.forEach((analyse) => {
            const testerName = `${analyse.tester_name.charAt(0).toUpperCase() + analyse.tester_name.slice(1)} ${analyse.tester_lastName.charAt(0).toUpperCase()}`;
            const tester_id = analyse.tester_id;
            if (analyse.score !== 0 || analyse.score !== null || analyse.score !== undefined) {
                analyses = analyseEmotionsMapper(analyses, analyse, testerName, tester_id);
            }
        });

        if (analyses.length > 1) {
            const dataMoyChart = createChartData();
            dispatch({ type: 'SET_CHART', payload: { dataMoyChart: dataMoyChart } });
        } else {
            const dataMoyChart = createSingleDataChart();
            dispatch({ type: 'SET_CHART', payload: { dataMoyChart: dataMoyChart } });
        }
        setTimeout(() => {
            dispatch({
                type: 'SET_STATE', payload: {
                    stepAnalyse: analyses,
                    analyse: scenarioAnalysis?.response && scenarioAnalysis?.response[0],
                    duration: scenarioAnalysis?.response && parseFloat(scenarioAnalysis?.response?.step_duration),
                    score: scenarioAnalysis?.response && parseFloat(scenarioAnalysis?.response?.scoreAVG),
                    deviation: scenarioAnalysis?.response && parseFloat(scenarioAnalysis?.response?.deviationAVG),
                    nbrTester: analyses.length,
                    cliqueEtape: 1
                }
            });
        }, 1000)
    }
};

const createChartData = () => {
    return {
        labels: etapeTab,
        datasets: [
            {
                label: 'Moyenne',
                data: scoreTab,
                pointBackgroundColor: scoreTab.map(value => getPointColor(value)),
                pointBorderColor: scoreTab.map(value => getPointColor(value)),
            },
            {
                label: 'Valeur maximales',
                data: tabMax,
                borderColor: 'rgba(0, 163, 89, 1)',
                backgroundColor: 'rgba(0, 163, 89, 1)',
                datalabels: { display: false },
                pointRadius: 2.5,
                pointHoverRadius: 2.5,
                borderDash: [4, 7],
                borderWidth: 0.5,
            },
            {
                label: 'Valeur minimales',
                data: tabMin,
                borderColor: 'rgba(255, 0, 0, 1)',
                backgroundColor: 'rgba(255, 0, 0, 1)',
                datalabels: { display: false },
                pointRadius: 2.5,
                pointHoverRadius: 2.5,
                borderDash: [4, 7],
                borderWidth: 0.5,
            },
        ]
    };
};

const createSingleDataChart = () => {
    return {
        labels: etapeTab,
        datasets: [
            {
                label: 'Moyenne',
                data: scoreTab,
                pointBackgroundColor: scoreTab.map(value => getPointColor(value)),
                pointBorderColor: scoreTab.map(value => getPointColor(value)),
            }
        ]
    };
};

const getPointColor = (value) => {
    if (value === 0) return 'black';
    if (value > 0) return 'green';
    return 'red';
};

useEffect(() => {
    if (state.dataMoyChart) {
        setLocalState(prevState => ({
            ...prevState,
            dataMoyChart: state.dataMoyChart,
        }));
    }
}, [state.dataMoyChart]);

const getStepAnalysesById = async stepId => {
    let analyses = []
    let stAnalyse = {}
    stAnalyse = await analyseServices.getStepAnalysesEmotions(stepId)
    if (stAnalyse?.header) {
        if (stAnalyse.header.code !== 200) {
            toast.error(stAnalyse.header.message)
            return
        } else {
            stAnalyse.response.answers.forEach((analyse) => {
                const testerName = `${analyse.tester_name.charAt(0).toUpperCase() + analyse.tester_name.slice(1)} ${analyse.tester_lastName.charAt(0).toUpperCase()}`;
                const tester_id = analyse.tester_id;
                analyses = analyseEmotionsMapper(analyses, analyse, testerName, tester_id);
            })
            dispatch({
                type: 'SET_STATE', payload: {
                    stepAnalyse: analyses,
                    videoEtap: stAnalyse?.response && stAnalyse?.response[0]?.video,
                    analyse: stAnalyse?.response && stAnalyse?.response[0],
                    duration: stAnalyse?.response && parseFloat(stAnalyse?.response?.step_duration),
                    score: stAnalyse?.response && parseFloat(stAnalyse?.response?.scoreAVG),
                    deviation: stAnalyse?.response && parseFloat(stAnalyse?.response?.deviationAVG),
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
        dispatch({ type: 'CHANGE_STEP', payload: { selectedRow: -1 } });
        // si on clique sur une etape depuis le select
        console.log("State",state.tabEtapes);
        console.log("Etape",e);
        
        if (isNaN(e)) {
            let stepId = e.target.value;            
            const etapeNumber = state.tabEtapes.findIndex(res => res.stepId === stepId)   
            if(etapeNumber !== -1){
                const questionStep = state.scenario?.steps[etapeNumber]?.question
                dispatch({ type: 'SELECTED_STEP', payload: { selectedStep: etapeNumber + 1, questionStep: questionStep } });
                getStepAnalysesById(stepId);
            }
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

            /**
     * Filter function that dispatches a 'CHANGE_MODE' action with the given button.
     *
     * @param {type} e - The button value to be dispatched.
     */
    const filter = (e) => {
        dispatch({ type: 'CHANGE_MODE', payload: { btn: e } });
    }

    /**
     * Updates the mode and score based on the given parameter.
     *
     * @param {string} e - The mode to be updated. It can be either "moyenne" or "ecart".
     * @return {void} This function does not return anything.
    */
    const filter2 = (e) => {
        dispatch({ type: 'CHANGE_MODE2', payload: { btn2: e } });
    }


    /* RENDER */
    return (
        <>
            <div className='analyze_form'>
                <DashboardHeader>
                    <HeaderBar
                        title="Analyse emotionnelle"
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
                            <>
                                <div className='filter-section'>
                                    <div className='filter-section-left'>
                                        <img src={Filter} alt="" className="img_style2" />
                                        <Label className='filter_text'>Filter</Label>
                                        {
                                            emotions.map(({ emotion, label, notSelectedClass, selectedClass }) => (
                                                <EmotionsButtons 
                                                    key={label} 
                                                    selectedEmotion={selectedEmotion}
                                                    handleEmotionClick={handleEmotionClick} 
                                                    emotion={emotion} 
                                                    label={label} 
                                                    notSelectedClass={notSelectedClass} 
                                                    selectedClass={selectedClass}
                                                />
                                            ))                                    
                                        }
                                    </div>
                                    <div>
                                        <span   span className='journey_map' onClick={() => this.filter('map')}>Courbe d’émotions</span>
                                    </div>
                                </div>
                                <div className="analyze_semantique_container">
                                    <div className='filter-section'>
                                        <span className="ml-1 question-text-chart"> Veuillez selectionner un point du graphique pour voir le détail des étapes </span>
                                    </div>
                                    <div className="analyze-section">
                                        <AnalyseChartSection
                                            btn2={state.btn2}
                                            filter2={filter2}
                                            filter={filter}
                                            dataMoyChart={state.dataMoyChart}
                                            dataEcartChart={state.dataEcartChart}
                                            stepView={stepView}
                                            onChangeStep={onChangeStep}
                                            analyseObj={state.analyseObj}
                                            activeEmotion={selectedEmotion}
                                        />
                                        <AnalyzeEmotionsSection
                                            ref={myRef}
                                            cliqueEtape={state.cliqueEtape}
                                            tabEtapes={state.tabEtapes}
                                            duration={state.duration}
                                            onChangeStep={onChangeStep}
                                            btn2={state.btn2}
                                            analyse={state.analyse}
                                            questionStep={state.questionStep}
                                            score={state.score}
                                            ecartScore={state.deviation}
                                            stepAnalyse={state.stepAnalyse}
                                        />
                                        <ReactTooltip />
                                    </div>
                                </div>
                            </>
                }
            </div>
            <ReactTooltip />
        </>
    );
};

export default FacialRecognition;