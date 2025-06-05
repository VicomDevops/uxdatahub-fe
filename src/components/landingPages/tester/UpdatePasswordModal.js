import React, { useState } from "react";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from "axios";
import {
  Modal,
  ModalBody,
  ModalHeader,
  Button,
  Row,
  Col,
  Label,
  FormGroup,
} from "reactstrap";

const UpdatePasswordModal = ({
  visible,
  toggleVisible,
  apiEndpoint,
  setVisible,
  getAuthorization,
}) => {

  const [password, setPassword] = useState({});
  const [error, setError] = useState("");
  const [valid, setValid] = useState("");

  const onChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };
  
  const verifyPassword = () => {
    if (password.newPassword !== password.confirmPassword) {
      return false;
    }else{
      return true;
    }
  }

  const handleSubmitFromPassword = (event, errors, values) => {
    if(errors.length === 0 ) {
      if(verifyPassword()) {
        //TODO: call api to update password
        const changePassword = { old_password: password.oldPassword, new_password: password.newPassword };
        axios.post(`${apiEndpoint}/api/changePassword`, changePassword , {
          headers: getAuthorization(),
        })
        .then((response) => {
          setValid("Le mot de passe a été modifié avec succès");
          setError("");
          setTimeout(() => {
            setVisible(false);
            setValid("");
            setPassword({});
          }, 1000);
        })
        .catch((error) => {
          console.log(error, "err");
          setError("Le mot de passe est incorrect. Veuillez réessayer.");
          setTimeout(() => {
            setError("");
          }, 2000);
        });
      } else {
        setError("Les mots de passes saisis ne sont pas identiques. Veuillez corriger votre saisie.");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
     }
  };


  return (
    <Modal
      isOpen={visible}
      className="modal-sm center-modal border-radius-20 justify-content-start align-items-start"
      toggle={toggleVisible}
    >
      <Row className="padding-modal" >
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
          className="d-flex flex-column align-items-center"
        >
          <strong className="modal_update_title_mdp"> Modifier mon mot de passe</strong>
          <AvForm onSubmit={handleSubmitFromPassword}
            className="pop-up-mdp-form">
            <Col>
              <div className="column-left">
                <Label className="pop-up-mdp-label">
                  Ancien mot de passe
                </Label>
                <AvField
                  type="password"
                  onChange={onChange}
                  name="oldPassword"
                  className="pop-up-mdp-input"
                  validate={{
                    required: { value: true, errorMessage: "Ce champ est obligatoire" },
                  }}
              /> 
              </div>
            </Col>

            <Col >
              <Label  className="pop-up-mdp-label">Nouveau mot de passe</Label>
              <AvField
                type="password"
                onChange={onChange}
                name="newPassword"
                className="pop-up-mdp-input"
                validate={{
                  required: { value: true, errorMessage: "Ce champ est obligatoire" },
                }}
              /> 
            </Col>
            <Col >
              <FormGroup className="column-left">
                <Label  className="pop-up-mdp-label">
                  Retaper le nouveau mot de passe
                </Label>
                <AvField
                  type="password"
                  onChange={onChange}
                  name="confirmPassword"
                  className="pop-up-mdp-input"
                  validate={{
                    required: { value: true, errorMessage: "Ce champ est obligatoire" },
                  }}
                />              
              </FormGroup>
            </Col>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                paddingBottom: 20,
              }}
            >
              <span style={{color : "red", fontSize : 12, marginBottom : ".5rem", textAlign : "center"}}> {error} </span>
              <span style={{color : "green", fontSize : 12, marginBottom : ".5rem", textAlign : "center"}}> {valid} </span>
            <Button className="btn-success btn-valider-profil">
              {" "}
              Modifier
            </Button>
      </div>
          </AvForm>
        </Col>
      </ModalBody>

    </Modal>
  );
};
export default UpdatePasswordModal;
