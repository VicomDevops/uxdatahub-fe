import React, { Component } from "react";
import { connect } from "react-redux";

import { AvForm, AvField, AvGroup, AvRadio, AvRadioGroup } from 'availity-reactstrap-validation';
import { Input, Label, Col, Row, FormGroup, Button } from "reactstrap";
import Select from 'react-select';
import { Link } from "react-router-dom";
import "../landingPage.css";
import './landing.css';
import axios from "axios";
import ModelConditions from '../../navbar/ModalConditions';
import ModelPolitique from '../../navbar/ModalPolitique';
import {
  genreList, systemeList, situtaionMaritalList, taileSocieteList, fonctionManagérialeList,
  revenuList, departementList, niveauEtudeList, reseauSociauxList, formInfoInternet, tempsInternetList,
  centerInteretList, activitestList, paysList, cspList, genreEnfantList, LangueList, achatInternet, secteurTravaille
} from "./landingForm";
import { URL_API } from "../../../config.json";
import moment from "moment/moment";
import { toast } from "react-toastify";
import httpServices from "../../../services/httpServices";
import userServices from "../../../services/userServices";

class InfoTester extends Component {
  constructor(props) {
    super(props);
    this.handleSubmitFrom = this.handleSubmitFrom.bind(this);
    this.handleConditions = this.handleConditions.bind(this);
    this.handlePolitique = this.handlePolitique.bind(this);
    this.state = {
      visibleCondition: false,
      visiblePolitique: false,
      isHidden: true,
      show: false,
      enfant: 0,
      equipement: 0,
      formId: 1,
      tauxProfil: 1,
      userInfo: {
        reseauSociaux: null,
        centerInteret: null,
        activites: null,
        tauxProfile: 0,
        enfant: {},
        equipement: {},
      },
      key: null,
      errors: {},
    };

  }





  handleAjoutFormEfant = () => {
    this.setState({ enfant: this.state.enfant + 1 })
  };

  handleSupprimeFormEfant = () => {
    if (this.state.enfant > 0) {
      this.setState({ enfant: this.state.enfant - 1 })
    }
  };

  handleAjoutFormEquipement = () => {
    this.setState({ equipement: this.state.equipement + 1 })
  };

  handleSupprimeFormEquipement = () => {
    if (this.state.equipement > 0) {
      this.setState({ equipement: this.state.equipement - 1 })
    }
  };


  componentDidMount() {
    const response = userServices.getCurrentUser();
    if(response){
      let date = moment(response.data.dateOfBirth).format("YYYY-MM-DD");
      response.data.dateOfBirth = date;
      this.setState({ userInfo: response.data });
    }else{
      this.setState({ userInfo: {} });
    }
  }


  onChange = (e) => {
    const value = e.target.value;
    if (e.target.name === "postalCode" || e.target.name === "achatInternet") {
      this.setState({ userInfo: { ...this.state.userInfo, [e.target.name]: parseInt(value) } })

    }
    else if (e.target.name === "profileInformations" || e.target.name === "testVisio" || e.target.name === "viaEmail" || e.target.name === "sms") {
      //convert to boolean
      this.setState({ userInfo: { ...this.state.userInfo, [e.target.name]: value === "true" } })

    } else {
      this.setState({ userInfo: { ...this.state.userInfo, [e.target.name]: value } })
    }
  };

  handleChangeCI = (value) => {
    this.setState({ userInfo: { ...this.state.userInfo, centerInteret: value } });
  };

  handleChangeA = (value) => {
    this.setState({ userInfo: { ...this.state.userInfo, activityArea: value } });
  };

  handleChangeRS = (value) => {
    this.setState({ userInfo: { ...this.state.userInfo, socialMedia: value } });
  };



