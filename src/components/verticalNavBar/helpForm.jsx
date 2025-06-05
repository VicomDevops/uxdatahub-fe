import React from 'react';
import {
    Button, Label, Col, FormFeedback
} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import flags from 'react-phone-number-input/flags';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
const HelpForm = ({
    tog_standard, confirmText, subject,onChangePhone,
    handleSubmit, currentHelp, onchange, error, loading
}) => {


    return (
        <React.Fragment >

            <AvForm onValidSubmit={handleSubmit}>
                <Col md='12'>
                    <div className='modal__form'>

                        <Label id="label__style">Sujet de la demande <span style={{color : "red"}}>*</span></Label>
                        <AvField type="select" name="Subject" id='input__style' onChange={onchange}
                            validate={{
                                required: { value: true, errorMessage: "Ce champ est obligatoire" },

                            }}
                        >
                            <option value="" disabled defaultValue>Veuillez sélectionner votre sujet</option>
                            {subject.map(res => <option key={res} value={res}>{res}</option>)}
                        </AvField>

                        <Label id="label__style">Nom <span style={{color : "red"}}>*</span></Label>
                        <AvField name="Nom" value={currentHelp.Nom}
                            placeholder="Nom de famille" type="text"
                            onChange={onchange}
                            id='input__style'
                            validate={{
                                maxLength: { value: 50 },
                                required: { value: true, errorMessage: "Ce champ est obligatoire" },
                                pattern: { value: "^[a-zA-Z ]{1,50}$", errorMessage: "Les chiffres et les caractéres speciaux ne sont pas autorisé" }
                            }}
                        />
                        <Label id="label__style">Prénom <span style={{color : "red"}}>*</span></Label>
                        <AvField name="Prenom" value={currentHelp.Prenom}
                            placeholder="Prénom" type="text"
                            onChange={onchange}
                            id='input__style'
                            validate={{
                                maxLength: { value: 50 },
                                required: { value: true, errorMessage: "Ce champ est obligatoire" },
                                pattern: { value: "[a-zA-Z ]{1,50}$", errorMessage: "Les chiffres et les caractéres speciaux ne sont pas autorisé" }
                            }}
                        />
                         <Label id="label__style">Email <span style={{color : "red"}}>*</span></Label>
                        <AvField name="email" value={currentHelp.email}
                            placeholder="Email" type="text"
                            onChange={onchange}
                            id='input__style'
                            invalid={error && error.email ? true : false}
                            validate={{

                                required: { value: true, errorMessage: "Ce champ est obligatoire" },
                                pattern: { value: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$', errorMessage: "Cette adresse mail n'est pas valide" }
                            }}
                        />
                        {error && <FormFeedback  >{error.email} </FormFeedback>} 
                        <Label id="label__style">Téléphone <span style={{color : "red"}}>*</span></Label>

                        <PhoneInput
                            // country="FR"
                            id='input__style'
                            flags={flags}
                            value={currentHelp.Phone}
                            //error={phone ? (isValidPhoneNumber(phone) ? undefined : 'Invalid phone number') : 'Phone number required'}
                            onChange={onChangePhone} />
                        {currentHelp.phone ? (isValidPhoneNumber(currentHelp.phone) ? undefined : <FormFeedback  >Numéro de téléphone invalide </FormFeedback>) : null}
                        {(currentHelp.company !== "" && currentHelp.phone === "") && <FormFeedback  >Ce champ est obligatoire </FormFeedback>}

                        <Label id="label__style">Commentaire <span style={{color : "red"}}>*</span></Label>
                        <AvField name="Commentaire" value={currentHelp.Commentaire}
                             type="textarea"
                            onChange={onchange}
                            id='text__area2'
                            validate={{

                                required: { value: true, errorMessage: "Ce champ est obligatoire" },

                            }}
                        />
                        <div className="btn_modal_ctn">
                            <Button type="submit" className="btn__help" disabled={loading}
                            >
                                {loading && <i className="fa fa-refresh fa-spin mr-2" />}{confirmText}</Button>

                        </div>
                    </div>
                </Col>
            </AvForm>

        </React.Fragment >)
}
export default HelpForm

