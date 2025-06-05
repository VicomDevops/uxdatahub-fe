//REACT IMPORT
import React, { useEffect } from "react";
//REDUX IMPORT
import { useSelector } from "react-redux";
//ROUTER IMPORT
import { Switch, Route, useHistory } from "react-router-dom";
//SERVICES IMPORT
import { menuLandingClientTester } from "../../../utils/routes";
//COMPONENTS IMPORT
import QuestionsClient from "./questions";
//STYLES IMPORT
import "../landingPage.css";


/**
 * This component is the landing page for the client-tester.
 * It displays a menu with routes defined in menuLandingClientTester
 * and renders the corresponding component for each route.
 * The routes are determined by the current language and are stored in the
 * menuLandingClientTester object.
 */
const ClientTesterIndex = ({ connected=false }) => {
  //HOOKS
  const { lng } = useSelector(state => state.auth);
  const history = useHistory();

  useEffect(() => {
    console.log(connected);
    
    connected === true && history.push("/client-tester/dashboard");
  }, [history, connected]);

  //RENDER
  return (
    <div className="main">
      <div>
        <Switch>
          <Route
            path={`/client-tester/questions/:id`}
            component={QuestionsClient}
          />
          {menuLandingClientTester(lng).map((route) => (
            <Route
              key={route.id}
              path={`/client-tester${route.path}`}
              component={route.component}
            />
          ))}
        </Switch>
      </div>
    </div>
  );
}

//EXPORT
export default ClientTesterIndex;
