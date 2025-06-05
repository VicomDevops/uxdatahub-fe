//REACT IMPORT
import React, { useState, useEffect } from 'react';
//REDUX IMPORT
import { useSelector } from "react-redux";
//ROUTER IMPORT
import { Switch, Route } from "react-router-dom";
//COMPONENTS IMPORT
import { menuLandingAdmin } from '../../../utils/routes'
import Welcome from '../../common/welcome';

/**
 * This component is the landing page for the admin.
 * It displays a welcome message for a certain amount of time
 * and then renders the routes for the admin section of the application.
 * The routes are determined by the current language and are stored in the
 * menuLandingAdmin object.
 * @function
 * @returns {React.Component} The component to be rendered.
*/
const AdminIndex = () => {
    //HOOKS
    const { lng, user } = useSelector(state => state.auth);
    const [welcome, setWelcome] = useState(true);

    useEffect(() => {
        const welcomeTime = setTimeout(() => {
            setWelcome(false);
        }, 2000);
        return () => clearTimeout(welcomeTime);
    }, []);

    //RENDER
    return (
        <>
            {welcome && <Welcome userName={user.name}/>}
            {
                !welcome && 
                    <Switch>
                        {
                            menuLandingAdmin(lng).map(route => 
                                <Route key={route.id} exact path={`/admin${route.path}`} component={route.component} />)
                        }
                    </Switch>
            }
        </>
    );
}

//EXPORT
export default AdminIndex;