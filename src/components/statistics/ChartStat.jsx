//REACT IMPORT
import React, { useEffect, useMemo, useState } from "react";
//LIBRARY IMPORTS
import { Label } from 'reactstrap';
import PropTypes from "prop-types";
//ASSET IMPORT
import  noData  from '../../assets/noData.png';
//COMPONENTS IMPORTS
import DoughnutChart from './statCharts/doughnutChart';
import BarChart from "./statCharts/BarChart";
import GenderChart from "./statCharts/GenderChart";
import MapChart from "./statCharts/MapChart";

/**
 * Renders a Doughnut component with the specified props.
 *
 * @param {string} label - The label to be displayed on the Doughnut component.
 * @param {array} lables - An array of labels for the DoughnutChart.
 * @param {array} data - An array of data values for the DoughnutChart.
 * @param {string} backgroundColor - The background color for the DoughnutChart.
 * @param {string} borderColor - The border color for the DoughnutChart.
 * @param {number} somme - The sum of all data values for the DoughnutChart.
 * @return {JSX.Element} - The rendered Doughnut component.
*/
const ChartStat = ({ label, labels, data, backgroundColor, borderColor}) => {
    //HOOK
    const [mapData , setMapData] = useState([])
    const [autre, setAutre] = useState(0)

    /*FUNCTIONS */
    const getLabelName = useMemo(() =>{
        switch(label){
            case "ageRange": return "Age"
            case "gender": return "Genre"
            case "csp": return "Catégorie Socio Professionnelle"
            case "map": return "Régions" 
            case "os": return "Système d'exploitation"
            case "socialMedia": return "Réseaux sociaux"
            case "studyLevel": return "Niveau d'études"
            case 'maritalStatus': return "Situation familiale"
            default: return "Statut"
        }
    },[label])

    const getCSPLabel = useMemo(() =>{
        if(label === "csp"){
            labels.forEach((label, index) => {
                if(label === 'Cadres et profession intellectuelles supérieures'){
                    labels[index] = "Cadres"
                }
            });
            return labels
        }else{
            return labels
        }
            
    },[labels, label])

    let chartContent = null;

    if(label === "csp"){
        chartContent = (
            <div className='barChart_container'>
                <BarChart
                    labels={getCSPLabel}
                    data={data}
                    backgroundColor={backgroundColor}
                    borderColor={borderColor}
                />
            </div>
        )
    }else if (label === "gender"){
        chartContent = (
            <div className='genderChart_container'>
                <GenderChart  data={data} />
            </div>
        )
    }else if (label === "map"){
        chartContent = (    
            <div className='mapChart_container'>
                <MapChart
                    votesData={mapData}
                />
                <div>
                    Etranger : {autre}%
                </div>
            </div>
        )
    }else if(label !== "csp" && label !== "gender" && label !== "map"){
        chartContent = (
            <div className='doughnutChart_container'>
                <DoughnutChart
                    labels={labels}
                    data={data}
                    backgroundColor={backgroundColor}
                    borderColor={borderColor}
                />
            </div>
        )
    }else{
        chartContent = (
            <div className="doughnutChart_noData">
                <img src={noData} alt="noData" />
                <p> Aucune donnée </p>
            </div>
        )
    }
    
    useEffect(() => {
        if(label === "map" && data.length !== 0){
            let dataMap = []
            let autre = 0;
            labels.forEach((label, index) => {
            if (label !== 'Autre' && label !== '00') {
                dataMap.push({ label: label, value: data[index] });
            } else if(label === 'Autre') {
                autre = data[index];
            }
            });
            setMapData(dataMap);
            setAutre(autre);
        }
        return () => {
            setMapData([]);
            setAutre(0);
        }
    }, [data, labels, label]);

    //RENDER
    return(
        <div className='dashboard_panel_result'>
            <div className='dashboard_panel_result_title'>
                <Label>{getLabelName}</Label>
            </div>
            {chartContent}
        </div>
    )
}

//PROPTYPES
ChartStat.propTypes = {
    scenarios: PropTypes.array,
    onChangeScenario: PropTypes.func,
    headerPayload: PropTypes.object
};

//EXPORT
export default ChartStat;