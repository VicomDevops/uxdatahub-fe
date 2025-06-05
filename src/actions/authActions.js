import {EMAIL_CHANGED, PASSWORD_CHANGED, LOGOUT, FAILED_LOGIN, LNG_CHANGED,SUCCESS_OPEN_POPUP, SUCCESS_LOGIN, SUCCESS_OPEN_WINDOW,
    SUCCESS_LOGIN_TESTER2,SUCCESS_LOGIN_TESTER1,FAILED_FORGET_PASSWORD,SUCCESS_FORGET_PASSWORD} from "./../typeActions/auth";
import authServices from "../services/authServices";

export const onEmailChange = username => {
    return { type: EMAIL_CHANGED, payload: username };
};

export const onPasswordChange = password => {
    return { type: PASSWORD_CHANGED, payload: password };
};

export const changeLng = (lang) => dispatch => {
    return dispatch({
        type: LNG_CHANGED,
        payload: lang
    })
}

export const onLogout = () => {
    return { type: LOGOUT };
};


export const onLoginUser = (username, password, rememberMe) => {
    return dispatch => {
        authServices.loginUser(username, password).then(User => {
            if(User.data.header.code === 200){
                authServices.loginWithJwt(User.data.response.token)
                const userDecoded = authServices.getCurrentUserTokenDecoded()
                dispatch(successLogin(userDecoded));
            }else {
                failedLogin(User.data.header.message, dispatch)
            }
        })
            .catch(err => {
                failedLogin(err, dispatch)
            })
    };
}

export const onForgetPassord = (email) => {
    return dispatch => {
        authServices.forgetPassword(email).then(result => {
            const { data } = result;
            dispatch(successForgetPassword(data,dispatch))
        }).catch(err => {
            failedForgetPassword(err, dispatch)
        })
    };
}

export const onLoginTester = (username, password, rememberMe) => {
    return dispatch => {
        authServices.loginUser(username, password).then(User => {
            if(User.data.header.code === 200){
                authServices.loginWithJwt(User.data.response.token)
                
                const userDecoded = authServices.getCurrentUserTokenDecoded()
                dispatch(successLoginTester1(userDecoded));
            }else {
                failedLogin(User.data.header.message, dispatch)
            }
        })
            .catch(err => {
                failedLogin(err, dispatch)
            })
    };
}
export const successLogin = (user) => {
    return {
        type: SUCCESS_LOGIN,
        user
    };
};
export const successLoginTester1 = () => {
    return {
        type: SUCCESS_LOGIN_TESTER1,
        
    };
};
export const successOpenWindow = () => {
    return {
        type: SUCCESS_OPEN_WINDOW,
        
    };
};
export const successOpenPopup = () => {
    return {
        type: SUCCESS_OPEN_POPUP,
        
    };
};
export const successLoginTester2 = () => {
    return {
        type: SUCCESS_LOGIN_TESTER2,
        
    };
};

const failedLogin = (error, dispatch) => {

    dispatch({
        type: FAILED_LOGIN,
        payload: error
    })

};

/**
 * Dispatches a failed forget password action with the provided payload.
 *
 * @param {object} payload - The payload for the action
 * @param {function} dispatch - The dispatch function for the action
 */
const successForgetPassword = (payload, dispatch) => {
    dispatch({
        type: SUCCESS_FORGET_PASSWORD,
        payload: payload.header
    })
};


/**
 * Dispatches an action to indicate a failed forget password attempt, with the 
 * error payload.
 *
 * @param {error} error - The error object containing the response data.
 * @param {function} dispatch - The dispatch function for Redux actions.
 * @return {void}
 */
const failedForgetPassword = (error, dispatch) => {
    dispatch({
        type: FAILED_FORGET_PASSWORD,
        payload: error.reponse ? error.response.data : error
    })
};