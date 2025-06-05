//REACT IMPORT
import React, { useCallback, useEffect, useState } from 'react'
//REDUX IMPORT
import { useSelector } from 'react-redux';
//LIBRARY IMPORT
import { toast } from 'react-toastify';
//STYLES IMPORT
import './rapport.css';
//SERVICES IMPORT
import statServices from '../../../../services/statServices';
import { generatedMultiplePagePDF_Portrait } from '../../../../utils/generatePDF';
import reportServices from '../../../../services/reportServices';
//COMPONENTS IMPORT
import DashboardHeader from '../../../common/header/DashboardHeader';
import HeaderBar from '../../../common/header/HeaderBar';
import Report from './components/Report';
import SpinnerLoader from '../../../common/loaders/SpinnerLoader';
import NoDataSelected from '../../../common/NoDataSelected';
import LoaderButton from '../../../common/loaders/LoaderButton';

const RapportRecommandations = () => {
    //HOOKS
    const {data, selectedScenario} = useSelector((state) => state.scenario);
    const [loading, setLoading] = useState(false);
    const [isEmpty, setIsEmpty] = useState(true);
    const [headerPayload, setHeaderPayload] = useState({});
    const [_id, setId] = useState(0);
    const [scenariosResponse, setScenariosResponse] = useState([]);
    const [loadingPDF, setLoadingPDF] = useState(false);
    const [error, setError] = useState(null);

    //FUNCTIONS
    const onChangeScenario = useCallback((e) => {    
        if (isNaN(e)) {
            setId(e.target.value);
        } else {
            setId(+e);
        }
    }, []);


    const getScenarioData = useCallback(async () => {
        try {
            setLoading(true)            
            if (_id) {
                const scenarioDetails = await statServices.getScenarioDetails(_id);
                if(scenarioDetails?.header.code !== 200){
                    return toast.error(scenarioDetails?.header.message)
                }else {
                    setHeaderPayload(scenarioDetails?.response);
                    setIsEmpty(false);
                    const scenarioReport = await reportServices.getRecommendationReport(scenarioDetails?.response.id);
                    if(scenarioReport?.header.code !== 200){
                        return toast.error(scenarioReport?.header.message)
                    }else{
                        let data = scenarioReport?.response;
                        if (!data || !Array.isArray(data)) {
                            return null;
                        }
                        setScenariosResponse(data);                        
                    }
                }
            }
            setLoading(false); 
        } catch (error) {
            console.log("Error",error)
        }
    }, [_id]);


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
            getScenarioData();
        }catch(error){
            console.log("Error loading scenario", error);
        }
    }, [getScenarioData]);


    const handleDownloadRapport = useCallback(async () => {
        if (!scenariosResponse) return;
        try {
            setLoadingPDF(true);
            await generatedMultiplePagePDF_Portrait("Synthèse des recommandations", scenariosResponse[0]?.step_details?.scenario_name, scenariosResponse?.length);
        } catch (err) {
            console.error(err);
            setError('Erreur lors de la génération du PDF.');
        } finally {
            setLoadingPDF(false);
        }
    }, [scenariosResponse]);


    //RENDER
    return (
        <div className='rapport-container'>
            <DashboardHeader>
                <HeaderBar
                    title="Synthèse des recommandations"
                    header={headerPayload}
                    scenarios={data}
                    onChangeScenario={onChangeScenario}
                    renderType="allData"
                    skeleton={loading}
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
                            <> 
                                <div>
                                    {
                                        scenariosResponse?.map((scenario, index) => (
                                            <Report key={index} data={scenario} />
                                        ))
                                    }
                                </div>
                                <div className='w-100 d-flex justify-content-center align-items-center'>
                                    {error && <p className="error-text">{error}...</p>}    
                                    <LoaderButton className="btn-success my-5" loading={loadingPDF} name="Télècharger PDF" onClick={handleDownloadRapport} />
                                </div>
                            </>
                        )
                    }
                </>
                ):(
                    <NoDataSelected title="Veuillez sélectionner un scénario." />
                )
            }
        </div>
    )
}

//Export
export default RapportRecommandations;
