import React, { useEffect, useState } from 'react'
import Table from "../../../common/table/table";
import { connect } from "react-redux";
import { onGetClients } from "../../../../actions/userActions";
import ShowMore from "../../../../assets/insightdata_consulter.svg";
import { Col } from 'reactstrap'
import moment from "moment";
import RightSideAdmin from "../RightSideAdmin";
import { useSelector } from 'react-redux'

export const SousComptes = () => {

    const [data, setData] = useState([]);
    const subUser = useSelector((state) => state.user.subClients)


    useEffect(() => {
            let clients = [];
            subUser.forEach((client) => {
                clients = [
                    ...clients,
                    {
                        createdAt:  moment(client.createdAt).format("DD/MM/YYYY"),
                        lastname: client.lastname,
                        id: client.id,
                        name: client.name,
                        company: client.company,
                        phone: client.phone,
                        email: client.email,
                        useCase: client.useCase,
                        state: client.state,
                        color:
                            client.state === "to_contact" ?
                                "red"
                                : "",
                    },
                ];
            });
            setData(clients);
    }, [ subUser ]);


    const renderTable = () => {
        const columns = [
          { title: "Date", field: "createdAt" },
          { title: "Nom", field: "lastname" },
          { title: "Prémon", field: "name" },
          { title: "Email", field: "email" },
          {
            title: "Etat", field: "state",
            render: (rowData) => (
              <span style={{ color: `${rowData.color}` }}>
                {rowData.state === "to_contact" ? "Contrat à envoyer" : "Contrat envoyé"}
              </span>
            ),
          },
        ];
        const actions = [
          {
            icon: () => <img style={{ width: "30px" }} src={ShowMore} alt="2M-advisory" />,
            tooltip: "Détails",
            onClick: (event, rowData) => this.showDetails(rowData),
          },
        ];
    
        return (
          <Table
            title="Gestion des sous comptes"
            columns={columns}
            data={data}
            actions={actions}
          />
        );
      };

  return (
    <>
        <div className='display__flex__row-compte_client'>
        <Col md='10'>
            {renderTable()}
        </Col>
        <RightSideAdmin/>
        </div>
     </>
  )
}

const mapState = (state) => ({
    auth: state.auth,
    user: state.user,
  });
  
  export default connect(mapState, { onGetClients })(SousComptes);