  handleFormId = () => {
    this.setState({ userInfo: { ...this.state.userInfo, completionRate: this.state.formId * 20 } })
    axios.put(`${URL_API}/api/testers/${this.state.userInfo?.id}`, this.state.userInfo, {
      headers: httpServices.getAuthorization(),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error, "err");
      });
    if (this.state.formId < 4) {
      this.setState({ formId: this.state.formId + 1 })
    } else if (this.state.formId >= 4 && this.state.formId < 5) {
      this.setState({ formId: this.state.formId + 0.5 })
    }
    else if (this.state.formId >= 5) {
      this.sentForm()
    }
  };




  handleSubmitFrom(event, errors, values) {
    if (errors.length === 0) {
      this.handleFormId();
    }
  }



  sentForm = () => {
    axios.put(`${URL_API}/api/testers/${this.state.userInfo?.id}`, this.state.userInfo, {
      headers: httpServices.getAuthorization(),
    })
      .then((response) => {
        this.props.history.push("/tester/dashboard");
      })
      .catch((error) => {
        console.log(error, "err");
        toast.error("Erreur lors de la modification du profil");
      });
  };

  handleConditions = () => {
    this.setState({ visibleCondition: !this.state.visibleCondition })
  };
  handlePolitique = () => {
    this.setState({ visiblePolitique: !this.state.visiblePolitique })
  };

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



  render() {
    const { selectedValue, formId } = this.state;
    const anneeList = () => {
      let annee = [];
      for (let i = 2022; i >= 1950; i--) {
        annee.push(i);
      }
      return annee;
    };


    const handleEnfant = (enfants) => {
      let enfantsFrom = [];
      for (let index = 0; index < enfants; index++) {
        enfantsFrom.push(
          <Row style={{ paddingTop: 20, width: "100%" }}>
            <Col>
              <FormGroup className="column-left">
                <Label className="label_input">Genre</Label>
                <Input type="select" className="landing_input" name={`enfant_annee${index}`} onChange={this.onChange} required>
                  {
                    genreEnfantList.map((genre) => (
                      <option key={genre.id} value={genre.name}>
                        {genre.name}
                      </option>
                    ))
                  }
                </Input>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup className="column-left">
                <Label className="label_input">Année</Label>
                <Input type="select" className="landing_input" name={`enfant_annee${index}`} onChange={this.onChange} required>
                  {
                    anneeList().map((annee) => (
                      <option key={annee} value={annee}>
                        {annee}
                      </option>
                    ))
                  }
                </Input>
              </FormGroup>
            </Col>
          </Row>
        )
      }
      return enfantsFrom;
    }



    const handleEquipements = (equipements) => {
      let equipementsFrom = [];
      for (let index = 0; index < equipements; index++) {
        equipementsFrom.push(
          <Row style={{ paddingTop: 20, width: "102%" }}>
            <Col>
              <FormGroup className="column-left">
                <Label className="label_input">Type</Label>
                <Input type="select" className="landing_input" name={`equipement${index}`} onChange={this.onChange} required>
                  <option key="1" value="Ordinateur">Ordinateur</option>
                  <option key="2" value="Smartphone">Smartphone</option>
                  <option key="3" value="Tablette">Tablette</option>
                </Input>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup className="column-left">
                <Label className="label_input">Systéme d'explotation</Label>
                <Input type="select" className="landing_input" name={`systeme${index}`} onChange={this.onChange} required>
                  {systemeList.map((systeme) => (
                    <option key={systeme.id} value={systeme.name}>
                      {systeme.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
          </Row>
        )
      }
      return equipementsFrom;
    }




    const formInfoPersonnel = () => {
      return (
        <div>
          <AvForm onSubmit={this.handleSubmitFrom}>
            <Row>
              <Col>
                <AvGroup className="column-left">
                  <Label className="label_input">Prénom</Label>
                  <AvField
                    value={this.state.userInfo.name}
                    placeholder="Prénom"
                    type="text"
                    onChange={this.onChange}
                    name="name"
                    id="name"
                    className="landing_input"
                    validate={{
                      required: { value: true, errorMessage: "Ce champ est obligatoire" },
                      pattern: { value: "^[a-zA-Z ]{1,50}$", errorMessage: "Les chiffres et les caractéres speciaux ne sont pas autorisé" }
                    }}
                  />
                </AvGroup>
              </Col>
              <Col>
                <AvGroup className="column-left">
                  <Label className="label_input">Nom</Label>
                  <AvField
                    value={this.state.userInfo.lastname}
                    placeholder="Nom"
                    type="text"
                    onChange={this.onChange}
                    name="lastname"
                    id="lastname"
                    className="landing_input"
                    validate={{
                      required: { value: true, errorMessage: "Ce champ est obligatoire" },
                      pattern: { value: "^[a-zA-Z ]{1,50}$", errorMessage: "Les chiffres et les caractéres speciaux ne sont pas autorisé" }
                    }}
                  />
                </AvGroup>
              </Col>
            </Row>
            <Row style={{ paddingTop: 20 }}>
              <Col>
                <FormGroup className="column-left">
                  <Label className="label_input">Date de naissance</Label>
                  <AvField
                    value={this.state.userInfo.dateOfBirth}
                    type="date"
                    onChange={this.onChange}
                    className="landing_input"
                    name="dateOfBirth"
                    id="dateOfBirth"
                    validate={{
                      required: { value: true, errorMessage: "Ce champ est obligatoire" },
                      dateRange: { start: { value: -65, units: 'years', }, end: { value: -18, units: 'years', }, errorMessage: "Votre age doit être compris entre 18 ans et 65 ans" }
                    }}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup className="column-left">
                  <Label className="label_input">Code postal</Label>
                  <AvField
                    value={this.state.userInfo.postalCode}
                    placeholder="Code postal"
                    type="number"
                    onChange={this.onChange}
                    name="postalCode"
                    id="postalCode"
                    className="landing_input"
                    validate={{
                      required: { value: true, errorMessage: "Ce champ est obligatoire" },
                      pattern: { value: "^[0-9]{1,5}$", errorMessage: "Le code postal doit être composé de 1 à 5 chiffres" }
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row style={{ paddingTop: 20 }}>
              <Col>
                <FormGroup className="column-left">
                  <Label className="label_input">Ville</Label>
                  <Input type="text" value={this.state.userInfo.city} className="landing_input" name={`city`} onChange={this.onChange} required />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup className="column-left">
                  <Label className="label_input">Pays</Label>
                  <AvField type="select" name="country" className="landing_input" id='country' onChange={this.onChange} value={this.state.userInfo.country}
                    validate={{
                      required: { value: true, errorMessage: "Ce champ est obligatoire" },
                    }}
                  >
                    <option value="" disabled defaultValue>Select...</option>
                    {paysList.map(res => <option key={res} value={res}>{res}</option>)}
                  </AvField>
                </FormGroup>
              </Col>
            </Row>
            <Row style={{ paddingTop: 20 }}>
              <Col>
                <FormGroup className="column-left">
                  <Label className="label_input">Genre</Label>
                  <AvField type="select" id='gender' name="gender" className="landing_input" onChange={this.onChange} value={this.state.userInfo.gender}
                    validate={{
                      required: { value: true, errorMessage: "Ce champ est obligatoire" },
                    }}
                  >
                    <option value="" disabled defaultValue>Select...</option>
                    {genreList.map(res => <option key={res.id} value={res.value}>{res.value}</option>)}
                  </AvField>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup className="column-left">
                  <Label className="label_input">Langue maternelle</Label>
                  <AvField type="select" name="langue" className="landing_input" id='langue' onChange={this.onChange} value={this.state.userInfo.langue}
                    validate={{
                      required: { value: true, errorMessage: "Ce champ est obligatoire" },
                    }}
                  >
                    <option value="" disabled defaultValue>Select...</option>
                    {LangueList.map(res => <option key={res.id} value={res.value}>{res.value}</option>)}
                  </AvField>
                </FormGroup>
              </Col>
            </Row>
            <Row style={{ paddingTop: 20 }}>
              <Col>
                <FormGroup className="column-left">
                  <Label className="label_input">Adresse email</Label>
                  <AvField
                    value={this.state.userInfo.email}
                    placeholder="Email"
                    type="text"
                    onChange={this.onChange}
                    name="email"
                    id="email"
                    className="AV_landing_input"
                    invalid={this.state.error && this.state.error.email ? true : false}
                    validate={{
                      pattern: { value: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$', errorMessage: "Cette adresse mail n'est pas valide" },
                      required: { value: true, errorMessage: "Ce champ est obligatoire" },
                    }}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup className="column-left">
                  <Label className="label_input">Numéro du portable</Label>
                  <AvField
                    value={this.state.userInfo.phone}
                    placeholder="Telephone"
                    type="number"
                    onChange={this.onChange}
                    name="phone"
                    id="phone"
                    className="landing_input"
                    validate={{
                      required: { value: true, errorMessage: "Ce champ est obligatoire" },
                      pattern: { value: "^[+]{0,1}[0-9]{0,20}$", errorMessage: "Le numéro de téléphone doit contenir que des chiffres" },
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <div className="footer">
              <Button className="btn-success"
                style={{
                  height: "2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem",
                }}
              >
                Enregistrer
              </Button>
            </div>
          </AvForm>
        </div>
      )
    }





    const formInfoDonnéesPersonnelles = () => {
      return (
        <AvForm onSubmit={this.handleSubmitFrom}>
          {this.renderModalCondition()}
          {this.renderModalPolitique()}
          <Row className="containerInfoDP">
            <Col>
              <FormGroup className="column-left-form">
                <AvRadioGroup
                  name="profileInformations"
                  id="profileInformations"
                  errorMessage="Ce champ est obligatoire"
                  className="radio_form"
                  onChange={this.onChange}
                  required>
                  <label className="label_input_checkbox">Les tests qui vous sont proposés sont sélectionnés en fonctions de vos informations de profil.</label>
                  <div className="radio_form_grp">
                    <AvRadio label="J'accepte que mes informations soient utilisées pour me proposer des tests" value="true" />
                    <AvRadio label="Je refuse" value="false" />
                  </div>
                </AvRadioGroup>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup className="column-left-form">
                <AvRadioGroup
                  name="testVisio"
                  id="testVisio"
                  errorMessage="Ce champ est obligatoire"
                  className="radio_form"
                  onChange={this.onChange}
                  required>
                  <label className="label_input_checkbox">Certains de nos clients réalisent des entretiens à distance, par visio-conférence,
                    avec un ou plusieurs utilisateurs en même temps. Acceptez-vous de participer à ces tests ?</label>
                  <div className="radio_form_grp">
                    <AvRadio label="Oui, j'accepte de réaliser ce type de test en visio-conférence " value="true" />
                    <AvRadio label="Non, je n'accepte pas de réaliser ce type de test en visio-conférence" value="false" />
                  </div>
                </AvRadioGroup>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup className="column-left-form">
                <AvRadioGroup
                  name="viaEmail"
                  id="viaEmail"
                  errorMessage="Ce champ est obligatoire"
                  className="radio_form"
                  onChange={this.onChange}
                  required>
                  <label className="label_input_checkbox">Nous avons besoin de vous contacter par email, n
                    otamment pour vous proposer des tests.</label>
                  <div className="radio_form_grp">
                    <AvRadio label="J'accepte d’être sollicité(e) par Email " value="true" />
                    <AvRadio label="Je refuse " value="false" />
                  </div>
                </AvRadioGroup>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup className="column-left-form">
                <AvRadioGroup
                  name="sms"
                  id="sms"
                  errorMessage="Ce champ est obligatoire"
                  className="radio_form"
                  onChange={this.onChange}
                  required>
                  <label className="label_input_checkbox">Nous vous proposons de vous contacter par SMS
                    pour vous proposer des tests.</label>
                  <div className="radio_form_grp">
                    <AvRadio label="J'accepte d’être sollicité(e) par SMS" value="true" />
                    <AvRadio label="Je refuse" value="false" />
                  </div>
                </AvRadioGroup>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup className="condition_form" check>
                <Input type="checkbox" name="privacyPolicy" value={true} onChange={this.onChange} errorMessage="Ce champ est obligatoire" />
                <Label className="label_condition" >
                  J'ai lu et j'accepte <span className="conditionGenerale" onClick={this.handleConditions}>les Conditions Générales d'Utilisation</span>,
                  la politique de Confidentialité et <span className="conditionGenerale" onClick={this.handlePolitique}> Respect des Données Personnelles</span> ainsi
                  que les <span className="conditionGenerale">Conditions du contrat testeur</span> .
                </Label>
              </FormGroup>
            </Col>
          </Row>
          <div className="footer">
            <Button className="btn-success"
              style={{
                height: "2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem",
              }}
            >
              Enregistrer
            </Button>
          </div>
        </AvForm>
      )
    }




    const formInfoFamille = () => {
      return (
        <AvForm onSubmit={this.handleSubmitFrom}>
          <Row>
            <Col>
              <div className="column-left">
                <Label className="label_input">Quelle est votre situation maritale ?</Label>
                <AvField type="select" name="maritalStatus" className="landing_input"
                  id='situationMaritale' onChange={this.onChange} value={this.state.userInfo.maritalStatus}>
                  <option value="" disabled defaultValue>Select...</option>
                  {situtaionMaritalList.map(res => <option key={res.id} value={res.value}>{res.value}</option>)}
                </AvField>
              </div>
            </Col>
          </Row>
          <Row style={{ paddingTop: 20 }}>
            <Col>
              <FormGroup className="column-left">
                <Label className="label_famille">
                  <div className="label_famille_text">Genre et année de naissance de vos enfants</div>
                  <div className="label_plus_moins">
                    <div className="plus" onClick={this.handleAjoutFormEfant} >+</div>
                    <div className="moins" onClick={this.handleSupprimeFormEfant} >-</div>
                  </div>
                </Label>
                {handleEnfant(this.state.enfant)}
              </FormGroup>
            </Col>
          </Row>
          <div className="footer">
            <Button className="btn-success"
              style={{
                height: "2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem",
              }}
            >
              Enregistrer
            </Button>
          </div>
        </AvForm>
      )
    }




    const formInfoProfessionnel = () => {
      return (
        <AvForm onSubmit={this.handleSubmitFrom}>
          <Row className="form_row">
            <Col>
              <FormGroup className="column-left">
                <Label className="label_input">Quel est votre niveau d’étude ?</Label>
                <AvField type="select" name="studyLevel" className="landing_input" id='studyLevel' onChange={this.onChange} value={this.state.userInfo.studyLevel}>
                  <option value="" disabled defaultValue>Select...</option>
                  {niveauEtudeList.map(res => <option key={res.id} value={res.value}>{res.value}</option>)}
                </AvField>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup className="column-left">
                <Label className="label_input">Dans quel secteur d’activité travaillez-vous ?</Label>
                <AvField type="select" name="activityArea" className="landing_input" id='activityArea' onChange={this.onChange} value={this.state.userInfo.activityArea}>
                  <option value="" disabled defaultValue>Select...</option>
                  {secteurTravaille.map(res => <option key={res.id} value={res.value}>{res.value}</option>)}
                </AvField>
              </FormGroup>
            </Col>
          </Row>
          <Row style={{ paddingTop: 20 }} className="form_row">
            <Col>
              <FormGroup className="column-left">
                <Label className="label_input">Quel est votre CSP ?</Label>
                <AvField type="select" name="csp" className="landing_input" id='csp' onChange={this.onChange} value={this.state.userInfo.csp}>
                  <option value="" disabled defaultValue>Select...</option>
                  {cspList.map(res => <option key={res.id} value={res.value}>{res.value}</option>)}
                </AvField>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup className="column-left">
                <Label className="label_input">Dans quel département travaillez-vous au sein de votre société ? </Label>
                <AvField type="select" name="department" className="landing_input" id='department' onChange={this.onChange} value={this.state.userInfo.department}>
                  <option value="" disabled defaultValue>Select...</option>
                  {departementList.map(res => <option key={res.id} value={res.value}>{res.value}</option>)}
                </AvField>
              </FormGroup>
            </Col>
          </Row>
          <Row style={{ paddingTop: 20 }} className="form_row">
            <Col>
              <FormGroup className="column-left">
                <Label className="label_input">Quel est votre revenu net par mois ?</Label>
                <AvField type="select" name="revenu" className="landing_input" id='revenu' onChange={this.onChange} value={this.state.userInfo.revenu}>
                  <option value="" disabled defaultValue>Select...</option>
                  {revenuList.map(res => <option key={res.id} value={res.value}>{res.value}</option>)}
                </AvField>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup className="column-left">
                <Label className="label_input">Quel est l'intitulé de votre poste ?</Label>
                <AvField
                  value={this.state.userInfo.poste}
                  placeholder="Poste"
                  type="text"
                  onChange={this.onChange}
                  name="poste"
                  id="poste"
                  className="landing_input"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row style={{ paddingTop: 20 }} className="form_row">
            <Col>
              <FormGroup className="column-left">
                <Label className="label_input">Avez-vous une fonction managériale au sein de votre entreprise ?</Label>
                <AvField type="select" name="fonctionManageriale" className="landing_input" id='fonctionManageriale' onChange={this.onChange} value={this.state.userInfo.fonctionManageriale}>
                  <option value="" disabled defaultValue>Select...</option>
                  {fonctionManagérialeList.map(res => <option key={res.id} value={res.value}>{res.value}</option>)}
                </AvField>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup className="column-left">
                <Label className="label_input">Quelle est la taille de la société dans laquelle vous travaillez ?</Label>
                <AvField type="select" name="tailleSte" className="landing_input" id='tailleSte' onChange={this.onChange} value={this.state.userInfo.tailleSte}>
                  <option value="" disabled defaultValue>Select...</option>
                  {taileSocieteList.map(res => <option key={res.id} value={res.value}>{res.value}</option>)}
                </AvField>
              </FormGroup>
            </Col>
          </Row>
          <div className="footer">
            <Button className="btn-success"
              style={{
                height: "2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem",
              }}
            >
              Enregistrer
            </Button>
          </div>
        </AvForm>
      )
    }







    const formInfoEquipement = () => {
      return (
        <AvForm onSubmit={this.handleSubmitFrom}>
          <Row className="form_row">
            <Col>
              <FormGroup className="column-left">
                <Label className="label_input">Combien de temps passez-vous sur Internet par jour ? </Label>
                <AvField type="select" name="temps_passe" className="landing_input" id='temps_passe' onChange={this.onChange} value={this.state.userInfo.temps_passe}>
                  <option value="" disabled defaultValue>Select...</option>
                  {tempsInternetList.map(res => <option key={res.id} value={res.value}>{res.value}</option>)}
                </AvField>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup className="column-left">
                <Label className="label_input">A quelle fréquence achetez-vous sur Internet ?  </Label>
                <AvField type="select" name="internetFrequency" className="landing_input" id='internetFrequency' onChange={this.onChange} value={this.state.userInfo.internetFrequency}>
                  <option value="" disabled defaultValue>Select...</option>
                  {formInfoInternet.map(res => <option key={res.id} value={res.value}>{res.value}</option>)}
                </AvField>
              </FormGroup>
            </Col>
          </Row>
          <Row className="form_row">
            <Col>
              <FormGroup className="column-left">
                <Label className="label_input">Avec-vous déjà acheté sur internet avec votre téléphone mobile ?  </Label>
                <AvField type="select" name="achatInternet" className="landing_input" id='achatInternet' onChange={this.onChange} value={this.state.userInfo.achatInternet}>
                  <option value="" disabled defaultValue>Select...</option>
                  {achatInternet.map(res => <option key={res.id} value={res.value}>{res.value}</option>)}
                </AvField>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup className="column-left">
                <Label className="label_input_multiple"> Quels réseaux sociaux utilisez-vous ?  </Label>
                <Select
                  value={this.state.userInfo.socialMedia}
                  className="landing_input"
                  onChange={this.handleChangeRS}
                  options={reseauSociauxList}
                  isMulti
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup className="column-left">
                <Label className="label_famille">
                  <div className="label_famille_text">
                    Quel(s) ordinateurs, téléphone(s), tablette(s) possédez-vous ?
                  </div>
                  <div className="label_plus_moins">
                    <div className="plus" onClick={this.handleAjoutFormEquipement} >+</div>
                    <div className="moins" onClick={this.handleSupprimeFormEquipement} >-</div>
                  </div>
                </Label>
                {handleEquipements(this.state.equipement)}
              </FormGroup>
            </Col>
          </Row>
          <div className="footer">
            <Button className="btn-success"
              style={{
                height: "2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem",
              }}
            >
              Enregistrer
            </Button>
          </div>
        </AvForm>
      )
    }

    const formInfoLoisirs = () => {
      return (
        <div>
          <AvForm onSubmit={this.handleSubmitFrom}>
            <Row>
              <Col>
                <FormGroup className="column-left">
                  <Label className="label_input">Quels sont vos centres d'intérêts ?  </Label>
                  <Select
                    className="landing_input_multi"
                    value={selectedValue}
                    onChange={this.handleChangeCI}
                    options={centerInteretList}
                    isMulti
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup className="column-left">
                  <Label className="label_input">Quelles activités pratiquez-vous ? </Label>
                  <Select
                    className="landing_input_multi"
                    value={selectedValue}
                    onChange={this.handleChangeA}
                    options={activitestList}
                    isMulti
                  />
                </FormGroup>
              </Col>
            </Row>
            <div className="footer">
              <Button className="btn-success"
                style={{
                  height: "2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem",
                }}
              >
                Terminer
              </Button>
            </div>
          </AvForm>
        </div>
      )
    }

    return (
      <React.Fragment>
        <div className="landing_container">
          <div className="landing_container__header">
            <Link to="/tester/dashboard" style={{ color: "black", textDecoration: "none" }} className="mb-2">
              <span style={{ fontSize: "20px", fontWeight: "800", color: "black" }}>{" < "} </span> Retour</Link>
            <div className="landing_title">Mes informations Testeur</div>
          </div>
          <div className="landing_container__body">
            <div className="landing_container__body__left">
              <div className="mb-5">
                <span style={{ fontSize: "18px", fontWeight: "bold" }}>Taux complétion : </span>
                <span style={{ color: "red", fontWeight: "bold" }}> {formId * 20}% </span>
              </div>
              <div className="left_setions">
                <span style={{ fontSize: "14px", lineHeight: "20px" }} className={formId === 1 ? "isActive" : ""}> Informations personnelles </span>
                <span style={{ fontSize: "14px", lineHeight: "20px" }} className={formId === 2 ? "isActive" : ""}> Données personnelles  </span>
                <span style={{ fontSize: "14px", lineHeight: "20px" }} className={formId === 3 ? "isActive" : ""}> Situation familiale </span>
                <span style={{ fontSize: "14px", lineHeight: "20px" }} className={formId === 4 ? "isActive" : ""}> Situation professionnelle </span>
                <span style={{ fontSize: "14px", lineHeight: "20px" }} className={formId === 4.5 ? "isActive" : ""}> Web et équipement </span>
                <span style={{ fontSize: "14px", lineHeight: "20px" }} className={formId === 5 ? "isActive" : ""}> Activités & Loisirs </span>
              </div>
            </div>
            <div className="landing_container__body__right">
              <div className="landing_from">
                {
                  formId === 1 ? formInfoPersonnel() :
                    formId === 2 ? formInfoDonnéesPersonnelles() :
                      formId === 3 ? formInfoFamille() :
                        formId === 4 ? formInfoProfessionnel() :
                          formId === 4.5 ? formInfoEquipement() :
                            formId === 5 ? formInfoLoisirs() : null
                }
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  auth: state.auth,
});

export default connect(mapStateToProps)(InfoTester);
