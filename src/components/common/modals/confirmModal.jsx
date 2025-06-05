import React from "react";
import {
    ModalHeader, Button, Modal, ModalBody, ModalFooter
} from 'reactstrap';
import '../common.css'



function ComfirmModal({ show, toggleShow,  onSubmit }) {
    return (
        <Modal
            isOpen={show}
            toggle={() => toggleShow()}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <ModalHeader toggle={() => toggleShow()}>Confirmation</ModalHeader>
            <ModalBody>
                <h2 >Etes vous sure de vouloir supprimer cette etape?</h2>
            </ModalBody>
            <ModalFooter>
                <Button className='btn__2'
                    onClick={() => {
                        toggleShow();
                    }}><i>{'Annuler '} </i></Button>{' '}
                <Button className='btn__1'
                    onClick={() => {
                        onSubmit();
                        toggleShow();
                    }}>
                    <i>{'Confirmer '}</i> </Button>
            </ModalFooter>
        </Modal>
    )
}
export default ComfirmModal;