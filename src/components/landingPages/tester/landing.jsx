import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { menuLandingTester } from "../../../utils/routes";
import "../landingPage.css";
import { successLoginTester2, successLoginTester1 } from '../../../actions/authActions'
import QuestionsClient from "./questions";

class LandingTester extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: true,
      show: false,

    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }
  componentDidMount() {
    this.props.auth.connected === true && this.props.history.push("/tester/dashboard");
  }

  showBigHeader = () => {
    this.setState({ isHidden: true });
  };
  showSmallHeader = () => {
    this.setState({ isHidden: false });
  };
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };
  render() {
    const { lng } = this.props.auth;
    
    return (
      <>
        <div className="main">
          <div>
            <Switch>
              <Route
                path={`/tester/questions/:id`}
                component={QuestionsClient}
              />
              {menuLandingTester(lng).map((route) => (
                <Route
                  key={route.id}
                  path={`/tester${route.path}`}
                  component={route.component}
                />
              ))}
            </Switch>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  auth: state.auth,
});

export default connect(mapStateToProps, { successLoginTester1, successLoginTester2 })(LandingTester);
