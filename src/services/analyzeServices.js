import { URL_API } from "./../config.json";
import { ANALYSE_API } from "./constant/analyseConstantApi";
import httpServices from "./httpServices";

/**
 * Fetches statistics of a panel for a given scenario and filter.
 *
 * @param {number|string} scenario_id - The ID of the scenario.
 * @param {string} filter - The filter to apply.
 * @returns {Promise<Object>} A promise that resolves to the panel statistics of the scenario.
 * @throws Will throw an error if the request fails.
 */
const getPanelStats = async (scenario_id, filter) => {
    const stats = await httpServices.get(URL_API + ANALYSE_API.GET_PANEL_STATS, {
        params: { scenario_id: scenario_id, filter: filter },
        headers: httpServices.getAuthorization()
    })
    const { data } = stats
    return data;
}

/**
 * Fetches face recognition emotions analyses of a scenario.
 *
 * @param {number|string} id - The ID of the scenario.
 * @returns {Promise<Object>} A promise that resolves to the face recognition emotions analyses of the scenario.
 * @throws Will throw an error if the request fails.
 */
const getScenarioAnalysesFaceRecognitionEmotions = async (id) => {
    const scenario = await httpServices.get(URL_API + ANALYSE_API.GET_FACE_RECOGNITION_DETAILS, {
        params: { scenario_id: id },
        headers: httpServices.getAuthorization()
    })
    const { data } = scenario
    return data;
}

/**
 * Fetches scenario analyses R.
 *
 * @param {number|string} id - The ID of the scenario.
 * @returns {Promise<Object>} A promise that resolves to the scenario analyses R.
 * @throws Will throw an error if the request fails.
 */
const getScenarioAnalysesR = async (id) => {
    const scenario = await httpServices.get(URL_API + ANALYSE_API.GET_ANALYZES_SCENARIO, {
        params: { scenario_id: id },
        headers: httpServices.getAuthorization()
    })
    const { data } = scenario
    return data;
}

/**
 * Fetches the RC analyses of a scenario.
 * @param {number|string} id - The ID of the scenario.
 * @returns {Promise<Object>} - A promise that resolves to the RC analyses of the scenario.
 */
const getScenarioAnalysesRC = async (id) => {
    const scenario = await httpServices.get(URL_API + ANALYSE_API.GET_ANALYZES_SCENARIO_RC, {
        params: { scenario_id: id },
        headers: httpServices.getAuthorization()
    })
    const { data } = scenario
    return data;
}

/**
 * Fetches the R analyses of a step.
 * @param {number|string} id - The ID of the step.
 * @returns {Promise<Object>} - A promise that resolves to the R analyses of the step.
 */
const getStepAnalysesR = async (id) => { 
    const step = await httpServices.get(URL_API + ANALYSE_API.GET_STEP_ANALYSES, { 
        params: { step_id: id },
        headers: httpServices.getAuthorization()
    }) 
    const { data } = step 
    return data;  
} 

/**
 * Fetches the comments of a step analysis.
 * @param {number|string} id - The ID of the step.
 * @returns {Promise<Object>} - A promise that resolves to the comments of the step analysis.
 */
const getStepAnalysesRC = async (id) => { 
    const step = await httpServices.get(URL_API + ANALYSE_API.GET_STEP_ANALYSES_RC, { 
        params: { step_id: id },
        headers: httpServices.getAuthorization()
    }) 
    const { data } = step 
    return data;  
} 

/**
 * Fetches the emotions of a step analysis.
 * @param {number|string} step_id - The ID of the step.
 * @returns {Promise<Object>} - A promise that resolves to the emotions of the step analysis.
 */
const getStepAnalysesEmotions = async (step_id) => { 
    const step = await httpServices.get(URL_API + ANALYSE_API.GET_FACE_RECOGNITION_STEP_DETAILS, { 
        params: { step_id: step_id },
        headers: httpServices.getAuthorization()
    }) 
    const { data } = step 
    return data;  
} 

