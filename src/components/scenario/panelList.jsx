import React,{Fragment} from 'react';
import Table from "../common/table/table"
import { connect } from 'react-redux';
import { onGetPanelById, onGetPanels, onGetScenarios } from "../../actions/scenarioActions"
import scenarioServices from '../../services/scenarioServices'
import { Button, Col } from "reactstrap"
import  ShowMore from "../../assets/insightdata_consulter.svg"
import { ReactComponent as Delete } from "../../assets/tdb/delete.svg"
import { ReactComponent as Edit } from "../../assets/tdb/modiifier.svg"
import "./scenario.css"
import { AvForm, AvField, AvGroup } from 'availity-reactstrap-validation';
import { Label, FormGroup } from "reactstrap";
import { toast } from 'react-toastify';
import RightStat from '../dashboard/client/RightStat';
import VisualiserPopup from './VisualiserPopup';
import Modals from '../common/modals/modal'
import Favorite from "../common/header/favorite";

class PanelList extends React.Component {
    state = {
        data: [],
        testers: [],
        details: {},
        show: false,
        scenariosPanel: [],
        type: '',
    }

    componentDidMount() {
        if (this.props.panel?.data.length === 0){
            this.props.onGetPanels()
        }
        else {
            let panels = []
            this.props.panel?.data.map(panel => 
                panels = [...panels, {
                    id: panel.id,
                    name: panel.name,
                    scenarioName: panel.scenarioName,
                    testersNb: panel.testersNb,
                    type: panel.type,
                    state: panel.state,
                    clientTesters: panel.clientTesters,
                    etat: panel.able_edit,
                }]
            )
            this.setState({ data: panels })
        }
        //get scenarios
        let scenarios = []
        if(this.props.scenario?.data?.length === 0 || this.props.scenario?.data === undefined) {
            this.props.onGetScenarios()
        } else {
            // ajouter les scenarios qui ont un etat superieur ou égal a 1
            this.props.scenario?.data?.forEach(scenario => {
                if (scenario.etat >= 1) {
                    scenarios = [...scenarios, {
                        id: scenario.id,
                        createdAt: scenario.createdAt,
                        product: scenario.product,
                        isModerate: scenario.isModerate,
                        title: scenario.title,
                        progress: scenario.progress,
                        isUnique: scenario.isUnique,
                        state: scenario.state,
                        panel: scenario.panel,
                        etat: scenario.etat,
                    }]
                }
            })
            this.setState({ scenariosPanel: scenarios })
        }
        // if(this.props.scenario.errorPanels){
        //     toast.error(this.props.scenario.errorPanels)
        // }
    }

