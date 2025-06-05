import httpServices from "./httpServices";
import { URL_API } from "./../config.json";
import { SCENARIO_API } from "./constant/scenarioContantApi";

/**
 * Fetches the list of scenarios for the client.
 *
 * @returns {Promise<Object[]>} - A promise that resolves to the list of scenarios.
 * @throws Will throw an error if the request fails.
 */
const getClientScenarios = async () => {
    const scenarios = await httpServices.get(URL_API + SCENARIO_API.GET_ALL_CLIENT_SCENARIO, {
        headers: httpServices.getAuthorization()
    })
    const { data } = scenarios
    return data.response;
}

/**
 * Fetches the list of scenarios for the admin.
 *
 * @returns {Promise<Object[]>} - A promise that resolves to the list of scenarios.
 * @throws Will throw an error if the request fails.
 */
const getAdminScenarios = async () => {
    const scenarios = await httpServices.get(URL_API + SCENARIO_API.GET_ALL_ADMIN_SCENARIO, {
        headers: httpServices.getAuthorization()
    })
    const { data } = scenarios
    return data;
}

/**
 * Fetches the number of scenarios created by the user.
 *
 * @returns {Promise<number>} - A promise that resolves to the number of scenarios.
 * @throws Will throw an error if the request fails.
 */
const getCount = async () => {
    const compteur = await httpServices.get(URL_API + SCENARIO_API.GET_COUNT_SCENARIO_NUMBER, {
        headers: httpServices.getAuthorization()
    })
    const { data } = compteur
    return data;
}

/**
 * Fetches the number of testers created by the user.
 *
 * @returns {Promise<number>} - A promise that resolves to the number of testers.
 * @throws Will throw an error if the request fails.
 */
const getCountTester = async () => {
    const compteur = await httpServices.get(URL_API + SCENARIO_API.GET_COUNT_TESTERS_NUMBER, {
        headers: httpServices.getAuthorization()
    })
    const { data } = compteur
    return data;
}

/**
 * Verifies that a scenario name is unique.
 *
 * @param {string} scenarioName - The name of the scenario to verify.
 * @returns {Promise<boolean>} - A promise that resolves to true if the scenario name is
 * unique, false otherwise.
 * @throws Will throw an error if the request fails.
 */
const scenarioNameVerification = async (scenarioName) => {
    const response = await httpServices.get(URL_API + SCENARIO_API.GET_SCENARIO_CHECK_NAME, {
        params: { scenario_name: scenarioName },
        headers: httpServices.getAuthorization()
    })
    const { data } = response
    return data;
}

/**
 * Initiates the play action for a specific scenario.
 *
 * @param {number|string} id - The ID of the scenario to play.
 * @returns {Promise<Object>} - A promise that resolves to the scenario data.
 * @throws Will throw an error if the request fails.
 */
const playScenario = async (id) => {
    const scenario = await httpServices.get(URL_API + SCENARIO_API.EXECUTE_SCENARIO, {
        headers: httpServices.getAuthorization(),
        params: { scenario_id: id }
    })
    const { data } = scenario
    return data;
}

/**
 * Pauses a scenario that is currently running.
 *
 * @param {number|string} id - The ID of the scenario to pause.
 * @returns {Promise<Object>} - A promise that resolves to the scenario data.
 * @throws Will throw an error if the request fails.
 */
const setPauseScenario = async (id) => {
    const step = await httpServices.post(URL_API + SCENARIO_API.PAUSE_SCENARIO, { scenario_id : id }, {
        headers: httpServices.getAuthorization()
    })
    const { data } = step
    return data;
}

/**
 * Fetches the test data for a specific test and run a test.
 *
 * @param {number|string} id - The ID of the test to retrieve.
 * @returns {Promise<Object>} - A promise that resolves to the test data.
 * @throws Will throw an error if the request fails.
 */
const goTest = async (id) => {
    const test = await httpServices.get(URL_API + SCENARIO_API.EXECUTE_TEST, {
        params: { id: id },
        headers: httpServices.getAuthorization()
    })
    const { data } = test
    return data;
}

/**
 * Fetches the list of questions for a specific test.
 *
 * @param {number|string} scenario_id - The ID of the scenario.
 * @param {number|string} test_id - The ID of the test.  
*/
const getQuestions = async (scenario_id, test_id) => {
    const test = await httpServices.get(URL_API + SCENARIO_API.GET_SCENARIO_QUESTIONS, {
        params: { scenario_id, test_id },
        headers: httpServices.getAuthorization()
    });
    const { data } = test
    return data;
}

