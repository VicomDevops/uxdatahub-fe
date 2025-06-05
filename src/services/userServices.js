import { URL_API } from "./../config.json";
import { USER_API } from "./constant/userConstantApi";
import httpServices from "./httpServices";

/**
 * Gets the current connected user.
 * @returns {Promise<Object>} The current user from the server.
 */
const getConnectedUser = async () => {
    const user = await httpServices.get(URL_API + USER_API.GET_CONNECTED_USER,{
        headers: httpServices.getAuthorization()
    })
    const { data } = user
    return data;
}

/**
 * Gets the list of all sub clients.
 * @returns {Promise<Object[]>} The sub clients list from the server.
 */

const getSubClients = async () => {
    const subClients = await httpServices.get(URL_API + USER_API.GET_SUB_CLIENT, {
        headers: httpServices.getAuthorization()
    })
    const { data } = subClients
    return data;
}

/**
 * Gets the list of all submitted clients.
 * @returns {Promise<Object>} The clients list from the server.
 */
const getClients = async () => {
    const Clients = await httpServices.get(URL_API + USER_API.GET_CLIENTS,{
        headers: httpServices.getAuthorization()
    })
    const { data } = Clients
    return data;
}

/**
 * Gets the list of all submitted clients.
 *
 * @returns {object[]} - An array of submitted client objects. Each submitted client object has the following properties:
 * - id: The ID of the submitted client.
 * - email: The email of the submitted client.
 * - name: The name of the submitted client.
 * - role: The role of the submitted client.
 * - submitted: A boolean indicating if the client has been submitted or not.
 */
const getInfoStatus = async () => {
    const status = await httpServices.get(URL_API + USER_API.GET_INFO_STATUS,{
        headers: httpServices.getAuthorization()
    })
    const { data } = status
    return data;
}

/**
 * Sends a POST request to update the client's tester profile.
 *
 * @param {object} info - The object containing the client's tester profile data.
 *
 * @returns {Promise<Object>} - A promise that resolves to the server's response data.
 * @throws Will throw an error if the request fails.
 */
const saveClientTester = async(info) => {
    const response = await httpServices.post(URL_API + USER_API.SAVE_CLIENT_TESTER, info,{
        headers: httpServices.getAuthorization()
    })
    const { data } = response
    return data;
}

/**
 * Sends a POST request to update the client's tester profile photo.
 *
 * @param {File} image - The image to be uploaded as the client's tester profile photo.
 *
 * @returns {Promise<Object>} - A promise that resolves to the server's response data.
 * @throws Will throw an error if the request fails.
 */
const saveClientTesterImage = async(image) => {
    const response = await httpServices.post(URL_API + USER_API.UPDATE_CLIENT_TESTER_IMAGE, image,{
        headers: httpServices.getAuthorization()
    })
    const { data } = response
    return data
}

/**
 * Sends a POST request to update the client's tester password.
 *
 * @param {object} password - The object containing the new password information.
 *
 * @returns {Promise<Object>} - A promise that resolves to the server's response data.
 * @throws Will throw an error if the request fails.
 */
const updateClientTesterPassword = async(password) => {
    const response = await httpServices.post(URL_API + USER_API.CHANGE_USER_PASSWORD, password,{
        headers: httpServices.getAuthorization()
    })
    const { data } = response
    return data
}

/**
 * Updates a client on the server.
 *
 * @param {Object} info - The updated client information.
 *
 * @returns {Promise<Object>} - A promise that resolves to the updated client.
 * @throws Will throw an error if the request fails.
 */
const updateClient = async(info) => {
    const data = await httpServices.put(URL_API + USER_API.UPADTE_CLIENT, { ...info },{
        headers: httpServices.getAuthorization()
    })
    return data
}

/**
 * Fetches the list of testers.
 * @returns {Promise<Object[]>} A promise that resolves to the list of testers. The list is reversed.
 * @throws Will throw an error if the request fails.
 */
const getTesters = async () => {
    const testers = await httpServices.get(URL_API + USER_API.GET_ALL_TESTERS,{
        headers: httpServices.getAuthorization()
    })
    const { data } = testers
    return data.reverse();
}

/**
 * Validates a client by ID.
 * @param {number|string} id - The ID of the client to be validated.
 * @returns {Promise<Object>} A promise that resolves to the response of the HTTP request.
 * @throws Will throw an error if the request fails.
 */
const validateClient = async (id) => {
    const client = await httpServices.get(URL_API + USER_API.VALIDATIED_CLIENT,{
        params: { client_id: +id },
        headers: httpServices.getAuthorization()
    })
    const { data } = client
    return data;
}

/**
 * Validate a tester by id
 * @param {number} id - the id of the tester to be validated
 * @returns {Promise<Object>} - a promise that resolves to the response of the HTTP request
 */
const validateTester = async (id) => {
    const tester = await httpServices.get(URL_API + USER_API.VALIDATIED_TESTER,{ 
        params: { tester_id: +id },
        headers: httpServices.getAuthorization()
    })
    const { data } = tester
    return data;
}

/**
 * Deletes a subclient by ID.
 *
 * @param {number} id - The ID of the subclient to be deleted.
 * @returns {Promise} - A promise that resolves to the response of the HTTP request.
 */
