//REACT IMPORTS
import React, { useEffect, useState } from 'react';
//COMPONENTS IMPORT
import Table from "../../common/table/table";
import ShowMore from "../../../assets/insightdata_consulter.svg"
import RightSideAdmin from './RightSideAdmin';
//REDUX IMPORT
import { useSelector, useDispatch } from 'react-redux'
//LIBRARY IMPORT
import { Col } from "reactstrap"


/**
 * This component renders a list of all panels of the connected user.
 * The list is fetched from the backend at the first mount of the component.
 * The component displays the name, the number of testers, the type of each panel, and the name of the scenario associated with it.
 * The user can click on the "Détails" button to display the details of a panel.
 * If an error occurs during the fetch, the error message is displayed to the user with a toast.
 */
const ListPanels = () => {

    //HOOKS
    const [state, setState] = useState({ data: [], details: {}, show: false })
    const { data } = useSelector(state => state.panel);
    const dispatch = useDispatch();

    useEffect(() => {
        const formattedPanels = data?.map(panel => ({
            name: panel.name,
            nbrtesters: panel.testersNb,
            type: panel.type,
            scenarioName: panel.scenarioName,
        }));

        setState({ data: formattedPanels });
        
    }, [data, dispatch]);
    
    //FUNCTIONS
    const showDetails = (data) => {
        setState({ show: !state.show, details: !state.show && data })
    }

    const renderTable = () => {
        const columns = [
            { title: "Nom", field: 'name' },
            { title: "Nombre de testeurs", field: 'nbrtesters' },
            { title: "Type", field: 'type' },
            { title: "Scénario associé", field: 'scenarioName' },
        ]
        const actions = [{
            icon: () => <img style={{ width: "30px" }} src={ShowMore} alt="" />,
            tooltip: 'Détails',
            onClick: (event, rowData) => showDetails(rowData),
        }]

        return (
            <Table
                title='Liste des panels'
                columns={columns}
                data={state.data}
                actions={actions}
            />
        )
    }

    //RENDER
    return (
        <div className='display__flex__row-compte_client'>
            <Col md='10'>
                {renderTable()}
            </Col>
            <RightSideAdmin/>
        </div>
    )
}

export default ListPanels