/**
 * @file rightSideClient.jsx
 */


/**
 * React imports
 */
import React, { useEffect, useState } from 'react'

/**
 * Reactstrap imports
 */
import { Col } from "reactstrap";

/**
 * React-redux imports
 */
import { connect, useSelector } from 'react-redux';
import { onGetSubClients } from '../../../actions/userActions'
import { onGetScenarios } from "../../../actions/scenarioActions"




/*******************************************************************/
/*                    RightSideClient Component                    */
/******************************************************************/
const RightSideClient = () => {
    /*******************************************************************/
    /*                              HOOKS                              */
    /******************************************************************/
    const { subClients } = useSelector((state) => state.user)
    const { data } = useSelector((state) => state.scenario);
    const [countSubClient, setCountSubClient] = useState(0);
    const [countScenarioOuvert, setCountScenarioOuvert] = useState(0);

    /**
     * useEffect 
     */
    useEffect(() => {
        onGetSubClients();
        onGetScenarios();
        let countS = 0;
        let countC = 1;
        if(subClients){
            subClients.map(subClient => {
                if(subClient){
                    countC = countC + 1
                }
                return countC
            })
            setCountSubClient(countC)
        }
        if(data){
            data.map(scenario => {
                if(scenario.etat === 3){
                    countS = countS + 1
                }
                return countS
            })
            setCountScenarioOuvert(countS)
        }   
    }, [subClients, data])


    /************************************************************************/
    /*                               RENDRING                               */
    /***********************************************************************/
    return (
        <Col md='2' className='dashboard_client-right_side'>
            <div className='scenario__info-compte'>
                <Col className="col__style-compte_client">
                    <span className='text-square mb-3'>Montant Engage</span>
                    <span className='square2'>0</span>
                </Col>
                <Col className="col__style-compte_client">
                    <span className='text-square mb-3'>Scénario Ouverts</span>
                    {
                        countScenarioOuvert > 0 ?
                        <span className='square4'>{countScenarioOuvert}</span>
                        :
                        <span className='square2'>0</span>
                    }
                </Col>
                <Col className="col__style-compte_client">
                    <span className='text-square mb-3'>Utilisateurs</span>
                        <span className='square4'>{countSubClient}</span>
                </Col>
                <Col className="col__style-compte_client">
                    <span className='text-square mb-3'>Licence</span>
                    <span className='essai mb-1'>Essai</span>
                    <span className='modifier'>modifier</span>
                </Col>
            </div>
        </Col>
    )
}

/**
 * 
 * @param {*} state 
 * @returns  {object}
 * Map state to props 
 */
const mapStateToProps = state => ({
    auth: state.auth,
    user: state.user,
    scenario: state.scenario,
});


/**
 * Export component
 * Connect component to redux store
 */
export default connect(mapStateToProps, { onGetSubClients,onGetScenarios })(RightSideClient);