/**
 * Fetches a scenario by its ID.
 *
 * @param {number|string} id - The ID of the scenario to retrieve.
 * @returns {Promise<Object>} - A promise that resolves to the scenario data.
 * @throws Will throw an error if the request fails.
 */
const getScenarioById = async (id) => {
    const scenario = await httpServices.get(URL_API + SCENARIO_API.GET_SCENARIO_BY_ID, {
        headers: httpServices.getAuthorization(),
        params: { scenario_id: id }
    })
    const { data } = scenario;
    return data;
}

/**
 * Duplicates a scenario.
 *
 * @param {number|string} id - The ID of the scenario to duplicate.
 * @returns {Promise<Object>} - A promise that resolves to the duplicated scenario data.
 * @throws Will throw an error if the request fails.
 */
const duplicateScenario = async (id) => {
    const scenario = await httpServices.get(URL_API + SCENARIO_API.DUPLICATE_SCENARIO + id, {
        headers: httpServices.getAuthorization()
    })
    const { data } = scenario
    return data;
}

/**
 * Creates a new scenario by sending a POST request.
 *
 * @param {Object} scenario - The scenario data to be saved.
 * @returns {Promise<Object>} - A promise that resolves to the response of the HTTP request.
 * @throws Will throw an error if the request fails.
 */
const saveScenario = async(scenario) => {
    const res = await httpServices.post(URL_API + SCENARIO_API.ADD_SCENARIO, scenario, {
        headers: httpServices.getAuthorization()
    });
    return res;
}


/**
 * Saves a new step by sending a POST request.
 *
 * @param {number|string} idstep - The ID of the step to save.
 * @param {Object} payloads - The payload data related to the step.
 * @returns {Promise<Object>} - A promise that resolves to the saved step data.
 * @throws Will throw an error if the request fails.
 */
const saveStep = async (idstep, payloads) => {
    const step = await httpServices.post(URL_API + SCENARIO_API.ADD_STEP, { idstep, payloads }, {
        headers: httpServices.getAuthorization()
    })
    const { data } = step
    return data;
}


/**
 * Updates the steps of a scenario.
 *
 * @param {number|string} id - The ID of the scenario to update.
 * @param {Array} steps - The steps to update.
 * @returns {Promise<Object>} - A promise that resolves to the updated steps.
 * @throws Will throw an error if the request fails.
 */
const updateSteps = async (id, steps) => {
    const allSteps = await httpServices.put(URL_API + `/api/scenario/${id}/steps`, steps, {
        headers: httpServices.getAuthorization()
    })
    const { data } = allSteps
    return data;
}


/**
 * Edits an existing scenario.
 *
 * @param {number|string} id - The ID of the scenario to edit.
 * @param {Object} scena - The scenario data to be edited.
 * @returns {Promise<Object>} - A promise that resolves to the edited scenario data.
 * @throws Will throw an error if the request fails.
 */
const editScenario = async (id, scena) => {
    const scenario = await httpServices.put(URL_API + SCENARIO_API.UPDATE_SCENARIO + id, scena, {
        headers: httpServices.getAuthorization()
    })
    const { data } = scenario
    return data;
}

/**
 * Unpasses a scenario, i.e. sets its status to "non-r ussi".
 *
 * @param {Object} payload - The payload containing the scenario ID and the tester ID.
 * @returns {Promise<Object>} - A promise that resolves to the response of the HTTP request.
 * @throws Will throw an error if the request fails.
 */
const unpassedScenario = async (payload) => {
    const scenario = await httpServices.post(URL_API + SCENARIO_API.GET_UNPASSED_SCENARIOS, payload, {
        headers: httpServices.getAuthorization()
    })
    const { data } = scenario;
    return data;
}

const passedTests = async (payload) => {
    const scenario = await httpServices.post(URL_API + SCENARIO_API.GET_PASSED_TESTS, payload, {
        headers: httpServices.getAuthorization()
    })
    const { data } = scenario
    return data;
}

/**
 * Closes a scenario, i.e. sets its status to "clotur " and frees all associated testers.
 *
 * @param {number|string} id - The ID of the scenario to close.
 * @returns {Promise<Object>} - A promise that resolves to the response of the HTTP request.
 * @throws Will throw an error if the request fails.
 */
const closeScenario = async (id) => {
    const scenario = await httpServices.post(URL_API + SCENARIO_API.CLOSE_SCENARIO,  { scenario_id: id },
    {
        headers: httpServices.getAuthorization(),
    })
    const { data } = scenario;
    return data;
}

