import React from 'react';
import { connect } from 'react-redux';
import { onGetScenarios } from "../../actions/scenarioActions"
import { Col, Input, FormFeedback } from "reactstrap"
import Web from "../../assets/web.png"
import Produit from "../../assets/produit.png"
import Application from "../../assets/application.png"
import Service from "../../assets/service.png"
import Moderate from "../../assets/modéré.png"
import Test from "../../assets/test.png"
import Mic from "../../assets/mic.png"
import Camera from "../../assets/camera.png"
import ABtest from "../../assets/abtest.png"
import scenarioServices from '../../services/scenarioServices'
import { toast } from 'react-toastify';
import ScenarioSteps from './scenarioSteps'
import "./scenario.css"
import BeginStepPopup from './BeginStepPopup';
import LoaderButton from '../common/loaders/LoaderButton';
class CreateScenario extends React.Component {
    state = {
        data: [],
        count: 0,
        idx: '',
        currentScenario: {
            title: "",
            product: "Site web",
            isUnique: 1,
            isModerate: 0,
            langue: "français"
        },
        title: "",
        error: false,
        textError: "",
        errorChamps: false,
        openStepPopup: false,
        res: {},
        etat: "",
        isSubmitting: false,
        loading: false
    }


    componentDidMount() {
        if (this.props.location?.state?.title) {
            this.setState({
                currentScenario: {
                    ...this.state.currentScenario, title: this.props.location.state.title,
                    isUnique: this.props.location.state.isUnique, isModerate: this.props.location.state.isModerate,
                    product: this.props.location.state.product
                }, idx: this.props.location?.state.id
            })
        }

    }


    UNSAFE_componentWillReceiveProps(nextProps) {
    }



    onChange = e => {
        e.preventDefault();
        this.setState({ currentScenario: { ...this.state.currentScenario, [e.target.name]: e.target.value }, error: false })
    };

    togglePopup = () => {
        this.setState({ openStepPopup: !this.state.openStepPopup })
    }

    renderBeginStep = () => {
        return <BeginStepPopup open={this.state.openStepPopup} toggle={this.togglePopup} nextPage={this.nextPage} />
    }

    next = async () => {

        this.setState({ error: false, loading: true, textError: "" });
        const { title, product, isUnique, isModerate, langue } = this.state.currentScenario;
        const { count } = this.state;

        switch (count) {
            case 0: {
                const verificationResponse = await scenarioServices.scenarioNameVerification(title);
                if (verificationResponse.header.code === 201) {
                    this.setState({ error: true, textError: verificationResponse.header.message });
                } else if (verificationResponse.header.code >= 400) {
                    toast.error(verificationResponse.header.message);
                } else {
                    this.setState({ count: count + 1 });
                }
                break;
            }
            case 1: {
                if (langue === "") {
                    toast.error("Veuillez choisir un type de support");
                } else {
                    this.setState({ count: count + 1 });
                }
                break;
            }
            case 2: {
                if (product === "") {
                    toast.error("Veuillez choisir un type de support");
                } else {
                    this.setState({ count: count + 1 });
                }
                break;
            }
            case 3: {
                if (isUnique === "") {
                    toast.error("Veuillez choisir la nature du test");
                } else {
                    this.setState({ count: count + 1 });
                }
                break;
            }
            case 4: {
                if (isModerate === "") {
                    toast.error("Veuillez choisir la nature du test");
                } else {
                    this.setState({ count: count + 1 });
                }
                break;
            }
            default: {
                this.setState({ count: 0 });
                break;
            }
        }
    
        this.setState({ loading: false });
    };


    nextPage = () => {
        const { res, etat } = this.state
        this.setState({ openStepPopup: false })
        if (etat === 'save') {
            this.props.history.push({
                pathname: '/client/createsteps',
                state: {
                    data: [],
                    scenarioId: res.data.response.id,
                    title: this.state.currentScenario.title,
                    etat: "save"
                }
            })
        } else {
            this.props.history.push({
                pathname: '/client/createsteps',
                state: {
                    data: [],
                    scenarioId: this.state.idx,
                    title: this.state.currentScenario.title,
                    etat: "edit",
                    modified: "true",
                }
            })
        }
    }


