import React from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  Button,
  Col,
} from "reactstrap";
import Switch from "react-switch";
import Interrogation from "../../assets/interrogation.png";
const CustomModal = (props) => {
  const [visible, setVisible] = React.useState(true);
  const [checked, setChecked] = React.useState(true);
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [first, setFirst] = React.useState(false);
  const [second, setSecond] = React.useState(false);
  const [third, setThird] = React.useState(false);
  function handleChange(checked) {
    setChecked(checked);
  }
  function handleChange1(checked1) {
    setChecked1(checked1);
  }
  function handleChange2(checked2) {
    setChecked2(checked2);
  }
  function handleClose() {
    setVisible(!visible);
  }
  function toggleFirst() {
    setFirst(!first);
  }
  function toggleSecond() {
    setSecond(!second);
  }
  function toggleThird() {
    setThird(!third);
  }
  function handleAccept() {
    setChecked1(true);
    setChecked2(true);
    setTimeout(() => {
      props?.toggleVisible();
    }, 2000);
  }
  return (
    <Modal
      isOpen={props?.visible}
      className="modal-xl center-modal "
      toggle={props?.toggleVisible}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Col md="6" sm="6" lg="6" className="p-3 d-flex justify-content-start">
          <span style={{ fontSize: 30 }}>Paramétres des cookies.</span>
        </Col>
        <Col md="6" sm="6" lg="6" className="p-2 d-flex justify-content-end">
          <Button
            onClick={props?.toggleVisible}
            style={{ backgroundColor: "white", borderColor: "white" }}
          >
            <span style={{ color: "black" }}>X</span>
          </Button>
        </Col>
      </div>

      <ModalBody>
        <Col
          md="12"
          lg="12"
          className="d-flex flex-column justify-content-space-around"
        >
          <span className="font-weight-300 font-small-3">
            Lorsque vous visitez l'un de nos sites Web, il peut stocker ou
            récupérer des informations sur votre navigateur, principalement sous
            la forme de cookies. Ces informations peuvent concerner vous, vos
            préférences ou votre appareil et sont principalement utilisées pour
            que le site fonctionne comme vous l'attendez. Les informations ne
            vous identifient généralement pas directement, mais elles peuvent
            vous offrir une expérience Web plus personnalisée. Parce que nous
            respectons votre droit à la vie privée, vous pouvez choisir de ne
            pas autoriser certains types de cookies. Cliquez sur les différentes
            rubriques des catégories pour en savoir plus et gérer vos
            préférences. Veuillez noter que le blocage de certains types de
            cookies peut avoir un impact sur votre expérience du site et des
            services que nous sommes en mesure d'offrir.
          </span>
          <div
            style={{
              marginTop: 20,
              display: "flex",
              justifyContent: "space-around",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: 12, fontWeight: "bold" }}>
                  Strictement nécessaires
                </span>
                <div
                  style={{ paddingLeft: 10 }}
                  onClick={() => {
                    toggleFirst();
                  }}
                >
                  <img
                    style={{
                      height: 20,
                      width: 20,
                      resizeMode: "contain",
                    }}
                    src={Interrogation}
                    alt=""
                  />
                </div>
              </div>
              <label>
                <Switch
                  onChange={handleChange}
                  checked={checked}
                  disabled={true}
                />
              </label>
            </div>
            {first && (
              <span style={{ fontSize: 11, fontWeight: "bold", color: "gray" }}>
                Ces cookies sont nécessaires au bon fonctionnement de notre site
                Web et ne peuvent pas être désactivés dans nos systèmes. Ils ne
                sont généralement définis qu'en réponse à des actions de votre
                part qui équivalent à une demande de services, telles que la
                définition de vos préférences de confidentialité, la connexion
                ou le remplissage de formulaires ou lorsqu'elles sont
                essentielles pour vous fournir un service que vous avez demandé.
                Vous ne pouvez pas désactiver ces cookies. Vous pouvez
                configurer votre navigateur pour bloquer ou vous alerter sur ces
                cookies, mais si vous le faites, certaines parties du site ne
                fonctionneront pas. Ces cookies ne stockent aucune information
                personnellement identifiable.
              </span>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: 12, fontWeight: "bold" }}>
                  Cookies de performance
                </span>
                <div
                  style={{ paddingLeft: 9 }}
                  onClick={() => {
                    toggleSecond();
                  }}
                >
                  <img
                    style={{
                      height: 20,
                      width: 20,
                      resizeMode: "contain",
                    }}
                    src={Interrogation}
                    alt=""
                  />
                </div>
              </div>
              <label>
                <Switch onChange={handleChange1} checked={checked1} />
              </label>
            </div>
            {second && (
              <span style={{ fontSize: 11, fontWeight: "bold", color: "gray" }}>
                Ces cookies nous permettent de compter les visites et les
                sources de trafic afin de mesurer et d'améliorer les
                performances de notre site. Ils nous aident à savoir quelles
                pages sont les plus et les moins populaires et à voir comment
                les visiteurs se déplacent sur le site, ce qui nous aide à
                optimiser votre expérience. Toutes les informations collectées
                par ces cookies sont agrégées et donc anonymes. Si vous
                n'autorisez pas ces cookies, nous ne pourrons pas utiliser vos
                données de cette manière.
              </span>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: 12, fontWeight: "bold" }}>
                  Cookies fonctionnels
                </span>
                <div
                  style={{ paddingLeft: 28 }}
                  onClick={() => {
                    toggleThird();
                  }}
                >
                  <img
                    style={{
                      height: 20,
                      width: 20,
                      resizeMode: "contain",
                    }}
                    src={Interrogation}
                    alt=""
                  />
                </div>
              </div>
              <label>
                <Switch onChange={handleChange2} checked={checked2} />
              </label>
            </div>
            {third && (
              <span style={{ fontSize: 11, fontWeight: "bold", color: "gray" }}>
                Ces cookies permettent au site Web de fournir des
                fonctionnalités et une personnalisation améliorées. Ils peuvent
                être définis par nous ou par des fournisseurs tiers dont nous
                avons ajouté les services à nos pages. Si vous n'autorisez pas
                ces cookies, certains ou tous ces services peuvent ne pas
                fonctionner correctement.
              </span>
            )}
          </div>
        </Col>
      </ModalBody>
      <ModalFooter
        style={{
          display: "flex -webkit-box -moz-box -ms-flexbox -webkit-flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
      >
        <Button onClick={handleAccept} className="btn-secondary">
          {" "}
          Accepter tous les cookies.
        </Button>
        <Button onClick={handleClose} className="btn-success">
          {" "}
          Confirmer mes choix.
        </Button>
      </ModalFooter>
    </Modal>
  );
};
export default CustomModal;
