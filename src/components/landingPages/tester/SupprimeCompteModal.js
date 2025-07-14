import React from "react";
import {
  Modal,
  ModalBody,
  Button,
  Row,
  Col,
  ModalHeader
} from "reactstrap";

const SupprimeCompteModal = ({
  visible,
  toggleVisible,
}) => {
  return (
    <Modal
      isOpen={visible}
      className="modal-sm center-modal align-items-start"
      toggle={toggleVisible}
    >
      <Row className="padding-modal">
      <Col
            md="12"
            sm="12"
            lg="12"
            className="p-2 d-flex justify-content-end height-X"
          >
        <ModalHeader toggle={toggleVisible} charCode="x"></ModalHeader>
        </Col>
      </Row>

      <ModalBody>
        <Col
          md="12"
          lg="12"
          className="d-flex flex-column justify-content-space-around align-items-center"
        >
            <strong className="modal_update_title">Supprimer mon compte </strong>
            <p className="pop-up-supp-text">
                En cliquant sur "Supprimer mon compte", alors, votre compte sera supprimé dans un délai de 10 jours.
            </p>
            {" "}
            <p className="pop-up-supp-text">
                Toutes les informations que vous avez transmises seront alors supprimées de la base de données UX DATAHUB.
            </p>
        </Col>
      </ModalBody>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 20,
        }}
      >
        <Button onClick={toggleVisible} className="btn-success btn-valider-profil">
          {" "}
          Je supprime mon compte{" "}
        </Button>
      </div>
    </Modal>
  );
};
export default SupprimeCompteModal;
