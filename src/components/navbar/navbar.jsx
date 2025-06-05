import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Collapse, Navbar, NavbarToggler, Button, NavbarBrand,
    Nav, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import authServices from '../../services/authServices';
import { authRoutes, Routes } from '../../utils/routes';
import Modals from '../common/modals/modal';
import ClientRegisterForm from '../register/client/register'
import ModelConditions from './ModalConditions';
import ModelPolitique from './ModalPolitique';
import ModelLegal from './ModalLegal';
import ConfimInscription from './ConfimInscription';
import { onSaveClient, onSaveTester } from "../../actions/userActions"
import { setScrolledSection } from "../../actions/navigationAction"
import Lang from "../../utils/lang"
import lng from "../../utils/utils.json"
import { toast } from 'react-toastify';
import Logo from '../../assets/logo-vector.svg'
import ProfileIcon from '../../assets/insightdata_profil.svg'
import "./navbar.css";
import PayAsYouGoModal from "./PayAsYouGoModal";
import TesterRegisterForm from '../register/tester/registerForm';
import { pays } from '../../utils/pays'
import userServices from '../../services/userServices';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lngActive: this.props.auth.lng,
            isSelected: null,
            visiblePayAsYouGo: false,
            visibleCondition: false,
            visiblePolitique: false,
            visibleInscription: false,
            visibleLegal: false,
            cgu: false,
            privacyPolicy: false,
            count: 0,
            page: '1',
            show: false,
            show2: false,
            loading: false,
            phoneRequired: true,
            field: false,
            field2: false,
            ErrorForm1: false,
            erreurCondtion: "",
            currentUser: {
                name: "",
                lastname: "",
                useCase: "",
                sector: "",
                profession: "",
                email: "",
                phone: "",
                nbEmployees: "",
                company: ""
            },
            currentTester: {
                name: "",
                lastname: "",
                dateOfBirth: "",
                gender: "",
                maritalStatus: "",
                email: "",
                phone: "",
                country: "",
                studyLevel: "",
                socialMedia: "",
                os: "",
                csp: "",
                codePostal: "",
                adressePostal: "",
                ville: "",
                carteIndentiteRecto: "",
                carteIndentiteVerso: "",
            },
            userLabel: {
                name: "Prénom",
                lastname: "Nom",
                email: "Email",
                useCase: "Cas d'utilisation",
                sector: "Secteur",
                profession: "Fonction",
                phone: "Téléphone",
                nbEmployees: "Nombre d'employés",
                company: "Société",
            },
            testerText: {
                name: "Prénom",
                lastname: "Nom",
                email: "Email",
                age: "Date de naissance",
                csp: "CSP",
                situation: "Situation familiale",
                os: "OS",
                gender: "Genre",
                pays: "Pays de résidence",
                niveau: "Niveau d'études",
                reseau: "Réseaux Sociaux",
                phone: "Télephone",
                adressePostal: "Adresse postale",
                codePostal: "Code postal",
                ville: "Ville",
                carteIndentiteRecto: "Carte d'identité Recto",
                carteIndentiteVerso: "Carte d'identité Verso",
            },
            errors: {},
            error: {},
            fileError: '',
            doneVerso: '',
            doneRecto: '',
            fileErrorVerso: '',
            fileErrorRecto: '',
            errorEmail: "",
            isValidPhoneNumber: false,
        };
        this.onSubmit = this.onSubmit.bind(this)
        this.onSubmitTester = this.onSubmitTester.bind(this)
        this.handleConditions = this.handleConditions.bind(this);
        this.handlePolitique = this.handlePolitique.bind(this);
        this.handleLegal = this.handleLegal.bind(this);
    }

    /**
     * Updates the component state based on the next props received.
     *
     * @param {Object} nextProps - The next props received by the component.
     */
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.user.errorClient !== this.props.user.errorClient) {
            this.setState({ error: nextProps.user.errorClient && nextProps.user.errorClient.errors })
        }
        if (nextProps.user.errorTest !== this.props.user.errorTest) {
            this.setState({ error: nextProps.user.errorTest && nextProps.user.errorTest.errors })
        }
        if (nextProps.auth.lng !== this.state.lngActive) {
            this.setState({ lngActive: nextProps.auth.lng });
        }
    }
    toggleIsOpen = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    onChangePage = () => {        
        this.setState({
            page: '2',
        })
    };

    toggle = () => {
        this.setState({
            show: !this.state.show,
        })
        if (this.state.field) {
            this.setState({ field: !this.state.field })
        }
        setTimeout(() => {
            this.setState({
                currentUser: {
                    name: "",
                    lastname: "",
                    useCase: "",
                    sector: "",
                    profession: "",
                    email: "",
                    phone: "",
                    nbEmployees: "",
                    company: ""
                },
                cgu: false,
                privacyPolicy: false,
                page: '1'
            })
        }, 500);
    }

    toggle2 = () => {
        this.setState({
            show2: !this.state.show2,
        })
        if (this.state.field2) {
            this.setState({ field2: !this.state.field2 })
        }
        setTimeout(() => {
            this.setState({
                currentTester: {
                    name: "",
                    lastname: "",
                    dateOfBirth: "",
                    gender: "",
                    maritalStatus: "",
                    email: "",
                    phone: "",
                    country: "",
                    studyLevel: "",
                    socialMedia: "",
                    os: "",
                    csp: "",
                    codePostal: "",
                    adressePostal: "",
                    ville: "",
                    carteIndentiteRecto: "",
                    carteIndentiteVerso: "",
                },
                cgu: false,
                privacyPolicy: false,
            })
        }, 500);
    }

    next = () => {
        this.setState({ field: !this.state.field })
    }

    onChange = e => {
        e.preventDefault();
        this.setState({ currentUser: { ...this.state.currentUser, [e.target.name]: e.target.value }, errors: { ...this.state.errors, [e.target.name]: "" }, error: {} })
    };

    onChangeTester = e => {
        e.preventDefault();
        this.setState({ currentTester: { ...this.state.currentTester, [e.target.name]: e.target.value }, errors: { ...this.state.errors, [e.target.name]: "" }, error: {} })
    };

    onChangePhone = value => {
        if (value !== "" || value === null) {
            this.setState({ currentUser: { ...this.state.currentUser, phone: value }, error: {}, phoneRequired: false })
        }
        else {
            this.setState({ phoneRequired: true })
        }

    };

    onChangePhone2 = value => {
        if (value) {
            this.setState({ currentTester: { ...this.state.currentTester, phone: value }, error: {} })
        }
        else {
            this.setState({ phoneRequired: true })
        }
    };


    handleConditions = () => {
        this.setState({ visibleCondition: !this.state.visibleCondition })
    };

    handlePolitique = () => {
        this.setState({ visiblePolitique: !this.state.visiblePolitique })
    };

    handleLegal = () => {
        this.setState({ visibleLegal: !this.state.visibleLegal })
    };

    handleInscription = () => {
        this.setState({ visibleInscription: !this.state.visibleInscription })
    };

    toggleVisiblePayAsYouGo = () => {
        this.setState({ visiblePayAsYouGo: !this.state.visiblePayAsYouGo })
    }

    handleVerifEmail = async (email) => {
        let mailData = {
            email: email 
        }
        this.setState({ loading: true })
        try {
            const response = await userServices.checkMailModeHorsLigne(mailData)
            if (response.header.code !== 200) {
                
                this.setState({ errorEmail: response.header.message })
                setTimeout(() => {
                    this.setState({ errorEmail: "" })
                },2000)
            }
        } catch (error) {
            console.log("err", error);
            this.setState({ errorEmail: "Une erreur est survenue" })
        }
        this.setState({ loading: false })
        return true;
    }

    /**
     * Submits the form data.
     *
     * @param {type} paramName - description of parameter
     * @return {type} description of return value
     */
    async onSubmit() {
        const { name, lastname, useCase, nbEmployees,
            sector, profession, email, phone, company, Commentaire
        } = this.state.currentUser;
        const { cgu, privacyPolicy, field } = this.state;
        const client = {
            name, lastname, useCase, nbEmployees,
            sector, profession, email, phone, company, cgu, privacyPolicy, Commentaire
        }
        if (!field) {
            const emailRes = await this.handleVerifEmail(email);
            if (emailRes) {
                this.setState({ field: !field })
            }
        }
        else {
            if (cgu === false || privacyPolicy === false) {
                this.setState({ erreurCondtion: "Veuillez accepter les conditions d'utilisation et la politique de confidentialité" })
            } else {
                this.setState({ loading: true })
                this.props.onSaveClient(client)
                setTimeout(() => {
                    this.setState({ loading: false })
                    this.setState({ field: !this.state.field })
                    this.state.error === undefined && this.toggle()
                    if (!this.props.user.errorClient) {
                        this.setState({ visibleInscription: !this.state.visibleInscription })
                    } else
                        toast.error("Erreur lors de l'enregistrement");
                }, 2000);
            }
        }
    }

    /**
     * Renders the modal signup component.
     *
     * @return {React.Component} The rendered modal signup component.
     */
    renderModalSignup() {
        const { currentUser, userLabel, loading } = this.state
        const usecase = ["Entreprise: Projet Ponctuel", "Entreprise: Plusieurs projets à tester", "Agence ou cabinet de conseil"]
        const nbemployees = ["1-10", "11-50", "51-250", "+250"]
        return (
            <Modals
                show={this.state.show}
                toggleShow={this.toggle}
                header='Devenir un client'
            >
                <ClientRegisterForm
                    tog_standard={this.toggle}
                    confirmText='Devenir un client'
                    confirmText2='Suivant'
                    handleSubmit={this.onSubmit}
                    // next={this.next}
                    onchange={this.onChange}
                    nbemployees={nbemployees}
                    erreurCondtion={this.state.erreurCondtion}
                    usecase={usecase}
                    currentUser={currentUser}
                    userText={userLabel}
                    loading={loading}
                    onChangePhone={this.onChangePhone}
                    messagePhoneRequired={this.state.messagePhoneRequired}
                    phoneRequired={this.state.phoneRequired}
                    error={this.state.error}
                    field={this.state.field}
                    ErrorForm1={this.state.ErrorForm1}
                    handleChange={this.handleChange}
                    checkedCGU={this.state.cgu}
                    checkedPDC={this.state.privacyPolicy}
                    handleConditions={this.handleConditions}
                    handlePolitique={this.handlePolitique}
                    handleLegal={this.handleLegal}
                    errorEmail={this.state.errorEmail}
                    isValidPhoneNumber={this.state.isValidPhoneNumber}
                />
            </Modals>
        )
    }


    /**
     * Handles the scroll event.
     *
     * @param {string} name - The name of the section being scrolled to.
    */
    handleScroll(name) {
        this.props.setScrolledSection(name);
    }


    /**
     * Renders the PayAsYouGoModel component.
     *
     * @return {JSX.Element} The PayAsYouGoModel component.
     */
    renderPayAsYouGoModel() {
        return (
            <PayAsYouGoModal visible={this.state.visiblePayAsYouGo} toggleVisible={this.toggleVisiblePayAsYouGo} />
        )
    }

    renderModalInscription = () => {
        return (
            <ConfimInscription handleInscription={this.handleInscription} visibleInscription={this.state.visibleInscription} />
        )
    }


    renderModalCondition = () => {
        return (
            <ModelConditions handleConditions={this.handleConditions} visibleCondition={this.state.visibleCondition} />
        )
    }


    renderModalPolitique = () => {
        return (
            <ModelPolitique handlePolitique={this.handlePolitique} visiblePolitique={this.state.visiblePolitique} />
        )
    }

    renderModalLegal = () => {
        return (
            <ModelLegal handleLegal={this.handleLegal} visibleLegal={this.state.visibleLegal} />
        )
    }


    handleChange = (e) => {
        if (e.target.name === 'privacyPolicy') {
            this.setState({ privacyPolicy: !this.state.privacyPolicy })
        }
        if (e.target.name === 'cgu') {
            this.setState({ cgu: !this.state.cgu })
        }
        this.setState({ ...this.state, [e.target.name]: e.target.checked })
    }

    onchangeFile = (e) => {
        this.setState({ fileError: "" })
        //accepte les format jpeg, png, pdf,jpg
        if ((e.target.files[0] && e.target.files[0].type === 'image/jpeg') || (e.target.files[0].type === 'image/png' )|| (e.target.files[0].type === 'application/pdf') || (e.target.files[0].type === 'image/jpg')) {
            this.setState({ currentTester: { ...this.state.currentTester, [e.target.name]: e.target.files[0] } })
            if (e.target.name === 'carteIndentiteRecto') {
                this.setState({ doneRecto: "valide" })
                this.setState({ fileErrorRecto: "" })
            }
            if (e.target.name === 'carteIndentiteVerso') {
                this.setState({ doneVerso: "valide" })
                this.setState({ fileErrorVerso: "" })
            }
        } else {
            if (e.target.name === 'carteIndentiteRecto') {
                this.setState({ doneRecto: "failed" })
                this.setState({ fileErrorRecto: "Format non valide" })
            }
            if (e.target.name === 'carteIndentiteVerso') {
                this.setState({ doneVerso: "failed" })
                this.setState({ fileErrorVerso: "Format non valide" })
            }
        }
    }


    /**
     * Submit the tester's information to the server.
     *
     * @return {undefined} No return value
     */
    async onSubmitTester() {
        const { name, lastname, gender, country, carteIndentiteRecto,
            csp, studyLevel, maritalStatus, ville, carteIndentiteVerso,
            socialMedia, email, dateOfBirth, phone, adressePostal, codePostal
        } = this.state.currentTester;
        const { cgu, privacyPolicy, field2 } = this.state;
        
        const formDataTester = new FormData();
        formDataTester.append('name', name);
        formDataTester.append('lastname', lastname);
        formDataTester.append('gender', gender);
        formDataTester.append('country', country);
        formDataTester.append('ville', ville);
        formDataTester.append('csp', csp);
        formDataTester.append('studyLevel', studyLevel);
        formDataTester.append('maritalStatus', maritalStatus);
        formDataTester.append('adressePostal', adressePostal);
        formDataTester.append('codePostal', codePostal);
        formDataTester.append('socialMedia', socialMedia);
        formDataTester.append('email', email);
        formDataTester.append('dateOfBirth', dateOfBirth);
        formDataTester.append('phone', phone);
        formDataTester.append('cgu', cgu);
        formDataTester.append('privacyPolicy', privacyPolicy);
        formDataTester.append('identityCardFront', carteIndentiteRecto);
        formDataTester.append('identityCardBack', carteIndentiteVerso);

        if (!field2) {
            const emailRes = await this.handleVerifEmail(email);
            if (emailRes) {
                this.setState({ field2: !field2 })
            }
        } else {
            if (carteIndentiteRecto === '' || carteIndentiteVerso === '') {
                this.setState({ fileError: "Veuillez télécharger les deux fichiers" })
                setTimeout(() => {
                    this.setState({ fileError: "" })
                }, 3000);
            } else {
                if (cgu === false || privacyPolicy === false) {
                    this.setState({ erreurCondtion: "Veuillez accepter les conditions d'utilisation et la politique de confidentialité" })
                } else {
                    this.setState({ loading: true })
                    this.props.onSaveTester(formDataTester)
                    setTimeout(() => {
                        this.setState({
                            loading: false,
                            currentTester: {
                                name: "",
                                lastname: "",
                                gender: "",
                                country: "",
                                csp: "",
                                studyLevel: "",
                                os: "",
                                maritalStatus: "",
                                socialMedia: "",
                                email: "",
                                phone: "",
                                dateOfBirth: "",
                                adressePostal: "",
                                codePostal: "",
                                ville: "",
                                carteIndentiteRecto: "",
                                carteIndentiteVerso: "",
                            },
                            cgu: false,
                            privacyPolicy: false,
                            fileError: "",
                        })
                    }, 2000);
                    setTimeout(() => {
                        this.setState({ loading: false })
                        this.setState({ field2: !this.state.field2 })
                        this.state.error === undefined && this.toggle2()
                        if (!this.props.user.errorTest) {
                            this.setState({ visibleInscription: !this.state.visibleInscription })
                        } else {
                            toast.error("Erreur lors de l'enregistrement");
                            this.toggle2()
                        }
                    }, 2000);
                }
            }
        }
    }


    /**
     * Renders the modal signup tester.
     *
     * @return {React.Component} The rendered modal signup tester.
     */
    renderModalSignupTester() {
        const { currentTester, testerText, loading } = this.state
        const genders = ["Femme", "Homme"]
        const csp = ["Agriculteurs exploitants", "Artisans", " commerçants et chefs d’entreprise", "Cadres et professions intellectuelles supérieures", "Employés", "Ouvriers", "Autres"]
        const study = ["Aucun diplôme", "Brevet des collèges, CAP, BEP ou autre", "Bac, Brevet professionnel", "Bac +2", "Bac +3 ou 4", "Bac +5"]
        const martial = ["Célibataire", "Marié(e)", "Divorcé(e)", "Veuf(ve)", "Séparé(e)", "Pacsé(e)"]
        const media = ["Facebook", "Instagram", "WhatsApp", "TikTok", "Twich", "Youtube", "Autre"]
        return (
            <Modals
                show={this.state.show2}
                toggleShow={this.toggle2}
                header='Devenir testeur'
            >
                <TesterRegisterForm
                    field={this.state.field2}
                    tog_standard={this.toggle2}
                    handleSubmit={this.onSubmitTester}
                    onchange={this.onChangeTester}
                    currentTester={currentTester}
                    testerText={testerText}
                    erreurCondtion={this.state.erreurCondtion}
                    loading={loading}
                    onChangePhone={this.onChangePhone2}
                    error={this.state.error}
                    csp={csp}
                    genders={genders}
                    checkedCGU={this.state.cgu}
                    checkedPDC={this.state.privacyPolicy}
                    handleConditions={this.handleConditions}
                    handlePolitique={this.handlePolitique}
                    media={media}
                    handleChange={this.handleChange}
                    onchangeFile={this.onchangeFile}
                    martial={martial}
                    study={study}
                    pays={pays}
                    fileError={this.state.fileError}
                    doneRecto={this.state.doneRecto}
                    doneVerso={this.state.doneVerso}
                    fileErrorRecto={this.state.fileErrorRecto}
                    fileErrorVerso={this.state.fileErrorVerso}
                />
            </Modals>
        )
    }



    handleChange2 = (selectedOption) => {
        this.setState({ selectedOption });
    };

    /**
     * Renders the component.
     *
     * @return {JSX.Element} The rendered component.
     */
    render() {
        const { count, lngActive } = this.state;
        const signupText = lng[lngActive].trial
        const siguptester = lng[lngActive].tester
        const authRoute = authRoutes()
        const initialRoute = Routes(lngActive)
        return (
            <>
                {this.renderModalSignup()}
                {this.renderModalSignupTester()}
                {this.renderModalCondition()}
                {this.renderModalPolitique()}
                {this.renderModalInscription()}
                {this.renderModalLegal()}
                {this.renderPayAsYouGoModel()}
                {/* /*rendre la navbar responsive */}


                <Navbar light expand="lg" fixed="top" className='navbar__color'>
                    <NavbarBrand href="/">
                        <div className="logo_container">
                            <img src={Logo} alt="2M-advisory" className='logo' />
                        </div>
                    </NavbarBrand>

                    <NavbarToggler onClick={this.toggleIsOpen} />



                    <Collapse isOpen={this.state.isOpen} navbar>
                        {this.props.auth.isAuthenticated ?
                            <Nav className="mr-auto" navbar>
                                {
                                    authRoute.map((route, key) => {
                                        return (
                                            <div id="content__item__navbar" key={key}>
                                                <Link onClick={() => this.setState({ count: key })} to={route.path}>
                                                    <div className={`item__nav__bar${(count === key) ? '__selected' : ''}`}>
                                                        {
                                                            route.Name === "Blog" &&
                                                            <div className="item_blog">
                                                                {
                                                                    route.Name === ("Se Connecter" || "login") ?
                                                                        <div className="item__header_connecter">
                                                                            {route.Name}
                                                                        </div>
                                                                        :
                                                                        <div className="item__header">
                                                                            {route.Name}
                                                                        </div>
                                                                }
                                                            </div>
                                                        }
                                                    </div>
                                                </Link>
                                            </div>
                                        )
                                    })
                                }
                            </Nav>
                            :
                            <Nav className='nav__bar' navbar>
                                {
                                    initialRoute.map((route, key) => {
                                        return (
                                            <div id="content__item__navbar" key={key} onClick={() => this.handleScroll(route.Name)}>
                                                <Link onClick={() => this.setState({ count: key })} to={route.path}>
                                                    <div className={`item__nav__bar${(count === key) ? '__selected' : ''}`}>
                                                        {
                                                            route.Name === "Blog" ?
                                                                <div className="item_blog">
                                                                    {
                                                                        route.Name === ("Se Connecter" || "Login") ?
                                                                            <div className="item__header_connecter">
                                                                                {route.Name}
                                                                            </div>
                                                                            :
                                                                            <div className="item__header">
                                                                                {route.Name}
                                                                            </div>
                                                                    }
                                                                </div>
                                                                :
                                                                <div className="item__header">
                                                                    {
                                                                        route.Name === lng[lngActive].login ?
                                                                            <div className="item__header_connecter">
                                                                                {route.Name}
                                                                            </div>
                                                                            :
                                                                            <div className="item__header">
                                                                                {route.Name}
                                                                            </div>
                                                                    }
                                                                </div>
                                                        }
                                                    </div>
                                                </Link>
                                            </div>
                                        )
                                    })
                                }
                                <div className='buttons_section'>
                                    <Button
                                        className="btn__sign"
                                        onClick={() => {
                                            this.toggle();
                                        }}
                                    >
                                        {signupText}
                                    </Button>
                                    <Button
                                        className="btn__sign2"
                                        onClick={() => {
                                            this.toggle2();
                                        }}
                                    >
                                        {siguptester}
                                    </Button>
                                </div>
                                <div id="content__item__navbar" >
                                    <div className="item__nav__bar_lang">
                                        <div className="item__header_lang">
                                            <Lang />
                                        </div>
                                    </div>
                                </div>
                            </Nav>
                        }
                        {this.props.auth.isAuthenticated &&
                            <Nav className="ml-auto" navbar>
                                <UncontrolledDropdown direction="left" nav inNavbar>
                                    <DropdownToggle nav caret>
                                        <img style={{ width: '45px' }} src={ProfileIcon} alt="" />
                                    </DropdownToggle>
                                    <DropdownMenu >
                                        <DropdownItem divider />
                                        <DropdownItem
                                            href="/"
                                            id="content__item__navbar"
                                            onClick={() => {
                                                authServices.logout();
                                            }}
                                        >
                                            <div className="log__out">
                                                <i className="fa fa-sign-out fa-lg" aria-hidden="true" />
                                                Logout
                                            </div>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        }
                    </Collapse>
                </Navbar>
            </>
        );
    }
}

Navbar.propTypes = {
    user: PropTypes.object,
    setScrolledSection: PropTypes.func,
    onSaveClient: PropTypes.func,
    onSaveTester: PropTypes.func
};

const mapStateToProps = state => ({ 
    user: state.user, 
    auth: state.auth,
});


export default connect(mapStateToProps, { setScrolledSection, onSaveClient, onSaveTester })(NavBar);
