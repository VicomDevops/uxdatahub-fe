//REACT IMPORT
import React from 'react';
//LIBRARY IMPORT
import PropTypes from 'prop-types';
//COMPONENT IMPORT
import DuplicateModal from './DuplicateModalForm';
import Modals from '../../../common/modals/modal';

/**
 * Renders a modal for duplicating a scenario.
 *
 * @param {Object} props - React props.
 * @prop {boolean} show - Whether the modal should be shown.
 * @prop {function} onToggleShowDetails - Function to be called when toggling the show state.
 * @prop {function} onChangeScenario - Function to be called when the scenario value changes.
 * @prop {Object} currentScenario - The current scenario.
 * @prop {Object} scenarioLabel - The scenario label.
 * @prop {function} onSubmit - Function to be called when submitting the form.
 * @prop {boolean} loading - Whether the form is submitting.
 * @prop {string} textError - The error message to be displayed.
 *
 * @returns {ReactElement} The rendered modal.
*/
const RendreDuplicateModal = ({ show, onToggleShowDetails, onChangeScenario, currentScenario, scenarioLabel, onSubmit, loading, textError}) => {
    //RENDER
    return (
        <Modals
            modalSize=""
            show={show}
            toggleShow={onToggleShowDetails}
            header='Dupliquer scenario'
        >
            <DuplicateModal
                confirmText='Confirmer'
                onSubmit={onSubmit}
                onchange={onChangeScenario}
                currentScenario={currentScenario}
                scenarioText={scenarioLabel}
                loading={loading}
                textError={textError}
            />
        </Modals>
    )
}

//PROPTYPES
RendreDuplicateModal.propTypes = {
    show: PropTypes.bool,
    onToggleShowDetails: PropTypes.func,
    onChangeScenario: PropTypes.func,
    currentScenario: PropTypes.object,
    scenarioLabel: PropTypes.string,
    onSubmit: PropTypes.func,
    loading: PropTypes.bool,
    textError: PropTypes.string
};

//EXPORT
export default RendreDuplicateModal;