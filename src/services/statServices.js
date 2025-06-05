import { URL_API } from "./../config.json";
import { STAT_API } from "./constant/statConstant";
import httpServices from "./httpServices";



/**
 * Fetches the details of a scenario.
 *
 * @param {number|string} id - The ID of the scenario.
 * @returns {Promise<Object>} - A promise that resolves to the scenario details.
 * @throws Will throw an error if the request fails.
 */
const getScenarioDetails = async (id) => {
    const stat = await httpServices.get(URL_API + STAT_API.GET_SCENARIO_HEADER, {
        params: { id: +id },
        headers: httpServices.getAuthorization()
    })
    const { data } = stat
    return data;
}

/**
 * Fetches the statistics for a specific scenario.
 *
 * @param {number|string} id - The ID of the scenario.
 * @returns {Promise<Object>} - A promise that resolves to the scenario statistics.
 * @throws Will throw an error if the request fails.
 */
const getScenarioStat = async (id) => {
    const response = await httpServices.get(URL_API + STAT_API.GET_STAT_BY_SCENARIO, {
        headers: httpServices.getAuthorization(),
        params: { scenario_id: +id },
    });
    const { data } = response;
    return data;
}

/**
 * Fetches the response details of a step for a specific tester.
 *
 * @param {number|string} tester_id - The ID of the tester.
 * @param {number|string} answer_id - The ID of the answer.
 * @returns {Promise<Object>} - A promise that resolves to the response details of the step.
 * @throws Will throw an error if the request fails.
 */
const getStepResponseDetails = async (tester_id, answer_id) => {
    const responseDetails = await httpServices.get(URL_API + STAT_API.GET_STEP_TESTER_VIDEO, {
        params : { tester_id, answer_id },
        headers: httpServices.getAuthorization()
    })
    const { data } = responseDetails;
    return data;
}


/**
 * Fetches the face recognition step details for a specific tester.
 *
 * @param {number|string} tester_id - The ID of the tester.
 * @param {number|string} answer_id - The ID of the answer.
 * @returns {Promise<Object>} - A promise that resolves to the face recognition step details.
 * @throws Will throw an error if the request fails.
 */
const getStepFaceshotsDetails = async (tester_id, answer_id) => {
    const responseDetails = await httpServices.get(URL_API + STAT_API.GET_STEP_FACE_RECO_STEP_DETAILS, {
        params : { tester_id: tester_id, answer_id: answer_id},
        headers: httpServices.getAuthorization()
    })
    const { data } = responseDetails;
    return data;
}

/**
 * Downloads an Excel file containing the scenario data for the given scenario and testers.
 *
 * @param {number|string} scenario_id - The ID of the scenario.
 * @param {number[]|string[]} testers_id - The IDs of the testers.
 * @returns {Promise<Blob>} - A promise that resolves to the Excel file.
 * @throws Will throw an error if the request fails.
 */
const downloadExcel = async(scenario_id, testers_id) => {
    const res = await httpServices.post(URL_API + STAT_API.DOWNLOAD_ALL_DATA_SCENARIO, {scenario_id, testers_id}, {
        headers: httpServices.getAuthorization(),
        responseType: 'blob',
        timeout: 100000
    });

    const { data } = res;
    return data;
}

//ENDPOINTS
const StatServices = {
    getScenarioDetails,
    getScenarioStat,
    getStepResponseDetails,
    getStepFaceshotsDetails,
    downloadExcel
}

//EXPORT ENDPOINTS
const statServices = StatServices;
export default statServices;