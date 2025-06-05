/**
 * @file manageSubClient.jsx
 */

/**
 * React imports
 */
import React from 'react';
/**
 * Reactstrap imports
 * */ 
import { Col, Button } from 'reactstrap'
import { toast } from 'react-toastify';

/**
 * React-redux imports
 * @see https://react-redux.js.org/
 */
import { connect } from 'react-redux';
import { onGetSubClients, onSaveSubClient } from '../../../actions/userActions'
import userServices from '../../../services/userServices'

/**
 * Moment imports
 * @see https://momentjs.com/
*/
import moment from 'moment';

/**
 * React-router-dom imports
 */
import { Link } from 'react-router-dom';

/**
 * Components imports
 */
import Modals from '../../common/modals/modal';
import PwdForm from './pwdForm'
import Delete from "../../../assets/tdb/delete.svg"
import SubClientForm from './subClientForm'
import AddIcon from "../../../assets/ajouter.svg"
import Table from "../../common/table/table"
import RightSideClient from './rightSideClient';



/*******************************************************************/
/*                    ManageSubClient Component                    */
/******************************************************************/
class ManageSubClient extends React.Component {
    /**
     * @returns state
     */
    state = {
        data: [],
        show: false,
        show2: false,
        countSubClients: 1,
        currentUser: {
            name: "",
            lastname: "",
            username: "",
        },
        loading: false,
        userLabel: {
            name: "Prénom",
            lastname: "Nom",
            email: "Email",
            username: "Nom d'utilisateur",
        },
        currentPwd: {
            old_password: '',
            new_password: '',
            new_password_confirm: ''
        },
        error: {},
        SubClientId: null,
        showDelete: false,
    }



    /**
     * @returns get subclients
     * update state
     * call onGetSubClients action
     */
    componentDidMount() {
        if (!this.props.user.subClients[0])
            this.props.onGetSubClients()
        else {
            let subClients = []
            this.props.user.subClients.map(subClient => 
                subClients = [...subClients, {
                    createdAt: moment(subClient.createdAt).format('L'),
                    lastname: subClient.lastname,
                    id: subClient.id,
                    name: subClient.name,
                    username: subClient.username,
                    state: subClient.state,
                    color: (moment(new Date()).format('L') > moment(subClient.createdAt).format('L') + "02") || (moment(new Date()).isAfter(subClient.createdAt, 'year')) ? "red" : ""
                }]
            )
            this.setState({ data: subClients, countSubClients: this.props.user.subClients.length })
        }
    }



