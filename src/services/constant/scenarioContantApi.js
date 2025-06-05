const GET_ALL_CLIENT_SCENARIO = "/api/scenario/clients/list";
const GET_ALL_ADMIN_SCENARIO = "/api/scenario/admin/list";
const GET_SCENARIO_PROGRESS = "/api/scenario/client/progress/list";
const GET_COUNT_SCENARIO_NUMBER = "/api/clients/compteurs";
const GET_COUNT_TESTERS_NUMBER = "/api/testers/tester/compteur";
const GET_SCENARIO_CHECK_NAME = "/api/scenario/check/name";
const EXECUTE_SCENARIO = "/api/scenario/play";
const PAUSE_SCENARIO = "/api/scenario/tester/pause";
const EXECUTE_TEST = "/api/tests/startTest/scenario";
const GET_SCENARIO_QUESTIONS = "/api/scenario/questions/tester/list"
const GET_SCENARIO_BY_ID = "/api/scenario/details/steps/details/list";
const DUPLICATE_SCENARIO = "/api/scenario/duplicate/";
const ADD_SCENARIO = "/api/scenario/create";
const ADD_STEP = "/api/scenario/add/steps";
const UPDATE_SCENARIO = "/api/scenario/";
const GET_UNPASSED_SCENARIOS = "/api/panels/free/scenario/tester/unpassed";
const GET_PASSED_TESTS = "/api/panels/free/scenario/tester/passed";
const CLOSE_SCENARIO = "/api/panels/free/scenario/tester/enclose";
const TEST_SEND_ANSWERS = "/api/tests/submit/test/reponses";
const GET_ALL_FREE_TESTS = "/api/scenario/client/tester/list";
const TEST_VIDEO_UPLOAD = "/api/tests/upload/video/command";
const SCENARIO_TEST_ANSWER = "/api/scenario/step/answer/";
const DELETE_SCENARIO = "/api/scenario/";
const DELETE_PANEL = "/api/panels/free/delete";
const EDIT_PANEL = "/api/panels/free/update";
const ADD_TESTER_IN_PANEL = "/api/panels/free/tester/add";
const REPLACE_TESTER_IN_PANEL = "/api/panels/free/tester/replace";
const GET_ALL_PANELS = "/api/panels/client/list"; 
const GET_PANEL_BY_ID = "/api/panels/free/scenario/tester/details";
const DETACH_TESTER_FROM_PANEL = "/api/panels/free/scenario/tester/detachement";
const ASSIGN_EXISTANT_PANEL_SCENARIO = "/api/panels/free/scenario/update/assign";
const ASSIGN_NEW_PANEL_SCENARIO = "/api/panels/free/scenario/create/assign";
const UPDATE_TESTER_IN_PANEL = "/api/panels/free/client/tester/update"
const DELETE_TESTER_FROM_PANEL = "/api/panels/free/client/tester/delete";
const GET_FREE_TESTS = "/api/scenario/client/tester/list";
const SET_INTERRUPT_TEST = "/api/tests/tester/test/interrupt"
const DELETE_FREE_TEST = "/api/panels/free/tests/remove";
const RESEND_PANEL_CREDENTIALS = "/api/panels/free/resent/credentials";


//EXPORT URLS
export const SCENARIO_API = {
    GET_ALL_CLIENT_SCENARIO,
    GET_ALL_ADMIN_SCENARIO,
    GET_SCENARIO_PROGRESS,
    GET_COUNT_SCENARIO_NUMBER,
    GET_COUNT_TESTERS_NUMBER,
    GET_SCENARIO_CHECK_NAME,
    EXECUTE_SCENARIO,
    PAUSE_SCENARIO,
    EXECUTE_TEST,
    GET_SCENARIO_QUESTIONS,
    GET_SCENARIO_BY_ID,
    DUPLICATE_SCENARIO,
    ADD_SCENARIO,
    ADD_STEP,
    UPDATE_SCENARIO,
    GET_UNPASSED_SCENARIOS,
    GET_PASSED_TESTS,
    CLOSE_SCENARIO,
    TEST_SEND_ANSWERS,
    GET_ALL_FREE_TESTS,
    TEST_VIDEO_UPLOAD,
    SCENARIO_TEST_ANSWER,
    DELETE_SCENARIO,
    DELETE_PANEL,
    EDIT_PANEL,
    ADD_TESTER_IN_PANEL,
    REPLACE_TESTER_IN_PANEL,
    GET_ALL_PANELS,
    GET_PANEL_BY_ID,
    DETACH_TESTER_FROM_PANEL,
    ASSIGN_EXISTANT_PANEL_SCENARIO,
    ASSIGN_NEW_PANEL_SCENARIO,
    UPDATE_TESTER_IN_PANEL,
    DELETE_TESTER_FROM_PANEL,
    GET_FREE_TESTS,
    SET_INTERRUPT_TEST,
    DELETE_FREE_TEST,
    RESEND_PANEL_CREDENTIALS
}