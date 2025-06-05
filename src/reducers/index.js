import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import scenarioReducer from "./scenarioReducer";
import analysisReducer from "./analysisReducer";
import panelsReducer from "./panelsReducer";
import navigationReducer from "./navigationReducer";

export default combineReducers({
    analysis: analysisReducer,
    auth: authReducer,
    user: userReducer,
    scenario: scenarioReducer,
    panel: panelsReducer,
    navigation: navigationReducer
});
