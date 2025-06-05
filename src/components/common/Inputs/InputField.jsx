//REACT IMPORT
import React from 'react';
//LIBRARY IMPORT
import { Label } from 'reactstrap';
import { AvField } from "availity-reactstrap-validation";
import PropTypes from 'prop-types';
//COMPONENT IMPORT
import Required from './Required';

/**
 * A React component that renders an input field with a label and a required indicator.
 * 
 * @param {Object} props - The props for the component.
 * @param {string} props.label - The label text for the input field.
 * @param {string} props.name - The name attribute for the input field.
 * @param {boolean} props.required - A boolean indicating whether the field is required.
 * @returns {JSX.Element} A JSX element containing a labeled input field.
 */
const InputField = ({type, label, name, required, value, readOnly, onChange, ...props }) => {

    /*RENDER */
    return (
        <div className="column-left">
            <Label> 
                { label }  
                { required && <Required /> }
            </Label>
            <AvField
                type={type ?? "text"}
                name={name}
                value={readOnly ? `Audit_ux_${value}`: ""}
                className="profile_input_tester"
                validate={{
                    required: { value: required, errorMessage: "Ce champ est obligatoire" },
                }}
                readOnly={readOnly}
                onChange={onChange}
                {...props}
            />
        </div>
    )
}
//PROPTYPES
InputField.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    required: PropTypes.bool,
    value: PropTypes.string,
    readOnly: PropTypes.bool,
    onChange: PropTypes.func
};

//EXPORT
export default InputField;