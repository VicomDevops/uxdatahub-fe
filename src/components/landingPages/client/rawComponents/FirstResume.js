//REACT IMPORTS
import React, { useState, useEffect, useMemo, useCallback } from "react";
//LIBRARY IMPORTS
import { toast } from "react-toastify";
//COMPONENTS IMPORTS
import PieComponent from "./closeResponses/PieComponent";
import BarComponent from "./scaleResponses/BarComponent";
import OpenComponent from "./openResponses/OpenComponent";
import SpinnerLoader from "../../../common/loaders/SpinnerLoader";
import statServices from "../../../../services/statServices";
import { STEP_TYPE } from "../../../../utils/constant";

/**
 * Fetches data and processes it to generate components for display.
 *
 * @param {object} props - The properties object
 * @return {JSX.Element} The components to be displayed
*/
function FirstResume(props) {
  
  /*HOOKS */
  const [loading, setLoading] = useState(true);
  const [components, setComponents] = useState([]);  
  const id = useMemo(() => !isNaN(+props?._id) && props?._id, [props]);  

  /*FUNCTIONS */


  /**
   * This function asynchronously retrieves data and handles any errors that may occur.
   *
   * @return {Promise} the response data if successful
  */
  const getData = useCallback(async () => {
    try {
      const response = await statServices.getScenarioStat(id);
      if (response.header.code !== 200) {
        toast.error(response.header.message);
      } else {
        return response.response;
      }
    } catch (error) {
      console.log(error);
    }
  }, [id]);
  


  const createArrayOfAnswers = useCallback((answers) => (
    answers?.map((val) => ({
      id: val?.id,
      answer: val?.answer,
      tester_id: val?.clientTester?.id,
      name: `${val?.clientTester?.name.charAt(0).toUpperCase() + val?.clientTester?.name.slice(1)} ${val?.clientTester?.lastname.charAt(0).toUpperCase()}`
    }))
  ), []);
  
  const createArrayOfComments = useCallback((answers) => answers?.map((val) => val?.comment), []);
  
  const createArrayOfNames = useCallback((answers) =>
    answers?.map((val) =>
      `${val?.clientTester?.name.charAt(0).toUpperCase() + val?.clientTester?.name.slice(1)} ${val?.clientTester?.lastname.charAt(0).toUpperCase()}`
    )
  , []);

  /**
   * This function is an asynchronous function that fetches data and processes it to generate an array of charts. 
   * It sets loading to true before fetching the data, and then sets it to false after processing the data. 
  */
  const dataSteps = useCallback(async () => {
    setLoading(true);
    const data = await getData();
    if (!data) {
      setLoading(false);
      toast.error("Error while fetching data");
      return;
    }
    
    const arrayOfCharts = Object.keys(data).map((key, index) => {
      const object = data[key];
      const answers = object?.answers || [];

      if (object?.type === STEP_TYPE.CLOSE) {
        return {
          component: (
            <PieComponent
              key={index}
              graphData={object?.Graph}
              question={object?.question}
              index={index}
              comments={createArrayOfComments(answers)}
              names={createArrayOfNames(answers)}
              totalResponse={object?.totalResponse}
              answers={createArrayOfAnswers(answers)}
            />
          )
        };
      }

      if (object?.type === STEP_TYPE.OPEN) {
        return {
          component: (
            <OpenComponent
              key={index}
              answers={createArrayOfAnswers(answers)}
              question={object?.question}
              etapeNumbre={object.step_number}
            />
          )
        };
      }

      if (object?.type === STEP_TYPE.SCALE) {
        return {
          component: (
            <BarComponent
              key={index}
              data={object?.Graph}
              question={object?.question}
              index={index}
              comments={createArrayOfComments(answers)}
              names={createArrayOfNames(answers)}
              infBorne={object?.InfBorne}
              supBorne={object?.SupBorne}
              answers={createArrayOfAnswers(answers)}
              totalResponse={object?.totalResponse}
            />
          )
        };
      }
      return null;
    }).filter(Boolean);

    setComponents(arrayOfCharts);
    setLoading(false);
  }, [createArrayOfAnswers, createArrayOfComments, createArrayOfNames, getData]);

  /* EFFECT */
  useEffect(() => {
    const fetchDataSteps = async () => {
        await dataSteps();
    };
    
    fetchDataSteps();
    return () => {};
  }, [dataSteps]);


  /*RENDER */
  return (
    <>
      {
        loading ?
          <SpinnerLoader />
          :
          <>
            {components?.map((item, index) => (
              <div className="allDataResponse mb-1" key={index}>
                {item.component}
              </div>
            ))}
          </>
      }
    </>
  );
}

export default FirstResume;
