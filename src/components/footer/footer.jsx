//REACT IMPORT
import React, { useState } from 'react';
//STYLES IMPORT
import "./footer.css";
//ASSET IMPORT
import PlayStore from '../../assets/store.svg';
import France from '../../assets/france_flag.svg';
import England from '../../assets/england_flag.svg';
//LIBRARY IMPORT
import { toast } from 'react-toastify';
import { Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
//COMPONENT IMPORT
import ModelConditions from '../navbar/ModalConditions';
import ModelPolitique from '../navbar/ModalPolitique';
import ModelLegal from '../navbar/ModalLegal';
import { onSaveClient, onSaveTester } from "../../actions/userActions"
import Modals from '../common/modals/modal'
import ClientRegisterForm from '../register/client/register'
import ConfimInscription from '../navbar/ConfimInscription';
import TesterRegisterForm from '../register/tester/registerForm';
import { pays } from '../../utils/pays'
import  userServices from '../../services/userServices';


const testerText = {
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
}

const Footer = () => {
    //HOOKS
    const errorClient = useSelector(state => state.user.errorClient)
    const errorTest = useSelector(state => state.user.errorTester)
    const [visibleConditions, setVisibleConditions] = useState(false);
    const [visiblePolitique, setVisiblePolitique] = useState(false);
    const [visibleLegal, setVisibleLegal] = useState(false);
    const [showToggle1, setShowToggle1] = useState(false);
    const [visibleInscription, setVisibleInscription] = useState(false);
    const [erreurCondtion, setErreurCondtion] = useState("")
    const [currentUser, setCurrentUser] = useState({
        name: "",
        lastname: "",
        useCase: "",
        sector: "",
        profession: "",
        email: "",
        phone: "",
        nbEmployees: "",
        company: ""
    })
    const [currentTester, setCurrentTester] = useState({
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
    })

    const [field, setField] = useState(false)
    const [field2, setField2] = useState(false)
    const [show2, setShow2] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({})
    const [fileError, setFileError] = useState('')
    const [state, setState] = useState({
        privacyPolicy: false,
        cgu: false,
    });
    const[errorEmail, setErrorEmail] = useState("")
    const dispatch = useDispatch();

    //FUNCTIONS
    const handleConditions = () => {
        setVisibleConditions(!visibleConditions);
    };

    const handlePolitique = () => {
        setVisiblePolitique(!visiblePolitique);
    };

    const handleLegal = () => {
        setVisibleLegal(!visibleLegal);
    };


    /*************************************************** devenir Client **************************************************************************/

    /**
     * Togle visible modal : open or close modal client
    */
    const toggle = () => {
        setShowToggle1(!showToggle1)
        if (field) {
            setField(!field)
        }
        setTimeout(() => {
            setCurrentUser({
                ...currentUser,
                name: "",
                lastname: "",
                useCase: "",
                sector: "",
                profession: "",
                email: "",
                phone: "",
                nbEmployees: "",
                company: ""
            })
            setState({
                privacyPolicy: false,
                cgu: false,
            })
        }, 500);
    };


    const handleVerifEmail = async (email) => {
        let mailData = {
            email: email 
        }
        setLoading(true)
        try {
            const response = await userServices.checkMailModeHorsLigne(mailData);           
            if (response.header.code !== 200) {
                setErrorEmail(response.header.message)
                setTimeout(() => {
                    setErrorEmail("")
                },2000)
            }
        } catch (error) {
            this.setState({ errorEmail: "Une erreur est survenue" })
            console.log("err", error);
        }
        setLoading(false)
        return true;
    }

    /**
     * add user to database
     */
    const onSubmit = async () => {
        const { name, lastname, useCase, nbEmployees,
            sector, profession, email, phone, company, Commentaire
        } = currentUser;
        const { cgu, privacyPolicy } = state;

        const client = {
            name, lastname, useCase, nbEmployees,
            sector, profession, email, phone, company, cgu, privacyPolicy, Commentaire
        }
        if (!field) {
            const emailRes = await handleVerifEmail(email);
            if (emailRes) {
                setField(!field)
            }
        }else {
            if (cgu === false || privacyPolicy === false) {
                setErreurCondtion("Veuillez accepter les conditions d'utilisation et la politique de confidentialité")
            } else {
                setLoading(true)
                dispatch(onSaveClient(client))
                setTimeout(() => {
                    setLoading(false)
                    setField(!field)
                    if (error.cgu === undefined || error.privacyPolicy === undefined || error.email === undefined || error.name === undefined || error.lastname === undefined || error.useCase === undefined || error.phone === undefined || error.company === undefined) {
                        toggle()
                    } else {
                        toast.error("Champs obligatoires non remplis ou incorrects");
                    }
                    if (!errorClient) {
                        toggle()
                        setVisibleInscription(!visibleInscription)
                    } else
                        toast.error("Email déjà utilisé");
                }, 2000);
            }
        }
    }


    /**
     * 
     * @param {*} e 
     * @returns user input	
     * @description set user input in state
     * @description set error in state
    */
    const onChange = e => {
        e.preventDefault();
        setCurrentUser({ ...currentUser, [e.target.name]: e.target.value })
        setError({ ...error, [e.target.name]: undefined })
    };


    /**
     * 
     * @param {*} e
     * @returns user input
     * @description set user input in state
     * Check if user has checked the privacy policy and cgu 
    */
    const handleChange = (e) => {
        const { name, checked } = e.target;
        if (e.target.name === 'privacyPolicy' || e.target.name === 'cgu') {
            setState((prevState) => ({ ...prevState, [name]: checked }));
            setError({ ...error, [e.target.name]: undefined })
        }
    };


    /**
     * 
     * @param {*} value
     * @returns user input
     * @description set user input in state 
     * 
    */
    const onChangePhone = value => {
        setCurrentUser((prevState) => ({ ...prevState, phone: value }))
        setError({ ...error, phone: undefined })
    };


    const renderModalSignup = () => {
        const userLabel = {
            name: "Prénom",
            lastname: "Nom",
            email: "Email",
            useCase: "Cas d'utilisation",
            sector: "Secteur",
            profession: "Fonction",
            phone: "Téléphone",
            nbEmployees: "Nombre d'employés",
            company: "Société",
        }

        const usecase = ["Entreprise: Projet Ponctuel", "Entreprise: Plusieurs projets à tester", "Agence ou cabinet de conseil"]
        const nbemployees = ["1-10", "11-50", "51-250", "+250"]

        return (
            <Modals
                show={showToggle1}
                toggleShow={toggle}
                header='Devenir un client'
            >
                <ClientRegisterForm
                    tog_standard={toggle}
                    confirmText='Devenir un client'
                    confirmText2='Suivant'
                    handleSubmit={onSubmit}
                    onchange={onChange}
                    nbemployees={nbemployees}
                    erreurCondtion={erreurCondtion}
                    usecase={usecase}
                    currentUser={currentUser}
                    userText={userLabel}
                    loading={loading}
                    onChangePhone={onChangePhone}
                    error={error}
                    field={field}
                    handleChange={handleChange}
                    checkedCGU={state.cgu}
                    checkedPDC={state.privacyPolicy}
                    handleConditions={handleConditions}
                    handlePolitique={handlePolitique}
                    handleLegal={handleLegal}
                    errorEmail={errorEmail}
                />
            </Modals>
        )
    }



    const renderModalCondition = () => {
        return (
            <ModelConditions handleConditions={handleConditions} visibleCondition={visibleConditions} />
        )
    }


    const renderModalPolitique = () => {
        return (
            <ModelPolitique handlePolitique={handlePolitique} visiblePolitique={visiblePolitique} />
        )
    }

    const renderModalLegal = () => {
        return (
            <ModelLegal handleLegal={handleLegal} visibleLegal={visibleLegal} />
        )
    }

    const handleInscription = () => {
        setVisibleInscription(!visibleInscription)
    };

    const renderModalInscription = () => {
        return (
            <ConfimInscription visibleInscription={visibleInscription} handleInscription={handleInscription} />
        )
    }



    /************************************pop up devenir testeur *****************************************************************/

    /**
     * Togle visible modal : open or close modal tester
    */
    const toggle2 = () => {
        setShow2(!show2)
        if (field2) {
            setField2(!field2)
        }
        setTimeout(() => {
            setCurrentTester({
                ...currentTester,
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
            })
            setState({
                privacyPolicy: false,
                cgu: false,
            })
        }, 500);
    }

    const onSubmitTester = async () => {
        console.log("FOOTER");
        
        const { name, lastname, gender, country, carteIndentiteRecto,
            csp, studyLevel, os, maritalStatus, ville, carteIndentiteVerso,
            socialMedia, email, dateOfBirth, phone, adressePostal, codePostal
        } = currentTester;
        const { cgu, privacyPolicy, field2 } = state;

        const formDataTester = new FormData();
        formDataTester.append('name', name);
        formDataTester.append('lastname', lastname);
        formDataTester.append('gender', gender);
        formDataTester.append('country', country);
        formDataTester.append('ville', ville);
        formDataTester.append('csp', csp);
        formDataTester.append('studyLevel', studyLevel);
        formDataTester.append('os', os);
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
            const emailRes = await handleVerifEmail(email);            
            if (emailRes) {
                setField2(!field2)
            }
        }  else {
            if (carteIndentiteRecto === '' || carteIndentiteVerso === '') {
                setFileError("Veuillez télécharger les deux fichiers")
                setTimeout(() => {
                    setFileError("")
                }, 3000);
            } else {
                if (cgu === false || privacyPolicy === false) {
                    setErreurCondtion("Veuillez accepter les conditions d'utilisation")
                } else {
                    setLoading(true)
                    dispatch(onSaveTester(formDataTester))
                    setTimeout(() => {
                        setLoading(false)
                        setState({
                            privacyPolicy: false,
                            cgu: false,
                        })
                        setCurrentTester({
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
                        })
                        setFileError("")
                    }, 2000);
                    setTimeout(() => {
                        setLoading(false)
                        setField2(!field2)
                        error === undefined && this.toggle2()
                        if (!errorTest) {
                            toggle2()
                            setVisibleInscription(!visibleInscription)
                        } else {
                            toast.error("Email déjà utilisé");
                        }
                    }, 2000);
                }
            }
        }
    }

    const onChangeTester = e => {
        e.preventDefault();
        setCurrentTester({ ...currentTester, [e.target.name]: e.target.value })
        setError({ ...error, [e.target.name]: undefined })
    };

    const onChangePhone2 = value => {
        setCurrentTester({ ...currentTester, phone: value })
        setError({ ...error, phone: undefined })
    };

    const onchangeFile = (e) => {
        setCurrentTester({ ...currentTester, [e.target.name]: e.target.files[0] })
        setError({ ...error, [e.target.name]: undefined })
    };

    const renderModalSignupTester = () => {
        const genders = ["Femme", "Homme"]
        const csp = ["Agriculteurs exploitants", "Artisans", " commerçants et chefs d’entreprise", "Cadres et professions intellectuelles supérieures", "Employés", "Ouvriers"]
        const study = ["Aucun diplôme", "Brevet des collèges, CAP, BEP ou autre", "Bac, Brevet professionnel", "Bac +2", "Bac +3 ou 4", "Bac +5"]
        const martial = ["Célibataire", "Marié(e)", "Divorcé(e)", "Veuf(ve)", "Séparé(e)", "Pacsé(e)"]
        const os = ["IOS", "Android", "Windows", "Autre"]
        const media = ["Facebook", "Instagram", "WhatsApp", "Autre"]
        return (
            <Modals
                // modalSize="modal-lg"
                show={show2}
                toggleShow={toggle2}
                header='Devenir testeur'
            >
                <TesterRegisterForm
                    field={field2}
                    tog_standard={toggle2}
                    confirmText='Devenir testeur'
                    handleSubmit={onSubmitTester}
                    onchange={onChangeTester}
                    currentTester={currentTester}
                    testerText={testerText}
                    erreurCondtion={erreurCondtion}
                    loading={loading}
                    onChangePhone={onChangePhone2}
                    error={error}
                    csp={csp}
                    genders={genders}
                    os={os}
                    checkedCGU={state.cgu}
                    checkedPDC={state.privacyPolicy}
                    handleConditions={handleConditions}
                    handlePolitique={handlePolitique}
                    media={media}
                    handleChange={handleChange}
                    onchangeFile={onchangeFile}
                    martial={martial}
                    study={study}
                    pays={pays}
                    fileError={fileError}
                />

            </Modals>
        )
    }


    //RENDER
    return (
        <>
            <div className='footer_container'>
                {renderModalCondition()}
                {renderModalPolitique()}
                {renderModalLegal()}
                {renderModalSignup()}
                {renderModalInscription()}
                {renderModalSignupTester()}
                <div className='footer_content'>
                    <div className='footer_block'>
                        <div className='col_content_footer'>
                            <span className='footer_title'>Découvrir</span>
                            <span className='body__span'>Qui sommes-nous ?</span>
                            <span className='body__span'>Moteur IA</span>
                            <span className='body__span'>Partenaires</span>
                            <span className='body__span'>Références Client</span>
                            <span className='body__span'>Tarif</span>
                        </div>
                    </div>
                    <div className=''>
                        <div className='col_content_footerr'>
                            <span className='footer_title'>Se Connecter</span>
                            <Link className='body__span' to="/login">Espace Client</Link>
                            <Link className='body__span' to="/login">Espace Testeur</Link>
                        </div>
                    </div>
                    <div>
                        <div className='col_content_footer1'>
                            <Button className='btn_footer2' onClick={toggle}>Devenir un client</Button>
                            <Button className='btn_footer' onClick={toggle2}>Devenir Testeur</Button>
                        </div>
                    </div>
                </div>
                <hr className="line3" />
                <div className='bottom_line'>
                    <Col md='2'>
                        <span className='footer_font'>Copyright © 2021 Tout droits réservés</span>
                    </Col>
                    <Col md='8'>
                        <span className='footer_font'>
                            <span className='body__line' onClick={handleLegal}> Mentions Légales </span> -
                            <span className='body__line' onClick={handleConditions}> CGD </span> -
                            <span className='body__line' onClick={handlePolitique}> Politique de Confidentialité </span> -
                            <span className='body__line'> Gestion des Cookies </span> -
                            <span className='body__line'> Protection des données </span> <br />
                            UX DATAHUB - 10 rue Jean Macé 75011 Paris - contact@insightdata.fr
                        </span>
                    </Col>
                    <div className='footer_left'>
                        <img className='mr-1' src={PlayStore} alt="insightData lock" />
                        <div className='footer_flags'>
                            <img src={France} alt="insightData lock" />
                            <img src={England} alt="insightData lock" />
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}


export default Footer;