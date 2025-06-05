/**
 * @file informations.jsx
 */

/**
 * React imports
*/
import React from 'react';

/**
 * Reactstrap imports
*/
import { Label, Col, FormGroup, Button } from "reactstrap";
import { AvForm, AvField, AvGroup } from 'availity-reactstrap-validation';
import { toast } from 'react-toastify';

/**
 * React-redux imports
 */
import { connect } from 'react-redux';
import userServices from '../../../services/userServices'
import { onGetSubClients, onSaveSubClient,onGetCurrentUser } from '../../../actions/userActions'

/**
 * Components imports
 */
import PwdForm from './pwdForm'
import Modals from '../../common/modals/modal';
import  papier  from "../../../assets/papier.svg";
import RightSideClient from './rightSideClient';


/*******************************************************************/
/*                InformationsClient Component                    */
/******************************************************************/
class InformationsClient extends React.Component {
    /**
     * @constructor
     * @param {*} props
     * @description constructor
     */
    state = {
        data: [],
        show: false,
        show2: false,
        countSubClients: 1,
        anneeList:[],
        currentUser: {},
        updatedUser: {},
        loading: false,
        userLabel: {
            name: "Prénom",
            lastname: "Nom",
            username: "Nom d'utilisateur",
        },
        user:{},
        currentPwd: {
            old_password: '',
            new_password: '',
            new_password_confirm: ''
        },
        error: {},
        factureList: []
    }
    /**
     *  @description componentDidMount
     *  get current user
     * get annee list
     */
    componentDidMount() {
        this.props.onGetCurrentUser();
        this.props.onGetSubClients();
        let annee = [];
        for (let i = 2022; i >= 2013; i--) {
          annee.push(i);
        }
        this.setState({anneeList:annee})
        this.setState({user:this.props.user?.currentUser})
    }

