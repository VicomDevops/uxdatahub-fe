import React from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { Button, Col, Input } from "reactstrap";
const PK =
  "pk_test_51HjPv9KOBtcgnDN9xsWV1dB9hp0vrGz66oLxbPYDuv6299QasmeFEBJdtlYUxkaOVv46oSjeOiIqErDCosHNgUb200jvmtKcoO";
const URL = "https://api.stripe.com/v1/tokens";
export default function PaymentForm() {
  const [state, setState] = React.useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  });
  function handleChange({ target: { name, value } }) {
    setState({
      ...state,
      [name]: value,
    });
  }
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
      .then(() => {

      });
  }
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
    <div id="PaymentForm">
      <div>
        <Col>
          <Input
            name="number"
            value={state?.number}
            placeholder="Numero de carte"
            onChange={handleChange}
          />
        </Col>
        <Col>
          <Input name="cvc" placeholder="CVC" onChange={handleChange} />
        </Col>
        <Col>
          <Input name="expiry" placeholder="12/24" onChange={handleChange} />
        </Col>
        <Col>
          <Input name="name" placeholder="Nom" onChange={handleChange} />
        </Col>
        <Button color="success" onClick={senData}>
          Envoyer
        </Button>
      </div>
    </div>
  );
}
