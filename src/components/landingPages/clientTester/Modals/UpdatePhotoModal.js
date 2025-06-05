//REACT IMPORT
import React, { useState } from "react";
//SERVICE IMPORT
import userServices from "../../../../services/userServices";
//LIBRARY IMPORT
import Avatar from "react-avatar";
import { toast } from "react-toastify";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Modal, ModalBody, Row, Label, Col, ModalHeader } from "reactstrap";
import ImageDecoder from "../../../common/ImageDeoder";
//COMPONENT IMPORT
import LoaderButton from "../../../common/loaders/LoaderButton";

/**
 * UpdatePhotoModal component function.
 *
 * @param {object} visible - the visibility of the modal
 * @param {function} toggleVisible - function to toggle the visibility of the modal
 * @param {object} user - user object
 * @param {object} image - image object
 * @param {function} setImage - function to set the image
 * @param {function} setVisible - function to set the visibility of the modal
 * @return {JSX.Element} the modal component
*/
const UpdatePhotoModal = ({ visible, toggleVisible, user, setVisible, setUserModified }) => {

  //HOOKS
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //FUNCTIONS
  const onchangeFile = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmitImageForm = async (event, errors, values) => {
    if(image === null) {
      setError("Veuillez choisir une image");
      setTimeout(() => {
        setError("");
        setImage(null);
      }, 2000);
    }else{
      setLoading(true);
      const formData = new FormData();
      formData.append("img", image);
      const response = await userServices.saveClientTesterImage(formData);
      if (response?.header?.code !== 200) {
        toast.error(response?.header?.message);
      }else{
        toast.success(response?.header?.message);
        setVisible(!visible);
        setUserModified(true);
        setImage(null);
      }
      setLoading(false);
    } 
  };

  //RENDER
  return (
    <Modal isOpen={visible} toggle={toggleVisible} className="modal-sm center-modal justify-content-start align-items-start" >
      
      <Row className="padding-modal">
        <Col md="12" sm="12" lg="12" className="p-2 d-flex justify-content-end height-X" >
        <ModalHeader toggle={toggleVisible} charCode="x"></ModalHeader>
        </Col>
      </Row>

      <ModalBody>
        <Col md="12"lg="12" className="d-flex flex-column align-items-center" >
          <strong className="modal_update_title">Modifier ma photo</strong>
          <AvForm>
            <div className="d-flex flex-column align-items-center">
              {
                user?.profileImage ? (
                  <div className="profile_model_img">
                    <ImageDecoder base64Image={user?.profileImage} alt="profileImage" className="profileImage" />
                  </div>
                )
                : (
                  <Avatar size="100" name={user?.name + " " + user?.lastname} color="#00A359" round={true} />
                )
              }
            </div>
            <div className="d-flex flex-column align-items-center mb-2 mt-1">
              <span className="updatePhotoText">Photo actuelle</span>
            </div>
            <Label id="file" className="profile-btn">Télécharger une nouvelle photo
              <AvField name="image" type="file" id="file"onChange={onchangeFile} accept="image/*"
                validate={{
                    required: { value: true, errorMessage: "Ce champ est obligatoire" },
                }}
              />
            </Label>
            <div className="modalUpdatePhotoFooter">
              {
                error && <div className="error mb-3">{error}</div>
              }
              <LoaderButton 
                loading={loading} 
                name="Modifier ma photo" 
                className="btn-success btn-valider-profil" 
                onClick={handleSubmitImageForm} 
              />
            </div>
          </AvForm>
        </Col>
      </ModalBody>
      
    </Modal>
  );
};


export default UpdatePhotoModal;
