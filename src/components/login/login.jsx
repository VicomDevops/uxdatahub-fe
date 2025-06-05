import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  onEmailChange,
  onPasswordChange,
  onLoginUser,successLoginTester1,onForgetPassord
} from "../../actions/authActions";
import { getUserConnected } from "./../../actions/userActions";
import { Input, Button, FormFeedback } from "reactstrap";
import "./login.css";
import Toast from "../common/Toast";
import lng from "./login.json";
import ForgetPasswordModal from "./ForgetPasswordModal";
import ForgetPasswordModalSucess from "./ForgetPasswordModalSuccess";
import { toast } from 'react-toastify';
import Modals from '../common/modals/modal'
import ClientRegisterForm from '../register/client/register'
import ModelConditions from '../navbar/ModalConditions';
import ModelPolitique from '../navbar/ModalPolitique';
import ModelLegal from '../navbar/ModalLegal';
import ConfimInscription  from '../navbar/ConfimInscription';
import { onSaveClient } from "../../actions/userActions"
import userServices from '../../services/userServices';


class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lngActive: this.props.auth.lng,
      loading: false,
      visibleForgetPasswordModal: false,
      visibleForgetPasswordModalSuccess: false,
      forgetPasswordResponse :"",
      visibleCondition: false,
      visiblePolitique: false,
      visibleInscription: false,
      visibleLegal: false,
      cgu: false,
      privacyPolicy: false,
      show: false,
      field: false,
      errorEmail : "",
      erreurCondtion : "",
      currentUser: {
          name: "",
          lastname: "",
          useCase: "",
          sector: "",
          profession: "",
          email: "",
          phone: "",
          nbEmployees: "",
          company: ""
      },
      userLabel: {
        name: "Prénom",
        lastname: "Nom",
        email: "Email",
        useCase: "Cas d'utilisation",
        sector: "Secteur",
        profession: "Fonction",
        phone: "Téléphone",
        nbEmployees: "Nombre d'employés",
        company: "Société",
    },
      error: {},
      forgetPasswordLoading: false
    };
    this.onSubmitClient = this.onSubmitClient.bind(this)
    this.handleConditions = this.handleConditions.bind(this);
    this.handlePolitique = this.handlePolitique.bind(this);
    this.handleLegal = this.handleLegal.bind(this);
  }
  componentDidMount(){
    window.scrollTo(0, 0);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
  
    if (nextProps.auth.lng !== this.state.lngActive) {
      this.setState({ lngActive: nextProps.auth.lng });
    }
  }
  handleForgetPasswordModal = () => {
    this.setState({ visibleForgetPasswordModal: !this.state.visibleForgetPasswordModal })
};

handleForgetPasswordModalSuccess = () => {
  this.setState({ visibleForgetPasswordModalSuccess: !this.state.visibleForgetPasswordModalSuccess })
  this.setState({ forgetPasswordResponse :this.state.forgetPasswordResponse })
};

  renderModalForgetPasswordModal = () => {
    return (
        <ForgetPasswordModal handleInscription={this.handleForgetPasswordModal} visibleInscription={this.state.visibleForgetPasswordModal} handleSubmitFrom={this.handleSubmitFrom} forgetPasswordLoading={this.state.forgetPasswordLoading}/>
    )
}


