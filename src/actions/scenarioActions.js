import {SUCCESS_GET_SCENARIOS,FAILED_GET_SCENARIOS, FAILED_GET_PANELS, SAVE_LIST, SUCCESS_GET_PANELS, 
    SUCCESS_GET_COUNT, FAILED_GET_COUNT, DELETE_LIST, UPDATE_LIST,SELECTED_SCENARIO,SELECTED_PANEL,
    CLEAN_SELECTED_PANEL,
} from "../typeActions/scenario";
import scenarioServices  from "../services/scenarioServices";

// Actions
export const onGetScenarios = () => {
    return dispatch => {
        scenarioServices.getClientScenarios().then(scenarios =>
            dispatch(successGetScenarios(scenarios, dispatch)))
            .catch(err => { failedGetScenarios(err, dispatch) })
    }
}
export const onGetAdminScenarios = () => {
    return dispatch => {
        scenarioServices.getAdminScenarios().then(scenarios => 
            dispatch(successGetAdminScenarios(scenarios.response, dispatch)))
            .catch(err => { failedGetAdminScenarios(err, dispatch) })
    }
}

export const onSaveList = (steps) => {
    return dispatch => dispatch({ type: SAVE_LIST, steps })
}

export const onUpdateList = (steps) => {
    return dispatch => dispatch({ type: UPDATE_LIST, steps })
}

export const onDeleteList = () => {
    return dispatch => dispatch({ type: DELETE_LIST, steps: {} })
}

export const onSelectedScenario = (scenario) => {
    return dispatch => dispatch({ type: SELECTED_SCENARIO, scenario })
}

export const onGetCount = () => {
    return dispatch => {
        scenarioServices.getCount().then(count =>
            dispatch(successGetCount(count, dispatch)))
            .catch(err => { failedGetCount(err, dispatch) })
    }
}

export const onGetPanels = () => {
    return async dispatch => {
        try {
            const panels = await scenarioServices.getPanels();            
            if (panels.header.code !== 200) {
                failedGetPanels(panels.header.message, dispatch);
            } else {
                successGetPanels(panels.response, dispatch);
            }
        } catch (err) {
            failedGetPanels(err, dispatch);
        }
    };
};

export const onGetPanelById = (id) => {
    return dispatch => dispatch({ type: SELECTED_PANEL, id })
};

export const onCleanSelectedPanel = (id) => {
    return dispatch => dispatch({ type: CLEAN_SELECTED_PANEL })
};


//Actions dispatch

const successGetScenarios = (scenarios, dispatch) => {
    dispatch({ type: SUCCESS_GET_SCENARIOS, scenarios });
}

const failedGetScenarios = (error, dispatch) => {
    dispatch({ type: FAILED_GET_SCENARIOS, payload: error });
}
const successGetAdminScenarios = (scenarios, dispatch) => {
    dispatch({ type: SUCCESS_GET_SCENARIOS, scenarios });
}

const failedGetAdminScenarios = (error, dispatch) => {
    dispatch({ type: FAILED_GET_SCENARIOS, payload: error });
}

const successGetPanels = (panels, dispatch) => {
    dispatch({ type: SUCCESS_GET_PANELS, panels });
}

const failedGetPanels = (error, dispatch) => {
    dispatch({ type: FAILED_GET_PANELS, payload: error });
}

const successGetCount = (count, dispatch) => {
    dispatch({ type: SUCCESS_GET_COUNT, count });
}

const failedGetCount = (error, dispatch) => {
    dispatch({ type: FAILED_GET_COUNT, payload: error });
}
