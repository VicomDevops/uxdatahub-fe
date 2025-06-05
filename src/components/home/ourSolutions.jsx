import React, { Component } from 'react';
import { connect } from "react-redux";
import HomePageForm from './homePage.jsx'
import './homePage.css'
class OurSolutions extends Component {

    render() {

        return (
            <HomePageForm />
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    auth: state.auth
});

export default connect(mapStateToProps)(OurSolutions);
