import React, { Component } from 'react';
import { connect } from "react-redux";
import HomePageForm from './homePage.jsx'


class AboutUs extends Component {

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

export default connect(mapStateToProps)(AboutUs);
