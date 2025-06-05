import React, { useState, useEffect } from "react";
import { Input, Label, Col, Row, Button } from "reactstrap";
import { URL_API } from "../../../config.json";
import axios from "axios";
import { AvForm } from 'availity-reactstrap-validation';
import { toast } from 'react-toastify';
import './iban.css';
import "react-credit-cards/es/styles-compiled.css";
import papier from "../../../assets/papier.svg";
import userInfo from "../../../assets/user.svg";
import { Link } from "react-router-dom";
import httpServices from "../../../services/httpServices";


const PK =
  "pk_test_51HbjZfHfp9Tnj7L7lUclfITl4fAGXuzIolP7qnZ5lKjX90S4lSFjk1ruzp6FcKte2WY4TkisJN52kRH445Y0yT5x00U3ffYOgi";
const URL = "https://api.stripe.com/v1/tokens";

const Iban = (props) => {
  const [id, setId] = useState('');
  const [anneeList, setAnneeList] = useState([]);
  const [state, setState] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  });

 // const [factureList, setFactureList] = useState(0);
  let factureList = 0

  function handleChange({ target: { name, value } }) {
    setState({
      ...state,
      [name]: value,
    });
  }

  useEffect(() => {
    let annee = [];
    for (let i = 2022; i >= 2013; i--) {
      annee.push(i);
    }
    setAnneeList(annee);

    axios.get(URL_API + "/api/user", {
      headers: httpServices.getAuthorization(),
    }).then((response) => {
      setId(response.data.id)
    }).catch((error) => {
      console.log(error, "err");
    });
  }, []);



  function senData() {
    const cardInfo = formatCreditCardDetails(state);
    const request = {
      headers: { Authorization: `Bearer ${PK}` },
      method: "POST",
    };
    return fetch(`${URL}?${cardInfo}&currency=eur`, request, {
      mode: "no-cors",
    })
      .then((res) => res.json())
      .then((res) => {
        axios.put(URL_API + `/api/testers/${id}/iban`, { "stripeToken": res?.id }, {
          headers: httpServices.getAuthorization(),
        })
          .then((response) => {
            toast.success("Carte ajoutée avec succès");
          })
          .catch((error) => {
            console.log(error, id, "err");
            // toast.error("une erreur s'est produite");

          });
      });
  }




  const handleAnnee = (e) => {
    console.log("annee");
  };


  const formatCreditCardDetails = ({ number, name, cvc, expiry }) => {
    const [month, year] = expiry.split("/");
    const card = {
      "card[number]": number,
      "card[exp_month]": month,
      "card[exp_year]": `20${year}`,
      "card[cvc]": cvc,
      "card[name]": name,
    };
    const cardInfo = Object.keys(card)
      .map((key) => key + "=" + card[key])
      .join("&");

    return cardInfo;
  };


  return (
    <React.Fragment>
      <div className="container_iban">
        <div className="iban_title"> Documents </div>
        <div className="container_iban__content">
          <div className="container_iban__left">
            <Row className="iban_form">
              <div className="iban_form_title">
                IBAN
              </div>
              <Col
                lg="6"
                md="6"
              >
                <div style={{ paddingTop: 0 }}>
                </div>
                <AvForm onSubmit={senData}>
                  <Col>
                    <div className="iban">
                      <Label className="iban_form_label">Titulaire de la carte*</Label>
                      <Input name="name" placeholder="Titulaire de la carte" onChange={handleChange} className="iban_input" />
                    </div>
                  </Col>
                  <Col>
                    <div className="iban">
                      <Label className="iban_form_label">N° de voie et rue*</Label>
                      <Input
                        name="number"
                        placeholder="N° de voie et rue"
                        onChange={handleChange}
                        className="iban_input"
                      />
                    </div>
                  </Col>
                  <Row className="iban_double">
                    <Col>
                      <div className="iban">
                        <Label className="iban_form_label">Code postal*</Label>
                        <Input name="cvc" placeholder="Code postal" onChange={handleChange} type="password" className="iban_input" />
                      </div>
                    </Col>
                    <Col>
                      <div className="iban">
                        <Label className="iban_form_label">Pays*</Label>
                        <Input
                          name="expiry"
                          placeholder="Pays"
                          onChange={handleChange}
                          className="iban_input"
                        />
                      </div>
                    </Col>
                  </Row>
                  <Col>
                    <div className="iban">
                      <Label className="iban_form_label">Numéro de la carte*</Label>
                      <Input
                        name="expiry"
                        placeholder="Numéro de la carte"
                        onChange={handleChange}
                        className="iban_input"
                      />
                    </div>
                  </Col>
                  <Row className="iban_double">
                    <Col>
                      <div className="iban">
                        <Label className="iban_form_label">Date d'expiration*</Label>
                        <Input
                          name="expiry"
                          placeholder="JJ/AAAA"
                          onChange={handleChange}
                          className="iban_input"
                        />
                      </div>
                    </Col>
                    <Col>
                      <div className="iban">
                        <Label className="iban_form_label">Cryptograme*</Label>
                        <Input
                          name="expiry"
                          placeholder="Cryptograme"
                          onChange={handleChange}
                          className="iban_input"
                        />
                      </div>
                    </Col>

                  </Row>
                  <Col md="12" lg="12" className="btn-iban-container">
                    <Button className="btn-iban">
                      Enregistrer
                    </Button>
                  </Col>
                </AvForm>
              </Col>
            </Row>

          </div>
          <div className="container_iban__right">
            <div className="iban_contrat">
              <div className="iban_contrat_title"> Mon contrat</div>
              <div className="iban_section">
                <div className="iban_contrat_content">
                  <img src={papier} alt="iban_papier" className="iban_img" />
                </div>
                <span className="iban_text" > Télécharger le contrat testeur </span>
              </div>
            </div>
            <div className="iban_info">
              <div className="iban_contrat_title"> Mes informations testeur </div>
              <div className="iban_section">
                <div className="iban_contrat_content">
                  <img src={userInfo} alt="iban_info" className="iban_img" />
                </div>
                <Link className="iban_text" to="/tester/infotester"> Mettre à jour en repassant le questionnaire </Link>
              </div>
            </div>
            <div className="iban_facture">
              <div className="iban_contrat_title">
                Mes factures
                <span className="iban_facture_annee">
                  <select onChange={handleAnnee} className="iban_facture_annee_select">
                    <option defaultValue="All" selected>Année</option>
                    {
                      anneeList.map((item, index) => {
                        return (
                          <option key={index} value={item}>{item}</option>
                        )
                      })
                    }
                  </select>
                </span>
              </div>
              <div className="iban_facture_section">
                {
                  factureList > 0 ?
                    <div className="iban_facture_section_client">
                      {
                        factureList.map((item, index) => {
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
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Iban;
