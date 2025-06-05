import { SET_SCENARIO_ANALYSIS } from '../typeActions/analysisType';

export const setScenarioAnalysis = (data) => {
    return {
        type: SET_SCENARIO_ANALYSIS,
        payload: data,
    };
};