import React from 'react'
import Modals from '../common/modals/modal';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Label, FormGroup, Button } from "reactstrap";


const ForgetPasswordModal = ({ visibleInscription, handleInscription,handleSubmitFrom, onChange,forgetPasswordLoading }) => {
    return (
        <Modals
        modalSize="modal-sm"
        show={visibleInscription}
        toggleShow={() => handleInscription()}
        header='Mot de passe oublié'
        >
        <div className="col-md-12">
            <AvForm onSubmit={handleSubmitFrom}>
                <FormGroup className="modal_forgetPassword">
                    <Label className="label_input_modal_forgetPassword">Votre adresse email</Label>
                    <AvField
                        type="email"
                        onChange={onChange}
                        name="email"
                        id="email"
                        className="froget_modal_input"
                        validate={{
                        pattern: { value: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$', 
                        errorMessage: "Cette adresse mail n'est pas valide" },
                        required: { value: true, errorMessage: "Ce champ est obligatoire" },
                        }}
                    />            
                </FormGroup>
                <div className='modal_forgetPassword_footer'>

                    <Button className="modal_forgetPassword_btn"
                        style={{ 
                            height : "2rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: "1rem",
                        }}
                        disabled={forgetPasswordLoading}

                    > 
                        {forgetPasswordLoading && <i className="fa fa-refresh fa-spin mr-2" />}
                        Envoyer
                    </Button>
                </div>
            </AvForm>
        </div>
        </Modals> 
    )
}
export default ForgetPasswordModal