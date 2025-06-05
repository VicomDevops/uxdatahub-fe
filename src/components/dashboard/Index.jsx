//REACT IMPORT
import React, { useEffect } from "react";
//REDUX IMPORT
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
//COMPONENTS IMPORT
import AdminIndex from "./admin/Index";
import ClientIndex from "./client/Index";
import LandingTester from "../landingPages/tester/landing";
import ClientTesterIndex from "../landingPages/clientTester/Index";
//UTILS IMPORT
import { ROLES } from "../../utils/constant";
import { onGetAdminScenarios, onGetPanels } from "../../actions/scenarioActions";
import { onGetClients, onGetTesters } from "../../actions/userActions";

/**
 * This component renders the appropriate landing page based on the user's role.
 * If the user is logged in, it renders the corresponding landing page.
 * If the user is not logged in, it renders the corresponding landing page.
 * If the user is a tester, it renders the tester landing page.
 * If the user is a client tester, it renders the client tester landing page.
 * If the user is an admin, it renders the admin landing page.
 * If the user is a client, it renders the client landing page.
 * If the user is not logged in and is not in one of the above routes, it renders the landing page.
*/
const Index = () => {
  //HOOKS
  const { user, connected } = useSelector(state => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();


  useEffect(() => {
    if(!user){
      return;
    }else if(user.roles[0] === ROLES.ADMIN){
      dispatch(onGetAdminScenarios());
      dispatch(onGetClients());
      dispatch(onGetTesters());
      dispatch(onGetPanels());
    }
  }, [dispatch, user]);
  
  //RENDER
  return (
    <>
      {
        !location.pathname.startsWith("/client-tester/questions/") &&
        !location.pathname.startsWith("/tester/questions/")&& 
        !location.pathname.startsWith("/tester/infotester/")? (
          <>
            <div className="landing__ctn">
              {user.roles[0] === ROLES.ADMIN && (
                <AdminIndex />
              )}
              {user.roles[0] === ROLES.CLIENT && (
                <ClientIndex />
              )}
              {user.roles[0] === ROLES.TESTER && (
                <LandingTester />
              )}
            </div>
            <div className='landing__client_tester'>
            {user.roles[0] === ROLES.CLIENT_TESTER && (
                <ClientTesterIndex connected={connected}/>
              )}
            </div>
          </>
        ) : (
          <div className="question_dyn">
            {user.roles[0] === ROLES.TESTER &&  (
              <LandingTester />
            )}
            {user.roles[0] === ROLES.CLIENT_TESTER && (
              <ClientTesterIndex />
            )}
          </div>
        )
      }
    </>
  );
}

//EXPORT
export default Index;
