/**
  * Responsible for managing the state of the component and its child components.
 */

/**
 * initial state
 */
export const initialState = {
    btn: 'all',
    btn2: 'moyenne',
    scenarios: [],
    analyseObj: [],
    scenario: {},
    analyse: {},
    step: {},
    header: [],
    play: false,
    etapes: [],
    dataAv: {
        labels: [],
        datasets: [
            {
                data: [],
            },
        ],
    },
    dataDev: {
        labels: [],
        datasets: [
            {
                data: [],
            },
        ],
    },
    videoEtap: '',
    duration: '',
    questionStep: '',
    selectedScenario: '',
    myRef: null,
    myRefVideo: null,
    chartRef: null,
    chartJs: null,
    cliqueEtape: null,
    loading: true,
    skeleton: false,
    nbrTester: 0,
    selectedStep: 1,
    dataMoyChart: {
        labels: [],
        datasets: [
            {
                data: [],
            },
        ],
    },
    dataEcartChart: {
        labels: [],
        datasets: [
            {
                data: [],
            },
        ],
    },
    tabEtapes: [],
    selectedRow: -1,
    ecartScore: 0,
};



/**
 * A function that takes a state and an action, and returns a new state based on the action type.
 *
 * @param {Object} state - The current state object.
 * @param {Object} action - An action object that contains a type and a payload.
 * @returns {Object} The new state object.
 */
export const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_STATE':
            return { ...state, ...action.payload };
        case 'LIST_SCENARIOS':
            return { ...state, scenarios: action.payload.scenarios };
        case 'SET_SELECTED_SCENARIO_STEP':
            return { ...state, scenario: action.payload.scenario, step: action.payload.step };
        case 'SET_STEP':
            return { ...state, tabEtapes: action.payload.tabEtapes, questionStep: action.payload.questionStep, analyseObj:action.payload.analyseObj };
        case 'CHANGE_STEP':
            return { ...state, selectedRow: action.payload.selectedRow };
        case 'SELECTED_STEP':
            return { ...state, selectedStep: action.payload.selectedStep, questionStep: action.payload.questionStep };
        case 'RESET_SCENARIO':
            return { ...state, scenario: action.payload.scenario, dataAv: action.payload.dataAv, dataDev: action.payload.dataDev, dataMoyChart: action.payload.dataMoyChart, dataEcartChart: action.payload.dataEcartChart };
        case 'CLICKED_STEP':
            return { ...state, cliqueEtape: action.payload.cliqueEtape };
        case 'LOADING_STEP':
            return { ...state, loading: action.payload.loading };
        case 'SET_HEADER':
            return { ...state, header : action.payload.header };
        case 'RESET_SKELETON_LOADING':
            return { ...state, skeleton : action.payload.skeleton, loading: action.payload.loading };
        case 'RESET_SKELETON':
            return { ...state, skeleton : action.payload.skeleton };
        case 'SET_CHART':
            return { ...state, dataMoyChart : action.payload.dataMoyChart };
        case 'SET_CHART_DATA':
            return { ...state, dataAv : action.payload.dataAv, dataDev : action.payload.dataDev, dataEcartChart : action.payload.dataEcartChart };
        case 'CHANGE_MODE':
            return { ...state, btn : action.payload.btn };
        case 'CHANGE_MODE2':
            return { ...state, btn2 : action.payload.btn2 };
        case 'CHANGE_SCORE':
            return { ...state, score : action.payload.score };
        default:
            return state;
    }
};