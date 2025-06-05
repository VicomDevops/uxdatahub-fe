import React from 'react'
import Homme from '../../../assets/Homme.png'
import Femme from '../../../assets/Femme.png'
const GenderChart = ({data}) => {
  return (
    <div className='gender-chart'>
        <div className='gender-chart-item'>
            <p>{data[0] ?? 0}%</p>   
            <img src={Homme} className="gender_img" alt="Homme" />
        </div>
        <div className='gender-chart-item'>
            <img src={Femme} className="gender_img" alt="Femme" />
            <p>{data[1] ?? 0}%</p> 
        </div>
    </div>
  )
}

export default GenderChart;