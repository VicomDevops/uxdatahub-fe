import React from 'react';
import { Bar } from 'react-chartjs-2';

const GroupedBar  = (props) => {
    const { data, options } = props
    return (
    <Bar data={data} options={options} />
  
)};

export default GroupedBar;