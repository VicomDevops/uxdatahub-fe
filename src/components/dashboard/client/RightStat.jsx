//REACT IMPORTS
import React,{ useEffect, useState } from "react";
//LIBRARY IMPORT
import { Col } from "reactstrap";
import PropTypes from "prop-types";
//REDUX IMPORT
import { useSelector } from 'react-redux';

/**
 * @function RightStat
 * @description Right stat component
 * @param {function} handleScenarioC - function to handle scenario close
 * @param {function} handleScenarioL - function to handle scenario launch
 * @returns {JSX.Element} - jsx element
*/
const RightStat = ({handleScenarioC, handleScenarioL}) => {

    //HOOKS
    const { data } = useSelector((state) => state.scenario);
    const { subClients } = useSelector((state) => state.user)
    const [countAlancer, setCountAlancer] = useState(0);
    const [countEnCours, setCountEnCours] = useState(0);
    const [countSubClient, setCountSubClient] = useState(0);


    useEffect(() =>{

        let countEnCours = 0;
        let countAlancer = 0;
        let countC = 1;

        //count scenarios a lancer and en cours
        data?.map(scenario => {
            if(scenario.etat === 3){
                countEnCours = countEnCours + 1
            }
            if(scenario.etat === 2){
                countAlancer = countAlancer + 1
            }
            return countEnCours && countAlancer
        })

        //count subClients
        if(subClients.lenght > 0){
            subClients.map(subClient => {
                if(subClient){
                    countC = countC + 1
                }
                return countC
            })
        }
        //set counts
        setCountAlancer(countAlancer)
        setCountEnCours(countEnCours)
        setCountSubClient(countC)
    },[data,  subClients])

    //RENDER
    return(
        <div className='scenario__info-dashboard'>
            <Col className="col__style-dashboard">
                <span className='text-square mb-3'>Licence</span>
                <span className='essai mb-1'>Essai</span>
                <span className='modifier'>Changer</span>
            </Col>

            <Col className="col__style-dashboard">
                <span className='text-square mb-4'>Utilisateurs</span>
                    <span className='square4'>{countSubClient}</span>
            </Col>
            {
                handleScenarioL?
                    <Col className="col__style-dashboard pointer" onClick={handleScenarioL}
                        data-tip="cliquer pour voir les scénarios lancés en premier"
                        data-background-color="#F3FBF7"
                        data-text-color='#000'
                        data-multiline={true}
                        data-type='info'
                    >
                        <span className='text-square mb-3 px-5'>Scénarios a lancer</span>
                        {
                            countAlancer ?
                            <span className='square4'>{countAlancer}</span>
                            :
                            <span className='square2'>{0}</span>
                        }
                    </Col>
                    :
                    <Col className="col__style-dashboard">
                        <span className='text-square mb-3 px-5'>Scénarios a lancer</span>
                        {
                            countAlancer ?
                            <span className='square4'>{countAlancer}</span>
                            :
                            <span className='square2'>{0}</span>
                        }
                    </Col>
            }
            {
                handleScenarioC?
                <Col className="col__style-dashboard pointer"  onClick={handleScenarioC} 
                        data-tip="cliquer pour voir les scénarios en cours et terminer en premier"
                        data-background-color="#F3FBF7"
                        data-text-color='#000'
                        data-multiline={true}
                        data-type='info'
                    >
                        <span className='text-square mb-3 px-5'>Scénarios ouverts</span>
                        {
                            countEnCours ?
                            <span className='square4'>{countEnCours}</span>
                            :
                            <span className='square2'>{0}</span>
                        }
                    </Col>
                    :
                    <Col className="col__style-dashboard">
                    <span className='text-square mb-3 px-5'>Scénarios ouverts</span>
                    {
                        countEnCours ?
                        <span className='square4'>{countEnCours}</span>
                        :
                        <span className='square2'>{0}</span>
                    }
                </Col>
            }
        </div>
    );
}

//PROPTYPES
RightStat.propTypes = {
    handleScenarioC: PropTypes.func,
    handleScenarioL: PropTypes.func
};

//EXPORT
export default RightStat;