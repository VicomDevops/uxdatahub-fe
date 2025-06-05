/* eslint-disable react-hooks/exhaustive-deps */
//REACT IMPORTS
import React, { useState, useEffect, useRef } from "react";
//REDUX IMPORTS
import { connect, useSelector, useDispatch } from "react-redux";
import { onSaveClient, onSaveTester } from "../../actions/userActions"
//IMAGES IMPORTS
import Equation from "../../assets/Insight_data_equation.svg";
import Client from "../../assets/Insight_data_tableau_récap_02.svg";
import Diff from "../../assets/Insight_data_tableau_récap_03.svg";
import Innovation from "../../assets/Insight_data_tableau_récap_35.svg";
import Scenario from "../../assets/Insight_data_tableau_récap_13.svg";
import Audiance from "../../assets/Insight_data_tableau_récap_14.svg";
import Analyse from "../../assets/Insight_data_tableau_récap_15.svg";
import Produit from "../../assets/Insight_data_tableau_récap_16.svg";
import Peter from "../../assets/peter.jpg";
import Landing from "../../assets/landing.png"
import Management from "../../assets/management.svg";
import Equipes from "../../assets/equipes.svg";
import Designers from "../../assets/designers.svg";
import Expert from "../../assets/expert.svg";
import Tick from "../../assets/tick.svg";
import video from "../../assets/presentation.mp4";
//COMPONENT IMPORT
import Modal from "./Modal";
import PayAsYouGoModal from "../navbar/PayAsYouGoModal";
import Modals from '../common/modals/modal'
import ClientRegisterForm from '../register/client/register'
import AbonnementModal from "../navbar/AbonnementModal";
import ContactModal from "./ContactModal";
import ModelConditions from '../navbar/ModalConditions';
import ModelPolitique from '../navbar/ModalPolitique';
import ModelLegal from "../navbar/ModalLegal";
import TesterRegisterForm from '../register/tester/registerForm';
import { pays } from '../../utils/pays'
import ConfimInscription from '../navbar/ConfimInscription';
import { useLocation } from 'react-router';
//STYLE IMPORT
import "./homePage.css";
//LIBRARY IMPORT
import { Col, Row, Button } from "reactstrap";
import { toast } from 'react-toastify';
import { Player } from "video-react";
import CookieConsent from "react-cookie-consent";


