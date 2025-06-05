//REACT IMPORTS
import React from 'react';
//COMPONENTS IMPORT
import Table from "../../../common/table/table";
import UserDetails from './userDetails';
import ConfimInscription from './ConfimInscription';
import RightSideAdmin from '../RightSideAdmin';
import Modals from '../../../common/modals/adminModal';
//SERVICES IMPORT
import { onGetTesters } from "../../../../actions/userActions";
import  userServices  from '../../../../services/userServices';
//ASSET IMPORT
import ShowMore from "../../../../assets/insightdata_consulter.svg";
//LIBRARY IMPORT
import moment from 'moment';
import { Col } from 'reactstrap';
//REDUX IMPORT
import { connect } from 'react-redux';
//STYLES IMPORT
import '../dashboardAdmin.css';

class TesterValidation extends React.Component {
    state = {
        data: [],
        details: {},
        show: false,
        showValidation: false,
        actionSection: true,
        factureList: [],
    }

    componentDidMount() {
        if (!this.props.user.testers[0])
            this.props.onGetTesters()
        else {
            let testers = []
            this.props.user.testers.foreach(tester => {
                testers = [...testers, {
                    id : tester.id,
                    createdAt:  moment(tester.createdAt).format("DD/MM/YYYY"),
                    lastname: tester.lastname,
                    name: tester.name,
                    email: tester.email,
                    state: tester.state,
                    isActive: tester.isActive,
                }]
            })
            this.setState({ data: testers })
        }
    }
    
    showDetails = (data) => {
        this.setState({ show: !this.state.show, details: !this.state.show && data })
    }

    showValidation = () => {
        this.setState({ showValidation: !this.state.showValidation})
    }


    validate = (id) => {
        userServices.validateTester(id).then(res => {
            this.props.onGetTesters()
            this.setState({ showValidation : true})
            setTimeout(() => {
                this.setState({ show: false })
            }, 1000);
        })
    }


    renderTesterValidation() {
        return (
        <Modals
            show={this.state.showValidation}
            toggleShow={this.showValidation}
        >
            <ConfimInscription />
        </Modals> 
        )
    }

    actionTogole= () =>{
        this.setState({actionSection : !this.state.actionSection})
      }

    renderTesterDetails() {
        return (
            <Modals
                fullscreen={true}
                modalSize="modal-lg"
                show={this.state.show}
                toggleShow={this.showDetails}
            >
                <UserDetails
                    data={this.state.details}
                    role="ROLE_TESTER"
                    validate={this.validate}              
                    actionTogole={this.actionTogole}
                    actionSection={this.state.actionSection}
                    columnsPrelevement = {this.columnsPrelevement}
                    factureList = {this.factureList}
                />
            </Modals>
        )
    }

    renderTable = () => {
        const columns = [
            { title: "Date", field: 'createdAt' },
            { title: "Nom", field: 'lastname' },
            { title: "Prémon", field: 'name' },
            { title: "Mail", field: 'email' },
            { title: "Etat", field: 'state', 
                render: rowData => 
                    {
                        return rowData.isActive?
                        <span style={{color: "#00A359"}}>Actif</span>
                        : 
                        <span style={{color: "#E81A1A"}}>Non actif</span>
                    }
            },
        ]
        const actions = [{
            icon: () => <img style={{ width: "30px" }} src={ShowMore} alt="" />,
            tooltip: 'Détails',
            onClick: (event, rowData) => this.showDetails(rowData),
        },

        ]

        return (
            <Table
                title='Comptes Testeurs'
                columns={columns}
                data={this.state.data}
                actions={actions}
            />
        )
    }
    render() {
        return (
      <>
        <div className='display__flex__row-compte_client'>
          <Col md='10'>
            {this.renderTable()}
            {this.renderTesterDetails()}
            {this.renderTesterValidation()}
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

export default connect(mapStateToProps, { onGetTesters })(TesterValidation);
