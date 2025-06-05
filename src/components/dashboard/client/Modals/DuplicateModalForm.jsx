//REACT IMPORT
import React from 'react';
//LIBRARY IMPORT
import {Button, Label, Col} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import PropTypes from 'prop-types';

/**
 * Renders a modal for duplicating a scenario.
 *
 * @param {Object} props - React props.
 * @prop {string} confirmText - The text of the confirm button.
 * @prop {Object} scenarioText - The text for the old and new names of the scenario.
 * @prop {function} onSubmit - The function to be called when submitting the form.
 * @prop {Object} currentScenario - The current scenario.
 * @prop {function} onchange - The function to be called when the scenario value changes.
 * @prop {boolean} loading - Whether the form is submitting.
 * @prop {string} textError - The error message to be displayed.
 *
 * @returns {ReactElement} The rendered modal.
*/
const DuplicateModalForm = ({confirmText, scenarioText, onSubmit, currentScenario, onchange, loading, textError}) => {
    //RENDER
    return (
        <>
            <AvForm onValidSubmit={onSubmit}>
                <Col md='12'>
                    <div className='modal__form'>         
                        <Label id="label__style__signup">{scenarioText.oldName}</Label>
                        <AvField name="lastname" value={currentScenario.oldName}
                            type="text"
                            id='lastName'
                            disabled
                        />
                        <Label id="label__style__signup">{scenarioText.newName}</Label>
                        <AvField name="name" value={currentScenario.newName}
                        type="text"
                            onChange={onchange}
                            id='firstName'
                            validate={{
                                maxLength: { value: 50 },
                                required: { value: true, errorMessage: "Ce champ est obligatoire" },
                                pattern: { value: "[a-zA-Z0-9]$", errorMessage: "les caractéres speciaux ne sont pas autorisé" }
                            }}
                        />
                        <span style={{color : "red" , fontSize : "12px",display : "flex", justifyContent : "center"}}>{textError}</span>
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

//PROPTYPES
DuplicateModalForm.propTypes = {
    confirmText: PropTypes.string,
    scenarioText: PropTypes.object,
    onSubmit: PropTypes.func,
    currentScenario: PropTypes.object,
    onchange: PropTypes.func,
    loading: PropTypes.bool,
    textError: PropTypes.string
};

//EXPORT
export default DuplicateModalForm;