    /**
     * 
     * @param {*} nextProps 
     * @returns update state when props change
     */
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.user.errorSubClient !== this.props.user.errorSubClient) {
            this.setState({
                error: nextProps.user.errorSubClient

            })
        }
        if ((this.props.user.subClients !== nextProps.user.subClients)) {
            let subClients = []
            nextProps.user.subClients.map(subClient => 
                subClients = [...subClients, {
                    createdAt: moment(subClient.createdAt).format('L'),
                    lastname: subClient.lastname,
                    name: subClient.name,
                    id: subClient.id,
                    username: subClient.username,
                    state: subClient.state,
                    color: (moment(new Date()).format('L') > moment(subClient.createdAt).format('L') + "02") || (moment(new Date()).isAfter(subClient.createdAt, 'year')) ? "red" : ""
                }]
            )
            this.setState({ data: subClients })

        }
    }


    /**
     * @returns open&close modal to add subClient
     */
    toggle = () => {
        this.setState({ show: !this.state.show })
        setTimeout(() => {
            this.setState({
                currentUser: {
                    name: "",
                    lastname: "",
                    email: "",
                },
            })
        }, 500);
    }


    /**
     * 
     * @param {*} e 
     * @returns function to update form subClient
     */
    onChange = e => {
        e.preventDefault();
        this.setState({ currentUser: { ...this.state.currentUser, [e.target.name]: e.target.value }, errors: { ...this.state.errors, [e.target.name]: "" }, error: {} })
    };


    /**
     * @returns open&close modal to update password
     */
    toggle2 = () => {
        this.setState({ show2: !this.state.show2 })
        setTimeout(() => {
            this.setState({
                currentPwd: {
                    old_password: '',
                    new_password: '',
                    new_password_confirm: ''
                },
            })
        }, 500);
    }



    /**
     * 
     * @param {*} e 
     * @returns function to update form password
     */
    onChangePwd = e => {
        e.preventDefault();
        this.setState({ currentPwd: { ...this.state.currentPwd, [e.target.name]: e.target.value } })
    };



    /**
     * @returns function to update password
     */
    onSubmitPwd = () => {
        const { old_password, new_password } = this.state.currentPwd;
        const pwd = {
            old_password, new_password
        }
        this.setState({ loading: true })
        userServices.updatePwd(pwd).then(res => {
            this.setState({ loading: false })
            this.toggle2()
        })
    }



    /**
     *  
     * @param {*} rowId
     * @returns function to add subClient     
     */
    onSubmit = () => {
        const { name, lastname, email } = this.state.currentUser;
        let username = email
        const subClient = {name, lastname, email,username}
        this.setState({ loading: true })
        this.props.onSaveSubClient(subClient)
        setTimeout(() => {
            this.setState({ loading: false })
            !this.state.error.message && this.toggle()
            this.state.error.message && toast.error('Email déjà utilisé')
            !this.state.error.message && toast.success('Sous-compte créé avec succès ')
        }, 2000);
    }



    /**
     * 
     * @param {*} id 
     * open & close modal to delete subClient
     * update state
     * 
     */
    handleDeleteScenario = (id) => {
        this.setState({ showDelete: !this.state.showDelete })
        this.setState({ SubClientId: id })
    }



    /**
     * @returns modal to delete subClient
     */
    renderModalDelete = () => {
        return (
            <Modals
                header="Supprimer un sous-compte"
                show={this.state.showDelete}
                modalSize="modal-sm"
                toggleShow={this.handleDeleteScenario}
            >
                <p className="text-center">Voulez-vous vraiment supprimer ce sous-compte ?</p>
                <div style={{display :"flex", justifyContent : "center", alignItems : "center", gap: "2rem"}}>
                    <Button className="btn-success" onClick={this.onDelete}>Oui</Button>
                    <Button onClick={this.handleDeleteScenario}>Non</Button>
                </div>
            </Modals>
        )
    }

    /**
     * 
     * @param {*} rowId 
     * @returns delete subClient
     */
    onDelete = () => {
        userServices.deleteSubClient(this.state.SubClientId).then(res => {
            this.props.onGetSubClients()
            toast.success('Le client a été supprimé')
        })
    this.setState({ showDelete: !this.state.showDelete } )
    }



    /**
     * 
     * @returns modal to add change password
     */
    renderModalPwd() {
        const { currentPwd, loading } = this.state
        return (
            <Modals
                // modalSize="modal-lg"
                show={this.state.show2}
                toggleShow={this.toggle2}
                header='Modifier mon mot de passe'
            >
                <PwdForm
                    confirmText='Valider'
                    handleSubmit={this.onSubmitPwd}
                    onChangePwd={this.onChangePwd}
                    currentPwd={currentPwd}
                    loading={loading}
                    error={this.state.error}

                />

            </Modals>
        )
    }





    /**
     * 
     * @returns modal to add subClient
     */
    renderModalSubClient() {
        const { currentUser, userLabel, loading } = this.state
        return (
            <Modals
                // modalSize="modal-lg"
                show={this.state.show}
                toggleShow={this.toggle}
                header='Ajouter un sous-compte'
            >
                <SubClientForm
                    confirmText='Ajouter un sous-compte'
                    handleSubmit={this.onSubmit}
                    onchange={this.onChange}
                    currentUser={currentUser}
                    userText={userLabel}
                    loading={loading}
                    error={this.state.error}
                />
            </Modals>
        )
    }




    /**
     * 
     * @returns table
    */
    renderTable = () => {
        // const details = order.details.filter(dur => moment(dur.from_date).format('MM') === this.state.month)
        const columns = [
            { title: "Date", field: 'createdAt' },
            { title: "Nom", field: 'lastname' },
            { title: "Prémon", field: 'name' },
            { title: "Email", field: 'username' },
            { title: "Etat", field: 'state', render: rowData => <span style={{ color: `${rowData.color}` }}>{rowData.state === "to_contact" ? <span style={{color : "red"}}>A contacter</span> : <span style={{color : "green"}}>Ok</span> }</span> },
        ]
        const actions = [{
            icon: () => <img style={{ width: '28px' }} src={Delete} alt="2M-advisory" />,
            tooltip: 'Supprimer',
            onClick: (event, rowData) => this.handleDeleteScenario(rowData.id),
            }
        ]
        return (
            <Table
                title='Liste des comptes'
                columns={columns}
                data={this.state.data}
                actions={actions}
            />
        )
    }



    /**
     * 
     * @returns render
     */
    
    render() {
        return (
        <>
            <div className='display__flex__row-compte_sub_client mt-3'>
                <Col md='10'>
                    <Link className='retour mb-4' to={"/client/clientmanage"}> {" < "} Retour</Link>
                    <span><img className='add__btn' onClick={this.toggle} src={AddIcon} alt="2M-advisory" /></span>
                    {this.renderTable()}
                    {this.renderModalSubClient()}
                    {this.renderModalDelete()}
                </Col>
                <RightSideClient/>
            </div>
        </>
    );
    }
}


/**
 * 
 * @param {*} state 
 * @returns 
 */
const mapStateToProps = state => ({
    auth: state.auth,
    user: state.user
});

/**
 * connect to redux
 */
export default connect(
    mapStateToProps,
    { onGetSubClients, onSaveSubClient }
)(ManageSubClient);