const deleteSubClient = async(id) => {
    const res = await httpServices.delete(URL_API + USER_API.DELETE_SUB_CLIENT, 
        { params: { subclient_id: +id },
        headers: httpServices.getAuthorization()
    });
    return res
}

/**
 * Sends a POST request to create a new tester.
 *
 * @param {Object} user - The tester data to be saved.
 * @returns {Promise} - A promise that resolves to the response of the HTTP request.
 */
const saveTester = async(user) => {
    const res = await httpServices.post(URL_API + USER_API.ADD_TESTER, user);
    return res;
}

/**
 * Sends a POST request to create a new client.
 *
 * @param {Object} user - The user data to be saved.
 * @returns {Promise} - A promise that resolves to the response of the HTTP request.
 */
const saveClient = async(user) => {
    const res = await httpServices.post(URL_API + USER_API.ADD_CLIENT, user);
    return res;
}

/**
 * Sends a POST request to create a new subclient.
 *
 * @param {Object} user - The subclient data to be saved.
 * @returns {Promise} - A promise that resolves to the response of the HTTP request.
 */
const saveSubClient = async(user) => {
    const res = await httpServices.post(URL_API + USER_API.ADD_SUB_CLIENT, user, {
        headers: httpServices.getAuthorization()
    });
    return res;
}

/**
 * Sends a POST request to /api/changePassword to change the password of the user.
 *
 * @param {object} pwd - The object containing the old and new password.
 *
 * @returns {Promise<Object>} - A promise that resolves to the server's response.
 * @throws Will throw an error if the request fails.
 */
const updatePwd = async(pwd) => {
    const res = await httpServices.post(URL_API + USER_API.UPDATE_PASSWORD, pwd);
    return res;
}

/**
 * Sends a POST request to /api/offline/reset/password to change the password of the user.
 *
 * @param {object} pwd - The object containing the old and new password.
 *
 * @returns {Promise<Object>} - A promise that resolves to the server's response.
 * @throws Will throw an error if the request fails.
 */
const submitNewPwd = async(pwd) => {
    const res = await httpServices.post(URL_API + USER_API.UPDATE_OFFLINE_PASSWORD, pwd);
    return res;
}

/**
 * Sends a POST request to /api/help to send a help request.
 *
 * @param {object} help - The help request to send.
 *
 * @returns {Promise<Object>} - A promise that resolves to the server's response.
 * @throws {Error} - Throws an error if the request fails.
 */
const help = async(help) => {
    const res = await httpServices.post(URL_API + USER_API.CLIENT_HELP, help,{
        headers: httpServices.getAuthorization()
    });
    return res;
}

/**
 * Updates a tester on the server.
 *
 * @param {number|string} id - The ID of the tester to update.
 * @param {Object} currentuser - The updated user info.
 * @returns {Promise<Object>} - A promise that resolves to the updated tester.
 */
const updateTester = async (id, currentuser) => {
    const res = await httpServices.put(URL_API + USER_API.UPDATE_TESTER + id, currentuser);
    const { data } = res
    return data;
} 

/**
 * Gets the current user from the server.
 *
 * @returns {Promise<Object>} - A promise that resolves to the current user.
 * @throws Will throw an error if the request fails.
 */
const getCurrentUser = async() => {
    const response = await httpServices.get(URL_API + USER_API.GET_CURRENT_USER,{
        headers: httpServices.getAuthorization()
    });
    const { data } = response
    return data.response;
}

/**
 * Verifies if the given email is already used by a user.
 *
 * @param {string} email - The email to check.
 *
 * @returns {Promise<Object>} - A promise that resolves to the server's response.
 * @throws Will throw an error if the request fails.
 */
const checkMail = async(email) => {
    const response = await httpServices.post(URL_API + USER_API.CHECK_MAIL, { email : email },{
        headers: httpServices.getAuthorization()
    });
    const { data } = response
    return data;
}

/**
 * Verifies if the given email is already used by a tester.
 *
 * @param {string} testerMail - The email to check.
 *
 * @returns {Promise<Object>} - A promise that resolves to the server's response.
 * @throws Will throw an error if the request fails.
 */
const checkTesterMail = async (testerMail) => {
    const res = await httpServices.post(URL_API + USER_API.CHECK_TESTER_MAIL, testerMail, {
        headers: httpServices.getAuthorization()
    })
    const { data } = res
    return data;
}

/**
 * Verifies if the given email is already used by a user.
 *
 * @param {string} email - The email to check.
 *
 * @returns {Promise<Object>} - A promise that resolves to the server's response.
 * @throws Will throw an error if the request fails.
 */
const checkMailModeHorsLigne = async(email) => {
    const response = await httpServices.post(URL_API + USER_API.CHECK_OFFLINE_MAIL, { email : email });
    const { data } = response
    return data;
}

//ENDPOINTS
const UserServices = {
    getConnectedUser,
    getSubClients,
    getClients,
    getInfoStatus,
    saveClientTester,
    saveClientTesterImage,
    updateClientTesterPassword,
    updateClient,
    getTesters,
    updateTester,
    validateClient,
    validateTester,
    deleteSubClient,
    saveTester,
    saveClient,
    saveSubClient,
    updatePwd,
    submitNewPwd,
    help,
    getCurrentUser,
    checkMail,
    checkTesterMail,
    checkMailModeHorsLigne
}


//EXPORT ENDPOINTS
const userServices = UserServices;
export default userServices;
