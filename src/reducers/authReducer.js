import { EMAIL_CHANGED, PASSWORD_CHANGED,LOGOUT, FAILED_LOGIN, SUCCESS_LOGIN, SUCCESS_OPEN_POPUP,SUCCESS_OPEN_WINDOW,
    LNG_CHANGED, SUCCESS_LOGIN_TESTER2, SUCCESS_LOGIN_TESTER1,FAILED_FORGET_PASSWORD,SUCCESS_FORGET_PASSWORD} from "./../typeActions/auth";

const INITIAL_STATE = {
    isAuthenticated: false,
    username: "",
    password: "",
    user: {},
    lng: 'Fr',
    currentUserId: "",
    loading: true,
    openWindow: false,
    openPopup: false,
    connected: "",
    error: "",
    forgetPassword : {},
};

/**
 * This reducer manages the state related to the authentication of the application.
 * It stores the currently logged in user, as well as the currently selected language.
 * The state is an object with the properties:
 * - isAuthenticated: a boolean indicating whether the user is logged in or not
 * - username: the currently entered login
 * - password: the currently entered password
 * - user: the currently logged in user
 * - lng: the currently selected language
 * - currentUserId: the id of the currently logged in user
 * - loading: a boolean indicating whether the reducer is currently loading or not
 * - error: an error message, if a login or logout action failed
 * - openWindow: a boolean indicating whether the window should be opened or not
 * - openPopup: a boolean indicating whether the popup should be opened or not
 * - connected: a boolean indicating whether the user is connected or not
 * - forgetPassword: the result of the forget password action
*/
const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LNG_CHANGED:
            return {
                ...state,
                lng: action.payload
            }
        case EMAIL_CHANGED:
            return {
                ...state,
                username: action.payload,
                error: ""
            };
        case PASSWORD_CHANGED:
            return {
                ...state,
                password: action.payload,
                error: ""
            };
        case LOGOUT:
            return {
                isAuthenticated: false,
                username: "",
                password: "",
                user: {},
                lng: 'Fr',
                currentUserId: "",
                loading: true,
                error: ""
            };
        case SUCCESS_LOGIN:
            return {
                ...state,
                username: "",
                password: "",
                isAuthenticated: true,
                user: action.user,
                currentUserId: action.user.user_id,
                loading: false
            };
        case SUCCESS_LOGIN_TESTER1:
            return {
                ...state,

                connected: true,

            };
        case SUCCESS_LOGIN_TESTER2:
            return {
                ...state,

                connected: state.connected,

            };
        case SUCCESS_OPEN_WINDOW:
            return {
                ...state,

                openWindow: true,

            };
        case SUCCESS_OPEN_POPUP:
            return {
                ...state,

                openPopup: !state.openPopup,

            };
        case FAILED_LOGIN:
            return {
                ...state,
                password: "",
                error: action.payload
            };
        case SUCCESS_FORGET_PASSWORD:
            return {
                ...state,
                forgetPassword: action.payload,
            };
        case FAILED_FORGET_PASSWORD:
            return {
                ...state,
                error: action.payload
            };            
        default:
            return state;
    }
};

export default authReducer;