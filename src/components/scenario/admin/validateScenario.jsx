import React from 'react';
import Table from "../../common/table/table";
import { connect } from 'react-redux';
import { onGetScenarios } from "../../../actions/scenarioActions"
import ShowMore from "../../../assets/insightdata_consulter.svg"
import moment from 'moment';
import { Col } from "reactstrap"
import Modals from '../../common/modals/modal'
import "../scenario.css"
import RightSideAdmin from '../../dashboard/admin/RightSideAdmin';
class ValidateScenario extends React.Component {
    state = {
        data: [],
        details: {},
        show: false
    }

    componentDidMount() {
        if (!this.props.scenario?.data[0])
            this.props.onGetScenarios()
        else {
            let scenarios = []
            this.props.scenario?.data.map(scenario => {
                scenarios = [...scenarios, {
                    createdAt: moment(scenario.createdAt).format('L'),
                    product: scenario.product,
                    isModerate: scenario.isModerate,
                    title: scenario.title,
                    isUnique: scenario.isUnique,
                    state: scenario.state,
                    color: (moment(new Date()).format('L') > moment(scenario.createdAt).format('L') + "02") || (moment(new Date()).isAfter(scenario.createdAt, 'year')) ? "red" : ""
                }]
            })
            this.setState({ data: scenarios })
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.scenario?.data !== nextProps.scenario?.data) {
            let scenarios = []
            nextProps.scenario?.data.map(scenario => {
                scenarios = [...scenarios, {
                    createdAt: moment(scenario.createdAt).format('L'),
                    product: scenario.product,
                    isModerate: scenario.isModerate,
                    title: scenario.title,
                    isUnique: scenario.isUnique,
                    state: scenario.state,
                    color: (moment(new Date()).format('L') > moment(scenario.createdAt).format('L') + "02") || (moment(new Date()).isAfter(scenario.createdAt, 'year')) ? "red" : ""
                }]
            })
            this.setState({ data: scenarios })

        }
    }
    showDetails = (data) => {
        this.setState({ show: !this.state.show, details: !this.state.show && data })
    }
 
    renderTable = () => {
        const columns = [
            { title: "Date", field: 'createdAt' },
            { title: "Nom", field: 'title' },
            { title: "Produit", field: 'product' },
            { title: "Unique", field: 'isUnique' },
            { title: "Modéré", field: 'isModerate' },
            { title: "Etat", field: 'state',/* render: rowData => <span style={{ color: `${rowData.color}` }}>{rowData.state === "to_contact" ? "A contacter" : "Ok"}</span> */},
        ]
        const actions = [{
            icon: () => <img style={{ width: "30px" }} src={ShowMore} alt="" />,
            tooltip: 'Détails',
            onClick: (event, rowData) => this.showDetails(rowData),
        },

        ]

        return (
            <Table
                title='Liste des scénarios'
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
          </Col>
            <RightSideAdmin/>
        </div>
      </>    
    )}
}

const mapStateToProps = state => ({
    auth: state.auth,
    user: state.user,
    scenario: state.scenario,
});

export default connect(
    mapStateToProps,
    { onGetScenarios }
)(ValidateScenario);