/**
 * Downloads the video of a step analysis.
 * @param {number|string} id - The ID of the answer.
 * @returns {Promise<Blob>} - A promise that resolves to the video of the step analysis.
*/
const getStepAnalyseVideoDownload = async (id) => {
    const stepAnalyseVideo = await httpServices.get(URL_API + ANALYSE_API.GET_STEP_ANALYSES_VIDEO_DOWNLOAD, {
        params: { 
            answer_id : id 
        },
        responseType: 'blob',
        headers: httpServices.getAuthorization()
    });
    const { data } = stepAnalyseVideo
    return data;
}


/**
 * Fetches the video stream of an answer.
 *
 * @param {number|string} answer_id - The ID of the answer.
 * @returns {Promise<Blob|string>} - A promise that resolves to the video stream blob or a string error message.
 * @throws Will throw an error if the request fails.
 */

const getStepAnalyseVideoStream = async (answer_id) => {
    
    const url = new URL(URL_API + ANALYSE_API.GET_STEP_ANALYSES_VIDEO_STREAM);
    url.searchParams.append('answer_id', answer_id);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 200000); 

    try {
            const response = await fetch(url.toString(), {
            headers: {
                ...httpServices.getAuthorization(), 
            },
            signal: controller.signal
        });

        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.startsWith('video/')) {
        const videoStreamBlob = await response.blob();
        return videoStreamBlob;
    } else {
        const message = await response.json();
        return message;
    }

    } catch (error) {
    if (error.name === 'AbortError') {
        console.error('Request timed out');
    } else {
        console.error('Fetch error:', error);
    }
    throw error;
    } finally {
        clearTimeout(timeoutId);
    }
}


/**
 * Fetches the details of a tester in a specific scenario.
 *
 * @param {number} id - The ID of the scenario.
 * @returns {Promise<Object>} A promise that resolves to the tester details for the scenario.
 * @throws Will throw an error if the request fails.
 */
const getTester = async (id) => {
    const tester = await httpServices.get(URL_API + ANALYSE_API.GET_SCENARIO_DETAILS_BY_TESTER, {
        params: { scenario_id: id },
        headers: httpServices.getAuthorization()
    });
    const { data } = tester;
    return data;
}

/**
 * Get the journey map of a tester in a scenario
 * @param {number} id - the id of the tester
 * @returns {Promise<Object>} - the journey map of the tester in the scenario
*/
const getJourneyMapTester = async (id) => {
    const journeyMap = await httpServices.get(URL_API + ANALYSE_API.GET_JOURNEY_MAP, {
        params: { scenario_id: id },
        headers: httpServices.getAuthorization()
    })
    const { data } = journeyMap
    return data;
}

/**
 * Fetches test data by test ID.
 *
 * @param {number|string} id - The ID of the test to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the test data.
 * @throws Will throw an error if the request fails.
 */
const getTestId = async (id) => {
    const test = await httpServices.get(URL_API + ANALYSE_API.GET_TEST_BY_ID + id,{
        headers: httpServices.getAuthorization()
    })
    const { data } = test
    return data;
}

/**
 * Get the analyses of a tester in a scenario
 * @param {number} idTester - the id of the tester
 * @param {number} scenario_id - the id of the scenario
 * @returns {Promise<Object>} - the analyses of the tester in the scenario
*/
const getAnalysesByTester = async (idTester, scenario_id) => {
    const analyse = await httpServices.get(URL_API + ANALYSE_API.GET_ANALYSES_BY_TESTER, {
        params: { scenario_id: scenario_id, tester_id : idTester },
        headers: httpServices.getAuthorization()
        
    })
    const { data } = analyse
    return data;
}


//ENDPOINTS
const AnalyseServices = {
    getPanelStats,
    getScenarioAnalysesR,
    getScenarioAnalysesRC,
    getStepAnalysesR,
    getStepAnalysesRC,
    getScenarioAnalysesFaceRecognitionEmotions,
    getStepAnalysesEmotions,
    getStepAnalyseVideoDownload,
    getStepAnalyseVideoStream,
    getTester,
    getJourneyMapTester,
    getTestId,
    getAnalysesByTester
}

//EXPORT ENDPOINTS
const analyseServices = AnalyseServices;
export default analyseServices