const HomePageForm = () => {
  //HOOKS
  const errorClient = useSelector(state => state.user.errorClient)
  const errorTest = useSelector(state => state.user.errorTester)
  let sectionScroll = useSelector(state => state.navigation.scrolledSection)

  const [cookie, setCookie] = useState(false);
  const [showToggle1, setShowToggle1] = useState(false)
  const [showToggle2, setShowToggle2] = useState(false)
  const [erreurCondtion, setErreurCondtion] = useState("")
  const sectionRefs = {
    Plateforme: useRef(null),
    Solution: useRef(null),
    Tarif: useRef(null),
    Blog: useRef(null),
  };
  const dispatch = useDispatch()
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
  });
  const [visibleAbonnement, setVisibleAbonnement] = useState(false);
  const [loading, setLoading] = useState(false)
  const [field, setField] = useState(false)
  const [field2, setField2] = useState(false)
  const [visible, setVisible] = useState(false);
  const [visiblePay, setVisiblePay] = useState(false);
  const [visibleModalContact, setVisibleModalContact] = useState(false);
  const [error, setError] = useState(undefined)
  const [visibleInscription, setVisibleInscription] = useState(false);
  const [fileError, setFileError] = useState(false)
  const [state, setState] = useState({
    privacyPolicy: false,
    cgu: false,
  });


  //VARIABLES
  const btn2Text = "Planifier une demo";
  let testText ={
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



  /* ----------------------------- RENDER HELPERS ----------------------------- */

  function toggleVisible() {
    setVisible((prevState)=> !prevState);
  }

  /**
   *  Toggle visible modal : open or close pay as you go modal
   * @param {string} modalName
   * @param {boolean} visible
   * @param {number} scroll
  */
  function toggleVisiblePay() {
    setVisiblePay((prevState)=> !prevState);
  }


  /**
   * Toggle visible modal : open or close abonnement modal
   * @param {string} modalName
   * @param {boolean} visible
   * @param {number} scroll
   */
  function toggleVisibleAbonnement() {
    setVisibleAbonnement((prevState)=> !prevState);
  }

  /**
   * Toggle visible modal : open or close contact modal
   * @param {string} modalName
   * @param {boolean} visible
   * @param {number} scroll
   */
  function toggleVisibleModalContact() {
    setVisibleModalContact((prevState)=> !prevState);
  }


  /**
   * Cookie consent and scroll to section
   */
  useEffect(() => {
    setCookie(localStorage.getItem("cookie") === "true");
    if (sectionScroll && sectionRefs[sectionScroll]) {
      const scrollTarget = sectionScroll === 'Platform' ? 'Plateforme' : sectionScroll === 'Pricing' ? 'Tarif' : sectionScroll;
      sectionRefs[scrollTarget]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [ sectionScroll, cookie, sectionRefs]);

  /* ---------------------------- EVENT HANDLERS ---------------------------- */

  /**
   * Togle visible modal : open or close modal marche
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



  /**
   * add user to database
  */
  const onSubmit = () => {
    const { name, lastname, useCase, nbEmployees,
      sector, profession, email, phone, company, Commentaire
    } = currentUser;
    const { cgu, privacyPolicy } = state;

    const client = {
      name, lastname, useCase, nbEmployees,
      sector, profession, email, phone, company, cgu, privacyPolicy, Commentaire
    }
    if (!field) {
      setField(!field)
    }
    else {
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

  /**
   * Renders the modal signup component.
   *
   * @return {JSX.Element} The modal signup component.
  */
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
        />
      </Modals>
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

  /**
   * Toggles the value of `showToggle2` and performs some additional actions
   * after a delay of 500 milliseconds.
   *
  */
  const toggle2 = () => {
    setShowToggle2(!showToggle2)

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
        ...state,
        privacyPolicy: false,
        cgu: false,
      })
    }, 500);
  }



  const onChangeTester = e => {
    e.preventDefault();
    setCurrentTester({ ...currentTester, [e.target.name]: e.target.value })
  };


  const onChangePhone2 = value => {
    setCurrentTester({ ...currentTester, phone: value })
  };


  /**
   * Submits the tester form data to the server.
   *
  */
  const onSubmitTester = () => {
    console.log('TESSSSSSSSSSSSSSSTERRR');
    
    const { name, lastname, gender, country, carteIndentiteRecto,
      csp, studyLevel, os, maritalStatus, ville, carteIndentiteVerso,
      socialMedia, email, dateOfBirth, phone, adressePostal, codePostal
    } = currentTester;
    const { cgu, privacyPolicy } = state;

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

    if (name && email && lastname && dateOfBirth && phone && gender && maritalStatus && country
      && csp && studyLevel && os && socialMedia && !ville && !adressePostal && !codePostal && !carteIndentiteRecto && !carteIndentiteVerso) {
      setField2(!field2)
    } else {
      if (carteIndentiteRecto === '' || carteIndentiteVerso === '') {
        setFileError("Veuillez ajouter une photo de votre carte d'identité")
        setTimeout(() => {
          setFileError("")
        }, 3000);
      } else {
        setLoading(true)
        onSaveTester(formDataTester)
        setTimeout(() => {
          setLoading(false)
          setCurrentTester({
            ...currentTester,
            name: "",
            lastname: "",
            adressePostal: "",
            codePostal: "",
            ville: "",
            carteIndentiteRecto: "",
            carteIndentiteVerso: "",
            country: "",
            csp: "",
            studyLevel: "",
            os: "",
            maritalStatus: "",
            socialMedia: "",
            email: "",
            dateOfBirth: "",
            phone: "",
            gender: "",
          })
          setState({
            ...state,
            privacyPolicy: false,
            cgu: false,
          })
          setFileError("")
        }, 2000);
        setTimeout(() => {
          setLoading(false)
          setField2(!field2)
          error === undefined && toggle2()
          !errorTest ? setVisibleInscription(!visibleInscription) : toggle2()
        }, 2000);
      }
    }
  }



  /**
   * Updates the current tester object with a new file.
   *
   * @param {Event} e - The event object containing information about the file.
   * @return {void} This function does not return a value.
  */
  const onChangeFile = (e) => {
    setCurrentTester({ ...currentTester, [e.target.name]: e.target.files[0] })
  }


  /**
   * Renders the modal signup tester.
   *
   * @return {jsx} The rendered modal component.
  */
  const renderModalSignupTester = () => {
    const genders = ["Femme", "Homme"]
    const csp = ["Agriculteurs exploitants", "Artisans", " commerçants et chefs d’entreprise", "Cadres et professions intellectuelles supérieures", "Employés", "Ouvriers"]
    const study = ["Aucun diplôme", "Brevet des collèges, CAP, BEP ou autre", "Bac, Brevet professionnel", "Bac +2", "Bac +3 ou 4", "Bac +5"]
    const martial = ["Célibataire", "Marié(e)", "Divorcé(e)", "Veuf(ve)", "Séparé(e)", "Pacsé(e)"]
    const os = ["IOS", "Android", "Windows", "Autre"]
    const media = ["Facebook", "Instagram", "WhatsApp", "Autre"]
    return (
      <Modals
        show={showToggle2}
        toggleShow={toggle2}
        header='Devenir testeur'
      >
        <TesterRegisterForm
          field={field2}
          tog_standard={toggle2}
          handleSubmit={onSubmitTester}
          onchange={onChangeTester}
          currentTester={currentTester}
          testerText={testText}
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
          onchangeFile={onChangeFile}
          martial={martial}
          study={study}
          pays={pays}
          fileError={fileError}
        />
      </Modals>
    )
  }



  /**
   * Handles the conditions by toggling the visibility of the condition.
   *
   */
  const handleConditions = () => {
    setState({ visibleCondition: !state.visibleCondition })
  };

  /**
   * Toggles the visibility of the politique.
   *
  */
  const handlePolitique = () => {
    setState({ visiblePolitique: !state.visiblePolitique })
  };

  /**
   * Toggles the visibility of the legal section.
   *
  */
  const handleLegal = () => {
    setState({ visibleLegal: !state.visibleLegal })
  };

  const location = useLocation();
  const alertMessage = location.state?.alertMessage;

  return (
    <div className="home__ctn" ref={sectionRefs.Plateforme} id="Plateforme">
      <div className="container_home" >
      { alertMessage && (
                <div className={`alert alert-${alertMessage.includes('error') ? 'danger' : 'success'}`} role="alert">
                  {alertMessage}
                </div>
          )}
        <div className="home_hero">
          <Col md="4">
            <Row className="title__1_section mt-5">
              <span className="title__1">
                Vos clients vous <br />
                parlent, nous vous <br />
                aidons à les <br />
                comprendre.{" "}
              </span>
            </Row>
            <Row className="title__2_section mt-3">
              <span className="title__2">
                Insight Data « Just Get In Touch », <br />
                la plateforme d'optimisation de  <br />
                l'expérience utilisateur
              </span>
            </Row>
          </Col>
          <Col md="8">
            <Player playsInline fluid={true} src={video} className="img_video" poster={Landing} />
          </Col>
        </div>
        <a href="http://51.68.231.155:4000/home">
          <img
            style={{ maxHeight: "35vh", maxWidth: "100%" }}
            src={Equation}
            alt="2M-Advisory"
          />
        </a>
      </div>

      <div className="container_home2">
        <Row>
          <span className="title__1 ">
            Insight Data : une plateforme pour faire quoi ?{" "}
          </span>
        </Row>
        <Row >
          <p className="title__IA">
            Vous testez vos sites web ou applications, en version prototype ou déjà en production.
            Nous collections des réponses aux questionnaires, des vidéos commentées et des verbatims
            écrits. Nous les scorons avec notre moteur d’intelligence artificielle.
          </p>
        </Row>

        <Row>
          <a href="http://51.68.231.155:4000/home" ref={sectionRefs.Solution} id="Solution">
            <Button className="btn_home">
              Tester notre IA en 3 minutes seulement
            </Button>
          </a>
        </Row>
      </div>

      <div className="solution_section">
        <div className="solution_section_left">
          <div className="green_container">
            <span className="title__1">68%</span>
            <p className="title__2">
              des utilisateurs quittent un site à cause d’une mauvaise
              expérience de navigation
            </p>
          </div>
        </div>
        <div className="solution_section_right">
          <div className="transparent_container">
            <span className="title__1">La solution ? </span>
            <p className="title__2">
              85% des problèmes peuvent être détectés et résolus en effectuant
              un test sur un groupe de 5 utilisateurs.
            </p>
            <p className="title__2">
              1€ investi en expérience utilisateur génère un revenu de 100€ en
              retour.
            </p>
          </div>
        </div>
      </div>




      <div className="container_home3">
        <div className="pourquoi_section" >
          <span className="title__1">
            L’UX quantititive donne le « QUOI »,{" "}
          </span>
          <span className="title__1">
            alors que la recherche qualitative donne le « POURQUOI »{" "}
          </span>
          <Row>
            <Col md="5">
              <div className="card__container">
                <span className="title__card">
                  Des données statistiques à votre disposition
                </span>
                <div className="card_content">
                  <div className="card_ligne">
                    <img src={Tick} alt="2M-advisory" />
                    <span className="text__card">Statistiques de panels </span>
                  </div>
                  <div className="card_ligne">
                    <img src={Tick} alt="2M-advisory" />
                    <span className="text__card">
                      Statistiques de réponses utilisateurs
                    </span>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="2"></Col>
            <Col md="5">
              <div className="card__container">
                <span className="title__card">
                  Mais surtout des tests qualitatifs !
                </span>
                <div className="card_content">
                  <div className="card_ligne">
                    <img src={Tick} alt="2M-advisory" />
                    <span className="text__card">Tests modérés et non modérés</span>
                  </div>
                  <div className="card_ligne">
                    <img src={Tick} alt="2M-advisory" />
                    <span className="text__card">Tests simples ou AB Testing</span>
                  </div>
                  <div className="card_ligne">
                    <img src={Tick} alt="2M-advisory" />
                    <span className="text__card">Emotional Map</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <div className="container_home4">
        <div className="marche_section">
          <p className="title__1">Comment ça marche ?</p>
        </div>
        <div className="row__stat">
          <Col className="marche_block">
            <img
              style={{ width: "15em", height: "12em" }}
              src={Scenario}
              alt="2M-advisory"
            />
            <p className="title__5">1.Créer vos scénarios</p>
            <p className="description1">
              Collecter le maximum de ressentis utilisateurs
              via des tests ciblés (site, app, maquettes, produit…)
            </p>
          </Col>
          <Col className="marche_block">
            <img
              style={{ width: "15em", height: "12em" }}
              src={Audiance}
              alt="2M-advisory"
            />
            <p className="title__5">2.Cibler votre ​audience</p>
            <p className="description1">
              Définisser précisément le panel de clients dont vous souhaitez
              collecter les impressions ou utiliser votre propre panel de
              testeurs.
            </p>
          </Col>

          <Col className="marche_block">
            <img
              style={{ width: "16em", height: "11em" }}
              src={Analyse}
              alt="2M-advisory"
            />
            <p className="title__5">3.Analyser les retours ​clients</p>
            <p className="description1">
              Grâce à notre moteur d’intelligence artificielle, visualiser
              simplement le ressenti de vos clients et optimiser vos applications
            </p>
          </Col>

          <Col className="marche_block">
            <img
              style={{ width: "15em", height: "12em" }}
              src={Produit}
              alt="2M-advisory"
            />
            <p className="title__5">4.Améliorer vos produits</p>
            <p className="description1">
              Rassembler vos observations, prioriser vos retours et
              générer/partager facilement un rapport de préconisations.
            </p>
          </Col>
        </div>
        <div className="buttons">
          <Button className="btn_1"
            onClick={toggle}
          >
            {btn2Text}
          </Button>
        </div>
      </div>


      <div className="container_home5">
        <div className="insight_section">
          <div className="insight_section_left">
            <div>
              <span className="title__6">Qui utilise <br className="blockInsight" /> Insight Data ? </span>
            </div>
            <div>
              <span className="title__7">
                Créer une culture « customer centric » devient l’impératif de tous.
              </span>
            </div>
          </div>
          <div className="insight_section_right">
            <div className="card__container2">
              <div className="image_utilise_left" >
                <img src={Management} alt="2M-advisory" />
              </div>
              <div className="card_container">
                <div className="title__card2">
                  <span>Top Management</span>
                </div>
                <div>
                  <p className="text__card2">
                    Soutenir les décisions critiques avec des données objectifs.
                    Adopter une approche guidée par la data pour développer votre stratégie.
                  </p>
                </div>
              </div>
            </div>

            <div className="card__container2">
              <div className="image_utilise_left" >
                <img src={Designers} alt="2M-advisory" />
              </div>
              <div className="card_container">
                <div className="title__card2">
                  <span>Designers UI / UX</span>
                </div>
                <div>
                  <p className="text__card2">
                    Réaliser des tests utilisateur et des AB tests, valider
                    et optimiser des designs ou des prototypes.
                  </p>
                </div>
              </div>
            </div>


            <div className="card__container2">
              <div className="image_utilise_left" >
                <img src={Expert} alt="2M-advisory" />
              </div>
              <div className="card_container">
                <div className="title__card2">
                  <span>Experts Marketing & Communication</span>
                </div>
                <div>
                  <p className="text__card2">
                    Comprendre les perceptions et les attentes à chaque action pour acquérir et fidéliser vos cibles.
                  </p>
                </div>
              </div>
            </div>


            <div className="card__container2">
              <div className="image_utilise_left" >
                <img src={Equipes} alt="2M-advisory" />
              </div>
              <div className="card_container">
                <div className="title__card2">
                  <span>Equipes techniques </span>
                </div>
                <div>
                  <p className="text__card2">
                    Faire participer vos utilisateurs à chaque étape du
                    processus Scrum afin d’optimiser le Time To Market
                  </p>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>

      <div className="container_home6">
        <div className="row__stat2 mb-5">
          <div className="clientavis">
            <div>
              <p className="ref">
                Nous avons apprécié la rapidité et la qualité des retours
                utilisateurs que nous avons pu collecter. Le visionnage ciblé des
                vidéos nous a permis de cibler nos développements à mettre en
                oeuvre dans une logique de quick wins.
              </p>
            </div>
            <div ref={sectionRefs.Tarif} id="Tarif">
              <p className="name__font">
                Peter Rebelo Coelho, Chief Operating Officer chez Omnevo
              </p>
            </div>
          </div>
          <div className="imgClient">
            <img
              style={{ borderRadius: "25%", width: "8em" }}
              src={Peter}
              alt="2M-advisory"
            />
          </div>
        </div>

        <div className="container_home7" >
          <div className="abonnement_section" >
            <div>
              <div className="card__container3">
                <span className="title__8">PAY AS YOU GO</span>
                <div className="imageContainer">
                  <div className="as_you_go_pricing">25€</div>
                  <div className="as_you_go_tit">par test utilisateur</div>
                  <div className="as_you_go_desc">Paiement unique</div>
                  <div className="as_you_go_desc">Panel Insight Data</div>
                </div>
                <span className="more1" onClick={toggleVisiblePay}>En savoir plus </span>
              </div>
            </div>

            <div>
              <div className="card__container3">
                <span className="title__8">ABONNEMENT</span>
                <span className="apartir">à partir de</span>
                <div className="imageContainer2">
                  <div className="as_you_go_pricing">12€</div>
                  <div className="as_you_go_tit">par test utilisateur</div>
                  <div className="as_you_go_desc">Sans engagement</div>
                  <div className="as_you_go_desc">3 types de licence</div>
                  <div className="as_you_go_desc" ref={sectionRefs.Blog} id="Blog">Avec ou sans testeurs</div>
                </div>
                <span className="more" onClick={toggleVisibleAbonnement} >En savoir plus </span>
              </div >
            </div>
          </div>
        </div>




        <div className="container_home8" >
          <p className="title__8 mt-5">
            Si vous souhaitez vous rapprocher de vos utilisateurs, <br />
            faites un pas de plus vers eux.
          </p>
          <div className="row__equation">

            <div className="footer_section">
              <div className="img_container1">
                <img src={Diff} alt="2M-advisory" className="img_footer" />
              </div>
              <p className="img__legend">Vous différencier de vos concurrents </p>
            </div>


            <div className="footer_section">
              <div className="img_container2">
                <img src={Innovation} alt="2M-advisory" className="img_footer" />
              </div>
              <p className="img__legend">Innover plus vite</p>
            </div>

            <div className="footer_section">
              <div className="img_container3">
                <img src={Client} alt="2M-advisory" className="img_footer" />
              </div>
              <p className="img__legend">Augmenter l’expérience client</p>
            </div>

          </div>

          <div className="buttons">
            <Button className="btn_1"
              onClick={toggle}
            >
              {btn2Text}
            </Button>

            {/* <Button className="btn__2"
               onClick={toggle2}
            >
              {btn1Text}
            </Button> */}
          </div>
        </div>


      </div>
      {/* <Modal /> */}
      {
        !cookie &&
        <CookieConsent
          location="bottom"
          buttonText="Autoriser tous les coockies"
          cookieName="myAwesomeCookieName"
          declineButtonText="Utiliser Uniquement les cookies nécessaires"
          enableDeclineButton
          expires={365}
          onAccept={() => {
            setCookie(true)
            localStorage.setItem('cookie', true);
          }}
          overlay
          onDecline={() => {
            toggleVisible();
          }}
          style={{
            background: "#2B373B",
            textAlign: "left",
            alignItems: "center",
          }}
          declineButtonStyle={{
            background: "gray",
            color: "white",
            borderRadius: 5,
          }}
          buttonStyle={{
            color: "white",
            background: "green",
            borderRadius: 5,
          }}
          debug={true}
          flipButtons
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              alignContent: "flex-start",
              justifyContent: "flex-start",
              paddingLeft: 100,
            }}
          >
            <span style={{ fontWeight: "bold" }}>
              {" "}
              Ce site Web utilise des cookies.
            </span>
            <span className="font-small-3">
              Nous utilisons des cookies pour personnaliser le contenu et les
              publicités, pour fournir des fonctionnalités de médias sociaux et
              pour analyser notre trafic. Nous partageons également des
              informations sur votre utilisation de notre site avec nos
              partenaires de médias sociaux, de publicité et d'analyse qui peuvent
              les combiner avec d'autres informations que vous leur avez fournies
              ou qu'ils ont collectées à partir de votre utilisation de leurs
              services. Vous consentez à nos cookies si vous continuez à utiliser
              notre site Web.
            </span>
          </div>
        </CookieConsent>
      }

      {visible &&<Modal visible={visible} toggleVisible={toggleVisible} /> }
      {visiblePay && <PayAsYouGoModal visible={visiblePay} toggleVisible={toggleVisiblePay} /> }
      {visibleAbonnement && <AbonnementModal visible={visibleAbonnement} toggleVisible={toggleVisibleAbonnement} /> }
      {visibleModalContact && <ContactModal visible={visibleModalContact} toggleVisible={toggleVisibleModalContact} /> }
      {state.visibleCondition && <ModelConditions handleConditions={handleConditions} visibleCondition={state.visibleCondition} /> }
      {state.visiblePolitique && <ModelPolitique handlePolitique={handlePolitique} visiblePolitique={state.visiblePolitique} /> }
      {state.visibleLegal && <ModelLegal handleLegal={handleLegal} visibleLegal={state.visibleLegal} /> }
      {renderModalSignup()}
      {renderModalSignupTester()}
      {renderModalInscription()}
    </div>

  );
};



const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  navigation: state.navigation
});



export default connect(mapStateToProps, { onSaveClient, onSaveTester })(HomePageForm);
