/**
 * React Imports
 */
import React from 'react';

/**
 * Redux Imports
 */
import { connect } from 'react-redux';

/**
 * Reactstrap Imports
 */
import { Col, Button, Input, Spinner } from "reactstrap"
import ReactTooltip from 'react-tooltip';
import { toast } from 'react-toastify';

/**
 * Redux Actions Imports
 */
import scenarioServices from '../../../services/scenarioServices';
import { onSaveList, onUpdateList, onDeleteList } from '../../../actions/scenarioActions';

/**
 * Components Imports
 */
import StepContainer from './step'
import ConfirmModal from '../../common/modals/confirmModal'

/**
 * Style Imports
 */
import "../scenario.css"
import VisualisetionStepsWindow from './VisualisetionStepsWindow';
import url from '../../../utils/https';


class CreateSteps extends React.Component {
    constructor(props) {
        super(props);
        this.scrollRef = React.createRef();
        this.state = {
            open: false,
            TooltipOpen: false,
            inputs: [],
            data: [],
            list: [],
            show: false,
            done: false,
            error: false,
            btns: [],
            response: {
                choice1: '',
                choice2: '',
            },
            showLoader: false,
            step: {
                url: "",
                question: "",
                number: 1,
            },
            scaleRange: {
                minScale: "",
                maxScale: "",
                borneSup: "",
                borneInf: ""
            }
            ,
            steps: [],
            idScenario: '',
            idx: '',
            scenario: {}, 
            type: 'open',
            VisPopup: false,
            stepId: null,
            etat: "",
            modified: "false",
            stepData: 0,
            errorBorne: "",
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ showLoader: true })
        }, 2000);
        this.setState({ list: [] })
        this.setState({
            data: this.props.location.state?.data, idScenario: this.props.location.state?.scenarioId,
            idx: this.props.location.state?.idx, modified: this.props.location.state?.modified
        }, () => scenarioServices.getScenarioById(this.state.idScenario).then(res => {
            if(res.header.code !== 200){
                toast.error(res.header.message);
            }else{
                this.setState({ scenario: res.response, steps: res.response.steps }, () => {
                    this.setState({ data: [...this.state.data, ...res.response.steps] })
                    this.state.steps.forEach(obj => {
                        this.setState({ stepId: obj.number })
                        setTimeout(() => {
                            if (obj.type === "open") {
                                this.state.list.push({
                                    id: `${this.state.list.length + 1} `,
                                    component: <StepContainer
                                        type="open"
                                        etape={this.state.list.length + 1}
                                        addStep={this.validateStep}
                                        visualise={this.visualise}
                                        duplicate={this.duplicate}
                                        modifier={this.modifier}
                                        onChangeStep={this.onChangeStep}
                                        step={this.state.step}
                                        drop={this.Delete}
                                        onChangeType={this.onChangeType}
                                        list={this.state.list}
                                        data={this.state.data[obj.number - 1]}
                                        handlStepData={this.handlStepData}
                                        stepData={this.state.stepData}
                                        modified={this.state.modified}
                                        errorBorne={this.state.errorBorne}
                                        onChangeUrl={this.onChangeUrl}
                                    />
                                })
                            }
                            if (obj.type === 'close') {
                                this.state.list.push({
                                    id: `${this.state.list.length + 1} `,
                                    component: <StepContainer
                                        type="close"
                                        inputs={this.state.inputs}
                                        etape={this.state.list.length + 1}
                                        addStep={this.validateStep}
                                        visualise={this.visualise}
                                        modifier={this.modifier}
                                        duplicate={this.duplicate}
                                        onChangeStep={this.onChangeStep}
                                        step={this.state.step}
                                        drop={this.Delete}
                                        onChangeType={this.onChangeType}
                                        list={this.state.list}
                                        data={this.state.data[obj.number - 1]}
                                        response={this.state.response}
                                        handlStepData={this.handlStepData}
                                        stepData={this.state.stepData}
                                        modified={this.state.modified}
                                        errorBorne={this.state.errorBorne}
                                        onChangeUrl={this.onChangeUrl}
                                    />
                                })
                            }
                            if (obj.type === 'scale') {
                                this.state.list.push({
                                    id: `${this.state.list.length + 1} `,
                                    component: <StepContainer
                                        type="scale"
                                        etape={this.state.list.length + 1}
                                        btns={this.state.btns}
                                        addStep={this.validateStep}
                                        visualise={this.visualise}
                                        modifier={this.modifier}
                                        duplicate={this.duplicate}
                                        onChangeStep={this.onChangeStep}
                                        step={this.state.step}
                                        drop={this.Delete}
                                        onChangeType={this.onChangeType}
                                        list={this.state.list}
                                        scaleRange={this.state.scaleRange}
                                        data={this.state.data[obj.number - 1]}
                                        handlStepData={this.handlStepData}
                                        stepData={this.state.stepData}
                                        modified={this.state.modified}
                                        errorBorne={this.state.errorBorne}
                                        onChangeUrl={this.onChangeUrl}
                                    />
                                })
                            }
                        })
                    }, 2000);
                })
            }
        }))
        this.setState({ etat: this.props.location.state?.etat })
    }

    // onChangeUrl(url) {
    //     if(url) {
    //         // this.setState({
    //         //     step: {
    //         //         ...this.state.step,
    //         //         url
    //         //     }
    //         // })
    //         console.log(url);
    //     }
    // }

    onchange = (e) => {
        e.preventDefault();
        const key = e.target.name
        if(key === "borneInf" || key === "borneSup") {
            const value = e.target.value;
            const isValid = /^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/.test(value);
            const filteredValue = value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ ]+/g, '');
            // Mettre à jour la valeur du champ d'entrée et afficher une erreur si nécessaire
            if (isValid) {
                this.setState({ errorBorne: '' })
                this.setState({ scaleRange: { ...this.state.scaleRange, [e.target.name]: filteredValue } })
            }
            else {
                this.setState({ errorBorne: 'Veuillez entrer seulement des caractères de l\'alphabet.' })
            }
        }else{
            this.setState({ scaleRange: { ...this.state.scaleRange, [e.target.name]: e.target.value } })
            //error if min > max
            if (+this.state.scaleRange.minScale >= +this.state.scaleRange.maxScale) {
                this.setState({ errorRange: true })
            } 
            else {
                this.setState({ errorRange: false })
            }
        }
    }

    onChangeResponse = (e) => {
        e.preventDefault();
        this.setState({ response: { ...this.state.response, [e.target.name]: e.target.value } })
    }

    onChangeStep = (e) => {
        this.setState({ step: { ...this.state.step, [e.target.name]: e.target.value } })
    } 

    onChangeType = (e) => {
        this.setState({ type: e.target.value }, () => this.onStepEdit())
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
                minScale: 1,
                maxScale: "",
                borneSup: "",
                borneInf: ""
            }
        })
    }

    //tooltip
    toggleTooltip = () => {
        this.setState({
            TooltipOpen: !this.state.TooltipOpen
        });
    }

    handlStepData = (click) => {
        if (this.state.stepData < this.state.data.length - 1 || this.state.stepData > 0) {
            this.setState({ stepData: this.statestepData + click })
        }
    }

    validateScale = () => {
        this.setState({
            show: !this.state.show, list: [...this.state.list, {
                id: `${this.state.list.length + 1} `,
                component: <StepContainer
                    type="scale"
                    etape={this.state.list.length + 1}
                    btns={this.state.btns}
                    addStep={this.validateStep}
                    visualise={this.visualise}
                    duplicate={this.duplicate}
                    modifier={this.modifier}
                    step={this.state.step}
                    onChangeStep={this.onChangeStep}
                    drop={this.Delete}
                    onChangeType={this.onChangeType}
                    onchange={this.onchange}
                    scaleRange={this.state.scaleRange}
                    list={this.state.list}
                    data={this.state.data}
                    error={this.state.errorRange}
                    modified={this.state.modified}
                    errorBorne={this.state.errorBorne}
                    onChangeUrl={this.onChangeUrl}
                />
            }]
        })
    }

    onOpen = () => {
        this.setState({
            list: [...this.state.list, {
                id: `${this.state.list.length + 1} `,
                component: <StepContainer
                    type="open"
                    etape={this.state.list.length + 1}
                    addStep={this.validateStep}
                    visualise={this.visualise}
                    modifier={this.modifier}
                    duplicate={this.duplicate}
                    onChangeStep={this.onChangeStep}
                    step={this.state.step}
                    drop={this.Delete}
                    onChangeType={this.onChangeType}
                    list={this.state.list}
                    data={this.state.data}
                    error={this.state.errorRange}
                    modified={this.state.modified}
                    onChangeUrl={this.onChangeUrl}
                />
            }]
        })
    }

    onClose = () => {
        this.setState({
            list: [...this.state.list, {
                id: `${this.state.list.length + 1} `,
                component: <StepContainer
                    type="close"
                    inputs={this.state.inputs}
                    add={this.add}
                    substruct={this.substruct}
                    etape={this.state.list.length + 1}
                    addStep={this.validateStep}
                    visualise={this.visualise}
                    modifier={this.modifier}
                    duplicate={this.duplicate}
                    step={this.state.step}
                    onChangeStep={this.onChangeStep}
                    drop={this.Delete}
                    onChangeResponse={this.onChangeResponse}
                    response={this.state.response}
                    onChangeType={this.onChangeType}
                    list={this.state.list}
                    data={this.state.data}
                    error={this.state.errorRange}
                    modified={this.state.modified}
                    errorBorne={this.state.errorBorne}
                    onChangeUrl={this.onChangeUrl}
                />
            }]
        })
    }


    handleClick = () => {
        window.scrollBy({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        });
    };


    onStep = () => {
        if (this.state.list.length === this.state.data.length) {
            this.state.type === "scale" && this.validateScale()
            this.state.type === "open" && this.onOpen()
            this.state.type === "close" && this.onClose()
            setTimeout(() => {
                this.handleClick()
            }, 100);
        }
        else
            toast.info("Vous devez valider l'étape pour pouvoir rajouter une autre")
    }

    onStepEdit = () => {
        this.setState({ list: this.state.list.splice(-1) })
        this.state.type === "scale" && this.validateScale()
        this.state.type === "open" && this.onOpen()
        this.state.type === "close" && this.onClose()
    }

    duplicate = (etape) => {
        const copiedObj = [...this.state.data];
        let FiltredData = []
        FiltredData = copiedObj.filter(res => res.number === etape)
        console.log("FiltredData", FiltredData);
        if(FiltredData.length === 0) toast.info("Vous devez valider l'étape pour pouvoir rajouter une autre")
        if (FiltredData[0]?.type === "open") {
            let dataDuplicated = {}
            Object.assign(dataDuplicated, { instruction: FiltredData[0].instruction, url: FiltredData[0].url, number: FiltredData[0].number + 1, question: FiltredData[0].question, type: "open" })
            this.state.data.push(dataDuplicated)
            this.setState(prevState => ({
                data: [...prevState.data],
            }), () => {
                this.setState(prevState => ({
                    list: [...prevState.list,
                    {
                        id: `${this.state.list.length + 1}`,
                        component: <StepContainer
                            type="open"
                            etape={this.state.list.length + 1}
                            btns={this.state.btns}
                            addStep={this.validateStep}
                            visualise={this.visualise}
                            modifier={this.modifier}
                            duplicate={this.duplicate}
                            step={this.state.step}
                            onChangeStep={this.onChangeStep}
                            drop={this.Delete}
                            onChangeType={this.onChangeType}
                            list={this.state.list}
                            data={this.state.data}
                            error={this.state.errorRange}
                            modified={"true"}
                            errorBorne={this.state.errorBorne}
                            onChangeUrl={this.onChangeUrl}
                        />
                    }],
                }));
            });

        } if (FiltredData[0]?.type === "close") {
            let dataDuplicated = {}
            Object.assign(dataDuplicated, { instruction: FiltredData[0].instruction, url: FiltredData[0].url, number: FiltredData[0].number + 1, question: FiltredData[0].question, type: "close", questionChoices: FiltredData[0].questionChoices })
            this.state.data.push(dataDuplicated)
            this.setState(prevState => ({
                data: [...prevState.data],
            }), () => {
                this.setState(prevState => ({
                    list: [...prevState.list,
                    {
                        id: `${this.state.list.length + 1}`,
                        component: <StepContainer
                            type="close"
                            inputs={this.state.inputs}
                            add={this.add}
                            substruct={this.substruct}
                            etape={this.state.list.length + 1}
                            addStep={this.validateStep}
                            visualise={this.visualise}
                            modifier={this.modifier}
                            duplicate={this.duplicate}
                            step={this.state.step}
                            onChangeStep={this.onChangeStep}
                            drop={this.Delete}
                            onChangeResponse={this.onChangeResponse}
                            response={this.state.response}
                            onChangeType={this.onChangeType}
                            list={this.state.list}
                            data={this.state.data}
                            modified={"true"}
                            errorBorne={this.state.errorBorne}
                            onChangeUrl={this.onChangeUrl}
                        />
                    }],
                }));
            });

        } if (FiltredData[0]?.type === "scale") {
            let dataDuplicated = {}
            Object.assign(dataDuplicated, { instruction: FiltredData[0].instruction, url: FiltredData[0].url, number: FiltredData[0].number + 1, question: FiltredData[0].question, type: "scale", questionChoices: FiltredData[0].questionChoices })
            this.state.data.push(dataDuplicated)
            this.setState(prevState => ({
                data: [...prevState.data],
            }), () => {
                this.setState(prevState => ({
                    list: [...prevState.list,
                    {
                        id: `${this.state.list.length + 1}`,
                        component: <StepContainer
                            type="scale"
                            etape={this.state.list.length + 1}
                            btns={this.state.btns}
                            addStep={this.validateStep}
                            visualise={this.visualise}
                            duplicate={this.duplicate}
                            modifier={this.modifier}
                            step={this.state.step}
                            onChangeStep={this.onChangeStep}
                            drop={this.Delete}
                            onChangeType={this.onChangeType}
                            onchange={this.onchange}
                            scaleRange={this.state.scaleRange}
                            list={this.state.list}
                            data={this.state.data}
                            error={this.state.errorRange}
                            modified={"true"}
                            errorBorne={this.state.errorBorne}
                            onChangeUrl={this.onChangeUrl}
                        />
                    }],
                }));
            });
        }
    }
    // duplicate = () => {
    //     if (this.state.list.length === this.state.data.length)
    //         this.setState({
    //             list: [...this.state.list, {
    //                 id: this.state.list[this.state.list.length - 1].id + 1,
    //                 component: this.state.list[this.state.list.length - 1].component
    //             }]
    //         })
    //     else
    //         toast.info("Vous devez valider l'étape pour pouvoir la dupliquer")
    // }
    Delete = (index) => {
        console.log("index", index);
        console.log("this.state.list.length", this.state.list.length);
        
        this.setState({
            stepId: this.state.stepId - 1,
            list: this.state.list.filter(res => res !== this.state.list[index]),
            data: this.state.data.filter(res => res !== this.state.data[index]),
            inputs: [],
            response: {
                choice1: '',
                choice2: '',
            }, step: {
                url: "",
                instruction: "",
                question: ""
            },
        })
        console.log("data", this.state.data);
        
    }

    Delete2 = (index, etape, name) => {
        if (name === "add") {
            this.setState({
                list: this.state.list.filter(res => res !== this.state.list[index]),
                data: this.state.data.filter(res => res !== this.state.data[index]),
            })

        } if (name === "delete") {
            this.setState({
                list: this.state.list.filter(res => res !== this.state.list[index]),
                data: this.state.data.filter(res => res !== this.state.data[index]),
            })
        }
    }

    visualise = (id) => {
        if (this.state.list.length === this.state.data.length) {
            this.setState({ stepId: id })
            this.toggle()
        }
        else
            toast.info("Vous devez valider l'étape pour pouvoir la visualiser")
    }

    modifier = (etape) => {
        if (this.state.list.length > 0) {


        } else {
            toast.info("Vous devez valider l'étape pour pouvoir la visualiser")
        }
    }

    toggleCM = (id) => {
        this.setState({ open: !this.state.open, stepId: id })
    }

    renderConfirmModal() {
        return (
            <ConfirmModal
                show={this.state.open}
                toggleShow={this.toggleCM}
                header='Détail Testeur'
            />
        )
    }

    add = (etape) => {
        let responseEtape = { choices: "" }
        this.state.list[this.state.list.length - 1].component.props.inputs.push({})
        let functionName = "add"
        Object.assign(this.state.response, responseEtape)
        this.Delete2(this.state.list.length - 1, etape, functionName)
        setTimeout(() => {
            this.onClose()
        }, 1);
    }

    substruct = (etape) => {
        let functionName = "delete"
        this.setState(state => {
            const inputs = state.inputs.filter((item, j) => j !== state.inputs.length - 1);
            this.Delete2(this.state.list.length - 1, etape, functionName)
            setTimeout(() => {
                this.onClose()
            }, 1);
            return {
                inputs,
            };
        });
    }

    validateStep = (nbrEtape) => {
        if (nbrEtape > this.state.data.length) {
            if (this.state.list.length > this.state.data.length) {
                if (this.state.type === "scale") {
                    if (this.state.scaleRange.minScale >= this.state.scaleRange.maxScale) {
                        return toast.warning("Le minimum doit être inférieur strictement au maximum");
                    }
                    else {
                        this.setState({ errorRange: false })
                    }
                }
                this.state.type === "scale" && (this.setState({
                    data: [...this.state.data, {
                        url: this.state.step.url,
                        question: this.state.step.question,
                        questionChoices: { 
                            minScale: parseInt(1, 10),
                            maxScale: parseInt(this.state.scaleRange.maxScale, 10),
                            borneSup: this.state.scaleRange.borneSup ? this.state.scaleRange.borneSup : "Intéressant",
                            borneInf: this.state.scaleRange.borneInf ? this.state.scaleRange.borneInf : "Pas intéressant",
                        },
                        number: nbrEtape,
                        type: 'scale'
                    }],
                    step: {
                        url: "",
                        question: ""
                    },
                }))
                if (this.state.type === "open") {
                    this.setState({
                        data: [...this.state.data, {
                            url: this.state.step.url,
                            question: this.state.step.question,
                            number: nbrEtape,
                            type: 'open',
                        }],
                        step: {
                            url: "",
                            question: "",
                        }
                    })
                }
                this.state.type === "close" && this.setState({
                    data: [...this.state.data, {
                        url: this.state.step?.url,
                        question: this.state.step?.question,
                        questionChoices: this.state?.response,
                        number: nbrEtape,
                        type: 'close'
                    }],
                    step: {
                        url: "",
                        question: ""
                    },
                    inputs: [],
                    response: {
                        choice1: '',
                        choice2: '',
                    },
                })
                toast.success('Etape ajoutée avec succès')
                //this.props.onSaveList(this.state.list)
                localStorage.setItem("stepsData", JSON.stringify(this.state.data));
                setTimeout(() => this.setState({ type: 'open' }), 500)
            }
        } else {
            if (this.state.data.question === "" && this.state.data.url === "") {
                toast.warning('Vous ne pouvez pas valider une étape plusieurs fois')
            }
            else {
                toast.info('Vous avez deja valide cette etape')
            }
        }
    }



    submit = () => {
        if (this.state.data.length <= 2) {
            toast.error("Vous devez valider au moins 3 étapes pour pouvoir valider votre scénario")
            this.props.onDeleteList()
        } else {
            if (this.state.etat === "save") {
                scenarioServices.saveStep(JSON.stringify(this.state.idScenario), JSON.stringify(this.state.data)).then(res => {
                    localStorage.removeItem("stepsData");
                    this.props.history.push({
                        pathname: '/client/testerpanel',
                        state: {
                            data: [],
                            id: this.state.scenario.id,
                            title: this.state.scenario.title
                        }
                    })
                    toast.success('Scénario créer avec succès')
                }).catch(err =>{
                    console.log(err) 
                    toast.error('Une erreur est survenue')
                })
            }
            else {
                scenarioServices.updateSteps(this.state.idScenario, this.state.data).then(res => {
                    this.props.history.push({
                        pathname: '/client/testerpanel',
                        state: {
                            data: [],
                            id: this.state.scenario.id,
                            title: this.state.scenario.title
                        }
                    })
                })
                toast.success('Scénario modifié avec succès')
            }
        }
    }


    //toggle popup visualiser etapes
    toggle = () => {
        this.setState({ VisPopup: !this.state.VisPopup }) 
    }

    submitVisEtape = () => {
        if (this.state.data.length <= 1) {
            toast.error("Vous devez valider au moins 2 étapes pour pouvoir visualiser votre scénario")
            this.props.onDeleteList()
        } else {
            //open popup visualiser etapes
            this.setState({ stepId: null })
            this.toggle()
        }
    }

    renderStepPopup = () => {
        return (
            <>
                {
                    this.state.VisPopup &&
                        <VisualisetionStepsWindow
                            url={`${url}/client/StepsTest`}
                            data={this.state?.data}
                        />
                }
            </>
        )
    }
    

    render() {
        const { list, showLoader } = this.state
        if (showLoader === false)
            return (
                <div className="scenario__ctn">
                    <div style={{ display: 'flex', margin: 'auto' }}>
                        <Spinner type="grow" color="success" className='mr-2' />
                        <Spinner type="grow" color="success" className='mr-2' />
                        <Spinner type="grow" color="success" className='mr-2' />
                        <Spinner type="grow" color="success" className='mr-2' />
                        <Spinner type="grow" color="success" className='mr-2' />
                    </div>
                </div>
            )
        return (
            <>
                <div className="scenario2__ctn" >
                    {/* {this.renderConfirmModal()} */}
                    <Col md='12' lg='12'>
                        <div className='headerCreateStep' style={{ display: 'flex', flexDirection: 'column' }}>
                            <span className="scenario__name">{this.state.scenario?.title}</span>
                            <label className='desc__style'>
                                <span className='desc-step'> Description du Scenario : </span> <br />
                                - N'hésitez pas à expliquer en deux lignes l'objectif de votre scenario de test. <br />
                                - Cette description sera transmise aux testeurs du panel.
                            </label>
                            <Input
                                type='textarea'
                                id='text__area'
                                placeholder='Le descriptif vous permet en quelques lignes de présenter le sujet de votre test afin de donner envie au testeur de le réaliser.
                                                Ce texte se retrouvera dans le corps de l`email qui prévient les testeurs de l’arrivée d’un nouveau test.'
                            />
                        </div>
                        <div>
                            <ul>
                                {
                                    list && list.map(({ component, id }, index) => {
                                        return (
                                            <div key={id?.toString()}>
                                                <li>
                                                    <span className='step__title'>Etape {index + 1}</span>
                                                    {component}
                                                </li>
                                            </div>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className='steps-footer'>
                            <div className='btn-visualise-steps-container'>
                                {
                                    this.state.data[0] && this.state.data.length > 1 && 
                                        <Button className='finish-Vis-etape' onClick={this.submitVisEtape}> Visualiser les étapes</Button> 

                                }
                                {
                                    this.state.data[0] && this.state.data.length > 2 &&
                                        <Button className='finish' onClick={this.submit}> {this.state.etat === "save" ? "Créer le scénario" : "Modifier le scénario"}</Button> 
                                }
                            </div>
                            <div target='add' toggle={this.toggleTooltip} isOpen={this.state.TooltipOpen} autohide={false} className='btn-add-step-container'>
                                <Button className='finish-add-etape' onClick={() => this.onStep()} >Ajouter une  étape</Button>
                            </div>
                        </div>
                    </Col>
                    <ReactTooltip />
                    {this.renderStepPopup()}
                </div>
            </>
        );
    }
};

const mapStateToProps = state => ({
    auth: state.auth,
    user: state.user,
    scenario: state.scenario,
});

export default connect(
    mapStateToProps,
    { onSaveList, onUpdateList, onDeleteList }
)(CreateSteps);