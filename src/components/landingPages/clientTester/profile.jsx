/**
 * React import
 */
import React, { useState, useEffect, useCallback } from "react";

/**
 * Services import
 */
import userServices from "../../../services/userServices";

/**
 * Libraries import
 */
import Avatar from "react-avatar";
import { toast } from "react-toastify";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Label, Col, Row, Button } from "reactstrap";

/**
 * Components import
 */
import UpdatePhotoModal from "./Modals/UpdatePhotoModal";
import UpdatePasswordModal from "./Modals/UpdatePasswordModal";
import SupprimeCompteModal from "./Modals/SupprimeCompteModal";
import ImageDecoder from "../../common/ImageDeoder";


/**
 * Styles
 */
import "./profile.css";

/**
 * Fetches the connected user and updates the state with the response.
 *
*/
const ProfileCT = () => {

  /* HOOKS */
  const [user, setUser] = useState({});
  const [visible, setVisible] = useState(false);
  const [visibleModalPhoto, setVisibleModalPhoto] = useState(false);
  const [visibleModalSupprimerCompte, setVisibleModalSupprimerCompte] = useState(false);
  const [userModified, setUserModified] = useState(true);
  const [email, setEmail] = useState("")



  /* FUNCTIONS */
  const getConnectedUser = useCallback(async () => {
    try {
      let response = await userServices.getCurrentUser();

      if(response?.phone?.startsWith("+")){
        response = { ...response, phone: `${response?.phone.substr(1)}` };
      }
      
      setUser(response);
      setUserModified(false);
    } catch (error) {
      console.log("Error", error);
    }
  }, []);


  useEffect(() => {
    if (userModified) {
      getConnectedUser();
    }
  }, [userModified, getConnectedUser]);

  function toggleVisible(visible) {
    setVisible(!visible);
  }

  const toggleVisibleModalPhoto = (visibleModalPhoto) => {
    setVisibleModalPhoto(!visibleModalPhoto);
  };

  const toggleVisibleModalSupprimerCompte = (visibleModalSupprimerCompte) => {
    setVisibleModalSupprimerCompte(!visibleModalSupprimerCompte);
  };


  const handleSubmitFrom = async (event, errors, values) => {
    event.preventDefault();
    let currentUser = values;
    if (errors.length === 0) {
        try{
        }catch(error){
          console.log("Error",error);
        }
        try {
          if(email !== '' && email !== user?.email){
            const checkMailResponse = await userServices.checkMail(email)
            if(checkMailResponse?.header?.code !== 200){
              toast.error(checkMailResponse?.header?.message)
          }
          }else{
            const updateTesterResposer = await userServices.saveClientTester(currentUser)
            if(updateTesterResposer?.header?.code !== 200){
              toast.error(updateTesterResposer?.header?.message)
            }else{
              toast.success(updateTesterResposer?.header?.message)
              setUserModified(true)
            }
          }
        } catch (error) {
          console.log("Error",error);
        }
    }
  };

  /* RENDER */
  return (
    <>
      <div className="profil_testerC_container">
        <div className="profile_container__header">
          <span className="welcome-text-profil">Modifier mon profil</span>
        </div>
        <Row className="client-testerC-profile">
          <Col lg="3" md="3" className="profil_card">
            {user?.profileImage ? (
              <div className="profile_img">
                <div style={{ width: 110, height: 100 }}>
                  <ImageDecoder base64Image={user?.profileImage} alt="profileImage" className="profileImage" />
                </div>
              </div>
            ) : (
              <Avatar
                size="100"
                name={user?.name + " " + user?.lastname}
                color="#00A359"
                round={true}
              />
            )}
            <div className="d-flex flex-column">
              <span className="profil-text mt-2">
                {" "}
                {user?.name + " " + user?.lastname}
              </span>
            </div>
            <div></div>
            <Col
              md="12"
              lg="12"
              className="d-flex justify-content-center align-items-center mt-3"
            >
              <div
                onClick={() => toggleVisibleModalPhoto()}
                className="profile-btn"
              >
                Modifier ma photo
              </div>
            </Col>
            <Col className="d-flex justify-content-center align-items-center">
              <div onClick={() => toggleVisible()} className="profile-btn">
                Modifier mon mot de passe
              </div>
            </Col>
            <Col className="d-flex justify-content-center align-items-center">
              <div
                onClick={() => toggleVisibleModalSupprimerCompte()}
                className="profile-btn"
              >
                Supprimer mon compte
              </div>
            </Col>
          </Col>
          <Col lg="7" md="7" className="pt-3 main mt-5">
            <AvForm onSubmit={handleSubmitFrom}>
              <Row>
                <Col>
                  <div className="column-left">
                    <Label>Prénom</Label>
                    <AvField
                      value={user?.name}
                      type="text"
                      name="name"
                      className="profile_input_tester_Insight"
                      validate={{
                        required: {
                          value: true,
                          errorMessage: "Ce champ est obligatoire",
                        },
                        pattern: {
                          value: "^[a-zA-Z ]{1,50}$",
                          errorMessage:
                            "Les chiffres et les caractéres speciaux ne sont pas autorisé",
                        },
                      }}
                    />
                  </div>
                </Col>
                <Col>
                  <div className="column-left">
                    <Label>Nom</Label>
                    <AvField
                      value={user?.lastname}
                      type="text"
                      name="lastname"
                      className="profile_input_tester_Insight"
                      id="xxx"
                      validate={{
                        required: {
                          value: true,
                          errorMessage: "Ce champ est obligatoire",
                        },
                        pattern: {
                          value: "^[a-zA-Z ]{1,50}$",
                          errorMessage:
                            "Les chiffres et les caractéres speciaux ne sont pas autorisé",
                        },
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
                      value={user?.email}
                      type="text"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      className="profile_input_tester_Insight"
                      id="xxx"
                      validate={{
                        required: {
                          value: true,
                          errorMessage: "Ce champ est obligatoire",
                        },
                        pattern: {
                          value: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$",
                          errorMessage: "Cette adresse mail n'est pas valide",
                        },
                      }}
                    />
                  </div>
                </Col>
                <Col>
                  <div className="column-left">
                    <Label>Téléphone</Label>
                    <AvField value={user?.phone} type="number" name="phone" className="profile_input_tester_Insight" id="xxx"
                      validate={{
                        required: {
                          value: true,
                          errorMessage: "Ce champ est obligatoire",
                        },
                        pattern: {
                          value: "^[+]{0,1}[0-9]{0,20}$",
                          errorMessage:
                            "Le numéro de téléphone doit contenir que des chiffres",
                        },
                      }}
                    />
                  </div>
                </Col>
              </Row>
              <Row style={{ paddingTop: 20 }}>
                <Col>
                  <div className="column-left">
                    <Label>Pays</Label>
                    <AvField value={user?.country}  type="text" name="country" className="profile_input_tester_Insight"
                      validate={{
                        required: {
                          value: true,
                          errorMessage: "Ce champ est obligatoire",
                        },
                        pattern: {
                          value: "^[a-zA-Z ]{1,50}$",
                          errorMessage:
                            "Les chiffres et les caractéres speciaux ne sont pas autorisé",
                        },
                      }}
                    />
                  </div>
                </Col>
                <Col>
                  <div className="column-left">
                    <Label>Ville</Label>
                    <AvField value={user?.city} type="text" name="city" className="profile_input_tester_Insight"
                      validate={{
                        required: {
                          value: true,
                          errorMessage: "Ce champ est obligatoire",
                        },
                        pattern: {
                          value: "^[a-zA-Z ]{1,50}$",
                          errorMessage:
                            "Les chiffres et les caractéres speciaux ne sont pas autorisé",
                        },
                      }}
                    />
                  </div>
                </Col>
              </Row>
              <Row style={{ paddingTop: 20 }}>
                <Col>
                  <div className="column-left">
                    <Label>Adresse</Label>
                    <AvField value={user?.adresse}  type="text" name="adresse" className="profile_input_tester_Insight"
                      validate={{
                        required: {
                          value: true,
                          errorMessage: "Ce champ est obligatoire",
                        },
                      }}
                    />
                  </div>
                </Col>
                <Col>
                  <div className="column-left">
                    <Label>Code Postal</Label>
                    <AvField value={user?.postalCode} type="text" name="postalCode" className="profile_input_tester_Insight"
                      validate={{
                        required: {
                          value: true,
                          errorMessage: "Ce champ est obligatoire",
                        },
                      }}
                    />
                  </div>
                </Col>
              </Row>
              <Col
                md="12"
                lg="12"
                className="d-flex justify-content-end align-items-center"
              >
                <Button className="btn-success" >
                  Enregistrer
                </Button>
              </Col>
            </AvForm>
          </Col>
        </Row>
        <UpdatePhotoModal
          setVisible={setVisibleModalPhoto}
          user={user}
          visible={visibleModalPhoto}
          toggleVisible={toggleVisibleModalPhoto}
          setUserModified={setUserModified}
        />
        <UpdatePasswordModal
          visible={visible}
          toggleVisible={toggleVisible}
          setVisible={setVisible}
        />
        <SupprimeCompteModal
          visible={visibleModalSupprimerCompte}
          toggleVisible={toggleVisibleModalSupprimerCompte}
        />
      </div>
    </>
  );
};
export default ProfileCT;
