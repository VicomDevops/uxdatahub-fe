import React, {  useState } from "react";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import Avatar from "react-avatar";
import axios from "axios";
import {
  Modal,
  ModalBody,
  Button,
  Row,
  Label,
  Col,
  ModalHeader,
} from "reactstrap";

const UpdatePhotoModal = ({
  visible,
  toggleVisible,
  user,
  apiEndpoint,
  setVisible,
  getAuthorization
}) => {

  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [valid, setValid] = useState("");
  const domain = 'https://api-prex.insightdata.fr/2m';
  const imgUri = user?.data?.profileImage?.split("2m")
  const imageUrl = imgUri && domain.concat(imgUri[1])
  const onchangeFile = (e) => {
    setImage(e.target.files[0]);
  };


  const handleSubmitImageForm = (event, errors, values) => {

      if(image === null) {
        setError("Veuillez choisir une image");
        setTimeout(() => {
          setError("");
          setImage(null);
        }, 2000);
      }else{
        const formData = new FormData();
        formData.append('profileImage', image);
        axios.post(`${apiEndpoint}/api/testers/profile-image/${user?.data?.id}`, formData, {
          headers: getAuthorization(),
        })
        .then((response) => {
          setValid("Image modifiée avec succès");
          setTimeout(() => {
            setVisible(false);
            setValid("");
            setImage(null);
          }, 2000);
        })
        .catch((error) => {
          console.log(error, "err");
          setError("Une erreur est survenue");
          setImage(null);
          setTimeout(() => {
            setError("");
          }, 2000);
        });
    }
  };

  
  return (
    <Modal
      isOpen={visible}
      className="modal-sm center-modal justify-content-start align-items-start"
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
          className="d-flex flex-column align-items-center">
          <strong className="modal_update_title">Modifier ma photo</strong>
          <AvForm>
            <div className="d-flex flex-column align-items-center">
                {
                    user?.data?.profileImage ? (
                      <div style={{width : 100, height: 100}}>
                        <img
                          src={imageUrl}
                          alt="profileImage"
                          className="profileImage"
                        />
                      </div>
                    ) : (
                      <Avatar
                        size="100"
                        name={user?.data?.name + " " + user?.data?.lastname}
                        color="#00A359"
                        round={true}
                      />
                    )
                }
            </div>
            <div className="d-flex flex-column align-items-center mb-2 mt-1">
              <span className="updatePhotoText">Photo actuelle</span>
            </div>
            <Label id="file" className="profile-btn">Télécharger une nouvelle photo
              <AvField name="profileImage" 
                type="file"
                id="file"
                onChange={onchangeFile}
                accept="image/*"
                validate={{
                    required: { value: true, errorMessage: "Ce champ est obligatoire" },
                }}
              />
            </Label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                paddingTop: 10,
                paddingBottom: 20,
              }}
            >
              <span style={{color : "red", fontSize : 12, marginBottom : ".5rem"}}> {error} </span>
              <span style={{color : "green", fontSize : 12, marginBottom : ".5rem"}}> {valid} </span>
              <Button onClick={handleSubmitImageForm} className="btn-success btn-valider-profil">
                {" "}
                Valider
              </Button>
            </div>
          </AvForm>
        </Col>
      </ModalBody>

    </Modal>
  );
};
export default UpdatePhotoModal;
