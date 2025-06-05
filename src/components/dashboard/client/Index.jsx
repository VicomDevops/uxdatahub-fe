//REACT IMPORTS
import React, { useEffect, useState } from "react";
//REDUX IMPORT
import { useSelector } from "react-redux";
//ROUTER IMPORT
import { Switch, Route } from "react-router-dom";
//COMPONENTS IMPORT
import { menuLandingClient } from "../../../utils/routes";
import Welcome from "../../common/welcome";


/**
 * This component is the landing page for the client.
 * It displays a welcome message for a certain amount of time
 * and then renders the routes for the client section of the application.
 * The routes are determined by the current language and are stored in the
 * menuLandingClient object.
 * @function
 * @returns {React.Component} The component to be rendered.
 */
const ClientIndex = () => {
  //HOOKS
  const {lng, user} = useSelector(state => state.auth);
  const [welcome, setWelcome] = useState(true);

  useEffect(() => {
    const welcomeTime = setTimeout(() => {
      setWelcome(false);
    }, 1500);
    return () => clearTimeout(welcomeTime);
  }, []);

  //RENDER
  return (
    <>
      {welcome && <Welcome userName={user.name} />}
      {!welcome && (
        <Switch>
          {menuLandingClient(lng).map((route) => (
            <Route
              key={route.id}
              exact
              path={`/client${route.path}`}
              component={route.component}
            />
          ))}
        </Switch>
      )}
    </>
  );
}

//EXPORT
export default ClientIndex;
