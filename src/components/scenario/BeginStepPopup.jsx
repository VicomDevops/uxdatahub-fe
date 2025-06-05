import React from "react";
import {
  Modal, ModalBody, Button, Row, Col,
} from "reactstrap";

const BeginStepPopup = ({ open, toggle, nextPage }) => {

  return (
    <Modal
      isOpen={open}
      className="modal-xl center-modal border-radius-20 justify-content-start align-items-start"
      toggle={toggle}
      backdrop="static"
    >
      <Row className="padding-modal">
        <Col
          md="12"
          sm="12"
          lg="12"
          className="p-2 d-flex justify-content-end height-X"
        >
        </Col>
      </Row>
      <ModalBody>
        <div>
          <span className='step__init '>
            Vous pouvez démarrer la création de votre scénario, qui se résume en un ensemble d’étapes.
          </span>
          <p className='step__init__body mt-4'>
            Les étapes peuvent être des questions ouvertes sous forme de tâches :
            <br />"Trouvez les différents moyens de contact des utilisateurs."
          </p>
          <p className='step__init__body'>
            Ou encore des questions plus précises :
            <br />"Comment évaluez-vous la simplicité à commander un produit sur ce site internet ? "
          </p>
          <p className='step__init__body'>Bonne création de scénario.</p>

          <div style={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column' }}>
            <Button className='go' onClick={nextPage}>Commencer</Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default BeginStepPopup;

