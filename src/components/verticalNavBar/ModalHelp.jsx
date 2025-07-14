import React from 'react'
import Modals from '../common/modals/modal'
import './modal.css'
import { Link } from 'react-router-dom';
const ModalInscription = ({ visible, toggleVisible }) => {


  return (
    <Modals
      show={visible}
      toggleShow={() => toggleVisible()}
    >
      <div className="col-md-12">
        <span  className='model_inscription'>Votre demande a bien été envoyer et nous vous en <br /> remercions. 
        Nos conseillers UX DATAHUB <br /> reviendront vite vers vous.</span>
        <div className="btn_modal_ctn">
            <Link type="submit" className="btn__form__modal" to={"/client"} onClick={() => toggleVisible()}>
                Revenir sur le tableau de bord
            </Link>
        </div>  
      </div>
    </Modals> 
  )
}

export default ModalInscription