    submit = async () => {
        if (this.state.isSubmitting) {
            return;
        }
    
        this.setState({ isSubmitting: true });
        try {
            const res = await scenarioServices.saveScenario(this.state.currentScenario);
            this.props.onGetScenarios();
            toast.success('Votre scénario a éte bien configurée');
            this.setState({ openStepPopup: true, res, etat: "save" });
        } catch (err) {
            this.setState({ errorChamps: true });
            this.state.errorChamps && toast.error("Veuillez choisir un format du test");
        } finally {
            this.setState({ isSubmitting: false });
        }
    }



    edit = () => {
        const scenario = {
            title: this.state.currentScenario.title,
            product: this.state.currentScenario.product,
            isUnique: this.state.currentScenario.isUnique,
            isModerate: this.state.currentScenario.isModerate,
            langue: this.state.currentScenario.langue
        }
        scenarioServices.editScenario(this.state.idx, scenario).then(res => {
            this.props.onGetScenarios()
            toast.success('Scénario modifié avec succès')
            // this.props.history.push({
            //     pathname: '/client/createsteps',
            //     state: {
            //         data: [],
            //         idx: this.state.idx,
            //         scenarioId: this.state.currentScenario.id
            //     }
            // })
            this.setState({ openStepPopup: true })
            this.setState({ res: res })
            this.setState({ etat: "edit" })
        })
    }



    hundlestep = () => {
        this.setState({ count: 0 })
    }

