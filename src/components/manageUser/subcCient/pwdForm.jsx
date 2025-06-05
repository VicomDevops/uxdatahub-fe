import React from 'react';
import {
    Button, Label, Col
} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';

const PwdForm = ({
   // tog_standard, 
    confirmText, 
    handleSubmit, currentPwd, onChangePwd, error, loading
}) => {
    return (
        <React.Fragment >
            <AvForm onValidSubmit={handleSubmit}>
                <Col md='12'>
                    <div className='modal__form'>
                            <Label id="label__style">Ancien mot de passe</Label>
                            <AvField name="old_password" value={currentPwd.old_password}
                                placeholder="" type="password"
                                onChange={onChangePwd}
                                id='input__style'
                                validate={{
                                    maxLength: { value: 50 },
                                    required: { value: true, errorMessage: "Ce champ est obligatoire" },
                                   // pattern: { value: "^[a-zA-Z]{1,50}$", errorMessage: "Les chiffres et les caractéres speciaux ne sont pas autorisé" }
                                }}
                            />
                            <Label id="label__style">Nouveau mot de passe</Label>
                            <AvField name="new_password" value={currentPwd.new_password}
                                placeholder="" type="password"
                                onChange={onChangePwd}
                                id='input__style'
                                validate={{
                                    maxLength: { value: 50 },
                                    required: { value: true, errorMessage: "Ce champ est obligatoire" },
                                  //  pattern: { value: "[a-zA-Z]{1,50}$", errorMessage: "Les chiffres et les caractéres speciaux ne sont pas autorisé" }
                                }}
                            />
                            <Label id="label__style">Retaper le nouveau mot de passe</Label>
                            <AvField name="new_password_confirm" value={currentPwd.new_password_confirm}
                                placeholder="" type="password"
                                onChange={onChangePwd}
                                id='input__style'
                                
                                validate={{
                                    required: { value: true, errorMessage: "Ce champ est obligatoire" },
                                    match:{value:'new_password',errorMessage: "Le mot de passe saisie n'est pas identique"}
                                   // pattern: { value: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$', errorMessage: "Cette adresse mail n'est pas valide" }
                                }}
                            />
                            <div className="btn_modal_ctn">
                                <Button type="submit" className="btn__help" style={{width:'10em'}} disabled={loading}
                                >
                                    {loading && <i className="fa fa-refresh fa-spin mr-2" />}{confirmText}</Button>
                            </div>
                    </div>
                </Col>
            </AvForm>

        </React.Fragment >)
}
export default PwdForm

