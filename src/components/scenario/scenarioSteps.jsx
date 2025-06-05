import React from "react";
import './scenario.css'
import Tick from "../../assets/tick.svg"

const ScenarioSteps = (props) => {
    const { stepsName, count,hundlestep } = props

    return (
        <div className='steps__container'>
            <span className='title__steps'>Création de votre scénario</span>
            {stepsName.map((name, idx) => {
                return (
                    <div key ={idx} className='display__flex__row'>
                        <span onClick={hundlestep} className={`step${(count === idx) ? '__selected' : ''}`}>{name}</span>
                        {(count > idx) && <img src={Tick} alt="" className='tick__scenario' />}
                    </div>
                )

            })}
        </div>
    )
}
export default ScenarioSteps