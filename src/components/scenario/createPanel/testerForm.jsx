import React from 'react';
import {Button, Label, Col, FormFeedback} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';

const TesterForm = ({confirmText, userText, handleSubmit, currentUser, onChange, error, loading, errorExistTester, remplaceTester, detachTester}) => {
    return (
        <>
            {
                remplaceTester && 
                    <div className='d-flex justify-content-center align-items-center flex-column mb-3'>
                        <span style={{color : "orange"}}> Noter bien! </span>
                        <span> Vous allez remplacer le testeur {remplaceTester.name}  {remplaceTester.lastname} </span>
                    </div>
            }
                        {
                detachTester && 
                    <div className='d-flex justify-content-center align-items-center flex-column mb-3'>
                        <span style={{color : "orange"}}> Noter bien! </span>
                        <span className='detacherTesterNote'> 
                            Vous allez detacher le testeur {detachTester.name}  {detachTester.lastname} de 
                            tous les scénarios que vous avez sélectionnés précédemment.
                        </span>
                    </div>
            }
            <AvForm onValidSubmit={handleSubmit}>
                <Col md='12'>
                    <div className='modal__form'>
                    <Label id="label__style__signup">{userText.lastname} <span style={{color : "red"}}>*</span></Label>
                    <AvField 
                        name="lastname" 
                        value={currentUser.lastname}
                        placeholder="Nom de famille" 
                        type="text"
                        onChange={onChange}
                        id='lastName'
                        validate={{
                            maxLength: { value: 50 },
                            required: { value: true, errorMessage: "Ce champ est obligatoire" },
                            pattern: { value: "^[a-zA-Z ]{1,50}$", errorMessage: "Les chiffres et les caractéres speciaux ne sont pas autorisé" }
                        }}
                    />
                    <Label id="label__style__signup">{userText.name} <span style={{color : "red"}}>*</span></Label>
                    <AvField 
                        name="name"
                        value={currentUser.name}
                        placeholder="Prénom" 
                        type="text"
                        onChange={onChange}
                        id='firstName'
                        validate={{
                            maxLength: { value: 50 },
                            required: { value: true, errorMessage: "Ce champ est obligatoire" },
                            pattern: { value: "[a-zA-Z ]{1,50}$", errorMessage: "Les chiffres et les caractéres speciaux ne sont pas autorisé" }
                        }}
                    />
                    <Label id="label__style__signup">{userText.email} <span style={{color : "red"}}>*</span></Label>
                    <AvField 
                        name="email" 
                        value={currentUser.email}
                        placeholder="Email" 
                        type="text"
                        onChange={onChange}
                        id='email'
                        invalid={error&&error.email ? true : false}
                        validate={{
                            required: { value: true, errorMessage: "Ce champ est obligatoire" },
                            pattern: { value: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-z]{2,3}$', errorMessage: "Cette adresse mail n'est pas valide" }
                        }}
                    />
                    {error && <FormFeedback  >{error.message} </FormFeedback>}
                    {errorExistTester && <FormFeedback  >{errorExistTester} </FormFeedback>}
                    <div className="btn_modal_ctn">
                        <Button type="submit" className="btn__form__modal" disabled={loading}>
                            {
                                loading && 
                                    <i className="fa fa-refresh fa-spin mr-2" />
                            }
                            { confirmText }
                        </Button>
                    </div>
                    </div>
                </Col>
            </AvForm>
        </>
    )
}
export default TesterForm

