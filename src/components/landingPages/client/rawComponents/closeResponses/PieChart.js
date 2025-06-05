import React from "react";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';

function PieChart({ labels = [], data = [], somme, backgroundColor }) {


  function handleHover(evt, item, legend) {
    legend.chart.data.datasets[0].backgroundColor.forEach((color, index, colors) => {
      colors[index] = index === item.index || color.length === 9 ? color : color + '4D';
    });
    legend.chart.update();
  }


  function handleLeave(evt, item, legend) {
    legend.chart.data.datasets[0].backgroundColor.forEach((color, index, colors) => {
      colors[index] = color.length === 9 ? color.slice(0, -2) : color;
    });
    legend.chart.update();
  }


  const dataOptions = {
    labels,
    datasets: [
      {
        label: "Pourcentage par réponse",
        data,
        backgroundColor,
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
          // Vérifiez si la valeur est nulle
          if (value === null) {
            return ''; // Retournez une chaîne vide pour masquer l'étiquette
          }
  
          // Calcul de la valeur en pourcentage
          const percentage = Math.floor(((value / somme) * 100) + 0.5);
  
          if (percentage === 0) {
            return ''; // Retournez une chaîne vide pour masquer l'étiquette
          }
          // Retournez la valeur formatée en pourcentage
          return percentage + '%';
        },
      },
      legend: {
        position: 'right',
        onHover: handleHover,
        onLeave: handleLeave
      },
    },
  };

  return <Pie data={dataOptions} plugins={[ChartDataLabels]} options={options} />;
}

export default PieChart;
