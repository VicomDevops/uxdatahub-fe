//REACT IMPORT
import React, { useEffect, useState } from "react";
//LIBRARY IMPORT
import { Button } from "reactstrap"
//REDUX IMPORT
import { useSelector, useDispatch } from 'react-redux'
//ROUTER IMPORT
import { useHistory } from "react-router";
//SERVICES IMPORT
import { changeActiveItemTabDashboard, changeActiveMenuTabDashboard } from "../../../actions/navigationAction";
import { ROLES } from '../../../utils/constant';
/**
 * Favorite is a component that displays a shortcut
 * to the most important pages of the client dashboard.
 * 
 * It is connected to the Redux store and gets the
 * selected scenario as a prop.
 * 
 * It handles the navigation to the different pages
 * and updates the active menu item and the active
 * menu tab of the dashboard.
 */
const Favorite = () => {
    //HOOKS
    const [isActive, setIsActive] = useState(null);
    const { selectedScenario } = useSelector((state) => state.scenario);
    const { user } = useSelector((state) => state.auth);
    const history = useHistory();
    const dispatch = useDispatch()
    
    useEffect(() => {
        switch (history.location.pathname) {
            case "/client/createscenario":
                setIsActive(0);
                break;
            case "/client/testerpanel":
                setIsActive(1);
                break;
            case "/client/panelList":
                setIsActive(2);
                break;
            case "/client/statistics":
                setIsActive(3);
                break;
            case "/client/step-analyze":
                setIsActive(4);
                break;
            case "/client/recommendations":
                setIsActive(6);
                break;
            case "/client/clientmanage":
                setIsActive(5);
                break;
            default:
                setIsActive(null);
                break;
        }
    }, [history.location])

    /**
     * Handles the navigation to the panel details page or the panel list page
     * depending on if the selected scenario has a panel or not.
     * It also updates the active menu item and the active menu tab of the dashboard.
    */
    const handlePanelScenario = () => {
        if (selectedScenario?.panel?.id) {
            const dataToPass = {
                id: selectedScenario?.panel?.id,
                modified : true
            }
            history.push({
                pathname: '/client/panelDetails',
                state:  dataToPass,
            });
        }else {
            history.push("/client/panellist")
        }
        dispatch(changeActiveMenuTabDashboard("Scenarios"))
        return dispatch(changeActiveItemTabDashboard("Scenarios3"));
    }   

    /**
     * Handles the navigation to the corresponding page and updates the active menu item and the active menu tab of the dashboard.
     * @param {string} route - The route to navigate to.
     */
    const handleSelectedActiveRoute = (route) => {
        switch (route) {
            case "Création de scénario":{
                history.push("/client/createscenario");
                dispatch(changeActiveMenuTabDashboard("Scenarios"))
                return dispatch(changeActiveItemTabDashboard("Scenarios1"));
            }
            case "Création d'un panel":{
                history.push("/client/testerpanel");
                dispatch(changeActiveMenuTabDashboard("Scenarios"))
                return dispatch(changeActiveItemTabDashboard("Scenarios2"));
            }
            case "Data":{
                history.push("/client/statistics");
                dispatch(changeActiveMenuTabDashboard("Résulats"))
                return dispatch(changeActiveItemTabDashboard("Résulats1"));
            }
            case "Statistiques":{
                history.push("/client/step-analyze");
                dispatch(changeActiveMenuTabDashboard("Analyse IA"))
                return dispatch(changeActiveItemTabDashboard("Analyse IA1"));
            }
            case "Recommandations":{
                history.push("/client/recommendations");
                dispatch(changeActiveMenuTabDashboard("Recommandations UX"))
                return dispatch(changeActiveItemTabDashboard("Recommandations UX1"));
            }
            case "Mon Compte":{
                history.push("/client/clientmanage");
                dispatch(changeActiveMenuTabDashboard(""))
                return dispatch(changeActiveItemTabDashboard("Mon Compte"));
            }
            default:
                history.push("/client/");
                dispatch(changeActiveMenuTabDashboard(""))
                return dispatch(changeActiveItemTabDashboard("Tableau de bord"));
        }
    }

    //RENDER
    return (
        <>
            {
                user.roles[0] === ROLES.CLIENT &&
                <div className='favoris-dashboard'>
                    <span className='db__title-client'>Mes accès favoris</span>
                    <div className='display__flex__row-dashboard'>
                        <Button className={isActive === 0 ? "shortcut_client btnIsActive" : "shortcut_client"} onClick={() => handleSelectedActiveRoute("Création de scénario")}>
                            Création de scénario
                        </Button>
                        <Button  className={isActive === 1 ? "shortcut_client btnIsActive" : "shortcut_client"} onClick={() => handleSelectedActiveRoute("Création d'un panel")}>
                            Création d'un panel
                        </Button>
                        <Button  className={isActive === 2 ? "shortcut_client btnIsActive" : "shortcut_client"}  onClick={handlePanelScenario}>
                            Panel du scenario
                        </Button>
                        <Button  className={isActive === 3 ? "shortcut_client btnIsActive" : "shortcut_client"} onClick={() => handleSelectedActiveRoute("Data")}>
                            Retours d'utilisateurs
                        </Button>
                        <Button  className={isActive === 4 ? "shortcut_client btnIsActive" : "shortcut_client"}  onClick={() => handleSelectedActiveRoute("Statistiques")}>
                            Analyse IA
                        </Button>
                        <Button  className={isActive === 6 ? "shortcut_client btnIsActive" : "shortcut_client"}  onClick={() => handleSelectedActiveRoute("Recommandations")}>
                            Recommandation UX
                        </Button>
                        <Button  className={isActive === 5 ? "shortcut_client btnIsActive" : "shortcut_client"} onClick={() => handleSelectedActiveRoute("Mon Compte")}>
                        Mon compte
                        </Button>
                    </div>
                    </div>
            }
        </>
    )
}

//EXPORT
export default Favorite;