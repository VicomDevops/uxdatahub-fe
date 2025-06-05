import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Button, Label } from "reactstrap"
import Table from "../../common/table/table"
import Edit from "../../../assets/tdb/modiifier.svg"
import Delete from "../../../assets/tdb/delete.svg"
import Detacher from "../../../assets/Remplacer.png"
import TesterForm from './testerForm';
import Modals from '../../common/modals/modal'
import scenarioServices from '../../../services/scenarioServices'
import { toast } from 'react-toastify';
import { onGetScenarios, onGetPanels } from "../../../actions/scenarioActions"
import { AvForm, AvField } from 'availity-reactstrap-validation';
import Checkbox from '@material-ui/core/Checkbox';
import userServices from '../../../services/userServices';

class CreatePanelClient extends Component {

    state = {
        idScenario: "",
        panels: [],
        currentPanel: {
            name: "",
            scenarioName: {},
            file: "",
            id: "",
        },
        selectedPanel: {},
        show: false,
        clientTesters: {
            name: "",
            lastname: "",
            email: "",
        },
        loading: false,
        userLabel: {
            name: "Prénom",
            lastname: "Nom",
            email: "Email",
        },
        modifierTester: {
            id: null,
            name: "",
            lastname: "",
            email: "",
        },
        data: [],
        idp: '',
        error: {},
        scenarioName: "",
        toggleModifier: false,
        showDelete: false,
        showDetacher: false,
        DetacherTesterId : null,
        deleterow: {},
        rowDataModif: 0,
        scenarios: [],
        datas: [],
        pageSize: 5,
        modified: false,
        errorExistTester: "",
        detacherScenarios: []
    }
    componentDidMount() {
        const { state } = this.props.location;
        const datas = state ? state.datas : null;        
        console.log("datas", datas);
        
        if (datas) {
            this.setState({ datas: datas.data, data: datas.data.clientTesters, modified: datas.modified })
        }

        this.setState({ panels: this.props.panel?.data })
        this.props.onGetPanels()
    }
    

