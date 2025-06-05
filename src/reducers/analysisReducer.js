import { SET_SCENARIO_ANALYSIS } from '../typeActions/analysisType';

const initialState = {
    scenarioAnalysis: null,
};

const analysisReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SCENARIO_ANALYSIS:
            return {
                ...state,
                scenarioAnalysis: action.payload,
            };
        default:
            return state;
    }
};

export default analysisReducer;