    render() {
        const { count, error, loading } = this.state
        const langue = ['anglais', 'français']
        const { title } = this.state.currentScenario
        const stepsName = ['Nom du scénario', 'Langue', 'Type de support', 'Nature du test', 'Format du test']
        return (
            <div className="create__scenario__ctn" >

                <Col md='3'>
                    <ScenarioSteps
                        stepsName={stepsName}
                        count={count}
                        hundlestep={this.hundlestep}
                    />
                </Col>
                <Col md='9'>
                    {count === 0 && <div key={count} className='scenario__contain'>
                        <span className='title__steps2'>Donner un nom à votre scénario </span>
                        <div className='display__flex__col__center'>
                            <div className='display__flex__col'>
                                <Input value={title}
                                    type="text"
                                    onChange={this.onChange}
                                    name="title"
                                    id="email__login"
                                    invalid={error}
                                />
                                {error && <FormFeedback className='mt-3'>{this.state.textError} </FormFeedback>}
                            </div>
                            <div className='createScenarioBtn'>
                                <LoaderButton 
                                    className='nextCreateScenarioStep' 
                                    disabled={loading} 
                                    onClick={() => this.next()} 
                                    name="Suivant" 
                                    loading={loading}
                                />                            
                            </div>                    
                        </div>
                    </div>}
                    {count === 1 && <div key={count} className='scenario__contain'>
                        <span className='title__steps2'>Choisir la langue du test </span>
                        <div className='display__flex__col__center'>
                            <div className='display__flex__col'>
                                <Input type="select" name="langue" id="email__login" onChange={this.onChange}>
                                    {langue.map((scen, idx) => {
                                        return <option key={idx} value={scen} selected>{scen}</option>
                                    })
                                    }
                                </Input>
                            </div>
                            <div className='createScenarioBtn'>
                                <LoaderButton 
                                    className='nextCreateScenarioStep' 
                                    disabled={loading} 
                                    onClick={() => this.next()} 
                                    name="Suivant" 
                                    loading={loading}
                                />                            
                            </div>
                        </div>
                    </div>}
                    {count === 2 && <div key={count} className='scenario__contain'>
                        <span className='title__steps2'>Quel type de support souhaitez-vous tester ?</span>
                        <div className='display__flex__col__center'>
                            <div className='display__flex__row'>
                                <div className='container__img2 mr-2' onClick={() => this.setState({ currentScenario: { ...this.state.currentScenario, product: "Site web" } })}>
                                    <div className={`image_r2_creat_scena${(this.state.currentScenario.product === "Site web") ? '_selected' : ''}`}>
                                        <img style={{ width: "54px", height: "54px" }} src={Web} alt="" />
                                        <span className='type_panel'>Site web</span>
                                    </div>
                                </div>
                                <div className='container__img2 mr-2'>
                                    <div className={`image_r2_creat_scena_disabled`}>
                                        <img style={{ width: "54px", height: "54px" }} src={Application} alt="" />
                                        <span className='type_panel'>Site sur version mobile</span>
                                    </div>
                                </div>
                                <div className='container__img2 mr-2'>
                                    <div className={`image_r2_creat_scena_disabled`}>
                                        <img style={{ width: "54px", height: "54px" }} src={Produit} alt="" />
                                        <span className='type_panel'>Produit</span>
                                    </div>
                                </div>
                                <div className='container__img2'>
                                    <div className={`image_r2_creat_scena_disabled`}>
                                        <img style={{ width: "54px", height: "54px" }} src={Service} alt="" />
                                        <span className='type_panel'>Service</span>
                                    </div>
                                </div>
                            </div>
                            <div className='createScenarioBtn'>
                                <LoaderButton 
                                    className='mt-3 nextCreateScenarioStep' 
                                    disabled={loading} 
                                    onClick={() => this.next()} 
                                    name="Suivant" 
                                    loading={loading}
                                />                            
                            </div>
                        </div>
                    </div>}
                    {count === 3 && <div key={count} className='scenario__contain'>
                        <span className='title__steps2'>Avec quelle modalité de test ?</span>
                        <div className='display__flex__col__center'>
                            <div className='display__flex__row'>
                                <div className='container__img2 mr-2' onClick={() => this.setState({ currentScenario: { ...this.state.currentScenario, isUnique: 1 } })}>
                                    <div className={`image_r2_creat_scena${(this.state.currentScenario.isUnique === 1) ? '_selected' : ''}`}>
                                        <img style={{ width: "54px", height: "54px", margin: "2px 0 24px 0" }} src={Test} alt="" />
                                        <span className='type_panel'>Un test unique</span>
                                    </div>
                                </div>
                                <div className='container__img2 mr-2'>
                                    <div className={`image_r2_creat_scena_disabled`}>
                                        <img style={{ width: "54px", height: "54px" }} src={ABtest} alt="" />
                                        <span className='type_panel'>2 versions</span>
                                        <span className='type_panel'> Logique A/B Testing</span>
                                    </div>
                                </div>
                            </div>
                            <div className='createScenarioBtn'>
                                <LoaderButton 
                                    className='mt-3 nextCreateScenarioStep' 
                                    disabled={loading} 
                                    onClick={() => this.next()} 
                                    name="Suivant" 
                                    loading={loading}
                                />
                            </div>
                        </div>
                    </div>}
                    {count === 4 && <div key={count} className='scenario__contain'>
                        {this.renderBeginStep()}
                        <span className='title__steps2'>Avec quel niveau d’interaction ? </span>
                        <div className='display__flex__col__center'>
                            <div className='display__flex__row'>
                                <div className='container__img2 mr-2' onClick={() => this.setState({ currentScenario: { ...this.state.currentScenario, isModerate: 0 } })}>
                                    <div className={`image_r2_creat_scena${(this.state.currentScenario.isModerate === 0) ? '_selected' : ''}`} >
                                        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: "13px", marginTop: "21px" }}>
                                            <img style={{ width: "27px", height: "27px" }} src={Mic} alt="" />
                                            <img style={{ width: "27px", height: "27px" }} src={Camera} alt="" />
                                        </div>
                                        <span className='type_panel'>Non modéré <br /> enregistrement </span>
                                    </div>
                                </div>
                                <div className='container__img2 mr-2'>
                                    <div className={`image_r2_creat_scena_disabled`}>
                                        <img style={{ width: "54px", height: "54px" }} src={Moderate} alt="" />
                                        <span className='type_panel2 mt-2'>Modéré <br />  direct</span>
                                    </div>
                                </div>
                            </div>
                            <div className='createScenarioBtn'>
                                <LoaderButton 
                                    className='mt-3 finishCreateScenarioStep' 
                                    disabled={loading} 
                                    onClick={() => { this.state.idx !== '' ? this.edit() : this.submit()}} 
                                    name={this.state.idx !== '' ? "Modifier le scénario" : "Créer le scénario"} 
                                    loading={loading} 
                                />
                            </div>
                        </div>
                    </div>
                    }
                </Col>
            </div>);
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    user: state.user,
    scenario: state.scenario,
});

export default connect(
    mapStateToProps,
    { onGetScenarios }
)(CreateScenario);