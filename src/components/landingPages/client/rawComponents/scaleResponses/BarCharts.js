import React from "react";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';


function BarChart({ labels , data ,somme }) {

  const dataOptions = {
    labels,
    datasets: [
      {
        label: "Nombre de réponses",
        data,
        backgroundColor: "#17A25C",
        borderColor: "#17A25C",
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        display: true,
        color: '#fff',
        align: 'center',
        anchor: 'center',
        font: {
          size: 16,
          weight: 700,
        },
        formatter: (value, context) => {
          return  Math.floor(((value/somme) * 100)) + '%';
        },
      },
      title: {
        display: false,
        text: "Question à échelle de notation ",
      },
    },      
    legend:{
      position: 'top',
    },
    ticks: {
      beginAtZero: false, 
      stepSize: 2, 
    },
    scales: {
      y: {
        display: true,
        ticks: {
          display: false,
      }
    }
  }
  };
  return <Bar data={dataOptions} plugins={[ChartDataLabels]} options={options} />;
}

export default BarChart;
