import { COLLAPSE_DASHBOARD, HOME_PAGE_SCROLL, TAB_DASHBOARD_ITEM_CHANGED, TAB_DASHBOARD_MENU_CHANGED } from "../typeActions/navigationTypes";

export const setScrolledSection = (sectionName) => {
    return {
        type: HOME_PAGE_SCROLL,
        payload: sectionName,
    };
};

export const changeActiveMenuTabDashboard = (menu) => dispatch => {
    return dispatch({
        type: TAB_DASHBOARD_MENU_CHANGED,
        payload: menu
    })
}

export const changeActiveItemTabDashboard = (tab) => dispatch => {
    return dispatch({
        type: TAB_DASHBOARD_ITEM_CHANGED,
        payload: tab
    })
}

export const collapseDashboard  = (collapse) => dispatch => {
    return dispatch({
        type: COLLAPSE_DASHBOARD,
        payload: collapse
    })
}