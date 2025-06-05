//REACT IMPORT
import React from "react";
//COMPONENTS IMPORT
import UserDetails from "./userDetails";
import RightSideAdmin from "../RightSideAdmin";
import { ContratAenvoyer } from "./contratAenvoyer";
import Table from "../../../common/table/table";
import Modals from "../../../common/modals/adminModal";
//SERVICES IMPORT
import userServices  from "../../../../services/userServices";
import { onGetClients } from "../../../../actions/userActions";
//ASSET IMPORT
import ShowMore from "../../../../assets/loupe.svg";
import Message from "../../../../assets/msg.svg";
//LIBRARY IMPORT
import moment from "moment";
import { Col } from 'reactstrap'
import { toast } from "react-toastify";
//REDUX IMPORT
import { connect } from "react-redux";


class ClientValidation extends React.Component {
  state = {
    data: [],
    details: {},
    anneeList:[],
    show: false,
    showContrat: false,
    idActClient: null,
    actionSection : false,
    factureList: [],
  };

  componentDidMount() {
    if (!this.props.user.users.length > 0) 
    this.props.onGetClients();
    else {
      let clients = [];
      // faire la tri des clients par date de creation
      this.props.user.users.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      this.props.user.users.forEach((client) => {
        clients = [
          ...clients,
          {
            createdAt:  moment(client.createdAt).format("DD/MM/YYYY"),
            licence : moment(client.createdAt).add(1,'month').format("DD/MM/YYYY"),
            lastname: client.lastname,
            id: client.id,
            name: client.name,
            company: client.company,
            phone: client.phone,
            email: client.email,
            useCase: client.useCase,
            state: client.state,
          },
        ];
      });
      this.setState({ data: clients });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {

    if (this.props.user.users !== nextProps.user.users) {
      let clients = [];
      nextProps.user.users.map((client) => 
        clients = [
          ...clients,
          {
            createdAt:  moment(client.createdAt).format("DD/MM/YYYY"),
            licence : moment(client.createdAt).add(1,'month').format("DD/MM/YYYY"),
            lastname: client.lastname,
            id: client.id,
            name: client.name,
            company: client.company,
            phone: client.phone,
            email: client.email,
            useCase: client.useCase,
            state: client.state,
          },
        ]
      );
      this.setState({ data: clients });
    }
  }

  showDetails = (data) => {
    this.setState({
      show: !this.state.show,
      details: !this.state.show && data,
    });
  };

  actionTogole= () =>{
    this.setState({actionSection : !this.state.actionSection})
  }

  toggleContrat = (id) => {
    this.setState({
      showContrat: !this.state.showContrat,
      idActClient : !this.state.showContrat && id
    })
  };
  activate = () => {
    userServices.validateClient(this.state.idActClient).then((res) => {
      this.props.onGetClients();
      this.toggleContrat();
      toast.success("Mail envoyé avec succès");
    }).catch((err) => {
      console.log(err);
    })
  };

  handleAnnee = (e) => {  }

  renderClientDetails() {
    return (
      <Modals
        fullscreen={true}
        modalSize="modal-lg"
        show={this.state.show}
        toggleShow={this.showDetails}
        anneeList={this.state.anneeList}
        handleAnnee={this.handleAnnee}
      >
        <UserDetails
          data={this.state.details}
          role="ROLE_CLIENT"
          activate={this.activate}
          actionTogole={this.actionTogole}
          actionSection={this.state.actionSection}
          factureList={this.state.factureList}
        />
      </Modals>
    );
  }

  handleContrat = () => {  };

  renderEmailContrat() {
    return ( <ContratAenvoyer show={this.state.showContrat} toggleContrat={this.toggleContrat} activate={this.activate} /> );
  }

  renderTable = () => {
    const columns = [
      { title: "Date", field: "createdAt" },
      { title: "Entreprise", field: "company" },
      { title: "Nom", field: "lastname" },
      { title: "Prémon", field: "name" },
      { title: "Email", field: "email" },
      { title: "Fin licence", field: "licence" },
      {
        title: "Etat", field: "state",
        render: (rowData) => (
          <>
            {
              rowData.state === "to_contact" ?
                <span style={{ color: "#E81A1A" }}>License Demo</span>
                : rowData.state === "to_validate" ?
                  <span style={{ color: "#F68E12" }}>Contrat envoyé</span>
                  :
                  <span style={{ color: "#00A359" }}>Contrat signé</span>
            }
          </>
        ),
      },
    ];
    const actions = [
      rowData => (rowData.state === "to_contact") ? ({
        icon: () => <img style={{ width: "30px",marginLeft: 10 }} src={Message} alt="2M-advisory" />,
        tooltip: 'envoyer le contrat',
        onClick: (event, rowData) => this.toggleContrat(rowData.id),
      })
      :
      ({
        icon: () => <img style={{ width: "25px", marginLeft: 15 }} src={ShowMore} alt="2M-advisory" />,
        tooltip: 'Détails',
        onClick: (event, rowData) => this.showDetails(rowData),
      })
    ];
    return (
      <Table
        title="Comptes Clients"
        columns={columns}
        data={this.state.data}
        actions={actions}
      />
    );
  };

  render() {
    return (
      <>
        <div className='display__flex__row-compte_client'>
          <Col md='10'>
              {this.renderTable()}
              {this.renderClientDetails()}
              {this.renderEmailContrat()}
          </Col>
          <RightSideAdmin/>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps, { onGetClients })(ClientValidation);