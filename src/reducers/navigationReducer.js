import { TAB_DASHBOARD_ITEM_CHANGED, TAB_DASHBOARD_MENU_CHANGED, HOME_PAGE_SCROLL, COLLAPSE_DASHBOARD } from "../typeActions/navigationTypes";

const INITIAL_STATE = {
    tab: "",
    menu: "",
    currentPath: "",
    scrolledSection: "",
    collapseDashboard : false
};

/**
 * This reducer manages the state related to the navigation of the application.
 * It stores the currently selected tab and menu, as well as the currently scrolled section.
 * The state is an object with the properties:
 * - tab: the currently selected tab
 * - menu: the currently selected menu
 * - currentPath: the current path of the router
 * - scrolledSection: the currently scrolled section
 * - collapseDashboard: a boolean indicating whether the dashboard is collapsed or not
 */
const navigationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case HOME_PAGE_SCROLL:
            return {
                ...state,
                scrolledSection: action.payload
            };
        case TAB_DASHBOARD_ITEM_CHANGED:
            return {
                ...state,
                tab: action.payload
            }
        case TAB_DASHBOARD_MENU_CHANGED:
            return {
                ...state,
                menu: action.payload
            }
        case COLLAPSE_DASHBOARD:
            return {
                ...state,
                collapseDashboard: action.payload
            };
        default:
            return state;
    }
};

export default navigationReducer;