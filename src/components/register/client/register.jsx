import React from 'react';
import { Button, Label, Col, FormFeedback } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import './register.css'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from "react-router-dom";
import flags from 'react-phone-number-input/flags';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-input-2/lib/style.css'


const ClientRegisterForm = ({
    tog_standard, confirmText, usecase, userText, nbemployees, checkedCGU, checkedPDC, handleChange, errorEmail,
    handleSubmit, currentUser, onchange, error, loading, onChangePhone, field, confirmText2, handleConditions, handlePolitique, erreurCondtion
}) => {
    return (
        <>
            <AvForm onValidSubmit={handleSubmit}>
                <Col md='12'>
                    <div className='modal__form'>
                        {!field && <>
                            <Label id="label__style">{userText.useCase}<span style={{ color: 'red' }}> *</span></Label>
                            <AvField type="select" name="useCase" id='input__style' onChange={onchange}
                                validate={{
                                    required: { value: true, errorMessage: "Ce champ est obligatoire" },
                                }}
                            >
                                <option value="" disabled defaultValue>Veuillez sélectionner votre cas d'utilisation</option>
                                {usecase.map(res => <option key={res} value={res}>{res}</option>)}
                            </AvField>
                        </>}
                        {currentUser.useCase !== "Testeur" ?
                            <>
                                {!field ? 
                                    <>
                                        <Label id="label__style">{userText.lastname}<span style={{ color: 'red' }}> *</span></Label>
                                        <AvField name="lastname" value={currentUser.lastname}
                                            placeholder="Nom de famille" type="text"
                                            onChange={onchange}
                                            id='input__style'
                                            validate={{
                                                maxLength: { value: 50 },
                                                required: { value: true, errorMessage: "Ce champ est obligatoire" },
                                                pattern: { value: "^[a-zA-Z ]{1,50}$", errorMessage: "Les chiffres et les caractéres speciaux ne sont pas autorisé" }
                                            }}
                                        />
                                        <Label id="label__style">{userText.name}<span style={{ color: 'red' }}> *</span></Label>
                                        <AvField name="name" value={currentUser.name}
                                            placeholder="Prénom" type="text"
                                            onChange={onchange}
                                            id='input__style'
                                            validate={{
                                                maxLength: { value: 50 },
                                                required: { value: true, errorMessage: "Ce champ est obligatoire" },
                                                pattern: { value: "[a-zA-Z ]{1,50}$", errorMessage: "Les chiffres et les caractéres speciaux ne sont pas autorisé" }
                                            }}
                                        />
                                        <Label id="label__style">{userText.email}<span style={{ color: 'red' }}> *</span></Label>
                                        <AvField name="email" value={currentUser.email}
                                            placeholder="Email" type="text"
                                            onChange={onchange}
                                            id='input__style'
                                            invalid={error && error.email ? true : false}
                                            validate={{
                                                required: { value: true, errorMessage: "Ce champ est obligatoire" },
                                                pattern: { value: '[a-zA-Z0-9._%+-]+@(?!gmail|outlook|live|free|hotmail|ironfle|yahoo|laposte)[a-zA-Z0-9.-]+.[a-z]{2,3}$', errorMessage: "Doit être un e-mail professionnel du type valide.example@votredomaine.com" }
                                            }}
                                        />
                                        {error && <FormFeedback  >{error.email} </FormFeedback>}
                                        {errorEmail && <span style={{ color: '#dc3545', fontSize: '13px', marginTop: "-15px" }}> {errorEmail} <br /> </span>}
                                        <Label id="label__style">{userText.company}<span style={{ color: 'red' }}> *</span></Label>
                                        <AvField name="company" value={currentUser.company}
                                            placeholder="Société" type="text"
                                            onChange={onchange}
                                            id='input__style'
                                            validate={{
                                                required: { value: true, errorMessage: "Ce champ est obligatoire" },
                                            }}
                                        />

                                        <Label id="label__style">{userText.phone}<span style={{ color: 'red' }}> *</span></Label>
                                        {/* <AvField name="phone" label="telephone"id='input__style' type="tel" validate={{required: { value: true, errorMessage: "Ce champ est obligatoire" },}} /> */}
                                        <PhoneInput
                                            flags={flags}
                                            value={currentUser.phone}
                                            onChange={onChangePhone}
                                            country={'fr'}
                                            inputProps={{
                                                required: true,
                                            }}
                                            containerClass="my-container-class"
                                            inputClass="my-input-class"
                                            inputStyle={{
                                                borderColor:  field && "red"
                                            }}
                                            
                                        />
                                        {currentUser.phone ? (isValidPhoneNumber('+' + currentUser.phone) ? undefined : <FormFeedback  >Numéro de téléphone invalide <br /> </FormFeedback>) : null}
                                        {/* {phoneRequired && !currentUser.phone ? <FormFeedback> Ce champ est obligatoire </FormFeedback> : null} */}
                                    </>
                                    :
                                    <>
                                        <Label id="label__style">{userText.profession}</Label>
                                        <AvField name="profession" value={currentUser.profession}
                                            placeholder="Fonction" type="text"
                                            onChange={onchange}
                                            id='input__style'
                                        />
                                        <Label id="label__style">{userText.sector}</Label>
                                        <AvField name="sector" label="" value={currentUser.sector}
                                            placeholder="Secteur" type="text"
                                            onChange={onchange}
                                            id='input__style'
                                        />
                                        <Label id="label__style">{userText.nbEmployees}</Label>
                                        <AvField type="select" name="nbEmployees" id='input__style' onChange={onchange}>
                                            <option value="" defaultValue>Saisir le nombre d'employés</option>
                                            {nbemployees.map(res => <option key={res} value={res}>{res}</option>)}

                                        </AvField>
                                        <Label id="label__style">Commentaire</Label>
                                        <AvField name="Commentaire"
                                            value={currentUser.Commentaire}
                                            type="textarea"
                                            onChange={onchange}
                                            id='text__area2'
                                        />
                                        <div>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={checkedPDC}
                                                        onChange={handleChange}
                                                        name="privacyPolicy"
                                                        color="primary"
                                                    />
                                                }
                                            />
                                            <span style={{ fontSize: '11px', marginLeft: '-1.2em' }}>
                                                J’ai lu et j’accepte la  <span className='conditions_text' onClick={handlePolitique}>politique de confidentialité</span> d’Insight Data</span>
                                        </div>
                                        <div>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={checkedCGU}
                                                        onChange={handleChange}
                                                        name="cgu"
                                                        color="primary"
                                                    />
                                                }
                                            />
                                            <span style={{ fontSize: '11px', marginLeft: '-1.2em', marginBottom: "1rem" }}>
                                                J’ai lu et j’accepte les <span className='conditions_text' onClick={handleConditions}>conditions générales</span> d’Inisght Data</span>
                                        </div>
                                        <span className='textError'>{erreurCondtion}</span>
                                    </>
                                }
                                <div className="btn_modal_ctn">
                                    <Button type="submit" className="btn__form__modal" disabled={loading}>
                                        {loading && <i className="fa fa-refresh fa-spin mr-2" />}{!field ? confirmText2 : confirmText}
                                    </Button>
                                </div>
                            </>
                            :
                            <div className="redirect__signup">
                                <span>Pour en savoir plus sur la façon d'être payé pour tester des sites Web, des applications ou des prototypes,
                                    <Link className="forget__password" onClick={tog_standard} to={{ pathname: '/testersignup' }}>cliquez ici </Link>pour vous inscrire.
                                </span>
                            </div>
                        }
                    </div>
                </Col>
            </AvForm>
        </>
    )
}
export default ClientRegisterForm

