import React from 'react'
import Modals from '../../../common/modals/modal'
import { Button } from 'reactstrap'


/**
 * Renders the Delete Tester Modal component.
 *
 */
const DeleteTesterModal = ({ showDelete, onModalDeleteTester, onDeleteTester }) => {

    /*RENDER */
    return (
        <Modals
            header="Supprimer un testeur"
            show={showDelete}
            modalSize="modal-sm"
            toggleShow={onModalDeleteTester}
        >
            <p className="text-center">Voulez-vous vraiment supprimer ce testeur de ce panel ?</p>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "2rem" }}>
                <Button className="btn-success" onClick={onDeleteTester}>Oui</Button>
                <Button onClick={onModalDeleteTester}>Non</Button>
            </div>
        </Modals>
    )
}

export default DeleteTesterModal
