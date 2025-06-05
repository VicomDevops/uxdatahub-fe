import React from 'react'

export const BeneficeModalBody = ({tick, text}) => {
  return (
    <div className="PayAsYouGo_item">
        <div className="PayAsYouGo_Tick">
            <img src={tick} alt="2M-advisory" className='PayAsYouGo_Tick_img' />
        </div>
        <span className="PayAsYouGo_body_text">{text}</span>
    </div>
  )
}