    /**
     * 
     * @param {*} nextProps 
     * @description UNSAFE_componentWillReceiveProps
     * update state when user change
     */
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.user?.currentUser !== this.props.user?.currentUser) {
            this.setState({ user: nextProps.user.currentUser })
        }
    }

    /**
     * @description renderModal
     * @returns {JSX}
     * open & close modal new password
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
     * @description onChangePwd
     * update state when user form change password 
     */
    onChangePwd = e => {
        e.preventDefault();
        this.setState({ currentPwd: { ...this.state.currentPwd, [e.target.name]: e.target.value } })
    };

    /**
     *  @description onSubmitPwd
     * update password
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
            toast.success('Mot de passe modifié avec succès');
        })
    }
        
    /**
     * @description renderModalPwd
     * @returns {JSX}
     * render modal password
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

    handleAnnee = (e) => {
        console.log("annee");
    };

    handleRoute = () => {
        this.props.history.push("/client/usesmanage");
    }
    onChange = e => {
        e.preventDefault();
        this.setState({ updatedUser: { ...this.state.updatedUser, [e.target.name]: e.target.value } })
    };

    handleSubmitFrom(event, errors, values) {
        event.preventDefault();
        let user = values;
        if (errors.length === 0) {       
            userServices.updateClient(user).then(res => {
                toast.success('Compte modifié avec succès');
            }).catch(err => {
                console.log(err);
        })
        }
    }

    render() {
        return (
            <div className='display__flex__row-compte_client-information'>
                <Col md='10'>
                    <div className='favoris'>
                        <span className='iban_contrat_title_client'>Mon Compte</span>
                        <div className='display__flex__row'>
                            <Button className='shortcut' onClick={this.handleRoute} >Mes sous comptes</Button>
                            <Button className='shortcut' onClick={() => this.toggle2()} >Gestion mot de passe</Button>
                            {this.renderModalPwd()}
                        </div>
                        <div>
                            <AvForm onSubmit={this.handleSubmitFrom}>
                                <div className='row_form_client'>
                                    <div>
                                        <AvGroup className="column-left_client">
                                        <Label className="label_input_client">Prénom</Label>
                                        <AvField
                                            type="text"
                                            name="name"
                                            onChange={this.onChange}
                                            value={this.state.user?.name ? this.state.user?.name : ""}
                                            id="name"
                                            className="landing_input_client"
                                            validate={{
                                            required: { value: true, errorMessage: "Ce champ est obligatoire" },
                                            pattern: { value: "^[a-zA-Z ]{1,50}$", errorMessage: "Les chiffres et les caractéres speciaux ne sont pas autorisé" }
                                            }}
                                        />              
                                        </AvGroup>
                                    </div>
                                    <div>
                                        <AvGroup className="column-left_client">
                                        <Label className="label_input_client">Nom</Label>
                                        <AvField
                                            type="text"
                                            name="lastname"
                                            id="lastname"
                                            onChange={this.onChange}
                                            value={this.state.user?.lastname ? this.state.user?.lastname : ""}
                                            className="landing_input_client"
                                            validate={{
                                            required: { value: true, errorMessage: "Ce champ est obligatoire" },
                                            pattern: { value: "^[a-zA-Z ]{1,50}$", errorMessage: "Les chiffres et les caractéres speciaux ne sont pas autorisé" }
                                            }}
                                        />             
                                        </AvGroup>
                                    </div>
                                </div>
                                <div className='row_form_client'>
                                    <div>
                                        <FormGroup className="column-left_client">
                                        <Label className="label_input_client">Email professionnel</Label>
                                        <AvField
                                            type="text"
                                            value={this.state?.user?.email ? this.state.user?.email : ""}
                                            name="email"
                                            onChange={this.onChange}
                                            className="landing_input_client"
                                            invalid={this.state.error && this.state.error.email ? true : false}
                                            validate={{
                                            pattern: { value: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$', errorMessage: "Cette adresse mail n'est pas valide" },
                                            required: { value: true, errorMessage: "Ce champ est obligatoire" },
                                            }}
                                        />            
                                        </FormGroup>
                                    </div>
                                    <div>
                                        <FormGroup className="column-left_client">
                                        <Label className="label_input_client">Téléphone</Label>
                                        <AvField
                                            type="number"
                                            name="phone"
                                            onChange={this.onChange}
                                            value={this.state.user?.phone ? this.state.user?.phone : ""}
                                            className="landing_input_client"
                                            validate={{
                                            required: { value: true, errorMessage: "Ce champ est obligatoire" },
                                            pattern: { value: "^[+]{0,1}[0-9]{0,30}$", errorMessage: "Le numéro de téléphone doit contenir que des chiffres" },
                                            }}
                                        />             
                                        </FormGroup>
                                    </div>
                                </div>
                                <div className='row_form_client'>
                                    <div>
                                        <FormGroup className="column-left_client">
                                        <Label className="label_input_client">Société</Label>
                                        <AvField
                                            type="text"
                                            name="company"
                                            onChange={this.onChange}
                                            value={this.state.user?.company ? this.state.user?.company : ""}
                                            className="landing_input_client"
                                            validate={{
                                            required: { value: true, errorMessage: "Ce champ est obligatoire" },
                                            }}
                                        /> 
                                        </FormGroup>
                                    </div>
                                    <div>
                                        <FormGroup className="column-left_client">
                                        <Label className="label_input_client">Ville</Label>
                                        <AvField
                                            type="text"
                                            value={this.state.user?.city ? this.state.user?.city : ""}
                                            name="city"
                                            onChange={this.onChange}
                                            className="landing_input_client"
                                            validate={{
                                            required: { value: true, errorMessage: "Ce champ est obligatoire" },
                                            }}
                                        /> 
                                        </FormGroup>
                                    </div>
                                </div>
                                <div className="footer_form_client">
                                    <Button className="btn-success"> 
                                    Enregistrer
                                    </Button>
                                </div>
                            </AvForm>
                        <div className='client_footer'>
                            <div className="iban_facture_client">
                                <div className="iban_contrat_title"> 
                                    Mes factures 
                                    <span className="iban_facture_annee">
                                    <select onChange={this.handleAnnee} className="iban_facture_annee_select">
                                        <option defaultValue="All" selected>Année</option>
                                        {
                                        this.state.anneeList.map((item, index) => {
                                            return (
                                            <option key={index} value={item}>{item}</option>
                                            )
                                        })
                                        }
                                    </select>
                                    </span>
                                </div>
                                {
                                    this.state.factureList.length > 0 ? 
                                        <div className="iban_facture_section_client">
                                            {
                                                this.state.factureList.map((item, index) => {
                                                    return (
                                                        <div className="iban_facture_content_client" key={index}>
                                                            <span className="iban_facture_date"> {item} </span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        :
                                        <div className='iban_facture_section_client_vide mt-4'>
                                            Vous n'avez pas encore de facture
                                        </div>
                                }
                            </div>
                            <div className="iban_contrat_client">
                                <div className="iban_contrat_title"> Mon contrat </div>
                                <div className="iban_section_client">
                                    <div className="iban_contrat_content_client">
                                    <img src={papier} alt="iban_papier_client" className="iban_img"/>
                                    </div>
                                    <span className="iban_text_client" > Visualiser et enregister mon contrat </span>
                                </div>
                                <div className="iban_section_client">
                                    <div className="iban_contrat_content_client">
                                    <img src={papier} alt="iban_papier" className="iban_img"/>
                                    </div>
                                    <span className="iban_text_client" > Demander modification / suppresion de mon contrat/ infos SEPA  </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
            <RightSideClient/>
        </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    user: state.user
});

export default connect(
    mapStateToProps,
    { onGetSubClients, onSaveSubClient, onGetCurrentUser }
)(InformationsClient);