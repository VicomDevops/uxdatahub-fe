//REACT IMPORTS
import React from "react";
//COMPONENTS IMPORTS
import LineChart from '../../../common/charts/lineChart2';
import StepChips from "../StepChips";
import PropTypes from "prop-types";

/**
 * Renders the chart section for analyzing data.
 *

 * @param {Object} dataAv - The dataAv object.
 * @param {Object} dataMoyChart - The dataMoyChart object.
 * @param {Object} dataEcartChart - The dataEcartChart object.
 * @param {Function} stepView - The stepView function.
 * @param {Function} onChangeStep - The onChangeStep function.
 * @param {Object} analyseObj - The analyseObj object.
 * @return {JSX.Element} The rendered chart section.
 */
const AnalyseChartSection = ({ dataMoyChart, stepView, onChangeStep, analyseObj, activeEmotion }) => {

    //VARIABLES
    const dataAndLabels = analyseObj
    .map(({ average, labels }) => ({
        average: typeof average === "string"
            ? parseFloat(average) || 0
            : parseFloat(average[activeEmotion]) || 0,
        labels
    }))
    .sort((a, b) => a.average - b.average);

    const data = dataAndLabels.map(item => item.average);
    const labels = dataAndLabels.map(item => item.labels);

    /**
     * Handles the change in etape.
     * @param {number|string} step - The number of the step to change to.
     * If the step is a string, it is expected to be a string representation of a number
     * prefixed with a digit (e.g. "1", "2", etc.)
     */
    const handleChangeEtape = (step) => {
        if (step !== undefined && step !== null) {
            if(isNaN(step)){
                step = step.substring(1);
                step = parseInt(step);
            }else{
                step = step + 1
            }
            onChangeStep(step);
            stepView();
        }
    }

    const options = {
        responsive: true,
        type: 'line',
        plugins: {
            datalabels: {
                display: true,
                align: 'end',
                anchor: 'end',
                color: function (context) {
                    var index = context.dataIndex;
                    var value = +context.dataset.data[index];
                    return value < 0 ? 'red' :  
                        value === 0 ? 'black' :  
                            'green';            
                },
                font: {
                    weight: 'bold',
                    size: 12,
                },
            },
            legend: {
                display: true,
            },
            tooltip: {
                enabled: false,
                position: 'nearest',
            },
        },
        scales: {
            x: {
                type: 'category',
                grid: {
                    display: true,
                    color: "rgba(0, 0, 0, 0.1)",
                    lineWidth: 1, 
                },
            },
            y: {
                ticks: {
                    color: function (context) {
                        return context.tick?.value === 0 ? 'black' : context.tick?.value > 0 ? "green" : 'red';
                    },
                },
                grid: {
                    display: true,
                    color: (context) => {
                        if (context.tick?.value === 0) {
                            return "black";
                        } else {
                            return "rgba(0, 0, 0, 0.1)"; 
                        }
                    },
                    borderDash: [4, 2],
                },
                suggestedMin: -0.5,
                suggestedMax: 0.5,
                type: 'linear',
            }
        },
        borderColor: 'grey',
        backgroundColor: 'grey',
        cubicInterpolationMode: 'monotone',
        pointRadius: 2.8,
        pointHoverRadius: 6,
        fill: false,
        onClick: (event, elements) => elements && elements[0]?.datasetIndex === 0 && handleChangeEtape(elements[0]?.index),
    };
    

    //RENDER
    return(
        <div className='chart_container_analyse'>
            <div>
                <span className='journey_map'>Journey Map</span>
            </div>
            <div className='chart-section'>
                <div className='chart_style' data-tip='Moyenne des ressentis par étape'>
                    <LineChart
                        data={dataMoyChart}
                        options={options}
                    />
                </div>
            </div>
            <div className='chart_footer'>
                <div className='chart_footer_TOP'>
                    <div className='top_color'>TOP</div>
                    <div className='result_container'>
                        <StepChips labels={labels[labels.length - 1]} data={data && data[data.length - 1]} handleChangeEtape={handleChangeEtape} classNameContainer='etape_result_top-flop' />
                        {
                            data && data?.length >= 6 &&
                            <>
                                <StepChips labels={labels[labels.length - 2]} data={data && data[data.length - 2]} handleChangeEtape={handleChangeEtape} classNameContainer='etape_result_top-flop' />
                                <StepChips labels={labels[labels.length - 3]} data={data && data[data.length - 3]} handleChangeEtape={handleChangeEtape} classNameContainer='etape_result_top-flop'/>
                            </>
                        }
                    </div>
                </div>
                <div className='chart_footer_FLOP'>
                    <div className='flop_color'>FLOP</div>
                    <div className='result_container'>
                        <StepChips labels={labels[0]} data={data[0]} handleChangeEtape={handleChangeEtape} classNameContainer='etape_result_top-flop'/>
                        {
                            data && data?.length >= 6 &&
                            <>
                                <StepChips labels={labels[1]} data={data[1]} handleChangeEtape={handleChangeEtape} classNameContainer='etape_result_top-flop'/>
                                <StepChips labels={labels[2]} data={data[2]} handleChangeEtape={handleChangeEtape} classNameContainer='etape_result_top-flop'/>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

//PROPTYPES
AnalyseChartSection.propTypes = {
    dataMoyChart: PropTypes.array.isRequired,
    stepView: PropTypes.string.isRequired,
    onChangeStep: PropTypes.func.isRequired,
    analyseObj: PropTypes.array.isRequired,
    activeEmotion: PropTypes.string
};

//EXPORT
export default AnalyseChartSection;