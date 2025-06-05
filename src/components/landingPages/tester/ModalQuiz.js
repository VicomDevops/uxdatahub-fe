import React, { useEffect, useState } from "react";
import Logo from "../../../assets/logo-vector.svg";

import {
  Modal,
  ModalBody,
  ModalFooter,
  Button,
  Row,
  Col,
} from "reactstrap";

const useAudio = (url) => {
  const [audio] = useState(
    new Audio("https://www.kozco.com/tech/organfinale.wav")
  );
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

const ModalQuiz = ({ show, children, url }) => {
  const [visible, setVisible] = React.useState(true);
 

  function handleClose() {
    setVisible(!visible);
  }
  return (
    <Modal
      isOpen={visible}
      className="modal-xl center-modal"
      toggle={handleClose}
    >
      <Row className="padding-modal">
        <Col md="6" sm="6" lg="6" className="p-2 d-flex justify-content-start">
          <img style={{ maxWidth: "170px" }} src={Logo} alt="Logo" />
        </Col>
        <Col
          md="6"
          sm="6"
          lg="6"
          className="p-2 d-flex justify-content-end height-X"
        >
          <Button onClick={handleClose}>
            <span>X</span>
          </Button>
        </Col>
      </Row>

      <ModalBody>
        <Col
          md="12"
          lg="12"
          className="d-flex flex-column justify-content-space-around"
        >
          <strong>Bienvenue..</strong>
          <span>
            Ne vous inquiétez pas, c’est bien le site, le produit, ou encore le
            service qui est analysé, et non vous. Il n’y a pas de mauvaise
            réponse ou de mauvaise action, le but est de collecter vos
            ressentis. Vous pouvez donc nous dire tout ce qui vous passe par la
            tête.
          </span>
          <span>
            Veuillez simplement suivre ces quelques brèves instructions :
          </span>
          <div style={{ display: "flex", paddingLeft: 20 }}>
            <span className="font-weight-600">
              - Il n’y a pas la possibilité de revenir en arrière lorsque vous
              avez validé une réponse.
            </span>
          </div>
          <div style={{ display: "flex", paddingLeft: 20 }}>
            <span className="font-weight-600">
              - Attention à bien vérifier le fonctionnement de votre caméra et
              votre microphone afin que nous puissions analyser l’ensemble de
              vos retours.
            </span>
          </div>
          <span>
            Merci d’avance pour votre participation et bonne expérience de test
            !
          </span>
        </Col>
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleClose} className="btn-success">
          {" "}
          Fermer
        </Button>
      </ModalFooter>
    </Modal>
  );
};
export default ModalQuiz;
