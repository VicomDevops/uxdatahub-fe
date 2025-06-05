import React, {useState} from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  Button,
  Col,
} from "reactstrap";
import ContractModal from "./ContractModal";
import { Link } from "react-router-dom";

const CustomModal = ({ show, children }) => {
  
  const [visible, setVisible] = useState(true);
  const [visible1, setVisible1] = useState(false);

  function handleClose() {
    setVisible(!visible);
  }

  function handleClose1() {
    setVisible1(!visible1);
  }

  
  return (
    <React.Fragment>
      <ContractModal visible={visible1} handleClose={handleClose1} />
      <Modal
        isOpen={visible}
        className="modal-xl"
        //  className="center-modal modal-xl"
        toggle={handleClose}
      >
        <Col md="12" sm="12" lg="12" className="p-2 d-flex justify-content-end">
          <Button onClick={handleClose}>
            <span>X</span>
          </Button>
        </Col>

        <ModalBody>
          <Col
            md="12"
            lg="12"
            className="d-flex flex-column justify-content-space-around pl-5"
          >
            <span style={{ fontWeight: "bold", fontSize: 25 }}>Bienvenue</span>
            <div style={{paddingTop:10, paddingBottom:10}}>
            <span style={{ fontWeight: "bold", color: "green" }}>
              N'hésite pas à completer ton profil
            </span>
            </div>
            <span>3 informations importantes pour toi :</span>

            <span className="font-weight-500">
              <span style={{ fontSize: 25 }}>1.</span> Tu dois signer le contrat
              de testeur, un accord entre toi et Insight Data pour assurer une
              collaboration transparente et de bonne foi.
            </span>
            <div style={{ width: 300, paddingLeft: 40, paddingTop:10, paddingBottom:10}}>
              <div
                style={{
                  display: "flex",
                  backgroundColor: "#00A359",
                  height: 40,
                  width: 300,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  cursor : "pointer"
                }}
                onClick={() => {
                  handleClose1();
                }}
              >
                <span style={{ color: "white", fontWeight: "bold" }}>
                  Voir le contrat{" "}
                </span>
              </div>
            </div>

            <span className="font-weight-500">
              <span style={{ fontSize: 25 }}>2.</span> Tu dois obligatoirement
              renseigner un moyen de paiement pour que l'on puisse te créditer
              les gratifications des tests que tu passes.
            </span>
            <div style={{ width: "60%", paddingLeft: 40 , paddingTop:10, paddingBottom:10}}>
              <Link
                style={{
                  display: "flex",
                  backgroundColor: "#00A359",
                  height: 40,
                  width: 300,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  cursor : "pointer",
                  textDecoration: "none"
                }}
                to="/tester/iban"
                onClick={handleClose}
              >
                <span style={{ color: "white", fontWeight: "bold"}}>
                  Renseigner mes coordonnées
                </span>
              </Link>
            </div>

            <span className="font-weight-500">
              <span style={{ fontSize: 25 }}>3.</span> Tu as la possibilité de
              compléter ton profil. Plus ton profil est détaillé , plus tu
              reçois des sollicitations de test rénumérés.
            </span>
            <div
              style={{
                width: "60%",
                display: "flex",
                flexDirection: "row",
                paddingLeft: 40,
                paddingTop:10, paddingBottom:10
              }}
            >
              <Link
                style={{
                  display: "flex",
                  backgroundColor: "#00A359",
                  height: 40,
                  width: 300,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  cursor : "pointer",
                  textDecoration: "none"
                }}
                to={`/tester/profile`}
                onClick={handleClose}
              >
                {" "}
                <span style={{ color: "white", fontWeight: "bold"}}>
                  Compléter mon profil{" "}
                </span>
              </Link>
            </div>
          </Col>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleClose} className="btn-secondary">
            {" "}
            Plus tard
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};
export default CustomModal;
