import React from 'react';
import { connect } from 'react-redux';
import { Col, Row, Label, Button, Input } from "reactstrap"
// import Eye from '../../../assets/eye.svg'
import Compare from '../../../assets/compare.svg'
// import Info from '../../../assets/info.svg'
// import Table from "../../common/table"
// import { Player } from 'video-react';
import scenarioServices from '../../../services/scenarioServices'
import analyseServices from '../../../services/analyzeServices'
import CommentaireForm from '../commentaire'
// import { Bar, HorizontalBar } from "react-chartjs-2";
import Modals from '../../common/modals/modal';
import "./facialRecognition.css"
import LineChart from '../../common/charts/lineChart2';
import { onGetScenarios } from '../../../actions/scenarioActions';

class FacialRecognitionTester extends React.Component {
    state = {
        btn: 'joie',
        scenarios: [],
        scenario: {},
        step: {},
        tests: []

    }

    componentDidMount() {
        onGetScenarios().then(res => {
            this.setState({
                scenarios: res,
                // data1: [
                //     {
                //         name: 'Page A', uv: this.state.btn2 === 'moyenne' ? 4000 : 0, pv: this.state.btn2 === 'ecart' ? 2400 : 0,
                //     },
                //     {
                //         name: 'Page B', uv: this.state.btn2 === 'moyenne' ? 3000 : 0, pv: this.state.btn2 === 'ecart' ? 1398 : 0,
                //     },
                //     {
                //         name: 'Page C', uv: this.state.btn2 === 'moyenne' ? 2000 : 0, pv: this.state.btn2 === 'ecart' ? 9800 : 0,
                //     },
                //     {
                //         name: 'Page D', uv: this.state.btn2 === 'moyenne' ? 2780 : 0, pv: this.state.btn2 === 'ecart' ? 3908 : 0,
                //     },
                //     {
                //         name: 'Page E', uv: this.state.btn2 === 'moyenne' ? 1890 : 0, pv: this.state.btn2 === 'ecart' ? 4800 : 0,
                //     },
                //     {
                //         name: 'Page F', uv: this.state.btn2 === 'moyenne' ? 2390 : 0, pv: this.state.btn2 === 'ecart' ? 3800 : 0,
                //     },
                //     {
                //         name: 'Page G', uv: this.state.btn2 === 'moyenne' ? 3490 : 0, pv: this.state.btn2 === 'ecart' ? 4300 : 0,
                //     },
                // ]
            })
        })
        analyseServices.getScenarioAnalysesR(this.props.scenario?.data.length - 1).then(res => {
            this.setState({ scenariosAnalyze: res })
        })
        analyseServices.getStepAnalysesR(this.props.scenario?.data.length - 1).then(res => {
            this.setState({ stepAnalyze: res })
        })
        scenarioServices.getScenarioById(this.props.scenario?.data.length - 1).then(res => {
            this.setState({ scenario: res, step: res.steps[res.steps.length - 1] })
            analyseServices.getTestId(res.id).then(test => {
                this.setState({ tests: test })
            })
        })

    }
    UNSAFE_componentWillReceiveProps(nextProps) {

    }
    toggle = () => {
        this.setState({ show: !this.state.show })

    }
    renderModalCommentaire() {
        const { clientTesters, userLabel, loading } = this.state
        return (
            <Modals
                // modalSize="modal-lg"
                show={this.state.show}
                toggleShow={this.toggle}
                header='Ajouter un commentaire'
            >
                <CommentaireForm
                    confirmText='Ajouter commentaire'
                    handleSubmit={this.onSubmit}
                    onchange={this.onChange}
                    currentUser={clientTesters}
                    userText={userLabel}
                    loading={loading}
                    error={this.state.error}
                />

            </Modals>
        )
    }

