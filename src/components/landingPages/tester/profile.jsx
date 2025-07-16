import React, {useState, useEffect, useCallback} from "react";
import { Label, Col, Row, Button } from "reactstrap";
import Avatar from "react-avatar";
import './profileTest.css';
import { AvForm, AvField} from 'availity-reactstrap-validation';
import http from "../../../services/httpServices";
import { URL_API } from "../../../config.json";
import { Link } from "react-router-dom";
import UpdatePhotoModal from "./UpdatePhotoModal";
import UpdatePasswordModal from "./UpdatePasswordModal";
import SupprimeCompteModal from "./SupprimeCompteModal";
import { toast } from 'react-toastify';
import userServices from "../../../services/userServices";

http.setToken();


const Profile = () => {

  const [user, setUser] = useState({});
  const [currentuser, setCurrentUser] = useState({});
  const [visible, setVisible] = useState(false);
  const [visibleModalPhoto, setVisibleModalPhoto] = useState(false);
  const [visibleModalSupprimerCompte, setVisibleModalSupprimerCompte] = useState(false);
  const domain = 'http://uxdatahub.com/2m';
  const imgUri = user?.data?.profileImage?.split("2m")
  const imageUrl = imgUri && domain.concat(imgUri[1])


  const getCurrentUser = useCallback(async () => {
    const response = await getCurrentUser();
    if(response.header.code !== 200){
      return toast.error(response.header.message)
    }else {
      setUser(response);
    }
  }, []);
  
  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);


  
  function toggleVisible(visible) {
    setVisible(!visible);
  }

  const toggleVisibleModalPhoto = (visibleModalPhoto) => {
    setVisibleModalPhoto(!visibleModalPhoto);
  };

  const toggleVisibleModalSupprimerCompte = (visibleModalSupprimerCompte) => {
    setVisibleModalSupprimerCompte(!visibleModalSupprimerCompte);
  };




  const onChange = (e) => {
    setCurrentUser({ ...currentuser, [e.target.name]: e.target.value });
  };


  const handleSubmitFrom = (event, errors, values) => {
    if(errors.length === 0){
      let id = user?.data?.id
      const response = userServices.updateTester(id, currentuser);
      if(response?.header?.code !== 200){
        toast.error(response?.header?.message)
      }else{
        toast.success(response?.header?.message)
      }
    };
  }



  return (
    <>
      <div className="profil_tester_container">
        <div className="profile_title">
          <span className="welcome-text">
              Modifier mon profil
          </span>
        </div>
      <Row className="client-tester-profile" style={{display : "flex", alignItems:"flex-start"}}>
      <Col lg="3" md="3" className="main  card-padding-top profil_card">
          {
              user?.data?.profileImage ? (
                <div className="profile_img">
                  <div style={{width : 100, height: 100}}>
                    <img
                      src={imageUrl}
                      alt="profileImage"
                      className="profileImage"
                    />
                  </div>
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
          <div className="d-flex flex-column text-padding-top">
            <span className="font-medium-2 font-weight-600">
              {" "}
              {user?.data?.name + " " + user?.data?.lastname}
            </span>
            {/* <span>{user?.data?.country}</span>
            <span>{user?.data?.email}</span> */}
          </div>
          <div></div>
          <Col
            md="12"
            lg="12"
            className="d-flex justify-content-center align-items-center mt-3"
          >
            <div onClick={() => toggleVisibleModalPhoto()} className="profile-btn">Modifier ma photo</div>
          </Col>
          <Col>
            <div onClick={() => toggleVisible()} className="profile-btn">
              Modifier mon mot de passe
            </div>
          </Col>
          <Col>
            <div className="profile-btn">
              Modifier mon consentement
            </div>
          </Col>
          <Col className="d-flex justify-content-center align-items-center">
            <div onClick={() => toggleVisibleModalSupprimerCompte()} className="profile-btn">
              Supprimer mon compte
            </div>
          </Col>
        </Col>
        <Col lg="7" md="7" className="espace main" >
          <AvForm onSubmit={handleSubmitFrom}>
            <Row>
              <Col>
                <div className="column-left">
                  <Label>Prénom</Label>
                  <AvField
                    value={user?.data?.name}
                    type="text"
                    onChange={onChange}
                    name="name"
                    className="profile_input_tester"
                    validate={{
                      required: { value: true, errorMessage: "Ce champ est obligatoire" },
                      pattern: { value: "^[a-zA-Z ]{1,50}$", errorMessage: "Les chiffres et les caractéres speciaux ne sont pas autorisé" }
                    }}
                  /> 
                </div>
              </Col>
              <Col>
                <div className="column-left">
                  <Label>Nom</Label>
                    <AvField
                      value={user?.data?.lastname}
                      type="text"
                      onChange={onChange}
                      name="lastname"
                      className="profile_input_tester"
                      validate={{
                        required: { value: true, errorMessage: "Ce champ est obligatoire" },
                        pattern: { value: "^[a-zA-Z ]{1,50}$", errorMessage: "Les chiffres et les caractéres speciaux ne sont pas autorisé" }
                      }}
                />
                </div>
              </Col>
            </Row>
            <Row style={{ paddingTop: 20 }}>
              <Col>
                <div className="column-left">
                  <Label>Email</Label>
                  <AvField
                    value={user?.data?.email}
                    type="text"
                    onChange={onChange}
                    name="email"
                    className="profile_input_tester"
                    id="xxx"
                    validate={{
                      required: { value: true, errorMessage: "Ce champ est obligatoire" },
                      pattern: { value: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$', errorMessage: "Cette adresse mail n'est pas valide" },
                    }}
                  />  
                </div>
              </Col>
              <Col>
                <div className="column-left">
                  <Label>Téléphone</Label>
                  <AvField
                    value={user?.data?.phone}
                    type="number"
                    onChange={onChange}
                    name="phone"
                    className="profile_input_tester"
                    id="xxx"
                    validate={{
                      required: { value: true, errorMessage: "Ce champ est obligatoire" },
                      pattern: { value: "^[0-9]{8}$", errorMessage: "Le numéro de téléphone doit contenir 8 chiffres" }
                    }}
                  />  
                </div>
              </Col>
            </Row>
            <Row style={{ paddingTop: 20 }}>
              <Col>
                <div className="column-left">
                  <Label>Pays</Label>
                  <AvField
                    value={user?.data?.country}
                    type="text"
                    onChange={onChange}
                    name="country"
                    className="profile_input_tester"
                    validate={{
                      required: { value: true, errorMessage: "Ce champ est obligatoire" },
                      pattern: { value: "^[a-zA-Z ]{1,50}$", errorMessage: "Les chiffres et les caractéres speciaux ne sont pas autorisé" }
                    }}
                  /> 
                </div>
              </Col>
              <Col>
                <div className="column-left">
                  <Label>Ville</Label>
                  <AvField
                    value={user?.data?.city}
                    type="text"
                    onChange={onChange}
                    name="city"
                    className="profile_input_tester"
                    validate={{
                      required: { value: true, errorMessage: "Ce champ est obligatoire" },
                      pattern: { value: "^[a-zA-Z ]{1,50}$", errorMessage: "Les chiffres et les caractéres speciaux ne sont pas autorisé" }
                    }}
                  />   

                  
                </div>
              </Col>
            </Row>
            <Col
              md="12"
              lg="12"
              className="d-flex justify-content-end no-margin no-padding"
            >
              <Button className="btn-success" 
                style={{ 
                  height : "2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              > 
                Enregistrer
              </Button>
            </Col>
            <Link to={`/tester/infotester`}>
              <span 
              style={{
                fontWeight:'bold', 
                fontSize:18, 
                color:"#00A359", 
                textDecoration: "underline",
                display: "flex",
                marginTop: "2rem",
              }}>
              Accedér au questionnaire sur mes informations testeur.{" >"}
              </span>
              </Link>
          </AvForm>
        </Col>
      </Row>
      <UpdatePhotoModal 
        user={user} 
        visible={visibleModalPhoto} 
        setVisible={setVisibleModalPhoto}
        URL_API={URL_API} 
        toggleVisible={toggleVisibleModalPhoto} 
      />
      <UpdatePasswordModal 
        user={user} 
        setVisible={setVisible}
        URL_API={URL_API} 
        visible={visible} 
        toggleVisible={toggleVisible} 
      />
      <SupprimeCompteModal user={user} visible={visibleModalSupprimerCompte} toggleVisible={toggleVisibleModalSupprimerCompte} />
      </div>
    </>
  );
};
export default Profile;
