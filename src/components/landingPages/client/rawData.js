//REACT IMPORTS
import React, { useState, useEffect, useCallback } from "react";
//REDUX IMPORT
import { useSelector } from 'react-redux';
//SERVICE IMPORTS
import statServices from "../../../services/statServices";
//LIBRARY IMPORTS
import { toast } from "react-toastify";
//STYLES IMPORT
import './rowData.css'
//COMPONENTS IMPORTS
import FirstResume from "./rawComponents/FirstResume";
import SpinnerLoader from "../../common/loaders/SpinnerLoader";
import DashboardHeader from "../../common/header/DashboardHeader";
import NoDataSelected from "../../common/NoDataSelected";
import HeaderBar from "../../common/header/HeaderBar";


/**
 * Component displaying the details of a scenario
 */
function RawData() {

  //HOOKS
  const {data, selectedScenario} = useSelector((state) => state.scenario);
  const [_id, setId] = useState(0);
  const [headerPayload, setHeaderPayload] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [arrayOfTesterId, setArrayOfTesterId] = useState([]);


  //FUNCTIONS
  const getScenario = useCallback(async () => {    
    try {
      setLoading(true)
      if (_id) {
        const scenarioDetails = await statServices.getScenarioDetails(_id);
        if(scenarioDetails.header.code !== 200){
          return toast.error(scenarioDetails.header.message)
        }else {
            setHeaderPayload(scenarioDetails?.response);
            const scenarioStats = await statServices.getScenarioStat(scenarioDetails?.response.id);
            if(scenarioStats.header.code !== 200){
              return toast.error(scenarioStats.header.message)
            }else{
              setIsEmpty(false)
              let data = scenarioStats.response;
              let arrayOfTesters = new Set();

              Object.keys(data).forEach((key) => {
                const object = data[key];
                const testers = object?.answers?.map((val) => val?.clientTester?.id) || [];
                testers.forEach((id) => arrayOfTesters.add(id));
              });
              
              arrayOfTesters = Array.from(arrayOfTesters);
              setArrayOfTesterId(arrayOfTesters);
            }
          }
      }  
    } catch (error) {
      console.log("Error",error)
    }finally {
      setLoading(false);
    }
  }, [_id]);


  const onChangeScenario = useCallback((e) => {    
    if (isNaN(e)) {
      setId(e.target.value);
    } else {
      setId(+e);
    }
  }, []);

  useEffect(() => {
    try{
      if (selectedScenario?.id !== null && selectedScenario?.id !== undefined) {
        setId(selectedScenario.id);
        onChangeScenario(selectedScenario.id);
      }
    }catch(error){
        console.log("Error loading scenario", error);
    }
  }, [selectedScenario, onChangeScenario]);


  useEffect(() => {
    try{
      getScenario();
    }catch(error){
      console.log("Error loading scenario", error);
    }
  }, [getScenario]);

  useEffect(() => {
    return () => {
      console.log("unmount");
    }
  }, []);

  //RENDER
  return (
    <div className="raw-container">
      <DashboardHeader>
        <HeaderBar
          title="Visualisation des réponses"
          header={headerPayload}
          scenarios={data}
          onChangeScenario={onChangeScenario}
          renderType="allData"
          arrayOftesters={arrayOfTesterId}
          skeleton={loading}
          excel={true}
        />
      </DashboardHeader>
      {
        !isEmpty?(
          <>
            {
              loading ? (
                <div className="allDataResponseLoadersContainer">
                  <SpinnerLoader />
                </div>
              ):(
                <div className="mb-5">
                  <FirstResume _id={_id} />
                </div>
              )
            }
          </>
        ):(
          <NoDataSelected title="Veuillez sélectionner un scénario." />
        )
      }
    </div>
  );
}


//EXPORT
export default RawData;