    filter = (e) => {
        this.setState({ ...this.state, btn: e })
    }
    onChange = (e) => {
        this.setState({
            step: this.state.scenario.steps[e.target.value]
        }, () => {
            analyseServices.getStepAnalysesR(this.state.step?.id).then(res => {
                this.setState({ stepAnalyze: res })
            })
        })
    }
    onChangeScenario = (e) => {
        this.setState({
            scenario: this.state.scenarios[e.target.value]
        }, () => {
            analyseServices.getScenarioAnalysesR(this.state.scenario.id).then(res => {
                this.setState({ scenariosAnalyze: res })
            })
        })
    }
    render() {

        const { btn, scenario } = this.state
        const data = {
            labels: ['etape 1', 'etape 2', 'etape 3', 'etape 4', 'etape 5', 'etape 6'],
            datasets: [
                {
                    label: 'Joie',
                    data: [4, 5, 3, 5, 2, 3],
                    fill: false,
                    backgroundColor: '#00a359',
                    borderColor: '#00a359'
                },
            ],
        };
        const data1 = {
            labels: ['etape 1', 'etape 2', 'etape 3', 'etape 4', 'etape 5', 'etape 6'],
            datasets: [
                {
                    label: 'Surprise',
                    data: [3, 2, 4, 5, 2, 1],
                    fill: false,
                    backgroundColor: '#024089',
                    borderColor: '#024089',
                },
            ],
        };
        const data2 = {
            labels: ['etape 1', 'etape 2', 'etape 3', 'etape 4', 'etape 5', 'etape 6'],
            datasets: [
                {
                    label: 'Tristesse',
                    data: [1, 5, 3, 4, 2, 1],
                    fill: false,
                    backgroundColor: '#F68E12',
                    borderColor: '#F68E12',
                },
            ],
        };
        const data3 = {
            labels: ['etape 1', 'etape 2', 'etape 3', 'etape 4', 'etape 5', 'etape 6'],
            datasets: [
                {
                    label: 'Colère',
                    data: [1, 1, 3, 5, 2, 3],
                    fill: false,
                    backgroundColor: '#FB4141',
                    borderColor: '#FB4141',
                },
            ],
        };

        const options2 = {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
        };
        // const dataOptions = {
        //     labels: ['testeur 1', 'testeur 2', 'testeur 3', 'testeur 4', 'testeur 5', 'testeur 6'],
        //     datasets: [
        //         {
        //             label: "indice d'emotion",
        //             data: [4, 1, 3, 5, 2, 3],
        //             backgroundColor: "#17A25C ",
        //             borderColor: "green",
        //         },
        //     ],
        // };

        // const options = {
        //     plugins: {
        //         title: {
        //             display: true,
        //             // text: "Question à échelle de notation ",
        //         },
        //     },
        //     indexAxis: "x",
        //     ticks: {
        //         beginAtZero: true, // minimum value will be 0.
        //         // <=> //
        //         min: 0,
        //         max: 5,
        //         stepSize: 1, // 1 - 2 - 3 ...
        //         major: {
        //             //           enabled: true
        //         },
        //     },
        //     scales: {
        //         xAxes: [
        //             {
        //                 display: true,
        //             },
        //         ],
        //     },
        // };
        return (
            <div className='analyze_form'>
                <Row className='header'>
                    <Col>
                        <Row>
                            <Input type="select" name="select" className='btn_filter_select_scena' id="exampleSelect" onChange={this.onChangeScenario}>
                                {this.state.scenarios?.map((scen, idx) => {
                                    return <option key={idx} value={idx} selected>{scen.title}</option>
                                })
                                }

                            </Input>
                        </Row>
                    </Col>
                    <Col>
                        <Row>

                            <Label className="header_label">Etapes</Label>
                        </Row>
                        <Row>
                            <span className='header_span'>{scenario.steps?.length} </span>

                        </Row>
                    </Col>
                    <Col>
                        <Row>

                            <Label className="header_label">Testeurs</Label>
                        </Row>
                        <Row>

                            <span className='header_span'></span>
                        </Row>
                    </Col>
                    <Col>
                        <Row>

                            <Label className="header_label">Panel</Label>
                        </Row>
                        <Row>

                            <span className='header_span'></span>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Label className="header_label">Score</Label>

                        </Row>
                        <Row>
                            <span className='header_span'></span>

                        </Row>
                    </Col>
                    <Col>
                        <Row>

                            <Label className="header_label">Durée</Label>
                        </Row>
                        <Row>
                            <span className='header_span'></span>

                        </Row>
                    </Col>
                </Row>
                <Row className='body1'>
                    <Row className='row_3'>
                        <Input type="select" name="select" className='btn_filter_select_scena' id="exampleSelect" onChange={this.onChange}>
                            {this.state.tests?.map((step, idx) => {
                                return <option key={idx} value={idx} selected>testeur {idx + 1}</option>
                            })
                            }

                        </Input>
                        {/* <img src={Info} alt="" className="img_style3" />
                        <img src={Excel} alt="" className="img_style" /> */}
                    </Row>
                    <div className='chart_container'>

                        <Row className='filter'>
                            <img src={Compare} alt="" className="img_style2" />
                            <Label className='filter_text'>Comparer</Label>
                            <Button className={`btn_filter1${(btn === "joie") ? '_selected1' : ''}`} onClick={() => this.filter('joie')}>Joie</Button>
                            <Button className={`btn_filter2${(btn === "surprise") ? '_selected2' : ''}`} onClick={() => this.filter('surprise')}>Surprise</Button>
                            <Button className={`btn_filter3${(btn === "tristesse") ? '_selected3' : ''}`} onClick={() => this.filter('tristesse')}>Tristesse</Button>
                            <Button className={`btn_filter4${(btn === "colère") ? '_selected4' : ''}`} onClick={() => this.filter('colère')}>Colère</Button>
                            <span className='journey_map' onClick={() => this.filter('map')}>Courbe d’émotions</span>

                        </Row>
                        <Row className='chat_style'>
                            {btn === 'joie' && <LineChart
                                data={data}
                                options={options2}
                            />}
                            {btn === 'surprise' && <LineChart
                                data={data1}
                                options={options2}
                            />}
                            {btn === 'tristesse' && <LineChart
                                data={data2}
                                options={options2}
                            />}
                            {btn === 'colère' && <LineChart
                                data={data3}
                                options={options2}
                            />}
                        </Row>

                    </div>
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
    {}
)(FacialRecognitionTester);