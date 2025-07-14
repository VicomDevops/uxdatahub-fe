import React from 'react'
import Modals from '../common/modals/modal';
import './modal.css'


const ConfimInscription = ({ visibleInscription, handleInscription }) => {
    return (
        <Modals
        show={visibleInscription}
        toggleShow={() => handleInscription()}
        >
            <>
                <div className="col-md-12">
                    <div className='modal_inscription_admin'>
                        <div className='header_popup'>
                            Bienvenue chez <span style={{ color : "#00A359", fontWeight : 500}}> UX DATAHUB </span>
                            !<br />
                        </div>
                        <div>
                        Vous allez à présent optimiser l’expérience client de vos application. <br />
                        Votre compte est en cours de validation. Dès que cette étape sera terminée, vous recevrez un email contenant votre mot de passe. Vous pourrez alors commencer à créer votre magie !
                        </div>
                    </div>
                </div>
            </>
        </Modals> 
    )
}  

export default ConfimInscription

