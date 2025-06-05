/**
 * @file stepVisualisation.jsx
 *  This file contains the step visualisation component.
 */


/**
 * React imports
 */
import React from 'react';


/**
 * Redux imports
 */
import { connect } from 'react-redux';


/**
 * Reactstrap imports
 */
import { Col, Row, Button, Input, Label } from "reactstrap"


/**
 * CSS imports
 */
import "../scenario.css"


/* -------------------------------------------------------------------------- */
/*                             StepVisualisation                              */
/* -------------------------------------------------------------------------- */

class StepVisualisation extends React.Component {


    /* ---------------------------------- STATE --------------------------------- */

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    /**
     * React lifecycle
     * Will be called before the component is mounted
     */
    UNSAFE_componentWillMount() {
        this.setState({ data: this.props.location.state.data, id: this.props.location.state.id})

    }
    
    /**
     * 
     * @param {*} nextProps 
     * React lifecycle
     */
    UNSAFE_componentWillReceiveProps(nextProps) {
    }



    /* --------------------------------- METHODS -------------------------------- */
    back = () => {
        this.props.history.push({
            pathname: "/client/createsteps",
            state: {
                data: this.state.data,
                scenarioId: this.props.location.state.scenarioId,
            }
        })
    }

    /**
     * 
     * @returns 
     * Render the component
     */
    render() {
        const { data, id } = this.state
        return (
            <div className="scenario__ctn" >
           <Row>
           <Col md='9'>
            <Row className='row__visu'>
                    <Label className='label__form'>Instruction:</Label>
                    <Input
                        placeholder='(Facultatif)'
                        value={data[id - 1].instruction}
                        type="text"
                        //onChange={onchange}
                        disabled
                        name="instruction"
                    />
                </Row>
                <Row className='row__visu'>
                    <Label className='label__form'>Question:</Label>
                    <Input
                        placeholder='(Facultatif)'
                        value={data[id - 1].question}
                        type="text"
                        disabled
                        name="question"
                    />
                </Row>
            </Col>
            <Col md='3' className='col__back'>
            <Button className='toolBox__button' onClick={() => this.back()}>Retour</Button>
            </Col>
           </Row>
                <iframe 
                    title='StepVisualisationSite' 
                    className='iframe__form' 
                    src={data[id - 1].url}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    user: state.user,
    scenario: state.scenario,
});


/**
 * connect the component to the store and export it
 */
export default connect(
    mapStateToProps,
    {}
)(StepVisualisation);