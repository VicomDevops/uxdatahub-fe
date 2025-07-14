// ... imports remain unchanged
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  onEmailChange,
  onPasswordChange,
  onLoginUser,
  successLoginTester1,
  onForgetPassord,
} from "../../actions/authActions";
import { getUserConnected, onSaveClient } from "../../actions/userActions";
import { Input, Button, FormFeedback } from "reactstrap";
import "./login.css";
import Toast from "../common/Toast";
import lng from "./login.json";
import ForgetPasswordModal from "./ForgetPasswordModal";
import ForgetPasswordModalSuccess from "./ForgetPasswordModalSuccess";
import { toast } from "react-toastify";
import Modals from "../common/modals/modal";
import ClientRegisterForm from "../register/client/register";
import ModelConditions from "../navbar/ModalConditions";
import ModelPolitique from "../navbar/ModalPolitique";
import ModelLegal from "../navbar/ModalLegal";
import ConfimInscription from "../navbar/ConfimInscription";
import userServices from "../../services/userServices";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lngActive: this.props.auth.lng,
      loading: false,
      visibleForgetPasswordModal: false,
      visibleForgetPasswordModalSuccess: false,
      forgetPasswordResponse: "",
      visibleCondition: false,
      visiblePolitique: false,
      visibleInscription: false,
      visibleLegal: false,
      cgu: false,
      privacyPolicy: false,
      show: false,
      field: false,
      errorEmail: "",
      erreurCondtion: "",
      currentUser: {
        name: "",
        lastname: "",
        useCase: "",
        sector: "",
        profession: "",
        email: "",
        phone: "",
        nbEmployees: "",
        company: "",
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
      forgetPasswordLoading: false,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.lng !== this.state.lngActive) {
      this.setState({ lngActive: nextProps.auth.lng });
    }
  }

  handleForgetPasswordModal = () => {
    this.setState({ visibleForgetPasswordModal: !this.state.visibleForgetPasswordModal });
  };

  handleForgetPasswordModalSuccess = () => {
    this.setState({
      visibleForgetPasswordModalSuccess: !this.state.visibleForgetPasswordModalSuccess,
      forgetPasswordResponse: this.state.forgetPasswordResponse,
    });
  };

  handleSubmitFrom = async (event, errors, values) => {
    this.setState({ forgetPasswordLoading: true });
    if (errors.length === 0) {
      await this.props.onForgetPassord(values.email);
      setTimeout(() => {
        if (this.props.auth.forgetPassword.code === 200) {
          this.setState({ forgetPasswordResponse: this.props.auth.forgetPassword.message });
          this.handleForgetPasswordModal();
          this.handleForgetPasswordModalSuccess();
        } else {
          toast.error(this.props.auth.forgetPassword.message);
        }
        this.setState({ forgetPasswordLoading: false });
      }, 1000);
    } else {
      this.setState({ error: "Veuillez remplir correctement le champ", forgetPasswordLoading: false });
    }
  };

  onchangeEmail = (e) => {
    e.preventDefault();
    this.props.onEmailChange(e.target.value);
  };

  onchangePassword = (e) => {
    e.preventDefault();
    this.props.onPasswordChange(e.target.value);
  };

  onSubmit = async () => {
    const { username, password } = this.props.auth;
    this.setState({ loading: true });
    await this.props.onLoginUser(username, password, this.state.rememberMe);
    this.props.successLoginTester1();
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
  };

  toggle = () => {
    this.setState({ show: !this.state.show, field: false });
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
          company: "",
        },
        cgu: false,
        privacyPolicy: false,
        page: "1",
      });
    }, 500);
  };

  onChange = (e) => {
    e.preventDefault();
    this.setState({ currentUser: { ...this.state.currentUser, [e.target.name]: e.target.value }, error: {} });
  };

  onChangePhone = (value) => {
    this.setState({ currentUser: { ...this.state.currentUser, phone: value }, error: {} });
  };

  handleConditions = () => this.setState({ visibleCondition: !this.state.visibleCondition });
  handlePolitique = () => this.setState({ visiblePolitique: !this.state.visiblePolitique });
  handleLegal = () => this.setState({ visibleLegal: !this.state.visibleLegal });
  handleInscription = () => this.setState({ visibleInscription: !this.state.visibleInscription });

  handleVerifEmail = async (email, field) => {
    try {
      const response = await userServices.checkMailModeHorsLigne({ email });
      if (response.header.code !== 200) {
        this.setState({ errorEmail: response.header.message });
        setTimeout(() => this.setState({ errorEmail: "" }), 2000);
      } else {
        this.setState({ field: !field });
      }
    } catch (error) {
      this.setState({ errorEmail: "Une erreur est survenue" });
    }
  };

  onSubmitClient = () => {
    const {
      name, lastname, useCase, nbEmployees, sector,
      profession, email, phone, company, Commentaire
    } = this.state.currentUser;
    const { cgu, privacyPolicy, field } = this.state;
    const client = { name, lastname, useCase, nbEmployees, sector, profession, email, phone, company, cgu, privacyPolicy, Commentaire };

    if (!field) {
      this.handleVerifEmail(email, field);
    } else if (!cgu || !privacyPolicy) {
      this.setState({ erreurCondtion: "Veuillez accepter les conditions d'utilisation et la politique de confidentialité" });
    } else {
      this.setState({ loading: true });
      this.props.onSaveClient(client)
        .then(() => {
          this.setState({ loading: false, field: false });
          if (!this.props.user.errorClient) {
            this.setState({ visibleInscription: !this.state.visibleInscription });
            this.toggle();
          } else {
            toast.error("Email déjà utilisé");
          }
        })
        .catch(() => {
          this.setState({ loading: false });
          toast.error("Une erreur est survenue");
        });
    }
  };

  handleChange = (e) => {
    const { name, checked } = e.target;
    this.setState({ [name]: checked });
  };

  render() {
    const { loading, lngActive } = this.state;
    const { username, password, error } = this.props.auth;
    const { login, email, password: pwd, forgetText, trial } = lng[lngActive];

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
        {this.renderModalSignup?.()}
        {this.renderModalCondition?.()}
        {this.renderModalPolitique?.()}
        {this.renderModalInscription?.()}
        {this.renderModalLegal?.()}
        {this.renderModalForgetPasswordModal?.()}
        {this.renderModalForgetPasswordModalSuccess?.()}

        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">{lng[lngActive].header}</h2>
          <h3 className="text-xl text-center text-indigo-600 font-semibold mb-6">UX DATAHUB</h3>

          <Input
            className="mb-4 rounded border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder={email}
            value={username}
            type="email"
            onChange={this.onchangeEmail}
            name="username"
            id="email__login"
            invalid={error.code === 401}
          />

          <Input
            className="mb-4 rounded border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder={pwd}
            type="password"
            onChange={this.onchangePassword}
            name="password"
            id="password__login"
            value={password}
            invalid={error.code === 401}
          />

          {error && error !== "" && (
            <FormFeedback className="text-red-600 text-sm mb-4">
              {this.props.auth.error}
            </FormFeedback>
          )}

          <Button
            className={`w-full py-2 rounded text-white font-semibold transition duration-200 ${username && password && !loading
              ? "bg-indigo-600 hover:bg-indigo-700"
              : "bg-gray-400 cursor-not-allowed"}`}
            onClick={this.onSubmit}
            disabled={!(username && password) || loading}
          >
            {loading && <i className="fa fa-refresh fa-spin mr-2" />}
            {login}
          </Button>

          <div className="text-sm text-indigo-600 hover:underline mt-4 text-center cursor-pointer" onClick={this.handleForgetPasswordModal}>
            {forgetText}
          </div>

          <div className="text-sm text-indigo-600 hover:underline mt-2 text-center cursor-pointer" onClick={this.toggle}>
            {trial}
          </div>
        </div>

        <Toast />
      </div>
    );
  }

  renderModalSignup() {
    const { currentUser, userLabel, loading } = this.state;
    const usecase = ["Entreprise: Projet Ponctuel", "Entreprise: Plusieurs projets à tester", "Agence ou cabinet de conseil"];
    const nbemployees = ["1-10", "11-50", "51-250", "+250"];
    return (
      <Modals show={this.state.show} toggleShow={this.toggle} header="Devenir un client">
        <ClientRegisterForm
          tog_standard={this.toggle}
          confirmText="Devenir un client"
          confirmText2="Suivant"
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
    );
  }

  renderModalForgetPasswordModal = () => (
    <ForgetPasswordModal
      handleInscription={this.handleForgetPasswordModal}
      visibleInscription={this.state.visibleForgetPasswordModal}
      handleSubmitFrom={this.handleSubmitFrom}
      forgetPasswordLoading={this.state.forgetPasswordLoading}
    />
  );

  renderModalForgetPasswordModalSuccess = () => (
    <ForgetPasswordModalSuccess
      handleInscription={this.handleForgetPasswordModalSuccess}
      visibleInscription={this.state.visibleForgetPasswordModalSuccess}
      forgetPasswordResponse={this.state.forgetPasswordResponse}
    />
  );

  renderModalInscription = () => (
    <ConfimInscription handleInscription={this.handleInscription} visibleInscription={this.state.visibleInscription} />
  );

  renderModalCondition = () => (
    <ModelConditions handleConditions={this.handleConditions} visibleCondition={this.state.visibleCondition} />
  );

  renderModalPolitique = () => (
    <ModelPolitique handlePolitique={this.handlePolitique} visiblePolitique={this.state.visiblePolitique} />
  );

  renderModalLegal = () => (
    <ModelLegal handleLegal={this.handleLegal} visibleLegal={this.state.visibleLegal} />
  );
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
