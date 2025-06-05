import React, { Component } from 'react';
import { connect } from 'react-redux';
import Desktop from "../../assets/logo-vector.svg"
import Mobile from "../../assets/client.png"
import { Col, Row, Button } from "reactstrap"
import { changeActiveItemTabDashboard, changeActiveMenuTabDashboard } from "../../actions/navigationAction";


class TesterPanel extends Component {
    state = {
        currentPanel: {
            type: "client"
        }
    }

    submit = () => {
        this.state.currentPanel.type === "insight" && this.props.history.push({   
            pathname: '/client/createpanel', 
            state: this.props.location.state 
        })
        this.state.currentPanel.type === "client" && 
        (
            this.props.location.state === undefined ?
            (
                this.props.history.push({
                pathname: '/client/createpanelclt',
                state: this.props.location.state
                })
            )
            :
            (
                this.props.history.push({   
                pathname: '/client/testerchoix', 
                state: this.props.location.state 
                })
            )
        )
    }

    componentDidMount() {
        this.props.changeActiveItemTabDashboard("Scenarios2")
        this.props.changeActiveMenuTabDashboard("Scenarios")
    }

    
    render() {
        return (
        <div className="panel__ctn" >
            {
                this.props.location.state === undefined ?
                <span className="title__style">Quel type de panel souhaitez-vous utiliser ? </span>
                :
                <span className="title__style">Quel type de panel souhaitez-vous associer ? </span>
            }
            
            <div className='row__create_pt'>
                <Col className='col__create__sc'>
                    {/* <div className='row__imgs' >
                        <div className='container__img2' onClick={() => this.setState({ currentPanel: { ...this.state.currentPanel, type: "insight" } })}>
                            <div className={`image_r2${(this.state.currentPanel.type === "insight") ? '_selected' : ''}`}>
                                <img style={{ width: "9em", height: "5em" }} src={Desktop} alt="" />
                                <span className='type_panel'>Panel Insight</span>
                            </div>
                        </div>
                    </div> */}
                    <div className='row__imgs' >
                        <div className='container__img2'>
                            <div className={`image_r2_creat_scena_disabled`}>
                                <img style={{ width: "9em", height: "5em" }} src={Desktop} alt="" />
                                <span className='type_panel'>Panel Insight</span>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col className='col__create__sc'>
                <div className='row__imgs' >
                    <div className='container__img2' onClick={() => this.setState({ currentPanel: { ...this.state.currentPanel, type: "client" } })}>
                        <div className={`image_r2${(this.state.currentPanel.type === "client") ? '_selected' : ''}`}>
                            <img style={{ width: "66px", height: "5em" }} src={Mobile} alt="" />
                            <span className='type_panel'>Votre panel Client</span>
                        </div>
                    </div>
                </div>
                </Col>
            </div>
            <Row className='row__create_sc'>
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
    {changeActiveItemTabDashboard, changeActiveMenuTabDashboard}
)(TesterPanel);