/**
 * Submits the answers of a test.
 *
 * @param {Object} formData - The form data containing the answers.
 * @returns {Promise<Object>} - A promise that resolves to the response of the HTTP request.
 * @throws Will throw an error if the request fails.
 */
const sendAnswers = async (formData) => {
    const res = await httpServices.post(URL_API + SCENARIO_API.TEST_SEND_ANSWERS, formData, {
        headers: httpServices.getAuthorization()
    })
    const { data } = res
    return data;
}

/**
 * Fetches the list of tests for a client.
 *
 * @returns {Promise<Object[]>} - A promise that resolves to an array of test objects.
 * @throws Will throw an error if the request fails.
 */
const getScenarioTests = async () => {
    const tests = await httpServices.get(URL_API + SCENARIO_API.GET_ALL_FREE_TESTS, {
        headers: httpServices.getAuthorization()
    })
    const { data } = tests
    return data;
}

/**
 * Sends a POST request to upload a video.
 *
 * @param {Object} formData - The form data containing the video file.
 * @returns {Promise<Object>} - A promise that resolves to the response of the HTTP request.
 * @throws Will throw an error if the request fails.
 */
const sendVideo = (formData) => {
    const res = httpServices.post(URL_API + SCENARIO_API.TEST_VIDEO_UPLOAD, formData, {
        headers: httpServices.getAuthorization()
    })
    return res;
}

/**
 * Adds a comment to a given answer of a scenario step.
 *
 * @param {number|string} id - The ID of the answer.
 * @param {Object} comment - The comment object containing the comment content.
 * @returns {Promise<Object>} - A promise that resolves to the response of the HTTP request.
 * @throws Will throw an error if the request fails.
 */
const addComment = async (id, comment) => {
    const res = await httpServices.put(URL_API + SCENARIO_API.SCENARIO_TEST_ANSWER + id, comment, {
        headers: httpServices.getAuthorization()
    })
    const { data } = res
    return data;
}

/**
 * Deletes a scenario.
 *
 * @param {number|string} id - The ID of the scenario to delete.
 * @returns {Promise<Object>} - A promise that resolves to the response of the HTTP request.
 * @throws Will throw an error if the request fails.
 */
const deleteScenario = async(id) => {
    const res = await httpServices.delete(URL_API + SCENARIO_API.DELETE_SCENARIO + id, {
        headers: httpServices.getAuthorization() 
    });
    return res
}

/**
 * Deletes a panel.
 *
 * @param {number|string} panel_id - The ID of the panel to delete.
 *
 * @returns {Promise<Object>} - A promise that resolves to the response of the HTTP request.
 * @throws {Error} - Throws an error if the request fails.
 */
const deletePanel = async(panel_id) => {
    const res = await httpServices.post(URL_API + SCENARIO_API.DELETE_PANEL, panel_id, {
        headers: httpServices.getAuthorization(),
    });
    const { data } = res
    return data;
}

/**
 * Edits a panel.
 *
 * @param {Object} panel - The panel object containing the updated panel data.
 * @param {number|string} panelId - The ID of the panel to edit.
 *
 * @returns {Promise<Object>} - A promise that resolves to the response of the HTTP request.
 * @throws {Error} - Throws an error if the request fails.
 */
const editPanel = async (panel, panelId) => {
    const resPanel = await httpServices.post(URL_API + SCENARIO_API.EDIT_PANEL, {panel_id: panelId, panel: panel}, {
        headers: httpServices.getAuthorization()
    })
    const { data } = resPanel
    return data;
}

/**
 * Adds a tester to a panel.
 *
 * @param {number|string} panel_id - The ID of the panel to add the tester to.
 * @param {Object} clientTester - The tester object containing the tester's name, lastname, and email.
 *
 * @returns {Promise<Object>} - A promise that resolves to the response of the HTTP request.
 * @throws {Error} - Throws an error if the request fails.
 */
const ajouterTesterPanel = async (panel_id, clientTester) => {
    let newTester = {
        panel_id,
        name: clientTester.name,
        lastname: clientTester.lastname,
        email: clientTester.email,
    }
    const resPanel = await httpServices.post(URL_API + SCENARIO_API.ADD_TESTER_IN_PANEL, newTester, {
        headers: httpServices.getAuthorization()
    })
    const { data } = resPanel
    return data;
}

