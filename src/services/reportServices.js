import { URL_API } from "./../config.json";
import { REPORT_API } from "./constant/reportConstantApi";
import httpServices from "./httpServices";

/**
 * Sends a POST request to generate an audit UX flash file.
 *
 * @param {Object} payload - The payload to be sent with the request. Should include necessary data for generating the audit UX flash.
 * @returns {Promise<Object>} - A promise that resolves to the server's response.
 * @throws Will throw an error if the request fails.
 */
const generatePreAuditUXFlash = async (payload) => {
    const response = await httpServices.post(URL_API + REPORT_API.PRE_AUDIT_UX_FLASH, payload,{
        headers: httpServices.getAuthorization()
    })
    return response;
}

/**
 * Sends a POST request to generate an audit UX flash file.
 *
 * @param {Object} payload - The payload to be sent with the request. Should include necessary data for generating the audit UX flash.
 * @returns {Promise<Object>} - A promise that resolves to the server's response.
 * @throws Will throw an error if the request fails.
 */
const generateAuditUXFlash = async(payload) => {
    const response = await httpServices.post(URL_API + REPORT_API.AUDIT_UX_FLASH, payload,{ 
        'Content-Type': 'multipart/form-data',
        headers: httpServices.getAuthorization()
    });

    return response;
}

/**
 * Fetches the UX recommendations report for a given scenario.
 *
 * @param {number|string} id - The ID of the scenario for which to fetch the report.
 * @returns {Promise<Object>} - A promise that resolves to the report data.
 * @throws Will throw an error if the request fails.
 */
const getRecommendationReport = async (id) => {
    const response = await httpServices.get(URL_API + REPORT_API.RECOMMEDATIONS_UX_FLASH, {
        params: { scenario_id: +id },
        headers: httpServices.getAuthorization()
    });
    const { data } = response;
    return data;
}

/**
 * Fetches the UX recommendations report for a given scenario.
 *
 * @param {number|string} id - The ID of the scenario for which to fetch the report.
 * @returns {Promise<Object>} - A promise that resolves to the report data.
 * @throws Will throw an error if the request fails.
 */
const getRecommendationConcrete = async (payload) => {
    const response = await httpServices.post(URL_API + REPORT_API.RECOMMEDATIONS_CONCRETE, payload,{
        'Content-Type': 'multipart/form-data',
        headers: httpServices.getAuthorization()
    });
    const { data } = response;
    return data;
}

//ENDPOINTS
const ReportServices = {
    generatePreAuditUXFlash,
    generateAuditUXFlash,
    getRecommendationReport,
    getRecommendationConcrete
}


//EXPORT ENDPOINTS
const reportServices = ReportServices;
export default reportServices;