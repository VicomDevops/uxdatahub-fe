
//REACT IMPORT 
import React from 'react'
//LIBRARY IMPORT
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
//COMPONENT IMPORT
import Modals from '../../../common/modals/modal';

/**
 * Renders the Delete Modal component.
 *
 * @param {boolean} showDeleteModal - Show or hide the modal
 * @param {function} onToggleDeleteScenario - Toggle show or hide the modal
 * @param {function} onDeleteScenario - Delete scenario
 *
 * @returns {ReactElement} The Delete Modal component
 */
const RendreDeleteModal = ({ showDeleteModal, onToggleDeleteScenario, onDeleteScenario }) => {
    return (
        <Modals
            header="Supprimer un scénario"
            show={showDeleteModal}
            modalSize="modal-sm"
            toggleShow={onToggleDeleteScenario}
        >
            <p className="text-center">Voulez-vous vraiment supprimer ce scénario ?</p>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "2rem" }}>
                <Button className="btn-success" onClick={onDeleteScenario}>Oui</Button>
                <Button onClick={onToggleDeleteScenario}>Non</Button>
            </div>
        </Modals>
    )
}

//PROPTYPES
RendreDeleteModal.propTypes = {
    showDeleteModal: PropTypes.bool,
    onToggleDeleteScenario: PropTypes.func,
    onDeleteScenario: PropTypes.func
};

//EXPORT
export default RendreDeleteModal;