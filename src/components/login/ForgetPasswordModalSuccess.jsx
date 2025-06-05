import React from 'react'
import Modals from '../common/modals/modal';
import { Label, FormGroup } from "reactstrap";

const ForgetPasswordModal = ({ visibleInscription, handleInscription,forgetPasswordResponse }) => {
    return (
        <Modals
        modalSize="modal-sm"
        show={visibleInscription}
        toggleShow={() => handleInscription()}
        header='Réinitialisation de votre mot de passe' 
        >
        <div className="col-md-12">
            <FormGroup className="modal_forgetPassword">
                <Label>
                {forgetPasswordResponse}
                </Label>            
            </FormGroup>
        </div>
        </Modals> 
    )
}
export default ForgetPasswordModal