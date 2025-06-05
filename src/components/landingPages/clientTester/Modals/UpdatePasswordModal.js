/**
 * React import
 */
import React, { useState } from "react";

/**
 * Libraries import
 **/
import { toast } from "react-toastify";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Modal, ModalBody, ModalHeader, Row, Col, Label,  FormGroup } from "reactstrap";

/**
 * Services import
 */
import userServices from "../../../../services/userServices";

/**
 * Component import
 */
import LoaderButton from "../../../common/loaders/LoaderButton";

const UpdatePasswordModal = ({ visible, toggleVisible, setVisible }) => {

  /* HOOKS */
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* FUNCTIONS */
  
  /**
   * Function to verify if the new password matches the confirmed password.
   *
   */
  const verifyPassword = (newPassword, confirmPassword) => {
    if (newPassword !== confirmPassword) {
      return false;
    }else{
      return true;
    }
  }

  /**
   * Handles form submission for password.
   *
  */
  const handleSubmitFromPassword = async (event, errors, values) => {
    let password = values;
    if(errors.length === 0 ) {
      if(verifyPassword(password.newPassword, password.confirmPassword)) {
        const changePassword = { old_password: password.oldPassword, new_password: password.newPassword };
        try {
          setLoading(true);
          const response = await userServices.updateClientTesterPassword(changePassword);
          if(response?.header?.code !== 200){
            toast.error(response?.header?.message)
          }else{
            toast.success(response?.header?.message)
            setVisible(false);
          }
          setLoading(false);
        } catch (error) {
          console.log("Error",error);
        }
      } else {
        setError("Les mots de passes saisis ne sont pas identiques. Veuillez corriger votre saisie.");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
     }
  };

  /* RENDER */
  return (
    <Modal isOpen={visible}  toggle={toggleVisible} className="modal-sm center-modal border-radius-20 justify-content-start align-items-start" >
     
      <Row className="padding-modal" >
        <Col md="12" sm="12"lg="12"className="p-2 d-flex justify-content-end height-X" >
        <ModalHeader toggle={toggleVisible} charCode="x"></ModalHeader>
        </Col>
      </Row>

      <ModalBody>
        <Col md="12" lg="12" className="d-flex flex-column align-items-center" >
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
                  name="confirmPassword"
                  className="pop-up-mdp-input"
                  validate={{
                    required: { value: true, errorMessage: "Ce champ est obligatoire" },
                  }}
                />              
              </FormGroup>
            </Col>
            <div className="modalUpdatePasswordFooter">
              {
                error ? <div className="error mb-3 text-center">{error}</div> : null
              }
              <LoaderButton className="btn-success btn-valider-profil" loading={loading} name="Modifier" />
            </div>
          </AvForm>
        </Col>
      </ModalBody>

    </Modal>
  );
};
export default UpdatePasswordModal;
