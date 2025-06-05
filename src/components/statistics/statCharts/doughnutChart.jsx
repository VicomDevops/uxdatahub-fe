import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart({ labels=[], data=[], backgroundColor=[], borderColor=[] }) {

  const dataOptions = {
    labels, 
    datasets: [
      {
        display: true,
        label: '# of Votes',
        data,
        backgroundColor,
        borderColor,
        borderWidth: 1,
        hoverOffset: 10,
        cutout: '50%',
      },{
        datalabels: {
          labels: {
            value: {
              color: 'white',
            }
          }
        }
      }
    ],
  };


  const options = {
    plugins: {
      datalabels: {
        display: true,
        color: 'white',
        anchor: 'center',
        align: 'center',
        font: {
          size: 12,
          weight: 500,
        },
        borderRadius: 5,
        formatter: (value, context) => {
          return Math.round(value) + '%';
        },
      },
      legend:{
        position: 'bottom',
        align: 'start',
        labels: {
          boxWidth: 20,
          usePointStyle: true,
          padding: 10,
          font: {
            size: 12,
            weight: 500,
          },
        },
      },
    },
      
  };

  return <Doughnut data={dataOptions} plugins={[ChartDataLabels]} options={options} />;
}

export default DoughnutChart;
