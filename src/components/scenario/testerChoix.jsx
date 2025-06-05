import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nouvel from "../../assets/nouvel.svg"
import Exist from "../../assets/exist.svg"
import { onGetScenarios } from "../../actions/scenarioActions"

import { Col, Row, Button } from "reactstrap"

class TesterChoix extends Component {
    state = {
        choixPanel: {
            type: ""
        }
    }

    submit = () => {
        this.props.onGetScenarios()
        this.state.choixPanel.type === "nouvel" && this.props.history.push({   
            pathname :'/client/createpanelclt', 
            state: {data:this.props.location.state,
                choixPanel:this.state.choixPanel.type}
            })
        this.state.choixPanel.type === "exist" && this.props.history.push({
            pathname :'/client/createpanelclt',
            state: {data:this.props.location.state,
                choixPanel:this.state.choixPanel.type}
        })
        this.state.choixPanel.type === "plusTard" && this.props.history.push('/client/')
    }
    
    handleClick = () => {
        this.props.onGetScenarios()
        this.props.history.push('/client/')
    }


    render() {
        return (
        <div className="panel__ctn" >
            <div className="title__style__choix"> <p>Bravo ! Votre scénario a été créé avec succés. </p> 
            <p>Maintenant, associer un panel à votre scénario </p> </div>
            <div className='row__create_pt__choix'>
                <Col className='col__create__sc'>
                    <div className='row__imgs' >
                        <div className='container__img2' onClick={() => this.setState({ choixPanel: { ...this.state.choixPanel, type: "nouvel" } })}>
                            <div className={`image_r2${(this.state.choixPanel.type === "nouvel") ? '_selected' : ''}`}>
                                <img style={{ width: "9em", height: "5em" }} src={Nouvel} alt="" />
                                <span className='type_panel'>Nouveau panel</span>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col className='col__create__sc'>
                    <div className='row__imgs' >
                        <div className='container__img2' onClick={() => this.setState({ choixPanel: { ...this.state.choixPanel, type: "exist" } })}>
                            <div className={`image_r2${(this.state.choixPanel.type === "exist") ? '_selected' : ''}`}>
                                <img style={{ width: "66px", height: "5em" }} src={Exist} alt="" />
                                <span className='type_panel'>Panel existant</span>
                            </div>
                        </div>
                    </div>
                </Col>
            </div>
            <Row className='row__create_sc__choix'>
                <div style={{ width: "10em" }} > Ou, le faire <span style={{ textDecoration : "underline", color :"#0B6BDB", cursor : "pointer"}} onClick={this.handleClick}> plus tard </span></div>
            </Row>
            <Row className='row__create_sc__choix'>
                <Button className='signup__button' style={{ width: "10em" }} onClick={this.submit}> Valider</Button>
            </Row>
        </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    user: state.user,
    scenario: state.scenario,
});

export default connect(
    mapStateToProps,
    {onGetScenarios}
)(TesterChoix);