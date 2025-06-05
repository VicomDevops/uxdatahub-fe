//REACT IMPORT
import React from 'react';
//LIBRARY IMPORT
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
//COMPONENTS IMPORT
import Modals from '../../../common/modals/modal';

/**
 * Render a modal to confirm the closure of a scenario
 * @param {boolean} showClose - Whether the modal should be visible
 * @param {function} onToggleCloseScenario - The function to toggle the visibility of the modal
 * @param {function} onCloseScenario - The function to call when the user confirms the closure of the scenario
 * @returns {JSX.Element} The modal component
 */
const RenderClotureModal = ({ showClose, onToggleCloseScenario, onCloseScenario }) => {
    //RENDER
    return (
        <Modals
            header="Cloturer le scénario"
            show={showClose}
            modalSize="modal-sm"
            toggleShow={onToggleCloseScenario}
        >
            <p className="text-center">Voulez-vous vraiment cloturer ce scénario ?</p>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "2rem" }}>
                <Button className="btn-success" onClick={onCloseScenario}>Oui</Button>
                <Button onClick={onToggleCloseScenario}>Non</Button>
            </div>
        </Modals>
    )
}

//PROPTYPES
RenderClotureModal.propTypes = {
    showClose: PropTypes.bool,
    onToggleCloseScenario: PropTypes.func,
    onCloseScenario: PropTypes.func
};

//EXPORT
export default RenderClotureModal;