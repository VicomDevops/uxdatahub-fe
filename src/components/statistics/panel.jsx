//REACT IMPORTS
import React, { useState, useEffect, useCallback } from 'react';
//REDUX IMPORT
import { useSelector } from 'react-redux';
//SERVICE IMPORTS
import statServices from "../../services/statServices";
import analyseServices from '../../services/analyzeServices'
//LIBRARY IMPORTS
import { toast } from 'react-toastify';
//STYLES IMPORT
import './statistics.css'
//COMPONENTS IMPORTS
import SpinnerLoader from "../common/loaders/SpinnerLoader";
import ChartStat from './ChartStat';
import DashboardHeader from '../common/header/DashboardHeader';
import NoDataSelected from '../common/NoDataSelected';
import { chartColors } from './helpers/chartDataColors';
import HeaderBar from '../common/header/HeaderBar';


/**
 * A component to display the statistics of a panel.
*/
const StatPanel = () => {

  //HOOKS
  const { data, selectedScenario } = useSelector(state => state.scenario);
  const [headerPayload, setHeaderPayload] = useState([]);
  const [_id, setId] = useState(0);
  const [isEmpty, setIsEmpty] = useState(true);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);

  //FUNCTIONS
  const renderData = (data) => {
    let data1 = []
    data?.map(obj =>
      data1 = [...data1, obj.value]
    )
    return data1
  }
  const renderLabel = (label) => {
    let label1 = []
    label?.map(obj =>
      label1 = [...label1, obj.label]
    )
    return label1
  }


  /**
   * Retrieves the scenario details for a given ID and sets the header payload if the response code is 200.
   *
   * @param {type} id - the ID of the scenario
   * @return {type} undefined
  */
  const getScenario = useCallback(async () => {    
    if (_id) {
      try {
        const response = await statServices.getScenarioDetails(_id);
          if (response?.header.code !== 200) {
            toast.error(response?.header.message)
          } else {
            setHeaderPayload(response?.response);
          }
      } catch (err) {
        toast.error('Error while fetching scenario details')
        console.error('Error',err)
      }
    }
  }, [_id]);


  /**
    * Handles the change event of the scenario.
    *
    * @param {Event} e - The change event object.
    * @return {void} - This function does not return a value.
  */
  const onChangeScenario = (e) => {    
    if (isNaN(e)) {
      setId(e.target.value);
    } else {
      setId(+e);
    }
    setIsEmpty(false)
  }


  useEffect(() => {
  try {
      if (selectedScenario?.id !== null && selectedScenario?.id !== undefined) {
        onChangeScenario(selectedScenario.id);
      }
    } catch {
      toast.error('Une erreur est survenue')
    }
  }, [selectedScenario]);

  useEffect(() => {
    getScenario();
  }, [getScenario]);


  const getPanelStatData = useCallback(async () =>{    
    if(_id){
      setLoading(true)
        try{
          const response = await analyseServices.getPanelStats(_id, 0);
            if(response.header?.code !== 200){
              toast.error(response?.header?.message)
            }else{
              let orderStat = []
              if(response?.response){
                orderStat = {
                  ageRange: response?.response?.ageRange,
                  os: response?.response?.os,
                  map: response?.response?.map,
                  gender: response?.response?.gender,
                  csp: response?.response?.csp
                }
              }
              setStats(orderStat);
            }

        }catch (err) {
          toast.error('Une erreur est survenue')
          console.error("Une erreur est survenue",err);
        }
      }
    setLoading(false)
  },[_id]);

  useEffect(() => {
    getPanelStatData()
  }, [getPanelStatData]);


  //RENDRE
  return (
    <div className="statPanel" >
      <DashboardHeader>
        <HeaderBar
          title="Statistiques du panel"
          header={headerPayload}
          scenarios={data}
          onChangeScenario={onChangeScenario}
          renderType="panel"
        />
      </DashboardHeader>
      {
        isEmpty === false ?
          <>
            {
              loading ? 
                <SpinnerLoader />
              :
                <div className='dashboard_panel_container'>
                  {
                    Object.entries(stats).map(([label, data], index) => (
                      data.length > 0 &&
                        <ChartStat 
                          key={index}
                          label={label}
                          labels={renderLabel(data)}
                          data={renderData(data)}
                          backgroundColor={chartColors.datasets[0].backgroundColor}
                          borderColor={chartColors.datasets[0].borderColor} 
                        />
                    ))
                  }
                </div> 
            }
          </>  
          :
            <NoDataSelected title="Veuillez sélectionner un scénario." />
        }
    </div>
  );
}

export default StatPanel;