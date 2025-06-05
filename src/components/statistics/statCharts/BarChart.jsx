import React from 'react'
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';


ChartJS.register(ArcElement, Tooltip, Legend);

ChartJS.defaults.set('plugins.datalabels', {
  color: '#fff',
  anchor: 'end',
});

const BarChart = ({ labels = [], data = [],backgroundColor = [],borderColor = []}) => {

    const dataOptions = {
        labels,
        datasets: [
          {
            display: true,
            data,
            backgroundColor,
            borderColor,
            barThickness: 48,
          }
        ],
      };
    
    
      const options = {
        indexAxis: 'y',
        scales: {
          x: {
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              display: false
            }
          },
          y: {
            grid: {
              display: false,
              drawBorder: false,
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }
        },
        plugins: {
          datalabels: {
            display: true,
            color: 'white',
            align: 'center',
            anchor: 'center',
            font: {
              size: 12,
              weight: 700,
            },
            formatter: (value, context) => {
              return Math.round(value) + '%';
            },
          },
          legend:{
            display: false,
          },
        },
          
      };
    
    return <Bar data={dataOptions} plugins={[ChartDataLabels]} options={options} />;
}

export default BarChart;


  