    componentDidUpdate(prevProps) {
        if (this.props.panel?.data !== prevProps.panel?.data) {
            let panels = []
            this.props.panel?.data.map(panel => 
                panels = [...panels, {
                    id: panel.id,
                    name: panel.name,
                    scenarioName: panel.scenarioName,
                    testersNb: panel.testersNb,
                    type: panel.type,
                    state: panel.state,
                    clientTesters: panel.clientTesters,
                    etat: panel.able_edit,
                }]
            )
            this.setState({ data: panels })
        }
        let scenarios = [];
        //get scenarios
        if(this.props.scenario?.data !== null && this.props.scenario?.scenario?.data > 0) {
            if (this.props.scenario?.data !== prevProps.scenario?.data) {
                // ajouter les scenarios qui ont un etat superieur ou égal a 1
                this.props.scenario?.data.map(scenario => 
                    (scenario.etat >= 1) &&
                    (  scenarios = [...scenarios, {
                            id: scenario.id,
                            createdAt: scenario.createdAt,
                            product: scenario.product,
                            isModerate: scenario.isModerate,
                            title: scenario.title,
                            progress: scenario.progress,
                            isUnique: scenario.isUnique,
                            state: scenario.state,
                            panel: scenario.panel,
                            etat: scenario.etat,
                        }])
                    
                )
                this.setState({ scenariosPanel: scenarios })
            }
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        let panels = []
        if (this.props.panel?.data !== nextProps.panel?.data) {
            nextProps.panel?.data.map(panel => 
                panels = [...panels, {
                    name: panel.name,
                    scenarioName: panel.scenarioName,
                    testersNb: panel.testersNb,
                    type: panel.type,
                    state: panel.state,
                    clientTesters: panel.clientTesters,
                    etat: panel.able_edit,
                }]
            )
            this.setState({ data: panels })
        }
        let scenarios = []
        if(this.props.scenario?.data !== null && this.props.scenario?.data?.length > 0) {
            if (!this.props.scenario?.data[0])
                this.props.onGetScenarios()
            else {
                // ajouter les scenarios qui ont un etat superieur ou égal a 1
                this.props.scenario?.data.forEach(scenario => {
                    if (scenario.etat >= 1) {
                        scenarios = [...scenarios, {
                            id: scenario.id,
                            createdAt: scenario.createdAt,
                            product: scenario.product,
                            isModerate: scenario.isModerate,
                            title: scenario.title,
                            progress: scenario.progress,
                            isUnique: scenario.isUnique,
                            state: scenario.state,
                            panel: scenario.panel,
                            etat: scenario.etat,
                        }]
                    }
                })
                this.setState({ scenariosPanel: scenarios })
            }
        }
    }

    showDetails = (data, type) => {
        this.setState({ show: !this.state.show, details: data, type: type })
    }



    renderTesterDetails() {
        return (
            <VisualiserPopup
                open={this.state.show}
                toggle={this.showDetails}
                type={this.state.type}
                scenarios={this.state.scenariosPanel}
                data={this.state.details}
                renderTesterTable={this.renderTesterTable}
                onGetScenarios={this.props.onGetScenarios}
                onGetPanels={this.props.onGetPanels}
            />
        )
    }

    handleDeletePanel = (id, row) => {
        this.setState({ showDelete: !this.state.showDelete })
        this.setState({ panelId: id })
    }

    renderModalDelete = () => {
        return (
            <Modals
                header="Supprimer une panel"
                show={this.state.showDelete}
                modalSize="modal-sm"
                toggleShow={this.handleDeletePanel}
            >
                <p className="text-center">Voulez-vous vraiment supprimer ce panel ?</p>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "2rem" }}>
                    <Button className="btn-success" onClick={this.dropPanel}>Oui</Button>
                    <Button onClick={this.handleDeletePanel}>Non</Button>
                </div>
            </Modals>
        )
    }

    onChange = e => {
        e.preventDefault();
        this.setState({ updatedUser: { ...this.state.updatedUser, [e.target.name]: e.target.value } })
    };

    renderModalUpdate = () => {
        return (
            <Modals
                header="Modifier une panel"
                show={this.state.showUpdate}
                modalSize="modal-sm"
                toggleShow={this.handleModifPanel}
            >

                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "2rem" }}>
                    <AvForm >
                        <div className='row_form_client'>

                            <div>
                                <AvGroup className="column-left_client">
                                    <Label className="label_input_client">Nom de panel</Label>
                                    <AvField
                                        type="text"
                                        name="NomPanel"
                                        id="lastname"
                                        onChange={this.onChange}
                                        value={this.state.details?.name ? this.state.details?.name : ""}
                                        // className="landing_input_client"
                                        validate={{
                                            required: { value: true, errorMessage: "Ce champ est obligatoire" },
                                            // pattern: { value: "^[a-zA-Z ]{1,50}$", errorMessage: "Les chiffres et les caractéres speciaux ne sont pas autorisé" }
                                        }}
                                    />
                                </AvGroup>
                            </div>
                        </div>
                        <div className='row_form_client'>

                            <div>
                                <FormGroup className="column-left_client">
                                    <Label className="label_input_client">Type de panel</Label>
                                    <AvField
                                        type="text"
                                        name="typePanel"
                                        onChange={this.onChange}
                                        value={this.state.details?.type ? this.state.details?.type : ""}
                                        //  className="landing_input_client"
                                        validate={{
                                            required: { value: true, errorMessage: "Ce champ est obligatoire" },
                                            // pattern: { value: "^[+]{0,1}[0-9]{0,30}$", errorMessage: "Le numéro de téléphone doit contenir que des chiffres" },
                                        }}
                                    />
                                </FormGroup>
                            </div>
                        </div>
                        <div className='row_form_client'>

                            <div>
                                <FormGroup className="column-left_client">
                                    <Label className="label_input_client">Scénario</Label>
                                    <AvField
                                        type="text"
                                        value={this.state.details?.scenarioName ? this.state.details?.scenarioName : ""}
                                        name="scenario"
                                        onChange={this.onChange}
                                        //  className="landing_input_client"
                                        validate={{
                                            required: { value: true, errorMessage: "Ce champ est obligatoire" },
                                        }}
                                    />
                                </FormGroup>
                            </div>
                        </div>
                        <Button className="btn-success" style={{ marginLeft: "50px" }} onClick={this.updatePanel}>Modifier</Button>
                    </AvForm>
                </div>
            </Modals>
        )
    }

    dropPanel = async () => {
        const { panelId } = this.state
        const formData = new FormData();
        formData.append('panel_id', panelId);
        try{
            const deletePanelResponse = await scenarioServices.deletePanel(formData);
            if(deletePanelResponse.header.code === 200){
                this.props.onGetPanels();
                toast.success(deletePanelResponse.header.message);
            }else{
                toast.error(deletePanelResponse.header.message)
            }
        }catch(err){
            console.log("Error",err)
        }

        this.setState({ count: this.props.panel?.data.count })
        this.setState({ showDelete: !this.state.showDelete })
    }

    updatePanel = () => {
        toast.success('Panel a été modifié')
        this.setState({ count: this.props.scenario.count })
        this.setState({ showUpdate: !this.state.showUpdate })
    }


    handleModifPanel = (data) => {
        this.props.onGetPanelById(data.id)
        const dataToPass = {
            id: data.id,
            modified : true
        }
        this.props.history.push({
            pathname: '/client/panelDetails',
            state:  dataToPass,
        });
    }


    renderTable = () => {
        const columns = [
            { title: "Nom du panel", field: 'name' },
            { title: "Nombre de testeurs", field: 'testersNb' },
            { title: "Type de panel", field: 'type' },
            { title: "Scénario associé", field: 'scenarioName',
                render: rowData => 
                    <span>
                        {
                            <div className='scenarios-panel-list'>
                                {
                                    rowData?.scenarioName?.map((scenario, index) => (
                                        <Fragment key={index}>
                                            {`${scenario},  `} 
                                        </Fragment>
                                    ))
                                }
                            </div>
                        }
                    </span>
            },

        ]
        const actions = [{
            icon: () => <img className='tableIcons2 mt-1'  src={ShowMore} alt='2M-advisory'/>,
            tooltip: 'Détails',
            onClick: (event, rowData) => this.showDetails(rowData, "Détails"),
        },
        {
            icon: () => <Edit className="tableIcons1"/>,
            tooltip: 'Modifier',
            onClick: (event, rowData) => this.handleModifPanel(rowData),
        },
        rowData => ({
            icon: () => <Delete className={`${rowData.etat  ? 'tableIcons1 ' : 'tableIcons1 tableIconsDisabled'}`} />,
            tooltip: 'Supprimer',
            onClick: (event, rowData) =>  rowData.etat && this.handleDeletePanel(rowData.id, rowData),
            disabled : !rowData.etat
        }),
        ]
        return (
            <Table
                title='Mes panels'
                columns={columns}
                data={this.state.data}
                actions={actions}
            />
        )
    }



    render() {
        return (
            <>
                <div className='display__flex__row-dashboard_client-panel'>
                    {this.renderTesterDetails()}
                    <Col md='10'>
                        <Favorite />
                        <div className='tableContainer-panel mt-4'>
                            {this.renderTable()}
                            {this.renderModalDelete()}
                            {this.renderModalUpdate()}
                        </div>
                    </Col>
                    <Col md='2' className='dashboard_client-right_side'>
                        <RightStat />
                    </Col>
                </div>
            </>
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
    { onGetPanels, onGetScenarios, onGetPanelById }
)(PanelList);