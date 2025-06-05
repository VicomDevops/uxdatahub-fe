import {
    SUCCESS_GET_SCENARIOS, FAILED_GET_SCENARIOS,FAILED_GET_COUNT,SAVE_LIST,
    DELETE_LIST,UPDATE_LIST,SELECTED_SCENARIO
} from "../typeActions/scenario"

const INITIAL_STATE = {
    data: [],
    selectedScenario : {},
    error: "",
};

/**
 * Reducer function for managing the state of scenarios.
 * Action types handled:
 * - SUCCESS_GET_SCENARIOS: Updates the data with the received scenarios, clears any errors.
 * - SAVE_LIST: Updates the steps with the provided steps, clears any errors.
 * - UPDATE_LIST: Updates the steps with the provided steps, clears any errors.
 * - DELETE_LIST: Updates the steps with the provided steps, clears any errors.
 * - FAILED_GET_COUNT: Updates the error with the provided payload.
 * - FAILED_GET_SCENARIOS: Updates the error with the provided payload.
 * - SELECTED_SCENARIO: Updates the selectedScenario with the provided scenario.
 */
const scenarioReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SUCCESS_GET_SCENARIOS:
            return {
                ...state,
                data: action.scenarios,
                error: ""
            };
        case SAVE_LIST:
            return {
                ...state,
                steps: action.steps,
                error: ""
            };
        case UPDATE_LIST:
            return {
                ...state,
                steps: action.steps,
                error: ""
            };
        case DELETE_LIST:
            return {
                ...state,
                steps: action.steps,
                error: ""
            };
        case FAILED_GET_COUNT:
            return {
                ...state,
                error: action.payload
            };
        case FAILED_GET_SCENARIOS:
            return {
                ...state,
                error: action.payload
            };
        case SELECTED_SCENARIO:
            return {
                ...state,
                selectedScenario: action.scenario
            };
        default:
            return state;
    }
};

export default scenarioReducer;