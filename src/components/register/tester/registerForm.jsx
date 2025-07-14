import React from 'react';
import {
    Button, Label, Col, FormFeedback, Input
} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import './register.css'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import flags from 'react-phone-number-input/flags';
import PhoneInput  from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import  { isValidPhoneNumber } from 'react-phone-number-input';
import startsWith from 'lodash/startsWith';
import 'react-phone-input-2/lib/style.css'

const TesterRegisterForm = ({
    fileErrorVerso,fileErrorRecto, handleChange, checkedGCU, checkedPDC, testerText, csp, genders, pays, fileError, doneRecto, doneVerso,
    handleSubmit, study, media, martial, currentTester, onchange, error, loading, onChangePhone, field, handlePolitique, handleConditions, onchangeFile,erreurCondtion
}) => {
    return (
        <>
            <AvForm onValidSubmit={handleSubmit}>
                <Col md='12'>
                    <div className='modal__form'>
                        {!field ? <>
                            <Label id="label__style">{testerText.lastname}<span style={{color :'red'}}> *</span></Label>
                            <AvField name="lastname" value={currentTester.lastname}
                                placeholder="Nom de famille" type="text"
                                onChange={onchange}
                                id='input__style'
                                validate={{
                                    maxLength: { value: 50 },
                                    required: { value: true, errorMessage: "Ce champ est obligatoire" },
                                    pattern: { value: "^[a-zA-Z ]{1,50}$", errorMessage: "Les chiffres et les caractéres speciaux ne sont pas autorisé" }
                                }}
                            />
                            <Label id="label__style">{testerText.name}<span style={{color :'red'}}> *</span></Label>
                            <AvField name="name" value={currentTester.name}
                                placeholder="Prénom" type="text"
                                onChange={onchange}
                                id='input__style'
                                validate={{
                                    maxLength: { value: 50 },
                                    required: { value: true, errorMessage: "Ce champ est obligatoire" },
                                    pattern: { value: "[a-zA-Z ]{1,50}$", errorMessage: "Les chiffres et les caractéres speciaux ne sont pas autorisé" }
                                }}
                            />
                            <Label id="label__style">{testerText.email}<span style={{color :'red'}}> *</span></Label>
                            <AvField 
                                    name="email" 
                                    value={currentTester.email}
                                    placeholder="Email" 
                                    type="text"
                                    onChange={onchange}
                                    id='input__style'
                                    invalid={error && error.email ? true : false}
                                    validate={{
                                        required: { value: true, errorMessage: "Ce champ est obligatoire" },
                                        pattern: { 
                                            value: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$', 
                                            errorMessage: "Cette adresse mail n'est pas valide" 
                                        }
                                    }}
                                />
                            <Label id="label__style">{testerText.age}<span style={{color :'red'}}> *</span></Label>
                            <AvField
                                value={currentTester.dateOfBirth}
                                type="date"
                                onChange={onchange}
                                name="dateOfBirth"
                                id="input__style"
                                validate={{
                                    dateRange: { start: { value: -65, units: 'years', }, end: { value: -18, units: 'years', }, 
                                    errorMessage: "Votre age doit être compris entre 18 ans et 65 ans" },
                                    required: { value: true, errorMessage: "Ce champ est obligatoire" },
                                }}
                            />
                            <Label className='mt-2' id="label__style">{testerText.gender}<span style={{color :'red'}}> *</span></Label>
                            <AvField type="select" name="gender" id='input__style' onChange={onchange}
                                validate={{
                                    required: { value: true, errorMessage: "Ce champ est obligatoire" },

                                }}
                            >
                                <option value="" disabled defaultValue>Veuillez sélectionner votre genre</option>
                                {genders.map(gender => <option key={gender} value={gender}>{gender}</option>)}
                            </AvField>
                            <Label id="label__style">{testerText.situation}<span style={{color :'red'}}> *</span></Label>
                            <AvField type="select" name="maritalStatus" id='input__style' onChange={onchange}
                                validate={{
                                    required: { value: true, errorMessage: "Ce champ est obligatoire" },
                                }}
                            >
                                <option value="" disabled defaultValue>Veuillez sélectionner votre situation familiale</option>
                                {martial.map(res => <option key={res} value={res}>{res}</option>)}
                            </AvField>
                            <Label id="label__style">{testerText.pays}<span style={{color :'red'}}> *</span></Label>
                            <AvField type="select" name="country" id='input__style' onChange={onchange}
                                validate={{
                                    required: { value: true, errorMessage: "Ce champ est obligatoire" },
                                }}
                            >
                                <option value="" disabled defaultValue>Veuillez sélectionner votre pays</option>
                                {pays.map(res => <option key={res} value={res}>{res}</option>)}
                            </AvField>
                            <Label id="label__style">{testerText.csp}<span style={{color :'red'}}> *</span></Label>
                            <AvField type="select" name="csp" id='input__style' onChange={onchange}
                                validate={{
                                    required: { value: true, errorMessage: "Ce champ est obligatoire" },
                                }}
                            >
                                <option value="" disabled defaultValue>Veuillez sélectionner votre CSP</option>
                                {csp.map(res => <option key={res} value={res}>{res}</option>)}
                            </AvField>
                            <Label id="label__style">{testerText.niveau}<span style={{color :'red'}}> *</span></Label>
                            <AvField type="select" name="studyLevel" id='input__style' onChange={onchange}
                                validate={{
                                    required: { value: true, errorMessage: "Ce champ est obligatoire" },
                                }}
                            >
                                <option value="" disabled defaultValue>Veuillez sélectionner votre niveau d'études</option>
                                {study.map(res => <option key={res} value={res}>{res}</option>)}
                            </AvField>
                            <Label id="label__style">{testerText.reseau}<span style={{color :'red'}}> *</span></Label>
                            <AvField type="select" name="socialMedia" id='input__style' onChange={onchange}
                                validate={{
                                    required: { value: true, errorMessage: "Ce champ est obligatoire" },
                                }}
                            >
                                <option value="" disabled defaultValue>Veuillez sélectionner </option>
                                {media.map(res => <option key={res} value={res}>{res}</option>)}
                            </AvField>
                            <Label id="label__style">{testerText.phone}</Label>
                            <PhoneInput
                                flags={flags}
                                country={'fr'}
                                value={currentTester.phone}
                                onChange={onChangePhone}   
                                inputProps={{
                                    required: true
                                }}
                                isValid={(inputNumber, country, countries) => {
                                    return countries.some((country) => {
                                        return startsWith(inputNumber, country.dialCode) || startsWith(country.dialCode, inputNumber);
                                    });
                                }}           
                            />
                            {currentTester.phone ? (isValidPhoneNumber('+'+currentTester.phone) ? undefined : <FormFeedback>Numéro de téléphone invalide </FormFeedback>) : null}
                        </> 
                        :
                        <>
                            <div className='file__zone__form'>
                                <div className='file__zone'>
                                    <div  className='d-flex flex-column'>
                                        <Label id="label__style">{testerText.carteIndentiteRecto}<span style={{color :'red'}}> *</span></Label>
                                        <Label id="label__style"><span style={{fontSize :'9px'}}>Acceptez les formats(png, jpg, jpeg, pdf)</span></Label>    
                                    </div>
                                <Label id="file" 
                                className= 
                                {`${doneRecto === "valide"
                                    ? 'file__zone__file__done' 
                                        : doneRecto  ==="failed"?
                                        'file__zone__file__fail' 
                                    :
                                        'file__zone__file'
                                }`}
                                >Télécharger
                                <Input 
                                    name="carteIndentiteRecto"
                                    type="file"
                                    id="file"
                                    onChange={onchangeFile}
                                    className='file__zone__file' 
                                    validate={{
                                        required: { value: true, errorMessage: "Ce champ est obligatoire" },
                                    }}
                                />
                                </Label>
                                </div>
                                {fileErrorRecto && <p style={{color:'red', fontSize:8, textAlign : 'start'}}>{fileErrorRecto}</p>}  
                                <div className='file__zone'>
                                    <div className='d-flex flex-column'>
                                        <Label id="label__style">{testerText.carteIndentiteVerso}<span style={{color :'red'}}> *</span></Label>
                                        <Label id="label__style"><span style={{fontSize :'9px'}}>Acceptez les formats(png, jpg, jpeg, pdf)</span></Label>    
                                    </div>
                                <Label id="file"
                                    className={`${doneVerso === "valide"
                                    ? 'file__zone__file__done' 
                                        : doneVerso ==="failed" ?
                                        'file__zone__file__fail' 
                                    :
                                        'file__zone__file'
                                }`}>
                                    Télécharger
                                    <Input 
                                        name="carteIndentiteVerso" 
                                        type="file"
                                        id='file'
                                        onChange={onchangeFile}
                                        className='file__zone__file' 
                                        validate={{
                                            required: { value: true, errorMessage: "Ce champ est obligatoire" },
                                        }}
                                    />
                                </Label>
                                </div> 
                                {fileErrorVerso && <p style={{color:'red', fontSize:8, textAlign : 'start'}}>{fileErrorVerso}</p>}    
                                {fileError && <p style={{color:'red', fontSize:10, textAlign : 'center'}}>{fileError}</p>}
                            </div>
                            <Label id="label__style">{testerText.adressePostal}<span style={{color :'red'}}> *</span></Label>
                            <AvField name="adressePostal" value={currentTester.adressePostal}
                                placeholder="Adresse postale" 
                                type="text"
                                onChange={onchange}
                                id='input__style'
                                validate={{
                                    maxLength: { value: 50 },
                                    required: { value: true, errorMessage: "Ce champ est obligatoire" },
                                }}
                            />
                            <Label id="label__style">{testerText.codePostal}<span style={{color :'red'}}> *</span></Label>
                            <AvField name="codePostal" value={currentTester.codePostal}
                                placeholder="Code Postal" 
                                type="text"
                                onChange={onchange}
                                id='input__style'
                                validate={{
                                    required: { value: true, errorMessage: "Ce champ est obligatoire" },
                                    pattern: { value: "^[0-9]{1,5}$", errorMessage: "Le code postal doit être composé de 1 à 5 chiffres" }
                                }}
                            />
                            <Label id="label__style">{testerText.ville}<span style={{color :'red'}}> *</span></Label>
                            <AvField name="ville" value={currentTester.ville}
                                placeholder="Ville" 
                                type="text"
                                onChange={onchange}
                                id='input__style'
                                validate={{
                                    maxLength: { value: 50 },
                                    required: { value: true, errorMessage: "Ce champ est obligatoire" },
                                    pattern: { value: "^[a-zA-Z ]{1,50}$", errorMessage: "Les chiffres et les caractéres speciaux ne sont pas autorisé" }
                                }}
                            />
                            <div>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checkedGCU}
                                            onChange={handleChange}
                                            name="cgu"
                                            color="primary"
                                            required
                                        />
                                        
                                    }
                                />
                            <span style={{ fontSize: '11px', marginLeft: '-1.2em',marginBottom: "1rem" }}> 
                            J’ai lu et j’accepte les <span className='conditions_text' onClick={handleConditions}>conditions générales</span> d’Inisght Data</span>
                            </div>
                            <div>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checkedPDC}
                                            onChange={handleChange}
                                            name="privacyPolicy"
                                            color="primary"
                                            required
                                        />
                                    }
                                />
                                <span style={{ fontSize: '11px', marginLeft: '-1.2em' }}>
                                J’ai lu et j’accepte la  <span className='conditions_text' onClick={handlePolitique}>politique de confidentialité</span> d’UX DATAHUB</span>                                
                            </div>
                            <span className='textError'>{erreurCondtion}</span>
                        </>
                        }
                        <div className="btn_modal_ctn">
                            <Button type="submit" className="btn__form__modal" disabled={loading}>
                                {!field ? 'Suivant' : "Devenir testeur"} {loading && <i className="fa fa-refresh fa-spin mr-2" />}
                            </Button>
                        </div>
                    </div>
                </Col>
            </AvForm>
        </>
    )
}
export default TesterRegisterForm

