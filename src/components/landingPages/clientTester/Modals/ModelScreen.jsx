import React from "react";
import Modals from '../../../common/modals/modal'
import { Button } from "reactstrap";

const ScreenModal = ({ visible, toggle }) => {
    return (
        <Modals
            className="modal-sm center-modal align-items-start"
            show={visible}
            toggleShow={toggle}
            header="Plusieurs Ecran détecté !"
        >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                Veuillez débrancher le deuxième écran de votre ordinateur. S'il vous plaît, 
                ne le rebranchez pas pendant le test, sinon le test sera automatiquement interrompu. 
                <br />
                Merci.
                <Button className="btn__close" style={{ marginTop: 20 }} onClick={() => toggle()} >Fermer</Button>
            </div>
        </Modals>
    );
};
export default ScreenModal;