/**
 * Replaces a tester in a panel.
 *
 * @param {number|string} panel_id - The ID of the panel to replace the tester in.
 * @param {number|string} remplaceTester_id - The ID of the tester to be replaced.
 * @param {Object} clientTester - The new tester object containing the tester's name, lastname, and email.
 *
 * @returns {Promise<Object>} - A promise that resolves to the response of the HTTP request.
 * @throws {Error} - Throws an error if the request fails.
 */
const replaceTester = async (panel_id, remplaceTester_id, clientTester) => {
    let newTester = {
        current_panel_id: panel_id,
        current_client_tester_id: remplaceTester_id,
        new_email : clientTester.email,
        new_name : clientTester.name,
        new_lastname : clientTester.lastname,
    }
    const resPanel = await httpServices.post(URL_API + SCENARIO_API.REPLACE_TESTER_IN_PANEL, newTester , {
        headers: httpServices.getAuthorization()
    })
    const { data } = resPanel
    return data;
}


/**
 * Gets the list of panels for a client.
 *
 * @returns {Promise<Object[]>} - A promise that resolves to an array of panel objects.
 * @throws {Error} - Throws an error if the request fails.
 */
const getPanels = async () => {
    const panels = await httpServices.get(URL_API + SCENARIO_API.GET_ALL_PANELS, {
        headers: httpServices.getAuthorization()
    })
    const { data } = panels
    return data;
}

/**
 * Gets a panel by its ID.
 *
 * @param {number|string} id - The ID of the panel to fetch.
 *
 * @returns {Promise<Object>} - A promise that resolves to the panel object.
 * @throws {Error} - Throws an error if the request fails.
 */
const getPanelById = async (id) => {
    const panel = await httpServices.post(URL_API + SCENARIO_API.GET_PANEL_BY_ID,  { panel_id: id },
    {
        headers: httpServices.getAuthorization(),
    })
    const { data } = panel;
    return data;
}

/**
 * Detaches a tester from a panel and updates their details.
 *
 * @param {number|string} panel_id - The ID of the panel from which the tester is detached.
 * @param {number|string} detachTester_id - The ID of the tester to be detached.
 * @param {number|string[]} detachedScenarios - The IDs of the scenarios from which the tester is detached.
 * @param {Object} clientTester - The tester object containing updated tester details.
 * @param {string} clientTester.email - The new email of the tester.
 * @param {string} clientTester.name - The new name of the tester.
 * @param {string} clientTester.lastname - The new lastname of the tester.
 *
 * @returns {Promise<Object>} - A promise that resolves to the response data of the HTTP request.
 * @throws {Error} - Throws an error if the request fails.
 */
const detachementTesterFromPanel = async (panel_id, detachTester_id, detachedScenarios, clientTester) => {
    let newTester = {
        current_panel_id: panel_id,
        current_client_tester_id: detachTester_id,
        scenario_id: detachedScenarios,
        new_email : clientTester.email,
        new_name : clientTester.name,
        new_lastname : clientTester.lastname,
    }
    const panel = await httpServices.post(URL_API + SCENARIO_API.DETACH_TESTER_FROM_PANEL,  newTester,
    {
        headers: httpServices.getAuthorization(),
    })
    const { data } = panel;
    return data;
}


/**
 * Updates a panel and assigns it to a scenario.
 *
 * @param {number|string} scenarioId - The ID of the scenario to which the panel is assigned.
 * @param {number|string} panelId - The ID of the panel to be updated.
 *
 * @returns {Promise<Object>} - A promise that resolves to the response data of the HTTP request.
 * @throws {Error} - Throws an error if the request fails.
 */
const savePanelExistant = async (scenarioId, panelId) => {
    const res = await httpServices.post(URL_API + SCENARIO_API.ASSIGN_EXISTANT_PANEL_SCENARIO, { scenario_id: scenarioId, panel_id: panelId }, {
        headers: httpServices.getAuthorization(),
    })
    const { data } = res
    return data;
}

/**
 * Saves a new panel and assigns it to a scenario.
 *
 * @param {Object} panel - The panel object containing the panel data to save.
 * @param {number|string} scenarioId - The ID of the scenario to which the panel is assigned.
 * @returns {Promise<Object>} - A promise that resolves to the response data of the HTTP request.
 * @throws {Error} - Throws an error if the request fails.
 */
const savePanel = async (panel, scenarioId) => {
    const res = await httpServices.post(URL_API + SCENARIO_API.ASSIGN_NEW_PANEL_SCENARIO, { scenario_id: scenarioId, panel }, {
        headers: httpServices.getAuthorization()
    })
    const { data } = res
    return data;
}

