import {
    SUCCESS_SAVE_TESTER,
    FAILED_SAVE_TESTER,
    SUCCESS_SAVE_CLIENT,
    FAILED_SAVE_CLIENT,
    SUCCESS_GET_USER_CONNECTED,
    FAILED_GET_USER_CONNECTED,
    SUCCESS_GET_CLIENTS,
    FAILED_GET_CLIENTS,
    FAILED_SAVE_SUBCLIENT,
    SUCCESS_GET_TESTERS,
    FAILED_GET_TESTERS,
    FAILED_GET_SUBCLIENTS,
    SUCCESS_GET_SUBCLIENTS,
    FAILED_GET_CURRENT_USER,
    SUCCESS_GET_CURRENT_USER,
} from "../typeActions/user";

import userServices from "../services/userServices"

export const onSaveTester = (user) => {
    return dispatch => {
        userServices.saveTester(user).then(res => {
            dispatch(succesSaveTester(user, dispatch))
        })
        .catch(err => {
            failedSaveTester(err, dispatch)
        })
    }
};


export const onSaveClient = (user) => {
    return dispatch => {
        userServices.saveClient(user).then(res => {
            dispatch(succesSaveClient(user, dispatch))
            return res;
        })
        .catch(err => {
            failedSaveClient(err, dispatch)
        })
    }
};

export const onGetCurrentUser= () => {
    return dispatch => {
        userServices.getCurrentUser().then(user => {
            dispatch(successGetCurrentUser(user, dispatch))
        })
        .catch(err => {
            failedGetCurrentUSer(err, dispatch)
        })
    }
};

export const onSaveSubClient = (user) => {
    return dispatch => {
        userServices.saveSubClient(user).then(res => {
            userServices.getSubClients().then(subClients =>
                dispatch(successGetSubClients(subClients, dispatch)))
                .catch(err => { failedGetSubClients(err, dispatch) })
        })
        .catch(err => {
            failedSaveSubClient(err, dispatch)
        })
    }
};

export const getUserConnected = () => {
    return dispatch => {
        userServices.getConnectedUser().then(user =>
            dispatch(successGetUserConnected(user, dispatch)))
            .catch(err => { failedGetUserConnected(err, dispatch) })
    }
}
export const onGetClients = () => {
    return dispatch => {
        userServices.getClients().then(users =>
            dispatch(successGetClients(users.response, dispatch)))
            .catch(err => { failedGetClients(err, dispatch) })
    }
}

export const onGetTesters = () => {
    return dispatch => {
        userServices.getTesters().then(testers =>
            dispatch(successGetTesters(testers, dispatch)))
            .catch(err => { failedGetTesters(err, dispatch) })
    }
}
export const onGetSubClients = () => {
    return dispatch => {
        userServices.getSubClients().then(subClients =>
            dispatch(successGetSubClients(subClients, dispatch)))
            .catch(err => { failedGetSubClients(err, dispatch) })
    }
}

const successGetUserConnected = (user, dispatch) => {
    dispatch({ type: SUCCESS_GET_USER_CONNECTED, user });
}

const successGetCurrentUser = (user, dispatch) => {
    dispatch({ type: SUCCESS_GET_CURRENT_USER, user });
}


const failedGetUserConnected = (error, dispatch) => {
    dispatch({ type: FAILED_GET_USER_CONNECTED, payload: error });
}
const successGetClients = (users, dispatch) => {
    dispatch({ type: SUCCESS_GET_CLIENTS, users });
}

const failedGetClients = (error, dispatch) => {
    dispatch({ type: FAILED_GET_CLIENTS, payload: error });
}
const failedGetCurrentUSer = (error, dispatch) => {
    dispatch({ type: FAILED_GET_CURRENT_USER, payload: error });
}

const successGetSubClients = (subClients, dispatch) => {
    dispatch({ type: SUCCESS_GET_SUBCLIENTS, subClients });
}

const failedGetSubClients = (error, dispatch) => {
    dispatch({ type: FAILED_GET_SUBCLIENTS, payload: error });
}
const successGetTesters = (testers, dispatch) => {
    dispatch({ type: SUCCESS_GET_TESTERS, testers });
}

const failedGetTesters = (error, dispatch) => {
    dispatch({ type: FAILED_GET_TESTERS, payload: error });
}
const failedSaveSubClient = (error, dispatch) => {
    dispatch({ type: FAILED_SAVE_SUBCLIENT, payload: error });
}

export const succesSaveTester = (user, dispatch) => {
    dispatch({ type: SUCCESS_SAVE_TESTER, user });
}

export const failedSaveTester = (error, dispatch) => {
    dispatch({ type: FAILED_SAVE_TESTER, payload: error.response && error.response.data });
}
export const succesSaveClient = (user, dispatch) => {
    dispatch({ type: SUCCESS_SAVE_CLIENT, user });
}

export const failedSaveClient = (error, dispatch) => {
    dispatch({ type: FAILED_SAVE_CLIENT, payload: error.response && error.response.data });
}
