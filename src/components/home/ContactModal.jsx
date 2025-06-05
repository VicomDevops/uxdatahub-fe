import React from "react";

import {
  Modal,
  ModalBody,
  Row,  
  Col,
  ModalHeader,
} from "reactstrap";

const ContactModal = ({
  visible,
  toggleVisible
}) => {


  
  return (
    <Modal
      isOpen={visible}
      className="modal-md start-modal"
      toggle={toggleVisible}
    >
      <Row className="padding-modal">
        <Col
          md="12"
          sm="12"
          lg="12"
          className="p-1 d-flex justify-content-end height-X"
        >
        <ModalHeader toggle={toggleVisible} charCode="x"></ModalHeader>
        </Col>
      </Row>

      <ModalBody style={{ height: "38rem", width : "100%"}}>
        <Col
          md="12"
          lg="12"
          className="d-flex flex-column align-items-center">
          <strong className="modal_payAsYouGo_title">Pay As You Go</strong>
            
        </Col> 
      </ModalBody>
    </Modal>
  );
};
export default ContactModal;
