import React from 'react'
import { Button, Modal } from 'reactstrap'

export const ContratAenvoyer = ({show, toggleContrat, activate}) => {


  return (
    <Modal
        isOpen={show}
        className="modal-sm center-modal justify-content-center align-items-center"
        toggle={toggleContrat}
    >
    <div className='contratAEnvoyer_container mt-3'>
        <span className='contartAEnvoyer'> Envoyer le mail 
                <br />
                "contact à signer"
        </span>
        <Button className='btn-success contratAEnvoyerBtn my-3' onClick={activate}>Oui</Button>
    </div>
    </Modal>
  )
}
