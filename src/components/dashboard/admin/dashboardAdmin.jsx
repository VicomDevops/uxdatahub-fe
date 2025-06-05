//REACT IMPORTS
import React, { useEffect, useState } from "react";
//REDUX IMPORT
import { useDispatch, useSelector } from "react-redux";
//LIBRARY IMPORT
import moment from "moment";
import { Col } from 'reactstrap';
//COMPONENTS IMPORT
import Table from "../../common/table/table";
import ShowMore from "../../../assets/loupe.svg";
import RightSideAdmin from "./RightSideAdmin";

/**
 * Component for displaying a table of scenario data in the admin dashboard.
 *
 * The component fetches scenario data from the server and renders a table with
 * specified columns and actions.
 *
 * The table includes columns for the scenario's date, name, product, typology, client, and state.
 * Each column has custom rendering logic, such as bold text for certain conditions and
 * formatted display based on the scenario's attributes.
 *
 * The actions include a "Details" button that displays the details of the selected scenario.
 *
 * @return {JSX.Element} The table component configured with columns and actions.
 */
const DashboardAdmin = () => {
  //HOOKS
  const [scenarios, setScenarios] = useState([]);
  const {data} = useSelector(state => state.scenario);
  const dispatch = useDispatch();

  useEffect(() => {
    if(data){
        let scenarios = [];
        data.forEach(scenario => {
          scenarios.push({
            id: scenario.id,
            createdAt: scenario.createdAt,
            product: scenario.product,
            isModerate: scenario.isModerate,
            title: scenario.title,
            progress: scenario.progress,
            isUnique: scenario.isUnique,
            state: scenario.state,
            panel: scenario.panel,
            etat: scenario.etat,
            color: (moment(new Date()).format('L') > moment(scenario.createdAt).format('L') + "02") || (moment(new Date()).isAfter(scenario.createdAt, 'year')) ? "red" : ""
          })
        })
        setScenarios(scenarios);
    }
  }, [data, dispatch]);

  /**
   * Renders a table for displaying scenario data with specified columns and actions.
   *
   * The table includes columns for the scenario's date, name, product, typology, client, and state.
   * Each column has custom rendering logic, such as bold text for certain conditions and
   * formatted display based on the scenario's attributes.
   * 
   * @return {JSX.Element} The table component configured with columns and actions.
  */
  const renderTable = () => {
    const columns = [
      {
        title: "Date", field: 'createdAt',
        DateSort: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        render: rowData => <span className={rowData.etat === 2 && 'bold'} >{rowData.createdAt}</span>
      },
      {
        title: "Nom de scénario", field: 'title',
        render: rowData => <span className={rowData.etat === 2 && 'bold'} >{rowData.title}</span>
      },
      {
        title: "Produit", field: 'product',
        render: rowData => <span className={rowData.etat === 2 && 'bold'} >{rowData.product}</span>
      },
      {
        title: "Typologie", field: 'isUnique',
        render: rowData => <span className={rowData.etat === 2 && 'bold'}>{(rowData.isUnique === true && rowData.isModerate === true) ? "Unique Modéré" : (rowData.isUnique === true && rowData.isModerate === false) ? "Unique Non Modéré" : (rowData.isUnique === false && rowData.isModerate === true) ? "A/B Testing Modéré" : "A/B Testing Non Modéré"}</span>
      },
      {
        title: "Client", field: '', render:
          rowData => <span className={rowData.etat === 2 && 'bold'} >{rowData.product}</span>
      },
      {
        title: "Etat", field: 'etat', render: rowData => <span className={rowData.etat === 2 && 'bold'} //style={{ color: `${rowData.color}` }}
        >{(rowData.etat === 0) ? "A compléter" : <span className={rowData.etat === 2 && 'bold'} >{rowData.etat === 1 ? "A associer" : <span className={rowData.etat === 2 && 'bold'} >{rowData.etat === 2 ? "A lancer" : <span className={rowData.etat === 2 && 'bold'} >{rowData.progress === 100 ? "Terminé" : "En cours"}</span>}</span>}</span>}</span>
      },
    ]
    const actions = [
      {
        icon: () => <img style={{ marginRight: '.25em', width: '20px', marginTop: '.125em' }} src={ShowMore} alt="" />,
        tooltip: 'Details',
      },

    ]

    return (
      <Table
        title='Liste des scénarios'
        columns={columns}
        data={scenarios}
        actions={actions}
      />
    )
  }
  
  //RENDER
  return (
    <>
      <div className='display__flex__row-compte_client'>
        <Col md='10'>
          <div>
            <div className='tableContainer'>
              {renderTable()}
            </div>
          </div>
        </Col>
        <RightSideAdmin />
      </div>
    </>
  );
}

//EXPORT
export default DashboardAdmin;