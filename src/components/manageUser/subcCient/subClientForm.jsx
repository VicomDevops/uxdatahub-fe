/**
 * React imports
 */
import React from 'react';
/**
 * Libraries imports
 */
import {Button, Label, Col} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';



/*******************************************************************/
/*                     SubClientForm Component                     */
/******************************************************************/
const SubClientForm = ({confirmText, userText,handleSubmit, currentUser, onchange, loading}) => {
    return (
        <>
            <AvForm onValidSubmit={handleSubmit}>
                <Col md='12'>
                    <div className='modal__form'>         
                            <Label id="label__style__signup">{userText.lastname}</Label>
                            <AvField name="lastname" value={currentUser.lastname}
                                placeholder="Nom de famille" type="text"
                                onChange={onchange}
                                id='lastName'
                                validate={{
                                    maxLength: { value: 50 },
                                    required: { value: true, errorMessage: "Ce champ est obligatoire" },
                                    pattern: { value: "^[a-zA-Z ]{1,50}$", errorMessage: "Les chiffres et les caractéres speciaux ne sont pas autorisé" }
                                }}
                            />
                            <Label id="label__style__signup">{userText.name}</Label>
                            <AvField name="name" value={currentUser.name}
                                placeholder="Prénom" type="text"
                                onChange={onchange}
                                id='firstName'
                                validate={{
                                    maxLength: { value: 50 },
                                    required: { value: true, errorMessage: "Ce champ est obligatoire" },
                                    pattern: { value: "[a-zA-Z]{1,50}$", errorMessage: "Les chiffres et les caractéres speciaux ne sont pas autorisé" }
                                }}
                            />
                            <Label id="label__style__signup">{userText.email}</Label>
                            <AvField name="email" value={currentUser.email}
                                placeholder="Email" 
                                type="email"
                                onChange={onchange}
                                id='email'
                                validate={{
                                    required: { value: true, errorMessage: "Ce champ est obligatoire" },
                                    pattern: { value: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$', errorMessage: "Cette adresse mail n'est pas valide" }
                                }}
                            />
                            <div className="btn_modal_ctn">
                                <Button type="submit" className="btn__form__modal" disabled={loading}
                                >
                                    {loading && <i className="fa fa-refresh fa-spin mr-2" />}{confirmText}</Button>
                            </div>
                    </div>
                </Col>
            </AvForm>

        </>
    )
}
export default SubClientForm