    toggle = (rowData) => {
        if (rowData) {
            this.setState({ modifierTester: rowData, toggleModifier: true })
        }else{
            this.setState({ modifierTester: {}, toggleModifier: false })
        }
        this.setState({ show: !this.state.show })
        setTimeout(() => {
            this.setState({ clientTesters: { name: "", lastname: "", email: "" } })
        }, 500);
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.scenario.panels) {
            this.setState({ panels: nextProps.scenario.panels })
        }
    }

    checkExistenceTester = (email, testerList ,index = -1) => {
        const isExist = testerList.some(tester => tester.email === email)
        if(index !== -1 && isExist){
            if(testerList[index].email === email){
                return false
            }else{
                this.setState({ errorExistTester: "Vous avez deja ajouter ce testeur"})
                setTimeout(() => {
                    this.setState({ errorExistTester: "" })
                },3000)
                return true
            }
        }
        if(isExist){
            this.setState({ errorExistTester: "Vous avez deja ajouter ce testeur"})
            setTimeout(() => {
                this.setState({ errorExistTester: "" })
            },3000)
        }
        return isExist;
    }

    checkTesterMailer = async (email) => {
        try{
            const checkResponse = await userServices.checkTesterMail(email)
            if(checkResponse.header.code !== 200){
                this.setState({ errorExistTester: checkResponse.header.message})
                setTimeout(() => {
                    this.setState({ errorExistTester: "" })
                },3000)
                return true;
            }
        }catch(err){
            console.log(err);
        }
    }


    onSubmitTesteur = async () => {
        const { clientTesters, data } = this.state
        const formdata = new FormData();
        formdata.append("email", clientTesters.email)
        const isExist = this.checkExistenceTester(clientTesters.email, data);
        if(!isExist){
            const mailExist = await this.checkTesterMailer(formdata)
            if(!mailExist){
                this.setState({ ...this.state, data: [...this.state.data, this.state.clientTesters], show: !this.state.show })
                toast.success('Testeur ajouté avec succes')
            }
            if (data.length > 5) {
                this.setState({ pageSize: 10 })
            }
        }
    }


    onModifTesteur = async () => {
        const { modifierTester, data } = this.state
        const index = data.findIndex(item => item.tableData.id === modifierTester.tableData.id);
        const currentTester = data[index];
        const formdata = new FormData();
        formdata.append("email", modifierTester.email)
        const isExist = this.checkExistenceTester(modifierTester.email, data, index);
        if(!isExist){
            const mailExist = await this.checkTesterMailer(formdata)
            if(!mailExist){
                console.log(currentTester.id);
                if(currentTester.id === null || currentTester.id === undefined){ 
                    this.setState({ data: [...data.slice(0, index), modifierTester, ...data.slice(index + 1)], modifierTester: {} })
                    toast.success("Testeur modifié avec succes");
                    this.toggle();
                }else{
                    console.log(modifierTester);
                    const updateTesterResponse = await scenarioServices.editTesterFromPanel(modifierTester);
                    if(updateTesterResponse.header.code !== 200){
                        toast.error(updateTesterResponse.header.message);
                    }else{
                        this.setState({ data: [...data.slice(0, index), modifierTester, ...data.slice(index + 1)], modifierTester: {} })
                        toast.success(updateTesterResponse.header.message);
                        this.toggle();
                    }
                }
            }
            if (data.length > 5) {
                this.setState({ pageSize: 10 })
            }
        }
    }


    deleteTester = async () => {
        let { deleterow, showDelete, datas, data } = this.state
        const testerId = deleterow.id;
        const panelId = datas.id;
        const formData = new FormData()
        formData.append("client_tester_id", testerId)
        formData.append("panel_id", panelId)
        if(testerId !== undefined){
            try{
                if(data.length ===1){
                    toast.error("Impossible de supprimer le dernier testeur d'un panel");
                    return
                }else{
                    let deleteTesterResponse = await scenarioServices.deleteTesterFromPanel(formData);
                    if(deleteTesterResponse.header.code !== 200){
                        toast.error(deleteTesterResponse.header.message);
                    }else{
                        data = this.state.data.filter(item => item !== deleterow);
                        this.setState({ data });
                        this.setState({ showDelete: !showDelete });
                        toast.success(deleteTesterResponse.header.message);
                    }
                }
            }catch(err){
                console.log("Error",err)
            }
        }else{
            if(data.length ===1){
                toast.error("Impossible de supprimer le dernier testeur d'un panel");
                return
            }else{
                data = data.filter(item => item !== deleterow);
                this.setState({ data });
                this.setState({ showDelete: !showDelete });
                toast.success("Testeur supprimé avec succès");
            }
        }
    }

    onChangePanel = e => {
        e.preventDefault();
        this.setState({ currentPanel: { ...this.state.currentPanel, [e.target.name]: e.target.value } })
    };

    onSelectPanel = (e) => {
        setTimeout(() => {
            this.setState({ idp: e.target.value })
            const panel = this.state.panels.find(p => p.id === +e.target.value)
            this.setState({ currentPanel: { ...this.state.currentPanel, name: panel.name, id: panel.id } })
            this.setState({ ...this.state, data: panel.clientTesters })
        }, 100);
    }

    onChangeScenario = e => {
        e.preventDefault();
        this.setState({ ...this.state, idScenario: e.target.value })
    };

    onChange = e => {
        e.preventDefault();
        if (this.state.toggleModifier) {
            this.setState({ modifierTester: { ...this.state.modifierTester, [e.target.name]: e.target.value } })
        } else {
            this.setState({ clientTesters: { ...this.state.clientTesters, [e.target.name]: e.target.value } })
        }
    };

    getScenarioName = (id) => {
        scenarioServices.getScenarioById(id).then(res => {
            this.setState({ scenarioName: res.title })
        }).catch(err => {
            console.log(err);
        })
    }

    submitForm = (event, errors, values) => {

        if (this.state.modified === false) {
            if (errors.length === 0) {
                const { currentPanel, data, idScenario } = this.state
                let panel = {};
                this.state.idp !== "" ?
                    panel = {
                        id: currentPanel.id,
                        name: currentPanel.name,
                        scenarioName: "",
                        clientTesters: data,
                        testersNb: data.length ? data.length : 0,
                        product: "",
                        type: 'client'
                    }
                :
                    panel = {
                        name: currentPanel.name,
                        scenarioName: "",
                        clientTesters: data,
                        testersNb: data.length ? data.length : 0,
                        product: "",
                        type: 'client'
                    }
                if (this.state.idScenario) {
                    scenarioServices.getScenarioById(this.state.idScenario).then(res => {
                        panel.scenarioName = res.title
                    }).catch(err => {
                        console.log("Error",err);
                    })
                } else {
                    panel.scenarioName = this.props.location?.state?.data?.title !== undefined ? this.props.location?.state?.data?.title : "";
                }
                if (panel.testersNb === 0) {
                    toast.error('Veuillez ajouter au moins un testeur')
                    return
                }
                else {
                    this.state.idp === "" ?
                    scenarioServices.savePanel(panel, this.props.location?.state?.data?.id === undefined ? +idScenario : +this.props.location?.state?.data?.id).then(res => {
                                if(res?.header?.code !== 200) {
                                    toast.error(res?.header?.message)
                                }else{
                                    toast.success(res?.header?.message)
                                    this.props.onGetPanels()
                                    this.props.onGetScenarios()
                                    this.props.history.push('/client/')
                                }
                            }).catch(err => {
                                this.setState({ error: err.response.data })
                                console.log(err);
                                toast.error("Erreur lors de l'ajout du panel");
                            })
                        :
                        scenarioServices.savePanelExistant(this.props.location?.state?.data === undefined ? idScenario : this.props.location?.state?.data?.id, this.state.idp).then(res => {
                                if(res.header.code !== 200) {
                                    toast.error(res?.header?.message)
                                }else{
                                    toast.success(res?.response)
                                    this.props.onGetPanels()
                                    this.props.onGetScenarios()
                                    this.props.history.push('/client/')
                                }
                            }).catch(err => {
                                this.setState({ error: err.response.data })
                                toast.error('Erreur lors de l\'ajout du panel')
                            })
                }
            }
        } if (this.state.modified === true) {
            let panels = {}
            const { currentPanel, datas, data } = this.state;
            panels = {
                id: datas.id,
                name: currentPanel?.name === "" ? datas?.name : currentPanel?.name,
                clientTesters: data,
                testersNb: data.length ? data.length : 0,
                product: "",
                type: 'client'
            }
            scenarioServices.editPanel(panels, datas.id).then(res => {
                if(res?.header?.code !== 200) {
                    toast.error(res?.header?.message)
                }else{
                    toast.success(res?.header?.message)
                    this.props.onGetPanels()
                    this.props.onGetScenarios()
                    this.props.history.push('/client/')
                }
            }).catch(err => {
                this.setState({ error: err.response.data })
                toast.error('Erreur lors de la modification du panel')
            })
        }
    }

    renderModaltester() {
        const { clientTesters, userLabel, loading, toggleModifier, modifierTester } = this.state

        if (toggleModifier) {
            return (
                <Modals show={this.state.show} toggleShow={this.toggle} backdrop="static" header='Modifier Testeur'>
                    <TesterForm
                        confirmText='Modifier testeur'
                        handleSubmit={this.onModifTesteur}
                        onChange={this.onChange}
                        currentUser={modifierTester}
                        userText={userLabel}
                        loading={loading}
                        error={this.state.error}
                        errorExistTester={this.state.errorExistTester}
                        />
                </Modals>
            )
        } else {
            return (
                <Modals show={this.state.show} toggleShow={this.toggle} backdrop="static" header='Ajouter Testeur'>
                    <TesterForm
                        confirmText='Ajouter testeur'
                        handleSubmit={this.onSubmitTesteur}
                        onChange={this.onChange}
                        currentUser={clientTesters}
                        userText={userLabel}
                        loading={loading}
                        error={this.state.error}
                        errorExistTester={this.state.errorExistTester}
                    />
                </Modals>

            )
        }
    }

    handleModalDeleteTester = (row) => {
        this.setState({ showDelete: !this.state.showDelete })
        this.setState({ deleterow: row })
    }

    renderModalDelete = () => {
        return (
            <Modals
                header="Supprimer un testeur"
                show={this.state.showDelete}
                modalSize="modal-sm"
                toggleShow={this.handleModalDeleteTester}
            >
                <p className="text-center">Voulez-vous vraiment supprimer ce testeur de ce panel ?</p>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "2rem" }}>
                    <Button className="btn-success" onClick={this.deleteTester}>Oui</Button>
                    <Button onClick={this.handleModalDeleteTester}>Non</Button>
                </div>
            </Modals>
        )
    }



    handleShowDetacherModal = (testerId) => {
        this.setState({ showDetacher: !this.state.showDetacher })
        this.setState({ DetacherTesterId: testerId })
    }

    
    selectDetacherScenarioId = (id) => {
        if (this.state.detacherScenarios.includes(id)) {
            this.setState({ detacherScenarios: this.state.detacherScenarios.filter(item => item !== id) })
        }else{
            this.setState({ detacherScenarios: [...this.state.detacherScenarios, id] })
        }
    }
    
    detacherTester = () => {
        const { DetacherTesterId, datas, detacherScenarios } = this.state;
        const panelId = datas.id;
        console.log("DetacherTesterId",DetacherTesterId);
        console.log("panelId",panelId);
        console.log("detacherScenarios",detacherScenarios);
        
    }


    renderModalDetacher = () => {
        const scenarioList= [
            {name : "Scenario1", id: 1},
            {name : "Scenario2", id: 2},
            {name : "Scenario3", id: 3},
            {name : "Scenario4", id: 4},
        ]
        return (
            <Modals
                header="Remplacer un testeur"
                show={this.state.showDetacher}
                modalSize="modal-sm"
                toggleShow={this.handleShowDetacherModal}
            >                   
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "2rem", flexDirection: "column" }}>
                    <p className="text-center">Voulez-vous vraiment remplacer ce testeur ?</p>  
                    <div>
                        {
                            scenarioList.map(scenario => (
                                <div key={scenario.id} style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "2rem", marginBottom: "1rem" }}>
                                    <span>{scenario.name} </span> 
                                    <Checkbox onChange={() => this.selectDetacherScenarioId(scenario.id)} />
                                </div>
                            ))   
                        }
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "4rem" }}>
                        <Button className="btn-success" onClick={this.detacherTester}>Valider</Button>
                        <Button onClick={this.handleShowDetacherModal}>Non</Button>
                    </div>
                </div>
            </Modals>
        )
    }



    renderTable = (length) => {
        const columns = [
            { title: "Nom ", field: 'lastname' },
            { title: "Prénom", field: 'name' },
            { title: "Email", field: 'email' },
        ]

        const actions =
            this.props?.location?.state?.choixPanel !== "exist" &&
                this.state.datas?.length !== 0 ?
                [
                    {   
                        icon: () => <img style={{ width: "22px", marginRight: "5px" }} className="ml-1" src={Detacher} alt="2M-advisory" />,
                        tooltip: 'Remplacer',
                        onClick: (event, rowData) => this.handleShowDetacherModal(rowData.id),
                    },
                    {
                        icon: () => <img style={{ width: "30px" }} className="mr-1" src={Edit} alt="2M-advisory" />,
                        tooltip: 'Modifier',
                        onClick: (event, rowData) => this.toggle(rowData),
                    },
                    {
                        icon: () => <img style={{ width: "30px" }} className="ml-1" src={Delete} alt="2M-advisory" />,
                        tooltip: 'Supprimer',
                        onClick: (event, rowData) => this.handleModalDeleteTester(rowData),
                    
                    }
                ]
                :
                [
                    {
                        icon: () => <img style={{ width: "30px" }} className="mr-1" src={Edit} alt="2M-advisory" />,
                        tooltip: 'Modifier',
                        onClick: (event, rowData) => this.toggle(rowData),
                    },
                    {
                        icon: () => <img style={{ width: "30px" }} className="ml-1" src={Delete} alt="2M-advisory" />,
                        tooltip: 'Supprimer',
                        onClick: (event, rowData) => this.handleModalDeleteTester(rowData),
                    
                    }
                ]
        return (
            <Table
                title='Liste des testeurs'
                columns={columns}
                data={this.state.data}
                actions={actions}
                pageSize={length}
            />
        )
    }
    
    render() {
        return (
            <div className="scenario__ctn-panel">
                <span className="title__style__testeur">Panel de testeurs</span>
                <Row className='row_panel'>
                    <Col md='12'>
                        <AvForm onSubmit={this.submitForm}>
                            <Row className='row__form'>
                                <Label className='label__form__testeur'>Sélectionner un scénario</Label>
                                {
                                    this.state.modified === false ?
                                        <AvField type="select" name="scenarioName" className="select__form-client" style={{ width: '20vw' }}
                                            onChange={this.onChangeScenario}
                                        >
                                            <option key={1} value="" selected disabled>Veuillez selectionner votre scénario</option>
                                            {
                                                this.state.modified === false  ?
                                                    this.props.scenario?.data?.map((scenario) =>
                                                        scenario.etat === 1 &&
                                                        <option key={scenario.id} value={scenario.id}>{scenario.title}</option>
                                                    ):
                                                    <option selected>{this.state.datas.scenarioName}</option>
                                            }
                                        </AvField>
                                        :
                                        this.state.modified === true ? 
                                            <option selected disabled className='select__form-client-scénarios'>{this.state.datas.scenarioName.join(', ')} </option>
                                            : 
                                            <AvField type="select" name="scenarioName" className='select__form-client' style={{ width: '20vw' }} disabled>
                                                <option key={this.props.location?.state?.data?.id} value={this.props.location?.state?.data?.id}>{this.props.location?.state?.data?.title}</option>
                                            </AvField>
                                }
                            </Row>
                            <Row className='row__form'>
                                {
                                    this.props?.location?.state?.choixPanel === "exist" ?
                                        <>
                                            <Label className='label__form__testeur'>Veuillez sélectionner votre panel</Label>
                                            <AvField type="select" name="idp" className="select__form__panel" style={{ width: '40vw' }}
                                                onChange={this.onSelectPanel}
                                                validate={{
                                                    required: { value: true, errorMessage: "Ce champ est obligatoire" },
                                                }}
                                            >
                                                <option key={1} value="" selected disabled>Veuillez selectionner votre panel</option>
                                                {
                                                    this.state.panels?.map((panel) => <option key={panel.id} value={panel.id}>{panel.name}</option>)
                                                }
                                            </AvField>
                                        </>
                                    :
                                        <>
                                            <Label className='label__form__testeur'>Donner un nom au panel</Label>
                                            <AvField className="select__form__panel" style={{ width: '40vw' }} type="text" onChange={this.onChangePanel} name="name"
                                                value={this.state.datas?.name ? this.state.datas?.name : ""}
                                                validate={{
                                                    required: { value: true, errorMessage: "Ce champ est obligatoire" },
                                                }}
                                            />
                                            {
                                                this.props?.location?.state?.choixPanel !== "exist" &&
                                                <Button className='add-testeur' onClick={() => this.toggle()}> Ajouter un testeur </Button>
                                            }
                                        </>
                                }
                            </Row>
                            <div className='footer__form__panel'>
                                <div className='footer__table_form__panel'>
                                    {
                                        this.state.data.length <= 5 ?
                                            <>
                                                {this.renderTable(5)}
                                            </>
                                            :
                                            null
                                    }
                                    {
                                        this.state.data.length > 5 ?
                                            <>
                                                {this.renderTable(10)}
                                            </>
                                            :
                                            null
                                    }
                                </div>
                            </div>
                            <div className='panelClient-footer'>
                                {
                                    this.state.data.length > 0 && this.state.modified === false ?
                                        <Button className='create-panel-testeurs'> valider </Button>
                                        :
                                        this.state.data.length > 0 && this.state.modified === true ?
                                            <Button className='create-panel-testeurs'> Modifier </Button>
                                            :
                                            null
                                }
                            </div>
                        </AvForm>
                        {this.renderModaltester()}
                        {this.renderModalDelete()}
                        {this.renderModalDetacher()}
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    user: state.user,
    scenario: state.scenario,
    panel: state.panel
});
export default connect(
    mapStateToProps,
    { onGetScenarios, onGetPanels }
)(CreatePanelClient);