/**
 * Edits a tester's information in a panel.
 *
 * @param {Object} tester - The tester object containing updated tester details.
 * @returns {Promise<Object>} - A promise that resolves to the response data of the HTTP request.
 * @throws {Error} - Throws an error if the request fails.
 */
const editTesterFromPanel = async (tester) => {
    const res = await httpServices.post(URL_API + SCENARIO_API.UPDATE_TESTER_IN_PANEL, tester, {
        headers: httpServices.getAuthorization()
    })
    const { data } = res
    return data;
}

/**
 * Deletes a tester from a panel.
 *
 * @param {Object} deleteTester - The deleteTester object containing the panel_id and client_tester_id of the tester to be deleted.
 *
 * @returns {Promise<Object>} - A promise that resolves to the response data of the HTTP request.
 * @throws {Error} - Throws an error if the request fails.
 */
const deleteTesterFromPanel = async (deleteTester) => {
    const res = await httpServices.post(URL_API + SCENARIO_API.DELETE_TESTER_FROM_PANEL, deleteTester , {
        headers: httpServices.getAuthorization()
    })
    const { data } = res
    return data;
}

/**
 * Gets all the free client testers (i.e., testers that are not assigned to any panel) that are associated with a scenario.
 *
 * @returns {Promise<Object[]>} - A promise that resolves to an array of client tester objects.
 * @throws {Error} - Throws an error if the request fails.
 */
const getScenarioTestClientTester = async () => {
    const response = await httpServices.get(URL_API + SCENARIO_API.GET_FREE_TESTS, {
        headers: httpServices.getAuthorization()
    })
    const { data } = response
    return data;
}

/**
 * Sets a test as interrupted.
 *
 * @param {number|string} test_id - The ID of the test to be set as interrupted.
 *
 * @returns {Promise<Object>} - A promise that resolves to the response data of the HTTP request.
 * @throws {Error} - Throws an error if the request fails.
 */
const setTestAsInterrupted = async (test_id) => {
    const test = await httpServices.post(URL_API + SCENARIO_API.SET_INTERRUPT_TEST, { test_id }, {
        headers: httpServices.getAuthorization()
    })
    const { data } = test
    return data;
}

/**
 * Deletes multiple free tests by IDs.
 *
 * @param {number|string[]} testsId - The IDs of the tests to be deleted.
 *
 * @returns {Promise<Object>} - A promise that resolves to the response data of the HTTP request.
 * @throws {Error} - Throws an error if the request fails.
 */
const deleteTestsById = async (testsId) => {
    const response = await httpServices.post(URL_API + SCENARIO_API.DELETE_FREE_TEST, { tests_id : testsId }, {
        headers: httpServices.getAuthorization()
    })
    const { data } = response
    return data;
}

/**
 * Resends the tester credentials for a specific scenario.
 *
 * @param {number|string} tester_id - The ID of the tester whose credentials are to be resent.
 * @param {number|string} scenario_id - The ID of the scenario for which the credentials are to be resent.
 *
 * @returns {Promise<Object>} - A promise that resolves to the response data of the HTTP request.
 * @throws {Error} - Throws an error if the request fails.
 */
const resentTesterCredentials = async (tester_id,scenario_id) => {
    const res = await httpServices.post(URL_API + SCENARIO_API.RESENT_TESTER_CREDENTIALS, {
        tester_id :tester_id,
        scenario_id : scenario_id
    }, {
        headers: httpServices.getAuthorization()
    })
    const { data } = res
    return data;
}


//ENDPOINTS
const ScenarioServices = {
    getClientScenarios,
    getAdminScenarios,
    getCount,
    getCountTester,
    scenarioNameVerification,
    playScenario,
    setPauseScenario,
    goTest,
    getQuestions,
    duplicateScenario,
    closeScenario,
    sendAnswers,
    editScenario,
    unpassedScenario,
    updateSteps,
    saveScenario,
    saveStep,
    deletePanel,
    passedTests,
    getScenarioById,
    sendVideo,
    getScenarioTests,
    getPanels,
    addComment,
    deleteScenario,
    getPanelById,
    detachementTesterFromPanel,
    savePanelExistant,
    ajouterTesterPanel,
    editPanel,
    savePanel,
    editTesterFromPanel,
    deleteTesterFromPanel,
    getScenarioTestClientTester,
    replaceTester,
    setTestAsInterrupted,
    deleteTestsById,
    resentTesterCredentials,
}


//EXPORT ENDPOINTS
const scenarioServices = ScenarioServices;
export default scenarioServices;