renderModalForgetPasswordModalSuccess = () => {
  return (
      <ForgetPasswordModalSucess handleInscription={this.handleForgetPasswordModalSuccess} visibleInscription={this.state.visibleForgetPasswordModalSuccess} forgetPasswordResponse={this.state.forgetPasswordResponse} />
  )
}

  handleSubmitFrom = async (event, errors, values) => {
    this.setState({ forgetPasswordLoading: true })
    if (errors.length === 0) {
      await this.props.onForgetPassord(values.email);
        setTimeout(() => {
          if(this.props.auth.forgetPassword.code === 200){
            this.setState({ forgetPasswordResponse: this.props.auth.forgetPassword.message })
            this.handleForgetPasswordModal();
            this.handleForgetPasswordModalSuccess();
          }else{
            toast.error(this.props.auth.forgetPassword.message)
          }
          this.setState({ forgetPasswordLoading: false })
        },1000);
    }else{
        this.setState({ error: "Veuillez remplir correctement le champ" });
        this.setState({ forgetPasswordLoading: false })
    }
  }

  onchangeEmail = (e) => {
    e.preventDefault();
    this.props.onEmailChange(e.target.value);
  };

  onchangePassword = (e) => {
    e.preventDefault();
    this.props.onPasswordChange(e.target.value);
  };

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
        this.onSubmit();
    }
}

  onSubmit = async() => {
    const { username, password } = this.props.auth;
    this.setState({ loading: true });
    await this.props.onLoginUser(username, password, this.state.rememberMe);
    this.props.successLoginTester1()
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
  };



  
  /*********************************************Pop up Client *****************************************/

  toggle = () => {
      this.setState({
          show: !this.state.show,
      })
      if (this.state.field){
          this.setState({ field: !this.state.field })
      }
      setTimeout(() => {
          this.setState({
              currentUser: {
                  name: "",
                  lastname: "",
                  useCase: "",
                  sector: "",
                  profession: "",
                  email: "",
                  phone: "",
                  nbEmployees: "",
                  company: ""
              },
              cgu: false,
              privacyPolicy: false,
              page: '1'
          })
      }, 500);
   }


  onChange = e => {
      e.preventDefault();
      this.setState({ currentUser: { ...this.state.currentUser, [e.target.name]: e.target.value }, error: {} })
  };


  onChangePhone = value => {
      this.setState({ currentUser: { ...this.state.currentUser, phone: value }, error: {} })
  };


  handleConditions = () => {
      this.setState({ visibleCondition: !this.state.visibleCondition })
  };

  handlePolitique = () => {
      this.setState({ visiblePolitique: !this.state.visiblePolitique })
  };

  handleLegal = () => {
      this.setState({ visibleLegal: !this.state.visibleLegal })
  };

  handleInscription = () => {
      this.setState({ visibleInscription: !this.state.visibleInscription })
  };

  handleVerifEmail = async (email, field) => {
    let mailData = {
        email: email
    }
    try {
        const response = await userServices.checkMailModeHorsLigne(mailData)
        if (response.header.code !== 200) {
            this.setState({ errorEmail: response.header.message })
            setTimeout(() => {
                this.setState({ errorEmail: "" })
            },2000)
        }else{
            this.setState({ field: !field })
        }
    } catch (error) {
        console.log("err", error);
        this.setState({ errorEmail: "Une erreur est survenue" })
    }
  }


  onSubmitClient() {
    const { name, lastname, useCase, nbEmployees, sector, profession, email, phone, company, Commentaire } = this.state.currentUser;
    const { cgu, privacyPolicy, field } = this.state;
    const client = { name, lastname, useCase, nbEmployees, sector, profession, email, phone, company, cgu, privacyPolicy, Commentaire };

    if (!field) {
        this.handleVerifEmail(email, field);
    } else {
        if (cgu === false || privacyPolicy === false) {
            this.setState({ erreurCondtion: "Veuillez accepter les conditions d'utilisation et la politique de confidentialité" });
        } else {
            this.setState({ loading: true });
            this.props.onSaveClient(client)
                .then(response => {
                  this.setState({ loading: false, field: !this.state.field });
                    if (!this.props.user.errorClient) {
                        this.setState({ visibleInscription: !this.state.visibleInscription });
                        this.toggle();
                    } else {
                        toast.error("Email déjà utilisé");
                    }
                })
                .catch(error => {
                    this.setState({ loading: false });
                    toast.error("An error occurred while saving the client.");
                });
        }
    }
}




