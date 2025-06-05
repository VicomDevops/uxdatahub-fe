import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import NavBar from "./components/navbar/navbar.jsx";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { authRoutes, Routes } from "./utils/routes";
import store from "./utils/store";
import { successLogin } from "./actions/authActions";
import authServices from "./services/authServices";
import Toast from "./components/common/Toast";
import "./App.css";
import VerticalNavBar from './components/verticalNavBar/verticalNavBar'
import Footer from "./components/footer/footer";
import { Col } from 'reactstrap'
import { successLoginTester1 } from './actions/authActions'
import {menuLandingAdmin, menuLandingClient, menuLandingTester, menuLandingTesterInsight} from './utils/routes' 
import { ROLES } from "./utils/constant.js";
import http from "./services/httpServices.js";

const tokenDecoded = authServices.getCurrentUserTokenDecoded();


if (tokenDecoded) {
  if (tokenDecoded.exp > Date.now() / 1000) {
    http.setToken();
    store.dispatch(successLogin(tokenDecoded));
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lngActive: this.props.auth.lng,
    };
  }

  render() {

    const routes = Routes(this.state.lngActive).map((route, i) => (
      <Route key={route.id + i} path={route.path} component={route.component} />
    ));
    // const clientTesterRoutes = menuLandingClientTester(this.state.lngActive).map((route, i) => (
    //   <Route key={route.id + i} strict path={route.path} component={route.component} />
    // ));
    const routesAuth = authRoutes().map((route, i) => (
      <Route key={route.id + i} strict path={route.path} component={route.component} />
    ));
    const route = Routes(this.state.lngActive).map((r) => r.path);
    // const routeAuth = authRoutes().map((r) => r.path);

    const renderRoutes = route.includes(window.location.pathname) ? (
      <React.Fragment> {routes}</React.Fragment>
    ) : (
      <React.Fragment>
        {" "}
        <Redirect to="/presentation" />
        {routes}
      </React.Fragment>
    );
    //this.props.auth.connected === true
    //clientTesterRoutes.includes(window.location.pathname)?
    const renderRoutesAuth = (
      <React.Fragment>  {this.props.auth.user.roles &&
        this.props.auth.user.roles[0] === ROLES.ADMIN && (
          <Redirect to="/admin" />
        )}
        {this.props.auth.user.roles &&
          this.props.auth.user.roles[0] === ROLES.CLIENT &&  !window.location.pathname.startsWith("/client/StepsTest") && (
            <Redirect to="/client" />
          )}
        {this.props.auth.user.roles &&
          this.props.auth.user.roles[0] === ROLES.TESTER && (
            <Redirect to="/tester/dashboard" />
          )}
        {/* {this.props.auth.user.roles &&
          this.props.auth.user.roles[0] === "ROLE_CLIENT_TESTER" && (
            this.props.auth.connected === ""  ? console.log(this.props.auth.connected === "","retver"):
              <Redirect to="/client-tester/dashboard" />
          )} */}
        {routesAuth}{" "}
      </React.Fragment>

    );
    // const renderNavbar = <NavBar />;
    // const renderProfileRouter = (
    //   <Route path="/profile" component={Profile} exact={true} />
    // );
    // const p = window.location.pathname;

    const path = window.location.pathname;
    const renderFooter = <Footer />
    const { lng } = this.props.auth
    return (
      <div className="App">
        <Router>
          {!this.props.auth.isAuthenticated && <NavBar />}
          {(!this.props.auth.isAuthenticated) ?
            <header className="App-header">

              {!this.props.auth.isAuthenticated && renderRoutes}
              {this.props.auth.isAuthenticated && renderRoutesAuth}

            </header> :
            <>
              {
                this.props.auth.user.roles[0] !== ROLES.CLIENT_TESTER && this.props.auth.user.roles[0] !== "ROLE_CLIENT" ?
                  <div className="App-header2">
                    <div className="contianer1">
                      {this.props.auth.user.roles[0] === ROLES.ADMIN && <VerticalNavBar history={this.props.history} Menu={menuLandingAdmin(lng)} />}
                      {this.props.auth.user.roles[0] === ROLES.TESTER && <VerticalNavBar history={this.props.history} Menu={menuLandingTester(lng)} />}
                    </div>
                    <div className="contianer2">
                      {!this.props.auth.isAuthenticated && renderRoutes}
                      {this.props.auth.isAuthenticated && renderRoutesAuth}
                    </div>
                  </div>
                  :
                    this.props.auth.user.roles[0] === ROLES.CLIENT_TESTER ?
                    <header className="App-header2">
                      {
                        !path.startsWith("/client-tester/questions/") ?
                          <>
                            <Col style={this.props.navigation?.collapseDashboard ?{ flex: 0.4 } :{ flex: 0.8 }}>
                              <VerticalNavBar history={this.props.history} Menu={menuLandingTesterInsight(lng)} />
                            </Col>
                            <Col className="main-side" style={this.props.navigation?.collapseDashboard ?{ flex: 4 } :{ flex: 3.5 }}>
                              {!this.props.auth.isAuthenticated && renderRoutes}
                              {this.props.auth.isAuthenticated && renderRoutesAuth}
                            </Col>
                          </>
                          :
                          <div>
                            {!this.props.auth.isAuthenticated && renderRoutes}
                            {this.props.auth.isAuthenticated && renderRoutesAuth}
                          </div>
                      }
                    </header>
                  :
                    this.props.auth.user.roles[0] === ROLES.CLIENT &&
                    <header className="App-header2">
                      {
                        !path.startsWith("/client/StepsTest") ?
                          <>
                            <div className={this.props.navigation?.collapseDashboard  ? "contianer-collapse1" : "contianer1"}>
                              <VerticalNavBar history={this.props.history} Menu={menuLandingClient(lng)} />
                            </div>
                            <div className={this.props.navigation?.collapseDashboard  ? "contianer-collapse2" : "contianer2"}>
                              {!this.props.auth.isAuthenticated && renderRoutes}
                              {this.props.auth.isAuthenticated && renderRoutesAuth}
                            </div>
                          </>
                          :
                          <div>
                            {!this.props.auth.isAuthenticated && renderRoutes}
                            {this.props.auth.isAuthenticated && renderRoutesAuth}
                          </div>
                      }
                    </header>
              }
            </>
          }
          {!this.props.auth.isAuthenticated && renderFooter}
        </Router>
        <Toast />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  navigation: state.navigation
});

export default connect(mapStateToProps, { successLoginTester1 })(App);
