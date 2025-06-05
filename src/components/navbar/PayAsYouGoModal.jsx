/**
 * @file PayAsYouGoModal.jsx
 * @description PayAsYouGoModal component.
 */

/**
 * React imports
 */
import React, {useState} from "react";

/**
 * Assets imports
 */
import Tick from "../../assets/tick.svg";
import PayAsYouGo from "../../assets/PayAsYouGo.svg";

/**
 * Reactstrap imports
 */
import {Modal, ModalBody,Button,Col,} from "reactstrap";

/**
 * Component imports
 */
import { BeneficeModalBody } from "./BeneficeModal";
import ClientRegisterForm from '../register/client/register'
import ConfimInscription from '../navbar/ConfimInscription';
import { onSaveClient } from "../../actions/userActions"
import Modals from '../common/modals/modal'
import ModelConditions from '../navbar/ModalConditions';
import ModelPolitique from '../navbar/ModalPolitique';
import ModelLegal from '../navbar/ModalLegal';

/**
 * Redux imports
 */
import { connect, useSelector } from "react-redux";

/**
 * React-toastify imports
*/
import { toast } from 'react-toastify';

/*-----------------------------------------------------------------*\
                          PayAsYouGoModal
\*------------------------------------------------------------------*/
const PayAsYouGoModal = ({visible,toggleVisible}) => {

  const errorClient = useSelector(state => state.user.errorClient)
  const [visibleConditions, setVisibleConditions] = useState(false);
  const [visiblePolitique, setVisiblePolitique] = useState(false);
  const [visibleLegal, setVisibleLegal] = useState(false);
  const [showToggle1, setShowToggle1] = useState(false);
  const [visibleInscription, setVisibleInscription] = useState(false);
  const [erreurCondtion, setErreurCondtion] = useState("")
  const [currentUser, setCurrentUser] = useState({  
      name: "",
      lastname: "",
      useCase: "",
      sector: "",
      profession: "",
      email: "",
      phone: "",
      nbEmployees: "",
      company: ""
  })
  const [field, setField] = useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({})
  const [state, setState] = useState({
      privacyPolicy: false,
      cgu: false,
  });

    /**
      * Texte du modal
    */
    const textPayAsYouGo = [
        "Scénario multidevices",
        "Panel Insight Data",
        "Analyse démographique",
        "Analyse statistique par étape",
        "Résultats en 24h",
        "Marque blanche",
        "Respect des normes RGPD",
        "Support client 5/7",
    ];

    
    /**
     * Bouton de fermeture du modal
    */
    const externalCloseBtn = (
      <button
        type="button"
        className="close"
        style={{ position: 'absolute', top: '1%', left: '90%', color: 'white', fontSize: 28, zIndex : 9000 }}
        onClick={toggleVisible}
      >
        &times;
      </button>
    );


    
/*************************************************** devenir Client **************************************************************************/

      
    const handleConditions = () => {
      setVisibleConditions(!visibleConditions);
  };

  const handlePolitique = () => {
      setVisiblePolitique(!visiblePolitique);
  };

  const handleLegal = () => {
      setVisibleLegal(!visibleLegal);
  };


  /**
   * Togle visible modal : open or close modal client
  */
  const toggle = () => {
    setShowToggle1(!showToggle1)  
    if(field){
        setField(!field)
    }
    setTimeout(() => {
    setCurrentUser({
        ...currentUser,
        name: "",
        lastname: "",
        useCase: "",
        sector: "",
        profession: "",
        email: "",
        phone: "",
        nbEmployees: "",
        company: ""
    })
    setState({
        privacyPolicy: false,
        cgu: false,
    })
    }, 500);
};
    
/**
 * add user to database
*/
const onSubmit = () => {
    const { name, lastname, useCase, nbEmployees,
        sector, profession, email, phone, company, Commentaire
    } = currentUser;
    const { cgu, privacyPolicy } = state;

    const client = {
        name, lastname, useCase, nbEmployees,
        sector, profession, email, phone, company, cgu, privacyPolicy, Commentaire
    }
    if (!field){
        setField(!field)
    }
    else {
        if (cgu === false || privacyPolicy === false ){
            setErreurCondtion("Veuillez accepter les conditions d'utilisation et la politique de confidentialité")
        }else{
            setLoading(true)
            onSaveClient(client)
            setTimeout(() => {
                setLoading(false)
                setField(!field)
                if(error.cgu === undefined || error.privacyPolicy === undefined || error.email === undefined || error.name === undefined || error.lastname === undefined || error.useCase === undefined ||  error.phone === undefined || error.company === undefined ){
                    toggle()
                }else{
                    toast.error("Champs obligatoires non remplis ou incorrects");
                }
                if(!errorClient){  
                    toggle()
                    setVisibleInscription(!visibleInscription)
                }else
                    toast.error("Email déjà utilisé");
            }, 2000);
        }
    }   
}


  /**
   * 
   * @param {*} e 
   * @returns user input	
   * @description set user input in state
   * @description set error in state
  */
  const onChange = e => {
      e.preventDefault();
      setCurrentUser({ ...currentUser, [e.target.name]: e.target.value })
      setError({ ...error, [e.target.name]: undefined })
  }; 


  /**
   * 
   * @param {*} e
   * @returns user input
   * @description set user input in state
   * Check if user has checked the privacy policy and cgu 
  */
  const handleChange = (e) => {
      const { name, checked } = e.target;
      if (e.target.name === 'privacyPolicy' || e.target.name === 'cgu') {
      setState((prevState) => ({ ...prevState,[name]: checked }));
      setError({ ...error, [e.target.name]: undefined })
      }
  };


  /**
   * 
   * @param {*} value
   * @returns user input
   * @description set user input in state 
   * 
  */
  const onChangePhone = value => {
      setCurrentUser((prevState) => ({...prevState, phone: value}))
      setError({ ...error, phone: undefined })
  };


  const renderModalSignup = () =>{
      const userLabel= {
        name: "Prénom",
        lastname: "Nom",
        email: "Email",
        useCase: "Cas d'utilisation",
        sector: "Secteur",
        profession: "Fonction",
        phone: "Téléphone",
        nbEmployees: "Nombre d'employés",
        company: "Société",
    }

    const usecase = ["Entreprise: Projet Ponctuel", "Entreprise: Plusieurs projets à tester", "Agence ou cabinet de conseil"]
    const nbemployees = ["1-10", "11-50", "51-250", "+250"]    

    return (
        <Modals
            show={showToggle1}
            toggleShow={toggle}
            header='Devenir un client'
        >
          <ClientRegisterForm
              tog_standard={toggle}
              confirmText='Devenir un client'
              confirmText2='Suivant'
              handleSubmit={onSubmit}
              onchange={onChange}
              nbemployees={nbemployees}
              erreurCondtion={erreurCondtion}
              usecase={usecase}
              currentUser={currentUser}
              userText={userLabel}
              loading={loading}
              onChangePhone={onChangePhone}
              error={error}
              field={field}
              handleChange={handleChange}
              checkedCGU={state.cgu}
              checkedPDC={state.privacyPolicy}
              handleConditions={handleConditions}
              handlePolitique={handlePolitique}
              handleLegal={handleLegal}
          />
        </Modals>
    )
  }



  const renderModalCondition = () => {
      return (
          <ModelConditions handleConditions={handleConditions} visibleCondition={visibleConditions}/>
      )
  }


  const renderModalPolitique = () => {
      return (
          <ModelPolitique handlePolitique={handlePolitique} visiblePolitique={visiblePolitique}/>
      )
  }

  const renderModalLegal = () => {
      return (
          <ModelLegal handleLegal={handleLegal} visibleLegal={visibleLegal}/>
      )
  }


  const handleInscription = () => {
      setVisibleInscription(!visibleInscription)
  };

  const renderModalInscription = () => {
      return (
          <ConfimInscription visibleInscription={visibleInscription} handleInscription={handleInscription} />
      )
  }


    
/*-----------------------------------------------------------------*\
                           Return du Modal                                                      
\*------------------------------------------------------------------*/
  return (
      <Modal 
        isOpen={visible}
        toggle={toggleVisible}
        fade={true}
        external={externalCloseBtn}
        scrollable={true}
        fullscreen
        backdrop={true}
        cssModule={{'modal-content': 'modal-contents'}}
    >
      {renderModalSignup()}
      {renderModalCondition()}
      {renderModalPolitique()}
      {renderModalLegal()}
      {renderModalInscription()}
      <div className="modalColor">
        <ModalBody style={{ height: "100%", width: "20rem", overflow : "hidden", border : "5px solid #e9f7f1",   borderRadius: "15px", padding: "2rem .5rem"  }}>
            <Col className="d-flex flex-column align-items-center">
              <strong className="modal_payAsYouGo_title">Pay As You Go</strong>
              <div className="modal-ab-header mt-3">
                <div><strong className="modal_payAsYouGo_subtitle">25€/test utilisateur</strong></div>
              </div>  
                <div className="PayAsYouGo_content_ab">
                    <div className="PayAsYouGo_header">
                        <div className="PayAsYouGo_header_img">
                            <img className="PayAsYouGo_img" src={PayAsYouGo} alt="2M-Advisory" />
                        </div>
                        <div className="PayAsYouGo_header_text">
                            <strong className="PayAsYouGo_text1">Essential</strong>
                            <p className="PayAsYouGo_text2">Besion ponctuel</p>
                        </div>
                    </div>
                    <div className="PayAsYouGo_body_ab">
                        {
                            textPayAsYouGo.map((text, index) => (
                                <BeneficeModalBody key={index} text={text} tick={Tick} />
                            ))
                        }
                    </div>
                    <div className="PayAsYouGo_footer">
                        <Button className="PayAsYouGo_button" onClick={toggle}>Planifier une démo</Button>
                    </div>
                </div>
            </Col>
          </ModalBody>
      </div>
    </Modal>

  );
};


const mapStateToProps = (state) => ({
  auth: state.auth,
});



export default connect(mapStateToProps, {onSaveClient})(PayAsYouGoModal);
