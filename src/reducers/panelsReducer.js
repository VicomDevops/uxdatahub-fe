import { FAILED_GET_PANELS, SUCCESS_GET_PANELS, SELECTED_PANEL, CLEAN_SELECTED_PANEL} from "../typeActions/scenario"

const INITIAL_STATE = {
    data: [],
    selectedPanel: {},
    error: "",
};

/**
 * Reducer function for managing the state of panels.
 * 
 * Handles the following action types:
 * - SUCCESS_GET_PANELS: Updates the data with the received panels and clears any errors.
 * - FAILED_GET_PANELS: Updates the error with the provided payload.
 * - SELECTED_PANEL: Updates the selectedPanel by finding the panel with the specified id from the data array.
 * - CLEAN_SELECTED_PANEL: Resets the selectedPanel to an empty object.
 */
const panelsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SUCCESS_GET_PANELS:
            return {
                ...state,
                data: action.panels,
                error: ""
            };
        case FAILED_GET_PANELS:
            return {
                ...state,
                error: action.payload
            };
        case SELECTED_PANEL:
            return {
                ...state,
                selectedPanel: state.data?.find((panel) => panel.id === action.id) || {},

            };
        case CLEAN_SELECTED_PANEL:
            return {
                ...state,
                selectedPanel: {},

            };
        default:
            return state;
    }
};

export default panelsReducer;