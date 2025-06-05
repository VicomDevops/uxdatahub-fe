import { SUCCESS_SAVE_TESTER, FAILED_SAVE_TESTER, SUCCESS_SAVE_CLIENT, FAILED_SAVE_CLIENT, SUCCESS_GET_USER_CONNECTED, FAILED_GET_USER_CONNECTED,
    SUCCESS_GET_CLIENTS, FAILED_GET_CLIENTS, SUCCESS_GET_TESTERS, FAILED_GET_TESTERS, FAILED_GET_SUBCLIENTS, SUCCESS_GET_SUBCLIENTS,
    FAILED_SAVE_SUBCLIENT, SUCCESS_GET_CURRENT_USER, FAILED_GET_CURRENT_USER } from "../typeActions/user";


const INITIAL_STATE = {
    user: {},
    users: [],
    currentUser: {},
    subClients:[],
    testers: [],
    error:"",
    errorTester: "",
    errorSubClient:"",
};

/**
 * Responsible for managing the state of the user and its child components.
 * 
 * @param {Object} state - The current state object.
 * @param {Object} action - An action object that contains a type and a payload.
 * @returns {Object} The new state object.
 */
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SUCCESS_SAVE_TESTER:
            return {
                ...state,
                user: action.user,
                errorTester: ""
            };
        case SUCCESS_SAVE_CLIENT:
            return {
                ...state,
                user: action.user, 
                error: ""
            };
        case SUCCESS_GET_TESTERS:
            return {
                ...state,
                testers: action.testers, 
                errorTester: ""
            };
        case SUCCESS_GET_SUBCLIENTS:
            return {
                ...state,
                subClients: action.subClients, 
                errorSubClient: ""
            };
        case SUCCESS_GET_USER_CONNECTED:
            return {
                ...state,
                user: action.user
            };
        case SUCCESS_GET_CLIENTS:
            return {
                ...state,
                users: action.users
            };
            case SUCCESS_GET_CURRENT_USER:
                return {
                    ...state,
                    currentUser: action.user,
                };
        case FAILED_SAVE_TESTER:
            return {
                ...state,
                errorTester: action.payload
            };
        case FAILED_SAVE_CLIENT:
            return {
                ...state,
                error: action.payload
            };
        case FAILED_SAVE_SUBCLIENT:
            return {
                ...state,
                errorSubClient: action.payload
            };
        case FAILED_GET_CLIENTS:
            return {
                ...state,
                error: action.payload
            };
        case FAILED_GET_USER_CONNECTED:
            return {
                ...state,
                error: action.payload
            };
        case FAILED_GET_SUBCLIENTS:
            return {
                ...state,
                error: action.payload
            };
        case FAILED_GET_TESTERS:
            return {
                ...state,
                error: action.payload
            };
        case FAILED_GET_CURRENT_USER:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

export default userReducer;