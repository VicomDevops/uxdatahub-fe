import React from 'react';
import { connect } from 'react-redux';
import { Col, Row, Button, Input, Label } from "reactstrap"
import ToolBox from '../createScenario/toolBox'
import StepContainerAdmin from './step'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import "../scenario.css"
import { toast } from 'react-toastify';
class CreateScenarioAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: [],
            data: [],
            list: [],
            show: false,
            isEmpty: true,
            btns: [],
            step: {
                url: "",
                instruction: "",
                question: ""
            },
            scaleRange: {
                minScale: "",
                maxScale: ""
            },
            scenarioName:""
        };

    }

    componentDidMount() {

    }
    UNSAFE_componentWillReceiveProps(nextProps) {
    }
    onchange = (e) => {
        e.preventDefault();
        this.setState({ scaleRange: { ...this.state.scaleRange, [e.target.name]: e.target.value } })
    }
    onChangeStep = (e) => {
        e.preventDefault();
        this.setState({ step: { ...this.state.step, [e.target.name]: e.target.value } })
    }
    onChangePanel = (e) => {
        e.preventDefault();
        this.setState({ scenarioName: e.target.value })
    }
    handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(this.state.list);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        this.setState({ list: items });
    }
    onScale = () => {
        this.setState({
            show: !this.state.show,
            btns: [],
            scaleRange: {
                minScale: "",
                maxScale: ""
            }
        })
    }
    validateScale = () => {
        const { minScale, maxScale } = this.state.scaleRange
        const { step } = this.state
        const colors = [
            "red",
            '#ff0606',
            '#eb6200',
            '#ff7c06',
            '#22780f',
            'green',
        ]
        if (minScale && maxScale) {

            for (let i = minScale; i <= maxScale; i++) {
                this.state.btns.push({ btn: i, color: colors[i % colors.length] });
            }
            this.setState({
                show: !this.state.show, list: [...this.state.list, {
                    id: `${this.state.list.length} + 1`,
                    component: <StepContainerAdmin
                        type="scale"
                        etape={this.state.list.length + 1}
                        btns={this.state.btns}
                        addStep={this.validateStep}
                        visualise={this.visualise}
                        duplicate={this.duplicate}
                        step={step}
                        onchange={this.onChangeStep}
                    />
                }]
            })
        }
        else
            toast.warning('Vous devez saisir le nombre min et max pour proceder')
    }
    onOpen = () => {
        const { step } = this.state
        this.setState({
            list: [...this.state.list, {
                id: `${this.state.list.length} + 1`,
                component: <StepContainerAdmin
                    type="open"
                    etape={this.state.list.length + 1}
                    addStep={this.validateStep}
                    visualise={this.visualise}
                    duplicate={this.duplicate}
                    onchange={this.onChangeStep}
                    step={step}
                />
            }]
        })
    }
    onClose = () => {
        const { step } = this.state
        this.setState({
            list: [...this.state.list, {
                id: `${this.state.list.length} + 1`,
                component: <StepContainerAdmin
                    type="close"
                    inputs={this.state.inputs}
                    add={this.add}
                    substruct={this.substruct}
                    etape={this.state.list.length + 1}
                    addStep={this.validateStep}
                    visualise={this.visualise}
                    duplicate={this.duplicate}
                    step={step}
                    onchange={this.onChangeStep}
                />
            }]
        })
    }
    duplicate = () => {
        this.setState({
            list: [...this.state.list, {
                id: this.state.list[this.state.list.length - 1].id + 1,
                component: this.state.list[this.state.list.length - 1].component
            }]
        })
    }
    visualise = (id) => {
        this.props.history.push({
            pathname: "/client/visualisation",
            state: {
                data: this.state.data,
                // list: this.state.list,
                id: id
            }
        })

    }
    add = () => {
        this.setState({ inputs: [...this.state.inputs, {}] })
    }
    substruct = () => {
        let array = [...this.state.inputs]
        array.splice(this.state.inputs.length - 1, 1);
        this.setState({ inputs: array })
    }
    validateStep = (type) => {
        type === "scale" && this.setState({
            data: [...this.state.data, {
                url: this.state.step.url,
                instruction: this.state.step.instruction,
                question: this.state.step.question,
                minScale: this.state.scaleRange.minScale,
                maxScale: this.state.scaleRange.maxScale,
                number: this.state.list.length
            }],
            step: {
                url: "",
                instruction: "",
                question: ""
            }

        })
        type === "open" && this.setState({
            data: [...this.state.data, {
                url: "",
                instruction: "",
                question: "",
                questionChoices: {
                    choice1: "",
                },
                number: this.state.list.length
            }],
            step: {
                url: "",
                instruction: "",
                question: ""
            }
        })
        type === "close" && this.setState({
            data: [...this.state.data, {
                url: "",
                instruction: "",
                question: "",
                questionChoices: {
                    choice1: "",
                    choice2: "",
                    choice3: ""
                },
                number: this.state.list.length
            }],
            step: {
                url: "",
                instruction: "",
                question: ""
            }
        })

    }

    render() {
        const { list,scenarioName } = this.state
        return (
            <div className="scenario__ctn" >
                <span className="title__style">Create Scénario</span>
                <Row className='row_panel'>
                    <Col md='7'>
                        <Row className='row__form'>
                            <Label className='label__form'>Nom du scénario:</Label>
                            <Input
                                //  placeholder='(Facultatif)'
                                value={scenarioName}
                                type="text"
                                onChange={this.onChangePanel}
                                name="scenarioName"
                                id=""
                                style={{ width: '40vw' }}
                            />
                        </Row>
                    </Col>
                </Row>
                <Row style={{ padding: '2em' }}>
                    <Col md='7'>
                        <DragDropContext onDragEnd={this.handleOnDragEnd}>
                            <Droppable droppableId="steps">
                                {(provided) => (
                                    <ul {...provided.droppableProps} ref={provided.innerRef} style={{ listStyleType: 'none' }}>
                                        {list.map(({ component, id }, index) => {
                                            return (
                                                <Draggable key={id} draggableId={id} index={index}>
                                                    {(provided) => (
                                                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                            {component}
                                                        </li>
                                                    )}
                                                </Draggable>
                                            )
                                        })
                                        }
                                        {provided.placeholder}
                                    </ul>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </Col>
                    <Col md='4'>
                        <ToolBox
                            show={this.state.show}
                            onScale={this.onScale}
                            onOpen={this.onOpen}
                            validateScale={this.validateScale}
                            onClose={this.onClose}
                            onchange={this.onchange}
                            scaleRange={this.state.scaleRange}
                            list={this.state.list}
                            data={this.state.data}
                        />
                    </Col>
                </Row>

                {this.state.data[0] && <Row className='row__create_sc'>
                    <Button className='signup__button' style={{ width: "10em" }} onClick=''> Valider</Button>
                </Row>}
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
    {}
)(CreateScenarioAdmin);