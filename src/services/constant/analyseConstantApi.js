const GET_PANEL_STATS ="/api/analyze/panel/testers";
const GET_ANALYZES_SCENARIO ="/api/analyze/scenario";
const GET_FACE_RECOGNITION_DETAILS ="/api/facerecognition/scenario/details/emotions";
const GET_ANALYZES_SCENARIO_RC ="/api/analyze/comments/scenario";
const GET_STEP_ANALYSES ="/api/analyze/step";
const GET_FACE_RECOGNITION_STEP_DETAILS="/api/facerecognition/step/emotions";
const GET_STEP_ANALYSES_RC ="/api/analyze/comments/step";
const GET_STEP_ANALYSES_VIDEO_DOWNLOAD="/api/scenario/step/video/download";  
const GET_STEP_ANALYSES_VIDEO_STREAM = "/api/scenario/step/video/stream";
const GET_ANALYZES_TEST_BY_ID = '/api/analyze/test/';
const GET_SCENARIO_DETAILS_BY_TESTER = "/api/scenario/testers/details";
const GET_JOURNEY_MAP ="/api/analyze/average/tests/scenario";
const GET_TEST_BY_ID ="/api/tests/scenario/:id";
const GET_ANALYSES_BY_TESTER ="/api/google-analyze/tester/scenario";


//EXPORT URLS
export const ANALYSE_API = {
    GET_PANEL_STATS,
    GET_ANALYZES_SCENARIO,
    GET_FACE_RECOGNITION_DETAILS,         
    GET_ANALYZES_SCENARIO_RC,
    GET_STEP_ANALYSES,
    GET_FACE_RECOGNITION_STEP_DETAILS,
    GET_STEP_ANALYSES_RC,
    GET_STEP_ANALYSES_VIDEO_DOWNLOAD,
    GET_STEP_ANALYSES_VIDEO_STREAM,
    GET_ANALYZES_TEST_BY_ID,
    GET_SCENARIO_DETAILS_BY_TESTER,
    GET_JOURNEY_MAP,
    GET_TEST_BY_ID,
    GET_ANALYSES_BY_TESTER,
}