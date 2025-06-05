//REACT IMPORTS
import React, { useEffect, useState } from "react";
//REDUX IMPORT
import { useDispatch, useSelector } from "react-redux";
//LIBRARIES IMPORT
import { Col } from 'reactstrap'


/**
 * RightSideAdmin component
 * @description component qui affiche les informations génerales de l'admin
 * @returns {JSX.Element} 
 */
const RightSideAdmin = () => {

  //HOOKS
  const [counters, setCounters] = useState({ countClients: 1, countTesteurs: 0, countScenario: 0, montantFacture: 0 });
  const { testers, users } =  useSelector(state => state.user);
  const { data } =  useSelector(state => state.scenario);
  const dispatch = useDispatch();

  
  useEffect(() => {
    if(data){
      let scenariosOuvert = 0
      data.forEach(scenario => {
        if (scenario.etat === 3) {
            scenariosOuvert = scenariosOuvert + 1;
        }
    })
      setCounters({ countClients: users.length, countTesteurs: testers.length, countScenario: scenariosOuvert });
    }   
    
  }, [data, testers, users, dispatch]);
  
  //RENDER
  return (
    <>
      <Col md='2' className='dashboard-right_side'>
        <div className='scenario__info-compte'>
          <Col className="col__style-compte_client">
              <span className='text-square mb-3'>Montant A Facturer</span>
              {
                counters?.MontantFacture &&
                <span className={counters?.countTesteurs < 0 ? 'square4' : 'square2'}>{counters?.montantFacture || 0}</span>
              }
          </Col>
          <Col className="col__style-compte_client">
              <span className='text-square mb-3'>Scénario Ouverts</span>
              {
                counters?.countScenario &&
                <span className={counters?.countTesteurs < 0 ? 'square4' : 'square2'}>{counters?.countScenario || 0}</span>
              }
          </Col>
          <Col className="col__style-compte_client">
              <span className='text-square mb-3'>Clients</span>
              {
                counters?.countClients &&
                <span className={counters?.countTesteurs < 0 ? 'square4' : 'square2'}>{counters?.countClients || 0}</span>
              }
          </Col>
          <Col className="col__style-compte_client">
              <span className='text-square mb-3'>Testeurs</span>
              {
                counters?.countTesteurs && 
                <span className={counters?.countTesteurs < 0 ? 'square4' : 'square2'}>{counters?.countTesteurs || 0}</span>
              }
          </Col>
        </div>
      </Col>
    </>
  );
}

//EXPORT
export default RightSideAdmin;