renderModalSignup() {
    const { currentUser, userLabel, loading } = this.state
    const usecase = ["Entreprise: Projet Ponctuel", "Entreprise: Plusieurs projets à tester", "Agence ou cabinet de conseil"]
    const nbemployees = ["1-10", "11-50", "51-250", "+250"]
    return (
        <Modals
            show={this.state.show}
            toggleShow={this.toggle}
            header='Devenir un client'
        >
            <ClientRegisterForm
                tog_standard={this.toggle}
                confirmText='Devenir un client'
                confirmText2='Suivant'
                handleSubmit={this.onSubmitClient}
                onchange={this.onChange}
                nbemployees={nbemployees}
                erreurCondtion={this.state.erreurCondtion}
                usecase={usecase}
                currentUser={currentUser}
                userText={userLabel}
                loading={loading}
                onChangePhone={this.onChangePhone}
                error={this.state.error}
                field={this.state.field}
                handleChange={this.handleChange}
                checkedCGU={this.state.cgu}
                checkedPDC={this.state.privacyPolicy}
                handleConditions={this.handleConditions}
                handlePolitique={this.handlePolitique}
                handleLegal={this.handleLegal}
                errorEmail={this.state.errorEmail}
            />
        </Modals>
    )
}

handleChange = (e) => {
  if (e.target.name === 'privacyPolicy') {
      this.setState({ privacyPolicy: !this.state.privacyPolicy })
  }
  if (e.target.name === 'cgu') {
      this.setState({ cgu: !this.state.cgu })
  }
  this.setState({ ...this.state, [e.target.name]: e.target.checked })
}

renderModalInscription = () => {
    return (
        <ConfimInscription handleInscription={this.handleInscription} visibleInscription={this.state.visibleInscription}/>
    )
}

renderModalCondition = () => {
    return (
        <ModelConditions handleConditions={this.handleConditions} visibleCondition={this.state.visibleCondition}/>
    )
}

renderModalPolitique = () => {
    return (
        <ModelPolitique handlePolitique={this.handlePolitique} visiblePolitique={this.state.visiblePolitique}/>
    )
}

renderModalLegal = () => {
    return (
        <ModelLegal handleLegal={this.handleLegal} visibleLegal={this.state.visibleLegal}/>
    )
}
  render() {
    const { loading, lngActive } = this.state;
    const loginText = lng[lngActive].login;
    const email = lng[lngActive].email;
    const passwordText = lng[lngActive].password;
    const forgetText = lng[lngActive].forgetText;
    const { username, password, error } = this.props.auth;
    return (
      <div className="ctn__login">
        {this.renderModalSignup()}
        {this.renderModalCondition()}
        {this.renderModalPolitique()}
        {this.renderModalInscription()}
        {this.renderModalLegal()}
        <div className="form__login">
          <span id="header__login">{lng[lngActive].header}</span>
          <span id="header__login">Insight Data</span>
          {this.renderModalForgetPasswordModal()}
          {this.renderModalForgetPasswordModalSuccess()}
          
          <hr className="line" />

          
          <div className="form__login">
            <Input
              style={{ marginBottom: "1.2em" }}
              placeholder={email}
              value={username}
              type="email"
              onChange={this.onchangeEmail}
              name="username"
              id="email__login"
              invalid={error.code === 401 ? true : false}
            />
            <Input
              style={{ marginBottom: "1.2em" }}
              placeholder={passwordText}
              type="password"
              onChange={this.onchangePassword}
              name="password"
              id="password__login"
              value={password}
              invalid={error.code === 401 ? true : false}
            />
            {this.props.auth.error !== '' && (
              <FormFeedback id="feed" className="mt-1">{this.props.auth.error}</FormFeedback>
            )}

            <Button
                className={(this.props.auth.username && this.props.auth.password) ? "login__button" : "login__button_disabled"}
                onClick={this.onSubmit}
                disabled={!(this.props.auth.username && this.props.auth.password) || loading}>
                {loading && <i className="fa fa-refresh fa-spin mr-2" />}
                {loginText}
            </Button>
            <div className="forget__password" onClick={this.handleForgetPasswordModal}>
              {forgetText}
            </div>
            <div className="forget__password" onClick={this.toggle}>
              {lng[lngActive].trial}
            </div>
          </div>
        </div>
        <Toast />
      </div>
    );
  }
}

LoginForm.propTypes = {
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps, {
  onEmailChange,
  onPasswordChange,
  onLoginUser,
  onForgetPassord,
  getUserConnected,
  successLoginTester1,
  onSaveClient,
})(LoginForm);
